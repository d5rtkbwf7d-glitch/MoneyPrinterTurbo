// ================= WHITEBOARD DOODLE =================
const BLUE = '#2C6BD8', GREEN = '#2E9E5B';
const WT = (line, re) => (TL.words.find(w => w.line === line && re.test(w.w)) || { s: 1e9 }).s;
const SA = i => TL.scenes[i].a, at = (i, re) => WT(i, re) - SA(i);
const mk = (pts, col = INK, w = 9, o = {}) => inkPath(pts, { w, color: col, amp: 2.2, ...o });
const mc = (x, y, r, col = INK, w = 9, o = {}) => inkCircle(x, y, r, { w, color: col, ...o });
function hand(t, sz = 1) { // marker text, slightly rotated like handwriting
}
function write(s, x, y, size, col = INK, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot ?? (rnd(s.length) - .5) * .04); text(s, 0, 0, size, { color: col, weight: o.weight ?? 900, alpha: o.alpha ?? 1 }); ctx.restore(); }
function underline(x0, x1, y, col = RED) { mk([[x0, y], [(x0 + x1) / 2, y + 6], [x1, y - 3]], col, 8); }
function boxed(x, y, w, h, col = INK) { mk([[x - w / 2, y - h / 2], [x + w / 2, y - h / 2 + 4], [x + w / 2 - 3, y + h / 2], [x - w / 2 + 4, y + h / 2 - 2]], col, 8, { close: true }); }
function brainD(x, y, s, col = INK) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const pts = []; for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.28, r = 150 + Math.sin(a * 6) * 18; pts.push([Math.cos(a) * r * 1.15, Math.sin(a) * r * .85]); } mk(pts, col, 9 / s);
  mk([[-120, -10], [-60, -60], [0, -10], [60, -60], [120, -10]], col, 7 / s); mk([[-90, 50], [-30, 10], [30, 60], [90, 20]], col, 7 / s); mk([[0, -125], [5, 120]], col, 7 / s); ctx.restore(); }
function eyeD(x, y, s, look = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); mk([[-260, 0], [-120, -150], [120, -150], [260, 0], [120, 150], [-120, 150]], INK, 10 / s, { close: true });
  mc(look * 50, 0, 110, BLUE, 10 / s); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(look * 50, 0, 50, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(look * 50 + 22, -22, 14, 0, 7); ctx.fill(); ctx.restore(); }
function eyeSectionD(x, y, s, hl) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); mc(0, 0, 300, INK, 10);
  ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 0, 272, -2.3, 2.3); ctx.stroke(); ctx.restore();
  inkCircle(-255, 0, 60, { w: 9, color: BLUE }); mk([[250, -40], [470, -60]], INK, 9); mk([[250, 40], [470, 60]], INK, 9);
  for (let i = 0; i < 3; i++) { const k = (T * .8 + i / 3) % 1; ctx.fillStyle = `rgba(44,107,216,${1 - k})`; ctx.beginPath(); ctx.arc(lerp(-480, 230, k), (i - 1) * 60 * (1 - k), 12, 0, 7); ctx.fill(); }
  if (hl) { mc(272, 0, 85 + Math.sin(T * 5) * 5, RED, 10); } ctx.restore(); }
function landscapeD(x, y, w, h) { boxed(x + w / 2, y + h / 2, w, h); mk([[x + 10, y + h * .62], [x + w * .5, y + h * .6], [x + w - 10, y + h * .63]], GREEN, 9);
  mc(x + w * .8, y + h * .2, 50, '#E0A800', 9); for (let i = 0; i < 3; i++) { const tx = x + 140 + i * 300; mk([[tx, y + h * .62], [tx, y + h * .62 - 140]], INK, 9); mc(tx, y + h * .62 - 190, 70, GREEN, 9); }
  mk([[x + w * .2, y + h * .2], [x + w * .3, y + h * .17], [x + w * .38, y + h * .21]], BLUE, 7); for (let i = 0; i < 6; i++) mk([[x + 80 + i * 150, y + h * .75 + (i % 2) * 40], [x + 120 + i * 150, y + h * .73 + (i % 2) * 40]], GREEN, 6); }
