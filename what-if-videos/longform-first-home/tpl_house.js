// ================= FIRST-HOME TEMPLATES =================
const talking = () => SEG && SEG.words && SEG.words.some(w => T >= w.s && T <= w.e + .05);
const lip = (base = 'smile') => talking() ? (BOIL % 2 ? 'o' : base) : base;
function warmRoom() { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, '#FFE8CC'); g.addColorStop(1, '#FFD1A6'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#E9B98A'; ctx.fillRect(0, GY, W, H - GY);
  box(120, 220, 360, 520, 10, '#C98B5A', 8); for (let i = 0; i < 4; i++) { box(140, 250 + i * 120, 320, 14, 4, '#8D5A35', 0); for (let j = 0; j < 6; j++) box(150 + j * 50, 250 + i * 120 - 80, 36, 80, 4, ['#E63946', '#4FA3E0', '#2A9D8F', '#FFB703', '#6C63FF', '#FF8FAB'][(i + j) % 6], 4); }
  box(1560, 640, 140, 220, 20, '#8D6E63', 6); cloudShape(1630, 560, 220, 150, '#5FB15A'); ctx.fillStyle = 'rgba(255,240,200,.35)'; ctx.beginPath(); ctx.arc(1500, 200, 260, 0, 7); ctx.fill(); }
