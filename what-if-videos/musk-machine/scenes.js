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


// ---------- Silence helpers ----------
function speaker(x, y, s, waves, muted) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-90, -40); ctx.lineTo(-30, -40); ctx.lineTo(40, -100); ctx.lineTo(40, 100); ctx.lineTo(-30, 40); ctx.lineTo(-90, 40); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = INK; ctx.lineWidth = 16; ctx.lineCap = 'round';
  for (let i = 0; i < 3; i++) { if (waves <= i / 3) continue; ctx.globalAlpha = clamp((waves - i / 3) * 3); ctx.beginPath(); ctx.arc(40, 0, 70 + i * 50, -.7, .7); ctx.stroke(); }
  ctx.globalAlpha = 1;
  if (muted > 0) { ctx.strokeStyle = '#E63946'; ctx.lineWidth = 22; const k = easeOut(muted); ctx.beginPath(); ctx.moveTo(-120, -130); ctx.lineTo(-120 + 300 * k, -130 + 260 * k); ctx.stroke(); }
  ctx.restore();
}
function noSign(x, y, r, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(easeBack(k), easeBack(k)); ctx.strokeStyle = '#E63946'; ctx.lineWidth = r * .16; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r * .7, -r * .7); ctx.lineTo(r * .7, r * .7); ctx.stroke(); ctx.restore(); }
function emptyBubble(x, y, w, h, txt, a = 1) { ctx.save(); ctx.globalAlpha = a; box(x - w / 2, y - h / 2, w, h, 40, '#fff', 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(x - 40, y + h / 2 + 4); ctx.lineTo(x - 80, y + h / 2 + 60); ctx.lineTo(x, y + h / 2 + 4); ctx.fill(); ctx.restore(); if (txt) text(txt, x, y + 4, 80, { color: '#ccc', alpha: a }); }
function street(fy = 1290) { ctx.fillStyle = '#8A8FA3'; ctx.fillRect(0, fy, W, H - fy); ctx.fillStyle = '#fff'; for (let x = -((T * 0) % 200); x < W; x += 200) ctx.fillRect(x + 40, fy + 120, 110, 16); }
function ambulance(x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  box(-260, -220, 520, 200, 26, '#fff'); box(150, -150, 120, 130, 20, '#fff'); ctx.fillStyle = '#BDE0FE'; rrect(175, -140, 80, 60, 10); ctx.fill();
  ctx.fillStyle = '#E63946'; ctx.fillRect(-260, -110, 410, 30); ctx.fillRect(-90, -200, 40, 110); ctx.fillRect(-125, -165, 110, 40);
  const on = Math.floor(T * 6) % 2; ctx.fillStyle = on ? '#E63946' : '#4FA3E0'; rrect(-60, -260, 70, 40, 10); ctx.fill(); ctx.fillStyle = on ? '#4FA3E0' : '#E63946'; rrect(20, -260, 70, 40, 10); ctx.fill();
  for (const wx of [-160, 160]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(wx, -10, 50, 0, 7); ctx.fill(); ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.arc(wx, -10, 20, 0, 7); ctx.fill(); }
  ctx.restore();
}
function car(x, y, s, col) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; rrect(-160, -120, 320, 100, 30); ctx.fill(); ctx.fillStyle = col; rrect(-152, -112, 304, 84, 24); ctx.fill(); ctx.fillStyle = col; rrect(-90, -180, 180, 80, 24); ctx.fill(); ctx.fillStyle = '#BDE0FE'; rrect(-70, -165, 140, 50, 12); ctx.fill(); for (const wx of [-95, 95]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(wx, -18, 34, 0, 7); ctx.fill(); } ctx.restore(); }
function plane(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(0, 0, 230, 50, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(-90, 150); ctx.lineTo(-20, 150); ctx.lineTo(60, 0); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-180, -10); ctx.lineTo(-230, -110); ctx.lineTo(-180, -110); ctx.lineTo(-130, -10); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#4FA3E0'; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(-100 + i * 50, -10, 12, 0, 7); ctx.fill(); } ctx.restore(); }
function boomCloud(x, y, R, k) { if (k <= 0) return; const cols = ['#E63946', '#FF8C42', '#FFB703', '#FFF3B0']; for (let j = 0; j < 4; j++) { ctx.fillStyle = cols[j]; const rr = R * (1 - j * .2) * easeOut(k); for (let i = 0; i < 9; i++) { const a = i / 9 * 6.28 + j, wob = 1 + .15 * Math.sin(i * 3 + T * 4); ctx.beginPath(); ctx.arc(x + Math.cos(a) * rr * .55, y + Math.sin(a) * rr * .45, rr * .45 * wob, 0, 7); ctx.fill(); } } }
function cityRow(y, shake = 0, cols = ['#5C6784', '#6E7A99', '#4F5975']) { let x = -20, i = 0; while (x < W) { const w = 120 + (i * 37) % 80, h = 300 + (i * 53) % 320, sx = shake ? Math.sin(T * 50 + i) * shake : 0; ctx.fillStyle = cols[i % 3]; ctx.fillRect(x + sx, y - h, w, h); ctx.fillStyle = 'rgba(255,230,140,.6)'; for (let yy = y - h + 30; yy < y - 30; yy += 60) for (let xx = x + 18; xx < x + w - 25; xx += 36) ctx.fillRect(xx + sx, yy, 16, 26); x += w + 8; i++; } }
const SAa = SA;


// ---------- Simulation helpers ----------
const GREEN = '#39FF88';
function glitch(k) { // displace horizontal slices of what is already drawn + colour bars
  if (k <= 0) return; const n = Math.floor(3 + k * 9);
  for (let i = 0; i < n; i++) { const y = rnd(i * 13 + BOIL * 7) * H, h = 20 + rnd(i * 5 + BOIL) * 120 * k, dx = (rnd(i * 3 + BOIL * 11) - .5) * 160 * k;
    ctx.drawImage(cv, 0, y, W, h, dx, y, W, h);
    ctx.fillStyle = ['rgba(255,0,90,.25)', 'rgba(0,255,200,.25)', 'rgba(57,255,136,.2)'][i % 3]; ctx.fillRect(0, y, W, h * .3); }
}
function codeRain(alpha = 1, speed = 1) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.font = "700 34px 'DejaVu Sans Mono'"; ctx.textAlign = 'center';
  for (let c = 0; c < 22; c++) { const x = 25 + c * 49, sp = 300 + rnd(c * 7.3) * 400, off = rnd(c * 3.1) * H;
    for (let j = 0; j < 18; j++) { const y = ((off + T * sp * speed) % (H + 600)) - 600 + j * 42; if (y < -40 || y > H + 40) continue;
      ctx.fillStyle = j === 17 ? '#CCFFE0' : `rgba(57,255,136,${j / 18})`; ctx.fillText(rnd(c * 31 + j + Math.floor(T * 8)) > .5 ? '1' : '0', x, y); } }
  ctx.restore();
}
function codePanel(x, y, w, lines, hi = -1, a = 1) {
  const h = 40 + lines.length * 62; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#0D1117'; rrect(x, y, w, h, 24); ctx.fill(); ctx.fillStyle = '#21262D'; rrect(x, y, w, 46, 24); ctx.fill(); ctx.fillRect(x, y + 24, w, 22);
  for (const [i, c] of ['#FF5F56', '#FFBD2E', '#27C93F'].entries()) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x + 32 + i * 34, y + 23, 10, 0, 7); ctx.fill(); }
  lines.forEach((l, i) => { if (i === hi) { ctx.fillStyle = 'rgba(57,255,136,.18)'; ctx.fillRect(x + 8, y + 62 + i * 62, w - 16, 56); } text(l, x + 30, y + 92 + i * 62, 40, { align: 'left', color: i === hi ? GREEN : '#C9D1D9', font: "'DejaVu Sans Mono'", weight: 700 }); });
  ctx.restore(); return h;
}
function wireEarth(x, y, R, k) {
  earth(x, y, R, false);
  ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#04140B'; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill(); ctx.strokeStyle = GREEN; ctx.lineWidth = 4;
  for (let i = -4; i <= 4; i++) { ctx.beginPath(); ctx.ellipse(x, y, R, Math.abs(i) * R / 4.5 + 1, 0, 0, 7); ctx.stroke(); }
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(x, y, Math.abs(Math.cos(i / 8 * Math.PI + T * .5)) * R, R, 0, 0, 7); ctx.stroke(); }
  ctx.restore();
}
function popup(x, y, w, title, msg, a = 1, col = '#E63946') { ctx.save(); ctx.globalAlpha = a; box(x, y, w, 220, 20, '#F1F3F8', 7); ctx.fillStyle = col; rrect(x, y, w, 60, 20); ctx.fill(); ctx.fillRect(x, y + 30, w, 30); ctx.restore(); text(title, x + w / 2, y + 32, 34, { color: '#fff', alpha: a }); text(msg, x + w / 2, y + 140, 42, { color: INK, alpha: a, weight: 800 }); }
function cursor(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.lineTo(30, 92); ctx.lineTo(52, 140); ctx.lineTo(72, 130); ctx.lineTo(50, 84); ctx.lineTo(90, 84); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
function park() { ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); cloudShape(250, 420, 200, 70, '#fff'); cloudShape(820, 560, 160, 60, '#fff'); hills(false); tree(190, 1290, 1.1, 0); }


