function server(x, y, s, busy) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-90, -300, 180, 300, 14, '#2B2D42', 7); for (let j = 0; j < 5; j++) { ctx.fillStyle = '#3A3D5C'; ctx.fillRect(-74, -284 + j * 56, 148, 40); for (let k = 0; k < 3; k++) dot(-50 + k * 24, -264 + j * 56, 7, busy ? (Math.floor(T * 10 + j + k) % 2 ? '#E63946' : '#FF8C42') : (Math.floor(T * 2 + j) % 3 ? '#39FF88' : '#1B5E3A')); } ctx.restore(); }
// ---------- No-lies episode helpers ----------
const GY = 1180, HERO = 11;
function say(x, y, w, h, txt, tailX, size = 46, col = '#fff', k = 1) { if (k <= 0) return; const s = easeBack(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(tailX - x - 30, h / 2 - 10); ctx.lineTo(tailX - x, h / 2 + 70); ctx.lineTo(tailX - x + 30, h / 2 - 10); ctx.fill();
  box(-w / 2, -h / 2, w, h, 36, col, 8); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(tailX - x - 22, h / 2 - 4); ctx.lineTo(tailX - x, h / 2 + 52); ctx.lineTo(tailX - x + 22, h / 2 - 4); ctx.fill();
  const lines = txt.split('|'); lines.forEach((l, i) => text(l, 0, (i - (lines.length - 1) / 2) * size * 1.15 + 4, size, { color: INK })); ctx.restore(); }
function clockPill(label, col = INK) { ctx.save(); ctx.font = "900 52px 'Inter Display'"; const w = ctx.measureText(label).width + 150; ctx.fillStyle = col; rrect(540 - w / 2, 150, w, 100, 50); ctx.fill(); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(540 - w / 2 + 60, 200, 26, 0, 7); ctx.moveTo(540 - w / 2 + 60, 200); ctx.lineTo(540 - w / 2 + 60, 184); ctx.moveTo(540 - w / 2 + 60, 200); ctx.lineTo(540 - w / 2 + 72, 206); ctx.stroke(); ctx.restore();
  text(label, 540 + 30, 204, 52, { color: '#fff' }); }
function truthBar(i) { // 24 h progress strip under the clock (scenes 2-9)
  const f = [0, 0, 7, 9, 12, 13, 15, 18, 18.3, 19][i] / 24; ctx.save(); ctx.fillStyle = 'rgba(43,45,66,.25)'; rrect(240, 275, 600, 18, 9); ctx.fill(); ctx.fillStyle = '#E63946'; rrect(240, 275, 600 * f, 18, 9); ctx.fill(); ctx.restore(); text('TRUTH DAY', 540, 320, 26, { color: INK, alpha: .6 }); }
function hero(x, s, o = {}) { return figure(x, GY - 124 * s, s, { seed: HERO, ...o }); }
function person(x, s, seed, o = {}) { return figure(x, GY - 124 * s, s, { scarf: false, seed, ...o }); }
function floor(c1, c2, fc) { bg(c1, c2); ctx.fillStyle = fc; ctx.fillRect(0, GY + 100, W, H - GY - 100); }
function mouthLock(x, y, s, k) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, 230, 120, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#E63946'; ctx.beginPath(); ctx.ellipse(0, 0, 214, 104, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#B5303A'; ctx.beginPath(); ctx.ellipse(0, 6, 170, 26 + 40 * (1 - k), 0, 0, 7); ctx.fill(); ctx.restore(); if (k > 0) { ctx.save(); ctx.translate(x, y + 20); ctx.scale(easeBack(k), easeBack(k)); lock(0, 0, 1.3 * s); ctx.restore(); } }
function digital(x, y, s, txt, col = '#39FF88') { ctx.save(); ctx.fillStyle = INK; rrect(x - 260 * s, y - 100 * s, 520 * s, 200 * s, 30 * s); ctx.fill(); ctx.restore(); text(txt, x, y + 6 * s, 130 * s, { color: col, font: "'DejaVu Sans Mono'", weight: 700 }); }
function switchUI(x, y, on, label) { box(x - 150, y - 60, 300, 120, 60, on ? '#2A9D8F' : '#8A8FA3', 7); dot(x + (on ? 80 : -80), y, 48, '#fff'); text(label, x, y + 120, 44, { color: '#fff' }); text(on ? 'ON' : 'OFF', x + (on ? -50 : 50), y + 4, 40, { color: '#fff' }); }
function helmetHair(F) { ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(F.head[0], F.head[1] - F.r * .15, F.r * 1.5, F.r * 1.28, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#C0392B'; ctx.beginPath(); ctx.ellipse(F.head[0], F.head[1] - F.r * .15, F.r * 1.42, F.r * 1.2, 0, Math.PI, 0); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.ellipse(F.head[0] - F.r * .5, F.head[1] - F.r * .8, F.r * .3, F.r * .15, -.5, 0, 7); ctx.fill(); }
function car2(x, y, s, col, price) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-170, -110, 340, 90, 30, col, 7); box(-100, -175, 200, 75, 24, col, 7); ctx.fillStyle = '#BDE0FE'; rrect(-80, -162, 160, 50, 12); ctx.fill(); for (const wx of [-100, 100]) { dot(wx, -16, 38, INK); dot(wx, -16, 14, '#ccc'); } ctx.restore(); box(x - 90 * s, y - 330 * s, 180 * s, 80 * s, 14, '#fff', 6); text(price, x, y - 288 * s, 44 * s, { color: INK }); }
function phoneBig(x, y, w, h) { phone(x - w / 2, y - h / 2, w, h); }

// ---------- Outage episode ----------
const RED2 = '#E63946', TEAL2 = '#2A9D8F';
function msCloud(x, y, s, down) { cloudShape(x, y, 360 * s, 180 * s, down ? '#FFD6D6' : '#fff'); text('MICROSOFT 365', x, y + 6 * s, 40 * s, { color: down ? RED2 : INK }); }
function appCard(x, y, name, col, k, broken) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); const s = easeBack(k); ctx.scale(s, s); box(-130, -130, 260, 260, 40, col, 8); text(name[0], 0, -10, 130, { color: '#fff' }); text(name, 0, 175, 40, { color: INK }); ctx.restore(); if (broken) cross(x + 90, y - 90, 1.3); }
function fax(x, y, s, paperK) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (paperK > 0) { box(-110, -160 - 220 * paperK, 220, 220 * paperK + 40, 6, '#fff', 5); text('TRADE OK', 0, -110 - 160 * paperK, 34, { color: INK, alpha: paperK > .5 ? 1 : 0 }); }
  box(-200, -140, 400, 200, 30, '#D9DEE7', 8); box(-150, -100, 120, 60, 10, '#9AE6B4', 5); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) dot(30 + c * 40, -100 + r * 40, 12, '#5C6784'); box(-220, 40, 440, 40, 12, '#B8C1CF', 6); ctx.restore(); }
