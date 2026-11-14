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
// ---------- Nine generations episode ----------
PAL[81] = { top: '#9B5DE5', pants: '#3A3A55', skin: '#FFD3B5', hair: '#EDEDED' };   // you (200)
PAL[82] = { top: '#2A9D8F', pants: '#264653', skin: '#FFD3B5', hair: '#D9D9D9' };   // daughter (175)
function mumBun(F) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(F.head[0], F.head[1] - F.r * 1.05, F.r * .42, 0, 7); ctx.fill(); ctx.fillStyle = '#EDEDED'; ctx.beginPath(); ctx.arc(F.head[0], F.head[1] - F.r * 1.05, F.r * .36, 0, 7); ctx.fill(); }
function you(x, s, o = {}) { const F = person(x, s, 81, { mouth: 'smile', ...o }); oldify(F, false); mumBun(F); return F; }
function daughter(x, s, o = {}) { const F = person(x, s, 82, { mouth: 'smile', ...o }); oldify(F, false); return F; }
function baby(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 40, 70, 90, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.ellipse(0, 40, 62, 82, 0, 0, 7); ctx.fill();
  ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -40, 50, 0, 7); ctx.fill(); ctx.fillStyle = '#FFD3B5'; ctx.beginPath(); ctx.arc(0, -40, 44, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 16, -42, 7, .2, Math.PI - .2); ctx.stroke(); } ctx.fillStyle = 'rgba(255,120,120,.4)'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 26, -26, 8, 0, 7); ctx.fill(); } ctx.restore(); }
function stadium() { bg('#8ED1FC', '#CDEBFF'); ctx.fillStyle = '#5C6784'; ctx.beginPath(); ctx.moveTo(0, 380); ctx.quadraticCurveTo(540, 200, 1080, 380); ctx.lineTo(1080, 900); ctx.lineTo(0, 900); ctx.fill();
  for (let r = 0; r < 8; r++) for (let c = 0; c < 22; c++) { const x = 30 + c * 48 + (r % 2) * 20, y = 420 + r * 56 - Math.sin(c / 21 * Math.PI) * 60 * (1 - r / 8); dot(x, y, 15, ['#FF8FAB', '#FFB703', '#4FC3F7', '#7BC96F', '#F4A261'][(r * 7 + c) % 5]); dot(x, y - 18 + Math.abs(Math.sin(T * 6 + r + c)) * -6, 9, '#FFD3B5'); }
  ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, 900, W, H - 900); }
const GEN = ['YOU', 'CHILD', 'GRANDCHILD', 'GREAT-GRANDCHILD'];
const S = [];
S[0] = (t, p, d) => { stadium(); pillM(540, 230, 'HAPPY 200TH!', R1, 70); you(540, 1.3, { look: [0, -.5], pose: { armL: [-2.5, -3], armR: [2.5, 3] } }); const s = A(0, /stadium/i, 3); if (t > s - .3) stamp('RENTED A STADIUM', 540, 1520, prog(t, s - .3, s), INK, 64, -.05); };
S[1] = (t, p, d) => { stadium(); const sh = Math.sin(T * 50) * 10 * (t > A(1, /calls/i, 2) ? 1 : 0); phoneBig(540 + sh, 760, 520, 700); ctx.save(); ctx.fillStyle = R1; rrect(300 + sh, 470, 480, 110, 30); ctx.fill(); ctx.restore(); text('HOSPITAL', 540 + sh, 530, 56, { color: '#fff' }); text('incoming call…', 540 + sh, 760, 40, { color: INK }); };
S[2] = (t, p, d) => { bg('#E8F6FF', '#CFE6F7'); say(540, 380, 860, 200, 'Hold the photo!|Generation 8 just arrived.', 540, 52, '#FFF3B0', prog(t, .1, .4)); baby(540, 860, 1.8); const g = A(2, /eight/i, 1.5); if (t > g - .2) stamp('GEN 8', 540, 1520, prog(t, g - .2, g + .1), R1, 110, -.05); };
S[3] = (t, p, d) => { bg('#FFF1D6', '#FDE2C4'); box(80, 1196, 920, 20, 10, INK, 0); const pts = [[/each/i, 0], [/child/i, 25], [/grandchild/i, 50], [/great/i, 75]];
  const NM = [['YOU'], ['CHILD'], ['GRAND-', 'CHILD'], ['GREAT-', 'GRANDCHILD']];
  pts.forEach(([re, age], i) => { const w = i === 0 ? .2 : A(3, re, 2 + i * 2); const k = prog(t, w - .2, w + .1); if (k <= 0) return; const x = 170 + i * 250;
    ctx.save(); ctx.globalAlpha = clamp(k * 2); if (i === 0) you(x, .95, { look: [1, 0] }); else person(x, 1.0 - i * .15, [31, 21, 41][i - 1], { mouth: 'smile' }); ctx.restore();
    pillM(x, 620, 'AGE ' + age, [R1, T1, B1, '#9B5DE5'][i], 36); NM[i].forEach((l, j) => text(l, x, 700 + j * 40, 32, { color: INK, alpha: k })); });
  pillM(540, 330, 'FIRST CHILD AT 25', T1, 52); };
