// ================= LONG-FORM LANDSCAPE TEMPLATES (1920x1080) =================
const GY = 860;                       // ground line; subtitles live below ~930
let SEG = null;                        // current segment
const SW = re => { if (!SEG || !SEG.words) return 1e9; const w = SEG.words.find(w => re.test(w.w)); return w ? w.s - SEG.a : 1e9; };
const SWn = (word) => SW(new RegExp('^' + word, 'i'));
function sky(top = '#8ED1FC', bot = '#E8F6FF') { const g = ctx.createLinearGradient(0, 0, 0, GY); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
function grass(col = '#7BC96F', y = GY) { ctx.fillStyle = col; ctx.fillRect(0, y, W, H - y); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.fillRect(0, y, W, 18); }
function plain(col) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); }
function clouds(n = 3, y = 160) { for (let i = 0; i < n; i++) cloudShape(((i * 700 + T * 20) % (W + 500)) - 250, y + (i % 2) * 90, 220, 80, 'rgba(255,255,255,.95)'); }
const person = (x, s, o = {}) => figure(x, (o.gy ?? GY) - 122 * s, s, o);
const elder = (x, s, o = {}) => { const F = person(x, s, { scarf: false, seed: o.seed ?? 21, mouth: o.mouth || 'smile', ...o }); ctx.fillStyle = '#E0E0E0'; ctx.beginPath(); ctx.arc(F.head[0], F.head[1] - 6 * s, F.r * .99, Math.PI * 1.03, Math.PI * 1.97); ctx.closePath(); ctx.fill(); return F; };
const kid = (x, s, o = {}) => person(x, s * .62, { scarf: false, seed: o.seed ?? 51, ...o });
function sign(x, y, w, h, txt, col = '#E63946', tcol = '#fff', size = 36) { box(x - w / 2, y - h / 2, w, h, 14, col, 6); text(txt, x, y + 3, size, { color: tcol }); }
function pill(x, y, txt, col, size = 40, tcol = '#fff') { ctx.save(); ctx.font = `900 ${size}px 'Inter Display'`; const w = ctx.measureText(txt).width + size * 1.4; ctx.fillStyle = col; rrect(x - w / 2, y - size * .8, w, size * 1.6, size * .8); ctx.fill(); ctx.restore(); text(txt, x, y + 3, size, { color: tcol }); return w; }
function popIn(k, x, y, fn) { if (k <= 0) return; const s = easeBack(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); }
function upDown(x, y, up, col, s = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, up ? -s : s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-34, -60); ctx.lineTo(34, -60); ctx.lineTo(34, 10); ctx.lineTo(70, 10); ctx.lineTo(0, 80); ctx.lineTo(-70, 10); ctx.lineTo(-34, 10); ctx.closePath(); ctx.fill(); ctx.restore(); }
function house(x, y, s, col = '#FFB703', o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (o.grey) ctx.globalAlpha *= .55; box(-110, -170, 220, 170, 8, col, 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-140, -165); ctx.lineTo(0, -280); ctx.lineTo(140, -165); ctx.closePath(); ctx.fill(); ctx.fillStyle = o.roof || '#E63946'; ctx.beginPath(); ctx.moveTo(-124, -170); ctx.lineTo(0, -266); ctx.lineTo(124, -170); ctx.closePath(); ctx.fill();
  box(-25, -90, 50, 90, 4, '#8D6E63', 5); box(-85, -130, 44, 40, 4, o.dark ? '#555' : '#BDE0FE', 5); box(41, -130, 44, 40, 4, o.dark ? '#555' : '#BDE0FE', 5);
  if (o.ramp) { ctx.fillStyle = '#9E9E9E'; ctx.beginPath(); ctx.moveTo(25, 0); ctx.lineTo(160, 0); ctx.lineTo(25, -30); ctx.closePath(); ctx.fill(); }
  ctx.restore(); if (o.sale) sign(x + 120 * s, y - 40 * s, 150 * s, 60 * s, 'FOR SALE', '#fff', '#E63946', 26 * s); }
function tower(x, y, w, h, col, lit = true) { box(x, y - h, w, h, 6, col, 6); ctx.fillStyle = lit ? 'rgba(255,230,140,.8)' : 'rgba(80,80,90,.6)'; for (let yy = y - h + 24; yy < y - 30; yy += 46) for (let xx = x + 16; xx < x + w - 24; xx += 32) ctx.fillRect(xx, yy, 16, 24); }
function coin(x, y, r = 26) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y, r + 5, 0, 7); ctx.fill(); ctx.fillStyle = '#FFD23F'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); text('$', x, y + 2, r * 1.3, { color: '#B8860B' }); }
function piggyBank(x, y, s, col = '#FFAFCC') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, 166, 126, 0, 0, 7); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, 160, 120, 0, 0, 7); ctx.fill(); for (const lx of [-90, 70]) { box(lx, 90, 40, 60, 10, col, 5); }
  box(150, -30, 50, 60, 20, col, 5); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(168, -6, 6, 0, 7); ctx.arc(182, -6, 6, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(80, -40, 10, 0, 7); ctx.fill(); ctx.fillRect(-50, -124, 100, 16); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(40, -100); ctx.lineTo(70, -170); ctx.lineTo(100, -95); ctx.fill(); ctx.restore(); }
function hospital(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-200, -340, 400, 340, 8, '#fff', 7); ctx.fillStyle = '#E63946'; ctx.fillRect(-25, -310, 50, 130); ctx.fillRect(-65, -270, 130, 50); for (let i = 0; i < 4; i++) box(-170 + i * 90, -150, 60, 50, 4, '#BDE0FE', 4); box(-40, -80, 80, 80, 4, '#8D6E63', 5); ctx.restore(); }
function factory(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-220, -200, 440, 200, 6, '#B0B7C6', 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-220, -200); for (let i = 0; i < 4; i++) { ctx.lineTo(-220 + i * 110, -270); ctx.lineTo(-110 + i * 110, -200); } ctx.fill(); box(130, -380, 50, 180, 4, '#8A8FA3', 6); for (let i = 0; i < 3; i++) cloudShape(160 + i * 30 + Math.sin(T + i) * 10, -420 - i * 50 - (T * 30) % 40, 70, 30, 'rgba(200,200,210,.8)'); ctx.restore(); }
function stroller(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#4FA3E0'; ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -120, 110, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -120); ctx.arc(0, -120, 110, Math.PI, Math.PI * 1.5); ctx.closePath(); ctx.fillStyle = '#2F80C0'; ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(110, -120); ctx.lineTo(170, -200); ctx.stroke(); for (const wx of [-70, 70]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(wx, -20, 26, 0, 7); ctx.fill(); } ctx.restore(); }
function robot(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-70, -260, 140, 150, 26, '#CFD8E3', 7); box(-90, -110, 180, 110, 20, '#B0B7C6', 7); ctx.fillStyle = '#39FF88'; ctx.beginPath(); ctx.arc(-30, -190, 16, 0, 7); ctx.arc(30, -190, 16, 0, 7); ctx.fill(); inkPath([[0, -260], [0, -300]], { w: 8 }); dot(0, -310, 14, '#E63946'); const a = Math.sin(T * 4) * .4; inkPath([[-90, -90], [-150, -40 + a * 40]], { w: 18 }); inkPath([[90, -90], [150, -40 - a * 40]], { w: 18 }); ctx.restore(); }
function bar(x, y, w, h, col, label, val) { box(x, y - h, w, h, 8, col, 6); if (label) text(label, x + w / 2, y + 40, 32, { color: INK, weight: 800 }); if (val) text(val, x + w / 2, y - h - 36, 38, { color: INK }); }
function check(x, y, s, col = '#2A9D8F') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-10, 32); ctx.lineTo(48, -36); ctx.stroke(); ctx.restore(); }
function cross(x, y, s, col = '#E63946') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = col; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-36, -36); ctx.lineTo(36, 36); ctx.moveTo(-36, 36); ctx.lineTo(36, -36); ctx.stroke(); ctx.restore(); }
function card2(x, y, w, h, title, col, k) { popIn(k, x, y, () => { box(-w / 2, -h / 2, w, h, 26, '#fff', 7); ctx.fillStyle = col; rrect(-w / 2, -h / 2, 16, h, 8); ctx.fill(); text(title, 0, 4, 40, { color: INK, weight: 800 }); }); }
const TPL = {};

