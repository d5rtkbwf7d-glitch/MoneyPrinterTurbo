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


// ---------- Monday helpers ----------
const SKY_DAY = [142, 209, 252], SKY_NIGHT = [20, 18, 58];
const mix = (a, b, k) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(',')})`;
function dayRoom() {
  ctx.fillStyle = '#FDE2C4'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#E9C29B'; ctx.fillRect(0, 1290, W, H - 1290);
  box(110, 330, 300, 380, 16, '#8ED1FC', 10); ctx.fillStyle = '#FFE066'; ctx.beginPath(); ctx.arc(310, 430, 48, 0, 7); ctx.fill();
  cloudShape(200, 600, 110, 45, '#fff'); inkPath([[260, 330], [260, 710]], { w: 8 }); inkPath([[110, 520], [410, 520]], { w: 8 });
  box(120, 1040, 840, 70, 20, '#8D6E63'); box(120, 980, 40, 280, 10, '#6D4C41'); box(920, 1040, 40, 220, 10, '#6D4C41');
}
function alarm(x, y, label, ring) {
  const sh = ring ? Math.sin(T * 60) * 8 : 0; ctx.save(); ctx.translate(x + sh, y); ctx.rotate(ring ? Math.sin(T * 50) * .08 : 0);
  for (const sx of [-1, 1]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx * 70, -95, 34, 0, 7); ctx.fill(); }
  box(-120, -80, 240, 160, 40, '#E63946'); ctx.fillStyle = '#111'; rrect(-90, -45, 180, 90, 14); ctx.fill(); ctx.restore();
  text(label, x + sh, y + 2, 60, { color: '#7CFC8A', font: "'DejaVu Sans Mono'", weight: 700 });
  if (ring) for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) inkPath([[x + sx * (150 + i * 4), y - 90 + i * 60], [x + sx * (190 + i * 6), y - 110 + i * 60]], { w: 8, seed: 50 + i });
}
function calendar(x, y, s, top, big, sub, col = '#E63946') {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-210, -250, 420, 500, 30, '#fff'); ctx.fillStyle = col; rrect(-210, -250, 420, 130, 30); ctx.fill(); ctx.fillRect(-210, -160, 420, 40);
  for (const rx of [-110, 110]) { ctx.fillStyle = INK; rrect(rx - 14, -290, 28, 80, 14); ctx.fill(); } ctx.restore();
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); text(top, 0, -185, 70, { color: '#fff' }); text(big, 0, 30, big.length > 4 ? 110 : 190, { color: INK }); if (sub) text(sub, 0, 175, 50, { color: '#888', weight: 800 }); ctx.restore();
}
function dayBar(y, frac, label, warn) {
  ctx.save(); ctx.fillStyle = INK; rrect(90, y - 60, 900, 120, 60); ctx.fill(); ctx.fillStyle = '#3A3D5C'; rrect(106, y - 44, 868, 88, 44); ctx.fill();
  if (frac > 0) { ctx.fillStyle = warn ? '#E63946' : '#FFB703'; rrect(106, y - 44, Math.max(88, 868 * frac), 88, 44); ctx.fill(); } ctx.restore();
  text(label, 540, y + 3, 56, { color: '#fff', stroke: INK, sw: 10, font: "'DejaVu Sans Mono'", weight: 700 });
}
const hm = m => { m = Math.max(0, Math.round(m)); return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`; };
function skyCycle(phase) {
  const dl = (Math.sin(phase) + 1) / 2; ctx.fillStyle = mix(SKY_NIGHT, SKY_DAY, dl); ctx.fillRect(0, 0, W, H);
  if (dl < .5) for (let i = 0; i < 16; i++) { ctx.fillStyle = `rgba(255,255,255,${(.5 - dl) * 1.6})`; ctx.beginPath(); ctx.arc(rnd(i * 4.1) * W, rnd(i * 9.7) * 1000 + 100, 3 + rnd(i) * 3, 0, 7); ctx.fill(); }
  const cx = 540, cy = 1250, R = 820;
  const sa = phase - Math.PI / 2; // sun angle: up at noon
  ctx.fillStyle = '#FFE066'; ctx.beginPath(); ctx.arc(cx + Math.sin(sa + Math.PI / 2) * R * .9, cy - Math.cos(sa) * 0 - Math.sin(phase) * R * .9, 80, 0, 7); ctx.fill();
  ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.arc(cx - Math.sin(sa + Math.PI / 2) * R * .9, cy + Math.sin(phase) * R * .9, 60, 0, 7); ctx.fill();
  return dl;
}
function hills(dark) { ctx.fillStyle = dark ? '#2E5E3A' : '#7BC96F'; ctx.beginPath(); ctx.moveTo(0, 1300); ctx.quadraticCurveTo(300, 1180, 600, 1290); ctx.quadraticCurveTo(850, 1370, W, 1250); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill(); }


