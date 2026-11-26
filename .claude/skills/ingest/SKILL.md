---
name: ingest
description: Add sites to the design reference archive by capturing them and annotating what was measured. Use when asked to ingest, add, archive or annotate reference URLs, to work through seeds.txt, to find sites worth adding, or to turn a card into a full entry.
---

# Ingest a reference

The archive holds one annotated entry per page. Nothing is copied from the site: no markup, class names, images or fonts. The capture script measures. Your job is to look, decide what is worth saying, and write it down in values.

## Two depths

- **Card.** The default, and the only sensible depth for a batch. The script writes every measured line (`## Measured`); you classify the page and add three or four lines of reading. About 30 lines, about 10,000 tokens.
- **Full.** For pages the owner picks, or that deserve a close look. You write everything by hand: tokens, structure, component recipes, phone behaviour, moves, weak spots. About 55 lines, and roughly seven times the cost of a card.

A card can be promoted later: delete its file, then follow the full procedure.

## Capture (both depths)

`npm run capture -- <url>` writes `captures/<slug>/ref/`. For a list, put the URLs in `seeds.txt`, each with a comment saying where it was found, and run `npm run capture -- seeds.txt`.

- `sheet-1.webp` (and `sheet-2.webp` past six screens): the desktop screens at half size on one image, each labelled with its full-size file in `shots/`.
- `sheet-phone.webp`: the phone screens side by side; full size in `shots-phone/`.
- `tokens.json`, `phone.json`: measured type, colour, space, shape, layout and motion at 1440 and 390 wide. `pixels` in `tokens.json` is counted from the screenshots: the share of light pixels and the colours covering the most area.
- `structure.md`, `structure-phone.md`: every section top to bottom, then measured skeletons of the opening sections, pinned bars and repeated parts. `structure.json` holds the same as data.
- `content.md`: the page's text as an outline, with the brand name replaced by "Acme".

Look at `sheet-1.webp` before going on. If it shows a consent wall, bot check, login, error page, parked domain or holding page, stop: don't write an entry, and say so. Don't try to get round a site that refuses the capture.

## Card procedure

1. `npm run draft -- <slug>` (or `--new` for every capture without an entry) writes `design-references/refs/<slug>.md` with the `Measured` block filled in and `TODO` everywhere else.
2. Look at `sheet-1.webp`. Open `sheet-phone.webp` only if the measured phone line looks odd.
3. Fill in the frontmatter: `type`, `sector`, `tags`, `summary`. Leave `picked-by` unless it says TODO.
4. Write `## Read`: three or four lines on the decisions that make the page what it is, each tied to a number from the `Measured` block or to something visible in the sheet.
5. Write `## Weak spots`: one or two lines, or delete the section if you see nothing worth warning about.
6. Don't edit the `Measured` block. If it looks wrong, say so; `npm run draft -- --refresh <slug>` rewrites it from the capture.
7. `npm run index`. It refuses any entry that still has a TODO.

## Full procedure

1. Capture with `--screens 12` if the page runs well past six screens and the lower part is more than a footer.
2. Start with the sheets, and open a full-size shot only where a sheet is too small to judge. Then read `structure.md` and `tokens.json` for the values behind what you saw, and the phone files for what changes.
3. Write the entry by hand in the full format below. Don't write a value you can't find in the files, and don't describe a part you haven't seen in a shot.
4. `npm run index`.

## Reporting

Tell the user in a few lines what was added, what was dropped and why, and anything the capture missed. No review is required. If the owner does comment on an entry, record it under `## Owner notes` with the date and fix any line it contradicts.

## Finding sites

Sites come from the owner or from you. When asked to add sites of your own choosing, find them, don't judge them: take them from places people have already filtered (award galleries, the curated lists named in `seeds.txt`, sites the owner has named or linked), in the gallery's own order, and spread them across page types. For a page type galleries don't list (pricing, docs, a single article, a single product), follow the link from the home page of a site a gallery does list. Record where each came from as the comment beside it in `seeds.txt`; the capture carries that into `picked-by`.

## Frontmatter

```markdown
---
url: https://example.com/
captured: 2026-01-31
type: landing
sector: developer tools
tags: [dark, dense, mono-accent]
summary: One line, under 100 characters, saying what kind of page this is in concrete terms.
picked-by: owner
depth: card
---
```

- `type` is one of: landing, pricing, docs, editorial, portfolio, commerce, app. Use `landing` for any single site whose job is to present one organisation, place, event or product.
- `tags`: five to eight, reusing tags already in `INDEX.md` where they fit, so retrieval stays consistent. For editorial and commerce pages, put `index`, `article` or `product-page` first: an index page's moves hurt an article page in the first blind test, so a builder needs to tell them apart.
- `picked-by` is `owner`, or `agent, from <where it was found>`.
- `depth: card` marks a card. Full entries leave the line out.

## Card format

```markdown
## Measured
- (written by `npm run draft`: type, colour, space, shape, motion, nav, buttons, first screen, bands, repeated parts, phone)

## Read
- Three or four decisions that make this page what it is.

## Weak spots
- One or two things not worth copying.
```

## Full format

```markdown
## Tokens
- type: families and what each is for; the scale as size/leading weight tracking
- colour: grounds, text levels, accent, borders, as hex with their jobs
- space: content width and gutters, section padding, gaps, the working scale
- shape: radii, borders, shadows
- motion: durations, easing, what moves

## Structure
- The page top to bottom, one line per band: height, ground, what is in it and how it is arranged.

## Components
- **Name**: a recipe for one part: size, layout, surface, type, and what it does when used.

## Phone
- What changes at 390px, as before → after.

## Moves
- Three to five decisions that make this page what it is.

## Weak spots
- Anything on the reference not worth copying, and why.
```

## What makes an entry useful

- **Values, not adjectives.** "Bold typography" and "generous whitespace" describe every page and help nobody. "H1 88px/0.95, weight 500, −0.04em, left-aligned across 9 of 12 columns" can be acted on. Test each line: could an agent that has never seen the page do something specific with it?
- **Say what the numbers can't.** In a card, the `Measured` block already lists the values. `Read` is for what they add up to: what the page leads with, what it holds back, how one thing is told from another.
- **Moves are choices a builder would not make unprompted.** `design-references/DEFAULTS.md` lists what a builder does by default; a move is where this page does something else.
- **Not everything on a real site is good.** Human-made pages carry dated patterns, weak contrast and accidents. Put those under `Weak spots` so they aren't copied.
- **Describe, don't reproduce.** Quote at most a few words of the page's copy, and only to say which part you mean.
- **Mark what you inferred.** A size read off a screenshot, not found in a file, is written "about 36px". Where a band lies below the screenshots, give its measurements and say it was not seen.
- **A component recipe stands alone** (full entries). Someone should be able to build the part from its line without opening the site: its size, how its insides are laid out, its surface, its type, and how it behaves.
- **Plain text a person can read.** Full entries stay under about 60 lines, cards under about 35.

## What the capture can't see

- It measures the page scrolled to the top. Bars that appear only after scrolling, and anything that changes as you scroll, show in the screenshots but not in the measurements.
- Hover and focus states, and anything drawn in canvas or WebGL, are not measured.
- Navigation labels are sometimes images; a bar listed with links but no text is one of those.
- Share figures count characters, so a long legal footer can make its size look like the commonest text.
- A popup that opens on the phone pass can cover the page; the card then says the phone capture is not usable.
- When annotating many pages with subagents, run three or four at a time. Ten at once used up a 5-hour usage limit.
- Cookie banners are declined only when they offer a plain refusal button.
