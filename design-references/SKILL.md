---
name: design-references
description: An annotated archive of real web pages, measured rather than copied - type, colour and spacing values, each page's structure section by section, recipes for its components, and what changes on a phone. Use before designing or restyling any web page or UI, so the work starts from a specific direction instead of default choices.
---

# Design references

Each file in `refs/` records one real page, measured rather than copied. Entries come in two depths:

- A **full entry** has measured tokens, the page's structure from top to bottom, recipes for the components it leans on, what changes at phone width, and the decisions that make it distinctive.
- A **card** (marked `(card)` in the index) is shorter: a `Measured` block of values written by the capture script, and a few lines of reading. It gives a direction and its numbers, but no component recipes.

Either is meant to be enough to work from without opening the site.

## How to use

1. Read `DEFAULTS.md`. It lists habits that kept showing up when an agent built pages with no reference. Check your plan against it.
2. Read `INDEX.md`, which is grouped by page type, and pick two or three entries that suit the page type and the character the brief calls for. Read only those. Choose by fit, not by depth: a card that does your page's job is a better main direction than a full entry that doesn't. A reference from a different sector is often the better pick: it brings a direction the obvious one doesn't.

   Match the page's job before anything else. An index page's moves (image-led tiles, titles set into caption blocks, ruled grids) don't transfer to a single article or a single product page, and the owner has marked one build down for exactly that. If no entry does the same job as your page, say so, skip step 3, and work from `DEFAULTS.md` and the brief.
3. Commit to one entry as the direction and say which in one line before you build. Borrow at most one or two moves or components from the others. Averaging several references produces the generic result this archive exists to prevent.
4. Start from that entry's values (type scale, spacing, radii, how the palette is structured, motion timings) and adapt them to the brief's subject. The numbers are there so you don't fall back on round ones.
5. Build components from their recipes. A recipe gives a part's size, layout, surface, type and behaviour; use those proportions and fill it with the brief's content. A card has no recipes: take its buttons, nav and repeated parts from the `Measured` block.
6. Take structure, proportion and technique, not identity. Don't reuse a reference's copy, logo, illustrations, or its exact typeface-and-palette pairing; choose equivalents that suit the brief.
7. Design the phone width on purpose. The entry's `Phone` section says what the page does at 390px; follow it, and check the widths in between yourself. Full-bleed imagery, mosaics and small captions under large pictures are the moves most likely to fail.

## Reading an entry

- **Tokens** are measured values at 1440px wide. Type reads size/line-height, then weight and tracking.
- **Measured** (cards) is the same kind of values, written by script. Its colour line says light or dark and lists grounds as seen on screen, counted from the screenshots ("about" marks a colour that comes from an image or canvas, not a style rule). Its `bands` line is the page in order: each band's height, ground and largest text, with any row of columns in brackets. Shares count characters, so a long footer can inflate the commonest size.
- **Read** (cards) is the short version of Moves.
- **Structure** is the page in order, one band per line, with heights and grounds. Use it for rhythm and proportion, not as a list of sections you must have.
- **Components** are recipes for the parts the page leans on.
- **Phone** says what changes at 390px, as before → after.
- **Moves** are the decisions that make the page what it is.
- **Weak spots** are things on the reference that aren't worth copying.
- **Owner notes**, where present, come from the archive's owner and override everything else in the entry.
- A line that says a part was measured but not seen comes from below the screenshots: trust its numbers, not its description.
- `captured` is the date it was measured. The live site may have changed since; open the URL only if you need something the entry doesn't cover.
