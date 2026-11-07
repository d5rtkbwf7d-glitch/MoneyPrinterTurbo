import json, numpy as np, subprocess, wave
TL = json.load(open("timeline.json")); SR = 44100; TOT = TL["total"]; N = int(SR * TOT)
music = np.zeros(N); sfx = np.zeros(N)
def put(buf, t, sig, g=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if 0 <= i < N: buf[i:j] += sig[: j - i] * g
f = lambda m: 440 * 2 ** ((m - 69) / 12)
def piano(m, dur=2.4):
    t = np.arange(int(SR * dur)) / SR; fr = f(m)
    return (np.sin(2*np.pi*fr*t) + .35*np.sin(4*np.pi*fr*t) + .12*np.sin(6*np.pi*fr*t)) * np.exp(-t * 2.0) * np.minimum(1, t * 300)
def pad(ms, t0, t1, g):
    t = np.arange(int(SR * (t1 - t0))) / SR; env = np.minimum(1, t / 2) * np.minimum(1, (t1 - t0 - t) / 2)
    s = sum(np.sin(2*np.pi*f(m)*t) + .15*np.sin(2*np.pi*f(m)*1.004*t) for m in ms); put(music, t0, s * env, g)
# soft piano bed, 76 BPM, I-vi-IV-V in a key that changes per section
beat = 60 / 76
segs = TL["segs"]; titles = [s["a"] for s in segs if s["scene"] == "title"]
bounds = [0] + titles + [TOT]; keys = [0, 2, -3, 5, -2, 0, 3]
prog = [[0, 4, 7], [-3, 0, 4], [-7, -3, 0], [-5, -1, 2]]
for si in range(len(bounds) - 1):
    a, b, key = bounds[si], bounds[si + 1], keys[si % len(keys)]
    t = a + (3.0 if si else 0); k = 0
    while t < b - 1:
        ch = prog[(k // 4) % 4]; root = 60 + key
        put(music, t, piano(root + ch[[0, 1, 2, 1][k % 4]] + 12, 2.0), .10)
        if k % 4 == 0: put(music, t, piano(root + ch[0] - 12, 3.5), .12); pad([root + c for c in ch], t, min(b, t + beat * 4 + .5), .012)
        t += beat; k += 1
# sfx
def noise(d): return np.random.randn(int(SR * d))
def bell(m, d=3.0): t = np.arange(int(SR*d))/SR; fr = f(m); return (np.sin(2*np.pi*fr*t) + .5*np.sin(2*np.pi*fr*2.76*t) + .25*np.sin(2*np.pi*fr*5.4*t)) * np.exp(-t*1.1)
def schoolbell(d=2.6): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*1180*t) * (np.sin(2*np.pi*22*t) > 0) * .5 * np.minimum(1, (d - t) * 2)
def whoosh(d=.7):
    n = noise(d); t = np.arange(len(n)) / SR; env = np.sin(np.pi * t / d) ** 2; out = np.zeros_like(n); y = 0
    for i in range(len(n)):
        c = 300 + 3000 * (t[i] / d); a = min(1, 2*np.pi*c/SR); y += a * (n[i] - y); out[i] = y
    return out * env
def pop(): t = np.arange(int(SR*.12))/SR; return np.sin(2*np.pi*(900 - 5000*t)*t) * np.exp(-t*40)
put(sfx, .4, schoolbell(), .45)
W = whoosh()
for s in segs:
    if s["scene"] == "title": put(sfx, s["a"], W, .5); put(sfx, s["a"] + .35, bell(76, 2.5), .25)
    elif s.get("kick"): put(sfx, s["a"] + .15, pop(), .18)
def wav(name, x):
    x = np.clip(x, -1, 1); w = wave.open(name, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
music *= .9 / np.abs(music).max(); sfx *= .9 / np.abs(sfx).max(); wav("music.wav", music); wav("sfx.wav", sfx)
# narration track
voice = np.zeros(N)
for s in segs:
    if "voice" not in s: continue
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", s["voice"]["file"], "-f", "s16le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True, check=True).stdout
    put(voice, s["voice"]["start"], np.frombuffer(raw, np.int16).astype(np.float64) / 32768)
wav("voice.wav", voice); print("audio ok", round(TOT, 1))