// ---------- Ocean helpers ----------
const SEA = '#2F8FD8', SEA2 = '#1E6FB8';
function waterSheet(yTop, yBot, x0 = -20, x1 = W + 20, col = SEA) { // a floating slab of water with wavy edges
  ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x0, yBot);
  for (let x = x0; x <= x1; x += 20) ctx.lineTo(x, yBot + Math.sin(x * .02 + T * 3) * 16);
  for (let x = x1; x >= x0; x -= 20) ctx.lineTo(x, yTop + Math.sin(x * .015 + T * 2) * 12);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.25)'; for (let i = 0; i < 6; i++) ctx.fillRect(((i * 190 + T * 60) % (W + 200)) - 100, yTop + 30 + (i % 3) * ((yBot - yTop) / 4), 110, 8);
}
function risingDrops(y0, y1, n = 24, sp = 260) { ctx.fillStyle = '#7CC6F5'; for (let i = 0; i < n; i++) { const x = rnd(i * 4.3) * W, y = y0 - ((rnd(i * 7.1) * (y0 - y1) + T * sp) % (y0 - y1)); ctx.beginPath(); ctx.ellipse(x, y, 10, 16, 0, 0, 7); ctx.fill(); } }
function fish(x, y, s, col, flop) { ctx.save(); ctx.translate(x, y); ctx.rotate(flop); ctx.scale(s, s); ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, 66, 36, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(50, 0); ctx.lineTo(100, -36); ctx.lineTo(100, 36); ctx.fill();
  ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(0, 0, 60, 30, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(54, 0); ctx.lineTo(94, -28); ctx.lineTo(94, 28); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-34, -6, 11, 0, 7); ctx.fill(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(-36, -6, 5, 0, 7); ctx.fill(); ctx.restore(); }
function ship(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  box(-80, -300, 160, 140, 10, '#fff'); box(-60, -380, 50, 90, 6, '#E63946'); box(10, -380, 50, 90, 6, '#E63946');
  ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-330, -170); ctx.lineTo(330, -170); ctx.lineTo(250, 0); ctx.lineTo(-250, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#E63946'; ctx.beginPath(); ctx.moveTo(-320, -162); ctx.lineTo(320, -162); ctx.lineTo(244, -8); ctx.lineTo(-244, -8); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#fff'; ctx.fillRect(-300, -150, 600, 26);
  ctx.fillStyle = '#BDE0FE'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-60 + i * 40, -235, 12, 0, 7); ctx.fill(); } ctx.restore(); }