// ---------- Sun helpers ----------
function bigSun(x, y, r, angry) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(T * .3);
  ctx.fillStyle = angry ? '#FF8C42' : '#FFD23F'; for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); ctx.beginPath(); ctx.moveTo(-r * .18, -r * 1.05); ctx.lineTo(0, -r * 1.45 - Math.sin(T * 4 + i) * r * .06); ctx.lineTo(r * .18, -r * 1.05); ctx.fill(); }
  ctx.restore(); ctx.fillStyle = angry ? '#FF6B35' : '#FFE066'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  ctx.fillStyle = INK; const ey = y - r * .1;
  if (angry) { for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sx * r * .32, ey + r * .05, r * .1, 0, 7); ctx.fill(); inkPath([[x + sx * r * .5, ey - r * .25], [x + sx * r * .15, ey - r * .1]], { w: r * .07 }); } inkPath([[x - r * .3, y + r * .45], [x, y + r * .33], [x + r * .3, y + r * .45]], { w: r * .07 }); }
  else { for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(x + sx * r * .32, ey, r * .09, 0, 7); ctx.fill(); } ctx.lineWidth = r * .07; ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y + r * .1, r * .35, .2 * Math.PI, .8 * Math.PI); ctx.stroke(); }
}
function shades(F) { const [hx, hy] = F.head, r = F.r; ctx.fillStyle = INK; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(hx + sx * r * .38, hy + r * .02, r * .3, r * .22, 0, 0, 7); ctx.fill(); } ctx.fillRect(hx - r * .15, hy - r * .04, r * .3, r * .08); }
function sweat(F, n = 3) { const [hx, hy] = F.head, r = F.r; for (let i = 0; i < n; i++) { const k = (T * 1.2 + i / n) % 1, x = hx + (i - 1) * r * .7, y = hy - r * .4 + k * r * 1.4; ctx.save(); ctx.globalAlpha = 1 - k; ctx.fillStyle = '#4FC3F7'; ctx.beginPath(); ctx.moveTo(x, y - 16); ctx.quadraticCurveTo(x + 12, y + 6, x, y + 10); ctx.quadraticCurveTo(x - 12, y + 6, x, y - 16); ctx.fill(); ctx.restore(); } }
function heatWaves(y0, alpha = .5) { ctx.save(); ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const x = 140 + i * 200; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const yy = y0 - k * 28 - (T * 80) % 56; ctx.lineTo(x + Math.sin(k * 1.2 + T * 5) * 14, yy); } ctx.stroke(); } ctx.restore(); }
function thermo(x, y, frac, label) {
  box(x - 40, y - 420, 80, 440, 40, '#fff', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y + 40, 78, 0, 7); ctx.fill(); ctx.fillStyle = '#E63946'; ctx.beginPath(); ctx.arc(x, y + 40, 66, 0, 7); ctx.fill();
  const h = 400 * clamp(frac); ctx.fillStyle = '#E63946'; rrect(x - 24, y + 10 - h, 48, h + 20, 24); ctx.fill();
  for (let i = 0; i < 8; i++) inkPath([[x + 40, y - 380 + i * 50], [x + 70, y - 380 + i * 50]], { w: 5 });
  text(label, x + 170, y - 400 + 400 * (1 - clamp(frac)), 70, { color: '#E63946', stroke: '#fff', sw: 12, font: "'DejaVu Sans Mono'", weight: 700 });
}
function owl(x, y, s, confused) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  box(-80, -110, 160, 200, 80, '#8D6E63', 7); ctx.fillStyle = '#D7B899'; ctx.beginPath(); ctx.ellipse(0, 20, 55, 60, 0, 0, 7); ctx.fill();
  for (const sx of [-1, 1]) { ctx.fillStyle = '#8D6E63'; ctx.beginPath(); ctx.moveTo(sx * 70, -100); ctx.lineTo(sx * 40, -150); ctx.lineTo(sx * 20, -100); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(sx * 36, -55, 30, 0, 7); ctx.fill(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(sx * 36 + (confused ? Math.sin(T * 6 + sx) * 10 : 0), -55, confused ? 9 : 14, 0, 7); ctx.fill(); }
  ctx.fillStyle = '#FFB703'; ctx.beginPath(); ctx.moveTo(-12, -30); ctx.lineTo(12, -30); ctx.lineTo(0, -8); ctx.fill(); ctx.restore();
}
function bat(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.PI); const fl = Math.sin(T * 3) * .2;
  ctx.fillStyle = '#3D3B5C'; for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 1); ctx.rotate(fl); ctx.beginPath(); ctx.moveTo(10, 0); ctx.quadraticCurveTo(80, -60, 130, -10); ctx.quadraticCurveTo(100, 0, 95, 20); ctx.quadraticCurveTo(70, 5, 60, 25); ctx.quadraticCurveTo(40, 10, 10, 20); ctx.fill(); ctx.restore(); }
  ctx.beginPath(); ctx.ellipse(0, 5, 26, 34, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * 10, 15, 6, 0, 7); ctx.fill(); } ctx.restore(); }
