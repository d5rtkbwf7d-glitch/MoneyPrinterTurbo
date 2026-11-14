import json
L = json.load(open("lines.json"))
gaps = [0.4, 0.35, 0.45, 0.35, 0.35, 0.45, 0.5]
t = 0.15; starts = []
for i, l in enumerate(L):
    starts.append(round(t, 3)); t += l["dur"] + (gaps[i] if i < len(gaps) else 0)
end_speech = starts[-1] + L[-1]["dur"]
total = round(sum(l['dur'] for l in L) + 0.15 + sum(gaps) + 1.6, 2)
assert end_speech + 0.9 < total, end_speech
scenes = []
for i, l in enumerate(L):
    a = 0 if i == 0 else starts[i] - 0.08
    b = (starts[i+1] - 0.08) if i + 1 < len(L) else total
    scenes.append({"a": round(a,3), "b": round(b,3)})
words = []
for i, l in enumerate(L):
    for w in l["words"]:
        words.append({"w": w["w"], "s": round(starts[i] + w["s"], 3), "e": round(starts[i] + w["s"] + w["d"], 3), "line": i})
json.dump({"total": total, "fps": 30, "starts": starts, "scenes": scenes, "words": words, "lines": [l["text"] for l in L]}, open("timeline.json", "w"), indent=1)
print("speech ends", round(end_speech,2)); print(scenes)
