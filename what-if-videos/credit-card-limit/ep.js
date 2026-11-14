// ---------- $0 owing, but the limit still counts ----------
function disclaimer() { text('General info only, not financial advice.', 540, 1870, 28, { color: '#5C6784', weight: 700 }); }
function ccard(x, y, s, line1, line2, col = '#6C63FF') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); box(-300, -185, 600, 370, 34, col, 8); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.beginPath(); ctx.arc(220, -150, 160, 0, 7); ctx.fill();
  box(-240, -110, 100, 76, 12, '#FFC83A', 4); text('•••• •••• •••• 4821', 0, 40, 40, { color: '#fff', font: "'DejaVu Sans Mono'", weight: 700 }); text(line1, -230, 110, 30, { color: 'rgba(255,255,255,.8)', align: 'left' }); text(line2, 230, 120, 52, { color: '#fff', align: 'right' }); ctx.restore(); }
function meter(y, f, lab, col) { box(100, y, 880, 90, 20, '#fff', 6); ctx.fillStyle = col; rrect(106, y + 6, 868 * f, 78, 16); ctx.fill(); text(lab, 540, y + 48, 40, { color: f > .35 ? '#fff' : INK }); }
const S = [];
S[0] = (t, p, d) => { bg('#F1F3F8', '#E3E8F2'); ccard(540, 520, 1.25, 'BALANCE OWING', '$0'); check(540, 820, 1.4, T1); const h = A(0, /home/i, 4);
  if (t > h - .4) { house(540, 1180, .5); text('?', 760, 960, 160, { color: R1, stroke: INK, sw: 8 }); } if (t < h - .4) pillM(540, 1100, 'ALL PAID OFF', T1, 52); disclaimer(); };
S[1] = (t, p, d) => { bg('#F1F3F8', '#E3E8F2'); ccard(540, 620, 1.25, 'BALANCE OWING', '$0'); const l = A(1, /limit/i, 1.5); if (t > l - .3) popIn(prog(t, l - .3, l), 540, 1000, () => pillM(0, 0, 'LIMIT: $10,000', R1, 64)); disclaimer(); };
S[2] = (t, p, d) => { bg('#FFF1D6', '#FDE2C4'); const fl = A(2, /full/i, 1.2), bw = A(2, /borrow/i, 4), mo = A(2, /month/i, 7);
  const L = person(250, 1.05, 41, { mouth: 'flat', look: [1, 0] }); ctx.fillStyle = R1; ctx.beginPath(); ctx.moveTo(L.neck[0] - 10, L.neck[1] + 6); ctx.lineTo(L.neck[0] + 10, L.neck[1] + 6); ctx.lineTo(L.neck[0], L.neck[1] + 90); ctx.fill(); pillM(250, 1520, 'THE LENDER', INK, 44);
  ccard(700, 400, .65, 'LIMIT', '$10,000'); if (t > fl - .2) stamp('FULL LIMIT COUNTED', 700, 240, prog(t, fl - .2, fl + .1), R1, 44, -.05);
  const k = ease(prog(t, bw - .3, bw + 1.2)); text('YOUR BORROWING POWER', 540, 610, 36, { color: INK }); meter(650, 1 - .22 * k, k > .5 ? 'REDUCED' : 'ESTIMATE', k > .5 ? '#F4A261' : T1);
  if (t > mo - .3) { box(470, 960, 460, 110, 24, '#fff', 6); text('PAID OFF MONTHLY', 670, 1016, 36, { color: INK }); check(880, 1012, .7, T1); text('still counts', 680, 1120, 38, { color: R1 }); } disclaimer(); };
S[3] = (t, p, d) => { floor('#FFF1D6', '#FDE2C4', '#E9B98A'); pillM(540, 300, 'WHAT ELSE AFFECTS', INK, 54); pillM(540, 420, 'YOUR BORROWING POWER?', R1, 54); house(540, 900, .75); hero(300, 1.1, { mouth: 'o', look: [1, 0] });
  const tp = A(3, /Tap/i, 3.5); if (t > tp - .3) { popIn(prog(t, tp - .3, tp), 540, 1520, () => { box(-330, -80, 660, 160, 40, R1, 7); text('TAP THE VIDEO BELOW', 0, 6, 50, { color: '#fff' }); }); const b = Math.abs(Math.sin(T * 5)) * 30; ctx.save(); ctx.strokeStyle = R1; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(540, 1640 + b); ctx.lineTo(540, 1760 + b); ctx.moveTo(480, 1700 + b); ctx.lineTo(540, 1765 + b); ctx.lineTo(600, 1700 + b); ctx.stroke(); ctx.restore(); }
  else disclaimer(); };
