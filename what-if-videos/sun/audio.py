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
beat = 60 / 108 / 2
# sunny major plucks: scenes 0-1
maj = [[72, 76, 79, 84], [77, 81, 84, 89], [79, 83, 86, 91], [72, 76, 79, 84]]
t = 0.0; k = 0
while t < sc[2]["a"]:
    ch = maj[(k // 4) % 4]; put(music, t, pluck(ch[[0, 2, 1, 3][k % 4]], .35), .2); t += beat; k += 1
# nightmare: minor pulse, scenes 2-6
mn = [45, 45, 41, 43]; t = sc[2]["a"]; k = 0
while t < sc[7]["a"]:
    put(music, t, pluck(mn[(k // 8) % 4], .3), .45); 
    if k % 2 == 0: put(music, t, pluck(mn[(k // 8) % 4] + 24 + [0, 3, 7, 3][(k // 2) % 4], .3), .12)
    t += beat; k += 1
pad([45, 52, 57], sc[2]["a"], sc[7]["a"], .025)
# twist / space: deep pad
pad([33, 40, 45], sc[7]["a"], sc[10]["a"], .05); pad([57, 64], sc[8]["a"], sc[10]["a"], .02)
# two worlds + question: plucks alternating high/low
t = sc[10]["a"]; k = 0
while t < sc[11]["b"] - 1.2:
    put(music, t, pluck([69, 72, 76, 72][k % 4] + (0 if (k // 4) % 2 else -12), .4), .2); t += beat * 2; k += 1
put(music, WT(11, "you"), bell(69, 3.5), .3)
put(sfx, WT(2, "wrong"), boom(.7), .8); put(sfx, WT(2, "wrong"), pop(), .4)
put(sfx, sc[1]["a"] + .4 * (sc[1]["b"] - sc[1]["a"]), pop(), .4)
put(sfx, sc[5]["a"] + .2, hoot(), .5); put(sfx, sc[5]["a"] + 1.4, hoot(), .4)
put(sfx, sc[6]["a"], sizzle(sc[6]["b"] - sc[6]["a"]), .6)
put(sfx, sc[7]["a"] + .1, boom(2.2), .9)
put(sfx, WT(8, "lock"), pop(), .5); put(sfx, WT(8, "burn"), sizzle(2.0), .6)
put(sfx, sc[9]["a"], wind(sc[9]["b"] - sc[9]["a"] + .5), .7)
put(sfx, sc[10]["a"], sizzle(2.2), .35); put(sfx, sc[10]["a"] + .7, wind(2.0), .5)
put(sfx, WT(11, "you") - .2, pop(), .5); put(sfx, WT(11, "you"), pop(), .5)
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
