#!/usr/bin/env node
// Local server for the blind A/B page. Serves eval/ and saves picks into the run's folder.
//
//   node scripts/serve.mjs      then open http://localhost:4173

import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EVAL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../eval');
const PORT = Number(process.env.PORT ?? 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.json': 'application/json', '.md': 'text/plain; charset=utf-8' };

const send = (res, status, body = '', type = 'text/plain; charset=utf-8') => {
  res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' });
  res.end(body);
};

http
  .createServer(async (req, res) => {
    try {
      const { pathname } = new URL(req.url, 'http://localhost');

      if (pathname === '/api/runs') {
        const dirs = await fs.readdir(path.join(EVAL, 'runs')).catch(() => []);
        const runs = [];
        for (const d of dirs.sort().reverse()) {
          if (await fs.access(path.join(EVAL, 'runs', d, 'manifest.json')).then(() => true, () => false)) runs.push(d);
        }
        return send(res, 200, JSON.stringify(runs), TYPES['.json']);
      }

      const picks = pathname.match(/^\/api\/picks\/([\w-]+)$/);
      if (picks && req.method === 'POST') {
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 1e6) return send(res, 413);
        }
        const dir = path.join(EVAL, 'runs', picks[1]);
        await fs.access(path.join(dir, 'manifest.json'));
        await fs.writeFile(path.join(dir, 'picks.json'), JSON.stringify(JSON.parse(body), null, 1) + '\n');
        return send(res, 204);
      }

      const file = path.join(EVAL, pathname === '/' ? 'ab.html' : decodeURIComponent(pathname));
      if (!file.startsWith(EVAL + path.sep)) return send(res, 403);
      send(res, 200, await fs.readFile(file), TYPES[path.extname(file)] ?? 'application/octet-stream');
    } catch {
      send(res, 404, 'not found');
    }
  })
  .listen(PORT, '127.0.0.1', () => console.log(`Blind A/B at http://localhost:${PORT}`));