function hoodie(x, s, k) { ctx.save(); ctx.globalAlpha = k; const F = person(x, s, 41, { mouth: 'flat' }); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(F.head[0], F.head[1] - 6, F.r * 1.35, Math.PI * .95, Math.PI * 2.05); ctx.fill(); ctx.fillStyle = '#2B2D42'; ctx.beginPath(); ctx.ellipse(F.head[0], F.head[1] + F.r * .1, F.r * .9, F.r * 1.0, 0, 0, 7); ctx.fill(); dot(F.head[0] - F.r * .3, F.head[1], 7, '#39FF88'); dot(F.head[0] + F.r * .3, F.head[1], 7, '#39FF88'); ctx.restore(); }
function srcPill(s) { ctx.save(); ctx.font = "800 30px 'Inter Display'"; const w = ctx.measureText(s).width + 50; ctx.fillStyle = 'rgba(43,45,66,.85)'; rrect(540 - w / 2, 1530, w, 56, 28); ctx.fill(); ctx.restore(); text(s, 540, 1559, 30, { color: '#fff', weight: 800 }); }
function dateTag() { text('NOV 12, 2026', 540, 140, 36, { color: '#5C6784' }); }
const S = [];
S[0] = (t, p, d) => { floor('#E8F0FF', '#D6E2F7', '#AEB8CC'); dateTag(); const dn = at(0, /down/i), down = t > dn - .1;
  msCloud(540, 360, 1.1, down); if (down) { cross(760, 300, 1.2); }
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) { const i = r * 5 + c, red = down && t > dn + i * .12; box(150 + c * 160, 560 + r * 120, 120, 90, 14, red ? RED2 : '#fff', 6); ctx.strokeStyle = red ? '#fff' : INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(150 + c * 160, 560 + r * 120); ctx.lineTo(210 + c * 160, 610 + r * 120); ctx.lineTo(270 + c * 160, 560 + r * 120); ctx.stroke(); }
  if (t > at(0, /bigger/i) - .2) stamp('MUCH BIGGER', 540, 1500, prog(t, at(0, /bigger/i) - .2, at(0, /bigger/i) + .1), RED2, 90, -.05); };
