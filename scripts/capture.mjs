#!/usr/bin/env node
// Capture a page as the evidence behind a reference entry. Everything is measured from the
// rendered page; no markup, class names or assets are copied.
//
//   node scripts/capture.mjs <url | file.html | seeds.txt> [--slug name] [--out dir] [--screens 6] [--no-phone] [--note text] [--force]
//
// A seed list skips pages that already have a capture unless --force is given.
// Writes to captures/<slug>/ref/ (or --out):
//   shots/NN.webp         the page at 1440×900, one file per screen, top down
//   sheet-N.webp          those screens six to a sheet at half size, for a first look
//   tokens.json           measured type, colour, space, shape, layout and motion values
//   structure.md          the page as a list of sections, plus skeletons of its pinned and repeated parts
//   structure.json        the same sections and repeated parts as data
//   content.md            the page's text as an outline, brand stripped
//   shots-phone/NN.webp   the page at 390×844
//   sheet-phone.webp      the phone screens side by side
//   phone.json            the values that change at phone width
//   structure-phone.md    the same section map at phone width

import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROFILES = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  // A phone as sites see it: narrow, touch, and a mobile user agent so server-side device switches fire.
  phone: {
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  },
};
const PHONE_SCREENS = 4;

export function slugify(url) {
  const { hostname, pathname } = new URL(url);
  return (hostname.replace(/^www\./, '') + pathname)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Screenshots are stored as WebP: about 40% smaller than JPEG at the same legibility. The browser
// does the encoding, so nothing extra has to be installed.
const SHOT_QUALITY = 0.6;
const SHEET_QUALITY = 0.7;
const encoders = new WeakMap();
export async function toWebp(browser, buf, quality = SHOT_QUALITY, mime = 'image/png') {
  if (!encoders.has(browser)) encoders.set(browser, browser.newContext().then((c) => c.newPage()));
  const page = await encoders.get(browser);
  const b64 = await page.evaluate(async ({ b64, mime, quality }) => {
    const img = new Image();
    img.src = `data:${mime};base64,${b64}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    c.getContext('2d').drawImage(img, 0, 0);
    return c.toDataURL('image/webp', quality).split(',')[1];
  }, { b64: buf.toString('base64'), mime, quality });
  return Buffer.from(b64, 'base64');
}
const isShot = (f) => /\.(webp|jpg)$/.test(f);

// What is actually on screen, counted from the screenshots: the share of light pixels, and the
// colours covering the most area. Style rules can't tell you this when a canvas, an image or a
// stacked layer hides the ground they describe.
export async function pixelStats(browser, shotDir) {
  const files = (await fs.readdir(shotDir).catch(() => [])).filter(isShot).sort();
  if (!files.length) return null;
  if (!encoders.has(browser)) encoders.set(browser, browser.newContext().then((c) => c.newPage()));
  const page = await encoders.get(browser);
  const list = await Promise.all(files.map(async (f) => ({ mime: mimeOf(f), b64: (await fs.readFile(path.join(shotDir, f))).toString('base64') })));
  const raw = await page.evaluate(async (list) => {
    const buckets = new Map();
    let total = 0;
    let light = 0;
    const screens = [];
    for (const it of list) {
      const img = new Image();
      img.src = `data:${it.mime};base64,${it.b64}`;
      await img.decode();
      const w = 240;
      const h = Math.round((240 * img.naturalHeight) / img.naturalWidth);
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const cx = c.getContext('2d', { willReadFrequently: true });
      cx.imageSmoothingEnabled = false;
      cx.drawImage(img, 0, 0, w, h);
      const d = cx.getImageData(0, 0, w, h).data;
      let l = 0;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], b = d[i + 2];
        if ((0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.5) l++;
        const k = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);
        const e = buckets.get(k) || [0, 0, 0, 0];
        e[0]++; e[1] += r; e[2] += g; e[3] += b;
        buckets.set(k, e);
      }
      total += w * h;
      light += l;
      screens.push(+(l / (w * h)).toFixed(2));
    }
    return { light: +(light / total).toFixed(2), screens, top: [...buckets.values()].sort((a, b) => b[0] - a[0]).slice(0, 24).map(([n, r, g, b]) => [Math.round(r / n), Math.round(g / n), Math.round(b / n), n / total]) };
  }, list);
  // Lossy screenshots smear one flat colour over neighbouring buckets; fold near-identical ones together.
  const merged = [];
  for (const [r, g, b, share] of raw.top) {
    const near = merged.find((m) => Math.abs(m[0] - r) + Math.abs(m[1] - g) + Math.abs(m[2] - b) <= 12);
    if (near) near[3] += share;
    else merged.push([r, g, b, share]);
  }
  const hex2 = (v) => v.toString(16).padStart(2, '0');
  return {
    light: raw.light,
    screens: raw.screens,
    top: merged.filter((m) => m[3] >= 0.02).slice(0, 6).map(([r, g, b, share]) => [`#${hex2(r)}${hex2(g)}${hex2(b)}`, +share.toFixed(2)]),
  };
}
const mimeOf = (f) => (f.endsWith('.webp') ? 'image/webp' : 'image/jpeg');

export async function launch() {
  // Prefer the installed Chrome so nothing has to be downloaded.
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    try {
      return await chromium.launch();
    } catch {
      throw new Error('No browser found. Install Google Chrome, or run: npx playwright-core install chromium');
    }
  }
}

// Runs inside the page. Must be self-contained.
function extract() {
  const vw = innerWidth;
  const vh = innerHeight;
  const round = (n, d = 2) => +Number(n).toFixed(d);
  const bump = (m, k, w = 1) => {
    if (k != null && k !== '') m.set(k, (m.get(k) || 0) + w);
  };
  const topN = (m, n) => [...m].sort((a, b) => b[1] - a[1]).slice(0, n);
  const shares = (m, n) => {
    const total = [...m.values()].reduce((a, b) => a + b, 0) || 1;
    return topN(m, n).map(([k, v]) => [k, round(v / total)]);
  };
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

  // Normalise any CSS colour (oklch, color(), named) to hex by painting one pixel.
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const hexCache = new Map();
  const hex = (c) => {
    if (!c) return null;
    if (hexCache.has(c)) return hexCache.get(c);
    cx.clearRect(0, 0, 1, 1);
    cx.fillStyle = c;
    cx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data;
    let out = null;
    if (a > 0) {
      out = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
      if (a < 250) out += `@${Math.round(a / 2.55)}%`;
    }
    hexCache.set(c, out);
    return out;
  };
  const SIDES = ['Top', 'Right', 'Bottom', 'Left'];
  const borderOf = (cs) => {
    const s = SIDES.find((x) => parseFloat(cs[`border${x}Width`]) > 0 && cs[`border${x}Style`] !== 'none');
    if (!s) return null;
    const col = hex(cs[`border${s}Color`]);
    return col ? `${round(parseFloat(cs[`border${s}Width`]), 1)}px ${col}` : null;
  };
  const radiusOf = (cs, r) => {
    const raw = cs.borderTopLeftRadius;
    if (raw === '0px') return null;
    if (raw.includes('%')) return raw.split(' ')[0];
    const px = parseFloat(raw);
    return px >= Math.min(r.width, r.height) / 2 - 0.5 ? 'pill' : `${round(px, 1)}px`;
  };
  const fontOf = (cs) => cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
  const typeOf = (cs) => {
    const size = parseFloat(cs.fontSize);
    const lh = cs.lineHeight === 'normal' ? 'normal' : round(parseFloat(cs.lineHeight) / size);
    const ls = cs.letterSpacing === 'normal' ? 0 : round(parseFloat(cs.letterSpacing) / size, 3);
    const tt = cs.textTransform === 'none' ? '' : ` ${cs.textTransform}`;
    return `${round(size, 1)}px/${lh} w${cs.fontWeight}${ls ? ` ${ls}em` : ''}${tt} ${fontOf(cs)}`;
  };
  const splitList = (s) => s.split(/,(?![^(]*\))/).map((x) => x.trim());

  const fonts = new Map(), sizes = new Map(), styleBySize = new Map(), textCol = new Map(),
    bgCol = new Map(), borders = new Map(), gradients = new Map(), radii = new Map(),
    shadows = new Map(), space = new Map(), sectionPad = new Map(), widths = new Map(),
    gridCols = new Map(), tDur = new Map(), tEase = new Map(), tProp = new Map(), anims = new Map();
  const blocks = [];
  const seenBlock = new Set();
  const buttons = [];
  const buttonSigs = new Set();
  let flex = 0, grid = 0, pinned = 0, media = 0, foldMedia = 0;

  const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'LINK', 'META', 'BR']);
  const els = [...document.body.querySelectorAll('*')].slice(0, 15000);

  for (const el of els) {
    if (SKIP.has(el.tagName) || el.ownerSVGElement) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const y = r.top + scrollY;
    // Screen-reader-only text, skip links and closed menus: styled, but not part of what is seen.
    const unseen = r.width < 2 || r.height < 2 || r.right <= 0 || r.bottom + scrollY <= 0 || +cs.opacity === 0;
    const bg = hex(cs.backgroundColor);
    const border = borderOf(cs);

    // Text
    let own = 0;
    for (const n of el.childNodes) if (n.nodeType === 3) own += n.nodeValue.trim().length;
    if (own > 0) {
      const size = round(parseFloat(cs.fontSize), 1);
      bump(fonts, fontOf(cs), own);
      bump(sizes, size, own);
      if (!styleBySize.has(size)) styleBySize.set(size, new Map());
      bump(styleBySize.get(size), typeOf(cs), own);
      bump(textCol, hex(cs.color), own);
      if (own >= 2 && !unseen) {
        // Group text by its nearest non-inline box so a sentence with links stays one block.
        let b = el;
        while (b !== document.body && getComputedStyle(b).display === 'inline') b = b.parentElement;
        if (!seenBlock.has(b)) {
          seenBlock.add(b);
          blocks.push({ el: b, size });
        }
      }
    }

    // Colour and shape
    if (bg) bump(bgCol, bg, r.width * r.height);
    if (border) bump(borders, border);
    if (cs.backgroundImage.includes('gradient(')) bump(gradients, cs.backgroundImage.slice(0, 140));
    const isMedia = /^(IMG|VIDEO|CANVAS)$/.test(el.tagName) || (el.tagName === 'svg' && r.width > 200) || cs.backgroundImage.startsWith('url(');
    const rad = radiusOf(cs, r);
    if (rad && (bg || border || isMedia || cs.overflow !== 'visible')) bump(radii, rad);
    if (cs.boxShadow !== 'none') bump(shadows, cs.boxShadow.slice(0, 140));

    // Space
    for (const p of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'marginTop', 'marginBottom', 'rowGap', 'columnGap']) {
      const v = parseFloat(cs[p]);
      if (v > 0 && v <= 400) bump(space, Math.round(v));
    }
    if (r.width >= vw * 0.9 && r.height >= 240) {
      for (const p of ['paddingTop', 'paddingBottom']) {
        const v = parseFloat(cs[p]);
        if (v >= 32) bump(sectionPad, Math.round(v));
      }
    }
    if (el.children.length && r.width >= Math.min(480, vw * 0.6) && r.width <= vw - Math.min(32, vw * 0.04) && Math.abs(r.left - (vw - r.right)) <= 2) {
      bump(widths, Math.round(r.width));
    }

    // Layout
    if (cs.display.includes('flex')) flex++;
    if (cs.display.includes('grid')) {
      grid++;
      const n = cs.gridTemplateColumns.split(/\s+(?![^(]*\))/).filter(Boolean).length;
      if (n > 1) bump(gridCols, n);
    }
    if (cs.position === 'sticky' || cs.position === 'fixed') pinned++;
    if (isMedia) {
      media++;
      const h = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      const w = Math.min(r.right, vw) - Math.max(r.left, 0);
      if (scrollY === 0 && h > 0 && w > 0) foldMedia += h * w;
    }

    // Motion
    const durs = splitList(cs.transitionDuration);
    if (durs.some((d) => parseFloat(d) > 0)) {
      const props = splitList(cs.transitionProperty);
      const eases = splitList(cs.transitionTimingFunction);
      props.forEach((p, i) => {
        const d = durs[i % durs.length];
        if (parseFloat(d) > 0) {
          bump(tDur, d.endsWith('ms') ? d : `${Math.round(parseFloat(d) * 1000)}ms`);
          bump(tEase, eases[i % eases.length]);
          bump(tProp, p);
        }
      });
    }
    if (cs.animationName !== 'none') {
      bump(anims, `${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction} x${cs.animationIterationCount}`.slice(0, 140));
    }

    // Buttons near the top of the page
    if (!unseen && el.matches('a, button, [role=button]') && y < vh * 2 && r.height >= 24 && r.height <= 72 && (bg || border)) {
      const text = clean(el.innerText);
      if (text.length >= 1 && text.length <= 32) {
        const b = {
          text,
          h: Math.round(r.height),
          padX: Math.round(parseFloat(cs.paddingLeft)),
          radius: rad || '0',
          bg: bg || 'none',
          color: hex(cs.color),
          border: border || 'none',
          font: typeOf(cs),
        };
        const sig = [b.h, b.padX, b.radius, b.bg, b.color, b.border].join('|');
        if (!buttonSigs.has(sig) && buttons.length < 4) {
          buttonSigs.add(sig);
          buttons.push(b);
        }
      }
    }
  }

  // Type scale: every size carrying real text, largest first, with its dominant style.
  const totalChars = [...sizes.values()].reduce((a, b) => a + b, 0) || 1;
  const bodySize = topN(sizes, 1)[0]?.[0] ?? 16;
  let scaleSizes = [...sizes].filter(([, n]) => n >= 8).sort((a, b) => b[0] - a[0]);
  if (scaleSizes.length > 10) {
    const keep = new Set([...scaleSizes.slice(0, 2), ...topN(new Map(scaleSizes), 8)].map(([s]) => s));
    scaleSizes = scaleSizes.filter(([s]) => keep.has(s));
  }
  const scale = scaleSizes.map(([s, n]) => `${topN(styleBySize.get(s), 1)[0][0]} · ${Math.max(1, Math.round((n / totalChars) * 100))}%`);
  const heading = (sel) => {
    const el = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().height > 0 && clean(e.innerText));
    if (!el) return null;
    const cs = getComputedStyle(el);
    return { text: clean(el.innerText).slice(0, 80), style: typeOf(cs), color: hex(cs.color) };
  };

  // Navigation
  let nav = null;
  // The top bar: the first header or nav that is a bar near the top of the page, not a link row inside
  // one or a full-screen wrapper around the whole page.
  const navCandidates = [...document.querySelectorAll('header, nav, [role=navigation]')].filter((e) => getComputedStyle(e).display !== 'none');
  const navEl = navCandidates.find((e) => {
    const r = e.getBoundingClientRect();
    return r.top < 200 && r.width >= vw * 0.5 && r.height >= 30 && r.height <= 220;
  }) || navCandidates[0];
  if (navEl) {
    const r = navEl.getBoundingClientRect();
    let pos = 'static';
    for (let e = navEl; e && e !== document.body; e = e.parentElement) {
      const p = getComputedStyle(e).position;
      if (p === 'fixed' || p === 'sticky') { pos = p; break; }
    }
    const cs = getComputedStyle(navEl);
    nav = {
      h: Math.round(r.height),
      position: pos,
      bg: hex(cs.backgroundColor) || 'none',
      blur: cs.backdropFilter && cs.backdropFilter !== 'none' ? cs.backdropFilter : undefined,
      links: navEl.querySelectorAll('a').length,
    };
  }

  // Content outline, with no style information in it.
  const lines = [];
  const navLabels = [], footLabels = [];
  const seenText = new Set();
  for (const { el, size } of blocks) {
    const text = clean(el.innerText);
    if (text.length < 2 || seenText.has(text)) continue;
    seenText.add(text);
    const header = el.closest('header');
    const inNav = el.closest('nav, [role=navigation]') || (header && header.getBoundingClientRect().height < 140);
    if (el.closest('footer')) { if (text.length <= 40) footLabels.push(text); continue; }
    if (inNav) { if (text.length <= 40) navLabels.push(text); continue; }
    const act = el.closest('a, button, [role=button]');
    if (act && text.length <= 32) {
      const acs = getComputedStyle(act);
      if (hex(acs.backgroundColor) || borderOf(acs)) { lines.push({ s: `[button] ${text}` }); continue; }
    }
    const tag = el.tagName;
    const cut = text.length > 280 ? text.slice(0, 280) + '…' : text;
    if (tag === 'H1') lines.push({ s: `# ${cut}` });
    else if (tag === 'H2' || (!/^H\d$/.test(tag) && size >= bodySize * 2 && text.length < 140)) lines.push({ s: `## ${cut}` });
    else if (/^H[3-6]$/.test(tag) || (size >= bodySize * 1.35 && text.length < 120)) lines.push({ s: `### ${cut}` });
    else if (tag === 'LI') lines.push({ s: `- ${cut}` });
    else lines.push({ s: cut, small: text.length < 28 });
  }
  // A run of small fragments is a product mock-up, table or tag list. Keep that it exists, not every cell.
  const outline = [];
  for (let i = 0; i < lines.length; ) {
    let j = i;
    while (j < lines.length && lines[j].small) j++;
    if (j - i >= 3) {
      const run = lines.slice(i, j).map((l) => l.s);
      outline.push(`(labels: ${run.slice(0, 8).join(' · ')}${run.length > 8 ? ' …' : ''})`);
      i = j;
    } else {
      outline.push(lines[i].s);
      i++;
    }
  }
  const meta = (n) => document.querySelector(`meta[name="${n}"], meta[property="${n}"]`)?.content || '';
  const content = [
    `Title: ${clean(document.title)}`,
    meta('description') && `Description: ${clean(meta('description'))}`,
    navLabels.length && `Nav: ${navLabels.slice(0, 12).join(' · ')}`,
    '',
    ...outline.slice(0, 140),
    '',
    footLabels.length && `Footer: ${footLabels.slice(0, 16).join(' · ')}`,
  ].filter((l) => l !== false && l !== 0 && l !== undefined).join('\n');

  // Libraries that shape motion or layout
  const libs = [];
  const has = (sel) => !!document.querySelector(sel);
  if (window.gsap) libs.push('gsap');
  if (window.Lenis || document.documentElement.classList.contains('lenis')) libs.push('lenis');
  if (has('[data-framer-name], [data-framer-component-type]')) libs.push('framer');
  if (window.THREE) libs.push('three');
  if (window.Webflow) libs.push('webflow');
  if (window.Shopify) libs.push('shopify');
  if (window.__NEXT_DATA__ || has('script[src*="/_next/"]')) libs.push('next');
  if (has('astro-island, [data-astro-cid]')) libs.push('astro');
  if (meta('generator')) libs.push(meta('generator').slice(0, 40));

  const pageBg = hex(getComputedStyle(document.body).backgroundColor) || hex(getComputedStyle(document.documentElement).backgroundColor) || '#ffffff';
  const pageH = (window.__scroller || document.documentElement).scrollHeight;
  bump(bgCol, pageBg, vw * pageH);
  const mainBg = topN(new Map([...bgCol].filter(([k]) => !k.includes('@'))), 1)[0]?.[0] || pageBg;
  const lum = (h) => (0.2126 * parseInt(h.slice(1, 3), 16) + 0.7152 * parseInt(h.slice(3, 5), 16) + 0.0722 * parseInt(h.slice(5, 7), 16)) / 255;

  // ---- Structure: the page as stacked sections, then skeletons of its pinned and repeated parts. ----
  // Positions assume the page is scrolled to the top, which is where the capture leaves it.
  const scroller = window.__scroller || document.scrollingElement;
  const offY = scroller === document.scrollingElement ? scrollY : scroller.scrollTop;
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { l: r.left, r: r.right, t: r.top + offY, b: r.bottom + offY, w: r.width, h: r.height };
  };
  const kidsOf = (el, flowOnly) => {
    const out = [];
    for (const k of el.children) {
      if (SKIP.has(k.tagName)) continue;
      const cs = getComputedStyle(k);
      if (cs.display === 'contents') { out.push(...kidsOf(k, flowOnly)); continue; }
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (flowOnly && (cs.position === 'fixed' || cs.position === 'absolute')) continue;
      const r = k.getBoundingClientRect();
      if (r.width >= 2 && r.height >= 2) out.push(k);
    }
    return out;
  };
  const ownChars = (el) => {
    let n = 0;
    for (const c of el.childNodes) if (c.nodeType === 3) n += c.nodeValue.trim().length;
    return n;
  };
  const scrollsX = (el, cs) => /auto|scroll/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 40;
  const snapOf = (cs) => (cs.scrollSnapType && cs.scrollSnapType !== 'none' ? ` (snap ${cs.scrollSnapType})` : '');
  // The sideways scroller an element sits in, if any: itself or one of its three nearest ancestors.
  const shelfOf = (el) => {
    for (let e = el, i = 0; e && e !== document.body && i < 4; e = e.parentElement, i++) {
      const cs = getComputedStyle(e);
      if (scrollsX(e, cs)) return `scrolls sideways${snapOf(cs)}`;
    }
    return null;
  };
  const padOf = (cs) => {
    const p = SIDES.map((s) => Math.round(parseFloat(cs[`padding${s}`])));
    if (!p.some(Boolean)) return null;
    if (p.every((v) => v === p[0])) return `pad ${p[0]}`;
    if (p[0] === p[2] && p[1] === p[3]) return `pad ${p[0]} ${p[1]}`;
    return `pad ${p.join(' ')}`;
  };

  // Sections: start from the scroller's children and open up anything too tall to be one band.
  let secs = kidsOf(scroller === document.scrollingElement ? document.body : scroller, true);
  for (let pass = 0; pass < 10; pass++) {
    let changed = false;
    const next = [];
    for (const el of secs) {
      const b = box(el);
      const ks = kidsOf(el, true);
      const kb = ks.map(box);
      // Stacked top to bottom. A little overlap is allowed because bands are often pulled up over each
      // other, and short children are left out of the test: a pinned bar sits on top of its neighbours.
      const tall = kb.filter((k) => k.h >= 120);
      const stacked = ks.length > 0 && tall.every((k, i) => i === 0 || k.t >= tall[i - 1].b - Math.max(4, tall[i - 1].h * 0.25));
      const inner = kb.reduce((a, k) => a + k.h, 0);
      const big = kb.filter((k) => k.h >= 120).length;
      // A tall block whose children don't fill it is a scroll track or one padded band: keep it whole.
      // So is a long run of small children, which is running text.
      if (b.h > vh * 2 && stacked && inner >= b.h * 0.6 && ks.length <= 40 && (ks.length <= 3 || big >= ks.length / 2)) {
        next.push(...ks);
        changed = true;
      } else next.push(el);
    }
    secs = next;
    if (!changed) break;
  }
  secs = secs.filter((el) => box(el).h >= 24).sort((a, b) => box(a).t - box(b).t);

  // The widest row of side-by-side children under an element: its column layout.
  const rowOf = (el) => {
    const ks = kidsOf(el, true);
    if (ks.length < 2) return null;
    const bs = ks.map(box);
    const row = [bs[0]];
    for (let i = 1; i < bs.length; i++) {
      const p = row[row.length - 1];
      if (bs[i].l >= p.r - 2 && bs[i].t < bs[0].b - 4 && bs[i].b > bs[0].t + 4) row.push(bs[i]);
      else break;
    }
    if (row.length < 2 || row.filter((b) => b.w >= 100).length < 2) return null;
    const ws = row.map((b) => Math.round(b.w));
    const same = ws.every((w) => Math.abs(w - ws[0]) <= 2);
    const gap = Math.round(row[1].l - row[0].r);
    const shelf = shelfOf(el);
    let s = same ? `${row.length} × ${ws[0]}` : ws.slice(0, 6).join(' + ') + (ws.length > 6 ? ' …' : '');
    if (gap > 0) s += `, gap ${gap}`;
    if (ks.length > row.length) s += `, ${Math.ceil(ks.length / row.length)} rows`;
    if (shelf) s += `, ${shelf}`;
    const eb = box(el);
    return { s, area: Math.min(eb.w, vw) * eb.h };
  };

  const secData = [];
  const sectionLines = (el, i) => {
    const b = box(el);
    const area = Math.max(1, Math.min(b.w, vw) * b.h);
    const cs0 = getComputedStyle(el);
    let bg = hex(cs0.backgroundColor);
    let bgNote = cs0.backgroundImage.startsWith('url(') ? ' + image' : cs0.backgroundImage.includes('gradient(') ? ' + gradient' : '';
    let head = null, row = null, stage = null, mediaArea = 0;
    let L = Infinity, R = -Infinity, T = Infinity, B = -Infinity;
    const styles = new Map();
    for (const d of [el, ...[...el.querySelectorAll('*')].slice(0, 3000)]) {
      if (SKIP.has(d.tagName) || d.ownerSVGElement) continue;
      const cs = getComputedStyle(d);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      const r = box(d);
      if (r.w < 2 || r.h < 2 || r.r <= 0 || r.l >= vw) continue;
      if (d !== el && Math.min(r.w, vw) * r.h >= area * 0.7) {
        const dbg = hex(cs.backgroundColor);
        if (dbg && !dbg.includes('@')) bg = dbg;
        if (cs.backgroundImage.startsWith('url(')) bgNote = ' + image';
      }
      // Text counts when the element holds three characters itself, or is one piece of a large
      // heading that has been split into words or letters for animation.
      const own = ownChars(d);
      if (own >= 3 || (own >= 1 && parseFloat(cs.fontSize) >= 20 && clean(d.parentElement?.innerText).length >= 3)) {
        const size = parseFloat(cs.fontSize);
        bump(styles, `${typeOf(cs)} ${hex(cs.color)}`, own);
        if (!head || size > head.size) head = { size, style: `${typeOf(cs)} ${hex(cs.color)}`, align: cs.textAlign, text: clean(d.innerText).slice(0, 48) };
        L = Math.min(L, Math.max(0, r.l));
        R = Math.max(R, Math.min(vw, r.r));
        T = Math.min(T, r.t);
        B = Math.max(B, r.b);
      }
      if (/^(IMG|VIDEO|CANVAS)$/.test(d.tagName) || (d.tagName === 'svg' && r.w > 200) || cs.backgroundImage.startsWith('url(')) {
        const w = Math.min(r.r, vw) - Math.max(r.l, 0);
        const h = Math.min(r.b, b.b) - Math.max(r.t, b.t);
        if (w > 0 && h > 0) mediaArea += w * h;
        T = Math.min(T, r.t);
        B = Math.max(B, r.b);
      }
      if (cs.position === 'sticky' && d !== el && r.h >= vh * 0.5 && !stage) stage = `${Math.round(r.w)}×${Math.round(r.h)}`;
      const ro = rowOf(d);
      if (ro && (!row || ro.area > row.area)) row = ro;
    }
    const l1 = [
      `${String(i + 1).padStart(2, '0')} ${el.tagName.toLowerCase()}`,
      `y ${Math.round(b.t)}`,
      `h ${Math.round(b.h)}${b.h >= vh * 0.3 ? ` (${round(b.h / vh, 1)} screens)` : ''}`,
      `ground ${bg || pageBg}${bgNote}`,
    ];
    if (R > L) l1.push(`content ${Math.round(R - L)} wide`);
    const top = Number.isFinite(T) ? Math.max(0, Math.round(T - b.t)) : 0;
    const bot = Number.isFinite(B) ? Math.max(0, Math.round(b.b - B)) : 0;
    if (top || bot) l1.push(`space ${top} above / ${bot} below`);
    const share = Math.min(1, mediaArea / area);
    if (share >= 0.05) l1.push(`media ${Math.round(share * 100)}%`);
    if (stage) l1.push(`pinned stage ${stage} inside`);
    if (cs0.position === 'sticky' || cs0.position === 'fixed') l1.push(cs0.position);
    // A bar is described by what you can press in it; its labels are often images, not text.
    if (b.h < 200) {
      const links = [...el.querySelectorAll('a, button')].filter((a) => {
        const r = a.getBoundingClientRect();
        return r.width >= 8 && r.height >= 8 && r.right > 0 && r.left < vw && getComputedStyle(a).visibility !== 'hidden';
      }).length;
      if (links) l1.push(`${links} link${links === 1 ? '' : 's'}`);
    }
    const out = [l1.join(' · ')];
    if (head) out.push(`   largest: ${head.style}${/center|right|end/.test(head.align) ? ` ${head.align}` : ''} — "${head.text}"`);
    const common = topN(styles, 1)[0];
    if (common && (!head || common[0] !== head.style)) out.push(`   commonest: ${common[0]}`);
    if (row) out.push(`   row: ${row.s}`);
    secData.push({
      n: i + 1,
      tag: el.tagName.toLowerCase(),
      y: Math.round(b.t),
      h: Math.round(b.h),
      ground: `${bg || pageBg}${bgNote}`,
      content: R > L ? Math.round(R - L) : null,
      media: Math.round(share * 100),
      largest: head ? { size: round(head.size, 1), style: head.style, align: head.align } : null,
      row: row ? row.s : null,
      pinned: cs0.position === 'sticky' || cs0.position === 'fixed',
      stage: stage || null,
    });
    return out;
  };

  // One line of measured facts about an element. `leaf` means it is a run of text.
  const describe = (el, leaf) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const bits = [`${el.tagName.toLowerCase()} ${Math.round(r.width)}×${Math.round(r.height)}`];
    if (cs.position === 'sticky' || cs.position === 'fixed') bits.push(`${cs.position}${cs.top !== 'auto' ? ` top ${cs.top}` : ''}${cs.bottom !== 'auto' && cs.top === 'auto' ? ` bottom ${cs.bottom}` : ''}`);
    else if (cs.position === 'absolute') bits.push('absolute');
    if (!leaf) {
      if (cs.display.includes('grid')) {
        const n = cs.gridTemplateColumns.split(/\s+(?![^(]*\))/).filter(Boolean).length;
        bits.push(`grid ${n} col${n === 1 ? '' : 's'}`);
      } else if (cs.display.includes('flex')) {
        bits.push(`flex ${cs.flexDirection.startsWith('column') ? 'column' : 'row'}${cs.flexWrap === 'wrap' ? ' wrap' : ''}${/center|space/.test(cs.justifyContent) ? ` ${cs.justifyContent}` : ''}`);
      }
      const g = Math.round(parseFloat(cs.columnGap) || parseFloat(cs.rowGap) || 0);
      if (g > 0 && /grid|flex/.test(cs.display)) bits.push(`gap ${g}`);
      if (scrollsX(el, cs)) bits.push(`scrolls sideways${snapOf(cs)}`);
    }
    const pad = padOf(cs);
    if (pad) bits.push(pad);
    const bg = hex(cs.backgroundColor);
    if (bg) bits.push(`bg ${bg}`);
    if (cs.backgroundImage.startsWith('url(')) bits.push('bg image');
    else if (cs.backgroundImage.includes('gradient(')) bits.push('gradient');
    const bd = borderOf(cs);
    if (bd) {
      const sides = SIDES.filter((x) => parseFloat(cs[`border${x}Width`]) > 0 && cs[`border${x}Style`] !== 'none');
      bits.push(`${sides.length === 4 ? 'border' : `border-${sides.map((x) => x.toLowerCase()).join('/')}`} ${bd}`);
    }
    const rad = radiusOf(cs, r);
    if (rad) bits.push(`radius ${rad}`);
    if (cs.boxShadow !== 'none') bits.push(`shadow ${cs.boxShadow.slice(0, 70)}`);
    if (cs.backdropFilter && cs.backdropFilter !== 'none') bits.push(`backdrop ${cs.backdropFilter}`);
    if (leaf) {
      bits.push(typeOf(cs), hex(cs.color));
      if (/center|right|end/.test(cs.textAlign)) bits.push(cs.textAlign);
      const t = clean(el.innerText);
      bits.push(`"${t.slice(0, 40)}${t.length > 40 ? '…' : ''}"`);
    }
    if (el.matches('a, button, [role=button]') && parseFloat(cs.transitionDuration) > 0) {
      bits.push(`transition ${splitList(cs.transitionProperty)[0]} ${splitList(cs.transitionDuration)[0]} ${splitList(cs.transitionTimingFunction)[0]}`);
    }
    return bits;
  };

  // An indented outline of an element's subtree: boxes, layout, surfaces and type, a few levels deep.
  const skeleton = (root, maxNodes, maxDepth) => {
    const out = [];
    const walk = (el, depth) => {
      if (out.length >= maxNodes) return;
      const cs = getComputedStyle(el);
      const media = /^(IMG|VIDEO|CANVAS|IFRAME|svg)$/.test(el.tagName);
      const ks = media ? [] : kidsOf(el, false);
      const leaf = !media && clean(el.innerText).length > 0 && ks.every((k) => getComputedStyle(k).display === 'inline');
      const surface = hex(cs.backgroundColor) || borderOf(cs) || cs.backgroundImage !== 'none' || cs.boxShadow !== 'none';
      if (!media && !leaf && ks.length === 0 && !surface) return;
      // A wrapper that adds nothing you can see is skipped, so depth is spent on what matters.
      if (!media && !leaf && ks.length === 1 && depth > 0 && !surface && !padOf(cs) && !/sticky|fixed/.test(cs.position) && !scrollsX(el, cs)) {
        walk(ks[0], depth);
        return;
      }
      out.push('  '.repeat(depth) + describe(el, leaf).join(' · '));
      if (leaf || media || depth >= maxDepth) return;
      let prev = null, alike = 0;
      const flush = () => {
        if (alike) out.push(`${'  '.repeat(depth + 1)}(× ${alike} more like it)`);
        alike = 0;
      };
      for (const k of ks) {
        const sig = `${k.tagName}|${Math.round(k.getBoundingClientRect().height)}|${k.children.length}`;
        if (sig === prev) { alike++; continue; }
        flush();
        prev = sig;
        walk(k, depth + 1);
      }
      flush();
    };
    walk(root, 0);
    return out;
  };

  // Pinned bars, and sets of three or more matching siblings (cards, tiles, rows).
  const pinnedEls = [];
  const groups = [];
  for (const el of els) {
    if (SKIP.has(el.tagName) || el.ownerSVGElement) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    if ((cs.position === 'fixed' || cs.position === 'sticky') && +cs.opacity > 0 && r.width >= 200 && r.height >= 24 && r.height <= vh * 0.5 && r.right > 0 && r.left < vw && !pinnedEls.some((p) => p.contains(el))) {
      pinnedEls.push(el);
    }
    const big = kidsOf(el, true).filter((k) => {
      const kr = k.getBoundingClientRect();
      return kr.width >= 120 && kr.height >= 60 && kr.width < vw * 0.95;
    });
    if (big.length < 3) continue;
    const w0 = big[0].getBoundingClientRect().width;
    const same = big.filter((k) => k.tagName === big[0].tagName && Math.abs(k.getBoundingClientRect().width - w0) <= 2);
    if (same.length < 3 || same.length < big.length * 0.7) continue;
    // Items need parts of their own; paragraphs in a column are not a component.
    const first = same[0];
    if (!first.querySelector('img, video, canvas, svg') && [...first.querySelectorAll('*')].filter((d) => getComputedStyle(d).display !== 'inline').length < 2) continue;
    const fr = first.getBoundingClientRect();
    groups.push({ el, first, n: same.length, tag: first.tagName.toLowerCase(), w: Math.round(fr.width), h: Math.round(fr.height), y: fr.top + offY, area: same.length * fr.width * fr.height, more: 0 });
  }
  const kept = [];
  for (const g of groups.sort((a, b) => b.area - a.area)) {
    const twin = kept.find((k) => k.tag === g.tag && Math.abs(k.w - g.w) <= 8 && Math.abs(k.h - g.h) <= 16);
    if (twin) twin.more++;
    else if (kept.length < 6) kept.push(g);
  }
  kept.sort((a, b) => a.y - b.y);

  const secBoxes = secs.map(box);
  const where = (y) => {
    const i = secBoxes.findIndex((b) => y >= b.t - 1 && y < b.b);
    return i < 0 ? '' : `, section ${String(i + 1).padStart(2, '0')}`;
  };
  const MAX_SECTIONS = 40;
  const sectionText = [
    `Page ${pageH}px tall (${round(pageH / vh, 1)} screens) at ${vw}×${vh}; page ground ${pageBg}.`,
    '',
    ...secs.slice(0, MAX_SECTIONS).flatMap(sectionLines),
    secs.length > MAX_SECTIONS && `… and ${secs.length - MAX_SECTIONS} more sections`,
  ].filter((l) => l !== false).join('\n');
  const parts = [];
  for (const el of pinnedEls.slice(0, 4)) parts.push(`### Pinned: ${el.tagName.toLowerCase()}`, ...skeleton(el, 20, 4), '');
  // Whatever fills the first screen and a half is spelled out in full.
  const openers = secs.filter((el) => box(el).t < vh * 1.5 && box(el).h >= 60 && !pinnedEls.includes(el)).slice(0, 3);
  for (const el of openers) parts.push(`### Opening${where(box(el).t + 1)}`, ...skeleton(el, 28, 7), '');
  for (const g of kept) {
    parts.push(
      `### ${g.n} × ${g.tag} ${g.w}×${g.h}${where(g.y)}${g.more ? ` (${g.more} more set${g.more === 1 ? '' : 's'} like it elsewhere)` : ''}`,
      `in: ${describe(g.el, false).join(' · ')}${!scrollsX(g.el, getComputedStyle(g.el)) && shelfOf(g.el) ? ` · ${shelfOf(g.el)}` : ''}`,
      ...skeleton(g.first, 22, 5),
      '',
    );
  }
  // The same facts as data, for scripts that summarise a capture without reading the prose.
  const data = {
    sections: secData,
    pinned: pinnedEls.slice(0, 4).map((el) => describe(el, false).join(' · ')),
    sets: kept.map((g) => ({
      n: g.n,
      w: g.w,
      h: g.h,
      section: where(g.y).replace(', section ', '') || null,
      more: g.more,
      in: describe(g.el, false).slice(1).join(' · '),
      shelf: shelfOf(g.el),
      item: skeleton(g.first, 4, 2).map((l) => l.trim()),
    })),
  };
  const structure = { sections: sectionText, parts: parts.join('\n').trim(), data };

  const tokens = {
    page: {
      title: clean(document.title).slice(0, 120),
      lang: document.documentElement.lang || undefined,
      height: pageH,
      screens: round(pageH / vh, 1),
      scheme: lum(mainBg) < 0.4 ? 'dark' : 'light',
      bg: mainBg,
    },
    fonts: {
      used: shares(fonts, 5),
      loaded: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/^["']|["']$/g, '')))].slice(0, 10),
    },
    type: { scale, h1: heading('h1'), h2: heading('h2'), h3: heading('h3') },
    color: {
      text: shares(textCol, 6),
      bg: shares(bgCol, 6),
      borders: topN(borders, 5),
      gradients: topN(gradients, 3).map(([k]) => k),
    },
    space: {
      scale: topN(space, 12).map(([k]) => k).sort((a, b) => a - b),
      sectionPad: topN(sectionPad, 4),
      contentWidth: topN(widths, 3),
    },
    shape: { radii: topN(radii, 6), shadows: topN(shadows, 4) },
    layout: {
      flex,
      grid,
      gridCols: topN(gridCols, 4),
      pinned,
      media,
      foldMedia: round(Math.min(1, foldMedia / (vw * vh))),
    },
    motion: {
      durations: topN(tDur, 6),
      easings: topN(tEase, 5),
      properties: topN(tProp, 6),
      animations: topN(anims, 5),
    },
    components: { nav, buttons },
    libs,
  };
  return { tokens, content, structure, siteName: meta('og:site_name') || meta('application-name') };
}

