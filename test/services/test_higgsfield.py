import os
from types import SimpleNamespace
from unittest.mock import patch

import pytest
import requests

from app.config import config
from app.models.schema import MaterialInfo, VideoAspect
from app.services import higgsfield, material

VIDEO_MODEL = "vendor/video-model/v1/image-to-video"


def _response(payload, status_code=200):
    return SimpleNamespace(status_code=status_code, headers={}, json=lambda: payload)


@pytest.fixture(autouse=True)
def restore_config():
    original_app = dict(config.app)
    original_proxy = dict(config.proxy)
    config.app.update(
        {
            "higgsfield_api_key": "hf-key",
            "higgsfield_api_secret": "hf-secret",
            "higgsfield_base_url": higgsfield.DEFAULT_BASE_URL,
            "higgsfield_video_model": VIDEO_MODEL,
            "higgsfield_image_model": higgsfield.DEFAULT_IMAGE_MODEL,
            "higgsfield_image_field": "image_url",
            "higgsfield_video_extra_args": "",
            "higgsfield_image_extra_args": "",
            "higgsfield_style_preset": "paper_diorama",
            "higgsfield_style_prompt": "",
            "higgsfield_poll_interval": 0.5,
            "higgsfield_run_timeout": 60,
        }
    )
    config.proxy.clear()
    with patch.object(higgsfield.time, "sleep"):
        yield
    config.app.clear()
    config.app.update(original_app)
    config.proxy.clear()
    config.proxy.update(original_proxy)


def test_credentials_prefer_config_then_environment():
    assert higgsfield.get_api_key() == "hf-key:hf-secret"
    config.app["higgsfield_api_key"] = ""
    config.app["higgsfield_api_secret"] = ""
    with patch.dict(os.environ, {"HF_KEY": "", "HF_API_KEY": "a", "HF_API_SECRET": "b"}):
        assert higgsfield.get_api_key() == "a:b"
    with patch.dict(os.environ, {"HF_KEY": "env:key"}):
        assert higgsfield.get_api_key() == "env:key"
    with patch.dict(os.environ, {"HF_KEY": "", "HF_API_KEY": "", "HF_API_SECRET": ""}):
        assert higgsfield.get_api_key() == ""
        assert higgsfield.missing_settings() == ["higgsfield_api_key"]


def test_video_model_is_required_and_must_be_a_relative_path():
    config.app["higgsfield_video_model"] = ""
    assert not higgsfield.is_enabled()
    assert higgsfield.missing_settings() == ["higgsfield_video_model"]
    config.app["higgsfield_video_model"] = "https://evil.example/steal"
    assert not higgsfield.is_enabled()
    with patch.object(higgsfield.requests, "post") as post:
        with pytest.raises(higgsfield.HiggsfieldError):
            higgsfield.generate_videos("shark", 5)
    post.assert_not_called()


def test_style_preset_and_custom_style():
    prompt = higgsfield.build_shot_prompt("an ancient shark", VideoAspect.portrait)
    assert prompt.startswith("Cinematic vintage paper-diorama")
    assert "an ancient shark" in prompt and "vertical 9:16" in prompt
    config.app["higgsfield_style_prompt"] = "Claymation look."
    assert higgsfield.build_shot_prompt("x", VideoAspect.square).startswith("Claymation look.")
    config.app["higgsfield_style_prompt"] = ""
    config.app["higgsfield_style_preset"] = "missing"
    with pytest.raises(higgsfield.HiggsfieldError):
        higgsfield.get_style_prompt()


def test_still_frame_then_video_flow():
    posts = []

    def fake_post(url, json, headers, **kwargs):
        posts.append((url, json, headers))
        return _response({"request_id": f"req-{len(posts)}"})

    statuses = {
        "req-1": [{"status": "queued"}, {"status": "completed", "images": [{"url": "https://cdn/still.png"}]}],
        "req-2": [{"status": "in_progress"}, {"status": "completed", "video": {"url": "https://cdn/clip.mp4"}}],
    }

    def fake_get(url, **kwargs):
        request_id = url.split("/requests/")[1].split("/")[0]
        return _response(statuses[request_id].pop(0))

    with patch.object(higgsfield.requests, "post", side_effect=fake_post), \
            patch.object(higgsfield.requests, "get", side_effect=fake_get):
        items = higgsfield.generate_videos("an ancient shark", 7, VideoAspect.portrait)

    assert [p[0] for p in posts] == [
        f"https://api.higgsfield.ai/{higgsfield.DEFAULT_IMAGE_MODEL}",
        f"https://api.higgsfield.ai/{VIDEO_MODEL}",
    ]
    assert posts[0][2]["Authorization"] == "Key hf-key:hf-secret"
    assert posts[0][1]["aspect_ratio"] == "9:16"
    assert posts[1][1]["image_url"] == "https://cdn/still.png"
    assert posts[1][1]["duration"] == 7
    assert len(items) == 1
    assert items[0].url == "https://cdn/clip.mp4"
    assert items[0].source_info["asset_id"] == "req-2"
    assert items[0].source_info["still_frame_id"] == "req-1"


