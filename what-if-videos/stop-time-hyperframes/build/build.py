import json, os
P = '/home/user/what-if-videos/hyperframes/stop-time'
TL = json.load(open('/home/user/what-if-videos/stop-time/timeline.json'))
W = json.load(open(f'{P}/assets/transcript.json'))   # Whisper: the words and punctuation
# Whisper.cpp timestamps drift ~1 s early after pauses, so take each word's timing from the
# voice engine (exact, it generated the speech) and keep Whisper's text, matched by position.
assert len(W) == len(TL['words']), (len(W), len(TL['words']))
for w, e in zip(W, TL['words']): w['start'], w['end'] = e['s'], e['e']
SC = TL['scenes']; TOT = TL['total']
INK = '#2B2D42'
# words by script line (Whisper words matched by position to the script's words)
script = json.load(open('/home/user/what-if-videos/stop-time/script.json'))
line_of = []; [line_of.extend([i] * len(l.split())) for i, l in enumerate(script)]
for w, li in zip(W, line_of): w['line'] = li
def wt(line, prefix):
    for w in W:
        if w['line'] == line and w['text'].lower().strip('.,?!').startswith(prefix): return round(w['start'] - SC[line]['a'], 3)
    raise KeyError(prefix)

def person(pid, cx, fy, s=1.0, top='#E63946', cap=True, mouth='smile', arms='down', skin='#FFD3B5', pants='#3D5A80'):
    a = {'down': ('M-28,-150 L-52,-60', 'M28,-150 L52,-60'), 'up': ('M-28,-150 L-70,-250', 'M28,-150 L70,-250'), 'push': ('M-28,-150 L60,-150', 'M28,-150 L95,-140'), 'snap': ('M-28,-150 L-52,-60', 'M28,-150 L80,-230')}[arms]
    m = {'smile': 'M-14,-262 Q0,-248 14,-262', 'o': None, 'flat': 'M-12,-258 L12,-258', 'sad': 'M-13,-252 Q0,-264 13,-252'}[mouth]
    mouthsvg = f'<path d="{m}" stroke="{INK}" stroke-width="5" fill="none" stroke-linecap="round"/>' if m else f'<ellipse cx="0" cy="-257" rx="9" ry="12" fill="#B5303A" stroke="{INK}" stroke-width="4"/>'
    capsvg = f'<path d="M-42,-292 A42,42 0 0 1 42,-292 Z" fill="#E63946" stroke="{INK}" stroke-width="5"/><rect x="0" y="-300" width="56" height="12" rx="6" fill="#E63946" stroke="{INK}" stroke-width="4"/>' if cap else '<path d="M-42,-290 A42,42 0 0 1 42,-290 Z" fill="#6B3A1F"/>'
    return f'''<g transform="translate({cx},{fy}) scale({s})"><g id="{pid}">
  <path d="M-16,-90 L-26,0 M16,-90 L26,0" stroke="{pants}" stroke-width="26" stroke-linecap="round"/>
  <path d="{a[0]} {a[1]}" stroke="{top}" stroke-width="22" stroke-linecap="round" fill="none"/>
  <rect x="-40" y="-190" width="80" height="112" rx="26" fill="{top}" stroke="{INK}" stroke-width="6"/>
  <circle cx="0" cy="-272" r="44" fill="{skin}" stroke="{INK}" stroke-width="6"/>{capsvg}
  <circle cx="-15" cy="-275" r="6" fill="{INK}"/><circle cx="15" cy="-275" r="6" fill="{INK}"/>{mouthsvg}
</g></g>'''

def city(tint=None):
    b = ''.join(f'<rect x="{x}" y="{1150-h}" width="{w}" height="{h+10}" fill="{c}"/>' for x, w, h, c in [(-10,170,520,'#B8C5E0'),(170,140,680,'#A7B6D6'),(320,190,460,'#C3CEE6'),(520,150,740,'#A7B6D6'),(680,180,560,'#B8C5E0'),(870,220,640,'#C3CEE6')])
    win = ''.join(f'<rect x="{x}" y="{y}" width="22" height="30" fill="rgba(255,255,255,.55)"/>' for x in range(20, 1080, 52) for y in range(560, 1120, 70) if (x * 7 + y) % 3)
    return f'<rect width="1080" height="1920" fill="#8ED1FC"/>{b}{win}<rect y="1150" width="1080" height="770" fill="#8A8FA3"/><rect y="1150" width="1080" height="18" fill="#6E7488"/>'

