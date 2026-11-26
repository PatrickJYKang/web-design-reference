#!/usr/bin/env node
// Build one page from a brief with an isolated, headless Claude Code run.
//
//   node scripts/build.mjs <brief.md> <out.html> [--lib] [--model name]
//
// The builder runs in an empty temp dir in safe mode (no CLAUDE.md, skills, plugins or MCP) with
// file tools only. Its only design guidance is eval/baseline.md, plus the reference library when
// --lib is given. Cold builds and both eval arms go through here so they differ in nothing else.
// The builder is whatever model the CLI defaults to unless --model is given; build() reports which.

import { spawn } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIMEOUT_MIN = 45;

const LIBRARY = `## Reference library

A design reference library is in \`design-references/\`. Read \`design-references/SKILL.md\` first and follow it.`;

const OUTPUT = `## Output

Write the finished page to \`index.html\` in the current directory: one self-contained file with inline CSS and JS. Google Fonts through a <link> tag is allowed; nothing else may load from the network. Where a photo, illustration or product screenshot belongs, draw a stand-in with CSS or inline SVG. The page will be judged at 1440px wide and must also hold up at 390px.`;

function run(cmd, args, cwd, input) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    let err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err = (err + d).slice(-2000)));
    // A long page can take over half an hour to build.
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill();
    }, TIMEOUT_MIN * 60 * 1000);
    child.on('error', (e) => reject(e.code === 'ENOENT' ? new Error('the `claude` CLI is not installed or not on PATH') : e));
    child.on('close', (code) => {
      clearTimeout(timer);
      if (timedOut) return reject(new Error(`the builder was stopped after ${TIMEOUT_MIN} minutes`));
      // With --output-format json the CLI prints one result object; a failed sign-in can still exit 0.
      let res = null;
      try {
        res = JSON.parse(out);
      } catch {}
      const said = `${res?.result ?? out} ${err}`;
      if (/failed to authenticate|not logged in|\/login/i.test(said)) return reject(new Error('the `claude` CLI is not signed in. Run `claude auth login`, then retry.'));
      if (code !== 0 || res?.is_error) return reject(new Error(`claude ${res?.is_error ? 'reported an error' : `exited with ${code}`}: ${said.trim().slice(-400)}`));
      resolve(res);
    });
    child.stdin.end(input);
  });
}

// Which model did the work, how long it took and what it cost, from the CLI's result object.
function stats(res) {
  if (!res) return {};
  const models = Object.entries(res.modelUsage ?? {}).sort((a, b) => (b[1].outputTokens ?? 0) - (a[1].outputTokens ?? 0));
  return {
    model: models[0]?.[0] ?? 'unknown',
    seconds: Math.round((res.duration_ms ?? 0) / 1000),
    costUsd: +(res.total_cost_usd ?? 0).toFixed(2),
    outputTokens: res.usage?.output_tokens,
    // The builder's closing message: the direction it chose and, in the library arm, which entry it followed.
    said: String(res.result ?? '').trim().slice(0, 800),
  };
}

export async function promptFor({ brief, withLibrary = false }) {
  const baseline = await fs.readFile(path.join(ROOT, 'eval/baseline.md'), 'utf8');
  return [baseline.trim(), withLibrary && LIBRARY, OUTPUT, `## Brief\n\n${brief.trim()}`].filter(Boolean).join('\n\n');
}

export async function build({ brief, out, withLibrary = false, model }) {
  const prompt = await promptFor({ brief, withLibrary });
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'wdr-build-'));
  try {
    if (withLibrary) {
      await fs.cp(path.join(ROOT, 'design-references'), path.join(dir, 'design-references'), { recursive: true });
    }
    const args = ['-p', '--safe-mode', '--strict-mcp-config', '--no-session-persistence', '--output-format', 'json', '--tools', 'Read,Write,Edit,Glob,Grep', '--permission-mode', 'acceptEdits'];
    if (model) args.push('--model', model);
    const res = await run('claude', args, dir, prompt);
    const html = path.join(dir, 'index.html');
    await fs.access(html).catch(() => {
      throw new Error('the builder finished without writing index.html');
    });
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.copyFile(html, out);
    return stats(res);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

export function parseArgs(argv, flags = []) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) out._.push(a);
    else if (flags.includes(a.slice(2))) out[a.slice(2)] = true;
    else out[a.slice(2)] = argv[++i];
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2), ['lib']);
  const [briefPath, out] = args._;
  if (!briefPath || !out) {
    console.error('usage: build.mjs <brief.md> <out.html> [--lib] [--model name]');
    process.exit(1);
  }
  const brief = await fs.readFile(briefPath, 'utf8');
  try {
    const s = await build({ brief, out: path.resolve(out), withLibrary: !!args.lib, model: args.model });
    console.log(`built ${out}${s.model ? ` (${s.model}, ${s.seconds}s, $${s.costUsd})` : ''}`);
  } catch (e) {
    console.error(`build failed: ${e.message}`);
    process.exit(1);
  }
}
