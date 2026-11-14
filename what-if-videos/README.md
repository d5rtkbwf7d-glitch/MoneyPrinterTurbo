# What If shorts

Each folder is one episode: the final video (`what-if-*.mp4`) plus everything used to make it.

| Folder | Video | Style | Length |
|---|---|---|---|
| `invisible/` | What if you were invisible for 24 hours? | stick figure + flat cartoon | 30 s |
| `dreams/` | What if your dreams were broadcast to everyone? | flat cartoon | 30 s |
| `monday/` | What if tomorrow never arrived? | flat cartoon | 30 s |
| `sun/` | What if the Sun never set again? | flat cartoon | 40 s |
| `ant/` | What if you woke up the size of an ant? | flat cartoon | 48.5 s |
| `silence/` | What if every sound on Earth suddenly vanished? | flat cartoon | 54 s |
| `simulation/` | What if your entire life was a simulation? | flat cartoon | 53 s |
| `ocean/` | What if the oceans rose into the sky? | flat cartoon | 56 s |
| `stop-time-hyperframes/` | What if you could stop time? (built with HyperFrames, no music) | flat cartoon (HyperFrames) | 34 s |
| `brain-hiding-whiteboard/` | Same episode, whiteboard doodle style (reuses `brain-hiding/` audio) | whiteboard doodle | 50 s |
| `brain-hiding/` | Your brain is hiding something from you (blind spot, no music) | flat cartoon | 50 s |
| `crush-thoughts/` | What if your crush could hear your thoughts? (no music, 2 voices) | flat cartoon | 56 s |
| `gta-preload/` | GTA 6 is preloaded but locked: how preloads work (no music) | flat cartoon | 79 s |
| `meta-knows-you/` | What if the AI race is won by the AI that knows you best? (Meta, no music) | flat cartoon | 80 s |
| `musk-machine/` | What if all of Elon Musk's companies are one giant machine? (no music) | flat cartoon | 77 s |
| `longform-demographics/` | What if there are fewer of us? (long-form, 1920×1080) | flat cartoon | 9:59 |
| `longform-space-sound-flat/` | Same Jack & Tilly episode in flat cartoon (reuses `longform-space-sound/` voice, timing and audio) | flat cartoon | 5:10 |
| `longform-space-sound/` | Jack & Tilly: why can't you hear explosions in space? (long-form, 3 voices, no music) | stick figure | 5:10 |
| `longform-first-home/` | How to Buy Your First House on a Median Income (long-form, 1920×1080) | flat cartoon | 4:52 |
| `longform-nvidia/` | Nvidia, Alice Huang and the warnings Washington got (long-form, 1920×1080, no music, sourced and hedged) | flat cartoon | 6:09 |
| `no-lies-24h/` | What if every human lost the ability to lie for 24 hours? (no music) | flat cartoon | 64 s |
| `ms-outage/` | Microsoft 365 outage: one company down, the world goes with it (remake of a reel, original wording, no music) | flat cartoon | 62 s |
| `gta6-laptop/` | Can hackers run GTA 6 on a laptop? (English remake of a Hindi reel, facts unchanged, no music) | flat cartoon | 2:55 |

## Rebuild an episode

Run these from inside the episode's folder. They need the MoneyPrinterTurbo venv (for `edge-tts`), Node with Playwright, and ffmpeg.

```bash
python tts.py          # narration per line (script.json; invisible/ keeps its lines in tts.py)
python3 timeline.py    # scene + caption timing -> timeline.json
python audio.py        # music.wav, sfx.wav, voice.wav
node render.js video   # draws every frame from render.html -> video_noaudio.mp4
ffmpeg -y -i voice.wav -i music.wav -i sfx.wav -filter_complex "[0:a]asplit=2[v][sc];[1:a]volume=0.32[m];[m][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=300[md];[2:a]volume=0.5[s];[v][md][s]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11[out]" -map "[out]" -ar 44100 -ac 2 mix.wav
ffmpeg -y -i video_noaudio.mp4 -i mix.wav -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart final.mp4
```

`invisible/render_flat.html` is the flat cartoon version: render it with `PAGE=render_flat.html OUT=video_flat_noaudio.mp4 node render.js video`.

## Long-form (1920×1080)

`longform-demographics/` uses its own pipeline: `segments.py` -> `tts_long.py` -> `timeline_long.py` -> `audio_long.py` -> `node render.js video`, then the same ffmpeg mix and mux.

## Channel defaults

- **No background music.** Audio is narration plus light sound effects only (pops, whooshes, booms). The `musk-machine/` episode's `audio.py` is the template: it writes a silent `music.wav`, and the mix uses voice + sfx only.
- Style: flat cartoon, vertical 1080×1920 for Shorts; word-by-word captions.
- Scripts based on other creators' videos are rewritten as original scripts and approved before rendering; facts about real people are hedged or checked.