def scene(sid, i, body_svg, extra_html, script_js, bg='#8ED1FC'):
    d = round(SC[i]['b'] - SC[i]['a'], 3)
    return f'''<template>
  <style>
    #root {{ position: absolute; inset: 0; background: {bg}; overflow: hidden; }}
    #root svg {{ position: absolute; inset: 0; }}
    .{sid}-label {{ position: absolute; left: 0; right: 0; text-align: center; font-family: Inter, sans-serif; font-weight: 900; color: #fff; -webkit-text-stroke: 10px {INK}; paint-order: stroke fill; }}
    .{sid}-tint {{ position: absolute; inset: 0; }}
  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920" data-start="0" data-duration="{d}" data-layout-allow-overlap>
    <svg id="{sid}-art" class="clip" data-start="0" data-duration="{d}" width="1080" height="1920" viewBox="0 0 1080 1920" data-layout-ignore>{body_svg}</svg>
    {extra_html}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {script_js}
    window.__timelines["{sid}"] = tl;
  </script>
</template>
'''
def lab(sid, lid, text, y, size, d0, d1, color='#fff'):
    return f'<div id="{sid}-{lid}" class="clip {sid}-label" data-start="{d0}" data-duration="{round(d1-d0,3)}" style="top:{y}px;font-size:{size}px;color:{color}"><span id="{sid}-{lid}-t">{text}</span></div>'
def pop(sel, t):  # land a label with a pop
    return f'tl.fromTo("{sel}", {{ scale: 0.6, opacity: 0 }}, {{ scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.2)" }}, {t});'
def dur(i): return round(SC[i]['b'] - SC[i]['a'], 3)

files = {}
# S1 hook: frame 0 already carries the question
d = dur(0)
art = city() + '<g transform="translate(540,720)"><circle r="230" fill="#fff" stroke="#2B2D42" stroke-width="14"/>' + ''.join(f'<rect x="-6" y="-215" width="12" height="40" rx="6" fill="#2B2D42" transform="rotate({k*30})"/>' for k in range(12)) + '<rect x="-9" y="-150" width="18" height="160" rx="9" fill="#2B2D42"/><g id="s1-hand"><rect x="-4" y="-200" width="8" height="220" rx="4" fill="#E63946"/></g><circle r="18" fill="#2B2D42"/></g>'
files['s1'] = scene('s1', 0, art, lab('s1', 'title', 'WHAT IF YOU COULD<br>STOP TIME?', 230, 92, 0, d, '#FFB703'),
    f'tl.fromTo("#s1-hand", {{ rotation: 0, svgOrigin: "0 0" }}, {{ rotation: 360 * 1.2, svgOrigin: "0 0", duration: {d}, ease: "none" }}, 0);\n    tl.fromTo("#s1-title-t", {{ scale: 1.08 }}, {{ scale: 1, duration: 0.5, ease: "power2.out" }}, 0);')
