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

// ---------- scenes ----------
const S = [];
// 0: every sound vanishes
S[0] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); cityRow(1290, 0, ['#B8C5E0', '#A7B6D6', '#C3CEE6']); street();
  const v = WT(0, /vanish/i) - SA(0);
  speaker(540, 650, 1.6, t < v ? .4 + .6 * ((Math.sin(T * 8) + 1) / 2) : 1 - prog(t, v, v + .3), prog(t, v, v + .35));
  if (t > v) stamp('MUTED', 540, 1000, prog(t, v + .1, v + .4), '#E63946', 110);
};
// 1: you scream, nobody hears
S[1] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); cityRow(1290, 0, ['#B8C5E0', '#A7B6D6', '#C3CEE6']); street();
  const F = figure(380, 1290 - 122 * 1.7, 1.7, { seed: 11, mouth: 'o', look: [1, 0], pose: { armL: [-2.6, -2.9], armR: [2.4, 2.9] } });
  emptyBubble(560, 560, 380, 220, 'HELP!', prog(p, .05, .2));
  const k = prog(p, .2, 1); figure(lerp(1200, 760, k), 1290 - 122 * 1.5, 1.5, { scarf: false, seed: 41, look: [-1, 0], mouth: 'flat', pose: walk(t * 8, .9) });
  if (p > .5) text('...', 830, 820, 90, { color: INK, alpha: prog(p, .5, .6) });
};
// 2: no voices, no footsteps, not even your heartbeat
S[2] = (t, p, d) => {
  ctx.fillStyle = '#F1F3F8'; ctx.fillRect(0, 0, W, H);
  const ws = [[/voice/i, 360], [/footstep/i, 760], [/heart/i, 1160]];
  ws.forEach(([re, y], i) => { const w = WT(2, re) - SA(2) - .1; if (t < w) return; const k = easeBack(prog(t, w, w + .3));
    ctx.save(); ctx.translate(340, y); ctx.scale(k, k);
    if (i === 0) { box(-110, -80, 220, 150, 40, '#fff', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-50, 74); ctx.lineTo(-80, 120); ctx.lineTo(-10, 74); ctx.fill(); text('Hi!', 0, -4, 70, { color: INK }); }
    if (i === 1) { ctx.fillStyle = INK; for (const [fx, fy, r] of [[-50, 30, 0], [50, -40, .2]]) { ctx.save(); ctx.translate(fx, fy); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 30, 50, 0, 0, 7); ctx.fill(); for (let j = 0; j < 4; j++) { ctx.beginPath(); ctx.arc(-24 + j * 16, -62 + Math.abs(j - 1.5) * 4, 9, 0, 7); ctx.fill(); } ctx.restore(); } }
    if (i === 2) { heart(0, 10, 4.2, '#E63946'); }
    ctx.restore(); noSign(340, y, 130, prog(t, w + .2, w + .45));
    text(['VOICES', 'FOOTSTEPS', 'HEARTBEAT'][i], 700, y + 4, 70, { color: INK, alpha: k > 0 ? 1 : 0, align: 'center' }); });
};
// 3: at first, peaceful
S[3] = (t, p, d) => {
  ctx.fillStyle = '#CDEBFF'; ctx.fillRect(0, 0, W, H); hills(false);
  for (let i = 0; i < 3; i++) cloudShape(((i * 380 + t * 60) % (W + 300)) - 150, 450 + i * 140, 170, 60, '#fff');
  const by = Math.sin(t * 2) * 10;
  figure(540, 1180 + by, 1.6, { seed: 11, eyes: 'closed', mouth: 'smile', pose: { legL: [-1.4, .9], legR: [1.4, -.9], armL: [-.9, -.2], armR: [.9, .2] } });
  text('ahh...', 540, 760, 70, { color: '#3D5A80', alpha: prog(p, .3, .5) });
};
// 4: within minutes, chaos
S[4] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); cityRow(1290); street();
  if (Math.floor(T * 4) % 2) { ctx.save(); ctx.fillStyle = 'rgba(230,57,70,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  for (const [x0, dir, sd] of [[-200, 1, 21], [1300, -1, 51], [-500, 1, 31]]) { const x = x0 + dir * t * 520; figure(x, 1290 - 122 * 1.3, 1.3, { scarf: false, seed: sd, mouth: 'o', look: [dir, 0], pose: { ...walk(t * 14, 1.2), armL: [-2.5, -2.9], armR: [2.5, 2.9] } }); }
  stamp('CHAOS', 540, 500, prog(p, .2, .4), '#E63946', 140);
};
// 5: ambulances with silent sirens
S[5] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); cityRow(1100); street(1100);
  car(260, 1420, 1, '#FFB703'); car(820, 1440, 1, '#7BC96F');
  ambulance(lerp(1500, 560, easeOut(prog(p, 0, .5))) + Math.sin(T * 30) * 4, 1300, 1.1);
  speaker(540, 520, .9, 0, 1); text('SILENT SIREN', 540, 720, 60, { color: '#E63946', stroke: '#fff', sw: 10 });
};
// 6: planes lose radio, emergency calls useless
S[6] = (t, p, d) => {
  const em = WT(6, /emergency/i) - SA(6);
  if (t < em - .1) {
    ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); for (let i = 0; i < 3; i++) cloudShape(((i * 420 - t * 120) % (W + 400) + W + 400) % (W + 400) - 200, 600 + i * 260, 200, 70, '#fff');
    plane(540, 700 + Math.sin(t * 2) * 30, 1.5, -.08 + Math.sin(t * 1.5) * .05);
    ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 10; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.arc(540, 1250, 60 + i * 60, -2.4, -.7); ctx.stroke(); } ctx.restore(); box(510, 1250, 60, 300, 10, INK, 0); noSign(540, 1150, 170, prog(t, .5, .8));
    text('NO RADIO', 540, 330, 80, { color: '#E63946', stroke: '#fff', sw: 10 });
  } else {
    ctx.fillStyle = '#F1F3F8'; ctx.fillRect(0, 0, W, H); phone(270, 300, 540, 1000);
    text('Calling 911...', 540, 520, 56, { color: INK }); dot(540, 760, 120, '#2A9D8F'); text('AUDIO', 540, 980, 56, { color: '#aaa' });
    noSign(540, 760, 170, prog(t, em + .3, em + .6)); text('USELESS', 540, 1180, 80, { color: '#E63946', alpha: prog(t, em + .5, em + .8) });
  }
};
// 7: animals that rely on sound
S[7] = (t, p, d) => {
  ctx.fillStyle = '#2E2A5A'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.arc(860, 300, 70, 0, 7); ctx.fill();
  const bx = 360 + Math.sin(t * 2) * 60, by = 760 + Math.sin(t * 5) * 40;
  ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.PI); bat(0, 0, 1.3); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#BDE0FE'; ctx.lineWidth = 10; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const k = (T * .9 + i / 3) % 1; ctx.globalAlpha = (1 - k) * (1 - prog(p, .3, .6)); ctx.beginPath(); ctx.arc(bx + 120, by, 50 + k * 250, -.6, .6); ctx.stroke(); } ctx.restore();
  text('ECHOLOCATION', 540, 1100, 64, { color: '#BDE0FE' }); noSign(700, 760, 140, prog(p, .45, .7));
  box(0, 1300, W, 40, 0, '#5C4D7D', 0); owl(820, 1220, .9, true);
};
// 8: here's where it gets terrifying
S[8] = (t, p, d) => {
  ctx.fillStyle = '#1B1B2F'; ctx.fillRect(0, 0, W, H); cityRow(1290, 0, ['#2B2D42', '#33364F', '#25273B']); street();
  figure(540, 1290 - 122 * 1.6, 1.6, { seed: 11, mouth: 'flat', look: [0, -1] });
  ctx.save(); const g = ctx.createRadialGradient(540, 1000, 200, 540, 1000, 1000); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
};
// 9: a massive explosion right in front of you
S[9] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); cityRow(1150); street(1150);
  const ex = WT(9, /explosion/i) - SA(9) - .1; boomCloud(540, 780, 520, prog(t, ex, ex + .7));
  figure(540, 1600 - 122 * 1.5, 1.5, { seed: 11, mouth: t > ex ? 'o' : 'flat', look: [0, -1], pose: t > ex ? { armL: [-2.6, -2.9], armR: [2.6, 2.9] } : {} });
};
// 10: blinding flash, buildings shaking
S[10] = (t, p, d) => {
  const sh = 20 * (1 - p);
  ctx.save(); ctx.translate((rnd(BOIL * 3) - .5) * sh, (rnd(BOIL * 7) - .5) * sh);
  ctx.fillStyle = '#FFE0A3'; ctx.fillRect(-50, -50, W + 100, H + 100); cityRow(1150, 14 * (1 - p)); street(1150); boomCloud(540, 760, 640, 1);
  figure(540, 1600 - 122 * 1.5, 1.5, { seed: 11, eyes: 'closed', mouth: 'o', pose: { armL: [-2.2, -3.3], armR: [2.2, 3.3] } });
  ctx.restore();
  const fl = 1 - prog(t, 0, .9); if (fl > 0) { ctx.save(); ctx.fillStyle = '#fff'; ctx.globalAlpha = fl; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
// 11: but absolutely no sound
S[11] = (t, p, d) => {
  ctx.fillStyle = '#9AA0B5'; ctx.fillRect(0, 0, W, H); cityRow(1150, 0, ['#6E7488', '#7A8096', '#646A7E']); street(1150);
  for (let i = 0; i < 6; i++) cloudShape(200 + i * 140, 700 - i * 40 + Math.sin(t + i) * 10, 260, 110, 'rgba(120,120,130,.85)');
  figure(540, 1600 - 122 * 1.5, 1.5, { seed: 11, mouth: 'o', look: [0, -1] });
  speaker(540, 420, 1, 0, 1); text('0 dB', 540, 620, 80, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
};
// 12: the twist
S[12] = (t, p, d) => { ctx.fillStyle = '#2B2D42'; ctx.fillRect(0, 0, W, H); stamp('THE TWIST', 540, 820, prog(p, 0, .3), '#E63946', 130); };
// 13: inner ear can't detect vibrations
S[13] = (t, p, d) => {
  ctx.fillStyle = '#FFE5EC'; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.fillStyle = '#FFD3B5'; ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.beginPath(); ctx.ellipse(330, 800, 200, 330, 0, -1.6, 1.6); ctx.fill(); ctx.stroke(); ctx.restore();
  inkPath([[420, 790], [600, 790]], { w: 30, color: '#F4A3A3' });
  ctx.save(); ctx.translate(780, 790); ctx.strokeStyle = '#C9184A'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.beginPath(); for (let a = 0; a < 6 * Math.PI; a += .1) { const r = 160 - a * 7.5; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.stroke(); ctx.restore();
  text('INNER EAR', 780, 520, 60, { color: '#C9184A' });
  const stop = prog(p, .35, .55);
  ctx.save(); ctx.strokeStyle = '#4FA3E0'; ctx.lineWidth = 9; for (let i = 0; i < 4; i++) { const k = (T * 1 + i / 4) % 1, x = lerp(40, 560, k); if (x > lerp(560, 140, stop)) continue; ctx.beginPath(); for (let yy = -70; yy <= 70; yy += 10) ctx.lineTo(x + Math.sin(yy * .08 + T * 8) * 10 * (1 - stop), 790 + yy); ctx.stroke(); } ctx.restore();
  noSign(560, 1180, 140, prog(p, .55, .75)); text('NO VIBRATIONS', 560, 1380, 64, { color: INK, alpha: prog(p, .6, .8) });
};
// 14: balance affected
S[14] = (t, p, d) => {
  const tilt = Math.sin(t * 2.2) * .22 * prog(p, 0, .4);
  ctx.save(); ctx.translate(540, 1100); ctx.rotate(tilt); ctx.translate(-540, -1100);
  ctx.fillStyle = '#CDEBFF'; ctx.fillRect(-400, -400, W + 800, H + 800); ctx.fillStyle = '#7BC96F'; ctx.fillRect(-400, 1290, W + 800, H);
  ctx.restore();
  ctx.save(); ctx.translate(540, 1290); ctx.rotate(-tilt * 1.4); figure(0, -122 * 1.7, 1.7, { seed: 11, eyes: 'x', mouth: 'o', pose: { armL: [-1.9, -2.2], armR: [1.4, 1.1], legL: [-.35, -.1], legR: [.25, .4] } }); ctx.restore();
  ctx.save(); ctx.strokeStyle = '#6C63FF'; ctx.lineWidth = 8; ctx.beginPath(); for (let a = 0; a < 4 * Math.PI; a += .1) { const r = 10 + a * 9; ctx.lineTo(540 + Math.cos(a + T * 5) * r, 560 + Math.sin(a + T * 5) * r * .6); } ctx.stroke(); ctx.restore();
  text('BALANCE?', 540, 330, 90, { color: '#6C63FF', stroke: '#fff', sw: 12 });
};
// 15: one planet, 24 hours, absolute silence
S[15] = (t, p, d) => {
  space(); earth(540, 900, 330, false);
  const k = prog(p, .2, 1); ctx.save(); ctx.fillStyle = INK; rrect(290, 220, 500, 140, 34); ctx.fill(); ctx.restore(); text(fmt(24 * 3600 * (1 - k * .02)), 540, 294, 90, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
  speaker(540, 1430, .7, 0, 1);
};
// 16: could humanity survive the quietest day?
S[16] = (t, p, d) => {
  ctx.fillStyle = '#9AA0B5'; ctx.fillRect(0, 0, W, H); cityRow(1290, 0, ['#6E7488', '#7A8096', '#646A7E']); street();
  [[140, 21, 1.1], [330, 41, 1.25], [540, 11, 1.4], [750, 51, 1.25], [940, 31, 1.1]].forEach(([x, sd, sc]) => figure(x, 1290 - 122 * sc, sc, { scarf: sd === 11, seed: sd, mouth: 'flat', look: [0, 0] }));
  stamp('THE QUIETEST DAY', 540, 420, prog(p, .45, .65), '#2B2D42', 84, 0);
  const f = prog(t, d - .6, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
