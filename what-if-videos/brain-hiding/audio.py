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
WT = lambda line, sub: next((w["s"] for w in TL["words"] if w["line"] == line and sub in w["w"].lower()), None)
def noise(d): return np.random.randn(int(SR * d))
def lp(n, a=.05):
    y = 0; out = np.zeros_like(n)
    for i in range(len(n)): y += a * (n[i] - y); out[i] = y
    return out
def pop(): t = np.arange(int(SR*.12))/SR; return np.sin(2*np.pi*(900 - 5000*t)*t) * np.exp(-t*40)
def boom(d=1.6): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*(55 - 20*t)*t) * np.exp(-t*2.5)
def hoot(): t = np.arange(int(SR*.9))/SR; fr = 380 - 60*t; return np.sin(2*np.pi*np.cumsum(fr)/SR) * np.sin(np.pi*t/.9)**2 * .6
def sizzle(d): n = noise(d); t = np.arange(len(n))/SR; return (n - lp(n, .3)) * .15 * np.minimum(1, t/.5) * np.minimum(1, (d - t)/.5)
def wind(d): n = noise(d); t = np.arange(len(n))/SR; return lp(n, .02) * 3 * (1 + .5*np.sin(2*np.pi*.4*t)) * np.minimum(1, t/.5) * np.minimum(1, (d - t)/.5)
def bell(m, d=3.0): t = np.arange(int(SR*d))/SR; fr = f(m); return (np.sin(2*np.pi*fr*t) + .5*np.sin(2*np.pi*fr*2.76*t) + .25*np.sin(2*np.pi*fr*5.4*t)) * np.exp(-t*1.3)
# NO MUSIC for this episode (user request): sound effects only
def rumble(d): n = noise(d); t = np.arange(len(n))/SR; return lp(n, .004) * 14 * np.minimum(1, t/.8) * np.minimum(1, (d - t)/.8)
def riser(d=2.5): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*np.cumsum(120 + 500*(t/d)**2)/SR) * .3 * (t/d)
def blip(m=84, d=.12): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*f(m)*t) * .4 * np.exp(-t*25)
def click(): t = np.arange(int(SR*.08))/SR; return np.sin(2*np.pi*1600*t) * np.exp(-t*60) * .5
def whoosh(d=.6, lo=300, hi=3000):
    n = noise(d); t = np.arange(len(n)) / SR; env = np.sin(np.pi * t / d) ** 2; out = np.zeros_like(n); y = 0
    for i in range(len(n)):
        c = lo + (hi - lo) * (t[i] / d); a = min(1, 2*np.pi*c/SR); y += a * (n[i] - y); out[i] = y
    return out * env
def ding(): t = np.arange(int(SR*1.0))/SR; return (np.sin(2*np.pi*1320*t) + .5*np.sin(2*np.pi*1980*t)) * np.exp(-t*4) * .4
def snip(): n = noise(.06); t = np.arange(len(n))/SR; return n * np.exp(-t*80) * .6
def shutter(): return np.concatenate([snip(), np.zeros(int(SR*.05)), snip()])
put(sfx, sc[0]["a"] + .4, whoosh(.5, 300, 2500), .3); put(sfx, WT(0, "hiding"), boom(.6), .5)
put(sfx, sc[2]["a"], whoosh(.8, 200, 3000), .3)
for w in ["edits", "filters", "fills"]: put(sfx, WT(4, w), pop(), .45)
put(sfx, WT(4, "edits"), snip(), .5)
put(sfx, WT(5, "blind"), boom(.6), .5)
put(sfx, sc[6]["a"] + .3, boom(1.0), .4)
put(sfx, sc[7]["a"], pop(), .5)
put(sfx, sc[8]["b"] - .8, ding(), .35)
put(sfx, sc[9]["a"], boom(1.6), .8)
put(sfx, sc[10]["a"] + .2, shutter(), .6)
for k in range(4): put(sfx, sc[13]["a"] + .3 + k * .7, pop(), .25)
put(sfx, sc[14]["a"] + .2, pop(), .4)
def wav(name, x):
    x = np.clip(x, -1, 1); w = wave.open(name, "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x * 32767).astype(np.int16).tobytes()); w.close()
sfx *= .9 / max(1e-9, np.abs(sfx).max())
wav("music.wav", music); wav("sfx.wav", sfx)
# narration: place each line at its start time
ins, flt = [], []
for i, s in enumerate(TL["starts"]):
    ins += ["-i", f"line{i}.mp3"]; flt.append(f"[{i}:a]adelay={int(s*1000)}:all=1[a{i}]")
n = len(TL["starts"])
flt.append("".join(f"[a{i}]" for i in range(n)) + f"amix=inputs={n}:normalize=0,apad,atrim=0:{TOT}[v]")
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(flt), "-map", "[v]", "-ar", str(SR), "voice.wav"], check=True)
print("ok")