TPL.playground = (t, p, d, P) => {
  sky('#B8C5E0', '#E3E8F2'); grass('#9FBF8F'); clouds(2, 140);
  // school with a bell
  box(1180, 330, 560, 530, 10, '#E9C29B', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(1150, 335); ctx.lineTo(1460, 180); ctx.lineTo(1770, 335); ctx.fill(); ctx.fillStyle = '#C1440E'; ctx.beginPath(); ctx.moveTo(1170, 328); ctx.lineTo(1460, 192); ctx.lineTo(1750, 328); ctx.fill();
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) box(1230 + i * 170, 420 + j * 170, 110, 100, 6, '#5C6784', 6);
  box(1410, 740, 100, 120, 6, '#8D6E63', 6);
  const sw = P.bell && t < 3 ? Math.sin(t * 18) * .5 : 0; ctx.save(); ctx.translate(1460, 150); ctx.rotate(sw); ctx.fillStyle = '#FFB703'; ctx.beginPath(); ctx.moveTo(-40, 50); ctx.quadraticCurveTo(-40, -20, 0, -30); ctx.quadraticCurveTo(40, -20, 40, 50); ctx.closePath(); ctx.fill(); dot(0, 56, 10, INK); ctx.restore();
  // empty swings
  inkPath([[180, 860], [260, 380], [340, 860]], { w: 12 }); inkPath([[620, 860], [700, 380], [780, 860]], { w: 12 }); inkPath([[240, 390], [720, 390]], { w: 14 });
  for (const [cx, ph] of [[380, 0], [580, 1.6]]) { const a = Math.sin(T * 1.3 + ph) * .18; const ex = cx + Math.sin(a) * 300, ey = 390 + Math.cos(a) * 300; inkPath([[cx - 40, 390], [ex - 40, ey]], { w: 5 }); inkPath([[cx + 40, 390], [ex + 40, ey]], { w: 5 }); box(ex - 60, ey - 6, 120, 18, 6, '#E63946', 4); }
  // slide
  inkPath([[900, 860], [900, 520]], { w: 10 }); inkPath([[960, 860], [960, 520]], { w: 10 }); for (let i = 0; i < 5; i++) inkPath([[900, 560 + i * 60], [960, 560 + i * 60]], { w: 6 });
  ctx.fillStyle = '#4FA3E0'; ctx.beginPath(); ctx.moveTo(960, 520); ctx.quadraticCurveTo(1060, 600, 1120, 840); ctx.lineTo(1080, 850); ctx.quadraticCurveTo(1030, 630, 945, 560); ctx.fill();
  for (let i = 0; i < 6; i++) { const k = ((T * .15 + i / 6) % 1); ctx.save(); ctx.translate(lerp(-50, W + 50, k), 500 + Math.sin(k * 12 + i) * 60 + i * 50); ctx.rotate(k * 9 + i); ctx.fillStyle = '#C4963C'; ctx.beginPath(); ctx.ellipse(0, 0, 18, 8, 0, 0, 7); ctx.fill(); ctx.restore(); }
};
function icon(key, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (key === 'house_down') { house(0, 160, 1.3, '#FFB703'); upDown(230, -40, false, '#2A9D8F', 1.1); sign(0, 260, 260, 70, 'PRICE', '#2A9D8F'); }
  if (key === 'pension_up') { piggyBank(-20, 60, 1.05); upDown(230, -60, true, '#E63946', 1.1); sign(0, 260, 300, 70, 'RETIREMENT', '#E63946'); }
  if (key === 'hiring') { factory(0, 160, 1.0); sign(0, 260, 260, 70, 'HIRING!', '#2A9D8F'); }
  if (key === 'hospital') { hospital(0, 170, .95); sign(0, 260, 380, 70, 'NURSES NEEDED', '#E63946'); }
  if (key === 'baby_money') { stroller(-40, 170, 1.1); coin(170, -40, 34); coin(220, 20, 34); coin(140, 40, 34); sign(0, 260, 300, 70, 'BABY BONUS', '#2A9D8F'); }
  if (key === 'shrinking') { for (let i = 0; i < 4; i++) bar(-230 + i * 120, 170, 90, 300 - i * 70, ['#4FA3E0', '#6C63FF', '#B5A8FF', '#DCD6FF'][i]); sign(0, 260, 420, 70, 'NEXT GENERATION', '#E63946'); }
  ctx.restore();
}
TPL.versus = (t, p, d, P) => {
  plain('#F1F3F8'); const but = SW(/^but$/i);
  ctx.fillStyle = '#E3F2FD'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#FFE5EC'; ctx.fillRect(W / 2, 0, W / 2, H);
  popIn(prog(t, .1, .5), 480, 440, () => icon(P.left, 0, 0, 1)); popIn(prog(t, but, but + .4), 1440, 440, () => icon(P.right, 0, 0, 1));
  if (t > but) { ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(960, 440, 80, 0, 7); ctx.fill(); ctx.restore(); text('BUT', 960, 444, 50, { color: '#fff' }); }
};
TPL.waffle = (t, p, d, P) => {
  plain('#0E1A33'); earth(330, 450, 230, false);
  const n = Math.floor(clamp(prog(p, .15, .8)) * 100), hit = SW(/^55/);
  for (let i = 0; i < 100; i++) { const x = 760 + (i % 10) * 72, y = 130 + Math.floor(i / 10) * 72; const on = i < 55 && t > hit - .2; ctx.fillStyle = i < n ? (on ? '#FF6B6B' : '#4FA3E0') : 'rgba(255,255,255,.12)'; rrect(x, y, 58, 58, 12); ctx.fill(); }
  if (t > hit - .2) { popIn(prog(t, hit - .2, hit + .2), 1660, 420, () => { text('55%', 0, 0, 150, { color: '#FF6B6B' }); text('below 2.1', 0, 100, 44, { color: '#fff', weight: 800 }); }); }
  text('countries & areas', 1120, 880, 36, { color: '#aab', weight: 800 });
};
TPL.pyramid = (t, p, d, P) => {
  plain('#F7F3EA'); const k = P.mode === 'late' ? 1 : ease(prog(p, .25, .9));
  const ages = ['85+', '75', '65', '55', '45', '35', '25', '15', '0'];
  for (let i = 0; i < 9; i++) { const young = (i + 1) / 9, old = .55 + .25 * Math.sin(i * .5 + 1) * (i < 3 ? .6 : 1), wv = lerp(young, i < 2 ? .45 : i < 4 ? .8 : .7 - (i - 4) * .06, k) * 360; const y = 110 + i * 78;
    box(960 - wv, y, wv, 62, 8, '#4FA3E0', 5); box(960, y, wv, 62, 8, '#FF8FAB', 5); text(ages[i], 960 - wv - 70, y + 32, 30, { color: '#777', weight: 800 }); }
  text('men', 640, 860, 36, { color: '#4FA3E0' }); text('women', 1280, 860, 36, { color: '#FF8FAB' });
  if (k > .5) { elder(1650, .9, { gy: 560 }); kid(1760, .9, { gy: 560 }); }
};
TPL.generations = (t, p, d, P) => {
  sky(); grass();
  for (let i = 0; i < 10; i++) person(210 + i * 155, .75, { gy: 470, seed: [11, 21, 31, 41, 51][i % 5], scarf: i === 4 });
  text('BIGGER GENERATIONS', 960, 90, 46, { color: INK });
  const k = prog(p, .45, .7); if (k > 0) { arrow(960, 520, 960, 600, '#E63946', 14); for (let i = 0; i < 5; i++) kid(560 + i * 200, 1.1, { seed: [31, 41, 51, 21, 31][i], gy: GY + 10 }); }
};
TPL.fiveFutures = (t, p, d, P) => {
  plain('#2B2D42'); const ic = ['workers', 'piggy', 'house', 'robot', 'baby'];
  for (let i = 0; i < 5; i++) popIn(prog(p, i * .12, i * .12 + .25), 260 + i * 350, 470, () => { box(-140, -220, 280, 400, 30, '#F1F3F8', 8); text(String(i + 1), 0, -160, 70, { color: '#E63946' }); miniIcon(ic[i], 0, 40, .55); });
};
function miniIcon(k, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (k === 'workers') { for (let i = 0; i < 3; i++) figure(-120 + i * 120, 120, .7, { scarf: i === 1, seed: [21, 11, 41][i] }); }
  if (k === 'piggy') piggyBank(0, 30, .9); if (k === 'house') house(0, 160, 1.1); if (k === 'robot') robot(0, 170, 1.1); if (k === 'baby') stroller(0, 160, 1.1);
  ctx.restore(); }
