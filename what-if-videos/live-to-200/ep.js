// ---------- Live to 200 episode ----------
function popIn(k, x, y, fn) { if (k <= 0) return; const s = easeBack(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); }
const A = (i, re, fb = 0) => { const v = at(i, re); return v < 1e6 ? v : fb; };
const R1 = '#E63946', T1 = '#2A9D8F', B1 = '#3D5A80';
PAL[71] = { top: '#8D6E63', pants: '#4E342E', skin: '#F2C9A0', hair: '#EDEDED' };   // great-grandad
PAL[72] = { top: '#3D5A80', pants: '#2B2D42', skin: '#FFD3B5', hair: '#D9D9D9' };   // dad, 130
function oldify(F, beard) { ctx.fillStyle = '#EDEDED'; ctx.beginPath(); ctx.arc(F.head[0], F.head[1] - 6, F.r * 1.02, Math.PI * 1.03, Math.PI * 1.97); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 3; for (const dy of [-.45, -.32]) { ctx.beginPath(); ctx.moveTo(F.head[0] - F.r * .3, F.head[1] + dy * F.r); ctx.lineTo(F.head[0] + F.r * .3, F.head[1] + dy * F.r); ctx.stroke(); }
  if (beard) { ctx.fillStyle = '#F5F5F5'; ctx.beginPath(); ctx.ellipse(F.head[0], F.head[1] + F.r * .75, F.r * .7, F.r * .55, 0, 0, Math.PI); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); } }
function cane(F) { const [hx, hy] = F.hands[1]; ctx.strokeStyle = '#6D4C41'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 10, GY + 120); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx - 10, hy - 30, hx - 30, hy - 10); ctx.stroke(); }
function grandad(x, s, o = {}) { const F = person(x, s, 71, { mouth: o.mouth || 'flat', look: o.look || [0, 0], pose: { armL: [-.3, -.2], armR: [.5, .2] } }); oldify(F, true); cane(F); return F; }
function dad130(x, s, o = {}) { const F = person(x, s, 72, { mouth: o.mouth || 'smile', look: o.look || [0, 0], pose: o.pose }); oldify(F, false); return F; }
function oldHero(x, s, o = {}) { const F = hero(x, s, o); ctx.fillStyle = '#EDEDED'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(F.head[0] + sx * F.r * .95, F.head[1] + F.r * .05, F.r * .2, F.r * .35, 0, 0, 7); ctx.fill(); } return F; }
function ageTag(x, y, s, col = INK) { pillM(x, y, s, col, 36); }
function cake(x, y, s, lit) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-260, -150, 520, 150, 20, '#FFB3C6', 8); box(-280, -40, 560, 40, 12, '#fff', 6); box(-200, -290, 400, 130, 20, '#FFD6E0', 8);
  for (let i = 0; i < 25; i++) { const cx = -180 + (i % 13) * 30, cy = -300 - Math.floor(i / 13) * 0 - (i >= 13 ? 0 : 0), xx = i < 13 ? cx : -165 + (i - 13) * 30, yy = i < 13 ? -300 : -165; ctx.fillStyle = ['#4FC3F7', '#FFB703', '#7BC96F', '#FF8FAB'][i % 4]; ctx.fillRect(xx - 5, yy - 50, 10, 50); if (lit) { ctx.fillStyle = '#FFB703'; ctx.beginPath(); ctx.ellipse(xx, yy - 62 + Math.sin(T * 20 + i) * 2, 7, 13, 0, 0, 7); ctx.fill(); } else { ctx.fillStyle = 'rgba(150,150,150,.6)'; ctx.beginPath(); ctx.arc(xx + Math.sin(T * 3 + i) * 6, yy - 70 - ((T * 40 + i * 9) % 60), 7, 0, 7); ctx.fill(); } }
  text('100', 0, -220, 70, { color: R1 }); ctx.restore(); }
function textMsg(y, from, msg, k = 1, col = '#E3E8F2') { if (k <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k * 2); text(from, 540, y - 50, 34, { color: '#5C6784' }); ctx.fillStyle = col; rrect(190, y - 20, 700, 150, 36); ctx.fill(); ctx.restore();
  const L = msg.split('|'); L.forEach((l, i) => text(l, 540, y + 55 + (i - (L.length - 1) / 2) * 52, 44, { color: INK, alpha: clamp(k * 2) })); }
function house(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-300, -380, 600, 380, 10, '#FFE0B2', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-350, -370); ctx.lineTo(0, -620); ctx.lineTo(350, -370); ctx.fill(); ctx.fillStyle = R1; ctx.beginPath(); ctx.moveTo(-320, -380); ctx.lineTo(0, -600); ctx.lineTo(320, -380); ctx.fill();
  box(-230, -300, 130, 110, 8, '#BDE0FE', 6); box(100, -300, 130, 110, 8, '#BDE0FE', 6); ctx.restore(); }
