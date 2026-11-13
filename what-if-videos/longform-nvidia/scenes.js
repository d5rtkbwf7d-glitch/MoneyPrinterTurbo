// ================= NVIDIA / WASHINGTON LONG-FORM (flat cartoon, 1920x1080) =================
const TEAL = '#2A9D8F', NAVY = '#1D2440', NV = '#76B900';
PAL[61] = { top: '#3D5A80', pants: '#2B2D42', skin: '#F2C9A0', hair: '#1B1B1B' };   // generic "CEO" figure
PAL[62] = { top: '#E9ECF2', pants: '#3A3A55', skin: '#F2C9A0', hair: '#1B1B1B' };   // generic kid / cook
PAL[63] = { top: '#6C757D', pants: '#495057', skin: '#C68B59', hair: '#1B1B1B' };   // generic official
const at = (re, fb) => { const s = SW(re); return s > 1e8 ? fb : s; };
const pop = (t, a) => prog(t, a - .25, a + .15);
function ceo(x, y, s, o = {}) { return figure(x, y, s, { scarf: false, seed: 61, ...o }); }
function silhouette(x, y, s, q = true, a = 1) { ctx.save(); ctx.globalAlpha *= a;
  const r = 46 * s, hx = x, hy = y - 120 * s - r + 4 * s; ctx.fillStyle = '#5C6784';
  ctx.beginPath(); ctx.arc(hx, hy, r, 0, 7); ctx.fill(); rrect(x - 44 * s, y - 120 * s, 88 * s, 140 * s, 30 * s); ctx.fill();
  rrect(x - 52 * s, hy - r * .9, 104 * s, r * 2.6, 40 * s); ctx.fill(); // hair
  ctx.restore(); if (q) text('?', hx, hy + 6 * s, 70 * s, { color: '#fff', alpha: a }); }
function card(x, y, w, h, title, col = INK, lines = [], k = 1) { if (k <= 0) return; popIn(k, x + w / 2, y + h / 2, () => {
  box(-w / 2, -h / 2, w, h, 22, '#fff', 7); ctx.save(); ctx.fillStyle = col; rrect(-w / 2, -h / 2, w, 74, 22); ctx.fill(); ctx.fillRect(-w / 2, -h / 2 + 40, w, 34); ctx.restore();
  text(title, 0, -h / 2 + 40, Math.min(38, (w - 40) / Math.max(1, title.length) * 1.75), { color: '#fff' });
  lines.forEach((l, i) => text(l, 0, -h / 2 + 130 + i * 56, Math.min(40, (w - 50) / Math.max(1, l.length) * 1.85), { color: INK, weight: 800 })); }); }
function capitol(x, y, s, col = '#F1F3F8') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  box(-260, -150, 520, 150, 6, col, 7); for (let i = 0; i < 8; i++) { ctx.fillStyle = '#C9D0DC'; ctx.fillRect(-230 + i * 62, -140, 22, 130); }
  box(-300, -180, 600, 34, 6, col, 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -186, 138, Math.PI, 0); ctx.fill(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -186, 130, Math.PI, 0); ctx.fill();
  box(-14, -360, 28, 50, 6, col, 6); ctx.fillStyle = 'rgba(0,0,0,.08)'; ctx.beginPath(); ctx.arc(0, -186, 130, Math.PI, Math.PI * 1.5); ctx.lineTo(0, -186); ctx.fill(); ctx.restore(); }
function envelope(x, y, s, col = '#FFF3B0', seal = RED) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-110, -70, 220, 140, 10, col, 7); mk([[-110, -70], [0, 10], [110, -70]], INK, 7); dot(0, 10, 18, seal); ctx.restore(); }
function truck(x, y, s, col = '#E9ECF2', cargo = true) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  box(-220, -170, 300, 150, 10, col, 7); box(90, -130, 120, 110, 16, '#FFB703', 7); ctx.fillStyle = '#BDE0FE'; rrect(130, -115, 60, 45, 8); ctx.fill();
  for (const wx of [-150, 0, 150]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(wx, -14, 32, 0, 7); ctx.fill(); ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.arc(wx, -14, 12, 0, 7); ctx.fill(); }
  if (cargo) { chipIcon(-70, -95, .38, '#3D5A80'); } ctx.restore(); }
