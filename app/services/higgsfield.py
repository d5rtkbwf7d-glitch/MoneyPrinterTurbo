"""Higgsfield Cloud generation client for the "content factory" video source.

The pipeline mirrors a hand-built Higgsfield Shorts workflow:

1. Each script keyword becomes one shot prompt, prefixed with a reusable
   *style preset* so every clip in every video shares the same look.
2. Optionally, a still frame is generated first with a text-to-image model
   (for example Seedream).  This keeps the art direction consistent and lets
   image-to-video models animate it.
3. A video model turns the still (or the prompt alone) into a clip.

Protocol (from the official ``higgsfield-client`` SDK): requests go to
``https://api.higgsfield.ai/<model-path>`` with ``Authorization: Key
<api_key>:<api_secret>``.  The submit response carries ``request_id``; the job
is polled at ``/requests/<id>/status`` until ``status`` is ``completed``,
``failed``, ``nsfw`` or ``canceled``.

Generations are billed once accepted, so a submission is never retried when
its outcome is ambiguous.
"""

from __future__ import annotations

import json
import math
import os
import time
from collections.abc import Mapping
from typing import Any
from urllib.parse import quote, quote_plus, urlsplit

import requests
from loguru import logger

from app.config import config
from app.models.schema import MaterialInfo, VideoAspect
from app.services import generation_progress
from app.utils.request_logging import trace_http_call

PROVIDER = "higgsfield"
DEFAULT_BASE_URL = "https://api.higgsfield.ai"
# Confirmed in the official SDK documentation.
DEFAULT_IMAGE_MODEL = "bytedance/seedream/v4/text-to-image"
DEFAULT_IMAGE_RESOLUTION = "2K"
DEFAULT_IMAGE_FIELD = "image_url"
DEFAULT_STYLE_PRESET = "paper_diorama"
DEFAULT_MIN_DURATION_SECONDS = 5
DEFAULT_MAX_DURATION_SECONDS = 10
DEFAULT_POLL_INTERVAL_SECONDS = 5.0
DEFAULT_RUN_TIMEOUT_SECONDS = 1800.0
MAX_POLL_RETRIES = 5
RETRY_BASE_SECONDS = 1.0
MAX_ERROR_TEXT_LENGTH = 500
RETRYABLE_STATUS_CODES = frozenset({429, 500, 502, 503, 504})
ACTIVE_STATUSES = frozenset({"queued", "in_progress", "pending", "processing"})
SUCCESS_STATUSES = frozenset({"completed"})
FAILURE_STATUSES = frozenset({"failed", "nsfw", "canceled", "cancelled"})
VIDEO_EXTENSIONS = (".mp4", ".mov", ".webm", ".m4v")

# Reusable art direction.  "paper_diorama" is the look of the
# "Sharks are older than trees" Short; add more presets here or set
# ``higgsfield_style_prompt`` in config.toml for a one-off custom look.
STYLE_PRESETS: dict[str, str] = {
    "none": "",
    "paper_diorama": (
        "Cinematic vintage paper-diorama documentary: miniature table-top "
        "world built from aged sepia newsprint and cardboard, torn layered "
        "paper edges, monochrome halftone print texture, one single petrol "
        "blue paper accent, warm tungsten documentary lighting with deep "
        "shadows, macro tilt-shift shallow depth of field, film grain and "
        "floating paper dust, smooth handcrafted stop-motion motion, "
        "non-photorealistic paper materials only, no text or letters."
    ),
    "photoreal_ugc": (
        "Photorealistic vertical phone-shot social video, natural hand-held "
        "camera, soft available light, authentic everyday setting, shallow "
        "depth of field, no text overlays."
    ),
    "neon_night": (
        "Cinematic night scene with hot-pink and electric-cyan neon glow, "
        "wet reflective streets, light haze, smooth dolly camera motion, "
        "high contrast, no text or logos."
    ),
}


class HiggsfieldError(RuntimeError):
    """Deterministic configuration, request, or response error."""

    def __init__(self, message: str, task_id: str = ""):
        super().__init__(message)
        self.task_id = task_id


class HiggsfieldUnconfirmedTaskError(HiggsfieldError):
    """The remote job may exist, but its final state cannot be confirmed."""


class HiggsfieldDownloadError(HiggsfieldError):
    """A billable job completed, but its output could not be downloaded."""


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------


