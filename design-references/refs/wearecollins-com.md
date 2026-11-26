---
url: https://www.wearecollins.com
captured: 2026-11-22
type: portfolio
sector: brand consultancy
tags: [dark, tinted-dark, serif-display, centred, airy, slow-motion, minimal-chrome]
summary: Warm-black consultancy home: one 72px serif line at mid-screen, a film panel rising, quiet rows.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a serif (Portrait Text) for statements, 72px/1.0, 40px and 36px/1.05, all −0.02em; a sans (Graphik) for facts, 28px/1.05 for list names, 16px/1.3 at −0.01em for copy and labels, 14px/1.0 at −0.011em for buttons, 12px/1.0 at −0.053em for awards. Everything weight 400.
- colour: page #140700 (brown-black); text #f8f8f7 and #d0d0c8, #ffffff on the coloured section and in the footer; buttons #f8f8f7 or #ffffff with #140700 text; a single hairline colour #514c49. One section takes a whole coloured ground: #636247 in this capture, #ff4500 in the phone pass.
- space: content 1244 of 1440 (98px gutters); 16px between columns and tiles; section padding 96–128px; scale 4 · 8 · 12 · 16 · 24 · 32 · 64 · 98.
- shape: 16px radius on media panels and tiles; pills for buttons and the email field; no shadows.
- motion: 500–800ms on cubic-bezier(0.19, 1, 0.22, 1) for transform, opacity and clip-path reveals; 250ms on cubic-bezier(0.215, 0.61, 0.355, 1) for hovers.

## Structure
- 74px bar fixed at the top with no ground: a 93×15 wordmark at the left gutter, a two-line menu icon at the right. It is out of view in every screenshot after the first.
- Opening, 810px, #140700: the 72px line centred with 369px of empty ground above it; the awards block sits 74px from the bottom.
- Film panel, 700px: 1244 wide with 16px radius, its top 90px inside the first screen. It shows about 1000px wide on entry and full width once scrolled in.
- Programs, 852px: a section head on the left, then four program rows and an "All Programs (11) →" text link.
- Case studies, 991px: the same head, then a sideways row of nine picture tiles, three and a half in view.
- Slide section, 900px (one screen), ground #636247: on the left, vertically centred, a label, a 40px serif line and a white pill; on the right a 780px-wide picture with 16px radius, 32px from the top, right and bottom edges; four progress bars bottom-left.
- Footer, 900px, #140700: three 72px serif links stacked and centred; under them one row of a white pill and three text links; at the bottom an email field on the left and three social links on the right.

## Components
- **Section head**: left-aligned at the gutter. A 16px/1.3 sans label in #d0d0c8, 29px below it a 36px/1.05 serif statement in #f8f8f7 on two lines, 32px below that a pill: 45px tall, 24px side padding, #f8f8f7 ground, 14px sans in #140700, no border. The pill's transform eases over 800ms.
- **Program row**: one link 1244 wide and 93px tall, 32px above and below its text, a 1px #514c49 line under it. Columns of 455 + 455 + 16 with 16px gaps: the name at 28px/1.05 in #f8f8f7, a one-line promise at 16px/1.3 in #d0d0c8, then a 16px icon that is not visible at rest.
- **Case tile row**: nine 362×543 pictures with 16px radius, 16px apart, 32px above and below, no captions or borders; the client's logo is part of the picture. The row scrolls sideways, starts at the 98px gutter and runs off the right edge.
- **Awards block**: 500px wide, centred. A 12px label in #d0d0c8, then 24px lower eight items in two rows of four, 13px apart: each 107px wide, a 12px name in #f8f8f7 between two 18px laurel marks.

## Phone
- Bar 74px fixed → 82px and scrolls away; the wordmark moves to the centre. Gutters 98 → 24px (content 342).
- Headline 72 → 36.8px; statements 36 → 29px; program names 28 → 24px; footer links 72 → 48px. Copy stays 16px.
- Awards: two rows of four → one line, the label and a single award name between two 21px laurels.
- Film panel 1244×700 → 342×608, taller than wide.
- Program rows: columns → name above promise, 93 → 106px tall.
- Tiles 362×543 → 254×317, still a sideways row, now snapping, one and a third in view.

## Moves
- A small headline in a lot of silence. One 72px serif line sits centred at mid-screen on warm black. The only other things on the first screen are two rows of 12px award names and the top 90px of a film panel coming up from the bottom edge, which is the scroll cue.
- The black is warm. Brown-black with cream-white text, and colour is spent as the whole ground of one full-screen section, not as trim.
- Serif for voice, sans for facts: statements in the serif at 36–72px; names, descriptions and labels in the sans, never larger than 28px. The footer is three 72px serif links, not a directory.
- Services are a quiet table: a 28px name, a 16px one-line promise in a second column, a hairline, ending in "All Programs (11) →".
- Motion is slow and decisive: half a second or more, on a hard ease-out.

## Weak spots
- 12px text at −0.053em tracking is small and tight; the awards are easy to miss.
- Main navigation is behind a menu icon on desktop: the bar holds 11 links and shows none.
- The first screen says almost nothing about what the firm does.
- The slide section appears to advance by itself (the second of four progress bars is part-filled) and shows no pause control.
