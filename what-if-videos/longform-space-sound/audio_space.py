import json, numpy as np, subprocess, wave
TL = json.load(open("timeline.json")); SR = 44100; TOT = TL["total"]; N = int(SR * TOT)
sfx = np.zeros(N); voice = np.zeros(N); rng = np.random.default_rng(3)
def put(buf, t, sig, g=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if 0 <= i < N: buf[i:j] += sig[: j - i] * g
def lp(x, a):
    y = np.zeros_like(x); acc = 0.0
    for n in range(len(x)): acc += a * (x[n] - acc); y[n] = acc
    return y
def knock(): n = rng.standard_normal(int(SR * .18)); t = np.arange(len(n)) / SR; return (lp(n, .08) * 5 + np.sin(2 * np.pi * 160 * t) * .6) * np.exp(-t * 30)
def tick(): n = rng.standard_normal(int(SR * .06)); t = np.arange(len(n)) / SR; return (n * .4 + np.sin(2 * np.pi * 2400 * t)) * np.exp(-t * 90)
def click(): n = rng.standard_normal(int(SR * .03)); t = np.arange(len(n)) / SR; return n * np.exp(-t * 200)
def bell(d, gain_curve):
    t = np.arange(int(SR * d)) / SR; strike = (t % 0.11) < 0.004
    s = sum(np.sin(2 * np.pi * f * t) * a for f, a in [(1180, 1), (2950, .4), (5300, .15)]) * (.55 + .45 * np.sin(2 * np.pi * 9 * t))
    return s * gain_curve(t) * .35
segs = TL["segs"]
def seg_where(scene, mode=None):
    return [s for s in segs if s["scene"] == scene and (mode is None or s["params"].get("mode") == mode)]
def wtime(seg, prefix):
    for w in seg.get("words", []):
        if w["w"].lower().startswith(prefix): return w["s"]
    return None
# table taps (the tap animation repeats every ~0.63 s while the finger is down)
for s in seg_where("table") + seg_where("tableEar"):
    t = s["a"] + .3
    while t < s["b"] - .2:
        put(sfx, t, knock(), .55 if s["scene"] == "table" else (.75 if (t - s["a"]) / (s["b"] - s["a"]) < .5 else .3)); t += np.pi / 5
# bell jar: loud, fading as the air is pumped out, near-silent, then back
for s in seg_where("bell"):
    m = s["params"].get("mode"); d = s["b"] - s["a"]
    if m == "ring": g = lambda t: np.minimum(1, t / .3) * 1.0
    elif m == "pump": g = lambda t, d=d: np.clip(1 - (t / d - .15) / .8 * .92, .08, 1)
    elif m == "pumped": g = lambda t: np.full_like(t, .06)
    else: g = lambda t, d=d: np.clip(.08 + (t / d - .55) / .4 * .92, .08, 1)
    put(sfx, s["a"], bell(d, g), 1.0)
# radio click when Jack presses the button
for s in seg_where("spacewalk", "radio"):
    w = wtime(s, "radio")
    if w: put(sfx, w + .05, click(), .8); break
# Moon: the knock is only heard when Tilly plays back the sensor recording
s = seg_where("moon", "sensor2")
if s: put(sfx, s[0]["a"] + .4, knock(), .9)
# the window: one little tap, heard from inside
s = seg_where("ship", "impact")
if s: put(sfx, s[0]["a"] + .75 * (s[0]["b"] - s[0]["a"]), tick(), .9); put(sfx, s[0]["a"] + .75 * (s[0]["b"] - s[0]["a"]), knock(), .3)
for s in segs:
    if "voice" not in s: continue
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", s["voice"]["file"], "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    put(voice, s["voice"]["start"], np.frombuffer(raw, np.int16).astype(np.float64) / 32768)
def wav(name, x):
    x = np.clip(x, -1, 1); w = wave.open(name, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
sfx *= .7 / np.abs(sfx).max(); wav("sfx.wav", sfx); wav("voice.wav", voice); print("audio ok", TOT)