def _setting(settings: Mapping[str, Any] | None, key: str, default: Any = "") -> Any:
    settings = config.app if settings is None else settings
    return settings.get(key, default)


def get_api_key(settings: Mapping[str, Any] | None = None) -> str:
    """Return ``key:secret`` from config, then HF_KEY / HF_API_KEY+HF_API_SECRET."""
    configured_key = str(_setting(settings, "higgsfield_api_key") or "").strip()
    configured_secret = str(_setting(settings, "higgsfield_api_secret") or "").strip()
    if configured_key and configured_secret:
        return f"{configured_key}:{configured_secret}"
    if configured_key and ":" in configured_key:
        return configured_key
    env_key = os.getenv("HF_KEY", "").strip()
    if env_key:
        return env_key
    api_key = os.getenv("HF_API_KEY", "").strip()
    api_secret = os.getenv("HF_API_SECRET", "").strip()
    if api_key and api_secret:
        return f"{api_key}:{api_secret}"
    return ""


def get_video_model(settings: Mapping[str, Any] | None = None) -> str:
    return _model_path(_setting(settings, "higgsfield_video_model"), "higgsfield_video_model")


def is_enabled(settings: Mapping[str, Any] | None = None) -> bool:
    """A key and a video model are both required to submit anything."""
    try:
        return bool(get_api_key(settings)) and bool(get_video_model(settings))
    except HiggsfieldError:
        return False


def missing_settings(settings: Mapping[str, Any] | None = None) -> list[str]:
    missing = []
    if not get_api_key(settings):
        missing.append("higgsfield_api_key")
    try:
        if not get_video_model(settings):
            missing.append("higgsfield_video_model")
    except HiggsfieldError:
        missing.append("higgsfield_video_model")
    return missing


def _model_path(value: Any, key: str) -> str:
    path = str(value or "").strip().strip("/")
    if not path:
        return ""
    # A model is a path below the API root, never a full URL.  This keeps the
    # credential on the configured Higgsfield host.
    if "://" in path or "?" in path or "#" in path or ".." in path.split("/"):
        raise HiggsfieldError(f"{key} must be a relative model path such as 'vendor/model/v1/image-to-video'")
    return path


def _base_url() -> str:
    value = str(_setting(None, "higgsfield_base_url", DEFAULT_BASE_URL) or DEFAULT_BASE_URL)
    value = value.strip().rstrip("/")
    parsed = urlsplit(value)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise HiggsfieldError("higgsfield_base_url must be an absolute HTTP(S) URL")
    return value


def _image_model() -> str:
    # An explicit empty string disables the still-frame stage (text-to-video).
    value = config.app.get("higgsfield_image_model", DEFAULT_IMAGE_MODEL)
    return _model_path(value, "higgsfield_image_model")


def _image_field() -> str:
    value = str(config.app.get("higgsfield_image_field", DEFAULT_IMAGE_FIELD) or "").strip()
    return value or DEFAULT_IMAGE_FIELD


def _extra_args(key: str) -> dict[str, Any]:
    raw = config.app.get(key, "")
    if isinstance(raw, Mapping):
        return dict(raw)
    text = str(raw or "").strip()
    if not text:
        return {}
    try:
        value = json.loads(text)
    except ValueError as exc:
        raise HiggsfieldError(f"{key} must be a JSON object") from exc
    if not isinstance(value, dict):
        raise HiggsfieldError(f"{key} must be a JSON object")
    return value


def get_style_prompt(settings: Mapping[str, Any] | None = None) -> str:
    """Custom style text wins; otherwise the named preset is used."""
    custom = str(_setting(settings, "higgsfield_style_prompt") or "").strip()
    if custom:
        return custom
    preset = str(_setting(settings, "higgsfield_style_preset", DEFAULT_STYLE_PRESET) or "").strip()
    preset = preset or DEFAULT_STYLE_PRESET
    if preset not in STYLE_PRESETS:
        raise HiggsfieldError(
            f"unknown higgsfield_style_preset {preset!r}; choose one of "
            + ", ".join(sorted(STYLE_PRESETS))
        )
    return STYLE_PRESETS[preset]


