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
beat = 60 / 96 / 2
def surf(d): n = noise(d); t = np.arange(len(n))/SR; return lp(n, .04) * 3 * (.6 + .4*np.sin(2*np.pi*.18*t)) * np.minimum(1, t/.4)
def rumble(d): n = noise(d); t = np.arange(len(n))/SR; return lp(n, .004) * 14 * np.minimum(1, t/.8) * np.minimum(1, (d - t)/.8)
def riser(d=2.5): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*np.cumsum(120 + 500*(t/d)**2)/SR) * .3 * (t/d)
def drip(): t = np.arange(int(SR*.15))/SR; return np.sin(2*np.pi*np.cumsum(900 + 1400*t/.15)/SR) * np.exp(-t*30) * .5
def splat(): n = noise(.25); t = np.arange(len(n))/SR; return lp(n, .3) * np.exp(-t*18)
def horn(m=33, d=3.5): t = np.arange(int(SR*d))/SR; fr = f(m); s = sum(np.sin(2*np.pi*fr*k*t)/k for k in range(1, 8)); return s * .3 * np.minimum(1, t/.6) * np.minimum(1, (d - t)/1.2)
rs = WT(0, "rise")
# calm beach: soft plucks + waves until the water starts rising
t = 0.0; k = 0
while t < rs:
    put(music, t, pluck([72, 76, 79, 76][k % 4], .4), .16); t += beat; k += 1
put(sfx, 0, surf(rs + 1.5) * np.minimum(1, (rs + 1.5 - np.arange(int(SR*(rs+1.5)))/SR)/1.5), .5)
put(sfx, rs - .3, riser(2.5), .6)
# epic minor build: scenes 2-5
t = sc[2]["a"]; k = 0; prog_ = [57, 53, 55, 52]
while t < sc[6]["a"]:
    root = prog_[(k // 8) % 4]; put(music, t, pluck(root - 24, .4), .45)
    if k % 2 == 0: put(music, t, pluck(root + [0, 3, 7, 12][(k // 2) % 4], .35), .15)
    t += beat; k += 1
pad([45, 52, 57], sc[2]["a"], sc[6]["a"], .03)
put(sfx, sc[3]["a"], rumble(sc[3]["b"] - sc[3]["a"] + .5), .7)
for i in range(10): put(sfx, sc[3]["a"] + .3 + i * .27, drip(), .3)
put(sfx, sc[4]["a"] + .4 * (sc[4]["b"] - sc[4]["a"]), boom(1.4), .9); put(sfx, sc[4]["a"] + .4 * (sc[4]["b"] - sc[4]["a"]), splat(), .7)
for i in range(8): put(sfx, sc[5]["a"] + .2 + i * .45, splat(), .25)
# terrifying -> collapse: low pulse
t = sc[6]["a"]
while t < sc[9]["a"]: put(music, t, pluck(33, .3), .45); t += beat * 2
pad([33, 40, 44], sc[6]["a"], sc[9]["a"], .03)
put(sfx, sc[9]["a"], boom(1.8), .9)
# twist -> force: sparse, then tension
pad([45, 52, 57, 64], sc[9]["a"], sc[12]["a"], .03)
put(sfx, sc[11]["a"], riser(sc[11]["b"] - sc[11]["a"]), .4)
# ending: ominous drone + deep horn at WHAT
pad([33, 40, 45], sc[12]["a"], TOT, .045)
put(sfx, sc[12]["a"], rumble(TOT - sc[12]["a"]), .35)
put(music, WT(14, "what") - .1, horn(33, 4.0), .5)
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