function crate(x, y, s) { box(x - 50 * s, y - 80 * s, 100 * s, 80 * s, 8, '#C9A27E', 6); mk([[x - 50 * s, y - 80 * s], [x + 50 * s, y]], '#8D6E63', 5 * s); mk([[x + 50 * s, y - 80 * s], [x - 50 * s, y]], '#8D6E63', 5 * s); }
function laptop(x, y, s, scr = '#BDE0FE') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-120, -160, 240, 150, 12, scr, 7); box(-150, -10, 300, 24, 8, '#ADB5BD', 6); ctx.restore(); }
function mag(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(60, 60); ctx.lineTo(140, 140); ctx.stroke(); ctx.fillStyle = 'rgba(190,230,255,.55)'; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.fill(); ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(0, 0, 90, 0, 7); ctx.stroke(); ctx.restore(); }
function bigQ(x, y, s, col = RED, a = 1) { text('?', x, y + Math.sin(T * 3 + x) * 8, 160 * s, { color: col, stroke: INK, sw: 8 * s, alpha: a }); }
function calPage(x, y, s, day, hi, k = 1) { popIn(k, x, y, () => { ctx.save(); ctx.scale(s, s); box(-130, -150, 260, 300, 22, '#fff', 7); ctx.fillStyle = hi ? RED : '#8A8FA3'; rrect(-130, -150, 260, 80, 22); ctx.fill(); ctx.fillRect(-130, -100, 260, 30); text('NOV', 0, -108, 44, { color: '#fff' }); text(String(day), 0, 40, 130, { color: hi ? INK : '#8A8FA3' }); ctx.restore(); }); }
function disclaimerStrip(a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(29,36,64,.92)'; rrect(360, 36, 1200, 64, 18); ctx.fill(); ctx.restore(); text('Based on public reporting. Allegations are unproven and disputed.', 960, 70, 32, { color: '#fff', alpha: a, weight: 700 }); }
function seesaw(x, y, tilt, L, R, colL = TEAL, colR = BLUE) {
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x, y - 30); ctx.lineTo(x - 70, y + 110); ctx.lineTo(x + 70, y + 110); ctx.fill(); ctx.fillStyle = '#ADB5BD'; ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.lineTo(x - 56, y + 100); ctx.lineTo(x + 56, y + 100); ctx.fill();
  ctx.save(); ctx.translate(x, y - 30); ctx.rotate(tilt); box(-560, -14, 1120, 28, 10, '#8D6E63', 6);
  for (const [sx, lab, col] of [[-1, L, colL], [1, R, colR]]) { ctx.save(); ctx.translate(sx * 430, -14); ctx.rotate(-tilt); box(-190, -150, 380, 150, 20, col, 7); text(lab[0], 0, -100, 40, { color: '#fff' }); if (lab[1]) text(lab[1], 0, -48, 40, { color: '#fff' }); ctx.restore(); }
  ctx.restore(); }
function cook(x, y, s, ph, col) { const F = figure(x, y, s, { scarf: false, seed: 62, pose: { armL: [-.35, -.15], armR: [1.3, 1.6] } }); ctx.fillStyle = '#fff'; rrect(F.head[0] - F.r * .8, F.head[1] - F.r * 2.1, F.r * 1.6, F.r * 1.3, F.r * .4); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3 * s; ctx.stroke();
  const [hx, hy] = F.hands[1]; ctx.fillStyle = INK; ctx.fillRect(hx, hy - 6 * s, 70 * s, 12 * s); const j = Math.abs(Math.sin(ph)) * 70 * s; ctx.fillStyle = '#E9B872'; ctx.beginPath(); ctx.ellipse(hx + 50 * s, hy - 14 * s - j, 26 * s, 9 * s, Math.sin(ph * 2) * .8, 0, 7); ctx.fill(); }
function chartUp(x, y, w, h, k, col = NV) { mk([[x, y], [x, y + h], [x + w, y + h]], INK, 7); const pts = []; for (let i = 0; i <= 40 * k; i++) { const f = i / 40; pts.push([x + f * w, y + h - (Math.pow(f, 3.2) * .9 + .04 + Math.sin(f * 20) * .015) * h]); } if (pts.length > 1) mk(pts, col, 14); if (pts.length) dot(...pts[pts.length - 1], 14, col); }
function crowdQueue(x, y, n, s) { for (let i = 0; i < n; i++) figure(x + i * 120 * s, y + Math.abs(Math.sin(T * 4 + i)) * -6, s, { scarf: false, seed: [21, 31, 41, 51][i % 4], look: [-1, 0], pose: { armL: [-.3, -.2], armR: [-2.4, -2.8] } }); }

const BGP = { hookQ: ['#FFE5EC', '#FFF5F8'], coldOpen: ['#E8F0FF', '#D6E2F7'], ceoBio: ['#FFF1D6', '#FDE2C4'], cooks: ['#FFF1D6', '#FDE2C4'], stockRise: ['#E9F7E1', '#D3EDC6'], exportBan: ['#E8F0FF', '#D6E2F7'], policySwing: ['#F1F3F8', '#E3E8F2'], scale: ['#F1F3F8', '#E3E8F2'], workaround: ['#E8F6FF', '#D6ECFB'], megaspeed: ['#F1F3F8', '#E3E8F2'], warnings: ['#FFF3E0', '#FFE0B2'], senators: ['#EDE7F6', '#D9CFF0'], calendar: ['#FFF8E7', '#F7EBCB'], chips7: ['#FFF8E7', '#F7EBCB'], resignation: ['#F1F3F8', '#E3E8F2'], intelSplit: ['#EDE7F6', '#D9CFF0'], twoQuestions: ['#FFE5EC', '#FFF5F8'], cta: ['#FFF1D6', '#FDE2C4'], endcard: ['#FFF1D6', '#FDE2C4'] };
function flatBg(scene) {
  if (scene === 'chapter') { ctx.fillStyle = NAVY; ctx.fillRect(0, 0, W, H); return; }
  const pal = BGP[scene] || ['#F1F3F8', '#E3E8F2'], g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, pal[0]); g.addColorStop(1, pal[1]); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0,0,0,.05)'; ctx.fillRect(0, GY, W, H - GY);
}