function seabed(y) { ctx.fillStyle = '#C9A27E'; ctx.fillRect(0, y, W, H - y); ctx.strokeStyle = 'rgba(90,60,30,.55)'; ctx.lineWidth = 6; for (let i = 0; i < 9; i++) { const x = 60 + i * 120, yy = y + 60 + (i % 3) * 90; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + 40, yy + 30); ctx.lineTo(x + 10, yy + 70); ctx.stroke(); } }
function dryEarth(x, y, R, k) { earth(x, y, R, false); ctx.save(); ctx.globalAlpha = k; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.clip(); ctx.fillStyle = '#C9A27E'; ctx.fillRect(x - R, y - R, 2 * R, 2 * R); ctx.fillStyle = '#8D6E63'; for (const [dx, dy, r] of [[-.3, -.2, .35], [.35, .25, .3], [.1, -.55, .2]]) { ctx.beginPath(); ctx.arc(x + (dx + (T * .05 % 2)) * R, y + dy * R, r * R, 0, 7); ctx.fill(); } ctx.restore(); }
function arrow(x0, y0, x1, y1, col, w = 18) { const a = Math.atan2(y1 - y0, x1 - x0); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(a) * w * 1.5, y1 - Math.sin(a) * w * 1.5); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - Math.cos(a - .5) * w * 3, y1 - Math.sin(a - .5) * w * 3); ctx.lineTo(x1 - Math.cos(a + .5) * w * 3, y1 - Math.sin(a + .5) * w * 3); ctx.closePath(); ctx.fill(); }