function pan(x, y, s, flip) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(60, -10, 140, 20); ctx.beginPath(); ctx.ellipse(0, 0, 90, 22, 0, 0, 7); ctx.fill(); const j = flip ? Math.abs(Math.sin(T * 3)) * 120 : 0; pancake(0, -26 - j, .8, Math.sin(T * 3) * (flip ? 1.2 : 0)); ctx.restore(); }
function pancake(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#5D3A1A'; ctx.beginPath(); ctx.ellipse(0, 0, 90, 30, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#E9B872'; ctx.beginPath(); ctx.ellipse(0, -2, 72, 22, 0, 0, 7); ctx.fill(); ctx.restore(); }
const S = [];
S[0] = (t, p, d) => { bg('#2B2D42', '#1B1F3B'); const bl = A(0, /blew/i, .5), lit = t < bl + .2; ctx.save(); ctx.translate(0, -260); const F = oldHero(540, 1.2, { mouth: lit ? 'o' : 'smile', pose: { armL: [-.4, -.2], armR: [.4, .2] } }); cake(540, 1420, 1.1, lit); ctx.restore(); if (lit && t > bl - .4) { for (let i = 0; i < 4; i++) { const k = (T * 3 + i / 4) % 1; dot(540 + (i - 1.5) * 30, F.head[1] + 60 + k * 300, 10 * (1 - k), 'rgba(255,255,255,.7)'); } }
  if (!lit) pillM(540, 330, 'HAPPY 100TH!', R1, 64); };
S[1] = (t, p, d) => { bg('#1B1F3B', '#14162B'); phoneBig(540, 760, 760, 900); ctx.save(); ctx.fillStyle = B1; rrect(160, 330, 760, 110, 30); ctx.fill(); ctx.restore(); text('BOSS', 540, 390, 52, { color: '#fff' });
  textMsg(560, 'now', 'Big day, mate. Only|80 years till retirement.', prog(t, A(1, /Big/i, 1) - .2, A(1, /Big/i, 1) + .2)); const r = A(1, /retirement/i, 3); if (t > r - .2) stamp('RETIRE AT 180', 540, 1520, prog(t, r - .2, r + .1), R1, 80, -.05); };
S[2] = (t, p, d) => { bg('#8ED1FC', '#CDEBFF'); cloudShape(250, 420, 280, 110, '#fff'); cloudShape(850, 560, 220, 90, '#fff'); ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, GY, W, H - GY);
  const k = ease(prog(t, .3, A(2, /200/i, 2) + .3)); box(90, 820, 900, 60, 30, '#fff', 7); ctx.fillStyle = T1; rrect(96, 826, 888 * k, 48, 24); ctx.fill(); text('0', 90, 930, 36, { color: INK }); text('100', 540, 930, 36, { color: INK }); text(String(Math.round(200 * k)), 990, 930, 36, { color: R1 });
  const w = A(2, /200/i, 2); if (t > w - .2) stamp('HUMANS LIVE TO 200', 540, 450, prog(t, w - .2, w + .1), R1, 70, -.05); oldHero(540, 1.0, { mouth: 'o', look: [0, -1] }); };
S[3] = (t, p, d) => { floor('#F1F3F8', '#E3E8F2', '#C9D0DC'); const F = person(820, 1.3, 51, { mouth: t > A(3, /40/i, 5) ? 'o' : 'smile', look: [-1, 0] }); ageTag(820, 1520, 'GRANDDAUGHTER · 25', B1);
  box(80, 300, 560, 760, 26, '#fff', 8); ctx.save(); ctx.fillStyle = T1; rrect(80, 300, 560, 100, 26); ctx.fill(); ctx.fillRect(80, 360, 560, 40); ctx.restore(); text('JOB LISTING', 360, 352, 44, { color: '#fff' });
  if (t > A(3, /entry/i, 2.5) - .2) pillM(360, 500, 'ENTRY LEVEL', T1, 46); if (t > A(3, /40/i, 5) - .3) { text('REQUIRED:', 360, 640, 40, { color: INK }); text('40 YEARS', 360, 740, 84, { color: R1 }); text('EXPERIENCE', 360, 830, 50, { color: INK }); } };
S[4] = (t, p, d) => { bg('#8ED1FC', '#CDEBFF'); ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, GY + 60, W, H - GY); house(620, GY + 60, 1.0); const dr = A(4, /door/i, 5);
  box(560, 940, 130, 300, 8, t > dr - .1 ? INK : '#8D6E63', 6); oldHero(230, 1.15, { mouth: 'smile', look: [1, 0] }); ageTag(230, 560, 'YOU · 100', R1);
  if (t > A(4, /save/i, 1.5) - .2 && t < dr) { pillM(230, 450, 'SAVED!', T1, 44); } if (t > A(4, /grew/i, 3) - .2) pillM(620, 300, 'YOUR CHILDHOOD HOME', B1, 40); };