const STRUCTURE_KEY = `Each section line gives its position, height, ground colour, the width its text spans, the empty
space above and below its content, and the share of it covered by images or video. Under it: its
largest text, its commonest text style, and its widest row of columns. Type reads
size/line-height, weight, tracking, family, colour. Skeletons are measured boxes, not markup.`;

function structureDoc(title, s) {
  return [`# ${title}`, '', STRUCTURE_KEY, '', '## Sections, top to bottom', '', s.sections, '', s.parts && '## Parts', '', s.parts].filter((l) => l !== false && l !== undefined).join('\n').trim() + '\n';
}

// One line per innermost array keeps the JSON small enough to read whole.
const compactJson = (o) => JSON.stringify(o, null, 1).replace(/\[\n\s+([^\[\]{}]*?)\n\s+\]/g, (_, inner) => `[${inner.replace(/\n\s+/g, ' ')}]`) + '\n';

// Strip the brand so the cold builder can't recall the real site's design from its name.
function anonymise(md, url, siteName) {
  const host = new URL(url).hostname.replace(/^www\./, '');
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const label = host.split('.').slice(-2, -1)[0];
  let out = md.split(host).join('acme.example');
  if (siteName && siteName.length >= 3) out = out.replace(new RegExp(`\\b${esc(siteName)}\\b`, 'gi'), 'Acme');
  // The domain label with optional breaks between letters also catches "Works in Progress" for worksinprogress.co.
  if (label.length >= 3) out = out.replace(new RegExp(`\\b${[...label].map(esc).join('[\\s-]?')}\\b`, 'gi'), 'Acme');
  return out;
}

