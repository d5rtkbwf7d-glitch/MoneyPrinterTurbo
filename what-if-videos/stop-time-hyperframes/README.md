# What If You Could Stop Time? (HyperFrames)

Final video: `what-if-stop-time.mp4` (1080×1920, 34 s, no music).

- `project/` is the HyperFrames project: `index.html` plus one file per scene in `compositions/`
  (`s1`–`s9`, `captions`). Open it in the HyperFrames preview or desktop app to edit.
- `build/` holds the voice lines and `build.py`, which generates `project/` from the script and timings.

Rebuild:
```bash
cd build && python tts.py && python3 timeline.py      # narration + line timings
# rebuild voice.wav from the line*.mp3 (see build steps in the session) into project/assets/voice.wav
python build.py                                        # writes the scenes, captions and sfx
cd ../project && npx hyperframes check && npx hyperframes render . -o renders/out.mp4 --quality delivery
```
Captions use Whisper's words with the voice engine's word timings: whisper.cpp timestamps drifted about 1 s early after pauses.
