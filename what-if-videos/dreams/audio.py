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
beat = 60 / 84 / 2
WT = lambda line, sub: next((w["s"] for w in TL["words"] if w["line"] == line and sub in w["w"].lower()), None)
# dreamy music box: scenes 0-2
box_ch = [[72, 76, 79, 84], [69, 72, 76, 81], [65, 69, 72, 77], [67, 71, 74, 79]]
t = 0.0; k = 0
while t < sc[2]["b"]:
    ch = box_ch[(k // 8) % 4]; put(music, t, pluck(ch[[0, 1, 2, 3, 2, 1, 2, 1][k % 8]] + 12, .5), .16)
    if k % 8 == 0: pad([ch[0] - 24, ch[0] - 12], t, t + beat * 8 + .3, .02)
    t += beat; k += 1
# viral -> dream -> 3:07: tense pulse, getting faster
t = sc[3]["a"]
while t < sc[5]["b"]:
    fast = t > sc[5]["a"]; put(music, t, pluck(33, .25), .45); put(music, t + beat * .5, pluck(45, .2), .15); t += beat * (1 if fast else 2)
pad([45, 52, 57], sc[4]["a"], sc[4]["b"] + .3, .04)
pad([41, 48, 53], sc[6]["a"], sc[6]["b"] + .2, .04)
# ending: eerie music box, slowed, minor
for i, m in enumerate([81, 77, 76, 72, 69]): put(music, sc[7]["a"] + i * .55, pluck(m, 1.0), .18)
def noise(d): return np.random.randn(int(SR * d))
def whoosh(d=.6, lo=300, hi=3000):
    n = noise(d); t = np.arange(len(n)) / SR; env = np.sin(np.pi * t / d) ** 2
    out = np.zeros_like(n); y = 0
    for i in range(len(n)):
        c = lo + (hi - lo) * (t[i] / d); a = min(1, 2*np.pi*c/SR); y += a * (n[i] - y); out[i] = y
    return out * env
def pop(): t = np.arange(int(SR*.12))/SR; return np.sin(2*np.pi*(900 - 5000*t)*t) * np.exp(-t*40)
def boom(d=1.4): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*(60 - 25*t)*t) * np.exp(-t*3)
def ping(): t = np.arange(int(SR*.4))/SR; return (np.sin(2*np.pi*1760*t) + .4*np.sin(2*np.pi*2640*t)) * np.exp(-t*9)
def crash(d=1.6):
    n = noise(d); t = np.arange(len(n)) / SR; y = 0; out = np.zeros_like(n)
    for i in range(len(n)): y += .08 * (n[i] - y); out[i] = y
    return out * np.exp(-t * 2.5) * 4
def static(d=.6): return noise(d) * .3 * np.exp(-np.arange(int(SR*d))/SR*2)
for i in range(6): put(sfx, A(0, .55 + i * .05), pop(), .35)
put(sfx, A(0, .5), whoosh(.6, 400, 4000), .3)
put(sfx, WT(1, "crush") or A(1, .5), whoosh(.4, 300, 3000), .25)
for i in range(4): put(sfx, A(2, i * .1), pop(), .3)
for i in range(6): put(sfx, A(3, .1 + i * .13), ping(), .25)
c4 = WT(4, "collaps"); put(sfx, c4, crash(), .6); put(sfx, c4, boom(), .5)
c5 = WT(5, "happen") - .15; put(sfx, c5, crash(), .8); put(sfx, c5, boom(1.8), .8); put(sfx, c5 + .9, whoosh(1.0, 200, 1500), .4)
put(sfx, A(6, 0), boom(), .3)
put(sfx, A(7, .05), static(), .5); nx = WT(7, "next"); put(sfx, nx, ping(), .35); put(sfx, nx + .5, boom(), .6)
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