def test_text_to_video_when_image_model_disabled_and_extra_args_merged():
    config.app["higgsfield_image_model"] = ""
    config.app["higgsfield_video_extra_args"] = '{"resolution": "720p"}'
    with patch.object(higgsfield.requests, "post", return_value=_response({"request_id": "v1"})) as post, \
            patch.object(higgsfield.requests, "get", return_value=_response(
                {"status": "completed", "result": {"files": ["https://cdn/out.MP4"]}})):
        items = higgsfield.generate_videos("shark", 30, VideoAspect.landscape)
    assert post.call_count == 1
    body = post.call_args.kwargs["json"]
    assert "image_url" not in body
    assert body["resolution"] == "720p"
    assert body["duration"] == higgsfield.DEFAULT_MAX_DURATION_SECONDS
    assert items[0].url == "https://cdn/out.MP4"


def test_failed_status_returns_empty_and_nsfw_is_terminal():
    config.app["higgsfield_image_model"] = ""
    for status in ("failed", "nsfw", "canceled"):
        with patch.object(higgsfield.requests, "post", return_value=_response({"request_id": "v1"})), \
                patch.object(higgsfield.requests, "get", return_value=_response({"status": status})):
            assert higgsfield.generate_videos("shark", 5) == []


def test_ambiguous_submission_is_unconfirmed_and_not_retried():
    with patch.object(higgsfield.requests, "post", side_effect=requests.exceptions.Timeout("slow hf-secret")) as post:
        with pytest.raises(higgsfield.HiggsfieldUnconfirmedTaskError) as exc:
            higgsfield.generate_videos("shark", 5)
    assert post.call_count == 1
    assert "hf-secret" not in str(exc.value)
    with patch.object(higgsfield.requests, "post", return_value=_response({}, status_code=502)):
        with pytest.raises(higgsfield.HiggsfieldUnconfirmedTaskError):
            higgsfield.generate_videos("shark", 5)


def test_client_error_is_deterministic():
    with patch.object(higgsfield.requests, "post", return_value=_response({"detail": "bad prompt"}, 422)):
        with pytest.raises(higgsfield.HiggsfieldError) as exc:
            higgsfield.generate_videos("shark", 5)
    assert not isinstance(exc.value, higgsfield.HiggsfieldUnconfirmedTaskError)
    assert "bad prompt" in str(exc.value)


def test_transient_poll_errors_are_retried():
    config.app["higgsfield_image_model"] = ""
    responses = [
        requests.exceptions.ConnectionError("blip"),
        _response({}, status_code=503),
        _response({"status": "completed", "videos": [{"url": "https://cdn/v.mp4"}]}),
    ]
    with patch.object(higgsfield.requests, "post", return_value=_response({"request_id": "v1"})), \
            patch.object(higgsfield.requests, "get", side_effect=responses):
        items = higgsfield.generate_videos("shark", 5)
    assert items[0].url == "https://cdn/v.mp4"


def test_material_stage_stops_once_narration_is_covered(tmp_path):
    calls = []

    def fake_generate(search_term, minimum_duration, video_aspect):
        calls.append(search_term)
        return [MaterialInfo(provider="higgsfield", url=f"https://cdn/{search_term}.mp4",
                             duration=minimum_duration, source_info={"asset_id": search_term})]

    with patch.object(higgsfield, "generate_videos", side_effect=fake_generate), \
            patch.object(material, "_save_generated_video_with_retry",
                         side_effect=lambda url, *_: str(tmp_path / url.rsplit("/", 1)[1])), \
            patch.object(material, "_get_downloaded_video_duration", return_value=6.0), \
            patch.object(material, "_persist_material_sources"):
        paths = material._download_videos_higgsfield_on_demand(
            task_id="t", search_terms=["a", "b", "c", "d"], video_aspect=VideoAspect.portrait,
            audio_duration=11.0, max_clip_duration=6, material_directory=str(tmp_path),
        )
    assert calls == ["a", "b"]
    assert len(paths) == 2