# S2 snap and freeze
d = dur(1); sn = wt(1, 'snap'); fr = wt(1, 'freez')
art = city() + person('s2-walk1', 200, 1150, .8, '#2A9D8F', cap=False) + person('s2-walk2', 860, 1150, .8, '#6C63FF', cap=False) + person('s2-hero', 540, 1150, 1.25, arms='snap', mouth='smile') + '<g id="s2-burst" transform="translate(640,830)">' + ''.join(f'<rect x="-5" y="-90" width="10" height="44" rx="5" fill="#FFB703" transform="rotate({k*45})"/>' for k in range(8)) + '</g><g transform="translate(160,420)"><path id="s2-bird" d="M-40,0 Q-20,-30 0,0 Q20,-30 40,0" stroke="#2B2D42" stroke-width="8" fill="none"/></g>'
extra = '<div id="s2-ice" class="clip s2-tint" data-start="0" data-duration="%s" style="background:rgba(150,210,255,0)"></div>' % d + lab('s2', 'snap', 'SNAP!', 300, 120, sn, d, '#FFB703') + lab('s2', 'freeze', 'FROZEN', 450, 90, fr, d, '#BDE0FE')
files['s2'] = scene('s2', 1, art, extra, f'''tl.fromTo("#s2-walk1", {{ x: 0 }}, {{ x: 160, duration: {sn}, ease: "none" }}, 0);
    tl.fromTo("#s2-walk2", {{ x: 0 }}, {{ x: -140, duration: {sn}, ease: "none" }}, 0);
    tl.fromTo("#s2-bird", {{ x: 0, y: 0 }}, {{ x: 260, y: -40, duration: {sn}, ease: "none" }}, 0);
    tl.fromTo("#s2-burst", {{ scale: 0.2, opacity: 0 }}, {{ scale: 1.3, opacity: 1, duration: 0.25, ease: "power3.out", svgOrigin: "0 0" }}, {sn});
    tl.to("#s2-burst", {{ opacity: 0, duration: 0.3 }}, {sn + 0.4});
    tl.fromTo("#s2-ice", {{ backgroundColor: "rgba(150,210,255,0)" }}, {{ backgroundColor: "rgba(150,210,255,0.38)", duration: 0.4 }}, {sn + 0.05});
    {pop("#s2-snap-t", sn)}
    {pop("#s2-freeze-t", fr)}''')
# S3 free money? wrong.
d = dur(2); wr = wt(2, 'wrong')
art = city() + '<rect x="660" y="640" width="300" height="510" rx="20" fill="#5C6784" stroke="#2B2D42" stroke-width="8"/><rect x="700" y="690" width="220" height="140" rx="10" fill="#39FF88"/><rect x="700" y="880" width="220" height="30" rx="8" fill="#2B2D42"/>' + ''.join(f'<g transform="translate({430+k*90},{760+(k%2)*60}) rotate({(k-2)*14})"><g id="s3-cash{k}"><rect x="-55" y="-28" width="110" height="56" rx="8" fill="#7BC96F" stroke="#2B2D42" stroke-width="5"/><text x="0" y="12" text-anchor="middle" font-family="Inter" font-weight="900" font-size="34" fill="#2E7D32">$</text></g></g>' for k in range(4)) + person('s3-hero', 300, 1150, 1.2, arms='up', mouth='smile') + '<rect width="1080" height="1920" fill="rgba(150,210,255,.38)"/>'
extra = lab('s3', 'q', 'FREE MONEY?', 300, 96, 0.1, d, '#7BC96F') + f'<div id="s3-wrong" class="clip" data-start="{wr}" data-duration="{round(d-wr,3)}" style="position:absolute;left:0;right:0;top:470px;text-align:center"><span id="s3-wrong-t" style="display:inline-block;background:#E63946;color:#fff;font:900 130px Inter;padding:10px 50px;border-radius:30px;border:8px solid #2B2D42">WRONG.</span></div>'
files['s3'] = scene('s3', 2, art, extra, ''.join(f'tl.fromTo("#s3-cash{k}", {{ y: 0 }}, {{ y: -30, duration: 1, ease: "sine.inOut" }}, {k*0.1});' for k in range(4)) + pop('#s3-q-t', 0.1) + f'tl.fromTo("#s3-wrong-t", {{ scale: 2.2, opacity: 0, rotation: -8 }}, {{ scale: 1, opacity: 1, rotation: -6, duration: 0.3, ease: "power4.out" }}, {wr});')
# S4 air molecules -> concrete
d = dur(3); mo = wt(3, 'molecule'); cc = wt(3, 'concrete')
dots = ''.join(f'<circle cx="{40+c*68+(r%2)*34}" cy="{220+r*62}" r="10" fill="#4FA3E0"/>' for r in range(15) for c in range(15))
bricks = ''.join(f'<rect x="{(c*150)-(r%2)*75}" y="{200+r*70}" width="140" height="60" rx="6" fill="#9AA0B5" stroke="#6E7488" stroke-width="5"/>' for r in range(14) for c in range(9))
art = f'<rect width="1080" height="1920" fill="#E8F6FF"/><g id="s4-dots">{dots}</g><g id="s4-bricks" opacity="0">{bricks}</g><rect y="1150" width="1080" height="770" fill="#8A8FA3"/>' + person('s4-hero', 500, 1150, 1.25, arms='push', mouth='o')
extra = lab('s4', 'mol', 'AIR MOLECULES: FROZEN', 230, 64, mo, d, '#4FA3E0') + lab('s4', 'con', 'LIKE CONCRETE', 340, 96, cc, d, '#fff')
files['s4'] = scene('s4', 3, art, extra, f'''tl.fromTo("#s4-hero", {{ x: 0, rotation: 0, svgOrigin: "0 0" }}, {{ x: -18, rotation: 8, svgOrigin: "0 0", duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: {int(d/1.2)} }}, 0);
    tl.fromTo("#s4-dots", {{ opacity: 0.25 }}, {{ opacity: 1, duration: 0.4 }}, {mo});
    tl.fromTo("#s4-bricks", {{ opacity: 0 }}, {{ opacity: 0.85, duration: 0.5 }}, {cc});
    {pop("#s4-mol-t", mo)}
    {pop("#s4-con-t", cc)}''')