// ---------- Machine helpers ----------
const SLOTS = ['brain', 'server', 'posts', 'car', 'robot', 'chip', 'solar', 'rocket', 'sat', 'neural'];
const SLOT_AT = [1, 2, 3, 4, 5, 7, 8, 9, 9, 13];  // scene index where each piece joins
function brainIcon(x, y, s, glow) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (glow) { ctx.shadowColor = '#FF8FAB'; ctx.shadowBlur = 40; }
  ctx.fillStyle = INK; for (const [dx, dy, r] of [[-60, -30, 74], [10, -60, 80], [70, -10, 70], [-30, 40, 70], [50, 50, 64]]) { ctx.beginPath(); ctx.arc(dx, dy, r + 8, 0, 7); ctx.fill(); }
  ctx.shadowBlur = 0; ctx.fillStyle = '#FF8FAB'; for (const [dx, dy, r] of [[-60, -30, 74], [10, -60, 80], [70, -10, 70], [-30, 40, 70], [50, 50, 64]]) { ctx.beginPath(); ctx.arc(dx, dy, r, 0, 7); ctx.fill(); }
  ctx.strokeStyle = '#C9184A'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-90, -20); ctx.quadraticCurveTo(-30, -80, 20, -20); ctx.quadraticCurveTo(60, 30, 110, -10); ctx.moveTo(-60, 50); ctx.quadraticCurveTo(0, 10, 60, 70); ctx.stroke();
  ctx.fillStyle = '#39FF88'; for (let i = 0; i < 6; i++) { const a = T * 2 + i; ctx.beginPath(); ctx.arc(Math.cos(a) * 70, Math.sin(a * 1.3) * 50, 8, 0, 7); ctx.fill(); } ctx.restore(); }
function rack(x, y, w, h) { box(x, y, w, h, 10, '#2B2D42', 6); for (let j = 0; j < Math.floor(h / 50); j++) { ctx.fillStyle = '#3A3D5C'; ctx.fillRect(x + 12, y + 14 + j * 50, w - 24, 34); for (let k = 0; k < 4; k++) { ctx.fillStyle = rnd(j * 7 + k + x + Math.floor(T * 6)) > .4 ? '#39FF88' : '#1B5E3A'; ctx.beginPath(); ctx.arc(x + 30 + k * 22, y + 31 + j * 50, 6, 0, 7); ctx.fill(); } } }
function postCard(x, y, s, n) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-220, -70, 440, 140, 24, '#fff', 6); ctx.fillStyle = ['#4FA3E0', '#FF8FAB', '#7BC96F', '#FFB703'][n % 4]; ctx.beginPath(); ctx.arc(-160, 0, 36, 0, 7); ctx.fill(); ctx.fillStyle = '#ccc'; rrect(-100, -30, 260 - (n % 3) * 50, 20, 10); ctx.fill(); rrect(-100, 10, 200 - (n % 2) * 60, 20, 10); ctx.fill(); ctx.restore(); }
function chipIcon(x, y, s, col = '#3D5A80') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = INK; ctx.lineWidth = 10; for (let i = 0; i < 4; i++) for (const sd of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-60 + i * 40, sd * 90); ctx.lineTo(-60 + i * 40, sd * 130); ctx.stroke(); ctx.beginPath(); ctx.moveTo(sd * 90, -60 + i * 40); ctx.lineTo(sd * 130, -60 + i * 40); ctx.stroke(); } box(-95, -95, 190, 190, 20, col, 8); box(-45, -45, 90, 90, 10, '#39FF88', 0); ctx.restore(); }
function solarPanel(x, y, s, rot = -.25) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); box(-150, -90, 300, 180, 8, '#1D3557', 7); ctx.strokeStyle = '#4FA3E0'; ctx.lineWidth = 4; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-150 + i * 75, -90); ctx.lineTo(-150 + i * 75, 90); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-150, 0); ctx.lineTo(150, 0); ctx.stroke(); ctx.restore(); }
function battery(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-90, -160, 180, 320, 20, '#F1F3F8', 7); box(-40, -190, 80, 40, 8, '#F1F3F8', 6); const lv = .5 + .4 * Math.sin(T * 2); box(-70, 140 - 280 * lv, 140, 280 * lv, 12, '#7BC96F', 0); ctx.fillStyle = YEL; ctx.beginPath(); ctx.moveTo(10, -80); ctx.lineTo(-30, 10); ctx.lineTo(0, 10); ctx.lineTo(-10, 80); ctx.lineTo(40, -10); ctx.lineTo(10, -10); ctx.closePath(); ctx.fill(); ctx.restore(); }
function rocket(x, y, s, flame) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (flame) { for (let i = 0; i < 3; i++) { ctx.fillStyle = ['#E63946', '#FF8C42', '#FFE066'][i]; ctx.beginPath(); ctx.moveTo(-50 + i * 15, 230); ctx.quadraticCurveTo(0, 420 - i * 60 + Math.sin(T * 30) * 20, 50 - i * 15, 230); ctx.fill(); } }
  box(-60, -260, 120, 490, 50, '#D9DEE7', 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-68, -200); ctx.quadraticCurveTo(0, -360, 68, -200); ctx.fill(); ctx.fillStyle = '#D9DEE7'; ctx.beginPath(); ctx.moveTo(-60, -205); ctx.quadraticCurveTo(0, -345, 60, -205); ctx.fill();
  for (const sd of [-1, 1]) { ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(sd * 60, 110); ctx.lineTo(sd * 120, 220); ctx.lineTo(sd * 60, 210); ctx.fill(); } dot(0, -120, 26, '#4FA3E0'); ctx.restore(); }