function tree(x, y, s, wilt) { box(x - 22 * s, y - 220 * s, 44 * s, 220 * s, 8, '#8D6E63', 6); const col = mix([95, 177, 90], [196, 150, 60], clamp(wilt)); cloudShape(x, y - 300 * s, 300 * s, 160 * s, col); }
function earth(x, y, R, locked) {
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(x, y, R + 10, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.clip();
  if (!locked) { ctx.fillStyle = '#4FA3E0'; ctx.fillRect(x - R, y - R, R * 2, R * 2); ctx.fillStyle = '#7BC96F'; for (const [dx, dy, r] of [[-.3, -.2, .35], [.35, .25, .3], [.1, -.55, .2]]) { ctx.beginPath(); ctx.arc(x + (dx + (T * .05 % 2)) * R, y + dy * R, r * R, 0, 7); ctx.fill(); } }
  else {
    const g = ctx.createLinearGradient(x - R, 0, x + R, 0); g.addColorStop(0, '#FF6B35'); g.addColorStop(.42, '#FFB703'); g.addColorStop(.5, '#7BC96F'); g.addColorStop(.58, '#3D5A80'); g.addColorStop(1, '#141B3D'); ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2);
    ctx.strokeStyle = 'rgba(120,30,0,.6)'; ctx.lineWidth = 6; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x - R * .9, y - R * .6 + i * R * .3); ctx.lineTo(x - R * .6, y - R * .5 + i * R * .3); ctx.lineTo(x - R * .4, y - R * .65 + i * R * .3); ctx.stroke(); }
    ctx.fillStyle = 'rgba(220,240,255,.9)'; for (const [dx, dy, r] of [[.6, -.4, .18], [.75, .2, .15], [.5, .5, .12], [.85, -.1, .1]]) { ctx.beginPath(); ctx.arc(x + dx * R, y + dy * R, r * R, 0, 7); ctx.fill(); }
  }
  ctx.restore();
}
function space() { ctx.fillStyle = '#0B0A1F'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 40; i++) { ctx.fillStyle = `rgba(255,255,255,${.4 + .6 * rnd(i * 2.2 + Math.floor(T * 2) * .01)})`; ctx.beginPath(); ctx.arc(rnd(i * 4.1) * W, rnd(i * 9.7) * H, 2 + rnd(i) * 3, 0, 7); ctx.fill(); } }
function snow(x0, x1, n = 25) { ctx.fillStyle = '#fff'; for (let i = 0; i < n; i++) { const x = x0 + rnd(i * 3.7) * (x1 - x0) + Math.sin(T * 2 + i) * 20, y = ((rnd(i * 5.3) * H + T * 180) % H); ctx.beginPath(); ctx.arc(x, y, 6 + rnd(i) * 6, 0, 7); ctx.fill(); } }
function stamp(txt, x, y, k, col = '#E63946', size = 130, rot = -.12) { if (k <= 0) return; const sc = lerp(1.8, 1, easeOut(k)); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = clamp(k * 3); ctx.font = `900 ${size}px 'Inter Display'`; const w = ctx.measureText(txt).width; ctx.fillStyle = col; rrect(-w / 2 - 40, -size * .65, w + 80, size * 1.3, 26); ctx.fill(); ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = clamp(k * 3); text(txt, 0, 6, size, { color: '#fff' }); ctx.restore(); }
const SA = i => TL.scenes[i].a;