# S5 light stops: pitch black
d = dur(4); pb = wt(4, 'pitch')
rays = ''.join(f'<rect x="{200+k*30}" y="{330+k*55}" width="70" height="10" rx="5" fill="#FFB703" transform="rotate(28 {200+k*30} {330+k*55})"/>' for k in range(10)) + ''.join(f'<rect x="{620+k*24}" y="{360+k*60}" width="60" height="10" rx="5" fill="#FFB703" transform="rotate(62 {620+k*24} {360+k*60})"/>' for k in range(9))
art = city() + '<circle cx="880" cy="300" r="90" fill="#FFE066"/>' + rays + person('s5-hero', 540, 1150, 1.25, mouth='o')
extra = f'<div id="s5-dark" class="clip s5-tint" data-start="0" data-duration="{d}" style="background:#000;opacity:0"></div>' + lab('s5', 'pb', 'PITCH BLACK', 420, 110, pb, d, '#fff')
files['s5'] = scene('s5', 4, art, extra, f'tl.fromTo("#s5-dark", {{ opacity: 0 }}, {{ opacity: 0.94, duration: 0.6, ease: "power2.in" }}, {pb - 0.4});\n    {pop("#s5-pb-t", pb)}')
# S6 sound can't travel
d = dur(5)
art = '<rect width="1080" height="1920" fill="#0B0A1F"/><g transform="translate(470,700)"><path d="M-120,-60 L-40,-60 L50,-150 L50,150 L-40,60 L-120,60 Z" fill="#F1F3F8"/>' + ''.join(f'<path d="M{100+k*60},-{90+k*40} Q{150+k*70},0 {100+k*60},{90+k*40}" stroke="#4FA3E0" stroke-width="16" fill="none" stroke-linecap="round" opacity="{0.9-k*0.25}"/>' for k in range(3)) + '<path id="s6-x" d="M-170,-210 L330,210" stroke="#E63946" stroke-width="30" stroke-linecap="round"/></g>'
extra = lab('s6', 'ns', 'NO SOUND', 300, 110, 0.2, d, '#fff')
files['s6'] = scene('s6', 5, art, extra, f'tl.fromTo("#s6-x", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.3 }}, 0.3);\n    {pop("#s6-ns-t", 0.2)}', bg='#0B0A1F')
# S7 blind, deaf, suffocating
d = dur(6)
icons = [('blind', '<ellipse rx="110" ry="66" fill="#fff" stroke="#2B2D42" stroke-width="10"/><circle r="42" fill="#4FA3E0"/><circle r="20" fill="#2B2D42"/>'),
         ('deaf', '<path d="M-40,-90 Q60,-110 60,-10 Q60,40 10,60 Q-10,70 -10,100" stroke="#2B2D42" stroke-width="16" fill="#FFD3B5"/><path d="M-10,-40 Q20,-50 22,-10" stroke="#2B2D42" stroke-width="10" fill="none"/>'),
         ('suffocating', '<path d="M-20,-100 L-20,-40 Q-100,-40 -100,40 Q-100,110 -30,100 Q-10,60 -20,-40 M20,-100 L20,-40 Q100,-40 100,40 Q100,110 30,100 Q10,60 20,-40" stroke="#2B2D42" stroke-width="10" fill="#FF8FAB"/>')]
