# Higgsfield Content Factory

`video_source = "higgsfield"` turns MoneyPrinterTurbo into a repeatable Shorts
factory on Higgsfield Cloud:

1. MoneyPrinterTurbo writes the script and the search keywords as usual.
2. Each keyword becomes one shot prompt, prefixed with a shared **style preset**
   so every clip looks like part of the same series.
3. Optionally a still frame is rendered first (`higgsfield_image_model`,
   Seedream by default), then animated by your video model.
4. Clips are generated one at a time and generation stops as soon as the
   narration is covered, so you only pay for footage you use.
5. Voiceover, subtitles, music and editing use the normal pipeline.

## Setup

Get an API key and secret at <https://cloud.higgsfield.ai>, then set in
`config.toml` (or the WebUI under Settings → AI Video → Higgsfield Content Factory):

```toml
video_source = "higgsfield"
higgsfield_api_key = "..."
higgsfield_api_secret = "..."
# Required: copy the model path of the video model you want from the dashboard.
higgsfield_video_model = "<vendor>/<model>/<version>/image-to-video"
higgsfield_style_preset = "paper_diorama"   # paper_diorama | photoreal_ugc | neon_night | none
```

Instead of the config keys you can export `HF_KEY="key:secret"`.

If your video model reads the still frame from a field other than `image_url`,
set `higgsfield_image_field`. Pass model-specific options with
`higgsfield_video_extra_args = '{"resolution": "720p"}'`. Set
`higgsfield_image_model = ""` to skip still frames and use text-to-video.

## Run

```bash
python cli.py --video-subject "Sharks are older than trees" \
  --video-source higgsfield --video-aspect 9:16 --confirm-higgsfield-charge
```

To batch many topics, write a JSONL file with one task per line, e.g.
`{"video_subject": "Sharks are older than trees", "video_source": "higgsfield", "video_aspect": "9:16"}`,
then run `python cli.py --batch-file topics.jsonl --confirm-higgsfield-charge`.

## Adding a style

Add an entry to `STYLE_PRESETS` in `app/services/higgsfield.py`, or set
`higgsfield_style_prompt` to a one-off style description.