// ---------- Ant helpers ----------
function ant(x, y, s, dir = 1, walkT = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s);
  ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) for (const sd of [-1, 1]) { const w = Math.sin(walkT * 12 + i * 2 + (sd > 0 ? 0 : Math.PI)) * 12; ctx.beginPath(); ctx.moveTo(-10 + i * 30, 0); ctx.lineTo(-30 + i * 34 + w, 40); ctx.lineTo(-40 + i * 36 + w, 70); ctx.stroke(); }
  ctx.fillStyle = '#3B2A2A'; for (const [cx, rx, ry] of [[-70, 55, 40], [10, 34, 26], [80, 36, 32]]) { ctx.beginPath(); ctx.ellipse(cx, -10, rx, ry, 0, 0, 7); ctx.fill(); }
  ctx.beginPath(); ctx.moveTo(95, -35); ctx.quadraticCurveTo(120, -90, 150, -95); ctx.moveTo(85, -38); ctx.quadraticCurveTo(95, -100, 125, -110); ctx.stroke();
  ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(92, -18, 9, 0, 7); ctx.fill(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(95, -18, 4, 0, 7); ctx.fill();
  ctx.restore();
}
function drop(x, y, r) { ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x, y - r * 1.9 - 8); ctx.quadraticCurveTo(x + r * 1.3 + 8, y + r * .1, x, y + r + 8); ctx.quadraticCurveTo(x - r * 1.3 - 8, y + r * .1, x, y - r * 1.9 - 8); ctx.fill(); ctx.fillStyle = '#4FC3F7'; ctx.beginPath(); ctx.moveTo(x, y - r * 1.9); ctx.quadraticCurveTo(x + r * 1.3, y + r * .1, x, y + r); ctx.quadraticCurveTo(x - r * 1.3, y + r * .1, x, y - r * 1.9); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(x - r * .35, y - r * .2, r * .15, r * .3, -.4, 0, 7); ctx.fill(); ctx.restore(); }
function floorRoom(col = '#FDE2C4', floor = '#C9A27E', fy = 1290) { ctx.fillStyle = col; ctx.fillRect(0, 0, W, H); ctx.fillStyle = floor; ctx.fillRect(0, fy, W, H - fy); ctx.fillStyle = 'rgba(0,0,0,.08)'; for (let x = 0; x < W; x += 180) ctx.fillRect(x, fy, 6, H - fy); }
function dustBall(x, y, r, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#9E9E9E'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = '#757575'; ctx.lineWidth = 6; for (let i = 0; i < 14; i++) { const a = i / 14 * 6.28; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * .5, Math.sin(a) * r * .5); ctx.lineTo(Math.cos(a + .4) * r * 1.15, Math.sin(a + .4) * r * 1.15); ctx.stroke(); } ctx.fillStyle = '#fff'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.arc(sx * r * .3, -r * .1, r * .14, 0, 7); ctx.fill(); } ctx.restore(); }
function waves(y0, amp, col, speed = 1) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, y0 + Math.sin(x * .012 + T * 2 * speed) * amp + Math.sin(x * .03 + T * 3 * speed) * amp * .3); ctx.lineTo(W, H); ctx.fill(); }

