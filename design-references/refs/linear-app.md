---
url: https://linear.app
captured: 2026-11-22
type: landing
sector: developer tools
tags: [dark, product-led, single-sans, grey-hierarchy, hairlines, dense]
summary: Near-black product landing: one grotesque at 64px, four greys, the app itself as the hero image.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one sans (Inter Variable, 83% of characters) for everything, a mono (Berkeley Mono) only for code and small uppercase labels. h1 64px/1.0 weight 510, −0.022em; section heads and the statement 48px/1.0 w510 −0.022em; section copy 24px/1.33 w400 −0.012em; body 15px/1.6; UI 13px/1.54; labels 12px/1.4 w510; ticket ids 10px/1.4. Weights are 400, 510 and 590, not 400/500/600.
- colour: page #08090a; raised surfaces #0f1011 and #161718, product frame #101112; text in four levels #f7f8f8 / #d0d6e0 / #8a8f98 / #62666d; borders 1px #ffffff at 8% (12% for emphasis, 5% faint); the sign-up pill #e5e5e6 with #08090a text. No accent in the chrome.
- space: content 1344 of 1440 (48px gutters), text inset a further 32px; section padding 128px, 96px between a section's head and its visual; small scale 4 · 6 · 8 · 12 · 16 · 24 · 32.
- shape: radii stepped by size, 6 / 8 / 9 / 12px, pills for buttons and tags; depth from 1px rings (0 0 0 1px rgba(0,0,0,.2)) with one soft 0 2px 32px rgba(0,0,0,.25) on floating panels.
- motion: 100ms and 160ms on cubic-bezier(0.25, 0.46, 0.45, 0.94), almost all on colour; 400ms for larger reveals; a text cursor blinking every 1.25s inside one product panel.

## Structure
- Nav, fixed, 73px: transparent over a 20px backdrop blur, 1px white-at-8% rule under it; logo left; six 13px grey links, a divider, log in and a 32px sign-up pill (#e5e5e6, 12px side padding, 13px w510) grouped at the right.
- Hero, 1024px: the h1 starts 271px down, two lines at the left; under it one line of 15px #8a8f98 with a two-word link at the far right of the same line; then the product frame, cut by the fold.
- Logo row, 40px: seven white wordmarks spread across the full width, 116px apart, with a mono uppercase caption under the first.
- Statement, 144px: three lines of 48px in two greys.
- Figure triplet, 468px: three 427px columns split by vertical hairlines.
- Four feature sections of about 1,225px each, ruled off edge to edge by hairlines: a two-column head, a product visual (a chat thread laid over a faded issue board; a timeline beside a chart panel), then a row with a small grey label at the left and plus-links in two ruled columns on the right half.
- Not in the screenshots, from the structure map only: a changelog row (422px, four 272px columns, 64px gaps), a quote band (564px, 880 + 432), a centred 72px closing line over two controls (228px), and a 524px footer of five 224px link columns in 13px.

## Components
- **Product frame**: the app drawn in HTML, not a picture. 1320×720, #101112, 1px white-at-8% border, 12px radius, 8px inner padding; a 232px sidebar and a 1072px main pane. Sidebar rows are 28px tall with 8px radius, an icon and a 13px label 8px apart. A 400px agent panel floats over the lower right: #0f1011, 1px white-at-12% border, 12px radius, shadow 0 2px 32px rgba(0,0,0,.25), a 48px header with a 16px round mark, a 13px w500 name, an 11px tag in a 1px-bordered 4px-radius chip and three 14px icons.
- **Section head**: a two-column grid across 1344px. Left, the 48px head broken by hand into two lines. Right, a 24px/1.33 paragraph in #d0d6e0 about 566px wide, then a 15px "Learn more →" in #8a8f98 with the arrow one grey lower. 96px under it before the visual.
- **Figure column** (427×468): 32px right padding and a 1px white-at-8% right border; a "FIG 0.1" label in 12px uppercase mono, #8a8f98, top-left; a stroke-only isometric drawing, 265×262; then a 15px/1.6 w510 title in #d0d6e0 and two lines of 15px #8a8f98, 8px apart.
- **Issue card** (300×96): #0f1011, 1px white-at-8% border, 9px radius, padding 8 10 12 12; a 10px id in #62666d with a 14px mark at the right; a one-line title in #f7f8f8, truncated; a row of 24px pill tags (1px #2e2e32 border, 7px side padding, 12px text, a coloured dot). Cards stack 8px apart in 300px columns 12px apart, under a 12px w510 column header with a status icon and a count. Columns fade out towards the right edge.

## Phone
- 11.1 screens → 7 (9,990 → 5,936px). Gutters 48 → 16px; section padding 128 → 40–48px.
- h1 64px/1.0 in two lines → 38px/1.1 in four; statement and section heads 48px/1.0 → 24px/1.33; section copy 24 → 15px; closing line 72 → 38px.
- Nav 73 → 65px: logo, log in, the sign-up pill and a 16px menu icon; the six links go behind the icon.
- Product frame 1320×720 → the same drawing at half scale, 660×360, running off the right edge.
- Figure triplet: three ruled columns → three 328×440 cards (#0f1011, 1px white-at-5% border, 8px radius) in a sideways snap row, 8px apart, without the FIG labels.
- Section heads: two columns → head, copy and link stacked. The logo row runs off both edges.
- Footer: five columns → two; 524 → 938px tall.

## Moves
- The product is the picture. A working-looking drawing of the app sits 60px in from each edge, wider than the text above it, starts about 530px down the first screen and runs past the fold, edged with a 1px ring and no drop shadow.
- Hierarchy by grey, not by size or colour. Four text levels on one near-black, a raised surface only one step lighter than the page, and no accent: colour appears only inside the product drawings, as status and tag dots, a violet send button and teal chart points.
- A two-tone statement: one 48px/1.0 paragraph in three lines, the first sentence in the top grey and the rest two levels down.
- Small text is small. 86% of characters are at 15px or below, and heads jump straight from 24px copy to 48px.
- The hero is left-aligned with no buttons in it. The only call to action is the pill in the nav; a secondary link sits at the far right on the subhead's line.

## Weak spots
- The lowest text grey, #62666d on #08090a, is about 3.5:1, under the 4.5:1 minimum for body text, and it carries 10% of the text.
- 10px ticket ids, in that same grey, are below a comfortable reading size.
- A hero with no action in it relies on visitors already knowing the product.
- On a phone the product drawing is shrunk and cropped, not redrawn: its labels come out at half size and nearly half of it is off screen.
