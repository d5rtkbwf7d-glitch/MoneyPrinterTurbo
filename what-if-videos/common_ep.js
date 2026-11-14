// ---------- Live to 200 episode ----------
function popIn(k, x, y, fn) { if (k <= 0) return; const s = easeBack(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); }
const A = (i, re, fb = 0) => { const v = at(i, re); return v < 1e6 ? v : fb; };
const R1 = '#E63946', T1 = '#2A9D8F', B1 = '#3D5A80';
PAL[71] = { top: '#8D6E63', pants: '#4E342E', skin: '#F2C9A0', hair: '#EDEDED' };   // great-grandad
PAL[72] = { top: '#3D5A80', pants: '#2B2D42', skin: '#FFD3B5', hair: '#D9D9D9' };   // dad, 130
function oldify(F, beard) { ctx.fillStyle = '#EDEDED'; ctx.beginPath(); ctx.arc(F.head[0], F.head[1] - 6, F.r * 1.02, Math.PI * 1.03, Math.PI * 1.97); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = 3; for (const dy of [-.45, -.32]) { ctx.beginPath(); ctx.moveTo(F.head[0] - F.r * .3, F.head[1] + dy * F.r); ctx.lineTo(F.head[0] + F.r * .3, F.head[1] + dy * F.r); ctx.stroke(); }
  if (beard) { ctx.fillStyle = '#F5F5F5'; ctx.beginPath(); ctx.ellipse(F.head[0], F.head[1] + F.r * .75, F.r * .7, F.r * .55, 0, 0, Math.PI); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.stroke(); } }
function cane(F) { const [hx, hy] = F.hands[1]; ctx.strokeStyle = '#6D4C41'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 10, GY + 120); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(hx - 10, hy - 30, hx - 30, hy - 10); ctx.stroke(); }
function grandad(x, s, o = {}) { const F = person(x, s, 71, { mouth: o.mouth || 'flat', look: o.look || [0, 0], pose: { armL: [-.3, -.2], armR: [.5, .2] } }); oldify(F, true); cane(F); return F; }
function dad130(x, s, o = {}) { const F = person(x, s, 72, { mouth: o.mouth || 'smile', look: o.look || [0, 0], pose: o.pose }); oldify(F, false); return F; }
function oldHero(x, s, o = {}) { const F = hero(x, s, o); ctx.fillStyle = '#EDEDED'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(F.head[0] + sx * F.r * .95, F.head[1] + F.r * .05, F.r * .2, F.r * .35, 0, 0, 7); ctx.fill(); } return F; }
function ageTag(x, y, s, col = INK) { pillM(x, y, s, col, 36); }
function cake(x, y, s, lit) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-260, -150, 520, 150, 20, '#FFB3C6', 8); box(-280, -40, 560, 40, 12, '#fff', 6); box(-200, -290, 400, 130, 20, '#FFD6E0', 8);
  for (let i = 0; i < 25; i++) { const cx = -180 + (i % 13) * 30, cy = -300 - Math.floor(i / 13) * 0 - (i >= 13 ? 0 : 0), xx = i < 13 ? cx : -165 + (i - 13) * 30, yy = i < 13 ? -300 : -165; ctx.fillStyle = ['#4FC3F7', '#FFB703', '#7BC96F', '#FF8FAB'][i % 4]; ctx.fillRect(xx - 5, yy - 50, 10, 50); if (lit) { ctx.fillStyle = '#FFB703'; ctx.beginPath(); ctx.ellipse(xx, yy - 62 + Math.sin(T * 20 + i) * 2, 7, 13, 0, 0, 7); ctx.fill(); } else { ctx.fillStyle = 'rgba(150,150,150,.6)'; ctx.beginPath(); ctx.arc(xx + Math.sin(T * 3 + i) * 6, yy - 70 - ((T * 40 + i * 9) % 60), 7, 0, 7); ctx.fill(); } }
  text('100', 0, -220, 70, { color: R1 }); ctx.restore(); }
function textMsg(y, from, msg, k = 1, col = '#E3E8F2') { if (k <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k * 2); text(from, 540, y - 50, 34, { color: '#5C6784' }); ctx.fillStyle = col; rrect(190, y - 20, 700, 150, 36); ctx.fill(); ctx.restore();
  const L = msg.split('|'); L.forEach((l, i) => text(l, 540, y + 55 + (i - (L.length - 1) / 2) * 52, 44, { color: INK, alpha: clamp(k * 2) })); }
function house(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-300, -380, 600, 380, 10, '#FFE0B2', 8); ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-350, -370); ctx.lineTo(0, -620); ctx.lineTo(350, -370); ctx.fill(); ctx.fillStyle = R1; ctx.beginPath(); ctx.moveTo(-320, -380); ctx.lineTo(0, -600); ctx.lineTo(320, -380); ctx.fill();
  box(-230, -300, 130, 110, 8, '#BDE0FE', 6); box(100, -300, 130, 110, 8, '#BDE0FE', 6); ctx.restore(); }
function pan(x, y, s, flip) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = INK; ctx.fillRect(60, -10, 140, 20); ctx.beginPath(); ctx.ellipse(0, 0, 90, 22, 0, 0, 7); ctx.fill(); const j = flip ? Math.abs(Math.sin(T * 3)) * 120 : 0; pancake(0, -26 - j, .8, Math.sin(T * 3) * (flip ? 1.2 : 0)); ctx.restore(); }
function pancake(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#5D3A1A'; ctx.beginPath(); ctx.ellipse(0, 0, 90, 30, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#E9B872'; ctx.beginPath(); ctx.ellipse(0, -2, 72, 22, 0, 0, 7); ctx.fill(); ctx.restore(); }
