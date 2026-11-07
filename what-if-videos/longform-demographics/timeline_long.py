import json
SEGS = json.load(open("segments.json")); V = json.load(open("voice.json"))
GAP_BEFORE, GAP_AFTER = 0.35, 0.45
t = 0.0; out = []
for i, s in enumerate(SEGS):
    o = {"scene": s["scene"], "kick": s["kick"], "params": s["params"], "a": round(t, 3)}
    if s["text"]:
        v = V[str(i)]; start = t + GAP_BEFORE
        o["voice"] = {"file": f"voice/seg{i:02d}.mp3", "start": round(start, 3)}
        o["words"] = [{"w": w["w"], "s": round(start + w["s"], 3), "e": round(start + w["s"] + w["d"], 3)} for w in v["words"]]
        # subtitle chunks: <= 7 words, break on pauses
        ch, cur = [], []
        for j, w in enumerate(o["words"]):
            cur.append(w); nxt = o["words"][j + 1] if j + 1 < len(o["words"]) else None
            if len(cur) >= 7 or nxt is None or nxt["s"] - w["e"] > 0.28:
                ch.append({"text": " ".join(x["w"] for x in cur), "s": cur[0]["s"], "e": cur[-1]["e"]}); cur = []
        o["chunks"] = ch
        t = start + v["dur"] + GAP_AFTER
    else:
        t += s.get("dur", 3.0)
    o["b"] = round(t, 3); out.append(o)
json.dump({"total": round(t, 2), "fps": 30, "segs": out}, open("timeline.json", "w"))
print("total", round(t, 1), "s =", round(t / 60, 2), "min;", len(out), "segments")