S[1] = (t, p, d) => { bg('#14162B', '#1B1F3B'); earth(540, 700, 330, false);
  const n = Math.round(74 * ease(prog(t, .3, at(1, /countries/i) + .2))); for (let i = 0; i < n; i++) { const a = rnd(i * 3.1) * 6.28, r = 300 * Math.sqrt(rnd(i * 7.7)); dot(540 + Math.cos(a) * r, 700 + Math.sin(a) * r * .9, 9 + 3 * Math.sin(T * 6 + i), RED2); }
  text(String(n), 540, 220, 150, { color: '#fff', stroke: INK, sw: 10 }); text('COUNTRIES IN ~1 HOUR', 540, 320, 44, { color: '#FFB703' }); srcPill('Downdetector user reports, via Reuters'); };
S[2] = (t, p, d) => { floor('#F1F3F8', '#E3E8F2', '#C9D0DC'); dateTag();
  appCard(540, 450, 'OUTLOOK', '#1877F2', prog(t, .1, .4), t > at(2, /open/i));
  appCard(300, 880, 'TEAMS', '#6C63FF', prog(t, at(2, /Teams/i) - .2, at(2, /Teams/i) + .1), t > at(2, /disrupted/i));
  appCard(780, 880, 'COPILOT', TEAL2, prog(t, at(2, /Copilot/i) - .2, at(2, /Copilot/i) + .1), t > at(2, /disrupted/i)); };
S[3] = (t, p, d) => { bg('#E8F6FF', '#CFE6F7'); const ka = prog(t, at(3, /Australia/i) - .2, at(3, /Australia/i) + .1), kj = prog(t, at(3, /Japan/i) - .2, at(3, /Japan/i) + .1);
  if (ka > 0) { building(120, 1100, 360, 420 * easeBack(ka), '#5C6784', 'AUSTRALIA'); }
  if (kj > 0) { building(600, 1100, 360, 520 * easeBack(kj), '#3D5A80', 'JAPAN'); }
  for (const [x, k] of [[300, ka], [780, kj]]) if (k >= 1) { box(x - 70, 420, 140, 90, 12, '#fff', 6); cross(x, 465, .9); }
  pillM(540, 260, 'GOVERNMENT AGENCIES HIT', RED2, 50); srcPill('Reuters'); };
S[4] = (t, p, d) => { bg('#E8F6FF', '#CFE6F7'); plane(540 + Math.sin(T) * 20, 420, 1.3, -.05);
  box(140, 700, 800, 320, 20, INK, 8); text('FLIGHTS', 340, 790, 48, { color: '#fff' }); text('NORMAL', 740, 790, 48, { color: '#39FF88', font: "'DejaVu Sans Mono'", weight: 700 }); text('EMAIL', 340, 930, 48, { color: '#fff' });
  const em = t > at(4, /emailing/i); text(em ? 'AFFECTED' : 'ONLINE', 740, 930, 48, { color: em ? '#FF4D6D' : '#39FF88', font: "'DejaVu Sans Mono'", weight: 700 }); pillM(540, 1500, 'AIRLINES IN INDIA', '#3D5A80', 50); };
S[5] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); const fx = at(5, /fax/i);
  fax(560, 1000, 1.3, clamp(prog(t, fx - .3, fx + 1.5))); hero(180, 1.1, { mouth: t > fx ? 'o' : 'flat', look: [1, 0] }); text('TAIWAN', 540, 260, 56, { color: INK });
  const y2 = at(5, /twenty/i); if (t > y2 - .2) stamp('IN 2026?!', 540, 420, prog(t, y2 - .2, y2 + .1), RED2, 100, -.06); srcPill('As reported by Reuters'); };
