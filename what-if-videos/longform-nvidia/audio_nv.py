import json, numpy as np, subprocess, wave
TL = json.load(open("timeline.json")); SR = 44100; TOT = TL["total"]; N = int(SR * TOT)
sfx = np.zeros(N); voice = np.zeros(N); rng = np.random.default_rng(7)
def put(buf, t, sig, g=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if 0 <= i < N: buf[i:j] += sig[: j - i] * g
def env(n, k): t = np.arange(n) / SR; return t, np.exp(-t * k)
def pop():
    t, e = env(int(SR * .09), 45); f = 520 + 900 * np.exp(-t * 60); return np.sin(2 * np.pi * np.cumsum(f) / SR) * e * .5
def whoosh(d=.7):
    n = int(SR * d); x = rng.standard_normal(n); y = np.zeros(n); a = 0.0; t = np.arange(n) / SR
    for i in range(n): c = .02 + .25 * np.sin(np.pi * t[i] / d) ** 2; a += c * (x[i] - a); y[i] = a
    return y * np.sin(np.pi * t / d) ** 2 * 1.6
def thud():
    t, e = env(int(SR * .35), 14); return (np.sin(2 * np.pi * 70 * t) + .4 * rng.standard_normal(len(t)) * np.exp(-t * 60)) * e
segs = TL["segs"]
for s in segs:
    if s["scene"] == "chapter": put(sfx, s["a"] + .05, whoosh(), .9)
    elif s.get("kick"): put(sfx, s["a"] + .2, pop(), .45)
    if s["scene"] == "chips7": put(sfx, s["a"] + .3, thud(), 1.0)
    if s["scene"] == "workaround" and s["params"].get("mode") == "smuggle":
        w = next((w["s"] for w in s["words"] if w["w"].lower().startswith("charged")), None)
        if w: put(sfx, w, thud(), .8)
for s in segs:
    if "voice" not in s: continue
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", s["voice"]["file"], "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    put(voice, s["voice"]["start"], np.frombuffer(raw, np.int16).astype(np.float64) / 32768)
def wav(name, x):
    x = np.clip(x, -1, 1); w = wave.open(name, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
sfx *= .6 / np.abs(sfx).max(); wav("sfx.wav", sfx); wav("voice.wav", voice); print("audio ok", TOT)
