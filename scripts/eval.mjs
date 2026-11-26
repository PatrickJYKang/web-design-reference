#!/usr/bin/env node
// Build every brief twice in isolation, once with the baseline prompt alone and once with the
// baseline plus the reference library, and file each pair for blind review.
//
//   node scripts/eval.mjs [--briefs a,b] [--repeat 1] [--jobs 3] [--model name]
//
// Writes eval/runs/<id>/<pair>/{x,y}.html, manifest.json, key.json (which arm is x) and
// builder-notes.json (what each builder said it chose). Review with
// `npm run ab`. Builds vary from run to run, so --repeat 2 gives a steadier answer than one pass.
// Briefs that produced a pair are then moved to eval/briefs/used/<id>/: each run needs new ones.

import fs from 'node:fs/promises';
import path from 'node:path';
import { build, parseArgs, ROOT } from './build.mjs';

const args = parseArgs(process.argv.slice(2));
const repeat = Number(args.repeat ?? 1);
const jobs = Number(args.jobs ?? 3);

const refs = (await fs.readdir(path.join(ROOT, 'design-references/refs')).catch(() => [])).filter((f) => f.endsWith('.md'));
if (!refs.length) {
  console.error('The library has no entries, so both arms would be the same build. Ingest some references first.');
  process.exit(1);
}

const briefDir = path.join(ROOT, 'eval/briefs');
const wanted = args.briefs?.split(',');
const names = (await fs.readdir(briefDir)).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)).filter((n) => !wanted || wanted.includes(n)).sort();
if (!names.length) {
  console.error(wanted ? 'No matching briefs in eval/briefs/.' : 'eval/briefs/ is empty. Every run needs briefs no earlier run has used: write new ones first (the last set is in eval/briefs/used/).');
  process.exit(1);
}

const now = new Date();
const two = (n) => String(n).padStart(2, '0');
const id = `${now.getFullYear()}${two(now.getMonth() + 1)}${two(now.getDate())}-${two(now.getHours())}${two(now.getMinutes())}${two(now.getSeconds())}`;
const runDir = path.join(ROOT, 'eval/runs', id);
const pairs = [];
for (const name of names) {
  const brief = await fs.readFile(path.join(briefDir, `${name}.md`), 'utf8');
  const title = brief.match(/^#\s+(.+)$/m)?.[1] ?? name;
  for (let r = 1; r <= repeat; r++) {
    const libIsX = Math.random() < 0.5;
    pairs.push({ id: repeat > 1 ? `${name}-${r}` : name, title, brief, files: { lib: libIsX ? 'x' : 'y', base: libIsX ? 'y' : 'x' }, ok: true });
  }
}

const queue = pairs.flatMap((pair) => ['base', 'lib'].map((arm) => ({ pair, arm })));
const total = queue.length;
const builders = new Set();
const said = {};
let done = 0;
let cost = 0;
console.log(`run ${id}: ${pairs.length} pair${pairs.length > 1 ? 's' : ''}, ${total} builds, ${jobs} at a time, ${refs.length} library entr${refs.length > 1 ? 'ies' : 'y'}`);

async function worker() {
  for (let job; (job = queue.shift()); ) {
    const { pair, arm } = job;
    try {
      const s = await build({ brief: pair.brief, out: path.join(runDir, pair.id, `${pair.files[arm]}.html`), withLibrary: arm === 'lib', model: args.model });
      if (s.model) builders.add(s.model);
      cost += s.costUsd ?? 0;
      (said[pair.id] ??= {})[arm === 'lib' ? 'library' : 'baseline'] = s.said ?? '';
      console.log(`[${++done}/${total}] ok   ${pair.id} ${arm}${s.model ? ` (${s.seconds}s, $${s.costUsd})` : ''}`);
    } catch (e) {
      pair.ok = false;
      console.log(`[${++done}/${total}] FAIL ${pair.id} ${arm}: ${e.message.split('\n')[0]}`);
    }
  }
}
await Promise.all(Array.from({ length: jobs }, worker));

const good = pairs.filter((p) => p.ok);
if (!good.length) {
  console.error('No pair finished.');
  process.exit(1);
}
await fs.writeFile(
  path.join(runDir, 'manifest.json'),
  JSON.stringify({ id, created: new Date().toISOString(), builder: [...builders].join(', ') || args.model || 'unknown', costUsd: +cost.toFixed(2), library: refs.length, pairs: good.map(({ id, title, brief }) => ({ id, title, brief })) }, null, 1) + '\n',
);
await fs.writeFile(
  path.join(runDir, 'key.json'),
  JSON.stringify(Object.fromEntries(good.map((p) => [p.id, { [p.files.lib]: 'library', [p.files.base]: 'baseline' }])), null, 1) + '\n',
);
// What each builder said it was doing, by arm. Kept out of the manifest so the review page never loads it;
// read it after the review to see which entries the library builds followed.
await fs.writeFile(path.join(runDir, 'builder-notes.json'), JSON.stringify(said, null, 1) + '\n');

// A brief is used once. Seeing the same copy again teaches the reviewer nothing new, so each
// brief that produced a pair is retired beside the others from this run.
const usedDir = path.join(briefDir, 'used', id);
await fs.mkdir(usedDir, { recursive: true });
for (const name of new Set(good.map((p) => p.id.replace(/-\d+$/, (m) => (repeat > 1 ? '' : m))))) {
  await fs.rename(path.join(briefDir, `${name}.md`), path.join(usedDir, `${name}.md`)).catch(() => {});
}
console.log(`\n${good.length} of ${pairs.length} pairs ready${builders.size ? `, built by ${[...builders].join(', ')} for $${cost.toFixed(2)}` : ''}. Review them blind with: npm run ab`);
