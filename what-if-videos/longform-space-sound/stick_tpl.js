// ================= STICK-FIGURE LONG-FORM (1920x1080) =================
const GY = 860, BLUE = '#2C6BD8', SPACE = '#14162B';
let SEG = null;
const SW = re => { if (!SEG || !SEG.words) return 1e9; const w = SEG.words.find(w => re.test(w.w)); return w ? w.s - SEG.a : 1e9; };
const talkingNow = () => SEG && SEG.words && SEG.words.some(w => T >= w.s && T <= w.e + .05);
function popIn(k, x, y, fn) { if (k <= 0) return; const s = easeBack(k); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); fn(); ctx.restore(); }
const mk = (pts, col = INK, w = 8, o = {}) => inkPath(pts, { w, color: col, amp: 2.2, ...o });
const mc = (x, y, r, col = INK, w = 8, o = {}) => inkCircle(x, y, r, { w, color: col, ...o });
function label(s, x, y, size = 46, col = INK) { text(s, x, y, size, { color: col }); }
function bubble2(x, y, w, h, s, tail = -1, col = '#fff') { ctx.save(); ctx.fillStyle = col; rrect(x - w / 2, y - h / 2, w, h, 28); ctx.fill(); ctx.restore(); mk([[x - w / 2 + 20, y - h / 2], [x + w / 2 - 20, y - h / 2 + 3], [x + w / 2, y], [x + w / 2 - 20, y + h / 2], [x + tail * 30 + 30, y + h / 2], [x + tail * 80, y + h / 2 + 60], [x + tail * 30 - 30, y + h / 2], [x - w / 2 + 20, y + h / 2 - 2], [x - w / 2, y]], INK, 7, { close: true }); text(s, x, y + 3, Math.min(46, 46 * (w - 60) / Math.max(1, s.length * 24)), { color: INK }); }
function astro(x, hipY, s, o = {}) {
  ctx.save(); ctx.fillStyle = '#ddd'; rrect(x - 40 * s, hipY - 150 * s, 80 * s, 100 * s, 14 * s); ctx.fill(); ctx.restore();
  const F = figure(x, hipY, s, { seed: o.seed ?? 11, mouth: o.mouth || (o.talk && talkingNow() && BOIL % 2 ? 'o' : 'smile'), look: o.look || [0, 0], pose: o.pose, scarfCol: o.scarfCol });
  const [hx, hy] = F.head, R = F.r * 1.75;
  if (o.bun) mc(hx + F.r * .5, hy - F.r * 1.05, F.r * .35, INK, 6);
  ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#9ED8FF'; ctx.beginPath(); ctx.arc(hx, hy, R, 0, 7); ctx.fill(); ctx.restore();
  if (o.air) { for (let i = 0; i < 14; i++) { const a = rnd(i * 3.3) * 6.28, r = R * (.35 + .55 * rnd(i * 7.1)); if (Math.hypot(Math.cos(a) * r, Math.sin(a) * r - (-F.r * .1)) < F.r * 1.05) continue; dot(hx + Math.cos(a) * r + Math.sin(T * 4 + i) * 2, hy + Math.sin(a) * r, 5, BLUE); } }
  mc(hx, hy, R, INK, 7); return F; }
function stars(n = 40, x0 = 0, y0 = 0, w = W, h = H) { for (let i = 0; i < n; i++) dot(x0 + rnd(i * 4.1) * w, y0 + rnd(i * 9.7) * h, 2 + rnd(i) * 2.5, '#fff', .5 + .5 * Math.sin(T * 2 + i)); }
function robot(x, y, s, o = {}) { ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  mk([[-50, -40], [50, -40], [50, 60], [-50, 60]], '#ccc', 7, { close: true, fill: '#5C6784' }); if (!o.noHead) { mk([[-36, -110], [36, -110], [36, -46], [-36, -46]], '#ccc', 7, { close: true, fill: '#5C6784' }); dot(-14, -80, 7, '#FF5A5F'); dot(14, -80, 7, '#FF5A5F'); mk([[0, -110], [0, -140]], '#ccc', 5); dot(0, -146, 7, '#FFB703'); }
  mk([[-50, 0], [-90, 30]], '#ccc', 7); mk([[50, 0], [90, 30]], '#ccc', 7); ctx.restore(); }
function robotHead(x, y, s, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); mk([[-36, -32], [36, -32], [36, 32], [-36, 32]], '#ccc', 7, { close: true, fill: '#5C6784' }); dot(-14, -2, 7, '#FF5A5F'); dot(14, -2, 7, '#FF5A5F'); ctx.restore(); }
function flash(x, y, k) { if (k <= 0 || k >= 1) return; const R = 60 + easeOut(k) * 420; ctx.save(); ctx.globalAlpha = 1 - k; const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, '#fff'); g.addColorStop(.3, '#FFE066'); g.addColorStop(.6, '#FF8C42'); g.addColorStop(1, 'rgba(255,90,40,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill(); ctx.restore();
  for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28 + .3, r0 = R * .55, r1 = r0 + 60; mk([[x + Math.cos(a) * r0, y + Math.sin(a) * r0], [x + Math.cos(a) * r1, y + Math.sin(a) * r1]], '#FFB703', 7, { alpha: 1 - k }); } }
function speakerIcon(x, y, s, bars, muted) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); mk([[-80, -40], [-30, -40], [30, -100], [30, 100], [-30, 40], [-80, 40]], INK, 9, { close: true, fill: '#fff' });
  for (let i = 0; i < bars; i++) { ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(30, 0, 60 + i * 40, -.7, .7); ctx.stroke(); ctx.restore(); }
  if (muted) mk([[-110, -120], [200, 120]], RED, 14); ctx.restore(); }
function volMeter(x, y, k, lab = 'VOLUME') { label(lab, x, y - 40, 34); for (let i = 0; i < 10; i++) { ctx.fillStyle = i / 10 < k ? (i > 7 ? RED : '#2E9E5B') : '#ddd'; ctx.fillRect(x - 250 + i * 50, y, 40, 40); } }
function porthole(cx, cy, R, inner) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip(); ctx.fillStyle = SPACE; ctx.fillRect(cx - R, cy - R, 2 * R, 2 * R); stars(40, cx - R, cy - R, 2 * R, 2 * R); inner && inner(); ctx.restore(); mc(cx, cy, R, INK, 14); mc(cx, cy, R + 26, '#888', 10); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28; dot(cx + Math.cos(a) * (R + 13), cy + Math.sin(a) * (R + 13), 7, '#666'); } }
function shipWall() { ctx.fillStyle = 'rgba(180,190,200,.25)'; ctx.fillRect(0, 0, W, GY); mk([[0, GY], [W, GY]], INK, 8); for (let i = 0; i < 6; i++) mk([[i * 340 + 60, 60], [i * 340 + 60, GY - 40]], 'rgba(0,0,0,.25)', 4); }
function radioIcon(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); mk([[-40, -30], [40, -30], [40, 50], [-40, 50]], INK, 7, { close: true, fill: '#FFE066' }); mk([[20, -30], [40, -90]], INK, 6); for (let i = 0; i < 3; i++) { const k = (T * 1.5 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - k; ctx.strokeStyle = BLUE; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(40, -90, 20 + k * 70, -1.2, .2); ctx.stroke(); ctx.restore(); } ctx.restore(); }
function zig(x0, y0, x1, y1, k, col = BLUE) { const n = 18, pts = []; for (let i = 0; i <= n * k; i++) { const f = i / n, x = lerp(x0, x1, f), y = lerp(y0, y1, f) + Math.sin(f * 30 - T * 12) * 22; pts.push([x, y]); } if (pts.length > 1) mk(pts, col, 7); }
function particles(x0, x1, y, rows, density, pulseX, col = BLUE) { for (let r = 0; r < rows; r++) for (let x = x0; x < x1; x += 42 / density) { let dx = 0; if (pulseX != null) { const d = x - pulseX; dx = Math.exp(-(d * d) / 2500) * 18; } dot(x + dx + (r % 2) * 14, y + r * 40, 6, col); } }
const TPL = {};

TPL.ship = (t, p, d, P) => {
  shipWall();
  const m = P.mode;
  const inner = () => {
    if (['count', 'boom', 'vol', 'head'].includes(m)) { const bt = m === 'count' ? 1e9 : (m === 'boom' ? 0 : -5); if (m !== 'head' || true) robot(1300 + Math.sin(T) * 10, 470, .9, { noHead: m !== 'count' }); if (m === 'count') { robot(1300, 470, .9); } flash(1300, 450, prog(t, m === 'boom' ? .1 : -9, 1.6)); }
    if (m === 'head') { const k = prog(p, .35, .8); robotHead(lerp(1050, 1560, k), lerp(330, 520, k), 1.4, k * 8); for (let i = 0; i < 6; i++) { const a = i * 1.1; const r = 60 + t * 40; mk([[1300 + Math.cos(a) * r, 450 + Math.sin(a) * r], [1300 + Math.cos(a) * (r + 20), 450 + Math.sin(a) * (r + 20)]], '#aaa', 6); } }
    if (m === 'tilly') { const k = prog(t, 0, 3.2); astro(lerp(1050, 1500, k % 1), 560, .8, { seed: 51, scarfCol: BLUE, bun: true, pose: { armL: [-1.6, -1.8], armR: [1.2, .8] }, talk: SEG.spk === 't' }); }
    if (m === 'impact' || m === 'impact2' || m === 'inside') { const k = prog(p, .1, .7); if (m === 'impact') robotHead(lerp(1500, 1300, k), lerp(250, 430, k), lerp(.8, 2.2, k), k * 3); else robotHead(1300, 430, 2.2, 3); }
  };
  const shake = (m === 'impact' && prog(p, .7, .75) > 0 && p < .85) || m === 'inside' ? Math.sin(T * 70) * 6 * (m === 'inside' ? .5 : 1) : 0;
  ctx.save(); ctx.translate(shake, 0); porthole(1300, 430, 300, inner); ctx.restore();
  if ((m === 'impact' && p > .7) || m === 'impact2' || m === 'inside') { mk([[1210, 380], [1260, 430], [1240, 470], [1300, 520]], '#fff', 4); mk([[1260, 430], [1330, 410]], '#fff', 4); }
  const tl = m === 'tilly' && P.radio; const said = SEG.spk === 't';
  const jack = figure(560, GY - 122 * 1.6, 1.6, { seed: 11, look: [1, -.3], mouth: m === 'boom' || m === 'head' || m === 'impact2' ? 'o' : 'smile', pose: m === 'inside' ? { armL: [-.4, -.2], armR: [1.6, 2.6] } : m === 'count' ? { armL: [-.4, -.2], armR: [1.3, 2.2] } : {} });
  if (m === 'count') { const n = ['three', 'two', 'one']; let c = ''; n.forEach((w, i) => { if (t > SW(new RegExp(w, 'i')) - .05) c = String(3 - i); }); if (c) popIn(1, 1300, 430, () => text(c, 0, 10, 260, { color: '#fff', stroke: INK, sw: 14 })); }
  if (m === 'vol' || m === 'boom') { const k = m === 'vol' ? 1 : prog(t, SW(/volume/i) - .3, SW(/volume/i) + .5); if (k > 0) { speakerIcon(300, 300, .9, 3, false); volMeter(300, 500, k); } }
  if (m === 'vol') text('?', 880, 260, 160, { color: RED });
  if (m === 'head' && p > .85) text('...silence', 560, 220, 56, { color: INK });
  if (m === 'tilly') { radioIcon(140, 300, 1.4); if (P.say) bubble2(470, 220, 720, 120, P.say, -1); if (tl) { mk([[560, 240], [700, 200]], BLUE, 6); text('loud and clear!', 520, 160, 46, { color: BLUE }); } }
  if (m === 'inside') { const k = prog(p, .2, .9); for (let i = 0; i < 3; i++) { const r = 60 + ((T * 160 + i * 80) % 320); ctx.save(); ctx.globalAlpha = 1 - (r - 60) / 320; ctx.strokeStyle = BLUE; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1000, 430, r, Math.PI * .8, Math.PI * 1.2); ctx.stroke(); ctx.restore(); } label('glass vibrates', 1300, 820, 40, BLUE); label('air carries it', 830, 300, 40, BLUE); }
  if (m === 'impact2') text('?', 760, 260, 140, { color: RED });
};
TPL.questions = (t, p, d, P) => {
  const k1 = prog(t, .2, .6), k2 = prog(t, SW(/what/i) - .3, SW(/what/i) + .2);
  popIn(k1, 520, 430, () => { mk([[-380, -230], [380, -230], [380, 230], [-380, 230]], INK, 8, { close: true, fill: '#fff' }); radioIcon(-200, 0, 1.6); text('vs', 0, 0, 60, { color: RED }); flash(200, 0, .25); label('Why does the radio', 0, -170, 40); label('get through?', 0, 180, 40); });
  popIn(k2, 1400, 430, () => { mk([[-380, -230], [380, -230], [380, 230], [-380, 230]], INK, 8, { close: true, fill: '#fff' }); mc(0, 0, 150, INK, 12); robotHead(80, -40, 1.4, .4); label('What if it hits', 0, -170, 40); label('the window?', 0, 180, 40); });
};
TPL.table = (t, p, d, P) => {
  mk([[200, 600], [1300, 600]], '#8D6E63', 16); mk([[300, 600], [300, GY]], '#8D6E63', 14); mk([[1200, 600], [1200, GY]], '#8D6E63', 14);
  const tap = Math.abs(Math.sin(T * 5)) < .25; ctx.save(); ctx.translate(0, tap ? 6 : -30); mk([[460, 470], [460, 590]], INK, 22); mc(460, 470, 26, INK, 8); ctx.restore(); label('tap!', 380, 430, 46, RED);
  for (let i = 0; i < 3; i++) mk([[480 + i * 30, 640], [500 + i * 30, 660], [480 + i * 30, 680]], RED, 5);
  if (P.mode === 'air') { const px = 560 + ((T * 260) % 980); particles(560, 1540, 380, 4, 1, px); label('air particles nudge their neighbours', 1060, 300, 40, BLUE); }
  // ear
  ctx.save(); ctx.translate(1660, 440); mk([[-40, -90], [30, -110], [60, -20], [20, 40], [-10, 90]], INK, 9); mk([[-5, -40], [25, -40], [20, 0]], INK, 7); ctx.restore(); label('your ear', 1660, 580, 40);
};
TPL.stadium = (t, p, d, P) => {
  for (let r = 0; r < 3; r++) mk([[100, 420 + r * 150], [1820, 420 + r * 150]], '#999', 8);
  const alone = P.mode && P.mode.startsWith('alone');
  for (let r = 0; r < 3; r++) for (let i = 0; i < 13; i++) {
    const x = 180 + i * 130 + (r % 2) * 40, base = 420 + r * 150, ph = ((T * 3) % 16) - i - r * .4, up = Math.max(0, 1 - Math.abs(ph) / 1.2);
    if (alone) { if (!(r === 1 && i === 6)) { mk([[x - 30, base], [x + 30, base]], '#bbb', 5); continue; } const jump = P.mode === 'alone' ? Math.abs(Math.sin(T * 4)) * 60 : 0; figure(x, base - 60 - jump, .6, { seed: 11, look: [Math.sin(T * 1.5), 0], mouth: P.mode === 'alone2' ? 'flat' : 'smile', pose: { armL: [-2.7, -3], armR: [2.7, 3], legL: [-.15, -.1], legR: [.15, .1] } }); continue; }
    figure(x, base - 60 - up * 40, .5, { seed: 20 + i, scarf: false, mouth: up > .5 ? 'o' : 'smile', pose: up > .3 ? { armL: [-2.8, -3], armR: [2.8, 3] } : { legL: [-1.2, .1], legR: [-1.1, .1] } });
  }
  if (!alone && p > .55) label('everyone stays in their seat', 960, 250, 50, BLUE);
  if (P.mode === 'alone2') { label('...', 960, 250, 90); }
};
TPL.airChain = (t, p, d, P) => { const px = 200 + ((T * 300) % 1500); particles(200, 1720, 380, 6, 1, px); mk([[200, 700], [1720, 700]], INK, 5); mk([[1680, 680], [1720, 700], [1680, 720]], INK, 5); label('the vibration moves along', 960, 780, 50, BLUE); label('each bit of air stays close to home', 960, 250, 44); };
TPL.bell = (t, p, d, P) => {
  const m = P.mode; let air = 1;
  if (m === 'pump') air = lerp(1, .15, ease(prog(p, .15, .95))); if (m === 'pumped') air = .15; if (m === 'back') air = lerp(.15, 1, ease(prog(p, .55, .95)));
  // chamber
  mk([[760, 760], [760, 360]], INK, 8); mk([[1160, 760], [1160, 360]], INK, 8); ctx.save(); ctx.strokeStyle = INK; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(960, 360, 200, Math.PI, 0); ctx.stroke(); ctx.restore(); mk([[700, 760], [1220, 760]], INK, 14);
  ctx.save(); ctx.fillStyle = 'rgba(158,216,255,.15)'; ctx.beginPath(); ctx.moveTo(760, 760); ctx.lineTo(760, 360); ctx.arc(960, 360, 200, Math.PI, 0); ctx.lineTo(1160, 760); ctx.fill(); ctx.restore();
  for (let i = 0; i < 60; i++) { if (rnd(i * 3.7) > air) continue; dot(790 + rnd(i * 5.1) * 340, 230 + rnd(i * 9.3) * 510 + Math.sin(T * 3 + i) * 3, 5, BLUE); }
  mk([[960, 160], [960, 330]], INK, 5); ctx.save(); ctx.fillStyle = '#FFB703'; ctx.beginPath(); ctx.moveTo(880, 450); ctx.quadraticCurveTo(880, 330, 960, 330); ctx.quadraticCurveTo(1040, 330, 1040, 450); ctx.closePath(); ctx.fill(); ctx.restore(); mk([[880, 450], [880, 380], [960, 330], [1040, 380], [1040, 450], [880, 450]], INK, 7);
  const hx = Math.sin(T * 18) * 30; mk([[960, 400], [960 + hx, 470]], INK, 6); dot(960 + hx, 478, 12, INK);
  for (let i = 0; i < 3; i++) { const r = 40 + ((T * 140 + i * 50) % 150); ctx.save(); ctx.globalAlpha = (1 - (r - 40) / 150) * air; ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1240, 420, r, -.7, .7); ctx.stroke(); ctx.restore(); }
  // pump
  if (m !== 'ring') { mk([[1160, 700], [1400, 700]], INK, 10); mk([[1400, 640], [1500, 640], [1500, 800], [1400, 800]], INK, 8, { close: true, fill: '#ddd' }); label('PUMP', 1450, 830, 30); }
  volMeter(400, 300, air, 'LOUDNESS');
  const jx = 420, tx = 1650;
  figure(tx, GY - 122 * 1.3, 1.3, { seed: 51, scarfCol: BLUE, look: [-1, 0], mouth: SEG.spk === 't' && talkingNow() && BOIL % 2 ? 'o' : 'smile' }); mc(tx + 18, GY - 122 * 1.3 - 120 * 1.3 - 46 * 1.3 - 52, 15, INK, 6);
  figure(jx, GY - 122 * 1.3, 1.3, { seed: 11, look: [1, 0], mouth: SEG.spk === 'j' && talkingNow() && BOIL % 2 ? 'o' : 'smile', pose: m === 'pump' ? { armL: [-.4, -.2], armR: [1.4, 1.6] } : {} });
  if (P.say) bubble2(P.who === 'j' ? 560 : 1450, 150, 640, 110, P.say, P.who === 'j' ? -1 : 1);
  if (m === 'pumped' || m === 'back') { if (P.who === 't' || m === 'back') { mk([[1040, 560], [1010, 500]], RED, 6); label('still moving!', 1080, 600, 40, RED); } }
};
TPL.spaceGap = (t, p, d, P) => {
  ctx.fillStyle = SPACE; ctx.fillRect(0, 0, W, H); stars(60);
  flash(330, 430, (t * .45) % 1); robot(330, 470, .7, { noHead: true });
  ctx.save(); ctx.translate(1560, 450); mk([[-200, -110], [180, -110], [260, 0], [180, 110], [-200, 110]], '#ddd', 8, { close: true, fill: '#5C6784' }); mc(60, 0, 50, '#ddd', 6); ctx.restore();
  const k = prog(p, .05, .3); for (let i = 0; i < 4; i++) { const y = 380 + i * 30; const x1 = lerp(420, 1360, k); mk([[420, y], [x1, y]], '#FFE066', 6); }
  label('light: gets there', 860, 300, 46, '#FFE066');
  const k2 = prog(p, .4, .7); if (k2 > 0) { for (let i = 0; i < 3; i++) { const r = 40 + ((T * 100 + i * 40) % 120); ctx.save(); ctx.globalAlpha = (1 - (r - 40) / 120) * k2; ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(330, 430, 120 + r, -.5, .5); ctx.stroke(); ctx.restore(); } label('sound: needs matter to travel', 860, 620, 46, '#FF8F8F'); mk([[700, 680], [1020, 680]], '#FF8F8F', 6); }
  if (p > .8) text('no boom', 1560, 700, 70, { color: '#fff' });
};
TPL.spacewalk = (t, p, d, P) => {
  ctx.fillStyle = SPACE; ctx.fillRect(0, 0, W, H); stars(60);
  ctx.save(); ctx.translate(960, 1000); mk([[-700, -40], [700, -40], [760, 80], [-760, 80]], '#ddd', 8, { close: true, fill: '#5C6784' }); ctx.restore();
  const bob = Math.sin(T * 1.5) * 10, m = P.mode;
  const J = astro(560, 520 + bob, 1.2, { seed: 11, air: true, talk: SEG.spk === 'j', pose: m === 'yell' ? { armL: [-2.6, -3], armR: [2.4, 2.8] } : m === 'radio' ? { armL: [-.4, -.2], armR: [-1.2, -2.2] } : {} });
  const Tl = astro(1360, 520 - bob, 1.2, { seed: 51, scarfCol: BLUE, bun: true, air: true, look: [-1, 0], talk: SEG.spk === 't' });
  if (m === 'yell' || m === 'gap') { for (let i = 0; i < 3; i++) { const r = 20 + ((T * 120 + i * 30) % 90); ctx.save(); ctx.globalAlpha = 1 - (r - 20) / 90; ctx.strokeStyle = RED; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(J.head[0] + 40, J.head[1], r, -.6, .6); ctx.stroke(); ctx.restore(); } }
  if (m === 'gap') { label('air', J.head[0], J.head[1] - 120, 40, BLUE); label('air', Tl.head[0], Tl.head[1] - 120, 40, BLUE); label('almost nothing in between', 960, 760, 46, '#fff'); mk([[700, 700], [1220, 700]], '#fff', 5, { dash: [14, 12] }); }
  if (m === 'radio') { radioIcon(J.head[0] + 120, J.head[1] + 80, .8); radioIcon(Tl.head[0] - 120, Tl.head[1] + 80, .8); zig(J.head[0] + 160, J.head[1] - 20, Tl.head[0] - 160, Tl.head[1] - 20, prog(p, .1, .5)); label('radio waves', 960, 300, 46, '#9ED8FF'); }
  if (P.say) bubble2(P.who === 'j' ? 560 : 1360, 140, 620, 110, P.say, P.who === 'j' ? -1 : 1);
};
TPL.chain3 = (t, p, d, P) => {
  const boxes = [[330, 'SOUND', 'mouth to microphone', RED], [960, 'RADIO WAVES', 'across space', BLUE], [1590, 'SOUND', 'speaker to ears', RED]];
  boxes.forEach(([x, a, b, col], i) => { const on = P.step === 3 ? prog(t, SW(new RegExp(['mouth', 'radio', 'speaker'][i], 'i')) - .3, SW(new RegExp(['mouth', 'radio', 'speaker'][i], 'i')) + .1) : (P.step === 1 ? (i < 2 ? 1 : .25) : (i > 0 ? 1 : .25));
    ctx.save(); ctx.globalAlpha = Math.max(.25, on); mk([[x - 260, 300], [x + 260, 300], [x + 260, 620], [x - 260, 620]], col, 9, { close: true, fill: '#fff' }); text(a, x, 380, 54, { color: col }); text(b, x, 560, 36, { color: INK });
    if (i === 1) zig(x - 200, 470, x + 200, 470, 1); else { for (let k = 0; k < 3; k++) { ctx.strokeStyle = col; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(x - 60, 470, 30 + k * 30, -.6, .6); ctx.stroke(); } }
    ctx.restore(); if (i < 2) mk([[x + 280, 460], [x + 350, 460]], INK, 8); });
  const sig = SW(/electrical/i); if (P.step === 1 && t > sig - .2) label('microphone: vibrations into an electrical signal', 960, 760, 42, INK);
  if (P.step === 1 && t > SW(/vacuum/i) - .2) label('radio waves travel through a vacuum', 960, 220, 44, BLUE);
};
TPL.moon = (t, p, d, P) => {
  ctx.fillStyle = SPACE; ctx.fillRect(0, 0, W, H); stars(50, 0, 0, W, 600); mc(1650, 200, 80, BLUE, 8, { fill: 'rgba(44,107,216,.3)' });
  ctx.fillStyle = '#C9C9C9'; ctx.fillRect(0, 760, W, H); mk([[0, 760], [W, 760]], INK, 8); for (let i = 0; i < 6; i++) mc(150 + i * 330, 820 + (i % 2) * 40, 40, '#999', 5);
  mk([[520, 760], [560, 690], [680, 680], [720, 760]], INK, 8, { close: true, fill: '#aaa' });
  const tapNow = Math.abs(Math.sin(T * 3)) < .3; const J = astro(380, 760 - 200 * 1.0, 1.0, { seed: 11, pose: { armL: [-.4, -.2], armR: [tapNow ? 1.5 : 2.3, tapNow ? 1.4 : 2.6] } });
  const Tl = astro(1250, 760 - 200 * 1.0, 1.0, { seed: 51, scarfCol: BLUE, bun: true, look: [-1, 0] });
  if (tapNow) label('tap', 620, 640, 40, RED);
  if (P.mode !== 'tap') { for (let i = 0; i < 4; i++) { const x = 720 + ((T * 260 + i * 120) % 500); mk([[x, 800], [x + 20, 780], [x + 40, 820], [x + 60, 800]], RED, 6); } label('vibrations through the ground', 960, 900, 40, INK); }
  if (P.mode === 'tap') { mk([[760, 520], [1080, 520]], '#fff', 4, { dash: [12, 10] }); label('no sound through space', 920, 480, 38, '#fff'); }
  if (P.mode && P.mode.startsWith('sensor')) { mk([[1120, 760], [1160, 720], [1200, 760]], INK, 6, { close: true, fill: '#FFE066' }); ctx.save(); ctx.fillStyle = '#111'; rrect(1360, 360, 420, 240, 20); ctx.fill(); ctx.restore(); const pts = []; for (let i = 0; i < 60; i++) { const x = 1380 + i * 6.6, d0 = (i - 30) / 6; pts.push([x, 480 + Math.sin(i * 1.3 + T * 4) * 60 * Math.exp(-d0 * d0) * (tapNow ? 1 : .3)]); } mk(pts, '#39FF88', 4); label('sensor', 1160, 690, 32, INK); if (P.mode === 'sensor2') text('knock!', 1570, 640, 60, { color: RED }); }
};
TPL.tableEar = (t, p, d, P) => {
  mk([[200, 600], [1500, 600]], '#8D6E63', 16); mk([[300, 600], [300, GY]], '#8D6E63', 14); mk([[1400, 600], [1400, GY]], '#8D6E63', 14);
  const lifted = p > .5; const hy = lifted ? 420 : 545; mc(400, hy, 55, INK, 8); mk([[400, hy + 55], [400, hy + 200]], INK, 8);
  ctx.save(); ctx.translate(0, Math.abs(Math.sin(T * 5)) < .25 ? 6 : -30); mk([[1300, 470], [1300, 590]], INK, 22); ctx.restore();
  if (!lifted) { for (let i = 0; i < 5; i++) { const x = 1250 - ((T * 400 + i * 160) % 800); mk([[x, 590], [x - 20, 575], [x - 40, 590]], RED, 6); } label('through the solid wood', 800, 700, 44, RED); }
  else { label('through the air: quieter', 800, 360, 44, BLUE); }
  label(lifted ? 'ear lifted' : 'ear on the table', 400, 260, 46);
};
TPL.splitView = (t, p, d, P) => {
  ctx.fillStyle = SPACE; ctx.fillRect(0, 0, W / 2, H); stars(30, 0, 0, W / 2, H); mc(560, 430, 200, '#ddd', 12); robotHead(560, 430, 1.2, 3); speakerIcon(560, 760, .45, 0, true); text('OUTSIDE: SILENT', 480, 150, 56, { color: '#fff' });
  shipWallHalf(); porthole(1440, 400, 160, () => robotHead(1440, 400, .9, 3)); figure(1200, GY - 122 * 1.2, 1.2, { seed: 11, look: [1, 0], mouth: 'o' }); text('INSIDE: "tap"', 1440, 150, 56, { color: RED });
  mk([[W / 2, 0], [W / 2, H]], INK, 10);
};
function shipWallHalf() { ctx.fillStyle = 'rgba(180,190,200,.25)'; ctx.fillRect(W / 2, 0, W / 2, GY); mk([[W / 2, GY], [W, GY]], INK, 8); }
TPL.cta = (t, p, d, P) => {
  if (P.mode !== 'sub') {
    const w1 = SW(/cry/i), w2 = SW(/jump/i);
    popIn(prog(t, w1 - .3, w1 + .1), 520, 450, () => { mk([[-360, -220], [360, -220], [360, 220], [-360, 220]], INK, 8, { close: true, fill: '#fff' }); astro(0, 60, .7, { seed: 11, mouth: 'sad' }); dot(-20, -60, 8, BLUE); label('Crying in space?', 0, 170, 44); });
    popIn(prog(t, w2 - .3, w2 + .1), 1400, 450, () => { mk([[-360, -220], [360, -220], [360, 220], [-360, 220]], INK, 8, { close: true, fill: '#fff' }); astro(0, 20 - Math.abs(Math.sin(T * 2)) * 60, .7, { seed: 51, scarfCol: BLUE, bun: true, pose: { armL: [-2.6, -3], armR: [2.6, 3] } }); label('Jumping on the Moon?', 0, 170, 40); });
    label('comment below!', 960, 140, 56, RED);
  } else {
    popIn(prog(t, SW(/subscribe/i) - .3, SW(/subscribe/i) + .1), 960, 420, () => { mk([[-300, -90], [300, -90], [300, 90], [-300, 90]], RED, 10, { close: true }); text('SUBSCRIBE', 0, 4, 80, { color: RED }); });
    astro(560, GY - 240, 1.0, { seed: 11, pose: { armL: [-2.6, -3], armR: [.3, .2] } }); astro(1360, GY - 240, 1.0, { seed: 51, scarfCol: BLUE, bun: true, look: [-1, 0], pose: { armL: [-.3, -.2], armR: [2.6, 3] } });
  }
};
TPL.endcard = (t, p, d, P) => { text('See you in the next one!', 960, 300, 80, { color: INK }); astro(760, GY - 240, 1.0, { seed: 11, pose: { armL: [-2.6, -3], armR: [.3, .2] } }); astro(1160, GY - 240, 1.0, { seed: 51, scarfCol: BLUE, bun: true, look: [-1, 0], pose: { armL: [-.3, -.2], armR: [2.6, 3] } }); const f = prog(t, d - 1, d); if (f > 0) { ctx.save(); ctx.fillStyle = '#000'; ctx.globalAlpha = f; ctx.fillRect(0, 0, W, H); ctx.restore(); } };

// ---------- kicker + subtitles ----------
function kicker(seg, lt) { if (!seg.kick) return; const k = easeOut(prog(lt, .15, .6)); ctx.save(); ctx.globalAlpha = k; ctx.font = "900 34px 'Inter Display'"; const w = ctx.measureText(seg.kick).width + 60; ctx.fillStyle = 'rgba(28,28,30,.9)'; rrect(40, 30 - (1 - k) * 20, w, 64, 32); ctx.fill(); ctx.restore(); text(seg.kick, 40 + w / 2, 64 - (1 - k) * 20, 34, { color: '#FFC83A', alpha: k }); }
function subtitles(t) { if (!SEG || !SEG.chunks) return; const c = SEG.chunks.find(c => t >= c.s - .05 && t < c.e + .25); if (!c) return;
  const who = SEG.spk === 'j' ? 'JACK: ' : SEG.spk === 't' ? 'TILLY: ' : ''; const s = who + c.text;
  ctx.save(); ctx.font = "800 46px 'Inter Display'"; const tw = ctx.measureText(s).width; ctx.fillStyle = 'rgba(20,20,28,.8)'; rrect(960 - tw / 2 - 30, 948, tw + 60, 84, 20); ctx.fill(); ctx.restore();
  text(s, 960, 992, 46, { color: SEG.spk === 'n' ? '#fff' : SEG.spk === 'j' ? '#FFB3B3' : '#B3D4FF', weight: 800 }); }
window.setup = tl => { TL = tl; return tl.segs.length; };
window.render = t => {
  T = t; BOIL = Math.floor(t * 8); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.drawImage(paper, 0, 0);
  let i = TL.segs.findIndex(s => t >= s.a && t < s.b); if (i < 0) i = TL.segs.length - 1; SEG = TL.segs[i];
  const lt = t - SEG.a, d = SEG.b - SEG.a; const z = 1 + .02 * (lt / d);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2); (TPL[SEG.scene] || TPL.endcard)(lt, lt / d, d, SEG.params || {}); ctx.restore();
  kicker(SEG, lt); subtitles(t); return i;
};
window.grab = () => cv.toDataURL('image/jpeg', 0.9).split(',')[1];