def build_shot_prompt(search_term: str, aspect: VideoAspect, style: str | None = None) -> str:
    style = get_style_prompt() if style is None else style
    orientation = {
        VideoAspect.portrait: "vertical 9:16 frame",
        VideoAspect.landscape: "wide 16:9 frame",
        VideoAspect.square: "square 1:1 frame",
    }[aspect]
    subject = f"Shot of {search_term.strip()}, {orientation}."
    return f"{style} {subject}".strip() if style else subject


def _bounded_float(key: str, default: float, minimum: float, maximum: float) -> float:
    try:
        value = float(config.app.get(key, default))
    except (TypeError, ValueError):
        return default
    if not math.isfinite(value):
        return default
    return min(max(value, minimum), maximum)


def _duration_bounds() -> tuple[int, int]:
    def read(key: str, default: int) -> int:
        try:
            value = int(config.app.get(key, default))
        except (TypeError, ValueError, OverflowError):
            return default
        return value if value >= 1 else default

    minimum = read("higgsfield_min_duration", DEFAULT_MIN_DURATION_SECONDS)
    maximum = read("higgsfield_max_duration", DEFAULT_MAX_DURATION_SECONDS)
    return minimum, max(minimum, maximum)


def _tls_verify() -> bool:
    value = config.app.get("tls_verify", True)
    if isinstance(value, str):
        return value.strip().lower() not in {"0", "false", "no", "off", ""}
    return bool(value)


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------


def _status_code(response: Any) -> int:
    try:
        return int(getattr(response, "status_code", 200))
    except (TypeError, ValueError):
        return 200


def _redact(value: Any, secret: str) -> str:
    text = str(value or "")
    for part in {secret, *secret.split(":")} if secret else set():
        if part:
            text = text.replace(part, "***")
            text = text.replace(quote_plus(part), "***")
    for proxy_url in config.proxy.values():
        if proxy_url:
            text = text.replace(str(proxy_url), "***")
    return text[:MAX_ERROR_TEXT_LENGTH]


def _response_error(response: Any, secret: str) -> str:
    try:
        payload = response.json()
    except Exception:
        return f"HTTP {_status_code(response)}"
    if not isinstance(payload, dict):
        return f"HTTP {_status_code(response)}"
    detail = (
        payload.get("detail") or payload.get("details")
        or payload.get("message") or payload.get("error")
    )
    if isinstance(detail, list):
        detail = "; ".join(str(item) for item in detail)
    return _redact(detail or f"HTTP {_status_code(response)}", secret)


def _is_retryable(error: Exception) -> bool:
    if isinstance(
        error,
        (
            requests.exceptions.ConnectionError,
            requests.exceptions.Timeout,
            requests.exceptions.ChunkedEncodingError,
        ),
    ):
        return True
    response = getattr(error, "response", None)
    return response is not None and _status_code(response) in RETRYABLE_STATUS_CODES


def _headers(secret: str) -> dict[str, str]:
    return {
        "Authorization": f"Key {secret}",
        "Content-Type": "application/json",
        "User-Agent": "MoneyPrinterTurbo",
    }


def _submit(model: str, arguments: dict[str, Any], secret: str, label: str) -> str:
    url = f"{_base_url()}/{quote(model, safe='/')}"
    generation_progress.submitting(PROVIDER)
    try:
        response = trace_http_call(
            "POST", requests.post,
            url,
            json=arguments,
            headers=_headers(secret),
            proxies=config.proxy,
            verify=_tls_verify(),
            timeout=(30, 90),
            allow_redirects=False,
        )
    except Exception as exc:
        raise HiggsfieldUnconfirmedTaskError(
            f"Higgsfield {label} submission returned no response; a paid task "
            f"may already exist remotely: error={type(exc).__name__}, "
            f"detail={_redact(exc, secret)}"
        ) from exc

    status_code = _status_code(response)
    if 300 <= status_code < 400 or status_code >= 500:
        raise HiggsfieldUnconfirmedTaskError(
            f"Higgsfield {label} submission failed with HTTP {status_code}; "
            "a paid task may already exist remotely"
        )
    if not 200 <= status_code < 300:
        raise HiggsfieldError(
            f"Higgsfield {label} request rejected: HTTP {status_code}, "
            f"{_response_error(response, secret)}"
        )
    try:
        body = response.json()
    except Exception as exc:
        raise HiggsfieldUnconfirmedTaskError(
            f"Higgsfield {label} submission returned an unreadable response; "
            "a paid task may already exist remotely"
        ) from exc
    request_id = str(body.get("request_id") or "").strip() if isinstance(body, dict) else ""
    if not request_id:
        raise HiggsfieldUnconfirmedTaskError(
            f"Higgsfield accepted the {label} submission without a request id"
        )
    logger.info(f"Higgsfield {label} request created: id={request_id}, model={model}")
    return request_id