S[4] = (t, p, d) => { bg('#FFF1D6', '#FDE2C4'); const n = Math.max(1, Math.min(9, 1 + Math.floor(prog(t, .2, A(4, /descendants/i, 3) + .3) * 8.99))); text('AGE ' + (n - 1) * 25, 540, 300, 80, { color: INK });
  for (let i = 0; i < n; i++) { const x = 90 + i * 112, s = .62 - i * .045; if (i === 0) you(x, .62); else person(x, s, [31, 21, 41, 51, 31, 21, 41, 51][i - 1], { mouth: 'smile' }); text(i ? 'G' + i : 'YOU', x, 1230 - 0, 30, { color: i ? INK : R1 }); }
  const g = A(4, /nine/i, 5); if (t > g - .2) stamp('9 GENERATIONS IN 1 PHOTO', 540, 1520, prog(t, g - .2, g + .1), R1, 60, -.04); else if (t > A(4, /eight/i, 2) - .2) pillM(540, 1520, '8 GENERATIONS OF DESCENDANTS', B1, 46); };
S[5] = (t, p, d) => { stadium(); const tr = A(5, /turn/i, 4), turned = t > tr - .1; for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) { const x = 70 + c * 105 + (r % 2) * 30, s = .32 + r * .05; figure(x, 900 + r * 80 - 124 * s, s, { scarf: false, seed: [21, 31, 41, 51][(r + c) % 4], look: turned ? [1, 0] : [0, -1], mouth: turned ? 'o' : 'smile' }); }
  const m = A(5, /Mum/i, 2); if (t > m - .2) say(540, 360, 360, 150, 'MUM!', 900, 90, '#FFF3B0', prog(t, m - .2, m + .1)); if (turned) pillM(540, 1520, '40 PEOPLE TURN AROUND', INK, 52); };
S[6] = (t, p, d) => { floor('#FFE5EC', '#FFF5F8', '#E9B98A'); you(320, 1.3, { look: [1, 0], mouth: 'flat' }); const F = daughter(760, 1.3, { look: [-1, 0], pose: { armL: [-1.4, -1.8], armR: [.4, .2] } }); ageTag(760, 1520, 'DAUGHTER · 175', T1); ageTag(320, 1640, 'YOU · 200', '#9B5DE5');
  box(F.hands[0][0] - 120, F.hands[0][1] - 40, 120, 150, 20, '#E9C46A', 6); const j = A(6, /jacket/i, 3); if (t > j - .3) say(700, 380, 560, 150, 'Put a jacket on!', 760, 54, '#fff', prog(t, j - .3, j)); };
S[7] = (t, p, d) => { bg('#FFF1D6', '#FFE5EC'); const f = A(7, /finger/i, 4.5);
  if (t < A(7, /wraps/i, 3) - .2) { you(540, 1.5, { look: [0, .5], eyes: 'closed', pose: { armL: [-1.2, -1.9], armR: [1.2, 1.9] } }); baby(540, 930, .85); pillM(540, 300, 'GEN 8 ARRIVES', R1, 56); }
  else { ctx.fillStyle = INK; rrect(-40, 640, 760, 150, 75); ctx.fill(); ctx.fillStyle = '#FFD3B5'; rrect(-40, 650, 750, 130, 65); ctx.fill(); ctx.fillStyle = INK; rrect(560, 560, 260, 300, 120); ctx.fill(); ctx.fillStyle = '#FFE0CC'; rrect(570, 570, 240, 280, 110); ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 6; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(620 + i * 60, 600); ctx.lineTo(620 + i * 60, 820); ctx.stroke(); } heart(540, 420 - Math.sin(T * 3) * 10, 3); } };
S[8] = (t, p, d) => { floor('#FFE5EC', '#FFF5F8', '#E9B98A'); you(380, 1.25, { look: [1, 0], pose: { armL: [-.4, -.2], armR: [1.2, 1.9] } }); baby(560, 820, .7); daughter(800, 1.25, { look: [-1, 0], lean: -14 });
  say(680, 380, 700, 160, 'I used to do that,|didn’t I?', 800, 50, '#fff', prog(t, A(8, /used/i, 1.5) - .2, A(8, /used/i, 1.5) + .1)); };
S[9] = (t, p, d) => { floor('#FFE5EC', '#FFD6E0', '#E9B98A'); you(380, 1.25, { look: [1, 0], eyes: 'closed', pose: { armL: [-.4, -.2], armR: [1.2, 1.9] } }); baby(560, 820, .7); daughter(800, 1.25, { look: [-1, 0], eyes: 'closed' });
  say(400, 380, 560, 150, 'Yeah. I remember.', 380, 54, '#FFF3B0', prog(t, .2, .5)); for (let i = 0; i < 6; i++) { const k = (T * .4 + i / 6) % 1; heart(540 + Math.sin(i * 2 + T) * 300, 1000 - k * 500, 1.6 + i % 2, '#FF4D6D'); } };
S[10] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); box(40, 520, 1000, 690, 20, '#fff', 10); box(70, 550, 940, 630, 10, '#CDEBFF', 0); for (let i = 0; i < 9; i++) { const x = 120 + i * 105, s = .8 - (i > 0 ? i * .055 : 0); if (i === 0) you(x, .8); else person(x, s, [31, 21, 41, 51][i % 4], { mouth: 'smile' }); }
  pillM(540, 280, 'WOULD YOU LIVE LONG', R1, 56); pillM(540, 400, 'ENOUGH FOR THIS PHOTO?', INK, 50);
  const c = A(10, /Comment/i, 3); if (t > c - .3) popIn(prog(t, c - .3, c), 540, 1540, () => { box(-230, -80, 460, 160, 40, '#fff', 8); text('COMMENT', 0, 6, 60, { color: INK }); });
  const s2 = A(10, /subscribe/i, 5); if (t > s2 - .3) popIn(prog(t, s2 - .3, s2), 540, 1740, () => { box(-230, -70, 460, 140, 70, R1, 7); text('SUBSCRIBE', 0, 6, 56, { color: '#fff' }); });
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