// ---------- scenes ----------
const S = [];
// 0: you wake up the size of an ant
S[0] = (t, p, d) => {
  const ant0 = WT(0, /ant/i) - SA(0) - .3, k = ease(prog(t, ant0, ant0 + .6));
  floorRoom();
  const s = lerp(1.9, .32, k);
  const F = figure(540, 1290 - 122 * s, s, { seed: 11, mouth: k > .5 ? 'o' : 'smile', eyes: t < .6 ? 'closed' : null, look: k > .5 ? [1, 0] : [0, 0] });
  burst(540, 1290 - 200 * s, prog(t, ant0, ant0 + .5), 200 * (1 - k) + 60, '#E63946');
  if (k > .3) ant(760, 1225, .55 * easeOut(prog(k, .3, 1)), -1, t);
  stamp('ANT-SIZED', 540, 420, prog(t, ant0 + .4, ant0 + .7), '#E63946', 110);
};
// 1: bed towers like a skyscraper
S[1] = (t, p, d) => {
  floorRoom('#FDE2C4', '#C9A27E', 1500);
  const up = easeOut(prog(p, 0, .5));
  box(80, 200 - up * 0, 920, 260, 30, '#FFB703'); box(80, 440, 920, 120, 20, '#8D6E63'); box(130, 560, 120, 940, 10, '#6D4C41'); box(830, 560, 120, 940, 10, '#6D4C41');
  ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(250, 560, 580, 940); ctx.restore();
  figure(540, 1500 - 122 * .32, .32, { seed: 11, look: [0, -1.5], mouth: 'o' });
  inkPath([[1020, 1490], [1020, 210]], { w: 6, color: '#E63946', dash: [18, 14] }); text('SKYSCRAPER', 900, 860, 44, { color: '#E63946', alpha: prog(p, .4, .55) });
};
// 2: a single stair = a cliff
S[2] = (t, p, d) => {
  ctx.fillStyle = '#E8F6FF'; ctx.fillRect(0, 0, W, H);
  box(-20, 900, 620, 1100, 10, '#C9A27E'); box(-20, 880, 640, 40, 10, '#A47E5B');
  ctx.fillStyle = '#8D6E63'; ctx.fillRect(0, 1700, W, 220);
  const lean = Math.sin(T * 3) * .08;
  ctx.save(); ctx.translate(560, 880); ctx.rotate(lean); figure(0, -122 * .32, .32, { seed: 11, look: [1, 1.4], mouth: 'o', pose: { armL: [-1.4, -1.6], armR: [1.4, 1.6] } }); ctx.restore();
  inkPath([[700, 900], [700, 1690]], { w: 6, color: '#E63946', dash: [18, 14] }); inkPath([[680, 920], [700, 900], [720, 920]], { w: 6, color: '#E63946' }); inkPath([[680, 1670], [700, 1690], [720, 1670]], { w: 6, color: '#E63946' });
  text('ONE STAIR', 870, 1300, 52, { color: '#E63946', alpha: prog(p, .3, .45) });
};
// 3: a drop of water hits like a wrecking ball
S[3] = (t, p, d) => {
  floorRoom('#E8F6FF', '#C9A27E');
  const hitT = WT(3, /wreck/i) - SA(3) - .1, k = prog(t, 0, hitT);
  const hx = 380 + (t > hitT ? easeOut(prog(t, hitT, hitT + .4)) * 260 : 0);
  if (t < hitT) drop(560, lerp(-200, 1150, k * k), 130);
  else { const sp = prog(t, hitT, hitT + .8); ctx.save(); ctx.fillStyle = `rgba(79,195,247,${1 - sp})`; for (let i = 0; i < 10; i++) { const a = Math.PI + i / 9 * Math.PI, R = 80 + sp * 380; ctx.beginPath(); ctx.arc(560 + Math.cos(a) * R, 1290 + Math.sin(a) * R * .7, 40 * (1 - sp) + 8, 0, 7); ctx.fill(); } ctx.restore(); ctx.fillStyle = 'rgba(79,195,247,.6)'; ctx.beginPath(); ctx.ellipse(560, 1295, 300 * easeOut(sp), 30, 0, 0, 7); ctx.fill(); }
  ctx.save(); ctx.translate(hx, 1290 - 40); ctx.rotate(t > hitT ? Math.min(1.4, (t - hitT) * 6) : 0); figure(0, -122 * .32 + 40, .32, { seed: 11, mouth: 'o', look: [1, -1.5], pose: { armL: [-2.6, -2.9], armR: [2.6, 2.9] } }); ctx.restore();
  stamp('WRECKING BALL', 540, 380, prog(t, hitT, hitT + .3), '#3D5A80', 96);
};
// 4: here's where it gets weird
S[4] = (t, p, d) => {
  ctx.fillStyle = '#6C63FF'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(540, 900); ctx.rotate(T * .8); for (let i = 0; i < 12; i++) { ctx.rotate(Math.PI / 6); ctx.fillStyle = i % 2 ? '#7B73FF' : '#5A52E0'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-300, -1400); ctx.lineTo(300, -1400); ctx.fill(); } ctx.restore();
  figure(540, 1100, 1.8, { seed: 11, mouth: 'o', look: [0, 0], pose: { armL: [-.6, -2.2], armR: [.4, .2] } });
  text('?', 800, 520, 260 * easeBack(prog(p, .1, .4)), { color: '#FFB703', stroke: INK, sw: 14 });
};
// 5: falling is less deadly: air resistance
S[5] = (t, p, d) => {
  ctx.fillStyle = '#E8F6FF'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#C9A27E'; ctx.fillRect(0, 1450, W, H - 1450);
  box(-20, 300, 520, 50, 8, '#8D6E63'); box(380, 350, 50, 1100, 6, '#6D4C41');
  const k = prog(p, .08, .85), fy = lerp(300, 1450, k), fx = lerp(540, 720, k) + Math.sin(t * 3) * 30;
  const landed = k >= 1;
  figure(fx, fy - 122 * .32, .32, { seed: 11, mouth: landed ? 'smile' : 'o', pose: landed ? { armL: [-2.6, -2.9], armR: [.3, .2] } : { armL: [-2.2, -2.6], armR: [2.2, 2.6], legL: [-.5, -.3], legR: [.5, .3] } });
  if (!landed) for (let i = 0; i < 5; i++) { const x = fx - 120 + i * 60, yy = fy + 30 + ((T * 260 + i * 37) % 100); inkPath([[x, yy + 60], [x, yy]], { w: 6, color: '#4FA3E0' }); inkPath([[x - 14, yy + 16], [x, yy], [x + 14, yy + 16]], { w: 6, color: '#4FA3E0' }); }
  ctx.save(); ctx.fillStyle = INK; rrect(560, 420, 460, 210, 30); ctx.fill(); ctx.restore(); text('AIR RESISTANCE', 790, 480, 44, { color: '#FFB703' }); text('slows you down', 790, 560, 42, { color: '#fff', weight: 800 });
  if (landed) text('SAFE!', 720, 1180, 80, { color: '#2A9D8F', stroke: '#fff', sw: 10 });
};
// 6: sounds helpful, right?
S[6] = (t, p, d) => {
  ctx.fillStyle = '#B4F8C8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, 1290, W, H - 1290);
  figure(540, 1290 - 122 * 1.8, 1.8, { seed: 11, mouth: 'smile', pose: { armL: [-.4, -.2], armR: [2.4, 3.0] } });
  const k = easeBack(prog(p, .1, .4)); ctx.save(); ctx.translate(800, 500); ctx.scale(k, k); ctx.fillStyle = '#2A9D8F'; ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(-10, 45); ctx.lineTo(60, -45); ctx.stroke(); ctx.restore();
};
// 7: the twist: falling isn't the problem
S[7] = (t, p, d) => {
  ctx.fillStyle = '#2B2D42'; ctx.fillRect(0, 0, W, H);
  stamp('THE TWIST', 540, 420, prog(p, 0, .2), '#E63946', 120);
  figure(540, 1290 - 122 * 1.2, 1.2, { seed: 11, mouth: 'o', look: [0, -1] });
  const k = prog(p, .45, .7); if (k > 0) { ctx.save(); ctx.globalAlpha = k; text('THE FALL', 540, 720, 90, { color: '#fff' }); ctx.restore(); inkPath([[300, 720], [780, 720]], { w: 16, color: '#E63946', alpha: k }); }
};
// 8: lose body heat much faster
S[8] = (t, p, d) => {
  ctx.fillStyle = '#DCEFFF'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#C9DCEB'; ctx.fillRect(0, 1290, W, H - 1290);
  const sh = Math.sin(T * 60) * 5;
  ctx.save(); ctx.translate(sh, 0); figure(540, 1290 - 122 * 1.5, 1.5, { seed: 11, mouth: 'flat', pose: { armL: [.6, 2.4], armR: [-.6, -2.4] } }); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#E63946'; ctx.lineWidth = 8; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28, k = (T * .8 + i / 8) % 1, r0 = 180 + k * 260; ctx.globalAlpha = 1 - k; ctx.beginPath(); for (let j = 0; j <= 6; j++) { const rr = r0 + j * 14; ctx.lineTo(540 + Math.cos(a + Math.sin(j + T * 4) * .08) * rr, 960 + Math.sin(a + Math.sin(j + T * 4) * .08) * rr); } ctx.stroke(); } ctx.restore();
  thermo(170, 1100, lerp(.7, .2, prog(p, .1, .9)), 'COLD');
  text('HEAT ESCAPES', 640, 330, 70, { color: '#E63946', stroke: '#fff', sw: 10 });
};
// 9: your voice is too weak
S[9] = (t, p, d) => {
  floorRoom('#FDE2C4', '#C9A27E');
  box(560, 300, 260, 990, 60, '#3D5A80'); box(520, 1200, 380, 110, 40, '#2B2D42');
  figure(260, 1290 - 122 * .32, .32, { seed: 11, mouth: 'o', look: [1, -1], pose: { armL: [-2.5, -2.9], armR: [2.5, 2.9] } });
  for (let i = 0; i < 3; i++) { const k = (T * 1.2 + i / 3) % 1; ctx.save(); ctx.globalAlpha = (1 - k) * .9; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(270, 1215, 20 + k * 120, -.6, .6); ctx.stroke(); ctx.restore(); }
  text('help!', 340, 1110, 30, { color: INK, alpha: .7 });
  text('TOO QUIET', 540, 420, 90, { color: '#E63946', stroke: '#fff', sw: 12, alpha: prog(p, .3, .45) });
};
// 10: dust, puddles, insects
S[10] = (t, p, d) => {
  floorRoom('#FDE2C4', '#C9A27E', 1100);
  const wD = WT(10, /dust/i) - SA(10), wP = WT(10, /puddle/i) - SA(10), wI = WT(10, /insect/i) - SA(10);
  if (t > wP) { ctx.fillStyle = '#4FC3F7'; ctx.beginPath(); ctx.ellipse(300, 1500, 280 * easeOut(prog(t, wP, wP + .4)), 90, 0, 0, 7); ctx.fill(); }
  if (t > wD) dustBall(lerp(1200, 820, easeOut(prog(t, wD, wD + .8))), 1240, 110, -t * 2);
  if (t > wI) ant(lerp(-300, 220, easeOut(prog(t, wI, wI + .8))), 1260, 1.6, 1, t);
  const run = Math.sin(t * 14);
  figure(560, 1300 - 122 * .45, .45, { seed: 11, mouth: 'o', look: [-1, 0], pose: walk(t * 14, 1) });
  for (const [w, lab, x, y] of [[wD, 'DUST', 820, 1000], [wP, 'PUDDLES', 300, 1680], [wI, 'INSECTS', 260, 960]]) if (t > w) stamp(lab, x, y, prog(t, w, w + .25), '#E63946', 64, 0);
  ctx.save(); ctx.fillStyle = INK; rrect(240, 220, 600, 150, 40); ctx.fill(); ctx.restore(); text('DEADLY', 540, 300, 90, { color: '#FF4D6D' });
};
// 11: real science: humans can't shrink like this
S[11] = (t, p, d) => {
  ctx.fillStyle = '#1F4E3D'; ctx.fillRect(0, 0, W, H); box(60, 160, 960, 1300, 20, '#2D6A4F', 14);
  ctx.save(); ctx.fillStyle = '#fff'; rrect(320, 200, 440, 80, 40); ctx.fill(); ctx.restore(); text('REAL SCIENCE', 540, 243, 46, { color: '#1F4E3D' });
  // a grid of cells: each cell already has a size it can't drop below
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const x = 250 + c * 190, y = 440 + r * 190, wob = Math.sin(T * 2 + r + c) * 6; ctx.fillStyle = '#FFB3C6'; ctx.beginPath(); ctx.ellipse(x, y, 80 + wob, 72 - wob, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.stroke(); ctx.fillStyle = '#C9184A'; ctx.beginPath(); ctx.arc(x + 10, y - 6, 22, 0, 7); ctx.fill(); }
  text('your cells', 540, 1240, 50, { color: '#fff', weight: 800 });
  const nx = WT(11, /can't|cant/i) - SA(11); stamp('NOT POSSIBLE', 540, 750, prog(t, nx, nx + .3), '#E63946', 100, -.1);
};
// 12: but if it happened...
S[12] = (t, p, d) => {
  ctx.fillStyle = '#0E2A47'; ctx.fillRect(0, 0, W, H); waves(1250, 16, '#1D5C8C', .6);
  figure(540, 1250 - 122 * .5 - 10, .5, { seed: 11, mouth: 'flat', look: [0, -.4] });
  ctx.save(); const g = ctx.createRadialGradient(540, 1100, 200, 540, 1100, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.6)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
};
// 13: a puddle feels like an ocean
S[13] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H);
  waves(1000, 40, '#4FA3E0', 1); waves(1080, 30, '#3A8FD0', 1.3);
  const by = 1080 + Math.sin(T * 2) * 24, rot = Math.sin(T * 1.6) * .12;
  ctx.save(); ctx.translate(540, by); ctx.rotate(rot); ctx.fillStyle = '#7BC96F'; ctx.beginPath(); ctx.ellipse(0, 0, 220, 50, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#2E7D32'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-200, 0); ctx.lineTo(200, 0); ctx.stroke();
  figure(0, -122 * .9 - 10, .9, { seed: 11, mouth: 'o', look: [Math.sin(T), -.3], pose: { armL: [-1.4, -1.5], armR: [1.4, 1.5] } }); ctx.restore();
  waves(1200, 34, '#2F7FC0', 1.6);
  text('PUDDLE', 300, 700, 64, { color: '#fff', stroke: INK, sw: 12, alpha: prog(p, .3, .45) }); text('= OCEAN', 640, 700, 64, { color: '#FFB703', stroke: INK, sw: 12, alpha: prog(p, .45, .6) });
  stamp('COULD YOU SURVIVE?', 540, 420, prog(p, .6, .8), '#E63946', 76, 0);
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
