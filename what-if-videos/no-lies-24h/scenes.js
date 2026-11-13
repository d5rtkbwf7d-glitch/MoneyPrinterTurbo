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

// ---------- scenes ----------
const S = [];
S[0] = (t, p, d) => { bg('#14162B', '#2B2D42'); const m = at(0, /midnight/i);
  digital(540, 520, 1, t < m + .1 ? '23:59' : '00:00', t < m + .1 ? '#39FF88' : '#FF4D6D');
  const k = prog(t, at(0, /lie/i) - .3, at(0, /lie/i) + .3); mouthLock(540, 900, .9, k);
  const tf = at(0, /twenty/i); if (t > tf - .2) { const left = Math.max(0, 24 * 3600 - (t - tf) * 900); const hh = String(Math.floor(left / 3600)).padStart(2, '0'), mm = String(Math.floor(left / 60) % 60).padStart(2, '0'), ss = String(Math.floor(left) % 60).padStart(2, '0'); pillM(540, 1500, hh + ':' + mm + ':' + ss + ' OF TRUTH', '#E63946', 56); }
  stamp('NO LIES', 540, 230, prog(t, at(0, /ability/i) - .2, at(0, /ability/i) + .1), '#E63946', 100, -.05); };
S[1] = (t, p, d) => { bg('#1B1F3B', '#14162B'); ctx.save(); ctx.globalAlpha = .35; ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.moveTo(470, 0); ctx.lineTo(610, 0); ctx.lineTo(820, GY + 120); ctx.lineTo(260, GY + 120); ctx.fill(); ctx.restore();
  hero(540, 1.8, { mouth: t > at(1, /you/i) ? 'o' : 'flat', look: [0, -.3] }); const y = at(1, /you/i); if (t > y - .2) { stamp('YOU', 540, 400, prog(t, y - .2, y + .1), '#E63946', 160, .06); } };
S[2] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); clockPill('7:00 AM'); truthBar(2);
  
  const hm = at(2, /helmet/i), oc = at(2, /out/i);
  const mom = person(760, 1.5, 31, { mouth: t > hm + .3 ? 'o' : 'smile', look: [-1, 0], pose: t > hm + .3 ? { armL: [-.4, -.2], armR: [2.6, 3.0] } : { armL: [-2.4, -2.9], armR: [2.4, 2.9] } }); helmetHair(mom);
  if (t > hm + .3) { ctx.fillStyle = '#4FC3F7'; dot(mom.head[0] + mom.r * 1.1, mom.head[1], 10, '#4FC3F7'); }
  hero(300, 1.5, { mouth: t > oc ? 'o' : 'smile', look: [1, 0] });
  if (t > at(2, /haircut/i) - .2 && t < oc) say(760, 520, 380, 120, 'NEW HAIRCUT!', 760, 44, '#fff', prog(t, at(2, /haircut/i) - .2, at(2, /haircut/i) + .1));
  if (t > oc - .1) say(380, 560, 560, 160, '"It looks like|a helmet."', 320, 50, '#FFF3B0', prog(t, oc - .1, oc + .2)); };
S[3] = (t, p, d) => { floor('#E8F0FF', '#D6E2F7', '#AEB8CC'); clockPill('9:00 AM'); truthBar(3);
  const st = at(3, /sitting/i);
  const boss = person(820, 1.55, 41, { mouth: t > st + 1 ? 'o' : 'flat', look: [-1, 0], pose: { armL: [-.4, -1.9], armR: [.4, 1.9] } });
  hero(280, 1.45, { mouth: 'o', look: [1, 0] }); if (t > st) { ctx.save(); ctx.translate(280, 0); sweat({ head: [280, GY - 124 * 1.45 - 120 * 1.45 - 42 * 1.45], r: 46 * 1.45 }); ctx.restore(); }
  if (t < st) say(780, 520, 480, 130, 'Why are you late?', 820, 46, '#fff', prog(t, at(3, /boss/i) - .2, at(3, /boss/i) + .1));
  if (t > st - .1) say(420, 520, 640, 200, '"I was in the parking lot,|watching videos."', 300, 46, '#FFF3B0', prog(t, st - .1, st + .2)); };