S[6] = (t, p, d) => { bg('#1B1F3B', '#14162B'); hoodie(540, 1.6, 1); text('HACKED?', 540, 300, 120, { color: '#FF4D6D', stroke: INK, sw: 10 });
  const no = at(6, /no/i); if (t > at(6, /Microsoft/i) - .1) { const k = prog(t, at(6, /Microsoft/i) - .1, at(6, /Microsoft/i) + .3); ctx.save(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(250, 300); ctx.lineTo(250 + 580 * k, 300); ctx.stroke(); ctx.restore(); }
  if (t > at(6, /malicious/i) - .3) say(540, 1500, 860, 170, '"No indication of|malicious activity"', 540, 50, '#fff', prog(t, at(6, /malicious/i) - .3, at(6, /malicious/i))); };
S[7] = (t, p, d) => { bg('#F1F3F8', '#E3E8F2'); const off = at(7, /offline/i), rs = at(7, /restarted/i);
  for (let i = 0; i < 4; i++) { const x = 210 + i * 220, dead = (t > off && i < 2) || (t > rs + .8 && i === 2); server(x, 1050, 1.0, dead && Math.floor(T * 3) % 2); if (dead) cross(x, 600, .9); }
  if (t > at(7, /rest/i)) { for (let i = 0; i < 6; i++) { const k = (T * .8 + i / 6) % 1; dot(lerp(140, 980, k), 400, 12, '#FFB703'); } text('extra traffic', 540, 360, 40, { color: INK }); }
  if (t > rs - .2) pillM(540, 1500, 'RESTARTED… FAILED AGAIN', RED2, 46); srcPill('Microsoft 365 status updates'); };
S[8] = (t, p, d) => { floor('#F1F3F8', '#E3E8F2', '#C9D0DC'); const items = [[/hacker/i, 'A HACKER', false], [/surge/i, 'A HUGE SURGE', false], [/failure/i, 'SERVER FAILURE', true]];
  items.forEach(([re, s, yes], i) => { const k = prog(t, at(8, re) - .2, at(8, re) + .1); if (k <= 0) return; const y = 420 + i * 260; box(140, y - 90, 800, 180, 30, yes ? '#FFE5E5' : '#fff', 8); text(s, 540, y + 4, 64, { color: yes ? RED2 : '#8A8FA3' }); if (!yes) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(200, y); ctx.lineTo(200 + 680 * k, y); ctx.stroke(); ctx.restore(); } else check(880, y - 70, 1.2, RED2); }); };
S[9] = (t, p, d) => { bg('#14162B', '#1B1F3B'); const labs = ['SCHOOLS', 'BANKS', 'AIRLINES', 'GOVERNMENTS', 'BUSINESSES', 'AI COMPANIES'];
  const off = t > at(9, /offline/i) - .1;
  labs.forEach((l, i) => { const a = -Math.PI / 2 + i / 6 * 6.28, x = 540 + Math.cos(a) * 360, y = 760 + Math.sin(a) * 430; ctx.save(); ctx.strokeStyle = off ? RED2 : '#4FC3F7'; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.lineDashOffset = -T * 40; ctx.beginPath(); ctx.moveTo(540, 760); ctx.lineTo(x, y); ctx.stroke(); ctx.restore(); pillM(x, y, l, off ? RED2 : '#3D5A80', 32); });
  msCloud(540, 760, .8, off); };
S[10] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); pillM(540, 330, 'ONE COMPANY', RED2, 64); pillM(540, 460, 'THE WHOLE WORLD?', INK, 64);
  hero(340, 1.5, { mouth: 'smile', look: [1, 0], pose: { armL: [-.4, -.2], armR: [2.5, 3] } }); person(760, 1.5, 51, { mouth: 'o', look: [-1, 0] });
  const c = at(10, /comments/i); if (t > c - .3) { const k = easeBack(prog(t, c - .3, c)); ctx.save(); ctx.translate(540, 1560); ctx.scale(k, k); box(-230, -90, 460, 180, 40, '#fff', 8); text('COMMENT', 0, 6, 64, { color: INK }); ctx.restore(); }
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