// Load the page in one profile, settle it, measure it and screenshot it screen by screen.
async function visit(browser, url, profile, shotDir, maxScreens, isUrl, storageState) {
  const VIEW = profile.viewport;
  await fs.rm(shotDir, { recursive: true, force: true });
  await fs.mkdir(shotDir, { recursive: true });
  const ctx = await browser.newContext(storageState ? { ...profile, storageState } : profile);
  const page = await ctx.newPage();
  try {
    const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (isUrl && res && res.status() >= 400) throw new Error(`HTTP ${res.status()}`);
    await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});

    // Decline a cookie banner if it offers a plain refusal, so it stays out of the evidence.
    await page
      .getByRole('button', { name: /^(deny|decline|refuse|reject)( all| optional| non-essential)?( cookies)?$|necessary only|only necessary|essential only/i })
      .first()
      .click({ timeout: 1500 })
      .catch(() => {});

    // App-like pages scroll inside a container instead of the document. Find whichever actually scrolls.
    await page.evaluate(() => {
      let best = document.scrollingElement;
      let extra = best.scrollHeight - innerHeight;
      if (extra < innerHeight / 2) {
        for (const el of document.body.querySelectorAll('*')) {
          const more = el.scrollHeight - el.clientHeight;
          if (more > extra && el.clientHeight > innerHeight / 2 && el.clientWidth > innerWidth / 2 && /auto|scroll/.test(getComputedStyle(el).overflowY)) {
            best = el;
            extra = more;
          }
        }
      }
      window.__scroller = best;
    });

    // Scroll through once so lazy content and scroll-triggered reveals reach their final state.
    await page.evaluate(async () => {
      const s = window.__scroller;
      for (let y = 0, i = 0; y < s.scrollHeight && i < 40; y += innerHeight, i++) {
        s.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 160));
      }
      s.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.evaluate(() => document.fonts.ready.then(() => true)).catch(() => {});
    await page.waitForTimeout(600);

    // Sale and newsletter popups often open on a timer or on scroll. Close whatever is open now.
    await page.keyboard.press('Escape').catch(() => {});
    await page
      .locator('[role=dialog] button[aria-label*="close" i], [aria-modal=true] button[aria-label*="close" i], [role=dialog] [aria-label*="dismiss" i]')
      .first()
      .click({ timeout: 800 })
      .catch(() => {});
    await page.waitForTimeout(300);

    const data = await page.evaluate(extract);

    const screens = Math.min(maxScreens, Math.ceil(data.tokens.page.height / VIEW.height));
    for (let i = 0; i < screens; i++) {
      await page.evaluate((y) => window.__scroller.scrollTo({ top: y, behavior: 'instant' }), i * VIEW.height);
      await page.waitForTimeout(450);
      await fs.writeFile(path.join(shotDir, `${String(i).padStart(2, '0')}.webp`), await toWebp(browser, await page.screenshot({ type: 'png' })));
    }
    return { ...data, screens, state: await ctx.storageState() };
  } finally {
    await ctx.close();
  }
}

