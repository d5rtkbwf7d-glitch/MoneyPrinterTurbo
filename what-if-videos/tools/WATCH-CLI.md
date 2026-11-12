# watch-cli (sonpiaz/watch-cli v0.3.4) in this cloud environment

Downloads a social video (Instagram, TikTok, YouTube, X…), cuts frames and transcribes it, **offline**,
with whisper.cpp (large-v3-turbo). No Kyma key, no vidIQ credits.

## Install
```bash
uv tool install yt-dlp
git clone --depth 1 https://github.com/sonpiaz/watch-cli.git /home/user/tools/watch-cli
cd /home/user/tools/watch-cli
./install.sh --with-skill                       # CLI + Claude skill
tmpdir=$(mktemp -d) ./install.sh --with-local   # whisper.cpp + 1.6 GB model (tmpdir works around an installer bug)
echo "WATCH_AUDIO_MODE=local" >> ~/.config/watch-cli/env
cp what-if-videos/tools/watch-cli-extract-frames.patched ~/.watch-cli/bin/extract-frames   # bug fix, see below
```

## Use
```bash
SSL_CERT_FILE=/root/.ccr/ca-bundle.crt watch "https://www.instagram.com/reel/<id>/"
```
Prints `VIDEO:`, `DURATION:`, `FRAMES:` (jpg paths) and `TRANSCRIPT:`.

## Fixes applied
- `extract-frames` (v0.3.4) mistakes the output folder for the frame count whenever the count is the default 8,
  so `watch` fails with "count must be positive integer". The patched copy parses arguments by position.
- `install.sh --with-local` aborts with `tmpdir: unbound variable`; setting `tmpdir` to an empty folder works around it.

## Network (moneyprinterturbo environment)
Allowed: `www.instagram.com`, `i.instagram.com`, `scontent-ord5-1.cdninstagram.com`.
Instagram serves video from many `scontent-*.cdninstagram.com` servers, so another reel may need another exact host
(or the wildcard `*.cdninstagram.com`, which can only be added in the environment's settings).
YouTube and TikTok aren't allowed yet; they need their video hosts too (`*.googlevideo.com`, TikTok CDNs).