art = '<rect width="1080" height="1920" fill="#14213D"/>' + ''.join(f'<g id="s7-i{k}" transform="translate({200+k*340},640)"><circle r="150" fill="#F1F3F8" stroke="#2B2D42" stroke-width="10"/>{svg}<path id="s7-x{k}" d="M-110,-110 L110,110 M110,-110 L-110,110" stroke="#E63946" stroke-width="22" stroke-linecap="round" opacity="0"/></g>' for k, (w, svg) in enumerate(icons))
extra = ''.join(lab('s7', f'l{k}', w.upper(), 830, 52, wt(6, w[:5]), d, '#fff') for k, (w, _) in enumerate(icons))
# put the three labels side by side
extra = extra.replace('left: 0; right: 0', '')
js = ''
for k, (w, _) in enumerate(icons):
    t = wt(6, w[:5]); js += f'tl.fromTo("#s7-i{k}", {{ scale: 0.4, opacity: 0, svgOrigin: "{200+k*340} 640" }}, {{ scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)", svgOrigin: "{200+k*340} 640" }}, {t - 0.15});\n    tl.fromTo("#s7-x{k}", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.15 }}, {t + 0.2});\n    ' + pop(f'#s7-l{k}-t', t) + '\n    '
fa = wt(6, 'frozen')
extra = ''.join(f'<div id="s7-l{k}" class="clip s7-label" data-start="{wt(6, w[:5])}" data-duration="{round(d - wt(6, w[:5]), 3)}" style="top:820px;left:{200+k*340-170}px;width:340px;font-size:{50 if k < 2 else 40}px"><span id="s7-l{k}-t" style="display:inline-block">{w.upper()}</span></div>' for k, (w, _) in enumerate(icons)) + lab('s7', 'fa', 'IN A WORLD OF FROZEN AIR', 330, 60, fa, d, '#BDE0FE')
js += pop('#s7-fa-t', fa)
files['s7'] = scene('s7', 6, art, extra, js, bg='#14213D')
# S8 coffin
d = dur(7); cf = wt(7, 'coffin')
art = '<rect width="1080" height="1920" fill="#14213D"/>' + person('s8-hero', 540, 1100, 1.15, mouth='sad') + '<path id="s8-coffin" d="M440,380 L640,380 L760,560 L700,1140 L380,1140 L320,560 Z" fill="rgba(189,224,254,.28)" stroke="#BDE0FE" stroke-width="16" stroke-linejoin="round"/>'
extra = lab('s8', 'sp', 'SUPERPOWER', 220, 80, 0.1, d, '#FFB703') + lab('s8', 'cf', '= COFFIN', 320, 100, cf, d, '#fff')
files['s8'] = scene('s8', 7, art, extra, f'tl.fromTo("#s8-coffin", {{ opacity: 0, scale: 1.4, svgOrigin: "540 760" }}, {{ opacity: 1, scale: 1, svgOrigin: "540 760", duration: 0.5, ease: "power3.out" }}, {cf - 0.3});\n    {pop("#s8-sp-t", 0.1)}\n    {pop("#s8-cf-t", cf)}', bg='#14213D')
# S9 just ask for five more minutes
d = dur(8); fv = wt(8, 'five')
art = '<rect width="1080" height="1920" fill="#2E2A5A"/><rect y="1150" width="1080" height="770" fill="#3F3770"/><rect x="120" y="300" width="300" height="360" rx="16" fill="#14123A" stroke="#2B2D42" stroke-width="10"/><circle cx="300" cy="400" r="46" fill="#FFF3B0"/><circle cx="322" cy="386" r="42" fill="#14123A"/>' \
    '<rect x="120" y="900" width="840" height="70" rx="20" fill="#8D6E63" stroke="#2B2D42" stroke-width="6"/><rect x="120" y="840" width="40" height="280" rx="10" fill="#6D4C41"/><rect x="920" y="900" width="40" height="220" rx="10" fill="#6D4C41"/><rect x="160" y="850" width="220" height="80" rx="36" fill="#fff" stroke="#2B2D42" stroke-width="6"/>' \
    '<g transform="translate(270,880) rotate(-90)">' + person('s9-hero', 0, 0, .95, mouth='smile').replace('<g transform="translate(0,0) scale(0.95)">', '<g transform="scale(0.95)">') + '</g><rect x="400" y="820" width="540" height="130" rx="34" fill="#FFB703" stroke="#2B2D42" stroke-width="7"/>' \
    '<g id="s9-alarm" transform="translate(820,700)"><circle cx="-70" cy="-90" r="32" fill="#2B2D42"/><circle cx="70" cy="-90" r="32" fill="#2B2D42"/><rect x="-120" y="-80" width="240" height="160" rx="40" fill="#E63946" stroke="#2B2D42" stroke-width="8"/><rect x="-90" y="-45" width="180" height="90" rx="14" fill="#111"/><text x="0" y="18" text-anchor="middle" font-family="JetBrains Mono" font-weight="700" font-size="56" fill="#7CFC8A">7:00</text></g>'