def _wait(request_id: str, secret: str, label: str) -> dict[str, Any] | None:
    """Poll a request until it finishes.  Returns None for a clean failure."""
    deadline = time.monotonic() + _bounded_float(
        "higgsfield_run_timeout", DEFAULT_RUN_TIMEOUT_SECONDS, 60.0, 7200.0
    )
    poll_interval = _bounded_float(
        "higgsfield_poll_interval", DEFAULT_POLL_INTERVAL_SECONDS, 0.5, 60.0
    )
    status_url = f"{_base_url()}/requests/{quote(request_id, safe='')}/status"
    generation_progress.remote(PROVIDER, request_id)
    failures = 0

    def timed_out() -> HiggsfieldUnconfirmedTaskError:
        return HiggsfieldUnconfirmedTaskError(
            f"Higgsfield {label} is still running after the configured local "
            f"wait timeout: id={request_id}",
            task_id=request_id,
        )

    while True:
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise timed_out()
        phase_timeout = max(min(remaining / 2.0, 30.0), 0.001)
        try:
            response = trace_http_call(
                "GET", requests.get,
                status_url,
                headers=_headers(secret),
                proxies=config.proxy,
                verify=_tls_verify(),
                timeout=(phase_timeout, phase_timeout),
                allow_redirects=False,
            )
            status_code = _status_code(response)
            if status_code in RETRYABLE_STATUS_CODES:
                raise requests.exceptions.HTTPError(f"HTTP {status_code}", response=response)
            if not 200 <= status_code < 300:
                raise HiggsfieldUnconfirmedTaskError(
                    f"Higgsfield {label} status is unknown: HTTP {status_code}, "
                    f"{_response_error(response, secret)}",
                    task_id=request_id,
                )
            body = response.json()
            if not isinstance(body, dict):
                raise HiggsfieldUnconfirmedTaskError(
                    f"Higgsfield {label} status response is malformed",
                    task_id=request_id,
                )
        except HiggsfieldUnconfirmedTaskError:
            raise
        except Exception as exc:
            if not _is_retryable(exc):
                raise HiggsfieldUnconfirmedTaskError(
                    f"Higgsfield {label} polling failed and the task state is "
                    f"unknown: error={type(exc).__name__}, detail={_redact(exc, secret)}",
                    task_id=request_id,
                ) from exc
            failures += 1
            generation_progress.remote(PROVIDER, request_id, retrying=True)
            if failures > MAX_POLL_RETRIES:
                raise HiggsfieldUnconfirmedTaskError(
                    f"Higgsfield {label} polling failed after retries; the paid "
                    f"task may still be running remotely: id={request_id}",
                    task_id=request_id,
                ) from exc
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                raise timed_out() from exc
            time.sleep(min(RETRY_BASE_SECONDS * failures, remaining))
            continue

        failures = 0
        status = str(body.get("status") or "").strip().lower()
        generation_progress.remote(PROVIDER, request_id, status)
        if status in SUCCESS_STATUSES:
            return body
        if status in FAILURE_STATUSES:
            logger.error(
                f"Higgsfield {label} did not produce output: id={request_id}, "
                f"status={status}, detail={_redact(body.get('error') or body.get('detail'), secret)}"
            )
            return None
        if status not in ACTIVE_STATUSES:
            raise HiggsfieldUnconfirmedTaskError(
                f"Higgsfield returned an unknown {label} status: id={request_id}, "
                f"status={status!r}",
                task_id=request_id,
            )
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise timed_out()
        time.sleep(min(poll_interval, remaining))


# ---------------------------------------------------------------------------
# Result parsing
# ---------------------------------------------------------------------------


def _url_of(entry: Any) -> str:
    if isinstance(entry, str) and entry.startswith(("http://", "https://")):
        return entry
    if isinstance(entry, Mapping):
        value = entry.get("url")
        if isinstance(value, str) and value.startswith(("http://", "https://")):
            return value
    return ""


