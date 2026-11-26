---
url: https://tailwindcss.com/docs/installation
captured: 2026-11-22
type: docs
sector: developer tools
tags: [light, dense, small-type, hairlines, code-panel, mono-labels, sidebar]
summary: Docs article, nearly all 14px: 30px h1, prose and code in two aligned columns, hatched gutters.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a sans (Inter) and a mono (IBM Plex Mono, 16% of the text). h1 30px/1.2 w500 −0.025em; h2 18px/1.56 w600 −0.025em; lead 16px/1.75; 14px is 88% of the text, at /2 in prose and /1.71 in the sidebar; step titles 14px w600; labels 12px mono w500, uppercase, 0.1em; chip numerals 10px mono w500, 0.1em.
- colour: page #ffffff; headings #030712; prose #364153; sidebar links #4a5565; labels #6a7282; borders 1px #e1e2e4 and ink (#000014) at 5%; code panel #030712 with a white-at-10% inner panel; accent #00bcff, with #74d4ff inside code.
- space: a 288px sidebar, a 40px hatched gutter, a 1072px column holding 976px of content, a second 40px gutter; scale 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40. 24px gaps inside a step, 40px between steps, 32px between sidebar groups.
- shape: 12px on code panels, 8px on the panel inside them, pills on chips and buttons; no drop shadows, only 1px inset rings.
- motion: 150ms on cubic-bezier(0.4, 0, 0.2, 1), on colour and opacity; 300ms in a few places.

## Structure
- Top bar, 57px, fixed, white with a 1px ink-5% bottom border: logo and a version pill on the left; a "⌘K" search pill, five 14px links, one accent-tinted chip and an icon on the right.
- Under it one four-column grid: 288 sidebar + 40 hatch + 1072 content + 40 hatch, the columns bounded by vertical hairlines.
- Sidebar: sticky under the bar, one window tall (843px) and scrolling on its own; 18 labelled groups, 198 links.
- Opening, at the column's 48px inset: a 12px mono eyebrow, the 30px h1, two 16px lead paragraphs.
- An 18px h2, a row of five text tabs on a hairline, then one 14px paragraph.
- Six numbered steps, each with prose on the left and a code panel on the right.
- A ringed callout across the column: an info icon, three lines of 14px copy with a bold opening, a grey pill button at the right.
- Footer: three 320px link columns divided by vertical hairlines (14px/2, heads w600, links 16px apart), then a row with a three-way theme switch on the left and the copyright on the right.

## Components
- **Step row**: a six-column grid with 24px gaps: a 28px chip column, then five equal ones; prose spans two (about 355px) and the code panel three (about 545px), tops aligned. The chip is a 28px square with a 10px mono numeral ("01"); its 1px border (#364254 at 50%) is masked in the middle of the top and bottom so it reads as a pair of brackets. Title 14px w600 #0f172b, then 14px/2 prose in #364153, inline code in bold mono between backticks. No rule between steps.
- **Code panel**: #030712, 12px radius, 4px padding. A 28px header carries the file name or "Terminal" in 12px/1.67 sans, #99a1af, and a 16px copy icon at the right. Below it an inner panel (white at 10%, 8px radius, 1px inset ring of white at 10%) holds the code in mono, keywords pink and names #74d4ff. Lines that matter get a full-width band of #72d7ff at 15% with a 2px #00bcff left edge.
- **Sidebar group**: a 12px/2 mono label, uppercase, 0.1em, #6a7282; 12px under it a list with a 1px #e1e2e4 rule down its left side. Items are 24px tall, 8px apart, indented 16px, 14px/1.71 in #4a5565. The current item is w600 #030712 with a 1px #030712 rule over the grey one. No fill.
- **Tab row**: text tabs 24px apart on a 1px ink-5% hairline; each 37px tall, 14px/2 w500, 8px above the line. The current tab is #030712 with a 1px #030712 underline in place of the hairline; the others are grey.

## Phone
- Sidebar → a second 56px bar under the top bar, with a menu button and a breadcrumb (section in #6a7282, page in #030712). The pinned header grows 57 → 113px.
- Top-bar links → a search icon and a three-dot menu, 28px each; side padding 24 → 16px.
- Hatched gutters and vertical hairlines go; content 976 → 358 with 16px gutters.
- h1 stays 30px and wraps to two lines; lead stays 16px/1.75; prose stays 14px/2.
- Steps stack: chip and prose (306px) on one row, the code panel full width beneath. Long code lines run off the panel's right edge.
- The tab row keeps its size and scrolls sideways (536px of tabs in 390).
- The callout's button drops under its text; footer 3 columns → 2 × 171px. Page 2547 → 3979px.

## Moves
- Almost everything is 14px. Step titles are 14px/600 and the h1 is only 30px/500, so weight and the step from #4a5565 to #030712 carry the hierarchy.
- Each step is two columns, prose left and code right, so the code blocks line up as one column down the page. Steps are separated by space alone, and numerals sit in small bordered mono chips.
- The page frame is drawn: vertical hairlines bound the content column, and the 40px gutters outside it carry a faint 315° diagonal hatch at 5% ink. Structure without boxes.
- Code panels are objects: near-black, rounded, ringed, each with its own header and copy control, on a page that otherwise has no filled surfaces.
- The active sidebar item is marked by a 1px black rule on its left and weight 600. No fill, no colour.
- The accent appears only inside code and on one chip in the top bar.

## Weak spots
- The sidebar lists 198 links in one scroll, 7,384px of list in an 843px window; finding a page depends on search.
- 10px mono numerals and 12px tracked labels are at the edge of legibility.
- On a phone the two pinned bars hold 113 of 844px.