extra = lab('s9', 'fm', '5 MORE MINUTES...', 260, 88, fv, d, '#FFB703') + ''.join(f'<div id="s9-z{k}" class="clip s9-label" data-start="0" data-duration="{d}" style="top:{760-k*70}px;left:{230+k*50}px;font-size:{50+k*14}px;color:#fff">z</div>' for k in range(3)) + f'<div id="s9-end" class="clip" data-start="{round(d-0.6,3)}" data-duration="0.6" style="position:absolute;inset:0;background:#000;opacity:0"></div>'
files['s9'] = scene('s9', 8, art, extra, f'''tl.fromTo("#s9-alarm", {{ rotation: -6, svgOrigin: "820 700" }}, {{ rotation: 6, svgOrigin: "820 700", duration: 0.08, ease: "none", yoyo: true, repeat: {int((fv)/0.08)} }}, 0);
    {''.join(f'tl.fromTo("#s9-z{k}", {{ y: 0, opacity: 1 }}, {{ y: -120, opacity: 0, duration: 1.6, ease: "none", repeat: {int(d/1.6)} }}, {k*0.5});' for k in range(3))}
    {pop("#s9-fm-t", fv)}
    tl.fromTo("#s9-end", {{ opacity: 0 }}, {{ opacity: 1, duration: 0.55 }}, 0);''', bg='#2E2A5A')

# captions: one host, groups of up to 4 words, current word turns yellow
groups, cur = [], []
for k, w in enumerate(W):
    cur.append(w); nx = W[k + 1] if k + 1 < len(W) else None
    if len(cur) >= 4 or w['text'][-1] in '.,?!' or nx is None or nx['start'] - w['end'] > 0.15 or nx['line'] != w['line']:
        groups.append(cur); cur = []
cap_html, cap_js = [], []
for g, grp in enumerate(groups):
    s0 = max(0.1, grp[0]['start'] - 0.05); nxt = groups[g + 1][0]['start'] - 0.05 if g + 1 < len(groups) else TOT - 0.1
    e = min(nxt, grp[-1]['end'] + 0.4)
    spans = ' '.join(f'<span id="cw{w["id"]}" class="cw">{w["text"].upper()}</span>' for w in grp)
    cap_html.append(f'<div id="cg{g}" class="clip cg" data-start="{round(s0,3)}" data-duration="{round(e-s0,3)}">{spans}</div>')
    cap_js.append(f'tl.fromTo("#cg{g}", {{ scale: 0.85 }}, {{ scale: 1, duration: 0.14, ease: "back.out(2)" }}, {round(s0,3)});')
    for j, w in enumerate(grp):
        nxt_s = grp[j + 1]['start'] if j + 1 < len(grp) else None
        off = round(max(w['start'] + 0.06, min(w['end'] + 0.02, (nxt_s - 0.06) if nxt_s else 1e9)), 3)
        cap_js.append(f'tl.fromTo("#cw{w["id"]}", {{ color: "#ffffff" }}, {{ color: "#FFD23F", duration: 0.05 }}, {round(w["start"],3)});' + (f'tl.to("#cw{w["id"]}", {{ color: "#ffffff", duration: 0.04 }}, {off});' if nxt_s else ''))