function satellite(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); box(-30, -30, 60, 60, 8, '#D9DEE7', 5); solarPanel(-110, 0, .45, 0); solarPanel(110, 0, .45, 0); ctx.restore(); }
function humanoid(x, gy, s, o = {}) { const F = figure(x, gy - 122 * s, s, { scarf: false, seed: 41, mouth: 'flat', ...o }); const [hx, hy] = F.head; ctx.fillStyle = '#D9DEE7'; ctx.beginPath(); ctx.arc(hx, hy, F.r + 2, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 6; ctx.stroke(); ctx.fillStyle = '#111'; rrect(hx - F.r * .7, hy - F.r * .25, F.r * 1.4, F.r * .5, F.r * .25); ctx.fill(); ctx.fillStyle = '#39FF88'; ctx.fillRect(hx - F.r * .5 + ((T * 60) % (F.r)), hy - 4, F.r * .3, 8); return F; }
function slotIcon(k, x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (k === 'brain') brainIcon(0, 0, .5); if (k === 'server') rack(-40, -60, 80, 120); if (k === 'posts') postCard(0, 0, .35, 0); if (k === 'car') car(0, 40, .4, '#E63946');
  if (k === 'robot') { ctx.fillStyle = '#D9DEE7'; ctx.beginPath(); ctx.arc(0, 0, 50, 0, 7); ctx.fill(); ctx.fillStyle = '#111'; rrect(-35, -12, 70, 24, 12); ctx.fill(); } if (k === 'chip') chipIcon(0, 0, .4); if (k === 'solar') solarPanel(0, 0, .4); if (k === 'rocket') rocket(0, 20, .25, false); if (k === 'sat') satellite(0, 0, .5);
  if (k === 'neural') { ctx.fillStyle = '#E9ECF2'; ctx.beginPath(); ctx.arc(0, 0, 50, 0, 7); ctx.fill(); dot(0, -10, 14, '#6C63FF'); } ctx.restore(); }
function machineHUD(sceneIdx, lt) { // the "one machine" progress panel at the top
  ctx.save(); ctx.fillStyle = 'rgba(20,20,30,.82)'; rrect(40, 120, 1000, 150, 34); ctx.fill(); ctx.restore();
  for (let i = 0; i < 10; i++) { const x = 100 + i * 98, y = 195, on = sceneIdx > SLOT_AT[i] || (sceneIdx === SLOT_AT[i] && lt > .5);
    ctx.save(); ctx.strokeStyle = on ? '#39FF88' : 'rgba(255,255,255,.25)'; ctx.lineWidth = 4; ctx.setLineDash(on ? [] : [8, 6]); rrect(x - 42, y - 42, 84, 84, 16); ctx.stroke(); ctx.restore();
    if (on) { const k = sceneIdx === SLOT_AT[i] ? easeBack(prog(lt, .5, .9)) : 1; ctx.save(); ctx.beginPath(); rrect(x - 40, y - 40, 80, 80, 14); ctx.clip(); ctx.fillStyle = '#F1F3F8'; ctx.fillRect(x - 40, y - 40, 80, 80); slotIcon(SLOTS[i], x, y, .9 * k); ctx.restore(); } }
  text('THE MACHINE', 540, 100, 30, { color: '#fff', stroke: INK, sw: 8 });
}
function factoryM(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-260, -240, 520, 240, 6, '#B0B7C6', 7); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-260, -240); for (let i = 0; i < 4; i++) { ctx.lineTo(-260 + i * 130, -320); ctx.lineTo(-130 + i * 130, -240); } ctx.fill(); box(160, -460, 60, 220, 4, '#8A8FA3', 6); for (let i = 0; i < 3; i++) cloudShape(190 + i * 30, -500 - i * 60 - (T * 30) % 50, 80, 36, 'rgba(200,200,210,.85)'); ctx.restore(); }
function sunM(x, y, r) { ctx.save(); ctx.shadowColor = '#FFB703'; ctx.shadowBlur = 80; ctx.fillStyle = '#FFD23F'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); ctx.fillStyle = '#FFE066'; ctx.beginPath(); ctx.arc(x, y, r * .8, 0, 7); ctx.fill(); }

