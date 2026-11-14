#!/bin/bash
# usage: build.sh <dir>  -> assembles render.html from gta head + no-lies helpers + common + ep.js + captions
cd /home/user/what-if-videos/$1
G=../gta-preload/render.html; L1=$(grep -n "^// ---------- scenes" $G | cut -d: -f1); L2=$(grep -n "^// ---------- captions" $G | cut -d: -f1); N=$(grep -n "^// ---------- scenes" ../no-lies-24h/scenes.js | cut -d: -f1)
{ sed -n "1,$((L1-1))p" $G; sed -n "1,$((N-1))p" ../no-lies-24h/scenes.js; cat ../common_ep.js ep.js; sed -n "$L2,\$p" $G; } > render.html