S[4] = (t, p, d) => { floor('#EAF2FF', '#C9D6E6', '#8A8FA3'); clockPill('12:00 PM'); truthBar(4);
  for (const [x, c] of [[160, '#E63946'], [920, '#3D5A80']]) { box(x - 6, 380, 12, 520, 4, '#888', 3); ctx.fillStyle = c; ctx.fillRect(x + 6, 390, 110 * (x < 500 ? 1 : -1) * -1 + 0, 0); box(x < 500 ? x + 6 : x - 146, 390, 140, 90, 6, c, 5); }
  const f4 = at(4, /four/i), gone = t > f4 + .6; const run = clamp((t - f4 - .6) / 1.2);
  if (!gone || run < 1) person(540 + run * 700, 1.4, 21, { mouth: t > at(4, /lasts/i) ? 'o' : 'smile', look: [run > 0 ? 1 : 0, 0], pose: run > 0 ? walk(T * 14, 1) : { armL: [-.4, -.2], armR: [-2.4, -2.9] } });
  box(410, 960, 260, 300, 20, '#5C6784', 8); text('PRESS', 540, 1060, 46, { color: '#fff' }); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(540, 960); ctx.lineTo(560, 860); ctx.stroke(); dot(562, 852, 16, INK);
  const secs = Math.min(4, Math.max(0, Math.floor((t - at(4, /steps/i)) * 1.4))); digital(540, 1500, .6, '0:0' + secs, '#FFB703');
  if (t > f4) stamp('OVER IN 4 SECONDS', 540, 420, prog(t, f4 - .1, f4 + .2), '#E63946', 64, -.06); };
S[5] = (t, p, d) => { bg('#F1F3F8', '#E3E8F2'); clockPill('1:00 PM'); truthBar(5);
  text('ABOUT', 540, 470, 56, { color: INK }); text('1–2', 540, 640, 240, { color: '#E63946', stroke: INK, sw: 12 }); text('LIES A DAY', 540, 800, 70, { color: INK }); text('per person (research estimate)', 540, 870, 34, { color: '#5C6784', weight: 700 });
  const g = at(5, /gone/i); if (t > g - .2) { const k = prog(t, g - .2, g + .2); ctx.save(); ctx.strokeStyle = '#E63946'; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(240, 520); ctx.lineTo(240 + 600 * k, 520 + 300 * k); ctx.stroke(); ctx.restore(); stamp('TODAY: 0', 540, 1520, k, '#E63946', 110, -.05); } };
S[6] = (t, p, d) => { bg('#FFE5EC', '#FFF5F8'); clockPill('3:00 PM'); truthBar(6); const sl = at(6, /salesman/i);
  if (t < sl - .2) { box(240, 420, 600, 660, 40, '#fff', 8); dot(540, 600, 110, '#FFD3B5'); ctx.fillStyle = '#4A2C2A'; ctx.beginPath(); ctx.arc(540, 585, 110, Math.PI, 0); ctx.fill(); text('ALEX, 29', 540, 790, 56, { color: INK }); text('HEIGHT: 6\'0"', 540, 880, 52, { color: INK });
    const r = at(6, /real/i); if (t > r) { const k = prog(t, r, r + .3); ctx.save(); ctx.strokeStyle = '#E63946'; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(340, 875); ctx.lineTo(340 + 400 * k, 875); ctx.stroke(); ctx.restore(); if (k >= 1) pillM(540, 980, 'ACTUALLY 5\'7"', '#E63946', 50); } heart(760, 470, 2.2); }
  else { floor('#E8F6FF', '#D6ECFB', '#AEB8CC'); clockPill('3:00 PM'); truthBar(6); car2(300, GY + 60, 1.1, '#E63946', '$48,000'); car2(800, GY + 60, .9, '#2A9D8F', '$19,000');
    person(560, 1.3, 41, { mouth: 'smile', look: [-1, 0], lean: -14, pose: { armL: [-.4, -.2], armR: [-1.6, -2.6] } }); const hn = at(6, /honestly/i); say(560, 560, 600, 200, '"Honestly?|Buy the cheaper one."', 560, 48, '#FFF3B0', prog(t, hn - .2, hn + .1)); } };
S[7] = (t, p, d) => { bg('#FF9A62', '#FFD6A5'); ctx.fillStyle = '#FFE066'; ctx.beginPath(); ctx.arc(540, 900, 160, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, 900, W, H - 900); clockPill('6:00 PM', '#B5303A'); truthBar(7);
  box(170, 1040, 740, 40, 10, '#8D6E63', 6); hero(360, 1.35, { mouth: 'flat', look: [1, 0] }); person(720, 1.35, 51, { mouth: talkingNow7() ? 'o' : 'smile', look: [-1, 0] });
  const ok = at(7, /okay/i); say(720, 520, 460, 130, '"Are you okay?"', 720, 50, '#fff', prog(t, at(7, /asks/i) - .2, at(7, /asks/i) + .1)); };