// ---------- scenes ----------
TPL.chapter = (t, p, d, P) => {
  const k = easeOut(prog(t, 0, .5)), out = prog(t, d - .35, d);
  ctx.save(); ctx.globalAlpha = 1 - out;
  ctx.fillStyle = NV; ctx.fillRect(960 - 420 * k, 600, 840 * k, 10);
  text('CHAPTER ' + P.num, 960, 400 - (1 - k) * 40, 54, { color: '#FFC83A', alpha: k });
  text(P.title, 960, 510, Math.min(110, 1700 / P.title.length * 1.7), { color: '#fff', alpha: prog(t, .2, .7) });
  chipIcon(960, 760, .45 * easeBack(prog(t, .3, .8)), '#3D5A80'); ctx.restore();
};
TPL.hookQ = (t, p, d, P) => {
  if (P.mode === 'gossip') {
    // gossiping crowd + two rumour bubbles; generic figures only
    for (const [x, sd, i] of [[380, 1, 21], [620, -1, 31], [1300, 1, 41], [1540, -1, 51]]) figure(x, GY - 124 * .95, .95, { scarf: false, seed: i, look: [sd, 0], mouth: BOIL % 2 ? 'o' : 'smile' });
    popIn(pop(t, at(/affair/i, .8)), 500, 330, () => bubble2(0, 0, 420, 110, 'An affair?', 1));
    popIn(pop(t, at(/spy/i, 2.2)), 1420, 330, () => bubble2(0, 0, 360, 110, 'A spy?!', -1));
    popIn(prog(t, .3, .8), 960, 520, () => { chipIcon(0, 0, .9, '#3D5A80'); });
    disclaimerStrip(prog(t, .2, .6));
  } else {
    const qs = [[/warned/i, 'WHO GOT WARNED?', 1.0, (x, y) => envelope(x, y, .8)], [/know/i, 'WHEN DID THEY KNOW?', 2.5, (x, y) => { mc(x, y, 70, INK, 9, { fill: '#fff' }); mk([[x, y], [x, y - 46]], INK, 9); mk([[x, y], [x + 36 + Math.sin(T) * 4, y + 10]], INK, 9); }], [/chips/i, 'WHY DID THE CHIPS KEEP MOVING?', 4.5, (x, y) => truck(x + 30 + ((T * 60) % 40), y + 70, .55)]];
    capitol(960, GY, .55); text('WASHINGTON', 960, GY + 40, 34, { color: INK });
    qs.forEach(([re, s, fb, ic], i) => { const x = 360 + i * 600, k = pop(t, at(re, fb)); popIn(k, x, 330, () => { box(-270, -190, 540, 330, 26, '#fff', 7); ic(0, -60); const ln = s.length > 22 ? [s.slice(0, s.indexOf(' KEEP')), s.slice(s.indexOf(' KEEP') + 1)] : [s]; ln.forEach((l, j) => text(l, 0, 90 + j * 48 - (ln.length - 1) * 24, 42, { color: RED })); }); });
  }
};
TPL.coldOpen = (t, p, d, P) => {
  if (P.mode === 'message') {
    ceo(420, GY - 124, 1.05, { look: [1, 0], mouth: 'flat', pose: { armL: [-.35, -.15], armR: [1.2, 1.5] } }); label('NVIDIA FOUNDER & CEO', 420, 220, 34, INK);
    laptop(720, GY - 210, .9);
    const k = pop(t, at(/told/i, 3.5)); popIn(k, 1260, 400, () => { box(-360, -230, 720, 420, 24, '#fff', 7); ctx.fillStyle = '#3D5A80'; rrect(-360, -230, 720, 70, 24); ctx.fill(); ctx.fillRect(-360, -190, 720, 30); text('TO: ALL EMPLOYEES', 0, -192, 34, { color: '#fff' });
      text('"I was unfaithful', 0, -80, 50, { color: INK }); text('to my wife."', 0, -20, 50, { color: INK }); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#DDE2EA'; rrect(-300, 50 + i * 40, 600 - i * 120, 20, 10); ctx.fill(); } text('(paraphrased)', 0, 172, 28, { color: '#8A8FA3', weight: 700 }); });
    const k2 = pop(t, at(/name/i, 7.5)); if (k2 > 0) { popIn(k2, 1660, 820, () => { silhouette(0, 0, 1.2); }); }
  } else if (P.mode === 'report') {
    popIn(pop(t, at(/Times/i, .4)), 560, 450, () => { box(-380, -300, 760, 560, 16, '#FBF8F1', 7); text('NEWS REPORT', 0, -240, 52, { color: INK, font: "'DejaVu Serif'" }); mk([[-340, -200], [340, -200]], INK, 5);
      silhouette(-200, 80, .95, false); text('IDENTIFIED:', 110, -110, 40, { color: RED }); text('Alice Huang', 110, -50, 54, { color: INK }); for (let i = 0; i < 5; i++) { ctx.fillStyle = '#DDE2EA'; rrect(-30, 10 + i * 42, 300 - (i % 2) * 80, 20, 10); ctx.fill(); } });
    card(1080, 180, 640, 200, 'CHINESE BUSINESSWOMAN', '#3D5A80', ['Former executive at Megaspeed'], pop(t, at(/businesswoman/i, 5)));
    card(1080, 430, 640, 200, 'MEGASPEED (SINGAPORE)', TEAL, ['Bought Nvidia chips'], pop(t, at(/Megaspeed/i, 7)));
    popIn(pop(t, at(/relation/i, 10.5)), 1400, 760, () => pillM(0, 0, 'NO RELATION TO JENSEN', RED, 44));
  } else {
    const k = prog(t, 0, at(/later/i, 1.5) + .5); calPage(330, 420, 1, 8, false, k); calPage(560, 420, 1, 12, true, pop(t, at(/later/i, 1.5)));
    mk([[420, 600], [470, 600]], INK, 6); text('4 DAYS', 445, 680, 48, { color: RED });
    if (t > at(/CEO/i, 3)) { const kk = prog(t, at(/CEO/i, 3), at(/CEO/i, 3) + .6); ceo(330 - kk * 200, GY - 124, .8, { look: [-1, 0], mouth: 'sad', pose: walk(T * 6, kk < 1 ? 1 : 0) }); }
    const kw = pop(t, at(/Washington/i, 7)); if (kw > 0) { popIn(kw, 1300, GY, () => capitol(0, 0, .95)); bigQ(1040, 300, 1, RED, kw); bigQ(1570, 260, .8, RED, kw); popIn(prog(t, at(/when/i, 9) - .2, at(/when/i, 9) + .2), 1300, 160, () => pillM(0, 0, 'WHAT DID THEY KNOW, AND WHEN?', INK, 44)); }
  }
};
TPL.ceoBio = (t, p, d, P) => {
  if (P.step === 0) {
    const stops = [[/Taiwan/i, 'TAIWAN', 300, '#FFB703', .8], [/United/i, 'UNITED STATES', 700, BLUE, 3], [/Kentucky/i, 'KENTUCKY SCHOOL', 1100, TEAL, 5.5], [/Denny/i, 'DINER JOB', 1600, RED, 9]];
    mk([[260, 560], [1620, 560]], '#B8A27E', 10, { dash: [24, 20] });
    let cur = 0; stops.forEach(([re, lab, x, col, fb], i) => { const a = at(re, fb), k = pop(t, a); if (t > a - .2) cur = i; popIn(k, x, 560, () => { dot(0, 0, 34, INK); dot(0, 0, 26, col); }); if (k > 0) text(lab, x, 640, Math.min(36, 420 / lab.length * 1.9), { color: INK, alpha: clamp(k * 2) }); });
    const tx = stops[cur][2] + (stops[Math.min(3, cur + 1)][2] - stops[cur][2]) * 0, kid = figure(tx, 430, .55 + .1 * cur, { scarf: false, seed: 62, mouth: 'smile', pose: walk(T * 6, .5) });
    if (cur === 3) { box(1180, 330, 240, 90, 16, '#fff', 6); for (let i = 0; i < 3; i++) dot(1220 + i * 80, 375, 28, '#E9ECF2'); text('waiting tables, washing dishes', 1300, 290, 34, { color: INK }); }
    if (cur === 2) { box(1060, 170, 180, 140, 10, '#C9A27E', 6); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(1040, 175); ctx.lineTo(1150, 100); ctx.lineTo(1260, 175); ctx.fill(); text('SCHOOL', 1150, 250, 30, { color: '#fff' }); }
  } else {
    const k93 = pop(t, at(/1993/, .5)); popIn(k93, 560, 520, () => { box(-330, 40, 660, 60, 14, '#C0392B', 7); box(-330, -180, 80, 220, 14, '#C0392B', 7); box(250, -180, 80, 220, 14, '#C0392B', 7); box(-220, -20, 440, 30, 8, '#ECEFF4', 6);
      figure(-120, 40, .6, { scarf: false, seed: 61 }); figure(0, 40, .6, { scarf: false, seed: 21 }); figure(120, 40, .6, { scarf: false, seed: 31 }); text('A DINER BOOTH, 1993', 0, 190, 40, { color: INK }); });
    popIn(pop(t, at(/Nvidia/i, 3.5)), 560, 200, () => pillM(0, 0, 'NVIDIA IS BORN', NV, 48));
    const k97 = pop(t, at(/1997/, 7.5)); if (k97 > 0) { popIn(k97, 1400, 430, () => { box(-330, -260, 660, 480, 24, '#fff', 7); text('1997', 0, -190, 64, { color: RED }); box(-250, -90, 500, 90, 18, '#E9ECF2', 6); const f = .12 + .05 * Math.sin(T * 6); ctx.fillStyle = RED; rrect(-244, -84, 488 * f, 78, 14); ctx.fill(); text('CASH LEFT', 0, -45, 34, { color: INK }); text('~1 MONTH', 0, 70, 70, { color: INK }); text('from going out of business', 0, 150, 34, { color: '#5C6784' }); }); }
  }
};
TPL.cooks = (t, p, d, P) => {
  if (P.mode !== 'ai') {
    const k1 = pop(t, at(/normal/i, .8)), k2 = pop(t, at(/Nvidia/i, 6.5));
    popIn(k1, 500, 480, () => { box(-360, -320, 720, 560, 26, '#fff', 7); text('NORMAL PROCESSOR', 0, -270, 40, { color: BLUE }); cook(-40, 30, .9, T * 3, 0); text('one brilliant chef, one dish at a time', 0, 215, 30, { color: INK }); });
    popIn(k2, 1420, 480, () => { box(-400, -320, 800, 560, 26, '#fff', 7); text("NVIDIA'S CHIPS (GPU)", 0, -270, 40, { color: NV }); for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) cook(-320 + c * 120, -130 + r * 125, .28, T * 5 + r + c * .7); text('thousands of cooks, all at once', 0, 215, 30, { color: INK }); });
  } else {
    popIn(pop(t, at(/video/i, .6)), 420, 470, () => { box(-260, -110, 520, 220, 90, '#5C6784', 7); dot(-150, 0, 34, '#fff'); dot(150, -30, 22, RED); dot(190, 20, 22, '#FFB703'); dot(110, 20, 22, TEAL); text('VIDEO GAMES', 0, 190, 44, { color: INK }); });
    popIn(pop(t, at(/artificial/i, 3)), 1080, 470, () => { box(-230, -200, 460, 360, 30, '#fff', 7); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; mk([[0, 0], [Math.cos(a) * 140, Math.sin(a) * 120]], '#BDE0FE', 6); dot(Math.cos(a) * 140, Math.sin(a) * 120, 14, BLUE); } dot(0, 0, 40, NV); text('AI', 0, 4, 40, { color: '#fff' }); text('ARTIFICIAL INTELLIGENCE', 0, 220, 38, { color: INK }); });
    const kb = pop(t, at(/billions/i, 6.5)); if (kb > 0) { popIn(kb, 1600, 470, () => { box(-200, -150, 400, 300, 26, '#FFF3B0', 7); text('× ' + Math.floor(1e9 * (.8 + .2 * Math.sin(T))).toLocaleString(), 0, -10, 40, { color: INK, font: "'DejaVu Sans Mono'", weight: 700 }); text('same math,', 0, 70, 34, { color: INK }); text('over and over', 0, 110, 34, { color: INK }); }); }
  }
};
TPL.stockRise = (t, p, d, P) => {
  chartUp(180, 200, 820, 560, prog(t, .3, d * .7)); text('VALUE', 140, 180, 34, { color: INK, align: 'left' });
  popIn(pop(t, at(/valuable/i, 6)), 700, 260, () => pillM(0, 0, 'ONE OF THE MOST VALUABLE ON EARTH', NV, 40));
  chipIcon(1460, 400, .9, '#3D5A80'); text('MOST WANTED HARDWARE', 1460, 210, 40, { color: INK });
  const k = prog(t, at(/everyone/i, 2) - .2, at(/everyone/i, 2) + 1.4); crowdQueue(1160, GY - 124 * .6, Math.round(1 + 4 * k), .6);
};
TPL.exportBan = (t, p, d, P) => {
  if (P.mode !== 'share') {
    const us = [300, 480], cn = [1620, 480];
    box(130, 340, 340, 260, 24, BLUE, 7); text('UNITED STATES', 300, 470, 42, { color: '#fff' });
    box(1450, 340, 340, 260, 24, RED, 7); text('CHINA', 1620, 470, 48, { color: '#fff' });
    const tb = at(/restricted/i, 5); const blocked = t > tb;
    for (let i = 0; i < 4; i++) { let f = ((T * .35 + i / 4) % 1); let x = lerp(500, 1420, f); if (blocked && x > 900) { x = 900 - (x - 900) * .3; } chipIcon(x, 470 + Math.sin(f * 9) * 10, .28, '#3D5A80'); }
    if (blocked) { const k = easeBack(prog(t, tb - .1, tb + .4)); box(940, 470 - 230 * k, 60, 460 * k, 10, '#ADB5BD', 7); lock(970, 470, .8 * k); }
    popIn(pop(t, at(/October/i, 1.5)), 960, 200, () => pillM(0, 0, 'OCTOBER 2022', INK, 50));
    if (t > at(/slow/i, 9)) { text('GOAL: slow China’s AI & military tech', 960, 760, 44, { color: INK, alpha: prog(t, at(/slow/i, 9), at(/slow/i, 9) + .5) }); }
  } else {
    const k = prog(t, .2, .8), pct = lerp(95, 1, ease(prog(t, at(/zero/i, 7.5) - .6, at(/zero/i, 7.5) + .2)));
    box(560, 220, 800, 120, 26, '#E9ECF2', 7); ctx.fillStyle = NV; rrect(566, 226, 788 * pct / 100 * clamp(k * 3), 108, 22); ctx.fill();
    text(Math.round(pct) + '%', 960, 470, 150, { color: pct < 10 ? RED : INK, alpha: clamp(k * 3) });
    text("NVIDIA'S SHARE OF CHINA'S AI CHIP MARKET", 960, 170, 40, { color: INK }); text('(as described by Jensen Huang)', 960, 600, 34, { color: '#5C6784' });
    label('a huge market', 960, 720, 40, BLUE);
  }
};
TPL.policySwing = (t, p, d, P) => {
  const ph = Math.floor(t / 1.6) % 2; box(220, 180, 180, 440, 30, INK, 7); dot(310, 290, 60, ph ? '#555' : RED); dot(310, 400, 60, '#555'); dot(310, 510, 60, ph ? TEAL : '#555');
  text(ph ? 'ALLOWED' : 'BLOCKED', 310, 700, 44, { color: ph ? TEAL : RED });
  for (let i = 0; i < 3; i++) { const r = Math.sin(T * 2 + i) * .1; ctx.save(); ctx.translate(640 + i * 30, 300 + i * 30); ctx.rotate(r); box(-110, -140, 220, 280, 10, '#fff', 6); text('RULES', 0, -90, 34, { color: INK }); for (let j = 0; j < 4; j++) { ctx.fillStyle = '#DDE2EA'; rrect(-80, -40 + j * 40, 160, 16, 8); ctx.fill(); } ctx.restore(); }
  const ka = pop(t, at(/loudest/i, 6)); if (ka > 0) { ceo(1320, GY - 124, 1, { look: [1, 0], mouth: talkingNow() && BOIL % 2 ? 'o' : 'smile', pose: { armL: [-.35, -.15], armR: [-2.2, -2.6] } }); mk([[1440, 470], [1440, 860]], INK, 8); dot(1440, 450, 24, '#5C6784');
    popIn(ka, 1440, 200, () => bubble2(0, 0, 820, 130, 'Bans push China to build its own', -1)); text('his argument, as reported', 1440, 300, 30, { color: '#5C6784', alpha: ka }); }
};
TPL.scale = (t, p, d, P) => {
  if (P.mode === 'tip') {
    const tilt = lerp(0, .12, ease(prog(t, at(/ahead/i, 8) - .5, at(/ahead/i, 8) + .8)));
    seesaw(960, 640, tilt, ['AI CHIP', 'BUSINESS'], ['SECURITY', 'WARNINGS'], NV, RED);
    bigQ(960, 250, 1.1, RED, prog(t, .5, 1.2)); if (t > at(/woman/i, 4)) text('not just one woman, or one CEO', 960, 820, 40, { color: INK, alpha: prog(t, at(/woman/i, 4), at(/woman/i, 4) + .5) });
  } else {
    const tilt = Math.sin(T * 1.3) * .08; seesaw(960, 640, tilt, ['SELL AMERICAN', 'AI TO THE WORLD'], ['KEEP THE BEST', 'FROM CHINA'], TEAL, BLUE);
    popIn(pop(t, at(/tension/i, 1)), 960, 200, () => pillM(0, 0, 'THE TENSION', INK, 50));
  }
};
TPL.workaround = (t, p, d, P) => {
  if (P.mode === 'smuggle') {
    box(160, 220, 300, 520, 18, '#8D6E63', 7); lock(310, 480, .8); text('LOCKED DOOR', 310, 800, 36, { color: INK });
    box(620, 260, 260, 200, 14, '#BDE0FE', 7); mk([[750, 260], [750, 460]], INK, 7); mk([[620, 360], [880, 360]], INK, 7); text('window', 750, 500, 34, { color: INK });
    const pts = [[880, 400], [1200, 250], [1500, 520], [1760, 380]]; mk(pts, '#B8A27E', 8, { dash: [22, 18] });
    ['COUNTRY A', 'COUNTRY B'].forEach((s, i) => text(s, pts[i + 1][0], pts[i + 1][1] - 70, 30, { color: '#5C6784' }));
    const f = (T * .25) % 1, seg = Math.min(2, Math.floor(f * 3)), lf = f * 3 - seg; crate(lerp(pts[seg][0], pts[seg + 1][0], lf), lerp(pts[seg][1], pts[seg + 1][1], lf) + 20, .8);
    const kc = pop(t, at(/charged/i, 7.5)); if (kc > 0) stamp('CAUGHT & CHARGED', 1360, 700, kc, RED, 70, -.08);
  } else {
    box(120, 260, 560, 520, 26, '#fff', 7); text('OUTSIDE CHINA', 400, 310, 40, { color: TEAL }); rack(200, 360, 160, 330); rack(420, 360, 160, 330);
    const kn = pop(t, at(/never/i, 11)); if (kn > 0) { popIn(kn, 400, 820, () => pillM(0, 0, 'THE CHIPS NEVER MOVE', TEAL, 40)); }
    cloudShape(960, 330, 360, 170, '#fff'); mk([[700, 500], [1220, 500]], '#B8A27E', 8, { dash: [20, 16] }); text('internet', 960, 340, 40, { color: BLUE });
    const kr = pop(t, at(/rent/i, 8)); for (let i = 0; i < 5 && kr > 0; i++) { const f = (T * .5 + i / 5) % 1; dot(lerp(700, 1220, f), 500 + Math.sin(f * 12) * 10, 12, NV); }
    box(1240, 260, 560, 520, 26, '#fff', 7); text('CHINA', 1520, 310, 44, { color: RED }); laptop(1520, 640, 1.1, kr > 0 ? '#C8F7C5' : '#BDE0FE'); if (kr > 0) text('AI work done here', 1520, 720, 34, { color: INK });
    popIn(pop(t, at(/focus/i, 3.5)), 960, 160, () => pillM(0, 0, 'RULES TRACK WHERE CHIPS ARE SHIPPED', INK, 40));
  }
};
TPL.megaspeed = (t, p, d, P) => {
  building(200, GY, 500, 560, '#5C6784', 'MEGASPEED'); text('SINGAPORE', 450, 190, 36, { color: '#5C6784' });
  const km = pop(t, at(/scrutiny/i, 4)); if (km > 0) { const x = 450 + Math.sin(T * 1.5) * 80, y = 520 + Math.cos(T * 1.2) * 60; mag(x, y, km); }
  card(860, 170, 880, 200, 'SUSPECTED', RED, ['diversion of restricted Nvidia chips to China'], pop(t, at(/diversion/i, 6)));
  card(860, 430, 880, 260, 'U.S. SENATORS CITED REPORTS', BLUE, ['Justice Department investigating', 'possible export-rule breaches'], pop(t, at(/senators/i, 9.5)));
  popIn(prog(t, at(/whether/i, 13), at(/whether/i, 13) + .4), 1300, 780, () => pillM(0, 0, 'NOT A CONVICTION', INK, 40));
};
TPL.warnings = (t, p, d, P) => {
  if (P.mode === 'memo') {
    capitol(1450, GY, .9);
    const k = prog(t, at(/warned/i, 3) - .3, at(/warned/i, 3) + 1.6); envelope(lerp(300, 1350, ease(k)), lerp(500, 380, ease(k)) - Math.sin(k * 3.14) * 160, .9);
    text('WARNING', lerp(300, 1350, ease(k)), lerp(500, 380, ease(k)) - Math.sin(k * 3.14) * 160 + 110, 34, { color: RED });
    popIn(pop(t, at(/before/i, 6.5)), 560, 760, () => pillM(0, 0, 'BEFORE IT WENT PUBLIC', RED, 44));
    text('reportedly', 520, 220, 50, { color: '#5C6784', alpha: prog(t, .3, .8) });
  } else if (P.mode === 'intel') {
    popIn(prog(t, .1, .6), 620, 470, () => { box(-330, -300, 660, 600, 14, '#E9C46A', 7); box(-330, -340, 260, 60, 12, '#E9C46A', 7); text('INTEL ASSESSMENT', 0, -230, 40, { color: INK }); silhouette(0, 120, .9); stamp('PER NYT', 180, 230, 1, RED, 40, -.12); });
    const k = pop(t, at(/passing/i, 3.2)); if (k > 0) { mk([[960, 470], [1250, 470]], INK, 10, { dash: [24, 18] }); arrow(1200, 470, 1290, 470, INK, 12); popIn(k, 1520, 470, () => { box(-200, -120, 400, 240, 24, RED, 7); text('BEIJING', 0, 10, 60, { color: '#fff' }); }); text('passing information? (reported)', 1300, 700, 40, { color: INK, alpha: k }); }
  } else {
    box(1500, 300, 30, 560, 6, '#8A8FA3', 5); ctx.save(); ctx.translate(1515, 300); ctx.rotate(.785); box(-110, -110, 220, 220, 18, '#FFB703', 7); ctx.restore(); text('!', 1515, 310, 120, { color: INK }); pillM(1515, 520, 'WARNING', RED, 36);
    for (let i = 0; i < 2; i++) { const x = ((T * 260 + i * 980) % 2400) - 300; truck(x, GY + 30, .9); }
    text('according to reports', 600, 200, 44, { color: '#5C6784', alpha: prog(t, .2, .7) });
  }
};
TPL.senators = (t, p, d, P) => {
  box(160, 560, 1600, 120, 16, '#8D6E63', 7); text('U.S. SENATE', 960, 625, 44, { color: '#fff' });
  for (let i = 0; i < 3; i++) { const x = 560 + i * 400; figure(x, 520 - 50, .7, { scarf: false, seed: 63 + 0 * i, look: [0, 0], mouth: talkingNow() && i === Math.floor(T / 1.5) % 3 && BOIL % 2 ? 'o' : 'flat' }); mk([[x + 60, 560], [x + 90, 470]], INK, 6); dot(x + 92, 462, 12, INK); }
  const qs = [[/Who received/i, 'Who received the warnings?', 4.5], [/decided/i, 'Who decided what to do?', 7], [/win/i, 'Did sales win over security?', 9.5]];
  qs.forEach(([re, s, fb], i) => popIn(pop(t, at(re, fb)), 360 + i * 600, 220, () => { box(-270, -80, 540, 160, 24, '#fff', 7); text(s, 0, 4, Math.min(40, 480 / s.length * 1.85), { color: INK }); }));
  popIn(prog(t, .2, .7), 960, 790, () => pillM(0, 0, 'WHAT DID OFFICIALS KNOW?', RED, 40));
};
TPL.calendar = (t, p, d, P) => {
  [8, 10, 12].forEach((dd, i) => calPage(330 + i * 300, 260, .7, dd, i === P.day, i <= P.day ? 1 : .0001));
  mk([[180, 400], [1080, 400]], '#B8A27E', 6, { dash: [16, 12] });
  if (P.day === 0) {
    ceo(1460, GY - 124, .95, { mouth: 'sad', look: [-1, 0] }); popIn(pop(t, at(/admits/i, 2)), 620, 560, () => pillM(0, 0, 'AFFAIR ADMITTED', RED, 44));
    card(260, 650, 760, 190, 'NVIDIA BOARD', BLUE, ['opens independent investigation'], pop(t, at(/board/i, 4)));
    if (t > at(/foreign/i, 8)) { popIn(pop(t, at(/foreign/i, 8)), 1460, 260, () => bubble2(0, 0, 660, 110, 'Targeted by foreign intel?', -1)); }
  } else if (P.day === 1) {
    popIn(pop(t, at(/Information/i, 1.5)), 620, 560, () => pillM(0, 0, 'THE INFORMATION, VIA REUTERS', INK, 38));
    const k = pop(t, at(/240/i, 9)); if (k > 0) { popIn(k, 1440, 380, () => { for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) chipIcon(-240 + c * 160, -150 + r * 150, .3, '#3D5A80'); }); text('~240,000 CHIPS', 1440, 740, 64, { color: INK, alpha: k }); }
    const k2 = pop(t, at(/billion/i, 12)); if (k2 > 0) popIn(k2, 620, 740, () => pillM(0, 0, '$7.5 BILLION+', NV, 64));
    if (t > at(/alleges/i, 3)) text('ALLEGED', 1440, 820, 44, { color: RED });
  } else {
    popIn(pop(t, at(/resigned/i, 3)), 620, 580, () => pillM(0, 0, 'CEO RESIGNS', RED, 50));
    const kk = prog(t, at(/left/i, 5), at(/left/i, 5) + 2.5); ceo(1300 + kk * 700, GY - 124, .95, { mouth: 'flat', pose: walk(T * 6, kk > 0 && kk < 1 ? 1 : 0) });
    card(260, 680, 760, 170, 'INTERIM CEO', TEAL, ['Colette Kress, CFO'], pop(t, at(/Kress/i, 8)));
    box(1420, 360, 200, 500, 12, '#8D6E63', 7); dot(1590, 620, 12, '#FFC83A'); box(1450, 420, 140, 50, 6, '#FFC83A', 4); text('CEO', 1520, 447, 30, { color: INK });
  }
};
TPL.chips7 = (t, p, d, P) => {
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) chipIcon(560 + c * 200, 280 + r * 190, .4, '#3D5A80');
  stamp('ALLEGED', 960, 470, prog(t, .2, .6), RED, 150, -.12);
  popIn(pop(t, at(/court/i, 3.5)), 960, 800, () => pillM(0, 0, 'NOT PROVEN IN COURT', INK, 46));
};
TPL.resignation = (t, p, d, P) => {
  card(160, 170, 900, 440, "THE BOARD'S POSITION", BLUE, ['At that point: no reason to believe', 'Nvidia’s secrets or U.S. national', 'security were compromised'], prog(t, .2, .7));
  const kd = pop(t, at(/diner/i, 9)); if (kd > 0) popIn(kd, 1450, 470, () => { box(-330, 40, 660, 60, 14, '#C0392B', 7); box(-330, -180, 80, 220, 14, '#C0392B', 7); box(250, -180, 80, 220, 14, '#C0392B', 7); box(-220, -20, 440, 30, 8, '#ECEFF4', 6); text('1993', 0, -120, 70, { color: INK }); });
  const kg = pop(t, at(/four/i, 11.5)); if (kg > 0) popIn(kg, 1450, 790, () => pillM(0, 0, 'GONE IN 4 DAYS', RED, 48));
};
TPL.intelSplit = (t, p, d, P) => {
  const cards = [[/Times/i, 'NEW YORK TIMES', RED, ['Intel believed she', 'passed info to Beijing'], 3], [/CNN/i, 'CNN', BLUE, ['Officials disagreed', 'on "knowingly"'], 8.5], [/attorney/i, 'ATTORNEY GENERAL', TEAL, ['Justice Dept. reached', 'no conclusion'], 13], [/Ministry/i, "CHINA'S FOREIGN MINISTRY", '#5C6784', ['Rejected the', 'allegation'], 18]];
  cards.forEach(([re, ttl, col, lines, fb], i) => card(70 + i * 450, 300, 420, 330, ttl, col, lines, pop(t, at(re, fb))));
  popIn(prog(t, .1, .6), 960, 180, () => pillM(0, 0, 'WAS SHE A SPY?  STILL UNRESOLVED', INK, 46));
  silhouette(960, GY - 20, 1, true, .85);
};
TPL.twoQuestions = (t, p, d, P) => {
  const k1 = prog(t, .3, .8), k2 = pop(t, at(/handle/i, 6.5));
  popIn(k1, 520, 420, () => { box(-400, -260, 800, 520, 26, '#fff', 7); text('QUESTION 1', 0, -200, 40, { color: '#5C6784' }); text('Did she knowingly', 0, -90, 50, { color: INK }); text('work for Beijing?', 0, -30, 50, { color: INK }); });
  popIn(k2, 1400, 420, () => { box(-400, -260, 800, 520, 26, '#fff', 7); text('QUESTION 2', 0, -200, 40, { color: '#5C6784' }); text('How did Washington', 0, -90, 50, { color: INK }); text('handle the warnings?', 0, -30, 50, { color: INK }); });
  const ky = pop(t, at(/years/i, 9)); if (ky > 0) popIn(ky, 520, 590, () => pillM(0, 0, 'MAY TAKE YEARS', '#5C6784', 42));
  const ks = pop(t, at(/stands/i, 11)); if (ks > 0) popIn(ks, 1400, 590, () => pillM(0, 0, 'STANDS EITHER WAY', RED, 42));
};
TPL.cta = (t, p, d, P) => {
  popIn(prog(t, .1, .6), 700, 400, () => { box(-460, -200, 920, 340, 30, '#fff', 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-300, 140); ctx.lineTo(-360, 230); ctx.lineTo(-200, 140); ctx.fill(); text('Who should have warned him?', 0, -70, 50, { color: INK }); text('Who should answer for it?', 0, 20, 50, { color: RED }); });
  const ks = pop(t, at(/subscribe/i, 5)); if (ks > 0) popIn(ks, 1500, 700, () => { box(-260, -70, 520, 140, 70, RED, 7); text('SUBSCRIBE', 0, 4, 64, { color: '#fff' }); });
  popIn(pop(t, at(/comments/i, 3.5)), 1500, 320, () => { box(-200, -110, 400, 220, 30, '#BDE0FE', 7); for (let i = 0; i < 3; i++) { ctx.fillStyle = '#fff'; rrect(-150, -70 + i * 50, 300 - i * 60, 26, 13); ctx.fill(); } });
};
TPL.endcard = (t, p, d, P) => {
  text('Who knew, and when?', 960, 260, 90, { color: INK }); text('Sources: The New York Times, CNN, Reuters, The Information', 960, 380, 34, { color: '#5C6784', weight: 700 });
  for (const [x, ttl] of [[560, 'NEXT VIDEO'], [1360, 'SUBSCRIBE']]) { box(x - 330, 460, 660, 340, 26, '#fff', 7); text(ttl, x, 630, 56, { color: ttl === 'SUBSCRIBE' ? RED : INK }); }
  const f = prog(t, d - 1, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
