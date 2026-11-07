import json, numpy as np, subprocess, wave
TL = json.load(open("timeline.json")); SR = 44100; TOT = TL["total"]; N = int(SR * TOT)
sc = TL["scenes"]; A = lambda i, p: sc[i]["a"] + p * (sc[i]["b"] - sc[i]["a"])
music = np.zeros(N); sfx = np.zeros(N)
def put(buf, t, sig, g=1.0):
    i = int(t * SR); j = min(N, i + len(sig))
    if i < N: buf[i:j] += sig[: j - i] * g
f = lambda m: 440 * 2 ** ((m - 69) / 12)
def pluck(m, dur=.35):
    t = np.arange(int(SR * dur)) / SR; fr = f(m)
    return (np.sin(2*np.pi*fr*t) + .4*np.sin(4*np.pi*fr*t) + .15*np.sin(6*np.pi*fr*t)) * np.exp(-t * 11) * np.minimum(1, t * 400)
def piano(m, dur=2.2):
    t = np.arange(int(SR * dur)) / SR; fr = f(m)
    return (np.sin(2*np.pi*fr*t) + .3*np.sin(4*np.pi*fr*t) + .1*np.sin(6*np.pi*fr*t)) * np.exp(-t * 2.2) * np.minimum(1, t * 300)
def pad(ms, t0, t1, g):
    t = np.arange(int(SR * (t1 - t0))) / SR; env = np.minimum(1, t / 1.2) * np.minimum(1, (t1 - t0 - t) / 1.0)
    s = sum(np.sin(2*np.pi*f(m)*t) + .2*np.sin(2*np.pi*f(m)*1.003*t) for m in ms) * (1 + .15*np.sin(2*np.pi*.5*t))
    put(music, t0, s * env, g)
beat = 60 / 100 / 2  # eighth notes at 100 BPM
chords = [[60, 64, 67, 72], [57, 60, 64, 69], [53, 57, 60, 65], [55, 59, 62, 67]]
# 0 -> end of scene 1: bouncy pluck arpeggio
t = 0.0; k = 0
while t < sc[1]["b"]:
    ch = chords[(k // 8) % 4]; put(music, t, pluck(ch[[0, 2, 1, 3, 2, 1, 3, 2][k % 8]] + 12), .22)
    if k % 4 == 0: put(music, t, pluck(ch[0] - 12, .5), .25)
    t += beat; k += 1
# twist: low pad through scenes 2-3
pad([45, 52, 57], sc[2]["a"], sc[3]["b"] + .4, .05)
# tension pulse in traffic + phone
t = sc[4]["a"]
while t < sc[5]["b"]:
    put(music, t, pluck(33, .25), .45); put(music, t + beat, pluck(45, .2), .18); t += beat * 2
# hour 24: rising arpeggio
t = sc[6]["a"]; seq = [57, 60, 64, 69, 72, 76, 81]; i = 0
while t < sc[6]["b"] - .1:
    put(music, t, pluck(seq[i % len(seq)] + (12 if i >= len(seq) else 0)), .2); t += beat; i += 1
# lonely ending piano
for dt, m in [(0, 69), (.9, 64), (1.8, 60), (2.6, 57)]: put(music, sc[7]["a"] + dt, piano(m), .2)
# --- sfx ---
def noise(d): return np.random.randn(int(SR * d))
def whoosh(d=.6, lo=300, hi=3000):
    n = noise(d); t = np.arange(len(n)) / SR; env = np.sin(np.pi * t / d) ** 2
    out = np.zeros_like(n); y = 0
    for i in range(len(n)):
        c = lo + (hi - lo) * (t[i] / d); a = min(1, 2*np.pi*c/SR); y += a * (n[i] - y); out[i] = y
    return out * env
def pop(): t = np.arange(int(SR*.12))/SR; return np.sin(2*np.pi*(900 - 5000*t)*t) * np.exp(-t*40)
def boom(): t = np.arange(int(SR*1.4))/SR; return np.sin(2*np.pi*(60 - 25*t)*t) * np.exp(-t*3)
def buzz(): t = np.arange(int(SR*.45))/SR; s = np.sign(np.sin(2*np.pi*140*t)) * .5; return s * (np.sin(2*np.pi*9*t) > -0.2) * np.exp(-t*2)
def ding(): t = np.arange(int(SR*1.2))/SR; return (np.sin(2*np.pi*1320*t) + .5*np.sin(2*np.pi*1980*t)) * np.exp(-t*4)
put(sfx, .55, pop(), .5); put(sfx, .6, ding(), .12)
for p in [.12, .38, .62]: put(sfx, A(2, p), whoosh(.7, 400, 4000), .35)
put(sfx, A(3, .05), whoosh(.6, 400, 4000), .35); put(sfx, A(3, .3), boom(), .7); put(sfx, A(3, .74), boom(), .5)
put(sfx, A(4, .48), whoosh(1.0, 150, 2500), .7)
FT = next(w["s"] for w in TL["words"] if w["line"] == 5 and "ail" in w["w"].lower()) - .05
put(sfx, FT, buzz(), .25)
put(sfx, A(6, .62), pop(), .5); put(sfx, A(6, .62), ding(), .15)
def wav(name, x):
    x = np.clip(x, -1, 1); w = wave.open(name, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
music *= .9 / max(1e-9, np.abs(music).max()); sfx *= .9 / max(1e-9, np.abs(sfx).max())
wav("music.wav", music); wav("sfx.wav", sfx)
# narration: place each line at its start time
ins, flt = [], []
for i, s in enumerate(TL["starts"]):
    ins += ["-i", f"line{i}.mp3"]; flt.append(f"[{i}:a]adelay={int(s*1000)}:all=1[a{i}]")
n = len(TL["starts"])
flt.append("".join(f"[a{i}]" for i in range(n)) + f"amix=inputs={n}:normalize=0,apad,atrim=0:{TOT}[v]")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(flt), "-map", "[v]", "-ar", str(SR), "voice.wav"], check=True)
print("ok")
