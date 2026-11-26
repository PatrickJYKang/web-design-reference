# web-design-reference

An agent-annotated archive of real web pages, for coding agents to design from. Sites are picked by the owner or found by an agent; an agent captures each one and writes down what it measured.

## What "archive" means here

Each page is stored as measurements and written descriptions. Nothing is copied from the site.

| Kept in the archive (`design-references/refs/<slug>.md`) | Kept beside it as evidence (`captures/<slug>/ref/`, not shared) | Never kept |
|---|---|---|
| The URL and the date it was captured | Screenshots at 1440×900 and 390×844, and contact sheets of them | Markup and stylesheets |
| Measured tokens: type, colour, space, shape, motion | The full measured values (`tokens.json`, `phone.json`) | Class names |
| The page's structure, one band per line | The section map and component skeletons (`structure.md`) | Images and fonts |
| Recipes for two to four components | The page's text as an outline (`content.md`) | More than a few words of copy |
| What changes at phone width | | |
| The agent's read: moves and weak spots | | |

The live URL stays the source. An entry says what was true on its capture date.

## The loop

1. **Pick.** Put pages in `seeds.txt`, or ask Claude to find some. It draws only from places people have already filtered, and records where each came from.
2. **Ingest.** In this folder, ask Claude to ingest a URL or the seed list. It captures each page at desktop and phone width. For a batch it writes a card per page: the script fills in the measured values and Claude adds the classification and a few lines of reading. For a page you care about, ask for a full entry.
3. **Test.** Ask Claude to write new briefs into `eval/briefs/` (a brief is used once, then retired to `eval/briefs/used/`). `npm run eval` builds each brief with and without the archive. `npm run ab` shows each pair side by side, unlabelled, and records which you prefer and why. If builds made with the archive aren't preferred, the archive isn't doing its job.

There is no review step. If you do want to correct an entry, say so; the note goes into the entry under `Owner notes` and outranks the agent's analysis.

## Commands

| Command | What it does |
|---|---|
| `npm run capture -- <url>` | Captures a page into `captures/<slug>/ref/` at both widths. Also takes a local `.html` file (with `--out`) or `seeds.txt`, which skips pages already captured unless `--force`. `--screens 12` for a long page, `--no-phone` to skip the phone pass. |
| `npm run draft -- <slug>` | Starts a card for a capture, with every measured line written. `--new` drafts every capture that has no entry; `--refresh <slug>` rewrites a card's measured block. |
| `npm run index` | Regenerates `design-references/INDEX.md` from the entries, grouped by page type. It leaves out any entry with a TODO in it. |
| `npm run eval` | Builds every brief in `eval/briefs/` twice, baseline and baseline plus archive, then retires those briefs. `--briefs a,b`, `--repeat 2`, `--jobs 3`, `--model name`. |
| `npm run ab` | Serves the blind review page at http://localhost:4173. |

`eval` runs the `claude` CLI headless in an empty temp folder, so the builder sees nothing but its prompt. The CLI needs its own sign-in, separate from the desktop app: `claude auth login`.

## Layout

```
design-references/     the archive, and an installable skill
  SKILL.md             how an agent uses it when building
  INDEX.md             one line per entry (generated)
  DEFAULTS.md          what a builder does with no reference (measured once, see below)
  refs/<slug>.md       one entry per page
.claude/skills/ingest/ how Claude adds an entry
scripts/               capture, card drafts, index, eval runner, review server
eval/
  baseline.md          the design prompt both arms get; the thing the archive has to beat
  briefs/              the next run's briefs: real copy for invented organisations, one page each
  briefs/used/<id>/    briefs earlier runs have used
  ab.html              the blind review page
  runs/<id>/           builds, key and picks for each run (not committed)
captures/<slug>/ref/   evidence for each entry (not committed)
seeds.txt              candidate URLs
```

## Using the archive in another project

`design-references/` is a self-contained skill. Link it into your personal skills folder and it is available everywhere:

```bash
ln -s "$PWD/design-references" ~/.claude/skills/design-references
```

## Two depths of entry

| | Card | Full entry |
|---|---|---|
| Written by | The script (measured values) and an agent (classification, three or four lines of reading) | An agent, by hand, from the screenshots and measurements |
| Holds | Type, colour, space, shape, motion, nav, buttons, first screen, the page as bands, repeated parts, phone changes; a short reading; weak spots | Tokens, structure, component recipes, phone behaviour, moves, weak spots |
| Length | About 30 lines | About 55 lines |
| Cost | About 10,000 tokens | About 70,000 tokens |
| Use it for | Breadth: batches found in galleries | Depth: pages the owner picks |

## Where the first 25 entries came from

The project began with a heavier method. For each page, an isolated agent built the same content with no reference (a "cold build"), and the entry recorded how the real page differed. That step is retired: all 25 cold builds came out the same way, so one more would teach nothing. What it found is kept in `design-references/DEFAULTS.md`.

- Those 25 pages were re-captured on 2026-11-22 and their entries rewritten in the current format. Each earlier entry, with its `Cold-build delta` section, is kept beside its evidence at `captures/<slug>/entry-with-cold-delta.md`.
- `scripts/cold.mjs` and `scripts/pair.mjs` (`npm run cold`, `npm run pair`) still work. Their one remaining use is re-measuring `DEFAULTS.md` if the builder model changes.
- The 25 are placeholder picks made by an agent for spread across page types. Their entries say `picked-by: agent, pilot placeholder`.

## Limits

- **Some pages can't be kept.** Of 274 pages tried in the two gallery batches, 38 were dropped: cookie, newsletter, age, splash or terms walls with no plain refusal, sign-in and holding pages, a parked domain, two sites taken over by gambling spam, and pages that refused or failed to load. They are marked in `seeds.txt` with the reason. Galleries list sites as they were when picked, so every capture is looked at before it is kept.
- **Nothing checks the annotation.** Entries are an agent's reading of measurements. The blind test is the only check that they help.
- **The test is small.** With five pairs, even five out of five turns up by chance about 6% of the time. `--repeat 2` gives ten pairs, where nine of ten is about 2%. Treat one run as a hint.
- **Eval builds cost money and time.** A build takes one to five minutes and about $0.60, so a five-brief run is about $6.
- **The baseline matters.** `eval/baseline.md` is a short design prompt written for this project. If you already use a design prompt or skill you trust, put it there, or the test flatters the archive.
- **A capture covers the first six screens** unless you ask for more (`--screens 12`). Below that, an entry has measurements but no picture, and says so.
- **The capture measures the page at rest, scrolled to the top.** Hover and focus states, bars that appear on scroll, scroll-driven animation, and anything drawn in canvas or WebGL show up in screenshots but not in the measurements.
- **Some sites refuse automated capture.** Those are skipped, not worked round. Cookie banners are declined only when they offer a plain refusal button.
- **Entries describe a page on a date.** Sites change without their URL changing. `captured` says when; re-run the capture to see what moved.

## Licence

MIT, see `LICENSE`. It covers this repository's scripts and the entries as written. The sites the entries describe, and their designs, belong to their owners.
