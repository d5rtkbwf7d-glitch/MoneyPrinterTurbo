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

// ---------- scenes ----------
const S = [];
// 0: wake up on Monday... again... again
S[0] = (t, p, d) => {
  const again1 = WT(0, /again/i) - TL.scenes[0].a;
  if (t < again1 - .15) {
    dayRoom();
    figure(560, 1030, 1.6, { seed: 11, mouth: t > .9 ? 'flat' : 'o', eyes: t < .5 ? 'closed' : null, look: [-1, 0], pose: { legL: [1.5, 1.5], legR: [1.6, 1.6], armL: [-.5, -.2], armR: [.6, .3] } });
    blanket(1000); alarm(760, 760, 'MON 7:00', true);
  } else {
    ctx.fillStyle = '#FDE2C4'; ctx.fillRect(0, 0, W, H);
    const n = 1 + Math.floor((t - again1 + .15) / .6);
    const fl = ((t - again1 + .15) % .6) / .6, flip = easeOut(clamp(fl * 4));
    calendar(540, 760, lerp(1.3, 1.15, flip), 'MONDAY', 'MON', 'Monday #' + n);
    ctx.save(); ctx.translate(540, 760 + flip * 600); ctx.rotate(flip * .6); ctx.globalAlpha = 1 - flip; calendar(0, 0, 1.15, 'MONDAY', 'MON', ''); ctx.restore();
    const k = easeBack(prog(fl, 0, .3)); ctx.save(); ctx.translate(560, 1180); ctx.rotate(-.15); ctx.scale(k, k); ctx.fillStyle = '#E63946'; rrect(-190, -60, 380, 120, 24); ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(560, 1180); ctx.rotate(-.15); ctx.scale(k, k); text('AGAIN!', 0, 4, 84, { color: '#fff' }); ctx.restore();
  }
};
// 1: something changes every time
S[1] = (t, p, d) => {
  ground(1290);
  const crack = prog(p, .35, .55), fall = prog(p, .5, 1);
  dayBar(520, 1 - .04 * clamp(crack * 2), '24h 00m', false);
  if (crack > 0) { ctx.save(); ctx.translate(950, 520 + easeOut(fall) * 700); ctx.rotate(fall * 3); ctx.fillStyle = '#E63946'; rrect(-24, -44, 48, 88, 14); ctx.fill(); ctx.restore(); }
  figure(540, 1290 - 122 * 1.9, 1.9, { seed: 11, look: [.8, -1.2], mouth: crack > .5 ? 'o' : 'flat', pose: { armL: [-.3, -.2], armR: [1.1, 2.6] } });
  if (p > .55) bubble(760, 820, 1, '?', easeOut(prog(p, .55, .7)));
};
// 2: one minute shorter, every Monday
S[2] = (t, p, d) => {
  ctx.fillStyle = '#14123A'; ctx.fillRect(0, 0, W, H);
  const ticks = Math.min(4, Math.floor(p * 5)), mins = 1440 - ticks;
  text('MONDAY #' + (ticks + 1), 540, 360, 64, { color: '#FFB703' });
  ctx.save(); ctx.fillStyle = INK; rrect(110, 520, 860, 300, 50); ctx.fill(); ctx.restore();
  text(`${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`, 540, 676, 220, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
  text('HOURS IN YOUR DAY', 540, 880, 40, { color: '#aaa', weight: 800 });
  for (let i = 1; i <= ticks; i++) { const k = prog(p, i / 5, i / 5 + .2); if (k <= 0 || k >= 1) continue; text('-1 MIN', 800, 500 - easeOut(k) * 160, 70, { color: '#FF4D6D', alpha: 1 - k }); }
  figure(540, 1290 - 122 * 1.3, 1.3, { seed: 11, look: [0, -1], mouth: 'o', pose: { armL: [-.4, -.2], armR: [2.2, 3.4] } });
  ctx.fillStyle = '#2B2A55'; ctx.fillRect(0, 1290, W, H - 1290);
};
// 3: lunch comes a little sooner
S[3] = (t, p, d) => {
  ctx.fillStyle = '#E8F6FF'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#CFD8E3'; ctx.fillRect(0, 1290, W, H - 1290);
  // wall clock, minute hand jumps back a bit each beat
  const cx = 300, cy = 560, back = Math.floor(p * 4) * 2;
  box(cx - 170, cy - 170, 340, 340, 170, '#fff');
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; inkPath([[cx + Math.sin(a) * 135, cy - Math.cos(a) * 135], [cx + Math.sin(a) * 150, cy - Math.cos(a) * 150]], { w: 6 }); }
  const ma = (60 - back) / 60 * 6.283; inkPath([[cx, cy], [cx + Math.sin(ma) * 120, cy - Math.cos(ma) * 120]], { w: 10 }); inkPath([[cx, cy], [cx, cy - 80]], { w: 14 });
  box(560, 1060, 440, 30, 6, '#8D6E63', 6); box(600, 1090, 24, 200, 4, '#6D4C41', 4); box(940, 1090, 24, 200, 4, '#6D4C41', 4);
  const k = easeBack(prog(p, .25, .4));
  if (k > 0) { ctx.save(); ctx.translate(780, 1010); ctx.scale(k, k); ctx.fillStyle = '#F4A261'; rrect(-110, -20, 220, 50, 25); ctx.fill(); ctx.fillStyle = '#7BC96F'; ctx.fillRect(-115, 0, 230, 14); ctx.fillStyle = '#8D4B2B'; ctx.fillRect(-110, 12, 220, 18); ctx.fillStyle = '#F4A261'; rrect(-110, 28, 220, 24, 10); ctx.fill(); ctx.restore(); }
  text('LUNCH', 780, 860, 60, { color: INK, alpha: k > 0 ? 1 : 0 }); text('11:5' + (8 - Math.min(6, back)) + ' AM', 780, 930, 52, { color: '#E63946', alpha: k > 0 ? 1 : 0 });
  figure(400, 1290 - 122 * 1.6, 1.6, { seed: 11, look: [1, 0], mouth: 'smile', pose: p > .5 ? { armL: [-1.4, -.4], armR: [1.4, .4] } : {} });
};
// 4: 1,000 Mondays later: 7-hour day, sun races
S[4] = (t, p, d) => {
  const phase = 1.2 + t * 1.3; const dl = skyCycle(phase); hills(dl < .5);
  for (let i = 0; i < 3; i++) cloudShape(((i * 420 + t * 500) % (W + 400)) - 200, 500 + i * 160, 160, 60, 'rgba(255,255,255,.9)');
  figure(540, 1330 - 122 * 1.6, 1.6, { seed: 11, look: [Math.cos(phase) * 1.2, -1.2], mouth: 'o' });
  ctx.save(); ctx.fillStyle = INK; rrect(200, 150, 680, 230, 40); ctx.fill(); ctx.restore();
  text('MONDAY #1,000', 540, 220, 64, { color: '#FFB703' }); text('DAY = ' + hm(440), 540, 310, 70, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
};
// 5: 2 hours, 10 minutes, day/night strobing
S[5] = (t, p, d) => {
  const ten = WT(5, /ten/i) - TL.scenes[5].a;
  const phase = 1.2 + t * 2.5 + t * t * 1.6; const dl = skyCycle(phase); hills(dl < .5);
  const mins = t < ten - .2 ? 120 : 10;
  const dizzy = t > ten;
  ctx.save(); ctx.translate(540, 1330 - 122 * 1.6 - 150); ctx.rotate(dizzy ? Math.sin(t * 6) * .12 : 0); ctx.translate(-540, -(1330 - 122 * 1.6 - 150));
  figure(540, 1330 - 122 * 1.6, 1.6, { seed: 11, eyes: dizzy ? 'x' : null, mouth: 'o', look: [Math.cos(phase), -1], pose: { armL: [-2.4, -2.8], armR: [2.4, 2.8] } }); ctx.restore();
  ctx.save(); ctx.fillStyle = INK; rrect(200, 150, 680, 230, 40); ctx.fill(); ctx.restore();
  text('MONDAY #' + (1440 - mins).toLocaleString('en-US'), 540, 220, 64, { color: '#FFB703' }); text('DAY = ' + hm(mins), 540, 310, 70, { color: mins < 60 ? '#FF4D6D' : '#fff', font: "'DejaVu Sans Mono'", weight: 700 });
};
// 6: Monday #1,440
S[6] = (t, p, d) => {
  ctx.fillStyle = '#0E0C26'; ctx.fillRect(0, 0, W, H);
  const pulse = 1 + .04 * Math.max(0, Math.sin(t * 7));
  calendar(540, 700, 1.25 * pulse, 'MONDAY', '#1,440', 'the last one?', '#6C63FF');
  const blink = Math.floor(t * 3) % 2 === 0;
  dayBar(1180, .02, '0h 01m', true); if (!blink) { ctx.save(); ctx.fillStyle = 'rgba(230,57,70,.25)'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  figure(540, 1530 - 122 * .9, .9, { seed: 11, look: [0, -1.4], mouth: 'flat' });
};
// 7: zero minutes -> what comes after zero?
S[7] = (t, p, d) => {
  const zero = WT(7, /zero/i) - TL.scenes[7].a, after = WT(7, /after/i) - TL.scenes[7].a;
  if (t < zero + .1) { ctx.fillStyle = '#0E0C26'; ctx.fillRect(0, 0, W, H); calendar(540, 700, 1.25, 'MONDAY', '#1,440', 'the last one?', '#6C63FF'); dayBar(1180, .02 * (1 - prog(t, 0, zero)), t > zero - .1 ? '0h 00m' : '0h 01m', true); figure(540, 1530 - 122 * .9, .9, { seed: 11, look: [0, -1.4], mouth: 'o' }); }
  else {
    const fl = 1 - prog(t, zero + .1, zero + .5); ctx.fillStyle = '#F2F2F2'; ctx.fillRect(0, 0, W, H);
    // the void: hero floating, a calendar with no day on it
    const fy = Math.sin(t * 1.5) * 20;
    ctx.save(); ctx.translate(540, 1120 + fy); ctx.rotate(Math.sin(t * .8) * .25); figure(0, 0, 1.3, { seed: 11, look: [0, -1], mouth: 'o', pose: { armL: [-1.2, -.8], armR: [1.2, .8], legL: [-.4, .2], legR: [.4, -.2] } }); ctx.restore();
    calendar(540, 560, .9, '', '', '', '#BBBBBB');
    if (t > after) { const k = easeBack(prog(t, after, after + .4)); text('?', 540, 560, 300 * k, { color: '#6C63FF' }); }
    if (fl > 0) { ctx.save(); ctx.fillStyle = '#fff'; ctx.globalAlpha = fl; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  }
  const f = prog(t, d - .5, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); }
};
