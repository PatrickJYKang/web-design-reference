---
url: https://ia.net/topics
captured: 2026-11-22
type: editorial
sector: software company blog
tags: [index, light, mosaic, colour-keyed, single-sans, centred, image-led, minimal-chrome]
summary: Blog index as a mosaic of coloured tiles: one duospace sans, centred text on top, image below.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one family, a duospace sans (iA's own), in a day cut for light grounds and a night cut for dark ones; weights 700 and 400, with 500 on the topics line. Year 57px/1.05 w700 −0.015em; topics 28.5px/1.45; tile titles 24.4px/1.1 w700 −0.015em (35.1px on wide tiles, 45.9px on the full-width one); deks 16.5px/1.4 (20.8px on wide tiles); dates 11.4px/1.5 w700 uppercase 0.044em (13px on wide tiles); chrome 16–17.1px/1.45.
- colour: page #f9f9f9; default tile #eeeeee; text #1a1a1a, or #ffffff and #f0f0f0 on dark tiles. Tiles take their own ground: #e9e2d9, #000000, #257fa4, #f0729e, #122a3c, #c3102c, #1d2249, #1a2849. One cyan for the current year, the toggles and the subscribe button. Only eight borders on the page (black at 8–10%).
- space: tile grid 1328 of 1440 (56px gutters), 12 columns, 15px gaps; bar, title, product row and newsletter narrower, at 1024; small scale 5 · 7 · 10 · 12 · 14 · 16 · 28 · 56.
- shape: 12px radius on every tile, card, panel and menu; pills for buttons, year links and the email field. Shadows only on pills (0 1px 2px at 14%, 0 2px 8px at 10%), menus and the newsletter panel.
- motion: 200ms `ease` throughout: colour and background mostly, transform on tiles and pills.

## Structure
- Bar, 46px, sticky: #f9f9f9 at 80% with a 10px backdrop blur; a breadcrumb at the left, two dropdowns and a menu icon at the right, in a 1024px row.
- Title, 189px, after 100px of empty ground: a 44px round back chevron and the year at 57px, centred; under it the year's topics on three centred lines, 684px wide.
- Mosaic, 3983px (4.4 screens): 16 tiles in seven rows. Rows alternate between one wide tile (880px, 8 columns) beside one narrow (433px, 4 columns), and three narrow; the wide tile swaps sides each time. Rows are 362–623px tall. The last tile runs the full 1328 and is taller still.
- Year links, 210px: 22 pills, 2026 back to 2005, centred on two rows; the current year filled cyan.
- Product row, 277px: three 331px cards, 15px apart.
- Newsletter, 477px: one #fbfbfb panel with a soft shadow. Left: a 20px bold head, 20px copy, four cyan toggles, then an email field with a cyan pill button. Right: product photos.
- Footer, 241px, and a 122px row of four award badges: below the last screenshot, so not described here.

## Components
- **Post tile**: one link, 12px radius, flat ground, no border or shadow. A flex column with everything centred: date (11.4px/1.5 w700, uppercase, 0.044em), title (24.4px/1.1 w700 −0.015em) and dek (16.5px/1.4, one to three lines) in a 381px block at the top of a 433px tile; then the image at full tile width, flush with the bottom edge. Text is #1a1a1a on light grounds, #ffffff in the night cut on dark ones. Wide tiles (880px) set 13px, 35.1px and 20.8px in a 775px block. Carries a 200ms transform transition.
- **Sticky bar**: 46px, translucent and blurred, so tiles show through as they pass. Breadcrumb ("iA / Blog") and dropdown labels at 17.1px/1.45 regular, each dropdown with a small chevron. Menus are white, 12px radius, shadow 0 8px 24px black at 16% plus a 1px ring at 8%.
- **Year pills**: a centred, wrapping row within 924px. Each pill holds a year at 16px/1 on a pale grey ground; the current one is filled cyan with white w700 text.
- **Product card** (331×247, #eeeeee, 12px radius): a centred 22.6px/1.1 w700 name and a 15px/1.4 tagline at the top; the product image (331×166) pinned to the bottom; over it two 138×34 pills 8px apart, 13px w700 labels: one filled #1a1a1a with white text and an icon, one frosted (#eeeeee at 78%, 8px backdrop blur). Both carry the pill shadow. The middle card is black and its pills invert.

## Phone
- Mosaic → one column: all 16 tiles 343px wide, 13px apart, 24px gutters, 188–402px tall. Wide and narrow tiles become the same.
- Tile type evens out: titles 35.1 / 24.4 → 22.2px; deks 20.8 / 16.5 → 16.5px; dates 13 / 11.4 → 11px; text block 302px.
- Year 57 → 36.5px; topics 28.5 → 18.7px, still three lines.
- Bar 46 → 42px with the same contents; side padding 56 → 24px.
- Product cards 3 across → stacked, 343×254 each, pills 134×34.
- Page 5851 → 7896px (6.5 → 9.4 screens).

## Moves
- The index is a mosaic, not a list. Every post is a tile; important ones span two thirds of the width, the rest sit three across. No rules between posts, only 15px gaps.
- Each post owns a colour. The tile takes a flat ground chosen to suit its image, and the text switches to white (and to the font's night cut) on dark ones.
- Tile anatomy never changes: a tiny bold uppercase date, a bold title, a short dek, all centred at the top, then the image bleeding off the tile's bottom edge.
- One typeface with a typewriter rhythm does everything, in bold and regular.
- The page header is only the year, at 57px and centred, with the year's topics beneath as plain text separated by middots.
- Chrome is nearly absent: a 46px bar with a breadcrumb on the left and two dropdown filters on the right. The row of years sits at the foot of the page, not the top.

## Weak spots
- Without a text view, scanning a year's 16 titles means scrolling 4.4 screens of images, about six on a phone.
- Centred deks of two or three lines break raggedly.
- 11.4px dates are small against 24.4px titles.
- A narrow tile beside a wide one is stretched to its height (433×623) and left half empty between text and image.
