#!/usr/bin/env node
// Start a card entry from a capture: the script writes every measured line, and leaves the
// classification and a short reading for whoever annotates it.
//
//   node scripts/draft.mjs <slug> [<slug> ...]    draft a card for each capture
//   node scripts/draft.mjs --new                  every capture that has no entry yet
//   node scripts/draft.mjs --refresh <slug>       rewrite only the Measured block of an existing card
//   node scripts/draft.mjs --print <slug>         show the Measured block without writing anything
//
// A card that already exists is left alone unless --refresh is given. Full entries are never touched.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REFS = path.join(ROOT, 'design-references/refs');
const read = async (f) => JSON.parse(await fs.readFile(f, 'utf8'));
const maybe = (f) => read(f).catch(() => null);
const pct = (share) => `${Math.round(share * 100)}%`;
const minus = (s) => String(s).replace(/-/g, '−');

// "56px/1.07 w600 -0.005em uppercase SF Pro Display · 1%" → parts
function parseStyle(str) {
  const m = String(str).match(/^([\d.]+)px\/(\S+) w(\d+)(?: (-?[\d.]+)em)?(?: (uppercase|lowercase|capitalize))? ?(.*?)(?: · (\d+)%)?$/);
  if (!m) return null;
  return { size: +m[1], lh: m[2], weight: m[3], track: m[4], transform: m[5], family: m[6], share: m[7] ? +m[7] : null };
}
const styleText = (s) => `${s.size}/${s.lh} w${s.weight}${s.track ? ` ${minus(s.track)}em` : ''}${s.transform ? ` ${s.transform}` : ''}`;

// The style carrying the most characters, among sizes big enough to be reading text.
function commonest(scale) {
  const by = (list) => list.slice().sort((a, b) => (b.share ?? 0) - (a.share ?? 0))[0];
  return by(scale.filter((s) => s.size >= 11)) || by(scale);
}