// ---------- scenes ----------
const S = [];
S[0] = (t, p, d) => { // one giant machine?
  ctx.fillStyle = '#1B1B2F'; ctx.fillRect(0, 0, W, H);
  const k = ease(prog(p, .05, .9)); ctx.save(); ctx.translate(540, 900); ctx.rotate(T * .4); ctx.fillStyle = '#3A3D5C'; for (let i = 0; i < 10; i++) { ctx.rotate(Math.PI / 5); ctx.fillRect(-40, -330, 80, 70); } ctx.beginPath(); ctx.arc(0, 0, 280, 0, 7); ctx.fill(); ctx.fillStyle = '#1B1B2F'; ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28 - Math.PI / 2, r = lerp(700, 420, k); const x = 540 + Math.cos(a) * r, y = 900 + Math.sin(a) * r * .9; ctx.save(); ctx.globalAlpha = k; box(x - 60, y - 60, 120, 120, 22, '#F1F3F8', 5); slotIcon(SLOTS[i], x, y, 1.1); ctx.restore(); }
  text('?', 540, 920, 200, { color: '#FFB703' });
};
S[1] = (t, p, d) => { ctx.fillStyle = '#2B2D42'; ctx.fillRect(0, 0, W, H); brainIcon(540, 860, 2.1 * easeBack(prog(t, 0, .5)), true); pillP(540, 1260, 'GROK  ·  by xAI', '#6C63FF', 60); machineHUD(1, t); };
function pillP(x, y, txt, col, size = 50) { ctx.save(); ctx.font = `900 ${size}px 'Inter Display'`; const w = ctx.measureText(txt).width + size * 1.4; ctx.fillStyle = col; rrect(x - w / 2, y - size * .8, w, size * 1.6, size * .8); ctx.fill(); ctx.restore(); text(txt, x, y + 3, size, { color: '#fff' }); }
S[2] = (t, p, d) => { ctx.fillStyle = '#0D1117'; ctx.fillRect(0, 0, W, H);
  for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) rack(70 + i * 195, 520 + r * 470, 160, 400);
  const dw = WT(2, /122/) - SA(2), n = t > dw - .6 ? Math.min(122, Math.round(122 * ease(prog(t, dw - .6, dw + .3)))) : 0;
  ctx.save(); ctx.fillStyle = INK; rrect(240, 330, 600, 150, 34); ctx.fill(); ctx.restore(); text(n + ' DAYS', 540, 408, 90, { color: '#39FF88', font: "'DejaVu Sans Mono'", weight: 700 });
  pillP(540, 1460, 'COLOSSUS', '#3D5A80', 56); machineHUD(2, t); };
S[3] = (t, p, d) => { ctx.fillStyle = '#E8F1FB'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 9; i++) { const y = ((i * 190 - t * 420) % 1710 + 1710) % 1710 + 300; postCard(540 + (i % 2 ? 90 : -90), y, 1.1, i); }
  ctx.save(); ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(540, 1420, 120, 0, 7); ctx.fill(); ctx.restore(); text('X', 540, 1426, 140, { color: '#fff' }); machineHUD(3, t); };
S[4] = (t, p, d) => { ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); hills(false); ctx.fillStyle = '#8A8FA3'; ctx.fillRect(0, 1120, W, 300); ctx.fillStyle = '#fff'; for (let x = -((t * 400) % 240); x < W; x += 240) ctx.fillRect(x, 1262, 130, 16);
  for (const [x0, y, col] of [[200, 1240, '#E63946'], [760, 1400, '#4FA3E0']]) { const x = ((x0 + t * 160) % (W + 400)) - 200; ctx.save(); ctx.fillStyle = 'rgba(255,230,120,.35)'; ctx.beginPath(); ctx.moveTo(x + 150, y - 90); ctx.lineTo(x + 460, y - 200); ctx.lineTo(x + 460, y + 20); ctx.fill(); ctx.restore(); car(x, y, 1.1, col); }
  for (let i = 0; i < 4; i++) { const k = (t * .7 + i / 4) % 1; ctx.save(); ctx.globalAlpha = 1 - k; box(lerp(500, 820, k), lerp(980, 400, k), 140, 100, 10, '#111', 5); ctx.restore(); }
  pillP(540, 820, 'VIDEO OF REAL ROADS', '#2A9D8F', 50); machineHUD(4, t); };
S[5] = (t, p, d) => { ctx.fillStyle = '#F1F3F8'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#CFD8E3'; ctx.fillRect(0, 1300, W, H);
  const lift = Math.sin(t * 2) * .5 + .5; const F = humanoid(540, 1300, 1.9, { pose: { armL: [-1.1 - lift * .4, -1.5 - lift * .4], armR: [1.1 + lift * .4, 1.5 + lift * .4] } });
  box(400, 900 - lift * 120, 280, 200, 10, '#C9A27E', 6); pillP(540, 520, 'OPTIMUS', '#3D5A80', 60); text('learning the physical world', 540, 640, 46, { color: INK, weight: 800 }); machineHUD(5, t); };
