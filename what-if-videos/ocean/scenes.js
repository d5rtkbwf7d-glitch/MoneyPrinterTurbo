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

// ---------- scenes ----------
const S = [];
// 0: the ocean rises into the sky
S[0] = (t, p, d) => {
  ctx.fillStyle = '#FFD6A5'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#FFE066'; ctx.beginPath(); ctx.arc(820, 420, 90, 0, 7); ctx.fill();
  const r = WT(0, /rise/i) - SA(0), k = ease(prog(t, r - .3, d + .4));
  seabed(1300); ctx.fillStyle = '#F4D58D'; ctx.fillRect(0, 1300, W, 140);
  const top = lerp(1000, 250, k); waterSheet(top, top + 300, -20, W + 20); risingDrops(1300, top + 300, 18, 200);
  figure(300, 1420 - 122 * 1.4, 1.4, { seed: 11, mouth: k > .1 ? 'o' : 'flat', look: [.6, -1], pose: k > .1 ? { armL: [-2.6, -2.9], armR: [2.6, 2.9] } : { armL: [-2.9, -3.1], armR: [2.9, 3.1] } });
};
// 1: not a tsunami, not a storm
S[1] = (t, p, d) => {
  ctx.fillStyle = '#F1F3F8'; ctx.fillRect(0, 0, W, H);
  const w1 = WT(1, /tsunami/i) - SA(1), w2 = WT(1, /storm/i) - SA(1);
  if (t > w1 - .1) { ctx.save(); ctx.translate(540, 520); ctx.scale(easeBack(prog(t, w1 - .1, w1 + .2)), easeBack(prog(t, w1 - .1, w1 + .2))); ctx.fillStyle = SEA; ctx.beginPath(); ctx.moveTo(-200, 120); ctx.quadraticCurveTo(-180, -140, 60, -150); ctx.quadraticCurveTo(200, -150, 180, -40); ctx.quadraticCurveTo(80, -90, 40, 0); ctx.quadraticCurveTo(30, 80, 200, 120); ctx.closePath(); ctx.fill(); ctx.restore(); noSign(540, 520, 230, prog(t, w1 + .2, w1 + .45)); }
  if (t > w2 - .1) { ctx.save(); ctx.translate(540, 1120); ctx.scale(easeBack(prog(t, w2 - .1, w2 + .2)), easeBack(prog(t, w2 - .1, w2 + .2))); cloudShape(0, -40, 380, 160, '#5C6784'); ctx.fillStyle = YEL; ctx.beginPath(); ctx.moveTo(0, 20); ctx.lineTo(-50, 120); ctx.lineTo(0, 110); ctx.lineTo(-30, 220); ctx.lineTo(50, 80); ctx.lineTo(10, 90); ctx.closePath(); ctx.fill(); ctx.restore(); noSign(540, 1120, 230, prog(t, w2 + .2, w2 + .45)); }
};
// 2: every ocean floating into space
S[2] = (t, p, d) => {
  space(); const k = prog(p, .1, 1);
  dryEarth(540, 1050, 330, k * .9);
  for (let i = 0; i < 40; i++) { const a = rnd(i * 3.3) * 6.28, sp = .5 + rnd(i * 5.1), dist = 340 + ((rnd(i * 9.7) * 500 + t * 180 * sp) % 700) * k; ctx.fillStyle = i % 3 ? '#4FA3E0' : '#7CC6F5'; ctx.beginPath(); ctx.ellipse(540 + Math.cos(a) * dist, 1050 + Math.sin(a) * dist, 22 * sp, 30 * sp, a + 1.57, 0, 7); ctx.fill(); }
  stamp('INTO SPACE', 540, 330, prog(p, .4, .6), '#2F8FD8', 100);
};
// 3: walls of water above cities
S[3] = (t, p, d) => {
  ctx.fillStyle = '#6E8FB5'; ctx.fillRect(0, 0, W, H);
  const k = ease(prog(p, 0, .6)); waterSheet(lerp(1200, 220, k), lerp(1500, 700, k));
  ctx.save(); ctx.fillStyle = 'rgba(10,40,80,.35)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  cityRow(1350); street(1350); risingDrops(1350, 700, 20, 300);
  figure(540, 1500 - 122 * .7, .7, { seed: 11, mouth: 'o', look: [0, -1.5] });
};
// 4: ships crash onto the ocean floor
S[4] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); waterSheet(80, 300); seabed(1150);
  const k = prog(p, .05, .4), sy = lerp(400, 1240, k * k), rot = lerp(0, .32, easeOut(prog(p, .38, .6)));
  ship(560, sy, 1.15, rot);
  if (p > .38) { const sp = prog(p, .38, .8); ctx.save(); ctx.fillStyle = `rgba(160,120,80,${1 - sp})`; for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI; ctx.beginPath(); ctx.arc(560 + Math.cos(a) * (120 + sp * 300), 1240 + Math.sin(a) * (60 + sp * 160), 40 * (1 - sp) + 10, 0, 7); ctx.fill(); } ctx.restore(); }
};
// 5: billions of sea creatures stranded
S[5] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); waterSheet(80, 260); seabed(900);
  const cols = ['#FF8C42', '#FFB703', '#4FA3E0', '#E86FA0', '#7BC96F'];
  for (let i = 0; i < 11; i++) { const x = 110 + (i % 4) * 280 + (Math.floor(i / 4) % 2) * 130, y = 1050 + Math.floor(i / 4) * 200, fl = Math.sin(T * 9 + i * 2) * .5; fish(x, y - Math.abs(Math.sin(T * 6 + i)) * 40, .9, cols[i % 5], fl); }
  ctx.save(); ctx.fillStyle = INK; rrect(160, 400, 760, 190, 40); ctx.fill(); ctx.restore();
  text(Math.floor(lerp(1e6, 3e9, easeOut(prog(p, .05, .9)))).toLocaleString('en-US'), 540, 465, 76, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 }); text('STRANDED', 540, 540, 44, { color: '#FF8C42' });
};
// 6: here's where it gets terrifying
S[6] = (t, p, d) => {
  ctx.fillStyle = '#3B1F1F'; ctx.fillRect(0, 0, W, H); seabed(1290);
  figure(540, 1290 - 122 * 1.6, 1.6, { seed: 11, mouth: 'flat', look: [0, -1] });
  ctx.save(); const g = ctx.createRadialGradient(540, 1000, 200, 540, 1000, 1000); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
};
// 7: Earth loses its biggest climate regulator
S[7] = (t, p, d) => {
  space(); dryEarth(540, 800, 300, prog(p, 0, .4));
  const cx = 540, cy = 1340; box(cx - 260, cy - 150, 520, 300, 40, '#F1F3F8');
  ctx.strokeStyle = INK; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(cx, cy + 90, 180, Math.PI, 0); ctx.stroke();
  ctx.save(); ctx.strokeStyle = '#4FA3E0'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(cx, cy + 90, 180, Math.PI * 1.35, Math.PI * 1.65); ctx.stroke(); ctx.restore();
  const ang = Math.PI * 1.5 + Math.sin(t * 7) * 1.25 * prog(p, .3, .6); arrow(cx, cy + 90, cx + Math.cos(ang) * 160, cy + 90 + Math.sin(ang) * 160, '#E63946', 12);
  text('CLIMATE REGULATOR', 540, 1130, 50, { color: '#fff' });
};
// 8: rainfall collapses, temperatures extreme, ecosystems die
S[8] = (t, p, d) => {
  ctx.fillStyle = '#FFD89A'; ctx.fillRect(0, 0, W, H); seabed(1400);
  const wr = WT(8, /rain/i) - SA(8), wt = WT(8, /temperat/i) - SA(8), we = WT(8, /ecosystem/i) - SA(8);
  if (t > wr) { const k = easeBack(prog(t, wr, wr + .3)); ctx.save(); ctx.translate(300, 380); ctx.scale(k, k); cloudShape(0, 0, 340, 140, '#B0B7C6'); ctx.fillStyle = '#4FA3E0'; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-60 + i * 60, 140, 10, 16, 0, 0, 7); ctx.fill(); } ctx.restore(); noSign(300, 420, 170, prog(t, wr + .3, wr + .6)); }
  if (t > wt) { const sw = Math.sin((t - wt) * 5); thermo(780, 860, .5 + .45 * sw, sw > 0 ? 'HOT' : 'COLD'); }
  if (t > we) { tree(300, 1400, 1.2, prog(t, we, we + 1.5)); for (let i = 0; i < 6; i++) { const k = ((t - we) * .7 + i / 6) % 1; ctx.save(); ctx.translate(200 + rnd(i * 3) * 250, 900 + k * 500); ctx.rotate(k * 6 + i); ctx.fillStyle = '#C4963C'; ctx.beginPath(); ctx.ellipse(0, 0, 22, 10, 0, 0, 7); ctx.fill(); ctx.restore(); } }
};
// 9: the shocking twist
S[9] = (t, p, d) => { ctx.fillStyle = '#0E2A47'; ctx.fillRect(0, 0, W, H); stamp('THE TWIST', 540, 820, prog(p, 0, .3), '#E63946', 130); };
// 10: gravity keeps the oceans in place
S[10] = (t, p, d) => {
  space(); earth(540, 900, 330, false);
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28 + .2, pul = Math.sin(T * 4 + i) * 12; arrow(540 + Math.cos(a) * (560 + pul), 900 + Math.sin(a) * (560 + pul), 540 + Math.cos(a) * 380, 900 + Math.sin(a) * 380, '#FFB703', 14); }
  text('GRAVITY', 540, 330, 96, { color: '#FFB703' });
  stamp('STAYS PUT', 540, 1450, prog(p, .5, .7), '#2A9D8F', 90, -.05);
};
// 11: you'd need an unimaginable force
S[11] = (t, p, d) => {
  ctx.fillStyle = '#0E2A47'; ctx.fillRect(0, 0, W, H); seabed(1450);
  const lift = Math.sin(t * 3) * 30;
  ctx.fillStyle = SEA; ctx.beginPath(); ctx.ellipse(540, 980 + lift, 300, 160, 0, 0, 7); ctx.fill();
  arrow(540, 760 + lift, 540, 300, '#E63946', 30); text('FORCE ?', 760, 440, 70, { color: '#E63946' });
  for (const x of [380, 700]) arrow(x, 1180 + lift, x, 1400, '#FFB703', 22); text('GRAVITY', 540, 1340, 56, { color: '#FFB703' });
  // power meter maxing out
  box(80, 560, 70, 700, 30, '#21262D', 8); const lv = clamp(prog(p, .2, .8) * 1.05); ctx.save(); ctx.fillStyle = mix([57, 255, 136], [230, 57, 70], lv); rrect(88, 568 + 684 * (1 - lv), 54, 684 * lv, 26); ctx.fill(); ctx.restore();
  if (lv >= 1) text('OFF THE CHARTS', 540, 1560 - 90, 60, { color: '#fff', stroke: INK, sw: 12, alpha: Math.floor(T * 4) % 2 ? 1 : .4 });
};
// 12: so if the oceans really started rising...
S[12] = (t, p, d) => {
  ctx.fillStyle = '#0B0A1F'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 30; i++) { ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.beginPath(); ctx.arc(rnd(i * 4.1) * W, rnd(i * 9.7) * 900, 3, 0, 7); ctx.fill(); }
  waterSheet(lerp(1200, 900, p), lerp(1400, 1150, p), -20, W + 20, SEA2); seabed(1500); risingDrops(1500, 1150, 14, 160);
  figure(540, 1500 - 122 * 1.2, 1.2, { seed: 11, mouth: 'flat', look: [0, -1.4] });
};
// 13: the question isn't where the water goes
S[13] = (t, p, d) => {
  ctx.fillStyle = '#0B0A1F'; ctx.fillRect(0, 0, W, H);
  ctx.save(); const g = ctx.createLinearGradient(0, H, 0, 0); g.addColorStop(0, 'rgba(47,143,216,.9)'); g.addColorStop(1, 'rgba(47,143,216,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(380, H); ctx.quadraticCurveTo(540 + Math.sin(T * 2) * 60, 900, 480, 0); ctx.lineTo(600, 0); ctx.quadraticCurveTo(540 + Math.sin(T * 2 + 1) * 60, 900, 700, H); ctx.fill(); ctx.restore();
  risingDrops(H, 0, 30, 400);
  text('WHERE?', 540, 620, 130, { color: '#fff', stroke: INK, sw: 14 });
  const k = prog(p, .55, .75); if (k > 0) inkPath([[290, 620], [lerp(290, 790, k), 620]], { w: 22, color: '#E63946' });
};
// 14: WHAT is powerful enough to take it?
S[14] = (t, p, d) => {
  ctx.fillStyle = '#05040F'; ctx.fillRect(0, 0, W, H);
  const k = ease(prog(p, 0, .5));
  ctx.save(); ctx.globalAlpha = .9; ctx.fillStyle = 'rgba(124,198,245,.35)'; ctx.beginPath(); ctx.moveTo(470, 560); ctx.lineTo(610, 560); ctx.lineTo(900, H); ctx.lineTo(180, H); ctx.fill(); ctx.restore();
  risingDrops(H, 560, 36, 520);
  // something enormous above the clouds: only its shadow and one glowing ring show
  ctx.save(); ctx.translate(540, lerp(-200, 380, k)); ctx.fillStyle = '#12101F'; ctx.beginPath(); ctx.ellipse(0, 0, 640, 220, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = `rgba(124,198,245,${.6 + .4 * Math.sin(T * 3)})`; ctx.lineWidth = 16; ctx.beginPath(); ctx.ellipse(0, 120, 110, 40, 0, 0, 7); ctx.stroke(); ctx.restore();
  cloudShape(200, 640, 340, 110, 'rgba(60,60,80,.9)'); cloudShape(880, 660, 340, 110, 'rgba(60,60,80,.9)');
  const wt = WT(14, /what/i) - SA(14); stamp('WHAT?', 540, 1100, prog(t, wt, wt + .3), '#E63946', 170, 0);
  const f = prog(t, d - .6, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