// Contact sheets: every screen on one or two images, so a first look costs two reads instead of ten.
// Each cell is labelled with the full-size file it was made from.
export async function sheets(browser, outDir) {
  const list = async (d) => (await fs.readdir(path.join(outDir, d)).catch(() => [])).filter(isShot).sort();
  const cell = async (d, f) => `<div class="cell"><img src="data:${mimeOf(f)};base64,${(await fs.readFile(path.join(outDir, d, f))).toString('base64')}"><span>${d}/${f}</span></div>`;
  for (const f of await fs.readdir(outDir)) if (/^sheet-(\d+|phone)\.(webp|jpg)$/.test(f)) await fs.rm(path.join(outDir, f));
  const written = [];
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 600 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  try {
    const render = async (file, width, cols, ratio, cells) => {
      const rows = Math.ceil(cells.length / cols);
      const [rw, rh] = ratio.split('/').map(Number);
      const cellW = (width - (cols - 1) * 2) / cols;
      // The window is sized to the finished sheet: a full-page capture of a taller page can repeat its top.
      await page.setViewportSize({ width, height: Math.round(rows * (cellW * rh) / rw + (rows - 1) * 2) });
      // Images go in as data URIs: a page made with setContent may not load file:// resources.
      await page.setContent(`<!doctype html><meta charset="utf-8"><style>
        body { margin: 0; background: #777; }
        .grid { display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: 2px; }
        .cell { position: relative; }
        img { display: block; width: 100%; aspect-ratio: ${ratio}; }
        span { position: absolute; left: 0; top: 0; background: #222; color: #fff; font: 11px/18px ui-monospace, monospace; padding: 0 6px; }
      </style><div class="grid">${cells.join('')}</div>`, { waitUntil: 'load' });
      await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
      await fs.writeFile(path.join(outDir, file), await toWebp(browser, await page.screenshot({ type: 'png' }), SHEET_QUALITY));
      written.push(file);
    };
    const desk = await list('shots');
    for (let i = 0; i < desk.length; i += 6) {
      await render(`sheet-${i / 6 + 1}.webp`, 1440, 2, '1440 / 900', await Promise.all(desk.slice(i, i + 6).map((f) => cell('shots', f))));
    }
    const phone = await list('shots-phone');
    if (phone.length) {
      await render('sheet-phone.webp', phone.length * 390 + (phone.length - 1) * 2, phone.length, '390 / 844', await Promise.all(phone.map((f) => cell('shots-phone', f))));
    }
  } finally {
    await ctx.close();
  }
  return written;
}