def _first_url(body: Mapping[str, Any], keys: tuple[str, ...]) -> str:
    for key in keys:
        value = body.get(key)
        for entry in value if isinstance(value, list) else [value]:
            url = _url_of(entry)
            if url:
                return url
    return ""


def extract_image_url(body: Mapping[str, Any]) -> str:
    return _first_url(body, ("images", "image", "output", "outputs"))


def extract_video_url(body: Mapping[str, Any]) -> str:
    url = _first_url(body, ("video", "videos", "output", "outputs"))
    if url:
        return url
    # Unknown result shapes: accept any URL that clearly points at a video.
    stack: list[Any] = [body]
    while stack:
        item = stack.pop()
        if isinstance(item, Mapping):
            stack.extend(item.values())
        elif isinstance(item, list):
            stack.extend(item)
        elif isinstance(item, str) and item.startswith(("http://", "https://")):
            if urlsplit(item).path.lower().endswith(VIDEO_EXTENSIONS):
                return item
    return ""


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def generate_videos(
    search_term: str,
    minimum_duration: int,
    video_aspect: VideoAspect = VideoAspect.portrait,
) -> list[MaterialInfo]:
    """Generate one styled clip for ``search_term``; returns [] on clean failure."""
    secret = get_api_key()
    if not secret:
        raise HiggsfieldError(
            "Higgsfield video generation requires higgsfield_api_key and "
            "higgsfield_api_secret (or HF_KEY)"
        )
    video_model = get_video_model()
    if not video_model:
        raise HiggsfieldError(
            "Higgsfield video generation requires higgsfield_video_model; copy "
            "the model path from your Higgsfield Cloud dashboard"
        )
    term = str(search_term or "").strip()
    if not term:
        raise HiggsfieldError("Higgsfield search term must not be empty")
    try:
        aspect = VideoAspect(video_aspect)
    except (TypeError, ValueError) as exc:
        raise HiggsfieldError("Higgsfield video aspect is invalid") from exc
    try:
        requested = max(int(minimum_duration), 1)
    except (TypeError, ValueError, OverflowError) as exc:
        raise HiggsfieldError("Higgsfield clip duration must be a positive integer") from exc
    minimum, maximum = _duration_bounds()
    duration = min(max(requested, minimum), maximum)
    if duration != requested:
        logger.info(
            "Higgsfield clip duration clamped: "
            f"requested={requested}s, using={duration}s ({minimum}-{maximum}s)"
        )

    # Validate every setting before the first paid request.
    image_model = _image_model()
    image_extra = _extra_args("higgsfield_image_extra_args")
    video_extra = _extra_args("higgsfield_video_extra_args")
    prompt = build_shot_prompt(term, aspect)

    image_url = ""
    image_request_id = ""
    if image_model:
        image_args = {
            "prompt": prompt,
            "aspect_ratio": aspect.value,
            "resolution": DEFAULT_IMAGE_RESOLUTION,
            **image_extra,
        }
        image_request_id = _submit(image_model, image_args, secret, "still frame")
        image_body = _wait(image_request_id, secret, "still frame")
        if image_body is None:
            return []
        image_url = extract_image_url(image_body)
        if not image_url:
            raise HiggsfieldError(
                f"Higgsfield still frame completed without an image: id={image_request_id}",
                task_id=image_request_id,
            )

    video_args: dict[str, Any] = {
        "prompt": prompt,
        "aspect_ratio": aspect.value,
        "duration": duration,
        **video_extra,
    }
    if image_url:
        video_args[_image_field()] = image_url
    video_request_id = _submit(video_model, video_args, secret, "video")
    video_body = _wait(video_request_id, secret, "video")
    if video_body is None:
        return []
    video_url = extract_video_url(video_body)
    if not video_url:
        raise HiggsfieldError(
            f"Higgsfield video completed without a downloadable file: id={video_request_id}",
            task_id=video_request_id,
        )

    width, height = aspect.to_resolution()
    source_info: dict[str, Any] = {
        "provider": PROVIDER,
        "search_term": term,
        "asset_id": video_request_id,
        "model": video_model,
        "rendition": {"id": video_request_id, "width": width, "height": height},
    }
    if image_request_id:
        source_info["still_frame_id"] = image_request_id
        source_info["still_frame_model"] = image_model
    return [
        MaterialInfo(provider=PROVIDER, url=video_url, duration=duration, source_info=source_info)
    ]