S[6] = (t, p, d) => { ctx.fillStyle = '#2B0A0F'; ctx.fillRect(0, 0, W, H); const sh = Math.sin(T * 30) * 6;
  brainIcon(540 + sh, 760, 1.6, true);
  const L = [[/chips/i, 'chip'], [/power/i, 'power'], [/cooling/i, 'cool']]; L.forEach(([re, k], i) => { const w = WT(6, re) - SA(6); if (t < w - .1) return; const x = 220 + i * 320; ctx.save(); ctx.translate(x, 1200); ctx.scale(easeBack(prog(t, w - .1, w + .2)), easeBack(prog(t, w - .1, w + .2)));
    box(-130, -130, 260, 260, 40, '#F1F3F8', 7); if (k === 'chip') chipIcon(0, 0, .55); if (k === 'power') { ctx.fillStyle = YEL; ctx.beginPath(); ctx.moveTo(20, -90); ctx.lineTo(-50, 15); ctx.lineTo(0, 15); ctx.lineTo(-20, 95); ctx.lineTo(60, -20); ctx.lineTo(10, -20); ctx.closePath(); ctx.fill(); } if (k === 'cool') { ctx.strokeStyle = '#4FA3E0'; ctx.lineWidth = 14; ctx.lineCap = 'round'; for (let j = 0; j < 3; j++) { ctx.beginPath(); const a = j * Math.PI / 3; ctx.moveTo(Math.cos(a) * 80, Math.sin(a) * 80); ctx.lineTo(-Math.cos(a) * 80, -Math.sin(a) * 80); ctx.stroke(); } } ctx.restore(); });
  stamp('HUNGRY', 540, 420, prog(t, WT(6, /hungry/i) - SA(6) - .1, WT(6, /hungry/i) - SA(6) + .2), '#E63946', 120); machineHUD(6, t); };
S[7] = (t, p, d) => { ctx.fillStyle = '#E8F6FF'; ctx.fillRect(0, 0, W, H); hills(false); factoryM(540, 1330, 1.5); chipIcon(540, 760, 1.1 + .05 * Math.sin(T * 3));
  pillP(540, 470, 'A GIANT CHIP FACTORY?', '#3D5A80', 50); text('(an idea Musk has floated)', 540, 580, 40, { color: '#555', weight: 800 }); machineHUD(7, t); };
S[8] = (t, p, d) => { ctx.fillStyle = '#FFE0A3'; ctx.fillRect(0, 0, W, H); sunM(860, 420, 110); hills(false);
  for (let i = 0; i < 3; i++) solarPanel(230 + i * 300, 1050 + (i % 2) * 40, 1); for (let i = 0; i < 3; i++) battery(260 + i * 280, 1500, .7);
  pillP(540, 760, 'TESLA ENERGY', '#2A9D8F', 56); machineHUD(8, t); };
S[9] = (t, p, d) => { const st = WT(9, /starlink/i) - SA(9);
  if (t < st - .2) { ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); hills(false); const k = ease(prog(t, .3, st)); rocket(540, lerp(1150, 500, k), 1.2, true); pillP(540, 360, 'SPACEX', '#2B2D42', 60); }
  else { space(); earth(540, 980, 300, false); const n = Math.min(24, Math.floor(prog(t, st - .2, st + 1.5) * 24)); for (let i = 0; i < n; i++) { const a = i / 24 * 6.28 + T * .25, r = 380 + (i % 3) * 40; satellite(540 + Math.cos(a) * r, 980 + Math.sin(a) * r * .55, .35, a); } pillP(540, 440, 'STARLINK', '#4FA3E0', 60); }
  machineHUD(9, t); };
S[10] = (t, p, d) => { ctx.fillStyle = '#0B0A1F'; ctx.fillRect(0, 0, W, H); stamp('THE TWIST', 540, 900, prog(p, 0, .3), '#E63946', 130); };
S[11] = (t, p, d) => { space(); sunM(-40, 900, 300);
  ctx.save(); const g = ctx.createLinearGradient(0, 0, W, 0); g.addColorStop(0, 'rgba(255,210,80,.35)'); g.addColorStop(1, 'rgba(255,210,80,0)'); ctx.fillStyle = g; ctx.fillRect(0, 500, W, 800); ctx.restore();
  const k = prog(p, .45, 1); for (let i = 0; i < 5; i++) { const y = 560 + i * 170, x = 640 + Math.sin(T + i) * 30; ctx.save(); ctx.globalAlpha = prog(k, i * .15, i * .15 + .3); solarPanel(x - 150, y, .6, 0); rack(x - 40, y - 60, 90, 120); solarPanel(x + 170, y, .6, 0); ctx.restore(); }
  const w1 = WT(11, /never/i) - SA(11), w2 = WT(11, /cold/i) - SA(11); if (t > w1) pillP(540, 360, 'SUNLIGHT NEVER STOPS', '#FFB703', 46); if (t > w2) pillP(540, 1450, 'COLD IS FREE', '#4FA3E0', 46); machineHUD(11, t); };