S[5] = (t, p, d) => { bg('#FFF1D6', '#FDE2C4'); box(500, 520, 420, 680, 10, INK, 8); grandad(720, 1.3, { look: [-1, 0], mouth: talk5() }); ageTag(720, 1520, 'GREAT-GRANDAD', '#6D4C41');
  oldHero(240, 1.25, { mouth: 'o', look: [1, 0] }); const s = A(5, /Sorry/i, 2); if (t > s - .2) say(540, 330, 820, 190, 'Sorry, mate. I’m saving it|for when I retire.', 700, 46, '#FFF3B0', prog(t, s - .2, s + .1)); };
function talk5() { return BOIL % 2 ? 'o' : 'flat'; }
S[6] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); box(80, 820, 920, 60, 10, '#8D6E63', 6); box(400, 760, 280, 70, 10, '#ADB5BD', 6);
  const D = dad130(330, 1.25, { look: [1, 0], pose: { armL: [-.4, -.2], armR: [1.4, 1.8] } }); pan(520, 720, .9, true); person(800, 1.1, 51, { mouth: 'smile', look: [-1, 0] });
  ageTag(330, 470, 'DAD · 130', B1); if (t > A(6, /pancakes/i, 4) - .2) pillM(540, 1520, 'PANCAKE LESSON', T1, 56); };
S[7] = (t, p, d) => { bg('#FFF1D6', '#FDE2C4'); box(240, 300, 600, 600, 300, '#fff', 8); pancake(540, 640, 3.2); const be = A(7, /burnt/i, 1); if (t > be - .2) pillM(540, 300, 'SAME BURNT EDGES', '#5D3A1A', 50);
  const j = A(7, /joke/i, 3); if (t > j - .2) { dad130(260, .9, { mouth: 'o', look: [1, 0] }); hero(820, .7, { mouth: 'smile', look: [-1, 0] }); ageTag(820, 860, 'YOU · 6', R1); say(420, 1520, 600, 150, 'Same stupid joke!', 300, 50, '#fff', prog(t, j - .2, j + .1)); } };
S[8] = (t, p, d) => { bg('#FFE5EC', '#FFD6E0'); dad130(270, 1.1, { mouth: 'smile', look: [1, 0] }); oldHero(540, 1.2, { mouth: 'smile', eyes: 'closed' }); person(810, 1.05, 51, { mouth: 'smile', look: [-1, 0] });
  for (let i = 0; i < 7; i++) { const k = (T * .5 + i / 7) % 1; heart(540 + Math.sin(i * 2 + T) * 300, 900 - k * 600, 2 + i % 2); } const e = A(8, /every/i, 1); if (t > e - .2) pillM(540, 1520, 'EVERY EXTRA YEAR', R1, 60); };
S[9] = (t, p, d) => { bg('#1B1F3B', '#14162B'); const sh = Math.sin(T * 60) * 12 * (t > A(9, /buzz/i, .8) - .1 ? 1 : 0); phoneBig(540 + sh, 800, 520, 820); text('1 new message', 540 + sh, 780, 44, { color: INK }); };
S[10] = (t, p, d) => { bg('#1B1F3B', '#14162B'); phoneBig(540, 760, 760, 900); textMsg(560, '???', 'Rent’s going up again.', prog(t, .1, .4)); if (t > .6) stamp('RENT ↑', 540, 1520, prog(t, .6, .9), R1, 100, -.05); };
S[11] = (t, p, d) => { bg('#1B1F3B', '#14162B'); phoneBig(540, 760, 760, 900); ctx.save(); ctx.fillStyle = '#6D4C41'; rrect(160, 330, 760, 110, 30); ctx.fill(); ctx.restore(); text('GREAT-GRANDAD', 540, 390, 48, { color: '#fff' });
  textMsg(560, 'landlord', 'Rent’s going up again.', 1); grandad(540, 1.05, { mouth: 'smile', look: [0, 0] }); };
S[12] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); pillM(540, 300, 'WOULD YOU LIVE TO 200?', R1, 58); pillM(540, 430, '...IF YOUR LANDLORD COULD TOO', INK, 44);
  oldHero(320, 1.3, { mouth: 'smile', look: [1, 0], pose: { armL: [-.4, -.2], armR: [2.5, 3] } }); grandad(780, 1.3, { mouth: 'smile', look: [-1, 0] });
  const c = A(12, /Comment/i, 3); if (t > c - .3) popIn(prog(t, c - .3, c), 540, 1540, () => { box(-230, -80, 460, 160, 40, '#fff', 8); text('COMMENT', 0, 6, 60, { color: INK }); });
  const s = A(12, /subscribe/i, 5); if (t > s - .3) popIn(prog(t, s - .3, s), 540, 1740, () => { box(-230, -70, 460, 140, 70, R1, 7); text('SUBSCRIBE', 0, 6, 56, { color: '#fff' }); });
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
