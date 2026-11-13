const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), { spawn } = require('child_process');
(async () => {
  const tl = JSON.parse(fs.readFileSync('timeline.json'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', m => console.log('page:', m.text())); page.on('pageerror', e => console.log('ERR', e.message));
  await page.goto('file://' + path.resolve(process.env.PAGE || 'render.html'));
  await page.evaluate(() => document.fonts.load("900 96px 'Inter Display'"));
  await page.evaluate(tl => setup(tl), tl);
  const mode = process.argv[2];
  if (mode === 'stills') {
    fs.mkdirSync('stills', { recursive: true });
    for (const t of process.argv.slice(3).map(Number)) {
      await page.evaluate(t => render(t), t);
      fs.writeFileSync(`stills/t${t.toFixed(2)}.jpg`, Buffer.from(await page.evaluate(() => grab()), 'base64'));
    }
  } else {
    const N = Math.round(tl.total * tl.fps);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(tl.fps), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', process.env.OUT || 'video_noaudio.mp4'], { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let f = 0; f < N; f++) {
      await page.evaluate(t => render(t), f / tl.fps);
      const buf = Buffer.from(await page.evaluate(() => grab()), 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 900 === 0) console.log('frame', f, '/', N);
    }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
