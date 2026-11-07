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

// ---------- scenes ----------
const S = [];
// 0: what if the Sun never set again?
S[0] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); hills(false);
  bigSun(540, 560, 190, false);
  figure(540, 1330 - 122 * 1.6, 1.6, { seed: 11, look: [0, -1.4], mouth: 'o' });
  ctx.save(); ctx.fillStyle = INK; rrect(330, 150, 420, 120, 30); ctx.fill(); ctx.restore(); text('11:59 PM', 540, 212, 76, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
};
// 1: sounds like paradise
S[1] = (t, p, d) => {
  ctx.fillStyle = '#8ED1FC'; ctx.fillRect(0, 0, W, H); bigSun(830, 380, 130, false);
  ctx.fillStyle = '#4FA3E0'; ctx.fillRect(0, 900, W, 260); ctx.fillStyle = '#FFE0A3'; ctx.fillRect(0, 1150, W, H - 1150);
  box(150, 760, 22, 420, 6, '#8D6E63', 5); ctx.fillStyle = '#7BC96F'; for (let i = 0; i < 5; i++) { ctx.save(); ctx.translate(161, 760); ctx.rotate(-1.4 + i * .7 + Math.sin(T * 2 + i) * .05); ctx.beginPath(); ctx.ellipse(110, 0, 120, 30, 0, 0, 7); ctx.fill(); ctx.restore(); }
  box(560, 1080, 400, 40, 18, '#E63946', 6);
  const F = figure(700, 1080, 1.4, { seed: 11, mouth: 'smile', lean: -30, pose: { legL: [1.5, 1.5], legR: [1.45, 1.6], armL: [-2.6, -2.9], armR: [2.6, 1.4] } }); shades(F);
  stamp('PARADISE?', 540, 520, prog(p, .35, .5), '#2A9D8F', 110, .06);
};
// 2: wrong. a living nightmare
S[2] = (t, p, d) => {
  const k = ease(prog(p, .0, .3)); ctx.fillStyle = mix([142, 209, 252], [255, 140, 66], k); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = mix([123, 201, 111], [196, 150, 60], k); ctx.fillRect(0, 1250, W, H - 1250);
  bigSun(540, 500, lerp(130, 230, k), k > .5); heatWaves(1240, .3 * k);
  const F = figure(540, 1250 - 122 * 1.6, 1.6, { seed: 11, mouth: k > .5 ? 'sad' : 'smile', look: [0, -1] }); if (k < .5) shades(F); else sweat(F);
  stamp('WRONG.', 540, 960, prog(t, 0, .25), '#E63946', 140);
};
// 3: waking up, the sky never turns dark
S[3] = (t, p, d) => {
  dayRoom(); ctx.save(); ctx.fillStyle = 'rgba(255,230,120,.25)'; ctx.beginPath(); ctx.moveTo(110, 330); ctx.lineTo(410, 330); ctx.lineTo(900, 1290); ctx.lineTo(300, 1290); ctx.fill(); ctx.restore();
  lyingHero(560, 1035, 1.6, { eyes: null, mouth: 'flat', look: [1, 0] }); blanket();
  box(860, 900, 160, 140, 10, '#6D4C41', 6); alarm(900, 790, '3:00', false);
  text('AM', 900, 700, 44, { color: '#E63946' });
};
// 4: body clock breaking, millions can't sleep
S[4] = (t, p, d) => {
  ctx.fillStyle = '#FFF1D6'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#E9C29B'; ctx.fillRect(0, 1290, W, H - 1290);
  const cx = 540, cy = 520, cr = 190; box(cx - cr, cy - cr, cr * 2, cr * 2, cr, '#fff');
  const spin = t * (2 + p * 10); inkPath([[cx, cy], [cx + Math.sin(spin) * 150, cy - Math.cos(spin) * 150]], { w: 10 }); inkPath([[cx, cy], [cx + Math.sin(spin * .3) * 90, cy - Math.cos(spin * .3) * 90]], { w: 14 });
  const cr2 = prog(p, .25, .4); if (cr2 > 0) { inkPath([[cx - 60, cy - cr], [cx - 20, cy - 80], [cx - 70, cy - 20], [cx - 10, cy + 60]], { w: 7, color: '#E63946', alpha: cr2 }); }
  text('BODY CLOCK', 540, 270, 54, { color: INK });
  const F = figure(540, 1290 - 122 * 1.6, 1.6, { seed: 11, eyes: 'closed', mouth: 'flat', pose: { armL: [-.3, -.1], armR: [.8, 2.2] } });
  ctx.fillStyle = 'rgba(90,60,120,.35)'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(F.head[0] + sx * F.r * .38, F.head[1] + F.r * .25, F.r * .2, F.r * .08, 0, 0, 7); ctx.fill(); }
  const mil = WT(4, /millions/i) - SA(4);
  if (t > mil) { const k = easeOut(prog(t, mil, mil + .3)); for (let i = 0; i < 12; i++) { const wx = 90 + (i % 6) * 160, wy = 1430 + Math.floor(i / 6) * 0; } stamp('CAN\'T SLEEP', 540, 1000, k, '#6C63FF', 90, .05); }
  for (let i = 0; i < 3; i++) { const k = (t * .7 + i / 3) % 1; text('z', 720 + k * 80, 820 - k * 140, 50 + k * 30, { color: '#888', alpha: .6 * (1 - k) }); }
};
// 5: nocturnal animals, ecosystems change
S[5] = (t, p, d) => {
  ctx.fillStyle = '#FFD89A'; ctx.fillRect(0, 0, W, H); bigSun(880, 300, 110, true); ctx.fillStyle = '#C49A3C'; ctx.fillRect(0, 1290, W, H - 1290);
  const wilt = prog(p, .45, 1);
  tree(300, 1290, 1.5, wilt); tree(820, 1290, 1.1, wilt);
  box(300, 760, 340, 26, 10, '#8D6E63', 5);
  owl(470, 680, 1, true); bubble(620, 520, .9, '?', 1);
  bat(380, 800, .7);
  const eco = WT(5, /ecosystem/i) - SA(5); if (t > eco) { for (let i = 0; i < 8; i++) { const k = ((t - eco) * .6 + i / 8) % 1; ctx.save(); ctx.translate(200 + rnd(i * 3) * 700, 700 + k * 600); ctx.rotate(k * 6 + i); ctx.fillStyle = '#C4963C'; ctx.beginPath(); ctx.ellipse(0, 0, 22, 10, 0, 0, 7); ctx.fill(); ctx.restore(); } }
};
// 6: temperatures dangerously high
S[6] = (t, p, d) => {
  const k = prog(p, .2, .95); ctx.fillStyle = mix([255, 200, 120], [255, 110, 70], k); ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = mix([196, 150, 60], [160, 80, 40], k); ctx.fillRect(0, 1290, W, H - 1290);
  ctx.strokeStyle = 'rgba(80,30,10,.7)'; ctx.lineWidth = 7; for (let i = 0; i < 5; i++) if (k > i * .2) { ctx.beginPath(); const x = 120 + i * 200; ctx.moveTo(x, 1300); ctx.lineTo(x + 40, 1360); ctx.lineTo(x - 10, 1420); ctx.lineTo(x + 30, 1480); ctx.stroke(); }
  bigSun(540, 330, 150, true); heatWaves(1280, .4);
  thermo(260, 1130, lerp(.35, .98, k), Math.round(lerp(30, 50, k)) + '°C');
  const F = figure(700, 1290 - 122 * 1.6, 1.6, { seed: 11, mouth: 'o', pose: { armL: [-2.2, -2.9], armR: [.9, 2.5] } }); sweat(F, 4);
};
// 7: the terrifying twist
S[7] = (t, p, d) => {
  space(); const k = easeOut(prog(p, .1, .9));
  earth(540, 950, lerp(1200, 220, k), false);
  stamp('THE TWIST', 540, 520, prog(p, .15, .35), '#E63946', 120);
};
// 8: locked facing the Sun: one side burns
S[8] = (t, p, d) => {
  space(); bigSun(-60, 950, 260, true);
  ctx.save(); const g = ctx.createLinearGradient(0, 0, 700, 0); g.addColorStop(0, 'rgba(255,200,80,.35)'); g.addColorStop(1, 'rgba(255,200,80,0)'); ctx.fillStyle = g; ctx.fillRect(0, 600, 700, 700); ctx.restore();
  const lk = prog(p, .0, .25); earth(640, 950, 300, lk > .5);
  const ld = WT(8, /lock/i) - SA(8); if (t > ld) { const k = easeBack(prog(t, ld, ld + .3)); ctx.save(); ctx.translate(640, 560); ctx.scale(k, k); ctx.strokeStyle = INK; ctx.lineWidth = 18; ctx.beginPath(); ctx.arc(0, -40, 45, Math.PI, 0); ctx.stroke(); ctx.strokeStyle = '#FFB703'; ctx.lineWidth = 10; ctx.stroke(); box(-70, -40, 140, 110, 18, '#FFB703'); ctx.restore(); text('LOCKED', 640, 400, 60, { color: '#FFB703', alpha: k }); }
  const bn = WT(8, /burn/i) - SA(8); if (t > bn) { stamp('ENDLESS DAY', 460, 1420, prog(t, bn, bn + .3), '#FF6B35', 84, -.05); }
};
// 9: the other side freezes
S[9] = (t, p, d) => {
  space(); bigSun(-60, 950, 260, true); earth(640, 950, 300, true); snow(700, 1080, 18);
  stamp('ETERNAL NIGHT', 620, 1420, prog(p, .3, .5), '#3D5A80', 84, .05);
  ctx.save(); ctx.strokeStyle = '#BDE0FE'; ctx.lineWidth = 8; ctx.setLineDash([20, 16]); ctx.beginPath(); ctx.arc(640, 950, 340, -Math.PI / 2.4, Math.PI / 2.4); ctx.stroke(); ctx.restore();
};
// 10: one planet, two extreme worlds (split)
function hotSide(x0, x1) { ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, x1 - x0, H); ctx.clip(); ctx.fillStyle = '#FF8C42'; ctx.fillRect(x0, 0, x1 - x0, H); ctx.fillStyle = '#C4703C'; ctx.fillRect(x0, 1290, x1 - x0, H); bigSun(x0 + 100, 300, 110, true); heatWaves(1280, .35); ctx.restore(); }
function coldSide(x0, x1) { ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, x1 - x0, H); ctx.clip(); ctx.fillStyle = '#141B3D'; ctx.fillRect(x0, 0, x1 - x0, H); ctx.fillStyle = '#DCEFFF'; ctx.fillRect(x0, 1290, x1 - x0, H); snow(x0, x1, 22); ctx.fillStyle = '#FFF3B0'; ctx.beginPath(); ctx.arc(x1 - 120, 300, 60, 0, 7); ctx.fill(); ctx.fillStyle = '#141B3D'; ctx.beginPath(); ctx.arc(x1 - 98, 285, 56, 0, 7); ctx.fill(); ctx.restore(); }
S[10] = (t, p, d) => {
  const sx = 540 + (1 - easeOut(prog(p, 0, .25))) * 540;
  hotSide(0, sx); coldSide(sx, W); inkPath([[sx, 0], [sx, H]], { w: 12, color: '#fff' });
  const F1 = figure(270, 1290 - 122 * 1.4, 1.4, { seed: 11, mouth: 'o' }); sweat(F1);
  if (p > .3) { const shiver = Math.sin(T * 60) * 4; ctx.save(); ctx.translate(shiver, 0); const F2 = figure(810, 1290 - 122 * 1.4, 1.4, { seed: 11, mouth: 'flat', pose: { armL: [.6, 2.4], armR: [-.6, -2.4] } }); ctx.restore(); }
  text('BURNING', 270, 560, 70, { color: '#fff', stroke: INK, sw: 12 }); text('FROZEN', 810, 560, 70, { color: '#BDE0FE', stroke: INK, sw: 12, alpha: p > .3 ? 1 : 0 });
};
// 11: which side would YOU choose?
S[11] = (t, p, d) => {
  hotSide(0, 540); coldSide(540, W); inkPath([[540, 0], [540, H]], { w: 12, color: '#fff' });
  const you = WT(11, /you/i) - SA(11);
  const k = easeBack(prog(t, you - .2, you + .2));
  for (const [x, lab, col] of [[270, 'HOT SIDE', '#E63946'], [810, 'COLD SIDE', '#3D5A80']]) { ctx.save(); ctx.translate(x, 1080); ctx.scale(k, k); box(-210, -80, 420, 160, 50, col); ctx.restore(); ctx.save(); ctx.translate(x, 1080); ctx.scale(k, k); text(lab, 0, 4, 64, { color: '#fff' }); ctx.restore(); }
  const F = figure(540, 820, 1.3, { seed: 11, look: [Math.sin(T * 3), 0], mouth: 'o', pose: { armL: [-1.4, -1.5], armR: [1.4, 1.5] } });
  text('COMMENT BELOW', 540, 1290, 56, { color: '#fff', stroke: INK, sw: 12, alpha: prog(t, you + .4, you + .8) });
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