files['captions'] = f'''<template>
  <style>
    #root {{ position: absolute; inset: 0; }}
    .cg {{ position: absolute; left: 0; right: 0; top: 1180px; text-align: center; font-family: Inter, sans-serif; font-weight: 900; font-size: 84px; line-height: 1.05; color: #fff; -webkit-text-stroke: 16px {INK}; paint-order: stroke fill; padding: 0 60px; }}
    .cw {{ display: inline-block; }}
  </style>
  <div id="root" data-composition-id="captions" data-width="1080" data-height="1920" data-start="0" data-duration="{TOT}">
    {chr(10).join('    ' + h for h in cap_html)}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    {chr(10).join('    ' + j for j in cap_js)}
    window.__timelines["captions"] = tl;
  </script>
</template>
'''
for k, v in files.items(): open(f'{P}/compositions/{k}.html', 'w').write(v)
hosts = '\n'.join(f'      <div id="s{i+1}" data-composition-id="s{i+1}" data-composition-src="compositions/s{i+1}.html" data-start="{SC[i]["a"]}" data-duration="{round(SC[i]["b"]-SC[i]["a"],3)}" data-track-index="1" data-track-kind="graphics" data-width="1080" data-height="1920"></div>' for i in range(len(SC)))
index = f'''<!doctype html>
<html lang="en" data-resolution="portrait">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="assets/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ width: 1080px; height: 1920px; overflow: hidden; background: #000; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOT}" data-width="1080" data-height="1920">
{hosts}
      <div id="captions" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="{TOT}" data-track-index="2" data-track-kind="captions" data-width="1080" data-height="1920" style="z-index:5"></div>
      <audio id="voice" class="clip" src="assets/voice.wav" data-start="0" data-duration="{TOT}" data-track-index="3" data-volume="1"></audio>
      <audio id="sfx" class="clip" src="assets/sfx.wav" data-start="0" data-duration="{TOT}" data-track-index="4" data-volume="0.8"></audio>
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
'''
open(f'{P}/index.html', 'w').write(index)
# sound effects: noise only (no synthesised tones), each on an on-screen action
import numpy as np, wave
SR = 44100; N = int(SR * TOT); sfx = np.zeros(N); rng = np.random.default_rng(7)
def put(t, sig, g):
    i = int(t * SR); j = min(N, i + len(sig)); sfx[i:j] += sig[:j - i] * g
def lp(x, a):
    y = np.zeros_like(x); acc = 0.0
    for n in range(len(x)): acc += a * (x[n] - acc); y[n] = acc
    return y
def whoosh(d=.5):
    n = rng.standard_normal(int(SR * d)); t = np.arange(len(n)) / SR; return lp(n, .25) * np.sin(np.pi * t / d) ** 2
def snap(): n = rng.standard_normal(int(SR * .05)); t = np.arange(len(n)) / SR; return n * np.exp(-t * 120)
def thud(): n = rng.standard_normal(int(SR * .35)); t = np.arange(len(n)) / SR; return lp(n, .02) * np.exp(-t * 12) * 6
def rattle(d):
    n = rng.standard_normal(int(SR * d)); t = np.arange(len(n)) / SR; return n * (np.sin(2 * np.pi * 18 * t) > 0) * .25 * np.minimum(1, (d - t) * 3)
put(SC[1]['a'] + wt(1, 'snap') + .033, snap(), .9)
put(SC[2]['a'] + wt(2, 'wrong') + .033, thud(), .9)
for i in (3, 6, 8): put(SC[i]['a'] - .2, whoosh(), .35)
put(SC[8]['a'], rattle(wt(8, 'five')), .25)
sfx *= .5 / np.abs(sfx).max()
w = wave.open(f'{P}/assets/sfx.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((sfx * 32767).astype(np.int16).tobytes()); w.close()
print('built', len(files), 'files,', len(groups), 'caption groups')
