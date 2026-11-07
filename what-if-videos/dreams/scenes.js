// ---------- helpers for this episode ----------
function box(x, y, w, h, r, col, ow = 8) { ctx.save(); ctx.fillStyle = INK; rrect(x - ow, y - ow, w + ow * 2, h + ow * 2, r + ow); ctx.fill(); ctx.fillStyle = col; rrect(x, y, w, h, r); ctx.fill(); ctx.restore(); }
function heart(x, y, s, col = '#FF4D6D') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, 12); ctx.bezierCurveTo(-30, -10, -14, -34, 0, -18); ctx.bezierCurveTo(14, -34, 30, -10, 0, 12); ctx.fill(); ctx.restore(); }
function cloudShape(cx, cy, w, h, col) { ctx.save(); ctx.fillStyle = col; for (const [dx, dy, r] of [[-.32, .1, .3], [0, -.15, .38], [.32, .08, .3], [0, .2, .33], [-.5, .25, .2], [.5, .25, .2]]) { ctx.beginPath(); ctx.ellipse(cx + dx * w, cy + dy * h, r * w, r * h * 1.2, 0, 0, 7); ctx.fill(); } ctx.restore(); }
function liveBadge(x, y, s = 1) { ctx.save(); ctx.fillStyle = '#E63946'; rrect(x, y, 120 * s, 46 * s, 12 * s); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(x + 24 * s, y + 23 * s, 8 * s * (.7 + .3 * Math.sin(T * 8)), 0, 7); ctx.fill(); ctx.restore(); text('LIVE', x + 76 * s, y + 25 * s, 28 * s, { color: '#fff' }); }
// a dream picture drawn inside a clipped rect
function dreamPic(x, y, w, h, kind) {
  ctx.save(); rrect(x, y, w, h, Math.min(w, h) * .06); ctx.clip();
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  const sky = { fly: ['#B5A8FF', '#FFC6E0'], pizza: ['#FFD6A5', '#FFADAD'], cat: ['#A0E7E5', '#B4F8C8'], rainbow: ['#BDE0FE', '#FFFFFF'], storm: ['#2B2D42', '#5C4D7D'] }[kind];
  g.addColorStop(0, sky[0]); g.addColorStop(1, sky[1]); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  const cx = x + w / 2, cy = y + h / 2, k = Math.min(w, h) / 400;
  if (kind === 'fly') { cloudShape(x + w * .2, y + h * .75, 160 * k, 70 * k, '#fff'); cloudShape(x + w * .85, y + h * .3, 120 * k, 50 * k, '#fff');
    ctx.save(); ctx.translate(cx + Math.sin(T * 2) * 30 * k, cy + Math.cos(T * 3) * 15 * k); ctx.rotate(-1.2); figure(0, 60 * k, .9 * k, { seed: 11, pose: { armL: [-2.9, -3], armR: [-2.7, -2.9], legL: [.1, .1], legR: [.25, .25] }, mouth: 'smile' }); ctx.restore(); }
  if (kind === 'pizza') { ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(T * 2) * .2); ctx.fillStyle = '#F4A261'; ctx.beginPath(); ctx.moveTo(-110 * k, -90 * k); ctx.lineTo(110 * k, -90 * k); ctx.lineTo(0, 120 * k); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#FFD166'; ctx.beginPath(); ctx.moveTo(-95 * k, -70 * k); ctx.lineTo(95 * k, -70 * k); ctx.lineTo(0, 100 * k); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#E63946'; for (const [a, b] of [[-30, -40], [30, -30], [0, 20]]) { ctx.beginPath(); ctx.arc(a * k, b * k, 18 * k, 0, 7); ctx.fill(); } ctx.restore(); }
  if (kind === 'cat') { ctx.save(); ctx.translate(cx, cy + Math.sin(T * 3) * 10 * k); ctx.fillStyle = '#F4A261'; ctx.beginPath(); ctx.arc(0, 0, 95 * k, 0, 7); ctx.fill(); for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 85 * k, -40 * k); ctx.lineTo(sx * 70 * k, -130 * k); ctx.lineTo(sx * 20 * k, -85 * k); ctx.fill(); }
    ctx.fillStyle = INK; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 35 * k, -10 * k, 11 * k, 0, 7); ctx.fill(); } ctx.beginPath(); ctx.arc(0, 25 * k, 9 * k, 0, 7); ctx.fill(); ctx.restore(); }
  if (kind === 'rainbow') { const cols = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93']; ctx.lineWidth = 26 * k; for (let i = 0; i < 5; i++) { ctx.strokeStyle = cols[i]; ctx.beginPath(); ctx.arc(cx, y + h * .95, (170 - i * 26) * k, Math.PI, 0); ctx.stroke(); } cloudShape(cx - 150 * k, y + h * .9, 120 * k, 50 * k, '#fff'); cloudShape(cx + 150 * k, y + h * .9, 120 * k, 50 * k, '#fff'); }
  if (kind === 'storm') { cloudShape(cx, cy - 40 * k, 300 * k, 110 * k, '#454866'); if (Math.floor(T * 6) % 3 === 0) { ctx.fillStyle = YEL; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - 40 * k, cy + 90 * k); ctx.lineTo(cx, cy + 80 * k); ctx.lineTo(cx - 30 * k, cy + 170 * k); ctx.lineTo(cx + 40 * k, cy + 60 * k); ctx.lineTo(cx + 5 * k, cy + 70 * k); ctx.closePath(); ctx.fill(); } }
  ctx.restore();
}
function screenBox(x, y, w, h, kind, live = true) { box(x, y, w, h, 18, '#111'); dreamPic(x + 8, y + 8, w - 16, h - 16, kind); if (live) liveBadge(x + 18, y + 18, Math.max(.55, Math.min(1, w / 500))); }
function phone(x, y, w, h) { ctx.save(); ctx.fillStyle = INK; rrect(x - 18, y - 18, w + 36, h + 36, 60); ctx.fill(); ctx.fillStyle = '#fff'; rrect(x, y, w, h, 44); ctx.fill(); ctx.fillStyle = INK; rrect(x + w / 2 - 60, y + 18, 120, 32, 16); ctx.fill(); ctx.restore(); }
function lyingHero(x, y, s, o) { ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 2); figure(0, 0, s, { seed: 11, ...o, pose: { legL: [0, 0], legR: [.05, .05], armL: [-.2, -.1], armR: [.2, .1] } }); ctx.restore(); }
function bedroom(t, tv) {
  ctx.fillStyle = '#2E2A5A'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#3F3770'; ctx.fillRect(0, 1290, W, H - 1290);
  box(110, 330, 300, 380, 16, '#14123A', 10);
  ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.arc(300, 440, 50, 0, 7); ctx.fill(); ctx.fillStyle = '#14123A'; ctx.beginPath(); ctx.arc(322, 425, 46, 0, 7); ctx.fill();
  for (let i = 0; i < 9; i++) { const sx = 140 + rnd(i * 3.3) * 240, sy = 360 + rnd(i * 7.1) * 320, tw = .5 + .5 * Math.sin(T * 3 + i); ctx.fillStyle = `rgba(255,255,255,${.4 + .6 * tw})`; ctx.beginPath(); ctx.arc(sx, sy, 4, 0, 7); ctx.fill(); }
  inkPath([[260, 330], [260, 710]], { w: 8 }); inkPath([[110, 520], [410, 520]], { w: 8 });
  // bed
  box(120, 1040, 840, 70, 20, '#8D6E63'); box(120, 980, 40, 280, 10, '#6D4C41'); box(920, 1040, 40, 220, 10, '#6D4C41');
  box(160, 990, 220, 80, 36, '#FFFFFF', 6);
}
function blanket(y = 1000) { box(420, y, 520, 120, 30, '#FFB703', 7); ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(470 + i * 120, y + 10, 30, 100); ctx.restore(); }
function bridge(x0, y, w, k, night) {
  const deck = night ? '#B39DDB' : '#E76F51', tower = night ? '#9575CD' : '#C1440E', cable = night ? '#D1C4E9' : '#264653';
  ctx.save(); ctx.fillStyle = night ? '#3A2F6B' : '#4FA3E0'; ctx.fillRect(0, y + 40, W, 380); ctx.fillStyle = 'rgba(255,255,255,.25)'; for (let i = 0; i < 8; i++) ctx.fillRect(((i * 160 + T * 40) % (W + 200)) - 100, y + 90 + (i % 3) * 90, 90, 8); ctx.restore();
  const tx = [x0 + w * .28, x0 + w * .72];
  for (const X of tx) { box(X - 22, y - 320, 44, 420, 8, tower, 6); }
  ctx.strokeStyle = cable; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0, y - 20); ctx.quadraticCurveTo((x0 + tx[0]) / 2, y - 120, tx[0], y - 310); ctx.quadraticCurveTo(x0 + w / 2, y - 40, tx[1], y - 310); ctx.quadraticCurveTo((tx[1] + x0 + w) / 2, y - 120, x0 + w, y - 20); ctx.stroke();
  box(x0 - 60, y - 10, tx[0] - x0 + 60 + 10, 40, 4, deck, 6); box(tx[1] - 10, y - 10, x0 + w - tx[1] + 70, 40, 4, deck, 6);
  // middle span: cracks, then drops and tilts into the water
  const fall = easeOut(clamp(k)) , mid0 = tx[0] + 10, mid1 = tx[1] - 10;
  ctx.save(); ctx.translate(mid0, y + 10 + fall * 330); ctx.rotate(fall * .35); box(0, -20, (mid1 - mid0) / 2 - 6, 40, 4, deck, 6); ctx.restore();
  ctx.save(); ctx.translate(mid1, y + 10 + fall * 300); ctx.rotate(-fall * .4); box(-(mid1 - mid0) / 2 + 6, -20, (mid1 - mid0) / 2 - 6, 40, 4, deck, 6); ctx.restore();
  if (k > 0 && k < .35) { ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); const mx = (mid0 + mid1) / 2; ctx.moveTo(mx, y - 10); ctx.lineTo(mx - 14, y + 4); ctx.lineTo(mx + 10, y + 14); ctx.lineTo(mx - 6, y + 30); ctx.stroke(); }
  if (k > .55 && k < 1.4) { const sp = clamp((k - .55) / .8); ctx.save(); ctx.fillStyle = `rgba(255,255,255,${1 - sp})`; for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI, R = 60 + sp * 200; ctx.beginPath(); ctx.arc((mid0 + mid1) / 2 + Math.cos(a) * R, y + 330 + Math.sin(a) * R * .8, 22 * (1 - sp) + 6, 0, 7); ctx.fill(); } ctx.restore(); }
}
function clockBadge(x, y, label, glow) { ctx.save(); if (glow) { ctx.shadowColor = '#FF4D6D'; ctx.shadowBlur = 40; } ctx.fillStyle = INK; rrect(x - 200, y - 70, 400, 140, 30); ctx.fill(); ctx.restore(); text(label, x, y + 4, 88, { color: glow ? '#FF4D6D' : '#fff', font: "'DejaVu Sans Mono'", weight: 700 }); }
const WT = (line, re) => (TL.words.find(w => w.line === line && re.test(w.w)) || { s: 1e9 }).s;