TPL.tree = (t, p, d, P) => {
  plain('#FFF8E7'); const g = P.gens; const two = SW(/^2\.1/);
  g.forEach((n, r) => { const k = prog(p, r * .12, r * .12 + .2); if (k <= 0) return; for (let i = 0; i < n; i++) { const x = 960 + (i - (n - 1) / 2) * 120, y = 250 + r * 170; ctx.save(); ctx.globalAlpha = k; dot(x, y, 30, ['#4FA3E0', '#FF8FAB', '#7BC96F', '#FFB703'][r]); ctx.restore(); if (r > 0) inkPath([[x, y - 30], [960 + ((i * g[r - 1] / n) - (g[r - 1] - 1) / 2) * 120, y - 140]], { w: 3, alpha: .3 * k }); } });
  if (t > two) popIn(prog(t, two, two + .4), 1650, 420, () => { box(-200, -130, 400, 260, 40, INK, 0); text('2.1', 0, 6, 150, { color: '#FFB703' }); });
};
TPL.twoPointOne = (t, p, d, P) => {
  sky('#FFE5EC', '#FFF5F8'); grass('#F4D3DC');
  text('2.1', 430, 400, 300, { color: '#E63946', stroke: '#fff', sw: 16 }); text('children per woman', 430, 600, 46, { color: INK, weight: 800 });
  person(1050, 1, { seed: 11, mouth: 'smile' }); person(1250, 1, { scarf: false, seed: 51, mouth: 'smile' }); kid(1430, 1, { seed: 31 }); kid(1580, 1, { seed: 41 });
  ctx.save(); ctx.globalAlpha = .35; ctx.setLineDash([12, 10]); kid(1720, 1, { seed: 21 }); ctx.restore(); text('0.1', 1720, 560, 40, { color: '#E63946' });
  if (P.mode === 'avg') popIn(prog(p, .1, .35), 430, 760, () => pill(0, 0, 'AVERAGE', '#2A9D8F', 44));
};
TPL.rateChart = (t, p, d, P) => {
  plain('#F1F3F8'); const ag = ['15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49'], v = [.08, .35, .62, .55, .3, .1, .02];
  inkPath([[200, 780], [1150, 780]], { w: 6 });
  ag.forEach((a, i) => { const k = ease(prog(p, .3 + i * .05, .45 + i * .05)); bar(240 + i * 130, 780, 90, 520 * v[i] * k, '#6C63FF', a); });
  text('births per woman, by age', 680, 150, 40, { color: INK, weight: 800 });
  const k = prog(p, .7, .85); if (k > 0) popIn(k, 1550, 450, () => { box(-260, -150, 520, 300, 40, '#fff', 8); text('ADD THEM UP', 0, -70, 40, { color: '#777' }); text('= rate', 0, 30, 100, { color: '#6C63FF' }); });
  if (p < .3) popIn(prog(p, 0, .1), 1550, 450, () => { box(-260, -150, 520, 300, 40, '#fff', 8); stroller(0, 110, .7); text('births this year', 0, -90, 36, { color: '#777' }); cross(160, -20, 1); });
};
TPL.couples = (t, p, d, P) => {
  plain('#FFF8E7'); const rows = P.rows;
  rows.forEach(([lab, n, kind], r) => { const isNew = r === rows.length - 1 && rows.length > 1, k = isNew ? prog(p, .25, .55) : 1; if (k <= 0) return; const y = 300 + r * 260;
    text(lab, 230, y - 30, 40, { color: INK, align: 'center', alpha: k });
    for (let i = 0; i < n; i++) { const x = 520 + i * (n > 10 ? 64 : 120); ctx.save(); ctx.globalAlpha = k; if (kind === 'parent') { person(x - 20, .45, { gy: y + 40, seed: 11, scarf: false }); person(x + 20, .45, { gy: y + 40, seed: 51, scarf: false }); } else kid(x, .75, { gy: y + 40, seed: [31, 41, 21][i % 3] }); ctx.restore(); } });
  text('1 icon = 10', 1750, 880, 30, { color: '#999', weight: 800 });
};
TPL.complex = (t, p, d, P) => {
  plain('#0E1A33'); earth(960, 470, 260, false);
  const items = [[/longer/i, 400, 300, 'clock'], [/move/i, 1520, 300, 'plane'], [/ages/i, 1520, 690, 'ages']];
  items.forEach(([re, x, y, k], i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .2, w + .2), x, y, () => { box(-180, -110, 360, 220, 30, '#fff', 8);
    if (k === 'clock') { ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(0, -5, 70, 0, 7); ctx.stroke(); inkPath([[0, -5], [0, -55]], { w: 10 }); inkPath([[0, -5], [40, 10]], { w: 10 }); }
    if (k === 'plane') { plane(0, 0, .45, -.1); }
    if (k === 'ages') { kid(-90, .6, { gy: 90 }); person(0, .4, { gy: 90, seed: 11 }); elder(90, .4, { gy: 90 }); } }); });
};
TPL.growthChart = (t, p, d, P) => {
  plain('#F1F3F8'); inkPath([[200, 820], [1720, 820]], { w: 6 }); inkPath([[200, 820], [200, 140]], { w: 6 });
  const k = ease(prog(p, .05, .85)), pts = []; for (let i = 0; i <= 60; i++) { const x = i / 60; if (x > k) break; const y = .2 + .55 * (1 - Math.exp(-x * 3.2)) - .25 * Math.max(0, x - .7) ** 2; pts.push([200 + x * 1500, 820 - y * 700]); }
  if (pts.length > 1) { ctx.strokeStyle = '#2A9D8F'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.stroke(); }
  ctx.save(); ctx.setLineDash([16, 12]); ctx.strokeStyle = '#E63946'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(380, 820); ctx.lineTo(380, 160); ctx.stroke(); ctx.restore(); text('fertility drops below 2.1', 380, 120, 36, { color: '#E63946' });
  text('population', 120, 480, 32, { color: '#777' }); text('time', 1720, 870, 32, { color: '#777' });
  if (k > .5) text('still growing', 900, 300, 50, { color: '#2A9D8F', alpha: prog(k, .5, .6) });
};
TPL.title = (t, p, d, P) => {
  plain(['#E63946', '#2A9D8F', '#6C63FF', '#FF8C42', '#3D5A80'][(P.num - 1) % 5]);
  ctx.save(); ctx.globalAlpha = .12; for (let i = 0; i < 12; i++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(rnd(i * 3) * W, rnd(i * 7) * H, 60 + rnd(i) * 140, 0, 7); ctx.fill(); } ctx.restore();
  const k = easeOut(prog(t, 0, .5)); ctx.save(); ctx.globalAlpha = k; text('SCENARIO ' + ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'][P.num - 1], 960, 330 - (1 - k) * 40, 64, { color: 'rgba(255,255,255,.85)' }); ctx.restore();
  popIn(prog(t, .2, .6), 960, 500, () => { ctx.font = "900 84px 'Inter Display'"; const fs = Math.min(84, 84 * 1700 / ctx.measureText(P.title).width); text(P.title, 0, 0, fs, { color: '#fff', stroke: INK, sw: 14 }); });
  popIn(prog(t, .5, .9), 960, 760, () => miniIcon(P.icon, 0, -40, .8));
};
TPL.town = (t, p, d, P) => {
  sky(); grass('#8A8FA3'); clouds();
  const B = [[120, 'SUPERMARKET', '#7BC96F'], [720, 'BUILDERS', '#FFB703'], [1320, 'HOSPITAL', '#fff']];
  B.forEach(([x, lab, col], i) => { box(x, 380, 480, 480, 10, col, 8); box(x + 40, 420, 400, 80, 10, INK, 0); text(lab, x + 240, 462, 44, { color: '#fff' }); for (let j = 0; j < 3; j++) box(x + 50 + j * 140, 560, 100, 90, 6, '#BDE0FE', 5); box(x + 190, 720, 100, 140, 6, '#8D6E63', 5);
    const sw = P.mode === 'signs' ? SW([/supermarket/i, /construction/i, /hospital/i][i]) : (P.mode === 'retire' ? 1e9 : 0);
    if (t > sw) popIn(prog(t, sw, sw + .3), x + 240, 330, () => sign(0, 0, 340, 80, ['STAFF WANTED', 'ELECTRICIANS', 'CARERS WANTED'][i], '#E63946', '#fff', 34)); });
  if (P.mode === 'retire') { for (let i = 0; i < 6; i++) elder(160 + i * 110 + Math.sin(t + i) * 4, .55, { gy: GY, seed: [21, 31, 41][i % 3] }); const k = prog(p, .5, .8); for (let i = 0; i < 2; i++) person(1400 + i * 160, .55, { gy: GY, seed: [41, 51][i], scarf: false, alpha: k }); text('retiring', 450, 870 - 220, 40, { color: '#fff', stroke: INK, sw: 8 }); if (k > 0) text('starting work', 1480, 650, 40, { color: '#fff', stroke: INK, sw: 8, alpha: k }); }
  if (P.mode === 'wages') { const F = person(960, .75, { gy: GY, seed: 11, mouth: 'smile', pose: { armL: [-2.6, -2.9], armR: [2.6, 2.9] } }); const ws = [/wages/i, /training/i, /flexible/i]; ws.forEach((re, i) => { const w = SW(re); popIn(prog(t, w - .1, w + .2), 640 + i * 320, 250, () => pill(0, 0, ['+ WAGES', '+ TRAINING', '+ FLEXIBLE'][i], '#2A9D8F', 36)); }); }
};
TPL.bakery = (t, p, d, P) => {
  plain('#FDE2C4'); grass('#C9A27E');
  box(260, 140, 900, 120, 20, '#E63946'); text('BAKERY', 710, 202, 70, { color: '#fff' });
  box(260, 600, 900, 260, 10, '#8D6E63', 8); for (let i = 0; i < 5; i++) { ctx.fillStyle = '#E9B872'; ctx.beginPath(); ctx.ellipse(360 + i * 170, 580, 70, 34, 0, 0, 7); ctx.fill(); }
  person(710, 1.1, { gy: 600, seed: 11, mouth: P.mode === 'options' ? 'o' : 'smile', pose: { armL: [-.3, -.2], armR: [.3, .2] } });
  if (P.mode === 'costs') { const ws = [/wages/i, /supplier/i, /delivery/i], lab = ['STAFF', 'SUPPLIER', 'DELIVERY']; ws.forEach((re, i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 1450, 250 + i * 220, () => { box(-200, -70, 400, 140, 26, '#fff', 7); text(lab[i], -40, 4, 40, { color: INK }); upDown(130, 0, true, '#E63946', .6); }); }); }
  if (P.mode === 'options') { popIn(prog(t, 0, .3), 1450, 180, () => pill(0, 0, 'COSTS', '#E63946', 48)); upDown(1650, 200, true, '#E63946', .7);
    const ws = [/prices/i, /hours/i, /equipment/i, /close/i], lab = ['Raise prices', 'Shorter hours', 'Buy equipment', 'Close']; ws.forEach((re, i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 1450, 380 + i * 130, () => { box(-230, -50, 460, 100, 24, i === 3 ? '#FFD6D6' : '#fff', 6); text(lab[i], 0, 4, 40, { color: INK, weight: 800 }); }); }); }
};
TPL.demand = (t, p, d, P) => {
  plain('#F1F3F8'); inkPath([[300, 780], [1620, 780]], { w: 6 });
  const k1 = ease(prog(t, SW(/school/i) - .3, SW(/school/i) + .7)), k2 = ease(prog(t, SW(/healthcare/i) - .3, SW(/healthcare/i) + .7));
  bar(480, 780, 260, lerp(420, 220, k1), '#FFB703', 'school supplies'); if (k1 > 0) upDown(860, 360, false, '#E63946', .8);
  bar(1180, 780, 260, lerp(300, 560, k2), '#2A9D8F', 'healthcare'); if (k2 > 0) upDown(1560, 300, true, '#2A9D8F', .8);
  if (p < .45) popIn(prog(p, .05, .2), 960, 300, () => { box(-330, -80, 660, 160, 30, '#fff', 7); text('not always inflation', 0, 4, 46, { color: INK, weight: 800 }); });
};
TPL.matching = (t, p, d, P) => {
  plain('#EEF6F0'); const L = ['nurse', 'builder', 'teacher', 'driver'], R = ['care', 'homes', 'schools', 'deliveries'];
  L.forEach((l, i) => { person(330, .6, { gy: 300 + i * 170, seed: [11, 41, 51, 31][i], scarf: i === 0 }); text(l, 520, 230 + i * 170, 40, { color: INK, weight: 800 }); });
  R.forEach((r, i) => { box(1300, 160 + i * 170, 380, 120, 26, '#fff', 6); text(r, 1490, 222 + i * 170, 42, { color: INK, weight: 800 }); });
  const order = [0, 1, 2, 3]; order.forEach((j, i) => { const k = prog(p, .2 + i * .15, .35 + i * .15); if (k <= 0) return; ctx.save(); ctx.strokeStyle = '#2A9D8F'; ctx.lineWidth = 8; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(660, 230 + i * 170); ctx.lineTo(lerp(660, 1290, k), lerp(230 + i * 170, 222 + j * 170, k)); ctx.stroke(); ctx.restore(); });
};
TPL.productivity = (t, p, d, P) => {
  plain('#F1F3F8'); const k = ease(prog(p, .45, .9));
  for (let i = 0; i < 3; i++) { const x = 420 + i * 300; person(x, .8, { gy: 820, seed: [11, 41, 51][i], scarf: i === 0, mouth: 'smile' }); box(x + 70, 820 - lerp(150, 420, k), 70, lerp(150, 420, k), 8, '#2A9D8F', 6); }
  text('value per person', 720, 130, 44, { color: INK, weight: 800 });
  if (k > .3) popIn(prog(k, .3, .6), 1560, 400, () => { box(-240, -170, 480, 340, 40, '#fff', 8); text('LIVING', 0, -70, 54, { color: INK }); text('STANDARDS', 0, -10, 54, { color: INK }); upDown(0, 110, true, '#2A9D8F', .8); });
};
TPL.piggy = (t, p, d, P) => {
  plain(P.mode === 'fix' ? '#E3F2FD' : '#FFF3E0'); piggyBank(960, 470, 1.6);
  if (P.mode === 'question') popIn(prog(p, .2, .5), 1400, 280, () => text('?', 0, 0, 220, { color: '#E63946', stroke: '#fff', sw: 14 }));
  if (P.mode === 'fix') { const k = prog(p, .5, .8); ctx.save(); ctx.translate(1320, 330); ctx.rotate(Math.sin(T * 4) * .3 * (k > 0 ? 1 : 0)); ctx.globalAlpha = k; box(-20, -10, 40, 220, 10, '#8A8FA3', 6); ctx.fillStyle = '#8A8FA3'; ctx.beginPath(); ctx.arc(0, -40, 70, 0, 7); ctx.fill(); ctx.fillStyle = '#E3F2FD'; ctx.fillRect(-25, -120, 50, 80); ctx.restore(); cross(600, 250, 1.2 * (p < .5 ? prog(p, .15, .3) : 0)); }
};
TPL.dinner = (t, p, d, P) => {
  plain('#FFF3E0'); box(260, 560, 1400, 60, 20, '#8D6E63', 8); box(300, 620, 40, 240, 6, '#6D4C41', 5); box(1580, 620, 40, 240, 6, '#6D4C41', 5);
  for (let i = 0; i < 6; i++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(400 + i * 225, 548, 70, 18, 0, 0, 7); ctx.fill(); }
  const ret = P.retired, rk = P.retired ? ease(prog(p, .05, .4)) : 0;
  for (let i = 0; i < 10; i++) { const x = 330 + i * 140, retired = i < Math.round(ret * rk); const F = retired ? elder(x, .75, { gy: 560 }) : person(x, .75, { gy: 560, seed: [11, 41, 51, 31][i % 4], scarf: i === 5, mouth: 'smile' });
    if (!retired) coin(x, 220 + Math.sin(T * 3 + i) * 10, 22); }
  if (P.link) { const k = prog(p, .3, .7); for (let i = 4; i < 10; i++) { ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#FFB703'; ctx.lineWidth = 6; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(330 + i * 140, 200); ctx.quadraticCurveTo(900, 40, 330 + (i % 4) * 140, 200); ctx.stroke(); ctx.restore(); } text('workers', 1180, 130, 44, { color: '#2A9D8F', alpha: k }); text('retirees', 540, 130, 44, { color: '#888', alpha: k }); }
};
TPL.levers = (t, p, d, P) => {
  plain('#2B2D42'); text('GOVERNMENT OPTIONS', 960, 110, 50, { color: '#FFB703' });
  P.items.forEach((it, i) => { const w = Math.min(SW(new RegExp('^' + P.words[i], 'i')), .4 + i * .45); card2(960, 230 + i * 135, 900, 105, it, ['#E63946', '#FF8C42', '#FFB703', '#2A9D8F', '#6C63FF'][i], prog(t, w - .3, w + .1)); });
};
TPL.pillars = (t, p, d, P) => {
  plain('#F1F3F8'); const L = [['TAXES', /taxes/i, '#4FA3E0'], ['CONTRIBUTIONS', /contributions/i, '#2A9D8F'], ['INVESTED SAVINGS', /savings/i, '#FFB703']];
  box(260, 180, 1400, 80, 20, INK); text('PENSION SYSTEMS', 960, 222, 46, { color: '#fff' });
  L.forEach(([lab, re, col], i) => { const w = Math.min(SW(re), .4 + i * .45), k = ease(prog(t, w - .3, w + .3)); box(360 + i * 450, 860 - 560 * k, 300, 560 * k, 10, col, 7); if (k > .5) text(lab, 510 + i * 450, 820 - 560 * k + 80, 30, { color: '#fff' }); });
};
TPL.twoWorkers = (t, p, d, P) => {
  plain('#F1F3F8'); ctx.fillStyle = '#E3F2FD'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#FFF3E0'; ctx.fillRect(W / 2, 0, W / 2, H);
  const o = SW(/office/i), h = SW(/heavy/i);
  if (t > o - .3 || P.mode === 'q') { box(260, 560, 460, 40, 10, '#8D6E63', 6); box(380, 400, 240, 160, 10, '#111', 6); person(380, .95, { gy: 860, seed: 51, scarf: false, mouth: 'smile', pose: { armL: [-1.2, -1.6], armR: [1.2, 1.6] } }); text('flexible office job', 480, 140, 44, { color: INK, weight: 800 }); }
  if (t > h - .3 || P.mode === 'q') { const F = person(1440, .95, { gy: 860, seed: 41, scarf: false, mouth: 'flat', lean: 12, pose: { armL: [-2.9, -3.0], armR: [2.9, 3.0] } }); box(1180, F.head[1] - 140, 520, 50, 8, '#C1440E', 6); text('40 years of heavy lifting', 1440, 140, 44, { color: INK, weight: 800 }); }
  if (P.mode === 'q') { const ws = [/who/i, /conditions/i, /support/i]; ws.forEach((re, i) => { const w = SW(re); popIn(prog(t, w - .1, w + .2), 520 + i * 440, 300, () => pill(0, 0, ['WHO?', 'CONDITIONS?', 'SUPPORT?'][i], '#6C63FF', 40)); }); }
  else if (p > .8) popIn(prog(p, .8, .9), 960, 300, () => pill(0, 0, 'SAME AGE, DIFFERENT IMPACT', '#E63946', 40));
};
TPL.elders = (t, p, d, P) => {
  sky('#FFE0A3', '#FFF5E0'); grass(); clouds(2);
  for (let i = 0; i < 5; i++) elder(300 + i * 330, .9, { seed: [21, 31, 41, 51, 21][i], mouth: 'smile', pose: i % 2 ? { armL: [-2.6, -2.9], armR: [.4, .2] } : {} });
  for (let i = 0; i < 4; i++) { ctx.fillStyle = ['#FF8FAB', '#FFB703', '#E63946', '#B5A8FF'][i]; ctx.beginPath(); ctx.arc(460 + i * 330, 820, 26, 0, 7); ctx.fill(); inkPath([[460 + i * 330, 846], [460 + i * 330, 870]], { w: 6, color: '#2E7D32' }); }
  popIn(prog(p, .1, .3), 960, 140, () => { check(-260, 0, 1); text('longer lives', 40, 4, 60, { color: INK }); });
};
TPL.houses = (t, p, d, P) => {
  sky(); grass(); clouds();
  for (let i = 0; i < 5; i++) house(260 + i * 350, GY, .9, ['#FFB703', '#4FA3E0', '#7BC96F', '#FF8FAB', '#B5A8FF'][i], { sale: i % 2 === 0, dark: i % 2 === 0 });
  const price = Math.round(lerp(400, 280, ease(prog(p, .3, .9))));
  box(700, 80, 520, 150, 30, INK); text('$' + price + ',000', 960, 160, 76, { color: P.mode === 'no' ? '#fff' : '#7CFC8A', font: "'DejaVu Sans Mono'", weight: 700 });
  if (P.mode === 'no') { const w1 = SW(/yes/i), w2 = SW(/absolutely/i); popIn(prog(t, w1 - .1, w1 + .2), 400, 150, () => pill(0, 0, 'SOME PLACES', '#2A9D8F', 40)); popIn(prog(t, w2 - .1, w2 + .2), 1520, 150, () => pill(0, 0, 'NOT EVERYWHERE', '#E63946', 40)); }
};
TPL.townCity = (t, p, d, P) => {
  const f = P.focus; ctx.fillStyle = '#C9DCEB'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#8ED1FC'; ctx.fillRect(W / 2, 0, W / 2, H); grass('#9FBF8F');
  ctx.save(); ctx.globalAlpha = f === 'city' ? .45 : 1;
  for (let i = 0; i < 3; i++) house(140 + i * 260, GY, .75, ['#FFB703', '#4FA3E0', '#7BC96F'][i], { dark: true, sale: i !== 1 });
  const sc = SW(/school/i); box(620, 560, 280, 300, 8, '#E9C29B', 6); if (t > sc - .2 || f !== 'town') sign(760, 640, 220, 70, 'CLOSED', '#E63946', '#fff', 34);
  text('SMALL TOWN', 480, 170, 54, { color: INK }); ctx.restore();
  ctx.save(); ctx.globalAlpha = f === 'town' ? .45 : 1;
  [[1000, 120, 520, '#5C6784'], [1140, 140, 660, '#6E7A99'], [1300, 120, 480, '#4F5975'], [1440, 150, 720, '#5C6784'], [1610, 130, 560, '#6E7A99'], [1760, 140, 640, '#4F5975']].forEach(([x, w, h, c]) => tower(x, GY, w, h, c));
  for (let i = 0; i < 8; i++) person(1010 + i * 115 + Math.sin(T * 2 + i) * 6, .4, { gy: GY + 60, scarf: false, seed: [11, 21, 31, 41, 51][i % 5] });
  text('CAPITAL CITY', 1440, 170, 54, { color: INK }); if (f !== 'town') pill(1440, 255, '$$$ EXPENSIVE', '#E63946', 36); ctx.restore();
  if (f === 'both') { popIn(prog(p, .2, .4), 480, 255, () => pill(0, 0, 'EMPTY HOMES', '#3D5A80', 36)); popIn(prog(p, .55, .75), 1440, 300, () => pill(0, 0, 'SHORTAGES', '#E63946', 36)); }
};
TPL.households = (t, p, d, P) => {
  sky(); grass(); const k = prog(p, .45, .8);
  house(420, GY, 1.3, '#FFB703'); for (let i = 0; i < 4; i++) person(300 + i * 80, .4, { gy: GY - 10, scarf: i === 0, seed: [11, 41, 51, 31][i] });
  text('4 people, 1 home', 420, 160, 46, { color: INK });
  if (k > 0) { for (let i = 0; i < 4; i++) popIn(prog(k, i * .2, i * .2 + .3), 1000 + i * 240, GY, () => { house(0, 0, .65, ['#4FA3E0', '#7BC96F', '#FF8FAB', '#B5A8FF'][i]); person(110, .4, { gy: 0, scarf: false, seed: [41, 51, 21, 31][i] }); }); text('4 people, 4 homes', 1360, 160, 46, { color: '#E63946', alpha: k }); }
};
TPL.accessible = (t, p, d, P) => {
  sky('#FFE0A3', '#FFF5E0'); grass(); house(620, GY, 1.3, '#7BC96F', { ramp: true }); hospital(1450, GY, .9);
  elder(900, .85, { mouth: 'smile' }); const ws = [/smaller/i, /accessible/i, /healthcare/i], lab = ['SMALLER', 'ACCESSIBLE', 'NEAR HEALTHCARE'];
  ws.forEach((re, i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 420 + i * 520, 140, () => pill(0, 0, lab[i], ['#2A9D8F', '#4FA3E0', '#E63946'][i], 38)); });
};
TPL.farHouse = (t, p, d, P) => {
  sky(); grass('#C9DCA0'); house(260, GY, 1, '#FFB703'); pill(260, 340, '$ CHEAP', '#2A9D8F', 38);
  const dest = [[/employer/i, 1350, 'WORK'], [/hospital/i, 1580, 'HOSPITAL'], [/supermarket/i, 1800, 'SHOP']];
  dest.forEach(([re, x, lab], i) => { const w = Math.min(SW(re), .4 + i * .45), k = prog(t, w - .3, w + .5); if (k <= 0) return; box(x - 100, GY - 220, 200, 220, 8, ['#B0B7C6', '#fff', '#7BC96F'][i], 6); text(lab, x, GY - 260, 32, { color: INK });
    ctx.save(); ctx.setLineDash([18, 14]); ctx.strokeStyle = '#E63946'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(400, GY - 60 - i * 40); ctx.lineTo(lerp(400, x - 110, k), GY - 60 - i * 40); ctx.stroke(); ctx.restore(); });
  if (p > .7) text('50 km', 860, 600, 60, { color: '#E63946', stroke: '#fff', sw: 10 });
};
TPL.aiTools = (t, p, d, P) => {
  plain('#EEF2FF'); grass('#CFD8E3');
  box(300, 560, 600, 40, 10, '#8D6E63', 6); box(470, 400, 260, 160, 10, '#111', 6); ctx.fillStyle = '#39FF88'; for (let i = 0; i < 4; i++) ctx.fillRect(500, 430 + i * 30, 120 + rnd(i + Math.floor(T * 3)) * 80, 12);
  person(600, 1, { seed: 11, mouth: 'smile', pose: { armL: [-1.2, -1.6], armR: [1.2, 1.6] } });
  if (P.mode === 'intro') { popIn(prog(p, .4, .6), 1350, 420, () => { for (let i = 0; i < 3; i++) box(-200 + i * 140, 120 - (i + 1) * 90, 110, (i + 1) * 90, 8, '#2A9D8F', 5); upDown(260, -60, true, '#2A9D8F', .7); }); }
  else { const ws = [[/software/i, 'SOFTWARE', 'paperwork'], [/machines/i, 'MACHINES', 'repetitive tasks'], [/equipment/i, 'BETTER EQUIPMENT', 'older workers']];
    ws.forEach(([re, a, b], i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 1420, 230 + i * 220, () => { box(-330, -80, 660, 160, 28, '#fff', 7); text(a, 0, -22, 44, { color: '#6C63FF' }); text(b, 0, 34, 34, { color: '#777', weight: 800 }); }); });
    robot(1050, GY + 20, .7); }
};
TPL.team = (t, p, d, P) => {
  plain('#F1F3F8'); const k = prog(p, .2, .45), boost = ease(prog(p, .45, .75));
  for (let i = 0; i < 10; i++) { const gone = i === 9 && k > 0; ctx.save(); ctx.globalAlpha = gone ? 1 - k * .85 : 1; person(180 + i * 110, .55, { gy: 760, seed: [11, 21, 31, 41, 51][i % 5], scarf: i === 0, mouth: boost > .5 ? 'smile' : 'flat' }); ctx.restore(); }
  if (k > 0) cross(180 + 9 * 110, 600, .8 * k);
  text('-10% team', 650, 860, 40, { color: '#E63946', alpha: k });
  const out = 520; bar(1480, 780, 220, out, '#2A9D8F', 'total output', boost > .5 ? 'SAME' : ''); inkPath([[1440, 780 - out], [1740, 780 - out]], { w: 6, color: '#E63946', dash: [16, 12] });
};
TPL.obstacles = (t, p, d, P) => {
  plain('#FFF8E7'); const lab = ['COST', 'TIME', 'TRAINING', 'FAIRNESS'];
  for (let i = 0; i < 4; i++) { const x = 260 + i * 360, h = 160 + i * 140; box(x, GY - h, 360, h, 8, ['#FFB703', '#FF8C42', '#E63946', '#6C63FF'][i], 7); const w = Math.min(SW(new RegExp('^' + P.words[i], 'i')), .4 + i * .45); if (t > w - .2) text(lab[i], x + 180, GY - h + 60, 46, { color: '#fff' }); }
  let step = 0; P.words.forEach((wd, i) => { if (t > SW(new RegExp('^' + wd, 'i'))) step = i + 1; });
  const sx = 260 + Math.max(0, step - .5) * 360 + 180, sh = 160 + Math.max(0, step - 1) * 140; robot(step ? sx : 120, GY - (step ? sh : 0), .55);
};
TPL.care = (t, p, d, P) => {
  plain('#F1F3F8'); const v = [[/shower/i, 'helping someone shower'], [/pipe/i, 'repairing a water pipe'], [/patient/i, 'comforting a patient']];
  v.forEach(([re, lab], i) => { const w = Math.min(SW(re), .4 + i * .45), k = prog(t, w - .4, w); if (k <= 0) return; const x = 320 + i * 640; ctx.save(); ctx.globalAlpha = k; box(x - 280, 130, 560, 640, 30, '#fff', 7);
    if (i === 0) { elder(x - 80, .65, { gy: 640 }); person(x + 90, .65, { gy: 640, scarf: false, seed: 51, pose: { armL: [-1.4, -1.8], armR: [.3, .2] } }); }
    if (i === 1) { inkPath([[x - 200, 450], [x + 200, 450]], { w: 40, color: '#8A8FA3' }); for (let j = 0; j < 4; j++) { const k2 = (T * 1.5 + j / 4) % 1; ctx.fillStyle = '#4FA3E0'; ctx.beginPath(); ctx.ellipse(x + 20, 480 + k2 * 150, 10, 16, 0, 0, 7); ctx.fill(); } person(x - 60, .6, { gy: 640, scarf: false, seed: 41, pose: { armL: [-2.6, -2.9], armR: [2.6, 2.9] } }); }
    if (i === 2) { box(x - 220, 520, 440, 70, 16, '#BDE0FE', 6); lyingHeroLite(x - 40, 520); person(x + 140, .6, { gy: 640, scarf: false, seed: 21, pose: { armL: [-.3, -.2], armR: [-1.3, -1.6] } }); heart(x + 40, 300, 2.2); }
    text(lab, x, 720, 34, { color: INK, weight: 800 }); ctx.restore(); });
  if (p > .75) popIn(prog(p, .75, .85), 960, 860 - 20, () => pill(0, 0, 'HARD TO AUTOMATE', '#E63946', 40));
};
function lyingHeroLite(x, y) { ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); figure(0, 0, .5, { scarf: false, seed: 31, eyes: 'closed', mouth: 'flat', pose: { legL: [0, 0], legR: [.05, .05], armL: [-.2, -.1], armR: [.2, .1] } }); ctx.restore(); }
TPL.twoFutures = (t, p, d, P) => {
  const m = P.mode, bw = m === 'bright' ? W : m === 'grey' ? 0 : W / 2;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, bw, H); ctx.clip(); sky('#8ED1FC', '#E8F6FF'); grass(); clouds(2); for (let i = 0; i < 3; i++) person(180 + i * 220, .8, { seed: [11, 41, 51][i], scarf: i === 0, mouth: 'smile' }); robot(820, GY + 10, .6); if (m !== 'grey') text('A GOOD QUALITY OF LIFE', bw / 2, 170, 46, { color: INK }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(bw, 0, W - bw, H); ctx.clip(); plain('#9AA0B5'); grass('#7A8096'); tower(1080, GY, 220, 640, '#4F5975'); sign(1190, 180, 300, 70, 'FEW COMPANIES', '#FFB703', INK, 30); hospital(1600, GY, .8); sign(1600, 420, 320, 70, 'UNDERSTAFFED', '#E63946', '#fff', 30); elder(1370, .7, { mouth: 'sad' }); if (m !== 'bright') text('', 0, 0, 1); ctx.restore();
  if (m === 'both') inkPath([[W / 2, 0], [W / 2, H]], { w: 12, color: '#fff' });
  if (m === 'bright') { const ws = [/resources/i, /investment/i, /incentives/i], lab = ['LESS PRESSURE ON RESOURCES', 'MORE INVESTMENT PER CHILD', 'PRODUCTIVITY INCENTIVES']; ws.forEach((re, i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 1400, 300 + i * 150, () => pill(0, 0, lab[i], '#2A9D8F', 32)); }); }
  if (m === 'grey') { const ws = [/care/i, /communities/i, /financial/i], lab = ['STRETCHED CARE', 'STRUGGLING COMMUNITIES', 'HARD FINANCIAL CHOICES']; ws.forEach((re, i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 520, 300 + i * 150, () => pill(0, 0, lab[i], '#E63946', 32)); }); }
};
TPL.babyBonus = (t, p, d, P) => {
  sky(); grass(); box(1150, 300, 600, 560, 8, '#F1F3F8', 8); for (let i = 0; i < 5; i++) box(1190 + i * 112, 420, 60, 440, 6, '#E3E8F2', 5); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(1120, 305); ctx.lineTo(1450, 160); ctx.lineTo(1780, 305); ctx.fill(); text('GOV', 1450, 260, 50, { color: '#fff' });
  person(560, .95, { seed: 11, mouth: 'o' }); person(760, .95, { scarf: false, seed: 51, mouth: 'flat' });
  for (let i = 0; i < 4; i++) { const k = (t * .5 + i / 4) % 1; coin(lerp(1150, 820, k), 520 - Math.sin(k * Math.PI) * 120, 26); }
  const q = SW(/will/i); if (t > q) popIn(prog(t, q, q + .3), 660, 220, () => text('?', 0, 0, 200, { color: '#E63946', stroke: '#fff', sw: 12 }));
  const n = SW(/guaranteed/i); if (t > n) popIn(prog(t, n, n + .3), 960, 860, () => pill(0, 0, 'NO GUARANTEED RESULT', '#E63946', 40));
};
TPL.checklist = (t, p, d, P) => {
  plain('#FFF8E7'); person(260, 1, { seed: 11, mouth: 'flat', look: [1, -.5], gy: 860 }); person(420, 1, { scarf: false, seed: 51, mouth: 'flat', look: [1, -.5], gy: 860 });
  P.items.forEach((it, i) => { const w = Math.min(SW(new RegExp('^' + P.words[i], 'i')), .4 + i * .45); card2(1160, 160 + i * 150, 1000, 115, it, '#6C63FF', prog(t, w - .5, w - .1)); });
};
TPL.couplesChoice = (t, p, d, P) => {
  plain('#F1F3F8'); ctx.fillStyle = '#E3F2FD'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#FFF3E0'; ctx.fillRect(W / 2, 0, W / 2, H);
  person(380, .9, { seed: 21, scarf: false, mouth: 'smile' }); person(560, .9, { seed: 31, scarf: false, mouth: 'smile' }); text('want fewer children', 480, 150, 46, { color: INK });
  const o = SW(/others/i); if (t > o - .2) { person(1240, .9, { seed: 11, mouth: 'flat' }); person(1420, .9, { seed: 51, scarf: false, mouth: 'flat' }); box(1600, 440, 50, 420, 6, '#8D6E63', 6); for (let i = 0; i < 6; i++) box(1600, 440 + i * 70, 50, 60, 4, '#C1440E', 4); text('want children, face barriers', 1440, 150, 46, { color: INK }); }
};
TPL.policyCards = (t, p, d, P) => {
  plain('#EEF6F0'); const L = [[/childcare/i, 'CHILDCARE', 'baby'], [/leave/i, 'PARENTAL LEAVE', 'workers'], [/employment/i, 'STABLE JOBS', 'piggy'], [/housing/i, 'HOUSING', 'house']];
  L.forEach(([re, lab, ic], i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .2, w + .2), 300 + i * 440, 470, () => { box(-190, -260, 380, 520, 30, '#fff', 8); miniIcon(ic, 0, -20, .55); text(lab, 0, 200, 38, { color: '#2A9D8F' }); }); });
};
TPL.babyTimeline = (t, p, d, P) => {
  plain('#FFF8E7'); inkPath([[200, 760], [1720, 760]], { w: 10 }); const k = ease(prog(p, .3, .9));
  const st = [[0, 'birth'], [.33, '7 years'], [.66, '14 years'], [1, '~20 years']];
  st.forEach(([f, lab], i) => { const x = 200 + f * 1520; dot(x, 760, 16, k >= f ? '#E63946' : '#ccc'); text(lab, x, 820, 34, { color: k >= f ? INK : '#bbb', weight: 800 }); if (k >= f - .02) { if (i === 0) stroller(x + 40, 740, .55); else if (i === 3) { person(x - 40, .85, { gy: 740, seed: 51, scarf: false, mouth: 'smile' }); pill(x - 40, 180, 'NURSE / TAXPAYER', '#2A9D8F', 30); } else kid(x, .7 + i * .25, { gy: 740 }); } });
};
TPL.migration = (t, p, d, P) => {
  plain('#E8F6FF'); ctx.fillStyle = '#7BC96F'; ctx.beginPath(); ctx.ellipse(380, 560, 300, 200, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#FFB703'; ctx.beginPath(); ctx.ellipse(1540, 560, 300, 200, 0, 0, 7); ctx.fill();
  const k = (t * .25) % 1; plane(lerp(500, 1420, k), 380 - Math.sin(k * Math.PI) * 160, .7, Math.cos(k * Math.PI) * -.25);
  for (let i = 0; i < 3; i++) person(1460 + i * 90, .45, { gy: 640, scarf: false, seed: [21, 41, 31][i] });
  P.words.forEach((wd, i) => { const w = Math.min(SW(new RegExp('^' + wd, 'i')), .4 + i * .45); popIn(prog(t, w - .1, w + .2), 330 + i * 420, 880, () => pill(0, 0, ['HOUSING', 'INFRASTRUCTURE', 'FAIR WORK', 'SKILLS RECOGNISED'][i], '#3D5A80', 30)); });
};
TPL.migrationGlobe = (t, p, d, P) => {
  plain('#0E1A33'); earth(960, 470, 300, false);
  for (let i = 0; i < 3; i++) { const a0 = i * 2.1 + T * .3, a1 = a0 + 1.4; ctx.save(); ctx.strokeStyle = '#FFB703'; ctx.lineWidth = 8; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.arc(960, 470, 380, a0, a1); ctx.stroke(); ctx.restore(); }
  box(1380, 140, 460, 150, 30, '#fff', 7); text('GLOBAL POPULATION', 1610, 190, 30, { color: '#777' }); text('UNCHANGED', 1610, 245, 50, { color: INK });
  const ws = [/training/i, /productivity/i, /opportunities/i]; ws.forEach((re, i) => { const w = SW(re); popIn(prog(t, w - .1, w + .2), 260, 250 + i * 160, () => pill(0, 0, ['+ TRAINING', '+ PRODUCTIVITY', '+ OPPORTUNITY'][i], '#2A9D8F', 32)); });
};
TPL.noSwitch = (t, p, d, P) => {
  plain('#F1F3F8'); box(760, 230, 400, 560, 40, '#fff', 10); box(900, 360, 120, 300, 40, '#ddd', 6); const fl = Math.sin(T * 3) > 0; box(910, fl ? 380 : 520, 100, 120, 30, '#E63946', 6);
  text('FIX DEMOGRAPHICS', 960, 160, 50, { color: INK }); cross(960, 510, 2.8 * easeBack(prog(p, .4, .7)));
};
TPL.triple = (t, p, d, P) => {
  const w = W / 3;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, H); ctx.clip(); sky('#B8C5E0', '#E3E8F2'); grass('#8A8FA3'); [[20, 140, 420], [170, 130, 520], [310, 150, 380], [470, 140, 470]].forEach(([x, ww, h]) => tower(x, GY, ww, h, '#5C6784')); for (let i = 0; i < 6; i++) person(60 + i * 95, .35, { gy: GY + 50, scarf: false, seed: [11, 21, 31, 41, 51][i % 5] }); text('CROWDED CITY', w / 2, 160, 40, { color: INK }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(w, 0, w, H); ctx.clip(); sky('#FFE0A3', '#FFF5E0'); grass('#9FBF8F'); house(w + 160, GY, .7, '#FFB703'); house(w + 460, GY, .6, '#4FA3E0', { dark: true }); text('QUIET VILLAGE', w * 1.5, 160, 40, { color: INK }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(2 * w, 0, w, H); ctx.clip(); sky('#B4F8C8', '#EEFFF3'); grass(); for (let i = 0; i < 3; i++) elder(2 * w + 130 + i * 190, .7, { mouth: 'smile', seed: [21, 31, 41][i] }); text('THRIVING OLDER COMMUNITY', w * 2.5, 160, 36, { color: INK }); ctx.restore();
  inkPath([[w, 0], [w, H]], { w: 10, color: '#fff' }); inkPath([[2 * w, 0], [2 * w, H]], { w: 10, color: '#fff' });
};
TPL.worldPaths = (t, p, d, P) => {
  plain('#0E1A33'); earth(960, 470, 320, false);
  for (let i = 0; i < 18; i++) { const a = rnd(i * 3.7) * 6.28, r = rnd(i * 5.1) * 260, x = 960 + Math.cos(a) * r, y = 470 + Math.sin(a) * r, g = i % 2 === 0; ctx.fillStyle = g ? '#7CFC8A' : '#B5A8FF'; ctx.beginPath(); ctx.arc(x, y, 16 + Math.sin(T * 3 + i) * 4, 0, 7); ctx.fill(); }
  const w1 = SW(/growing/i), w2 = SW(/ageing/i); popIn(prog(t, w1 - .1, w1 + .2), 330, 300, () => pill(0, 0, 'STILL GROWING', '#2A9D8F', 38)); popIn(prog(t, w2 - .1, w2 + .2), 1590, 300, () => pill(0, 0, 'AGEING & SHRINKING', '#6C63FF', 38));
};
TPL.society = (t, p, d, P) => {
  sky('#FFE5EC', '#FFF5F8'); grass(); clouds(2);
  person(240, .8, { seed: 21, scarf: false }); person(380, .8, { seed: 31, scarf: false }); kid(500, .8, { seed: 41 }); kid(600, .8, { seed: 51 }); kid(690, .8, { seed: 21 });
  person(900, .8, { seed: 11 }); text('', 0, 0, 1);
  person(1120, .8, { seed: 41, scarf: false }); person(1250, .8, { seed: 51, scarf: false }); kid(1370, .8, { seed: 31 });
  elder(1600, .8, { seed: 21 }); elder(1730, .8, { seed: 31 });
  const w = SW(/building/i); popIn(prog(t, w - .1, w + .3), 960, 150, () => pill(0, 0, 'REAL CHOICES  ·  GOOD LIVING STANDARDS', '#2A9D8F', 40));
};
TPL.bigQuestion = (t, p, d, P) => {
  plain('#2B2D42'); const w2 = SW(/^it$/i);
  text('"What if there are fewer of us?"', 960, 380, 70, { color: '#fff', alpha: prog(t, 0, .4) });
  if (t > w2) { inkPath([[300, 380], [lerp(300, 1620, prog(t, w2, w2 + .5)), 380]], { w: 14, color: '#E63946' }); popIn(prog(t, w2 + .3, w2 + .8), 960, 600, () => text('"What if our systems never learn to adapt?"', 0, 0, 66, { color: '#FFB703' })); }
};
TPL.cta = (t, p, d, P) => {
  plain('#F1F3F8'); const L = [[/housing/i, 'HOUSING', 'house', '#FFB703'], [/retirement/i, 'RETIREMENT', 'piggy', '#FF8FAB'], [/work/i, 'THE WAY WE WORK', 'workers', '#4FA3E0']];
  L.forEach(([re, lab, ic, col], i) => { const w = Math.min(SW(re), .4 + i * .45); popIn(prog(t, w - .2, w + .2), 420 + i * 540, 470, () => { box(-230, -270, 460, 540, 34, '#fff', 8); ctx.fillStyle = col; rrect(-230, 170, 460, 100, 34); ctx.fill(); ctx.fillRect(-230, 170, 460, 40); miniIcon(ic, 0, -40, .6); text(lab, 0, 225, 38, { color: INK }); }); });
  const c = SW(/comments/i); if (t > c - .3) popIn(prog(t, c - .3, c + .1), 960, 120, () => pill(0, 0, 'TELL US IN THE COMMENTS', '#E63946', 44));
};
TPL.endcard = (t, p, d, P) => { plain('#2B2D42'); text('WHAT IF...?', 960, 470, 150, { color: '#FFB703', alpha: prog(t, 0, .6) }); text('thanks for watching', 960, 620, 50, { color: '#fff', alpha: prog(t, .4, 1) }); const f = prog(t, d - 1, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };

// ---------- kicker + subtitles ----------
function kicker(seg, lt) { if (!seg.kick) return; const k = easeOut(prog(lt, .15, .6)); ctx.save(); ctx.globalAlpha = k; ctx.font = "900 34px 'Inter Display'"; const w = ctx.measureText(seg.kick).width + 60; ctx.fillStyle = 'rgba(43,45,66,.92)'; rrect(40, 30 - (1 - k) * 20, w, 64, 32); ctx.fill(); ctx.restore(); text(seg.kick, 40 + w / 2, 64 - (1 - k) * 20, 34, { color: '#FFB703', alpha: k }); }
function subtitles(t) {
  const seg = SEG; if (!seg || !seg.chunks) return; const c = seg.chunks.find(c => t >= c.s - .05 && t < c.e + .25); if (!c) return;
  ctx.save(); ctx.font = "800 46px 'Inter Display'"; const tw = ctx.measureText(c.text).width; ctx.fillStyle = 'rgba(20,20,28,.78)'; rrect(960 - tw / 2 - 30, 948, tw + 60, 84, 20); ctx.fill(); ctx.restore();
  text(c.text, 960, 992, 46, { color: '#fff', weight: 800 });
}
window.setup = tl => { TL = tl; return tl.segs.length; };
window.render = t => {
  T = t; BOIL = Math.floor(t * 8); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  let i = TL.segs.findIndex(s => t >= s.a && t < s.b); if (i < 0) i = TL.segs.length - 1; SEG = TL.segs[i];
  const lt = t - SEG.a, d = SEG.b - SEG.a;
  const z = 1 + .03 * (lt / d); ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
  (TPL[SEG.scene] || TPL.endcard)(lt, lt / d, d, SEG.params || {}); ctx.restore();
  kicker(SEG, lt); subtitles(t);
  const fi = 1 - prog(lt, 0, .25); if (fi > 0 && i > 0) { ctx.save(); ctx.fillStyle = '#fff'; ctx.globalAlpha = fi * .6; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  return i;
};
window.grab = () => cv.toDataURL('image/jpeg', 0.9).split(',')[1];