// The top bar. The capture's own guess is used when it is a plausible bar; otherwise the first
// pinned bar or the page's first short band stands in. Returns null when nothing fits.
function navOf(t, st) {
  const n = t.components.nav;
  if (n && n.h >= 30 && n.h <= 200) return { h: n.h, pinned: n.position === 'static' ? null : n.position, ground: n.bg, blur: n.blur };
  for (const p of st?.pinned || []) {
    const m = p.match(/^\w+ (\d+)×(\d+) · (sticky|fixed)/);
    if (m && +m[1] >= 600 && +m[2] >= 30 && +m[2] <= 200) return { h: +m[2], pinned: m[3], ground: p.match(/bg (#\S+)/)?.[1] || 'none', blur: p.match(/backdrop (\S+)/)?.[1] };
  }
  const first = st?.sections[0];
  if (first && first.y <= 10 && first.h >= 30 && first.h <= 200) return { h: first.h, pinned: first.pinned ? 'pinned' : null, ground: first.ground };
  return null;
}

function measured(t, st, ph) {
  const lines = [];
  const scale = (t.type.scale || []).map(parseStyle).filter(Boolean);
  const body = commonest(scale);
  const h1 = t.type.h1 && parseStyle(t.type.h1.style);

  // type. A display face carries few characters, so the h1's family is named even when its share is tiny.
  const fams = t.fonts.used.filter(([, s]) => s >= 0.03).slice(0, 3).map(([f, s]) => `${f} ${pct(s)}`).join(', ');
  const listed = scale.slice(0, 7);
  if (body && !listed.includes(body)) listed.push(body);
  const sizes = listed.map((s) => styleText(s) + (s === body ? ` (commonest, ${s.share}%)` : '')).join(' · ');
  const h1Family = h1 && h1.family && h1.family !== t.fonts.used[0]?.[0] ? ` in ${h1.family}` : '';
  // An h1 far smaller than the largest text is a wordmark or a hidden heading, not the headline.
  const realH1 = h1 && (!scale[0] || h1.size >= scale[0].size * 0.6);
  lines.push(`type: ${fams || t.fonts.used[0]?.[0] || 'unknown'}. ${realH1 ? `h1 ${styleText(h1)}${h1Family}. ` : ''}Sizes in px: ${sizes}.`);

  // colour
  const top = (list, n) => list.filter(([, s]) => s >= 0.01).slice(0, n).map(([c, s]) => `${c} ${pct(s)}`).join(', ');
  const borders = t.color.borders.slice(0, 2).map(([b]) => b).join(', ');
  // Light or dark, and which grounds matter, come from the screenshots when the capture has pixel
  // counts: a canvas, an image or a stacked layer can hide the ground the style rules describe.
  let scheme = t.page.scheme;
  let grounds = top(t.color.bg, 3) || t.page.bg;
  if (t.pixels) {
    scheme = t.pixels.light >= 0.6 ? 'light' : t.pixels.light <= 0.4 ? 'dark' : 'part light, part dark';
    const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const known = [...t.color.bg.map(([c]) => c), t.page.bg].filter((c) => /^#[0-9a-f]{6}$/.test(c));
    const exact = (seen) => {
      const a = rgb(seen);
      const best = known.map((c) => [c, rgb(c).reduce((d, v, i) => d + Math.abs(v - a[i]), 0)]).sort((x, y) => x[1] - y[1])[0];
      return best && best[1] <= 16 ? best[0] : `about ${seen}`;
    };
    const seenList = [];
    for (const [c, share] of t.pixels.top) {
      const name = exact(c);
      const had = seenList.find((x) => x[0] === name);
      if (had) had[1] += share;
      else seenList.push([name, share]);
    }
    const flat = seenList.filter(([, share]) => share >= 0.05).sort((a, b) => b[1] - a[1]).slice(0, 4);
    grounds = flat.length ? flat.map(([c, share]) => `${c} ${pct(share)}`).join(', ') : `no flat colour covers 5% (imagery); style rules give ${top(t.color.bg, 3) || t.page.bg}`;
  }
  lines.push(`colour: ${scheme}. ${t.pixels ? 'On screen' : 'Grounds'} ${grounds}. Text ${top(t.color.text, 3)}.${borders ? ` Borders ${borders}.` : ' No borders.'}${t.color.gradients.length ? ` ${t.color.gradients.length} gradient${t.color.gradients.length > 1 ? 's' : ''}.` : ''}`);

  // space and shape
  const widths = t.space.contentWidth.slice(0, 2).map(([w]) => w).join(' and ');
  const pads = t.space.sectionPad.map(([v]) => v).sort((a, b) => a - b).join(', ');
  // No centred container was found on pages framed by a sidebar or laid out edge to edge.
  lines.push(`space: ${widths ? `content ${widths} of 1440` : 'no centred column measured (a sidebar frame or an edge-to-edge layout)'}.${pads ? ` Section padding ${pads}.` : ''} Scale ${t.space.scale.join(' · ')}.`);
  const radii = t.shape.radii.slice(0, 4).map(([r, n]) => `${r} ×${n}`).join(', ');
  lines.push(`shape: ${radii ? `radii ${radii}` : 'square corners'}; ${t.shape.shadows.length ? `${t.shape.shadows.length} kind${t.shape.shadows.length > 1 ? 's' : ''} of shadow` : 'no shadows'}.`);

  // motion
  const durs = t.motion.durations.slice(0, 3).map(([d]) => d).join(' / ');
  const ease = t.motion.easings.slice(0, 2).map(([e]) => e).join(' and ');
  const props = t.motion.properties.slice(0, 3).map(([p]) => p).join(', ');
  lines.push(durs ? `motion: ${durs} on ${ease}; on ${props}.` : 'motion: no transitions measured.');

  // nav and buttons
  const nav = navOf(t, st);
  if (nav) lines.push(`nav: ${nav.h}px, ${nav.pinned || 'not pinned'}, ground ${nav.ground}${nav.blur ? `, ${nav.blur}` : ''}.`);
  const btn = (b) => {
    const f = parseStyle(b.font);
    return `${b.h}px tall, ${b.padX}px side padding, radius ${b.radius}, ${b.bg === 'none' ? 'no fill' : `fill ${b.bg}`}, text ${b.color}${b.border !== 'none' ? `, border ${b.border}` : ''}${f ? `, ${f.size}px w${f.weight}` : ''}`;
  };
  if (t.components.buttons.length) lines.push(`buttons: ${t.components.buttons.slice(0, 2).map(btn).join(' | ')}.`);

  // the page as bands
  if (st) {
    const bands = st.sections.filter((s) => s.h >= 60 || s.pinned);
    const band = (s) => {
      const bits = [`${s.h}`, s.ground];
      if (s.largest) bits.push(`${s.largest.size}px${/center/.test(s.largest.align) ? ' centred' : ''}`);
      if (s.media >= 30) bits.push(`media ${s.media}%`);
      // A row whose columns are wider than any screen is a carousel track or a marquee, not a layout.
      const widest = s.row ? Math.max(...(s.row.split(',')[0].match(/\d+/g) || [0]).map(Number)) : 0;
      if (s.row && (widest <= 1500 || /scrolls/.test(s.row))) bits.push(`[${s.row.split(', ').slice(0, 3).join(', ')}]`);
      if (s.stage) bits.push('pinned stage');
      return bits.join(' ');
    };
    const first = st.sections.filter((s) => s.y < 900 && s.largest).sort((a, b) => b.largest.size - a.largest.size)[0];
    const top = Math.max(first ? first.largest.size : 0, h1 ? h1.size : 0);
    lines.push(`first screen: ${Math.round(t.layout.foldMedia * 100)}% image or video${top ? `; largest text ${top}px${first && first.largest.size === top && /center/.test(first.largest.align) ? ', centred' : ''}` : ''}.`);
    if (bands.length > 1) lines.push(`bands (height ground largest-text): ${bands.slice(0, 12).map(band).join(' → ')}${bands.length > 12 ? ` → and ${bands.length - 12} more` : ''}.`);
    const set = (s) => {
      const surface = s.item.slice(0, 3).join(' ');
      const rad = surface.match(/radius (\S+)/)?.[1];
      const bg = surface.match(/bg (#\S+)/)?.[1];
      const gap = s.in.match(/gap (\d+)/)?.[1];
      return `${s.n} × ${s.w}×${s.h}${gap ? `, gap ${gap}` : ''}${s.shelf ? `, ${s.shelf.replace(/ \(.*\)/, '')}` : ''}${rad || bg ? ` (${[rad && `radius ${rad}`, bg && `fill ${bg}`].filter(Boolean).join(', ')})` : ''}`;
    };
    if (st.sets.length) lines.push(`repeated parts: ${st.sets.slice(0, 3).map(set).join('; ')}.`);
  }

  // phone
  if (ph && ph.page.screens <= 1.2 && t.page.screens >= 3) {
    lines.push(`phone: capture not usable: one screen against ${t.page.screens} on desktop, most likely an overlay.`);
  } else if (ph) {
    const ps = (ph.type.scale || []).map(parseStyle).filter(Boolean);
    const pbody = commonest(ps);
    const ph1 = ph.type.h1 && parseStyle(ph.type.h1.style);
    const bits = [];
    const pTop = ps[0];
    if (realH1 && ph1) bits.push(`h1 ${h1.size} → ${ph1.size}px`);
    else if (scale[0] && pTop) bits.push(`largest text ${scale[0].size} → ${pTop.size}px`);
    if (body && pbody && body.size >= 11 && pbody.size >= 11) bits.push(`commonest text ${body.size} → ${pbody.size}px`);
    if (ph.space.contentWidth[0]) bits.push(`content ${ph.space.contentWidth[0][0]} of 390`);
    const dp = t.space.sectionPad[0]?.[0], pp = ph.space.sectionPad[0]?.[0];
    if (dp && pp && pp <= Math.max(dp, 120)) bits.push(`section padding ${dp} → ${pp}`);
    const pnav = ph.components.nav;
    if (pnav && pnav.h >= 30 && pnav.h <= 200) bits.push(`nav ${pnav.h}px`);
    if (t.components.buttons[0] && ph.components.buttons[0]) bits.push(`buttons ${t.components.buttons[0].h} → ${ph.components.buttons[0].h}px tall`);
    if (st?.sets[0] && ph.sets?.[0]) bits.push(`repeated parts ${st.sets[0].w} → ${ph.sets[0].w}px wide${ph.sets[0].shelf ? ', in a sideways row' : ''}`);
    bits.push(`${t.page.screens} → ${ph.page.screens} screens`);
    lines.push(`phone: ${bits.join('; ')}.`);
  } else {
    lines.push('phone: not captured.');
  }
  return lines.map((l) => `- ${l}`).join('\n');
}

async function draft(slug, { refresh, print }) {
  const dir = path.join(ROOT, 'captures', slug, 'ref');
  const t = await maybe(path.join(dir, 'tokens.json'));
  if (!t) return `skip ${slug}: no capture`;
  const block = measured(t, await maybe(path.join(dir, 'structure.json')), await maybe(path.join(dir, 'phone.json')));
  if (print) return `## ${slug}\n${block}\n`;
  const file = path.join(REFS, `${slug}.md`);
  const existing = await fs.readFile(file, 'utf8').catch(() => null);
  if (existing !== null) {
    if (!/^depth: card$/m.test(existing)) return `skip ${slug}: a full entry exists`;
    if (!refresh) return `skip ${slug}: card exists (--refresh rewrites its Measured block)`;
    const next = existing.replace(/## Measured\n[\s\S]*?(?=\n## |\s*$)/, `## Measured\n${block}\n`).replace(/^captured: .*$/m, `captured: ${t.captured}`);
    await fs.writeFile(file, next);
    return `ok   ${slug}: Measured block refreshed`;
  }
  const entry = `---
url: ${t.url}
captured: ${t.captured}
type: TODO
sector: TODO
tags: [TODO]
summary: TODO
picked-by: ${t.note || 'TODO'}
depth: card
---

## Measured
${block}

## Read
- TODO

## Weak spots
- TODO
`;
  await fs.writeFile(file, entry);
  return `ok   ${slug}: draft written`;
}

const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const print = args.includes('--print');
let slugs = args.filter((a) => !a.startsWith('--'));
if (args.includes('--new')) {
  const have = new Set((await fs.readdir(REFS)).map((f) => f.replace(/\.md$/, '')));
  slugs = (await fs.readdir(path.join(ROOT, 'captures'))).filter((s) => !s.startsWith('.') && !have.has(s)).sort();
}
if (!slugs.length) {
  console.error('usage: draft.mjs <slug> [<slug> ...] | --new | --refresh <slug> | --print <slug>');
  process.exit(1);
}
for (const s of slugs) console.log(await draft(s, { refresh, print }));
