import asyncio, json, os, subprocess, edge_tts
LINES = json.load(open("script.json"))
VOICE = "en-US-AndrewNeural"
async def one(i, text):
    c = edge_tts.Communicate(text, VOICE, rate="+14%", boundary="WordBoundary",
                             proxy=os.environ.get("HTTPS_PROXY"))
    words, audio = [], b""
    async for ch in c.stream():
        if ch["type"] == "audio": audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            words.append({"w": ch["text"], "s": ch["offset"]/1e7, "d": ch["duration"]/1e7})
    open(f"line{i}.mp3", "wb").write(audio)
    dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"line{i}.mp3"]))
    return {"text": text, "dur": dur, "words": words}
async def one_retry(i, t):
    for k in range(4):
        try: return await one(i, t)
        except Exception as e:
            print("retry", i, type(e).__name__); await asyncio.sleep(2 * (k + 1))
    raise RuntimeError("voice failed for line %d" % i)
async def main():
    out = [await one_retry(i, t) for i, t in enumerate(LINES)]
    json.dump(out, open("lines.json","w"), indent=1)
    for i,o in enumerate(out): print(i, round(o["dur"],2), len(o["words"]))
    print("total", round(sum(o["dur"] for o in out),2))
asyncio.run(main())
