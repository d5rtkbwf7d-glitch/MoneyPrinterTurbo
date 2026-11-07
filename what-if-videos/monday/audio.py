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
def pop(): t = np.arange(int(SR*.12))/SR; return np.sin(2*np.pi*(900 - 5000*t)*t) * np.exp(-t*40)
def boom(d=1.6): t = np.arange(int(SR*d))/SR; return np.sin(2*np.pi*(55 - 20*t)*t) * np.exp(-t*2.5)
def tick(): t = np.arange(int(SR*.03))/SR; return noise(.03)[:len(t)] * np.exp(-t*300) * .6 + np.sin(2*np.pi*3000*t) * np.exp(-t*200) * .4
def ring(d=1.6): t = np.arange(int(SR*d))/SR; return (np.sin(2*np.pi*2100*t) * (np.sin(2*np.pi*14*t) > 0)) * .5 * np.exp(-t*.8)
def flip(): n = noise(.15); t = np.arange(len(n))/SR; return n * np.exp(-t*30) * .5
def bell(m, d=3.0): t = np.arange(int(SR*d))/SR; fr = f(m); return (np.sin(2*np.pi*fr*t) + .5*np.sin(2*np.pi*fr*2.76*t) + .25*np.sin(2*np.pi*fr*5.4*t)) * np.exp(-t*1.3)
def beatlen(t): return .3 * (1 - .75 * clamp01((t - sc[3]["b"]) / (sc[6]["b"] - sc[3]["b"])))
clamp01 = lambda v: max(0.0, min(1.0, v))
# the same 8-note "Monday" loop, repeating and speeding up as the days shrink
motif = [72, 76, 79, 76, 74, 77, 79, 77]
t = 0.0; k = 0; stop = sc[7]["a"] + (WT(7, "zero") - sc[7]["a"]) + .05
while t < stop:
    put(music, t, pluck(motif[k % 8], .4), .2)
    if k % 4 == 0: put(music, t, pluck(motif[k % 8] - 24, .6), .22)
    t += beatlen(t); k += 1
# clock ticks throughout, faster with the music
t = sc[0]["a"]
while t < stop: put(sfx, t, tick(), .35); t += max(.12, beatlen(t) * 1.6)
put(sfx, .05, ring(1.6), .35)
a0 = WT(0, "again"); 
for i in range(4): put(sfx, a0 - .15 + i * .6, flip(), .6)
put(sfx, sc[1]["a"] + .35 * (sc[1]["b"] - sc[1]["a"]), pop(), .4)
for i in range(1, 5): put(sfx, sc[2]["a"] + i / 5 * (sc[2]["b"] - sc[2]["a"]), pop(), .4)
put(sfx, sc[3]["a"] + .25 * (sc[3]["b"] - sc[3]["a"]), pop(), .4)
for i in range(6): put(sfx, sc[6]["a"] + i * .55, boom(.5), .35)   # heartbeat
z = WT(7, "zero"); put(sfx, z + .1, boom(2.4), .9)
put(music, WT(7, "after"), bell(57, 3.5), .35)
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
