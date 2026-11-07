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
beat = 60 / 100 / 2
def blip(m=84, d=.12): t = np.arange(int(SR*d))/SR; return np.sign(np.sin(2*np.pi*f(m)*t)) * .3 * np.exp(-t*25)
def glitchfx(d=.35): n = noise(d); n = np.repeat(n[::40], 40)[:len(n)]; t = np.arange(len(n))/SR; return np.sign(n) * .35 * (np.sin(2*np.pi*23*t) > 0) * np.exp(-t*4)
def tapestop(m=57, d=.9): t = np.arange(int(SR*d))/SR; fr = f(m) * (1 - t/d) ** 2; return np.sign(np.sin(2*np.pi*np.cumsum(fr)/SR)) * .25 * (1 - t/d)
def rewind(d=1.2): t = np.arange(int(SR*d))/SR; fr = 300 + 1800 * (t/d); return np.sin(2*np.pi*np.cumsum(fr * (1 + .3*np.sin(2*np.pi*14*t)))/SR) * .3 * np.minimum(1, (d - t) * 6)
# calm "normal life" plucks until FAKE
fk = WT(0, "fake")
t = 0.0; k = 0
while t < fk:
    put(music, t, pluck([72, 76, 79, 83][k % 4], .35), .18); t += beat; k += 1
# digital arpeggio (square-ish blips), minor, from line 2 to the terrifying part
t = sc[2]["a"]; k = 0; seq = [57, 60, 64, 67, 64, 60]
while t < sc[7]["a"]:
    put(music, t, blip(seq[k % 6] + 12, .14), .5); 
    if k % 6 == 0: put(music, t, pluck(seq[0] - 12, .6), .3)
    t += beat; k += 1
pad([45, 52, 57], sc[2]["a"], sc[7]["a"], .02)
# terrifying -> controls: low pulse
t = sc[7]["a"]
while t < sc[10]["a"]: put(music, t, pluck(33, .3), .45); t += beat * 2
pad([33, 40, 44], sc[7]["a"], sc[10]["a"], .03)
# twist -> science: sparse pad
pad([45, 52, 57, 64], sc[10]["a"], sc[13]["a"], .03)
# ending: ominous low pad + heartbeat
pad([33, 40, 45], sc[13]["a"], TOT, .045)
for i in range(7): put(sfx, sc[13]["a"] + i * .8, boom(.45), .3)
put(sfx, fk, glitchfx(.6), .9)
for w, l in [("family", 1), ("memor", 1), ("ground", 1)]: put(sfx, WT(l, w), glitchfx(.25), .5)
put(sfx, WT(2, "everything"), glitchfx(.8), .8)
for i in range(3): put(sfx, WT(4, "program") + i * .12, blip(88 + i * 4), .6)
put(sfx, sc[5]["a"] + .3 * (sc[5]["b"] - sc[5]["a"]), pop(), .4)
for i in range(3): put(sfx, sc[7]["a"] + (i * .2 + .1) * (sc[7]["b"] - sc[7]["a"]), blip(70, .25), .7)
put(sfx, WT(8, "pause") + .2, tapestop(), .8)
put(sfx, WT(8, "erase"), glitchfx(1.0), .5)
put(sfx, WT(8, "restart"), rewind(), .7)
put(sfx, sc[10]["a"], glitchfx(.5), .8); put(sfx, sc[10]["a"], boom(1.6), .8)
put(sfx, WT(14, "play"), blip(76, .4), .6)
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