function talkingNow7() { return BOIL % 2 === 0; }
S[8] = (t, p, d) => { bg('#FFD6A5', '#FF9A62'); truthBar(8); clockPill('6:01 PM', '#B5303A');
  const F = hero(540, 1.7, { mouth: 'flat', look: [0, 0] }); const fi = at(8, /fine/i);
  say(540, 470, 460, 140, '"I\'m fine."', 540, 70, '#fff', prog(t, at(8, /say/i) - .2, at(8, /say/i) + .1));
  if (t > fi) { cross(540, 470, 2.6 * easeBack(prog(t, fi, fi + .25))); } };
S[9] = (t, p, d) => { bg('#FFE5EC', '#FFD6E0'); truthBar(9); clockPill('6:30 PM', '#B5303A');
  const th = at(9, /theirs/i), hug = t > th - .2;
  hero(hug ? 470 : 340, 1.5, { mouth: 'smile', look: [1, 0], eyes: hug ? 'closed' : undefined, pose: hug ? { armL: [-.4, -.2], armR: [1.9, 2.3] } : {} });
  person(hug ? 610 : 740, 1.5, 51, { mouth: 'smile', look: [-1, 0], eyes: hug ? 'closed' : undefined, pose: hug ? { armL: [-1.9, -2.3], armR: [.4, .2] } : {} });
  if (!hug) { say(340, 560, 340, 120, 'the truth', 340, 50, '#fff', prog(t, .2, .5)); }
  if (t > th - .5) say(740, 560, 340, 120, 'theirs', 740, 50, '#fff', prog(t, th - .5, th - .2));
  if (hug) for (let i = 0; i < 6; i++) { const k = (T * .5 + i / 6) % 1; heart(540 + Math.sin(i * 2 + T) * 200, 900 - k * 500, 2 + i % 2, '#FF4D6D'); } };
S[10] = (t, p, d) => { bg('#14162B', '#1B1F3B'); const m = at(10, /midnight/i);
  digital(540, 420, .9, '00:00', '#FF4D6D'); switchUI(540, 640, t > at(10, /back/i), 'LYING');
  const bz = at(10, /buzz/i); if (t > bz - .2) { const sh = t < bz + 1 ? Math.sin(T * 60) * 10 : 0; phoneBig(540 + sh, 1000, 420, 300); ctx.save(); ctx.fillStyle = '#2A9D8F'; rrect(360 + sh, 900, 360, 110, 24); ctx.fill(); ctx.restore(); text('MOM', 540 + sh, 957, 60, { color: '#fff' }); text('1 new message', 540 + sh, 1070, 34, { color: INK }); } };
S[11] = (t, p, d) => { bg('#14162B', '#1B1F3B'); phoneBig(540, 720, 760, 820); ctx.save(); ctx.fillStyle = '#2A9D8F'; rrect(160, 330, 760, 120, 30); ctx.fill(); ctx.restore(); text('MOM', 540, 395, 56, { color: '#fff' });
  const k = prog(t, .1, .5); if (k > 0) { ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#E3E8F2'; rrect(200, 560, 640, 260, 40); ctx.fill(); ctx.restore(); text('I loved how honest', 520, 650, 50, { color: INK, alpha: k }); text('you were today', 500, 720, 50, { color: INK, alpha: k }); heart(760, 720, 1.6); } };
S[12] = (t, p, d) => { bg('#1B1F3B', '#14162B');   hero(540, 2.6, { mouth: 'flat', look: [Math.sin(T * 2) > 0 ? 1 : -1, 0], eyes: undefined });
  const ly = at(12, /lying/i); if (t > ly - .2) { text('?', 860, 380 + Math.sin(T * 3) * 10, 240, { color: '#FFB703', stroke: INK, sw: 12 }); stamp('IS SHE LYING?', 540, 1520, prog(t, ly - .2, ly + .1), '#E63946', 80, -.04); } };
S[13] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); pillM(540, 330, 'WOULD YOU SURVIVE', '#E63946', 64); pillM(540, 460, '24 HOURS OF TRUTH?', INK, 64);
  hero(340, 1.5, { mouth: 'smile', look: [1, 0], pose: { armL: [-.4, -.2], armR: [2.5, 3] } }); person(760, 1.5, 51, { mouth: 'smile', look: [-1, 0], pose: { armL: [-2.5, -3], armR: [.4, .2] } });
  const c = at(13, /comments/i); if (t > c - .3) { const k = easeBack(prog(t, c - .3, c)); ctx.save(); ctx.translate(540, 1560); ctx.scale(k, k); box(-230, -90, 460, 180, 40, '#fff', 8); text('COMMENT 👇'.replace(' 👇', ''), 0, 6, 64, { color: INK }); ctx.restore(); }
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
