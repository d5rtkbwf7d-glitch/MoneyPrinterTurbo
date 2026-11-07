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
beat = 60 / 112 / 2
def splash(): n = noise(.8); t = np.arange(len(n))/SR; return (n - lp(n, .2)) * np.exp(-t*5) * .8
def squeak(): t = np.arange(int(SR*.25))/SR; return np.sin(2*np.pi*np.cumsum(2400 - 1200*t)/SR) * np.exp(-t*10) * .5
# playful plucks (tiny world): scenes 0-6
pl = [[76, 79, 83, 88], [74, 77, 81, 86], [72, 76, 79, 84], [74, 79, 83, 86]]
t = 0.0; k = 0
while t < sc[7]["a"]:
    ch = pl[(k // 4) % 4]; put(music, t, pluck(ch[[0, 2, 1, 3][k % 4]], .3), .17)
    if k % 4 == 0: put(music, t, pluck(ch[0] - 24, .4), .2)
    t += beat; k += 1
# twist -> dangers: minor pulse
t = sc[7]["a"]; k = 0
while t < sc[11]["a"]:
    put(music, t, pluck([45, 45, 41, 43][(k // 8) % 4], .3), .42); t += beat; k += 1
pad([45, 52, 57], sc[7]["a"], sc[11]["a"], .025)
# real science: calm pad; ending: ocean pad + bell
pad([60, 64, 67], sc[11]["a"], sc[12]["a"] + .3, .03)
pad([45, 52, 57, 64], sc[12]["a"], TOT, .04)
put(music, WT(13, "survive"), bell(69, 3.5), .3)
put(sfx, WT(0, "ant") - .3, pop(), .5); put(sfx, WT(0, "ant") - .2, squeak(), .4)
put(sfx, WT(3, "wreck") - .1, boom(1.0), .8); put(sfx, WT(3, "wreck") - .1, splash(), .7)
put(sfx, sc[5]["a"] + .3, wind(sc[5]["b"] - sc[5]["a"] - .6), .5)
put(sfx, sc[6]["a"] + .3, pop(), .4)
put(sfx, sc[7]["a"], boom(1.8), .8)
put(sfx, sc[8]["a"], wind(sc[8]["b"] - sc[8]["a"]), .5)
for w in ["dust", "puddle", "insect"]: put(sfx, WT(10, w), pop(), .45)
put(sfx, WT(11, "can"), boom(.6), .6)
put(sfx, sc[12]["a"], wind(TOT - sc[12]["a"]), .25)
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