export async function capture(browser, target, opts = {}) {
  const isUrl = /^https?:\/\//.test(target);
  const url = isUrl ? target : pathToFileURL(path.resolve(target)).href;
  const slug = opts.slug ?? (isUrl ? slugify(target) : null);
  if (!opts.out && !slug) throw new Error('A local file needs --out or --slug');
  const outDir = path.resolve(opts.out ?? path.join(ROOT, 'captures', slug, 'ref'));
  const shotDir = path.join(outDir, 'shots');
  const phoneDir = path.join(outDir, 'shots-phone');
  const captured = new Date().toLocaleDateString('en-CA');
  const source = isUrl ? target : path.relative(ROOT, path.resolve(target));

  // Shots go to a scratch folder first, so a failed re-capture leaves the previous capture as it was.
  let desk;
  try {
    desk = await visit(browser, url, PROFILES.desktop, `${shotDir}.new`, Number(opts.screens ?? 6), isUrl);
  } catch (e) {
    // Leave no empty folders behind for a page that could not be captured (rmdir only removes empty ones).
    await fs.rm(`${shotDir}.new`, { recursive: true, force: true });
    await fs.rmdir(outDir).catch(() => {});
    await fs.rmdir(path.dirname(outDir)).catch(() => {});
    throw e;
  }
  await fs.rm(shotDir, { recursive: true, force: true });
  await fs.rename(`${shotDir}.new`, shotDir);
  const { width, height } = PROFILES.desktop.viewport;
  // `note` carries where the page was found (the comment beside it in a seed list) into the evidence.
  const out = { url: source, captured, ...(opts.note ? { note: opts.note } : {}), viewport: `${width}x${height}`, ...desk.tokens };
  const pixels = await pixelStats(browser, shotDir).catch(() => null);
  if (pixels) out.pixels = pixels;
  await fs.writeFile(path.join(outDir, 'tokens.json'), compactJson(out));
  await fs.writeFile(path.join(outDir, 'structure.md'), structureDoc(`Structure of ${source} at ${width}px, ${captured}`, desk.structure));
  await fs.writeFile(path.join(outDir, 'structure.json'), compactJson(desk.structure.data));
  await fs.writeFile(path.join(outDir, 'content.md'), (isUrl ? anonymise(desk.content, target, desk.siteName) : desk.content) + '\n');

  // The phone pass is extra evidence. If a site refuses it, the desktop capture still stands.
  let phone = 0;
  let phoneError = null;
  if (opts.phone !== false) {
    try {
      // Same cookies as the desktop pass, so a site that splits visitors into variants shows both widths the same one.
      const p = await visit(browser, url, PROFILES.phone, `${phoneDir}.new`, PHONE_SCREENS, isUrl, desk.state);
      await fs.rm(phoneDir, { recursive: true, force: true });
      await fs.rename(`${phoneDir}.new`, phoneDir);
      const t = p.tokens;
      const v = PROFILES.phone.viewport;
      const small = {
        url: source,
        captured,
        viewport: `${v.width}x${v.height}`,
        page: { height: t.page.height, screens: t.page.screens },
        type: t.type,
        space: t.space,
        layout: { gridCols: t.layout.gridCols, pinned: t.layout.pinned, foldMedia: t.layout.foldMedia },
        components: t.components,
        sets: p.structure.data.sets.map(({ n, w, h, shelf }) => ({ n, w, h, shelf })),
      };
      await fs.writeFile(path.join(outDir, 'phone.json'), compactJson(small));
      await fs.writeFile(path.join(outDir, 'structure-phone.md'), structureDoc(`Structure of ${source} at ${v.width}px, ${captured}`, p.structure));
      phone = p.screens;
    } catch (e) {
      // A phone capture older than the desktop one beside it would mislead, so it goes too.
      phoneError = e.message.split('\n')[0];
      await fs.rm(`${phoneDir}.new`, { recursive: true, force: true });
      await fs.rm(phoneDir, { recursive: true, force: true });
      for (const f of ['phone.json', 'structure-phone.md']) await fs.rm(path.join(outDir, f), { force: true });
    }
  }
  await sheets(browser, outDir).catch(() => {});
  return { outDir, screens: desk.screens, phone, phoneError, tokens: out };
}

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--force') out.force = true;
    else if (argv[i] === '--no-phone') out.phone = false;
    else if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[++i];
    else out._.push(argv[i]);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const target = args._[0];
  if (!target) {
    console.error('usage: capture.mjs <url | file.html | seeds.txt> [--slug name] [--out dir] [--screens 6] [--no-phone] [--force]');
    process.exit(1);
  }
  let targets = [target];
  const notes = new Map();
  const batch = target.endsWith('.txt');
  if (batch) {
    const text = await fs.readFile(target, 'utf8');
    // A comment after a URL says where it was found; it travels with the capture as its note.
    for (const l of text.split('\n')) {
      const [u, ...rest] = l.split('#');
      if (u.trim()) notes.set(u.trim(), rest.join('#').trim());
    }
    targets = [...notes.keys()];
  }
  const browser = await launch();
  let failed = 0;
  try {
    for (const t of targets) {
      // A seed list is resumable: pages already captured are left alone so their entries keep their evidence.
      if (batch && !args.force && (await fs.access(path.join(ROOT, 'captures', slugify(t), 'ref/tokens.json')).then(() => true, () => false))) {
        console.log(`skip ${t} (already captured; --force to redo)`);
        continue;
      }
      try {
        const { outDir, screens, phone, phoneError, tokens } = await capture(browser, t, batch ? { screens: args.screens, phone: args.phone, note: notes.get(t) || undefined } : args);
        const font = tokens.fonts.used[0]?.[0] ?? '?';
        console.log(`ok   ${t} -> ${path.relative(process.cwd(), outDir)} (${screens} shots, ${phone} phone shots, ${tokens.page.scheme}, ${font})`);
        if (phoneError) console.log(`     phone pass failed: ${phoneError}`);
      } catch (e) {
        failed++;
        console.log(`FAIL ${t}: ${e.message.split('\n')[0]}`);
      }
    }
  } finally {
    await browser.close();
  }
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