// ---------- scenes ----------
const S = [];
// 0: hook. sleeping -> dream bubble -> every screen in the world
S[0] = (t, p, d) => {
  if (p < .55) {
    bedroom(t); lyingHero(560, 1035, 1.6, { eyes: 'closed', mouth: 'smile' }); blanket();
    for (let i = 0; i < 3; i++) { const k = (t * .6 + i / 3) % 1; text('z', 300 + k * 120, 900 - k * 180, 50 + k * 40, { color: '#fff', alpha: 1 - k }); }
    const b = easeBack(prog(p, .08, .3));
    for (const [i, bx, by, br] of [[0, 330, 860, 18], [1, 370, 790, 28], [2, 420, 710, 40]]) if (p > .06 + i * .04) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx, by, br, 0, 7); ctx.fill(); }
    if (b > 0) { ctx.save(); ctx.translate(560, 420); ctx.scale(b, b); cloudShape(0, 0, 640, 300, '#fff'); dreamPic(-230, -150, 460, 300, 'fly'); ctx.restore(); }
  } else {
    ctx.fillStyle = '#14123A'; ctx.fillRect(0, 0, W, H);
    const kinds = ['fly']; const cells = [[60, 220, 460, 300], [560, 180, 460, 340], [80, 580, 300, 420], [420, 580, 600, 380], [60, 1040, 520, 330], [620, 1010, 400, 360]];
    cells.forEach((c, i) => { const k = easeBack(prog(p, .55 + i * .05, .65 + i * .05)); if (k <= 0) return; ctx.save(); ctx.translate(c[0] + c[2] / 2, c[1] + c[3] / 2); ctx.scale(k, k); ctx.translate(-(c[0] + c[2] / 2), -(c[1] + c[3] / 2)); screenBox(c[0], c[1], c[2], c[3], 'fly'); ctx.restore(); });
  }
};
// 1: boss sees you flying / crush sees everything
S[1] = (t, p, d) => {
  const split = WT(1, /crush/i) - TL.scenes[1].a - .1;
  box(40, 120, 1000, 760, 30, '#E9F1F7');
  ctx.save(); rrect(40, 120, 1000, 760, 30); ctx.clip(); ctx.fillStyle = '#CFD8E3'; ctx.fillRect(40, 700, 1000, 200); box(560, 640, 420, 30, 6, '#8D6E63', 6);
  figure(290, 640, 1.55, { scarf: false, seed: 21, mouth: t > .4 ? 'o' : 'flat', look: [1, 0], pose: { armL: [-.4, -.2], armR: [1.2, 1.9] } });
  box(620, 330, 340, 240, 12, '#111', 6); dreamPic(630, 340, 320, 220, 'fly'); box(770, 570, 40, 70, 4, '#555', 4);
  if (t > .5) text('!', 330, 300, 140, { color: '#E63946', alpha: easeOut(prog(t, .5, .7)) });
  ctx.restore();
  if (t > split) { const k = easeOut(prog(t, split, split + .3)), oy = (1 - k) * 600;
    ctx.save(); ctx.translate(0, oy); box(40, 930, 1000, 500, 30, '#FFE5EC');
    ctx.save(); rrect(40, 930, 1000, 500, 30); ctx.clip();
    figure(300, 1320, 1.35, { scarf: false, seed: 51, mouth: 'o', look: [1, 0], pose: { armL: [-.3, -.2], armR: [1.3, 2.2] } });
    ctx.fillStyle = 'rgba(255,90,120,.45)'; for (const ex of [-.62, .62]) { ctx.beginPath(); ctx.ellipse(300 + ex * 62, 1320 - 162 - 58 + 20, 20, 12, 0, 0, 7); ctx.fill(); }
    phone(600, 990, 300, 400); ctx.fillStyle = '#FFB3C6'; ctx.fillRect(600, 1060, 300, 300);
    for (let i = 0; i < 5; i++) heart(650 + (i % 3) * 100, 1300 - ((t * 120 + i * 70) % 240), 1.3);
    ctx.fillStyle = INK; ctx.fillRect(600, 1170, 300, 80); text('CENSORED', 750, 1212, 44, { color: '#fff' });
    ctx.restore(); ctx.restore(); }
};
// 2: billions of dreams streaming live
S[2] = (t, p, d) => {
  ground(1290);
  const bb = [[60, 300, 420, 280, 'pizza'], [560, 240, 460, 300, 'cat'], [140, 640, 360, 250, 'rainbow'], [560, 620, 420, 300, 'fly']];
  bb.forEach((c, i) => { const k = easeBack(prog(p, i * .1, i * .1 + .15)); if (k <= 0) return; ctx.save(); ctx.translate(c[0] + c[2] / 2, c[1] + c[3] / 2); ctx.scale(k, k); ctx.translate(-(c[0] + c[2] / 2), -(c[1] + c[3] / 2)); screenBox(c[0], c[1], c[2], c[3], c[4]); ctx.restore(); });
  for (const [x, sd] of [[220, 21], [540, 41], [860, 31]]) figure(x, 1290 - 122 * 1.3, 1.3, { scarf: false, seed: sd, look: [0, -1.4], mouth: 'o', pose: { armL: [-.3, -.2], armR: [.9, 2.6] } });
  const n = Math.floor(lerp(1e6, 8e9, easeOut(prog(p, .1, .9))));
  ctx.save(); ctx.fillStyle = INK; rrect(110, 1000, 860, 150, 34); ctx.fill(); ctx.restore();
  text(n.toLocaleString('en-US'), 540, 1060, 84, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 }); text('DREAMS LIVE NOW', 540, 1122, 34, { color: '#FFB703' });
};
// 3: one stranger's dream goes viral
S[3] = (t, p, d) => {
  phone(250, 260, 580, 1100);
  dreamPic(270, 360, 540, 420, 'storm'); liveBadge(290, 380, .9);
  text("stranger's dream", 300, 830, 40, { align: 'left', weight: 800 });
  const v = Math.floor(lerp(12000, 2.4e9, Math.pow(prog(p, .05, 1), 2)));
  text(v.toLocaleString('en-US') + ' views', 300, 895, 46, { align: 'left', color: '#E63946' });
  const k = easeBack(prog(p, .15, .35)); if (k > 0) { ctx.save(); ctx.translate(540, 1080); ctx.rotate(-.12); ctx.scale(k, k); ctx.fillStyle = '#E63946'; rrect(-200, -70, 400, 140, 30); ctx.fill(); ctx.restore(); ctx.save(); ctx.translate(540, 1080); ctx.rotate(-.12); ctx.scale(k, k); text('VIRAL', 0, 4, 100, { color: '#fff' }); ctx.restore(); }
  for (let i = 0; i < 10; i++) { const k2 = ((t * .9 + i * .13) % 1); heart(880 + Math.sin(i * 2 + t * 3) * 40, 1300 - k2 * 900, 1.6 * (1 - k2 * .4), ['#FF4D6D', '#FFB703', '#4FA3E0'][i % 3]); }
};
// 4: the dream: bridge collapses, clock reads 3:07
S[4] = (t, p, d) => {
  ctx.fillStyle = '#1F1A4A'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.globalAlpha = .5 + .1 * Math.sin(T * 4); for (let i = 0; i < 14; i++) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(rnd(i * 4.1) * W, rnd(i * 9.7) * 700 + 300, 3 + rnd(i) * 3, 0, 7); ctx.fill(); } ctx.restore();
  const col = WT(4, /collaps/i) - TL.scenes[4].a;
  bridge(120, 1000, 840, prog(t, col, col + 1.4) * 1.4, true);
  const ck = WT(4, /PM|3:07/) - TL.scenes[4].a - .1;
  if (t > ck) { const k = easeBack(prog(t, ck, ck + .3)); ctx.save(); ctx.translate(540, 470); ctx.scale(k, k); clockBadge(0, 0, '3:07 PM', true); ctx.restore(); }
  // dreamy vignette border
  ctx.save(); const g = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1100); g.addColorStop(0, 'rgba(180,140,255,0)'); g.addColorStop(1, 'rgba(180,140,255,.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
  ctx.save(); ctx.fillStyle = '#B39DDB'; rrect(300, 170, 480, 70, 35); ctx.fill(); ctx.restore(); text("STRANGER'S DREAM", 540, 207, 36, { color: '#1F1A4A' });
  const tm = WT(4, /tomorrow/i) - TL.scenes[4].a; if (t > tm) text('TOMORROW', 540, 640, 76, { color: '#fff', alpha: easeOut(prog(t, tm, tm + .3)) });
};
// 5: real world, 3:07, it happens
S[5] = (t, p, d) => {
  const hap = WT(5, /happen/i) - TL.scenes[5].a - .15, until = WT(5, /until/i) - TL.scenes[5].a;
  bridge(120, 1000, 840, prog(t, hap, hap + 1.4) * 1.4, false);
  const label = t < until ? '3:05 PM' : t < hap - .5 ? '3:06 PM' : '3:07 PM';
  clockBadge(540, 330, label, t >= hap - .5);
  // watchers on the near shore (nobody on the bridge)
  ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, 1380, W, H - 1380);
  for (const [x, sd] of [[180, 21], [430, 41], [700, 31], [920, 51]]) figure(x, 1380 - 122 * 1.15 + 40, 1.15, { scarf: false, seed: sd, look: [0, -1], mouth: t > hap + .3 ? 'o' : 'flat', pose: t > hap + .3 ? { armL: [-2.5, -2.9], armR: [2.5, 2.9] } : {} });
  if (t < until) text('PRANK?', 540, 560, 70, { color: INK, alpha: .8 });
  if (t > hap + .2) { const sh = (1 - prog(t, hap + .2, hap + .8)) * 12; text('IT HAPPENED.', 540 + (rnd(BOIL) - .5) * sh, 560, 96, { color: '#E63946', alpha: easeOut(prog(t, hap + .2, hap + .4)) }); }
};
// 6: the world stops asking what dreams mean
S[6] = (t, p, d) => {
  ground(1290);
  box(90, 240, 900, 560, 24, '#111'); ctx.save(); ctx.fillStyle = '#E63946'; ctx.fillRect(98, 640, 884, 110); ctx.restore();
  text('BREAKING', 260, 695, 50, { color: '#fff' }); text('A DREAM CAME TRUE', 660, 695, 46, { color: '#fff' });
  dreamPic(98, 248, 884, 392, 'storm');
  for (const [x, sd, sc] of [[140, 21, 1.1], [330, 41, 1.25], [540, 31, 1.15], [750, 51, 1.25], [940, 21, 1.1]]) figure(x, 1290 - 122 * sc, sc, { scarf: false, seed: sd, look: [0, -1.5], mouth: 'o' });
};
// 7: whose dream is next? -> it's yours
S[7] = (t, p, d) => {
  bedroom(t);
  const on = prog(p, .05, .12), you = WT(7, /next/i) - TL.scenes[7].a;
  box(560, 300, 420, 300, 14, '#111');
  if (on > 0) { ctx.save(); rrect(570, 310, 400, 280, 8); ctx.clip();
    if (t < you) { for (let i = 0; i < 260; i++) { ctx.fillStyle = rnd(i + BOIL * 31) > .5 ? '#ddd' : '#555'; ctx.fillRect(570 + rnd(i * 3 + BOIL) * 400, 310 + rnd(i * 5 + BOIL) * 280, 14, 6); } text('NEXT DREAM...', 770, 450, 44, { color: '#fff', stroke: INK, sw: 10 }); }
    else { ctx.fillStyle = '#B5A8FF'; ctx.fillRect(570, 310, 400, 280); figure(770, 560, .95, { seed: 11, mouth: 'flat', eyes: 'closed' }); liveBadge(585, 325, .75); text('YOU', 900, 345, 40, { color: '#E63946' }); }
    ctx.restore(); }
  const awake = t > you + .5;
  lyingHero(560, 1035, 1.6, { eyes: awake ? null : 'closed', look: awake ? [1, 0] : [0, 0], mouth: awake ? 'o' : 'smile' }); blanket();
  if (awake) { const k = easeBack(prog(t, you + .5, you + .8)); text('!', 230, 820, 160 * k, { color: '#FFB703' }); }
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