function scissorsD(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const a = Math.sin(T * 8) * .25; for (const sd of [-1, 1]) { ctx.save(); ctx.rotate(sd * a); mk([[0, 0], [160, sd * -14]], INK, 8); mc(-50, sd * 40, 30, RED, 8); mk([[-22, sd * 26], [0, 0]], INK, 8); ctx.restore(); } ctx.restore(); }
function funnelD(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); mk([[-120, -90], [120, -90], [24, 30], [24, 110], [-24, 110], [-24, 30]], BLUE, 9, { close: true }); ctx.restore(); }
function brushD(x, y, s, col = GREEN) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.6 + Math.sin(T * 5) * .2); ctx.scale(s, s); mk([[-10, 0], [-10, 160], [10, 160], [10, 0]], INK, 8, { close: true }); mk([[-22, -60], [22, -60], [22, 0], [-22, 0]], INK, 8, { close: true }); mk([[-22, -60], [0, -140], [22, -60]], col, 10); ctx.restore(); }
function cameraD(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); mk([[-150, -90], [110, -90], [110, 90], [-150, 90]], INK, 9, { close: true }); mk([[110, -40], [190, -80], [190, 80], [110, 40]], INK, 9, { close: true }); mc(-20, 0, 54, BLUE, 9); ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(-110, -55, 14, 0, 7); ctx.fill(); ctx.restore(); }
function bubbleD(x, y, w, h, tail = -1) { mk([[x - w / 2, y - h / 2], [x + w / 2, y - h / 2 + 4], [x + w / 2 - 4, y + h / 2], [x + tail * 30 + 30, y + h / 2], [x + tail * 90, y + h / 2 + 70], [x + tail * 30 - 30, y + h / 2 + 2], [x - w / 2 + 3, y + h / 2 - 2]], INK, 9, { close: true }); }
function hatchCircle(x, y, r, col, k = 1) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 7; ctx.globalAlpha = k; for (let i = -r * 2; i < r * 2; i += 22) { ctx.beginPath(); ctx.moveTo(x + i, y - r); ctx.lineTo(x + i + r, y + r); ctx.stroke(); } ctx.restore(); }
const stick = (x, gy, s, o = {}) => figure(x, gy - 122 * s, s, { seed: 11, ...o });

// ---------- scenes ----------
const S = [];
S[0] = (t, p, d) => { stick(540, 1330, 2.0, { mouth: 'smile' }); brainD(540, 560, .9, RED);
  const k = prog(t, .5, 1.0); if (k > 0) { ctx.save(); ctx.fillStyle = INK; ctx.fillRect(380, 520, 320 * k, 70); ctx.restore(); } if (k >= 1) write('SECRET', 540, 557, 46, '#fff');
  const h = at(0, /hiding/i); if (t > h) { write('HIDING SOMETHING!', 540, 260, 74, RED); underline(230, 850, 320); } };
S[1] = (t, p, d) => { stick(540, 1330, 2.0, { mouth: 'smile', look: [Math.sin(T * 2), 0], pose: { armL: [-1.6, -.6], armR: [1.6, .6] } }); write('?', 840, 620, 180, BLUE); write("you don't even notice", 540, 360, 60); };
S[2] = (t, p, d) => { eyeD(540, 1050, 1.6, Math.sin(T) * .5);
  for (let i = 0; i < 12; i++) { const k = (T * .5 + i / 12) % 1, x = lerp(rnd(i * 3.1) * W, 540, k), y = lerp(200 + rnd(i) * 300, 1000, k), sz = 40 * (1 - k * .6); ctx.save(); ctx.globalAlpha = 1 - k * .7; if (i % 3 === 0) mc(x, y, sz * .6, BLUE, 6); else if (i % 3 === 1) mk([[x - sz, y + sz * .6], [x, y - sz * .7], [x + sz, y + sz * .6]], RED, 6, { close: true }); else mk([[x - sz * .7, y - sz * .7], [x + sz * .7, y - sz * .7], [x + sz * .7, y + sz * .7], [x - sz * .7, y + sz * .7]], GREEN, 6, { close: true }); ctx.restore(); }
  write('ENORMOUS INFORMATION', 540, 380, 62); underline(200, 880, 430, BLUE); };
S[3] = (t, p, d) => { brainD(540, 900, 1.4);
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + .3, pass = i % 3 === 0, k = (T * .6 + i / 8) % 1, r = lerp(620, pass ? 200 : 330, k); const x = 540 + Math.cos(a) * r, y = 900 + Math.sin(a) * r; mk([[x + Math.cos(a) * 60, y + Math.sin(a) * 60], [x, y]], pass ? GREEN : '#999', 7); if (!pass && k > .8) cross(x, y, .4); }
  write('NOT EVERYTHING GETS IN', 540, 360, 60, RED); };
S[4] = (t, p, d) => { brainD(540, 440, .8);
  [[/edits/i, 'EDITS', scissorsD], [/filters/i, 'FILTERS', funnelD], [/fills/i, 'FILLS IN', brushD]].forEach(([re, lab, fn], i) => { const w = at(4, re); if (t < w - .15) return; const y = 850 + i * 230; fn(330, y + 10, .8); write(lab, 700, y + 4, 80); if (i === 2) underline(560, 860, y + 50, GREEN); }); };
S[5] = (t, p, d) => { const bs = at(5, /blind/i); eyeSectionD(460, 860, 1.0, t > bs - .2);
  write('lens', 190, 590, 44, BLUE); write('retina', 470, 510, 44, RED); write('optic nerve', 860, 1000, 44);
  if (t > bs - .2) { write('BLIND SPOT', 540, 1330, 90, RED); mk([[730, 1260], [760, 990]], RED, 8); mk([[740, 1020], [760, 990], [782, 1022]], RED, 8); }
  if (t > bs + .5) write('no light sensors here', 540, 1440, 44); };
