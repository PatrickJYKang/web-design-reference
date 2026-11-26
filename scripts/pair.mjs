#!/usr/bin/env node
// Lay a reference and its cold build side by side, three screens to a sheet, so the comparison
// starts from one image instead of a dozen.
//
//   node scripts/pair.mjs <slug>
//
// Writes captures/<slug>/pair-1.webp (screens 1–3) and pair-2.webp (screens 4–6) when there are that many.
// Reference on the left, cold build on the right, each at half size.

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT } from './build.mjs';
import { launch, toWebp } from './capture.mjs';

const ROWS = 3;

export async function pair(browser, slug) {
  const dir = path.join(ROOT, 'captures', slug);
  const shots = async (side) => (await fs.readdir(path.join(dir, side, 'shots')).catch(() => [])).filter((f) => /\.(webp|jpg)$/.test(f)).sort();
  const [ref, cold] = await Promise.all([shots('ref'), shots('cold')]);
  if (!ref.length || !cold.length) throw new Error(`"${slug}" needs both a ref/ and a cold/ capture`);

  // Images go in as data URIs: a page made with setContent may not load file:// resources.
  const img = async (side, file) =>
    file ? `<img src="data:${file.endsWith('.webp') ? 'image/webp' : 'image/jpeg'};base64,${(await fs.readFile(path.join(dir, side, 'shots', file))).toString('base64')}">` : '<div class="end">page ends</div>';

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const written = [];
  try {
    for (let s = 0; s * ROWS < Math.max(ref.length, cold.length); s++) {
      const rows = [];
      for (let i = s * ROWS; i < (s + 1) * ROWS && (ref[i] || cold[i]); i++) {
        rows.push(`<div class="row">${await img('ref', ref[i])}${await img('cold', cold[i])}</div>`);
      }
      const html = `<!doctype html><meta charset="utf-8"><style>
        body { margin: 0; background: #777; color: #fff; font: 12px/22px ui-monospace, monospace; }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-bottom: 2px; }
        .row > * { display: block; width: 100%; aspect-ratio: 1440 / 900; }
        .head > div { aspect-ratio: auto; background: #222; padding: 0 8px; }
        .end { background: #444; display: grid; place-items: center; }
      </style>
      <div class="row head"><div>reference, screens ${s * ROWS + 1}–${s * ROWS + rows.length}</div><div>cold build</div></div>${rows.join('')}`;
      await page.setContent(html, { waitUntil: 'load' });
      const file = path.join(dir, `pair-${s + 1}.webp`);
      await fs.writeFile(file, await toWebp(browser, await page.screenshot({ type: 'png', fullPage: true }), 0.7));
      written.push(file);
    }
  } finally {
    await ctx.close();
  }
  return written;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const slug = process.argv[2];
  if (!slug) {
    console.error('usage: pair.mjs <slug>');
    process.exit(1);
  }
  const browser = await launch();
  try {
    for (const f of await pair(browser, slug)) console.log(path.relative(process.cwd(), f));
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}