function host(x, s = 1.25, o = {}) { return person(x, s, { seed: 11, mouth: lip(o.mood || 'smile'), look: o.look || [0, 0], pose: talking() ? { armL: [-.4 - Math.sin(T * 5) * .15, -.2], armR: [.9 + Math.sin(T * 4) * .3, 1.9] } : {}, ...o }); }
function headline(x, y, w, txt, col, k) { popIn(k, x, y, () => { box(-w / 2, -70, w, 140, 14, '#fff', 7); ctx.fillStyle = col; ctx.fillRect(-w / 2, -70, 26, 140); text(txt, 14, 4, 46, { color: INK }); }); }
function card(x, y, w, h, limit, col = '#3D5A80') { box(x, y, w, h, 30, col, 7); box(x + 40, y + 60, 90, 64, 10, '#FFD166', 5); text('**** 4821', x + w / 2, y + h - 110, 44, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 }); text(limit, x + w / 2, y + h - 50, 40, { color: '#BDE0FE' }); }
function money(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 5; i++) { box(-160, -i * 34, 320, 120, 10, '#7BC96F', 5); text('$', 0, 60 - i * 34, 60, { color: '#2E7D32' }); } ctx.restore(); }
function townhouse(x, y, s, col = '#4FA3E0') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 3; i++) { box(-210 + i * 140, -300, 140, 300, 6, [col, '#7BC96F', '#FFB703'][i], 6); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-214 + i * 140, -298); ctx.lineTo(-140 + i * 140, -360); ctx.lineTo(-66 + i * 140, -298); ctx.fill(); box(-180 + i * 140, -240, 80, 60, 4, '#BDE0FE', 4); box(-165 + i * 140, -110, 50, 110, 4, '#8D6E63', 4); } ctx.restore(); }
function bigHouse(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-300, -300, 600, 300, 8, '#F1F3F8', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-340, -295); ctx.lineTo(0, -480); ctx.lineTo(340, -295); ctx.fill(); ctx.fillStyle = '#3D5A80'; ctx.beginPath(); ctx.moveTo(-320, -300); ctx.lineTo(0, -466); ctx.lineTo(320, -300); ctx.fill(); for (let i = 0; i < 4; i++) box(-260 + i * 140, -240, 90, 80, 4, '#BDE0FE', 5); box(-50, -140, 100, 140, 6, '#8D6E63', 6); ctx.restore(); }
function keys(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(T * 2) * .15); ctx.strokeStyle = INK; ctx.lineWidth = 14; ctx.fillStyle = '#FFD23F'; ctx.beginPath(); ctx.arc(0, -60, 50, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -60, 16, 0, 7); ctx.fill(); ctx.fillStyle = '#FFD23F'; ctx.fillRect(-12, -10, 24, 150); ctx.strokeRect(-12, -10, 24, 150); ctx.fillRect(12, 90, 30, 16); ctx.fillRect(12, 120, 22, 14); ctx.restore(); }
function line2(pts, col, w = 12) { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); pts.forEach((q, i) => i ? ctx.lineTo(...q) : ctx.moveTo(...q)); ctx.stroke(); }
function growLine(x0, y0, w, h, k, f, col) { const pts = []; for (let i = 0; i <= 40; i++) { const x = i / 40; if (x > k) break; pts.push([x0 + x * w, y0 - f(x) * h]); } if (pts.length > 1) line2(pts, col); return pts[pts.length - 1]; }
function disclaimerStrip(k) { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(20,20,28,.8)'; rrect(W - 1010, 26, 970, 56, 16); ctx.fill(); ctx.restore(); text('General information only, not financial advice. Rules vary by country.', W - 525, 56, 26, { color: '#fff', weight: 800, alpha: k }); }

TPL.news = (t, p, d, P) => {
  const cut = Math.floor(t / 1.6) % 3;
  if (cut === 0) { plain('#14213D'); headline(960, 260, 1300, 'HOUSE PRICES HIT ANOTHER RECORD', '#E63946', prog(t % 1.6, 0, .25)); headline(960, 470, 1100, 'INTEREST RATES RISE AGAIN', '#FFB703', prog(t % 1.6, .2, .45)); headline(960, 680, 1250, 'FIRST-HOME BUYERS PRICED OUT', '#E63946', prog(t % 1.6, .4, .65)); }
  if (cut === 1) { sky('#B8C5E0', '#E3E8F2'); grass('#9FBF8F'); house(1300, GY, 1.4, '#FFB703'); sign(1300, 300, 300, 80, 'AUCTION', '#E63946', '#fff', 40); person(560, 1.1, { seed: 11, mouth: 'o', look: [1, -.4] }); person(760, 1.1, { scarf: false, seed: 51, mouth: 'sad', look: [1, -.4] }); for (let i = 0; i < 4; i++) person(1650 + i * 70, .6, { scarf: false, seed: [21, 31, 41][i % 3], pose: { armL: [-.3, -.2], armR: [2.6, 3] } }); }
  if (cut === 2) { plain('#F1F3F8'); inkPath([[220, 820], [1700, 820]], { w: 6 }); growLine(220, 820, 1480, 650, prog(t % 1.6, 0, 1.4), x => .1 + .85 * x * x, '#E63946'); text('HOUSE PRICES', 600, 200, 60, { color: '#E63946' }); }
  if (P.disclaimer) disclaimerStrip(1 - prog(t, 6, 7));
};
TPL.host = (t, p, d, P) => { warmRoom(); host(960, 1.4, { mood: P.mood }); };
TPL.xOverlay = (t, p, d, P) => {
  warmRoom(); host(1500, 1.2);
  popIn(prog(t, .1, .5), 700, 430, () => { box(-460, -170, 920, 340, 40, '#fff', 9); text('Median Income', 0, -60, 76, { color: INK }); text('= $0 Home?', 0, 50, 76, { color: INK }); });
  const k = prog(t, .7, 1.1); if (k > 0) { ctx.save(); ctx.strokeStyle = '#E63946'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(300, 260); ctx.lineTo(lerp(300, 1100, k), lerp(260, 600, k)); ctx.stroke(); const k2 = prog(t, 1.0, 1.4); if (k2 > 0) { ctx.beginPath(); ctx.moveTo(1100, 260); ctx.lineTo(lerp(1100, 300, k2), lerp(260, 600, k2)); ctx.stroke(); } ctx.restore(); }
  const r = SW(/twenty/i); if (t > r - .3) popIn(prog(t, r - .3, r + .1), 700, 760, () => pill(0, 0, 'RULES FROM 20 YEARS AGO', '#6C63FF', 40));
};
TPL.oldRules = (t, p, d, P) => {
  plain('#F1F3F8'); inkPath([[220, 820], [1150, 820]], { w: 6 });
  const k = ease(prog(p, .1, .95)); growLine(220, 820, 930, 620, k, x => .2 + .75 * x * x, '#E63946'); const sv = growLine(220, 820, 930, 620, k, x => .03 + .3 * x, '#2A9D8F');
  text('house prices', 900, 180, 40, { color: '#E63946' }); text('your 20% savings', 1000, 640, 36, { color: '#2A9D8F' });
  const L = [[/10/, 'SAVE 10%'], [/bank/i, 'STANDARD BANK RATE'], [/20/, 'WAIT FOR 20%']]; L.forEach(([re, lab], i) => { const w = Math.min(SW(re), .4 + i * .5); popIn(prog(t, w - .1, w + .2), 1530, 250 + i * 160, () => pill(0, 0, lab, '#3D5A80', 36)); });
  const pr = SW(/priced/i); if (t > pr) popIn(prog(t, pr, pr + .3), 1530, 760, () => pill(0, 0, 'PRICED OUT', '#E63946', 54));
};
TPL.blueprint = (t, p, d, P) => {
  plain('#1D3557'); ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  const k = prog(p, 0, .6); ctx.save(); ctx.strokeStyle = '#BDE0FE'; ctx.lineWidth = 8; ctx.setLineDash([2000]); ctx.lineDashOffset = 2000 * (1 - k); ctx.beginPath(); ctx.moveTo(400, 800); ctx.lineTo(400, 480); ctx.lineTo(700, 260); ctx.lineTo(1000, 480); ctx.lineTo(1000, 800); ctx.closePath(); ctx.moveTo(640, 800); ctx.lineTo(640, 640); ctx.lineTo(760, 640); ctx.lineTo(760, 800); ctx.stroke(); ctx.restore();
  const ky = SW(/keys/i); if (t > ky - .3) { keys(1400, 520, 1.4 * easeBack(prog(t, ky - .3, ky + .2))); }
  host(1650, 1, { mood: 'smile' });
};
TPL.step = (t, p, d, P) => {
  plain(['#E63946', '#2A9D8F', '#6C63FF', '#FF8C42', '#3D5A80'][(P.num - 1) % 5]);
  ctx.save(); ctx.globalAlpha = .12; for (let i = 0; i < 12; i++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(rnd(i * 3) * W, rnd(i * 7) * H, 60 + rnd(i) * 140, 0, 7); ctx.fill(); } ctx.restore();
  const k = easeOut(prog(t, 0, .5)); text('STEP ' + P.num, 960, 330 - (1 - k) * 40, 72, { color: 'rgba(255,255,255,.9)', alpha: k });
  popIn(prog(t, .2, .6), 960, 500, () => { ctx.font = "900 84px 'Inter Display'"; const fs = Math.min(84, 84 * 1700 / ctx.measureText(P.title).width); text(P.title, 0, 0, fs, { color: '#fff', stroke: INK, sw: 14 }); });
  popIn(prog(t, .5, .9), 960, 760, () => { if (P.icon === 'card') card(-200, -110, 400, 250, ''); else if (P.icon === 'shield') { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(110, -80); ctx.quadraticCurveTo(110, 60, 0, 130); ctx.quadraticCurveTo(-110, 60, -110, -80); ctx.closePath(); ctx.fill(); check(0, 0, 1.4); } else miniIcon(P.icon, 0, -40, .8); });
};
TPL.borrowBars = (t, p, d, P) => {
  plain('#F1F3F8'); inkPath([[200, 820], [1250, 820]], { w: 6 });
  const k1 = ease(prog(p, .05, .3)), k2 = ease(prog(p, .3, .55));
  bar(300, 820, 300, 560 * k1, '#2A9D8F', 'what you make'); bar(760, 820, 300, 380 * k2, '#3D5A80', 'what banks think you can pay');
  const bc = SW(/borrowing/i); if (t > bc - .2) popIn(prog(t, bc - .2, bc + .2), 1550, 300, () => pill(0, 0, 'BORROWING CAPACITY', '#E63946', 40));
  host(1600, 1);
};
TPL.cashFlag = (t, p, d, P) => {
  plain('#F1F3F8'); money(420, 560, 1.2); text('$50,000', 420, 260, 80, { color: '#2E7D32' });
  box(860, 220, 860, 480, 26, '#0D1117', 8); text('LENDER ALGORITHM', 1290, 290, 40, { color: '#39FF88', font: "'DejaVu Sans Mono'", weight: 700 });
  const fl = SW(/flags/i); if (t > fl - .2) popIn(prog(t, fl - .2, fl + .2), 1290, 420, () => pill(0, 0, 'HIGH RISK', '#E63946', 54));
  const sl = SW(/slashed/i); const amt = t > sl ? Math.round(lerp(500, 380, ease(prog(t, sl, sl + .8)))) : 500;
  text('Pre-approval: $' + amt + ',000', 1290, 590, 56, { color: t > sl ? '#FF6B6B' : '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
  if (t > sl) upDown(1700, 580, false, '#E63946', .6);
};
TPL.creditCard = (t, p, d, P) => {
  plain('#EEF2FF'); const dr = SW(/dropping/i), bo = SW(/boost/i);
  box(140, 640, 760, 220, 16, '#8D6E63', 8); box(440, 720, 160, 40, 12, '#6D4C41', 5);
  const lim = t > dr ? '$1,000 LIMIT' : '$10,000 LIMIT', zero = t < dr;
  ctx.save(); ctx.translate(520, 400); ctx.rotate(-.06); card(-300, -180, 600, 360, lim, t > dr ? '#2A9D8F' : '#3D5A80'); ctx.restore();
  if (zero) text('balance: $0', 520, 620, 38, { color: '#777', weight: 800 });
  const ld = SW(/lender/i); if (t > ld - .2 && t < dr) popIn(prog(t, ld - .2, ld + .2), 1400, 300, () => { box(-330, -110, 660, 220, 30, '#fff', 8); text('Lender sees:', 0, -40, 36, { color: '#777' }); text('$10,000 DEBT', 0, 30, 64, { color: '#E63946' }); });
  if (t > bo - .3) popIn(prog(t, bo - .3, bo + .2), 1400, 440, () => { box(-360, -170, 720, 340, 34, '#fff', 8); text('Borrowing power', 0, -80, 44, { color: '#777' }); text('+$40k to $50k', 0, 20, 84, { color: '#2A9D8F' }); upDown(0, 110, true, '#2A9D8F', .5); });
  text('(estimate, varies by lender)', 1400, 860, 28, { color: '#888', weight: 800, alpha: t > bo ? 1 : 0 });
};
TPL.debts = (t, p, d, P) => {
  plain('#FFF8E7'); const pay = SW(/pay/i);
  ctx.save(); ctx.translate(560, 470); const eat = ease(prog(p, .1, .45)); ctx.fillStyle = '#2A9D8F'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 280, -Math.PI / 2 + eat * 2.6, Math.PI * 1.5); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#E63946'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 280, -Math.PI / 2, -Math.PI / 2 + eat * 2.6); ctx.closePath(); ctx.fill(); ctx.restore();
  text('monthly income assessment', 560, 820, 38, { color: INK, weight: 800 });
  const L = [[/personal/i, 'PERSONAL LOAN'], [/car/i, 'CAR PAYMENT'], [/buy/i, 'BUY NOW PAY LATER']];
  L.forEach(([re, lab], i) => { const w = Math.min(SW(re), .4 + i * .5); popIn(prog(t, w - .1, w + .2), 1400, 230 + i * 200, () => { box(-330, -70, 660, 140, 26, '#fff', 7); text(lab, 0, 4, 44, { color: INK }); if (t > pay + i * .35) { ctx.save(); ctx.translate(420, 0); ctx.rotate(-.12); ctx.fillStyle = '#2A9D8F'; rrect(-100, -46, 200, 92, 16); ctx.fill(); text('PAID', 0, 4, 54, { color: '#fff' }); ctx.restore(); } }); });
};
TPL.payYourself = (t, p, d, P) => {
  plain('#EEF6F0'); box(160, 340, 420, 240, 30, '#fff', 8); text('PAYCHECK', 370, 410, 48, { color: INK }); text('$', 370, 500, 90, { color: '#2E7D32' });
  box(1180, 180, 560, 260, 30, '#2A9D8F', 8); text('SAVINGS', 1460, 270, 54, { color: '#fff' }); text('separate account', 1460, 350, 34, { color: '#DFF5EC', weight: 800 });
  box(1180, 560, 560, 260, 30, '#fff', 8); text('EVERYDAY', 1460, 650, 54, { color: INK }); text('spending', 1460, 730, 34, { color: '#888', weight: 800 });
  const ln = SW(/lands/i); if (t > ln) { for (let i = 0; i < 5; i++) { const k = ((t - ln) * .7 + i / 5) % 1, up = i % 3 !== 0; const x = lerp(600, 1160, k), y = lerp(460, up ? 310 : 690, k) - Math.sin(k * Math.PI) * 60; coin(x, y, 26); } }
  popIn(prog(p, .05, .2), 370, 700, () => pill(0, 0, 'PAY YOURSELF FIRST', '#6C63FF', 36));
};
TPL.depositSlow = (t, p, d, P) => {
  sky(); grass();
  const yrs = Math.min(10, Math.floor(prog(p, .3, .8) * 10) + 1); box(150, 120, 300, 200, 26, '#fff', 8); ctx.fillStyle = '#E63946'; rrect(150, 120, 300, 60, 26); ctx.fill(); ctx.fillRect(150, 150, 300, 30); text('YEAR', 300, 150, 30, { color: '#fff' }); text(String(yrs), 300, 260, 100, { color: INK });
  const mv = SW(/moved/i), hx = t > mv ? lerp(1100, 1700, ease(prog(t, mv, mv + 2))) : 1100;
  house(hx, GY - 40, 1.2, '#FFB703'); for (const wx of [-90, 90]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(hx + wx, GY - 20, 30, 0, 7); ctx.fill(); }
  person(520, 1.1, { seed: 11, mouth: t > mv ? 'o' : 'flat', look: [1, 0], pose: t > mv ? { armL: [-.3, -.2], armR: [1.4, 1.6] } : {} });
  box(260, 640, 70, 220, 10, '#ddd', 5); box(260, 860 - 220 * clamp(prog(p, .3, .8) * .8), 70, 220 * clamp(prog(p, .3, .8) * .8), 10, '#2A9D8F', 5); text('20%', 295, 610, 36, { color: INK });
};
TPL.depositTimeline = (t, p, d, P) => {
  plain('#F1F3F8'); const k = ease(prog(p, .05, .6));
  text('20% deposit', 330, 360, 48, { color: INK }); box(560, 320, 1200 * k, 90, 20, '#E63946', 6); if (k > .9) text('7-10 years', 560 + 1200 * k - 160, 366, 40, { color: '#fff' });
  text('5% deposit', 330, 600, 48, { color: INK }); box(560, 560, 300 * k, 90, 20, '#2A9D8F', 6); if (k > .9) text('much sooner', 1020, 606, 40, { color: '#2A9D8F' });
  popIn(prog(p, .55, .8), 960, 800, () => pill(0, 0, 'GOVERNMENT ASSISTANCE + HOMEBUYER SCHEMES', '#3D5A80', 36));
};
TPL.govScheme = (t, p, d, P) => {
  sky(); grass(); box(260, 330, 640, 530, 8, '#F1F3F8', 8); for (let i = 0; i < 5; i++) box(300 + i * 120, 450, 64, 410, 6, '#E3E8F2', 5); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(230, 335); ctx.lineTo(580, 190); ctx.lineTo(930, 335); ctx.fill(); text('GOV', 580, 290, 54, { color: '#fff' });
  const L = [[/guarantee/i, 'FIRST HOME GUARANTEE', '#3D5A80'], [/5/, '5% DEPOSIT', '#2A9D8F'], [/insurance|lenders/i, 'NO LMI', '#E63946']];
  L.forEach(([re, lab, col], i) => { const w = Math.min(SW(re), .4 + i * .5); popIn(prog(t, w - .1, w + .2), 1400, 260 + i * 200, () => pill(0, 0, lab, col, 50)); });
  text('LMI = Lenders Mortgage Insurance', 1400, 860, 30, { color: '#555', weight: 800, alpha: prog(p, .7, .8) });
};
TPL.taxAccount = (t, p, d, P) => {
  plain('#F1F3F8'); inkPath([[200, 820], [1250, 820]], { w: 6 }); inkPath([[200, 820], [200, 200]], { w: 6 });
  const k = ease(prog(p, .15, .85)); growLine(200, 820, 1050, 600, k, x => x * .62, '#9AA0B5'); growLine(200, 820, 1050, 600, k, x => x * .8, '#2A9D8F');
  text('pre-tax savings', 1060, 270, 38, { color: '#2A9D8F', alpha: k }); text('standard savings', 1080, 420, 34, { color: '#7A8096', alpha: k });
  const th = SW(/30/); if (t > th - .2) popIn(prog(t, th - .2, th + .2), 1600, 400, () => { box(-260, -150, 520, 300, 36, '#fff', 8); text('up to', 0, -70, 40, { color: '#777' }); text('30% faster', 0, 20, 80, { color: '#2A9D8F' }); }); 
  const au = SW(/australia/i); if (t > au - .2) popIn(prog(t, au - .2, au + .2), 1600, 160, () => pill(0, 0, 'e.g. FHSS (Australia)', '#3D5A80', 34));
};
TPL.splitDream = (t, p, d, P) => {
  ctx.fillStyle = '#E3F2FD'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#FFF3E0'; ctx.fillRect(W / 2, 0, W / 2, H); grass();
  townhouse(480, GY, 1.1); text('Starter Home (Year 1)', 480, 140, 50, { color: INK }); bigHouse(1440, GY, 1); text('Dream Home (Year 10)', 1440, 140, 50, { color: INK }); inkPath([[W / 2, 0], [W / 2, H]], { w: 10, color: '#fff' });
  if (P.mode === 'stuck') { inkPath([[700, GY + 40], [700, GY - 260]], { w: 8, color: '#E63946', dash: [16, 12] }); text('START', 700, GY - 290, 34, { color: '#E63946' }); person(620, .8, { seed: 11, mouth: 'sad', look: [1, -.5] }); }
};
TPL.starter = (t, p, d, P) => {
  sky(); grass(); townhouse(480, GY, 1.1);
  const eq = ease(prog(p, .3, .75)); box(860, 240, 80, 560, 20, '#ddd', 6); box(860, 800 - 560 * eq, 80, 560 * eq, 20, '#2A9D8F', 6); text('EQUITY', 900, 200, 40, { color: '#2A9D8F' }); text('year ' + Math.max(1, Math.min(5, Math.round(1 + eq * 4))), 900, 850, 34, { color: INK, weight: 800 });
  const nx = SW(/next/i); if (t > nx - .3) { arrow(1000, 520, 1180, 520, '#2A9D8F', 16); popIn(prog(t, nx - .3, nx + .2), 1530, GY, () => bigHouse(0, 0, .8)); }
  const L = [[/townhouses/i, 'TOWNHOUSES & APARTMENTS'], [/growth/i, 'GROWTH CORRIDORS']]; L.forEach(([re, lab], i) => { const w = Math.min(SW(re), .4 + i * .5); popIn(prog(t, w - .1, w + .2), 480, 160 + i * 100, () => pill(0, 0, lab, '#3D5A80', 32)); });
};
TPL.rentvest = (t, p, d, P) => {
  ctx.fillStyle = '#E3F2FD'; ctx.fillRect(0, 0, W / 2, H); ctx.fillStyle = '#EEF6F0'; ctx.fillRect(W / 2, 0, W / 2, H); grass();
  [[60, 150, 520], [230, 140, 640], [390, 160, 480], [570, 150, 600], [740, 140, 520]].forEach(([x, w, h]) => tower(x, GY, w, h, '#5C6784')); person(470, .8, { seed: 11, mouth: 'smile', gy: GY + 40 });
  pill(480, 140, 'RENT WHERE YOU LOVE', '#3D5A80', 40); inkPath([[W / 2, 0], [W / 2, H]], { w: 10, color: '#fff' });
  const iv = SW(/investment/i); if (t > iv - .3) { popIn(prog(t, iv - .3, iv + .2), 1300, GY, () => house(0, 0, 1.1, '#7BC96F')); pill(1440, 140, 'BUY WHERE IT GROWS', '#2A9D8F', 40); }
  const tn = SW(/tenant/i); if (t > tn - .2) { person(1520, .8, { scarf: false, seed: 41, mouth: 'smile' }); text('tenant', 1520, GY + 40, 32, { color: INK, weight: 800 }); const k = ease(prog(t, tn, tn + 2)); box(1700, 300, 60, 400, 16, '#ddd', 5); box(1700, 300 + 400 * (1 - (1 - k * .4)), 60, 400 * (1 - k * .4), 16, '#E63946', 5); text('mortgage', 1730, 740, 30, { color: '#E63946' }); }
  const vl = SW(/value/i); if (t > vl - .2) { upDown(1200, 360, true, '#2A9D8F', .7); text('value', 1200, 250, 34, { color: '#2A9D8F' }); }
};
TPL.zeroBank = (t, p, d, P) => {
  warmRoom(); host(1500, 1.2, { mood: 'flat' }); phone(420, 160, 460, 700); text('Balance', 650, 330, 44, { color: '#777' });
  const z = SW(/\$?0|zero/i); const bal = t > z - .3 ? 0 : Math.round(lerp(42000, 600, ease(prog(t, 0, Math.max(.5, z - .3)))));
  text('$' + bal.toLocaleString('en-US'), 650, 450, 80, { color: bal === 0 ? '#E63946' : '#2E7D32', font: "'DejaVu Sans Mono'", weight: 700 });
  text('settlement day', 650, 560, 36, { color: INK, weight: 800 }); if (bal === 0) cross(650, 700, 1.2);
};
TPL.buffer = (t, p, d, P) => {
  plain('#FFF8E7'); const L = [[/council/i, 'COUNCIL RATES'], [/insurance/i, 'BUILDING INSURANCE'], [/repairs/i, 'REPAIRS'], [/interest/i, 'RATE CHANGES']];
  L.forEach(([re, lab], i) => { const w = Math.min(SW(re), .4 + i * .5); popIn(prog(t, w - .1, w + .2), 330 + (i % 2) * 520, 260 + Math.floor(i / 2) * 220, () => { box(-230, -80, 460, 160, 26, '#fff', 7); text(lab, 0, 4, 38, { color: '#E63946' }); }); });
  const bf = SW(/buffer/i); if (t > bf - .4) popIn(prog(t, bf - .4, bf + .1), 1450, 470, () => { ctx.fillStyle = '#2A9D8F'; ctx.beginPath(); ctx.moveTo(0, -300); ctx.lineTo(260, -210); ctx.quadraticCurveTo(260, 150, 0, 300); ctx.quadraticCurveTo(-260, 150, -260, -210); ctx.closePath(); ctx.fill(); text('3-6', 0, -60, 120, { color: '#fff' }); text('MONTH', 0, 40, 60, { color: '#fff' }); text('BUFFER', 0, 110, 60, { color: '#fff' }); });
  const ky = SW(/keys/i); if (t > ky - .3) keys(560, 780, .7);
};
TPL.recap = (t, p, d, P) => {
  plain('#2B2D42'); const L = [[/^one/i, 'Max borrowing power: clear credit limits & consumer debt'], [/^two/i, 'Target a 5% deposit: government support & tax-advantaged accounts'], [/^three/i, 'Starter property or rentvest: get on the ladder'], [/^four/i, 'Keep an emergency buffer: stay secure']];
  L.forEach(([re, lab], i) => { const w = SW(re); const k = prog(t, w - .3, w + .1); popIn(Math.max(k, .0001) > 0 && k > 0 ? k : 0, 960, 200 + i * 175, () => { box(-800, -70, 1600, 140, 30, '#F1F3F8', 7); ctx.fillStyle = ['#E63946', '#2A9D8F', '#6C63FF', '#FF8C42'][i]; ctx.beginPath(); ctx.arc(-720, 0, 46, 0, 7); ctx.fill(); text(String(i + 1), -720, 4, 54, { color: '#fff' }); text(lab, -10, 4, 36, { color: INK, weight: 800 }); if (t > w + .8) check(735, 0, .8); }); });
};
TPL.ctaYT = (t, p, d, P) => {
  warmRoom(); host(1680, 1.1, { mood: 'smile' });
  const lk = SW(/like/i), sb = SW(/subscribe/i), cm = SW(/comment/i);
  popIn(prog(t, lk - .2, lk + .2), 330, 420, () => { box(-200, -200, 400, 400, 60, '#fff', 8); ctx.fillStyle = '#4FA3E0'; rrect(-90, -20, 180, 150, 30); ctx.fill(); rrect(-40, -130, 80, 140, 30); ctx.fill(); text('LIKE', 0, 170, 40, { color: INK }); });
  popIn(prog(t, sb - .2, sb + .2), 820, 420, () => { box(-240, -90, 480, 180, 40, '#E63946', 8); text('SUBSCRIBE', 0, 4, 60, { color: '#fff' }); });
  popIn(prog(t, cm - .2, cm + .2), 1270, 420, () => { box(-160, -130, 320, 220, 40, '#fff', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-60, 88); ctx.lineTo(-100, 150); ctx.lineTo(0, 88); ctx.fill(); text('Step ?', 0, -10, 56, { color: '#6C63FF' }); });
};
TPL.endscreen = (t, p, d, P) => {
  plain('#2B2D42'); text('Thanks for watching!', 960, 140, 80, { color: '#FFB703', alpha: prog(t, 0, .6) });
  for (let i = 0; i < 2; i++) { box(180 + i * 860, 260, 700, 394, 26, '#3A3D5C', 6); text('next video', 530 + i * 860, 457, 40, { color: '#8A8FA3', weight: 800 }); }
  ctx.fillStyle = '#E63946'; ctx.beginPath(); ctx.arc(960, 800, 0, 0, 7); ctx.fill();
  text('General information only, not financial advice. Government schemes, eligibility and', 960, 760, 30, { color: '#C9D1D9', weight: 800 });
  text('lending rules vary by country and change over time. Check current rules or speak to a licensed adviser.', 960, 808, 30, { color: '#C9D1D9', weight: 800 });
  const f = prog(t, d - 1, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