S[12] = (t, p, d) => { space(); sunM(540, 1480, 180);
  const w1 = WT(12, /rocket/i) - SA(12), w2 = WT(12, /starlink/i) - SA(12), w3 = WT(12, /sun/i) - SA(12);
  if (t > w1 - .2) { const k = ease(prog(t, w1 - .2, w2)); rocket(300, lerp(1300, 700, k), .7, true); rack(260, lerp(1300, 700, k) - 420, 80, 110); }
  if (t > w2 - .2) { satellite(800, 620, .8, Math.sin(T) * .2); ctx.save(); ctx.strokeStyle = '#39FF88'; ctx.lineWidth = 6; ctx.setLineDash([16, 12]); ctx.lineDashOffset = -T * 60; ctx.beginPath(); ctx.moveTo(380, 600); ctx.lineTo(720, 620); ctx.stroke(); ctx.restore(); }
  if (t > w3 - .2) { ctx.save(); ctx.strokeStyle = 'rgba(255,210,80,.8)'; ctx.lineWidth = 10; for (const x of [320, 800]) { ctx.beginPath(); ctx.moveTo(540, 1320); ctx.lineTo(x, 760); ctx.stroke(); } ctx.restore(); }
  [[w1, 'CARRY', 300, 1040], [w2, 'CONNECT', 800, 440], [w3, 'FEED', 540, 1260]].forEach(([w, lab, x, y]) => { if (t > w) pillP(x, y, lab, '#6C63FF', 44); }); machineHUD(12, t); };
S[13] = (t, p, d) => { ctx.fillStyle = '#F1F3F8'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.fillStyle = '#FFD3B5'; ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(420, 820, 260, 300, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
  ctx.fillStyle = '#4A2C2A'; ctx.beginPath(); ctx.ellipse(420, 640, 250, 140, 0, Math.PI, 0); ctx.fill(); dot(330, 820, 18, INK); dot(510, 820, 18, INK);
  const k = easeBack(prog(p, .2, .4)); ctx.save(); ctx.translate(420, 560); ctx.scale(k, k); dot(0, 0, 34, '#6C63FF'); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#6C63FF'; ctx.lineWidth = 8; ctx.setLineDash([18, 12]); ctx.lineDashOffset = -T * 50; ctx.beginPath(); ctx.moveTo(450, 560); ctx.quadraticCurveTo(700, 380, 780, 700); ctx.stroke(); ctx.restore();
  box(660, 700, 300, 220, 14, '#111', 7); ctx.fillStyle = '#39FF88'; for (let i = 0; i < 4; i++) ctx.fillRect(690, 730 + i * 44, 80 + rnd(i + BOIL) * 150, 16);
  pillP(540, 1300, 'NEURALINK', '#6C63FF', 60); text('brain-computer interface', 540, 1420, 44, { color: INK, weight: 800 }); machineHUD(13, t); };
S[14] = (t, p, d) => { space(); sunM(540, 880, 140);
  for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28 + T * .15, x = 540 + Math.cos(a) * 380, y = 880 + Math.sin(a) * 380; ctx.save(); ctx.strokeStyle = 'rgba(57,255,136,.6)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(540, 880); ctx.lineTo(x, y); ctx.stroke(); ctx.restore(); box(x - 60, y - 60, 120, 120, 22, '#F1F3F8', 5); slotIcon(SLOTS[i], x, y, 1.1); }
  const em = WT(14, /empire/i) - SA(14), mc = WT(14, /machine/i) - SA(14);
  if (t > em) pillP(540, 360, 'A BUSINESS EMPIRE?', '#3D5A80', 50); if (t > mc) pillP(540, 1420, 'OR ONE MACHINE?', '#E63946', 56); };
S[15] = (t, p, d) => { ctx.fillStyle = '#1B1B2F'; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 10; i++) { const x = 200 + (i % 3) * 340, y = 420 + Math.floor(i / 3) * 250; if (i === 9) continue; const k = easeBack(prog(p, i * .05, i * .05 + .2)); ctx.save(); ctx.translate(x, y); ctx.scale(k, k); box(-110, -100, 220, 200, 30, '#F1F3F8', 6); slotIcon(SLOTS[i], 0, 0, 1.3); ctx.restore(); }
  const k = easeBack(prog(p, .5, .65)); ctx.save(); ctx.translate(540, 1240); ctx.scale(k, k); box(-110, -100, 220, 200, 30, '#F1F3F8', 6); slotIcon('neural', 0, 0, 1.3); ctx.restore();
  pillP(540, 220, 'WHICH PIECE MATTERS MOST?', '#E63946', 50);
  const f = prog(t, d - .6, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };
