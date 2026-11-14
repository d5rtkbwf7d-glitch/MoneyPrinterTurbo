// ---------- Same house, $90k deposit difference ----------
const GRN = '#2E9E5B';
function cashStack(x, base, h, col, lab, k) { const hh = h * ease(k); box(x - 120, base - hh, 240, Math.max(4, hh), 14, col, 7); for (let y = base - 40; y > base - hh + 20; y -= 40) { ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x - 110, y, 220, 6); } if (k > .6) pillM(x, base - hh - 70, lab, INK, 44); }
function disclaimer() { text('General info only, not financial advice.', 540, 1870, 28, { color: '#5C6784', weight: 700 }); }
function soldSign(x, y, txt) { ctx.fillStyle = '#8D6E63'; ctx.fillRect(x - 8, y, 16, 220); box(x - 170, y - 110, 340, 120, 16, '#fff', 7); text(txt, x, y - 46, 52, { color: R1 }); }
const S = [];
S[0] = (t, p, d) => { bg('#8ED1FC', '#CDEBFF'); ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, GY - 120, W, H);
  ctx.save(); ctx.translate(0, 0); house(290, GY - 120, .7); house(790, GY - 120, .7); ctx.restore(); pillM(270, 1000, '20%: $120K', B1, 40); pillM(790, 1000, '5%: $30K', T1, 40);
  text('SAME HOUSE', 540, 330, 70, { color: INK }); const n = A(0, /Ninety/i, 1.2); if (t > n - .2) stamp('$90K DIFFERENCE', 540, 1520, prog(t, n - .2, n + .1), R1, 84, -.05); disclaimer(); };
S[1] = (t, p, d) => { bg('#8ED1FC', '#CDEBFF'); ctx.fillStyle = '#7BC96F'; ctx.fillRect(0, GY - 60, W, H); house(540, GY - 60, .95);
  const s = A(1, /six/i, 1); if (t > s - .2) popIn(prog(t, s - .2, s + .1), 540, 430, () => pillM(0, 0, '$600,000', R1, 76)); pillM(540, 300, 'YOUR FIRST HOME', INK, 54); disclaimer(); };
S[2] = (t, p, d) => { bg('#F1F3F8', '#E3E8F2'); box(80, 1180, 920, 14, 7, INK, 0); pillM(540, 280, '$600,000 HOME', INK, 50);
  const k = prog(t, A(2, /twenty/i, .5), A(2, /twenty/i, .5) + 1.5); cashStack(330, 1180, 640, B1, '$120,000', k); text('20%', 330, 1250, 50, { color: B1 }); disclaimer(); };
S[3] = (t, p, d) => { bg('#F1F3F8', '#E3E8F2'); box(80, 1180, 920, 14, 7, INK, 0); pillM(540, 280, '$600,000 HOME', INK, 50);
  cashStack(330, 1180, 640, B1, '$120,000', 1); text('20%', 330, 1250, 50, { color: B1 }); const k = prog(t, A(3, /Five/i, .2), A(3, /Five/i, .2) + .8); cashStack(760, 1180, 160, T1, '$30,000', k); text('5%', 760, 1250, 50, { color: T1 });
  if (t > A(3, /Thirty/i, 1.2) + .3) { ctx.save(); ctx.strokeStyle = R1; ctx.lineWidth = 8; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.moveTo(470, 540); ctx.lineTo(920, 540); ctx.moveTo(900, 560); ctx.lineTo(900, 1000); ctx.stroke(); ctx.restore(); pillM(760, 760, '−$90K', R1, 50); } disclaimer(); };
S[4] = (t, p, d) => { bg('#FFF1D6', '#FDE2C4'); pillM(540, 280, 'SMALLER DEPOSIT = BIGGER LOAN', R1, 44);
  [[B1, '20% DEPOSIT', 480, 380], [T1, '5% DEPOSIT', 570, 640]].forEach(([c, l, loan, y], i) => { const k = prog(t, .4 + i * .6, 1.4 + i * .6); text(l, 540, y, 40, { color: c }); box(100, y + 40, 880, 90, 20, '#fff', 6); ctx.fillStyle = c; rrect(106, y + 46, 868 * (loan / 600) * ease(k), 78, 16); ctx.fill(); if (k > .8) text('LOAN $' + loan + 'K', 540, y + 88, 42, { color: '#fff' }); });
  const s = A(4, /situation/i, 4); if (t > s - .3) { hero(540, 1.0, { mouth: 'o', look: [0, -.4] }); stamp('DEPENDS ON YOUR SITUATION', 540, 1520, prog(t, s - .3, s), INK, 52, -.04); } disclaimer(); };
S[5] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); pillM(540, 300, 'FIRST HOME ON AN', INK, 54); pillM(540, 420, 'AVERAGE AUSSIE SALARY?', R1, 54); house(540, 900, .75); hero(300, 1.1, { mouth: 'smile', look: [1, 0] });
  const tp = A(5, /Tap/i, 4); if (t > tp - .3) { popIn(prog(t, tp - .3, tp), 540, 1520, () => { box(-330, -80, 660, 160, 40, R1, 7); text('TAP THE VIDEO BELOW', 0, 6, 50, { color: '#fff' }); }); const b = Math.abs(Math.sin(T * 5)) * 30; ctx.save(); ctx.strokeStyle = R1; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(540, 1640 + b); ctx.lineTo(540, 1760 + b); ctx.moveTo(480, 1700 + b); ctx.lineTo(540, 1765 + b); ctx.lineTo(600, 1700 + b); ctx.stroke(); ctx.restore(); }
  else disclaimer(); };
