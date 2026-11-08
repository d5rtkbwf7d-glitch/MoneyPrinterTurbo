"""Word-level transcription with faster-whisper.

Usage (from the MoneyPrinterTurbo venv):
    python transcribe.py input.mp3 [out.json] [--model small.en]

Writes [{"w": word, "s": start, "e": end}, ...]. That's the same word format
the What If renderers use for captions, so any audio (your own voiceover, a
recorded clip) can drive the word-by-word captions.
Needs Hugging Face on the network allowlist the first time a model is downloaded.
"""
import json, os, sys
from faster_whisper import WhisperModel

args = [a for a in sys.argv[1:] if not a.startswith("--")]
model = sys.argv[sys.argv.index("--model") + 1] if "--model" in sys.argv else "base.en"
if not args:
    raise SystemExit(__doc__)
src = args[0]; out = args[1] if len(args) > 1 else os.path.splitext(src)[0] + ".words.json"
m = WhisperModel(model, device="cpu", compute_type="int8")
segs, _ = m.transcribe(src, word_timestamps=True)
words = [{"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)} for s in segs for w in s.words]
json.dump(words, open(out, "w"), indent=1)
print(f"{len(words)} words -> {out}")
