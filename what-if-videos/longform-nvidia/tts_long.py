import asyncio, json, os, subprocess, edge_tts
SEGS = json.load(open("segments.json")); VOICES = {"n": "en-US-AndrewNeural", "j": "en-AU-WilliamMultilingualNeural", "t": "en-AU-NatashaNeural"}
async def one(i, text):
    c = edge_tts.Communicate(text, VOICES[SEGS[i]["spk"]], rate="+2%", boundary="WordBoundary", proxy=os.environ.get("HTTPS_PROXY"))
    words, audio = [], b""
    async for ch in c.stream():
        if ch["type"] == "audio": audio += ch["data"]
        elif ch["type"] == "WordBoundary": words.append({"w": ch["text"], "s": ch["offset"] / 1e7, "d": ch["duration"] / 1e7})
    fn = f"voice/seg{i:02d}.mp3"; open(fn, "wb").write(audio)
    dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", fn]))
    return {"dur": dur, "words": words}
async def main():
    os.makedirs("voice", exist_ok=True)
    out = json.load(open("voice.json")) if os.path.exists("voice.json") else {}
    for i, s in enumerate(SEGS):
        if not s["text"] or str(i) in out: continue
        for k in range(5):
            try: out[str(i)] = await one(i, s["text"]); break
            except Exception as e: print("retry", i, type(e).__name__, flush=True); await asyncio.sleep(3 * (k + 1))
        else: raise SystemExit(f"voice failed on segment {i}")
        json.dump(out, open("voice.json", "w"))
        print(i, round(out[str(i)]["dur"], 1), flush=True)
    print("total speech", round(sum(v["dur"] for v in out.values()), 1))
asyncio.run(main())