S[6] = (t, p, d) => { landscapeD(60, 400, 960, 880); const k = ease(prog(p, .1, .5)); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(700, 780, 150 * k, 0, 7); ctx.fill(); write('what it COULD look like', 540, 300, 56, RED); };
S[7] = (t, p, d) => { write('WHY?', 540, 900, 260 * easeBack(prog(t, 0, .3)), RED, { rot: -.05 }); mc(540, 900, 300, BLUE, 10); };
S[8] = (t, p, d) => { landscapeD(60, 400, 960, 880); const k = ease(prog(p, .15, .8));
  ctx.save(); ctx.fillStyle = INK; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(700, 780, 150, 0, 7); ctx.fill(); ctx.restore(); hatchCircle(700, 780, 150, GREEN, k * .8);
  if (k < 1) brushD(760 + Math.cos(T * 6) * 60, 720 + Math.sin(T * 6) * 60, 1.1); else check(540, 1400, 1.4, GREEN);
  write('your brain paints it in', 540, 300, 56); };
S[9] = (t, p, d) => { write('THE DISTURBING', 540, 820, 96, RED); write('TWIST...', 540, 960, 110, RED); boxed(540, 890, 860, 340, RED); };
S[10] = (t, p, d) => { cameraD(540, 700, 1.6); write('PERFECT RECORDING', 540, 1040, 66); const k = easeBack(prog(p, .4, .65)); if (k > 0) cross(540, 720, 3.2 * k); };
S[11] = (t, p, d) => { mk([[330, 1300], [540, 520]], '#8D6E63', 10); mk([[750, 1300], [540, 520]], '#8D6E63', 10); landscapeD(300, 470, 480, 400); brainD(860, 1120, .5); brushD(790, 930, .9, '#E0A800'); write("YOUR BRAIN'S", 540, 260, 70, GREEN); write('BEST GUESS', 540, 350, 70, GREEN); };
S[12] = (t, p, d) => { stick(540, 1330, 1.6, { mouth: 'flat', look: [0, -1] }); write('?', 540, 520, 220 * easeBack(prog(t, .2, .5)), BLUE); };
S[13] = (t, p, d) => { landscapeD(60, 400, 960, 880);
  for (let i = 0; i < 5; i++) { const x = 160 + rnd(i * 4.4) * 760, y = 490 + rnd(i * 7.7) * 680, on = Math.sin(T * 2.5 + i * 1.7) > 0; ctx.save(); ctx.globalAlpha = on ? 1 : .15; ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y, 50 + (i % 2) * 20, 0, 7); ctx.fill(); ctx.restore(); write('?', x, y + 4, 56, '#fff', { alpha: on ? 1 : .2 }); }
  if (t > at(13, /missing/i) - .2) { write('WHAT ELSE ARE YOU', 540, 270, 60, RED); write('MISSING?', 540, 340, 60, RED); } };
S[14] = (t, p, d) => { const cm = at(14, /comment/i), sb = at(14, /subscribe/i);
  if (t > cm - .1) { bubbleD(540, 640, 600, 240); write('your thoughts?', 540, 630, 60, BLUE); }
  if (t > sb - .1) { boxed(540, 1080, 600, 180, RED); write('SUBSCRIBE', 540, 1084, 76, RED); }
  brainD(540, 1330, .45, RED);
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
function check(x, y, s, col = GREEN) { mk([[x - 40 * s, y], [x - 10 * s, y + 32 * s], [x + 48 * s, y - 36 * s]], col, 20 * s / 1.4); }
function cross(x, y, s, col = RED) { mk([[x - 36 * s, y - 36 * s], [x + 36 * s, y + 36 * s]], col, 18 * s / 1.6); mk([[x - 36 * s, y + 36 * s], [x + 36 * s, y - 36 * s]], col, 18 * s / 1.6); }

// ---------- the drawing hand ----------
function drawHand(x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-.5);
  ctx.fillStyle = '#2B2D42'; rrect(-14, -10, 28, 170, 10); ctx.fill(); ctx.fillStyle = RED; rrect(-14, 120, 28, 50, 10); ctx.fill(); ctx.fillStyle = '#2B2D42'; ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(0, -34); ctx.lineTo(10, -10); ctx.fill();
  ctx.fillStyle = '#FFD3B5'; ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(10, 70, 70, 90, -.2, 0, 7); ctx.fill(); ctx.stroke();
  for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-36 + i * 4, 30 + i * 34, 30, 16, -.3, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.moveTo(40, 160); ctx.lineTo(60, 300); ctx.lineTo(140, 300); ctx.lineTo(80, 140); ctx.fill(); ctx.stroke(); ctx.restore(); }
const OFF = document.createElement('canvas'); OFF.width = W; OFF.height = H; const OCTX = OFF.getContext('2d'); const MAIN = ctx;
