import asyncio, json, os, subprocess, edge_tts
LINES = [
 "What if you turned invisible for twenty-four hours?",
 "Hour one: free snacks, front-row seats, total chaos.",
 "But here's the catch. To be invisible, light has to pass straight through you.",
 "Including your eyes. If your eyes can't catch light... you can't see. You're blind.",
 "Hour two: you step into traffic. No driver can see you.",
 "Your phone's face unlock? Fails.",
 "And at hour twenty-four, you learn the scariest part...",
 "Nobody even noticed you were gone.",
]
VOICE = "en-US-AndrewNeural"
async def one(i, text):
    c = edge_tts.Communicate(text, VOICE, rate="+8%", boundary="WordBoundary",
                             proxy=os.environ.get("HTTPS_PROXY"))
    words, audio = [], b""
    async for ch in c.stream():
        if ch["type"] == "audio": audio += ch["data"]
        elif ch["type"] == "WordBoundary":
            words.append({"w": ch["text"], "s": ch["offset"]/1e7, "d": ch["duration"]/1e7})
    open(f"line{i}.mp3", "wb").write(audio)
    dur = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",f"line{i}.mp3"]))
    return {"text": text, "dur": dur, "words": words}
async def main():
    out = [await one(i, t) for i, t in enumerate(LINES)]
    json.dump(out, open("lines.json","w"), indent=1)
    for i,o in enumerate(out): print(i, round(o["dur"],2), len(o["words"]))
    print("total", round(sum(o["dur"] for o in out),2))
asyncio.run(main())
