---
url: https://www.pentagram.com
captured: 2026-11-22
type: portfolio
sector: design studio
tags: [light, work-led, single-sans, one-size-type, mosaic, full-bleed, minimal-chrome]
summary: Studio home where the work is the page: one grotesque at 16px, full-bleed hero, mixed-span tiles.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one grotesque (Plain) for everything, weight 400 for all but 1% of it. 16px/1.25 is 89% of the text; 13px/1.25 for tags and years; 52px/1.05 −0.02em for the title of each dark band; 32px/1.2 −0.01em for quotes. Project names are 16px in the dark text colour; nothing is bold.
- colour: page #ffffff; names #1a1a1a; descriptions #767676; dark bands #222222 with a #000000 inset, text white and white at 56%; image placeholders #e3e4e5; tag chips black at 7% with text black at 56%. No accent: all colour comes from the work.
- space: content 1392 of 1440 (24px gutters); section padding 48px, sometimes 64 or 96; 12px between tiles across, 48px down; scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96.
- shape: 4px radius on the filter bar and tag chips, 8px on the black inset, round dots in the hero; images read as square-cornered in the shots; no shadows, four 1px #333333 borders on the whole page.
- motion: 300ms and 400ms on cubic-bezier(0.4, 0, 0.2, 1); the hero cross-fades between slides.

## Structure
- 60px nav, white, not pinned: a 103×24 wordmark left; five 16px links and a search icon right, 24px apart.
- Hero, 617px, edge to edge: twelve cross-fading project slides with a caption bottom-left, twelve dots bottom-right and the filter bar at the centre. 96px of white under it.
- Theme band, 951px, #222222: a 52px title at the left gutter, a 16px paragraph in white at 56% held to 674px, then a black inset strip of four tiles.
- A centred 16px grey line with a small down arrow, then a tile batch, 1750px, white: a 456px tile beside a 924px one, then two rows of three.
- Retrospective band, 889px, #222222: the 52px title with a count in brackets at the far right, the same paragraph, and a row of posters that runs off both edges with a 13px year above each. A 259px quote band follows on the same ground: 32px type starting at the second grid column, the speaker's name under it.
- The grey line again, now with the category in a chip, and the next batch, 1793px, with the wide tile on the left.
- Below the sixth screen (measured, not seen): the same alternation to 28.4 screens, seven dark bands and eight tile batches in all, two batches opening on a full-width 1392px tile; then a 1667px footer on #000000.

## Components
- **Filter sentence**: a 327×44 bar, #e8e8e8 at 80% over a 7.5px backdrop blur, 4px radius, 16px side padding. It reads as one 16px sentence in #1a1a1a with two dropdown words, each a 44px-tall button with a 12px chevron; a word's options sit in a vertical reel of sixteen 44px lines. Centred on the hero at load, then fixed centred near the bottom of the window for the rest of the page.
- **Project tile** (456×404): a 456×304 image with no frame; 8px under it the name at 16px in #1a1a1a and a two- or three-line description at the same size in #767676, both stopping 24px short of the tile's right edge; then an optional row of 24px-tall tag chips (13px, padding 4px 8px). The wide variant is 924px across with the same caption.
- **Theme strip**: a #000000 box, 1227×536, 8px radius, 24px padding, on the #222222 band. Four 286×488 tiles 12px apart, each an image over a white 16px name and a description in white at 56% cut to two lines with an ellipsis. It starts at the left gutter and stops short of the right one.
- **Hero**: 1440×617 directly under the nav, slides stacked and cross-faded over a #e3e4e5 placeholder. Caption at the left gutter along the bottom: name and one line, both 16px white, straight on the image. Dots bottom-right: twelve 18px white circles 6px apart in a group with 24px padding, the current one brightest.

## Phone
- Nav: six items → the wordmark and a 60×60 two-line menu button.
- Hero 1440×617 → 390×520, the image cropped to its middle; the caption keeps the name only and the dots go.
- Filter bar 327×44 on one line → 342×56 on two, nearly the full width; still fixed near the bottom after the hero.
- Gutters 24 → 12px. Tiles: three columns → one, each 366px wide over a 366×244 image, 48px apart; the wide tile becomes a taller one; tag chips go.
- Band titles 52 → 36px, quotes 32 → 24px, band padding 48 → 32px. The theme strip stays a row and scrolls sideways: tiles 286 → 165px wide, about two in view.
- 28.4 → 38.5 screens. Body text stays 16px.

## Moves
- The work is the page. The hero is an edge-to-edge project carousel carrying only a caption and dots, 199 images and videos follow it, and 89% of the text is 16px.
- The only statement about the firm is a filter written as a sentence, "We design [Everything] for [Everyone]", in a small translucent bar. The nav scrolls away; the bar is the one thing that stays.
- One size for nearly all text. A name and its description differ only in grey (#1a1a1a against #767676), so captions never compete with the work.
- Tiles come in one, two and three spans of a 456px column, 12px apart, and the wide tile changes side from batch to batch, so the grid never settles into a uniform wall. With 24px gutters and 48px section padding, images nearly touch.
- Dark interludes for curated themes and retrospectives break the white about every two screens: a 52px title, a 674px paragraph, and a strip of work in a black rounded box or running off both edges.

## Weak spots
- The home page runs to 28 screens, 38.5 on a phone.
- #767676 on white is 4.5:1, the bare minimum, and carries a third of the text.
- Hero captions sit directly on busy imagery and are hard to read on some slides.
- On a phone the hero loses its dots, so twelve slides have no visible control.
- `transition: all` on 198 elements.

## Owner notes
- 2026-11-21, owner, blind A/B on a studio home brief: preferred a build in this direction for "better scale and more colour contrast", but it "only really works on a big desktop". (Claude's reading: small type under full-bleed images and an unequal mosaic depend on a wide canvas; at 390px that build's hero image was cropped to its middle.)
- 2026-11-25, owner, blind A/B on a studio home brief: this time preferred the baseline over a build based on this entry (a 52px statement, then one project picture edge to edge). No reason given. With the 2026-11-21 note, that is one preference each way for this direction.
