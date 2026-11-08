# HyperFrames + Whisper in this cloud environment

[HyperFrames](https://hyperframes.heygen.com) (HeyGen, Apache-2.0): write HTML, render MP4.

## Setup
```bash
cd what-if-videos/tools/hyperframes && npm install        # hyperframes 0.9.23 + gsap 3.15.0 (pinned)
npx hyperframes init my-video --example blank --resolution portrait --non-interactive
cp node_modules/gsap/dist/gsap.min.js my-video/assets/
sed -i 's#https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js#assets/gsap.min.js#' my-video/index.html
```
The network blocks the jsDelivr CDN, so GSAP is loaded from a local copy instead.

## Render / check
```bash
cd my-video && npx hyperframes check --json && npx hyperframes render . -o out.mp4
```

## Whisper
Both options need Hugging Face on the allowlist. The `moneyprinterturbo` cloud environment has it.
- **HyperFrames built-in (whisper.cpp):**
  `NODE_USE_ENV_PROXY=1 NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt npx hyperframes transcribe audio.mp3 --engine whisper --model base.en`
  Node only goes through the proxy with `NODE_USE_ENV_PROXY=1`.
- **faster-whisper (Python, MoneyPrinterTurbo venv):**
  `SSL_CERT_FILE=/root/.ccr/ca-bundle.crt python ../transcribe.py audio.mp3`

Running `npx hyperframes init` also installs the HyperFrames agent skills into `~/.claude/skills`
(hyperframes, hyperframes-cli, hyperframes-registry, media-use). Pass `--skip-skills` to skip that.
