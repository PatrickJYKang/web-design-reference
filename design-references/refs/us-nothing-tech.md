---
url: https://us.nothing.tech
captured: 2026-11-22
type: commerce
sector: consumer electronics
tags: [index, light, photo-led, full-bleed, multi-voice-type, dot-matrix, mono-labels, floating-nav]
summary: Electronics store home: full-bleed product photos, a 48px corner headline, four type roles.
picked-by: agent, pilot placeholder
---

## Tokens
- type: four voices, all weight 400. A warm display face (NType 82) for every headline: 48px/1.0, 32px/1.0, 24px/1.1, 18px/1.4. A dot-matrix face (Ndot), uppercase, at 20px for eyebrows and the wordmark and 40px in the footer. A sans (Geist) at 16px/1.3 for copy. Uppercase mono for nav, links and buttons: Geist Mono at 14px, 12px and 11px, Lattera Mono at 11px/1.1 in the footer.
- colour: page #f4f4f4; dark bands and footer #040404; text #040404 and #595a5a, or #ffffff (80% for copy on dark); tile grounds #626262 at 5%; one band of #d7d9d9 at 50%; promo strip #ffc700. No brand accent and no borders at all. A grid of 1px white dots lies over every section, photographs included.
- space: a 12-column grid with 8px gaps and 8px side margins (1424 wide); most content sits on the middle ten columns (1185); hero text is inset 32px. 144px between sections, 40px between a full-bleed band and its caption band, 32px inside a section. Scale 8 · 12 · 16 · 20 · 24 · 32 · 40 · 96 · 144.
- shape: radii of 4px (buttons, nav), 8px (image tiles) and 6px; no shadows.
- motion: 100–500ms on cubic-bezier(0.4, 0, 0.2, 1), nearly all opacity; link fades 150–200ms; smooth scrolling.

## Structure
- Header, fixed: a 708px stack centred at the top, not a full-width bar.
- Hero, 900px: one photograph edge to edge, its lower 450px darkened by a gradient; eyebrow, 48px headline and button stacked in the bottom-left corner.
- Categories, 412px, #f4f4f4: a centred 48px head over four 290px tiles on the ten-column measure.
- Product feature, 900px, black: a dark headphone barely lit; dot-matrix eyebrow, 48px headline and white button centred in the upper half.
- Caption band, 181px, 40px below: two 589px columns, a dot-matrix date on the left; a 32px headline, one 16px grey line and a black button on the right.
- Campaign photo, 810px, edge to edge: a 48px white headline at left-centre, a white button bottom-right.
- Colour edit, 867px: a 48px head top-left and three product tiles, two large and one small, staggered rather than gridded, each with a mono link beneath.
- Speaker feature, 761px: a 48px head and one 16px line at the left margin, then two tiles side by side across the full 1424px.
- Below the captured screens, by measurement only: a second 810px full-bleed band with a 176px caption band; a 477px band on #d7d9d9 at 50% with a centred 48px head over five 230px icon-and-label columns, 144px above and below; a 575px #040404 mailing-list band; a 952px #040404 footer with 40px dot-matrix heads and 11px mono links.

## Components
- **Floating nav**: 708px wide, centred, fixed 8px from the top. Two pieces stacked 8px apart, both 4px radius: a 30px #ffc700 strip with one centred 11px uppercase mono line (three messages rotate), and a 54px bar of white at 80% over a 45px backdrop blur, 16px padding, with the 20px dot-matrix wordmark on the left and five uppercase mono links (20px apart) plus bag and account icons on the right.
- **Hero overlay**: over the photo, a gradient from clear to rgba(4, 4, 4, 0.6) across the lower half. 32px in from the left and bottom, a column: 20px dot-matrix eyebrow, 24px gap, 48px/1.0 white headline no wider than 640px, 40px gap, button.
- **Button**: 40px tall, 12px 16px padding, 4px radius, no border: a 12px/1.25 uppercase mono label, 8px gap, a 16px chevron. White with #040404 text on photographs and black; black with white text on the pale ground.
- **Category tile**: a 290px square, 8px radius, ground #626262 at 5%, the product cut out on it. 16px beneath, a 14px/1.25 uppercase mono link in #595a5a, underlined, with a 16px chevron 10px to its right; its opacity eases over 200ms. No border and no card around the pair.

## Phone
- Header 100 → 90px. The 54px bar with five links → a 374×48 bar with wordmark, bag, account and menu icons (32px targets). The promo strip stays, full width.
- Hero 900 → 693px; headline 48 → 32px; inset 32 → 16px; the gradient covers the lower 520px.
- Every 48px head → 32px, and the centred category head turns left-aligned. Caption-band headlines 32 → 24px/1.1.
- Category grid of four → a sideways snap row of 252px tiles, one and a half in view. The staggered colour-edit tiles → the same row at 344px.
- Caption bands: two columns → one stack of date, headline, line, button; 181 → 282px.
- On the campaign photo the headline moves to the centre and the button sits directly under it.
- Between sections 144 → 96px; between photo and caption 40 → 20px. Grid 12 → 6 columns; the 8px margins stay.

## Moves
- Product photography runs edge to edge. The 48px headline sits in the bottom-left corner over a gradient that darkens the photo's base, with a dot-matrix eyebrow above it and one small white button below. Nothing on the page is set larger than 48px.
- Four typefaces, each with one job, and the signature one (dot-matrix) used least.
- The nav floats: a bar only 708px wide, centred at the top with the promo strip stacked on it. The rest of the top edge belongs to the photograph.
- Sections alternate by product, not by rhythm: pale grey with a dot grid for the range, then full black where a dark product emerges with only a centred 48px line and a button.
- Category tiles are borderless squares of product on a pale ground. The label is a 14px uppercase mono link beneath, underlined, with a chevron.
- Spacing has two settings: tight inside a section (32px), very open between sections (144px).

## Weak spots
- Category links are 14px underlined mono in a target 18px tall, small for the main way into the shop.
- The dark product on a black section is hard to make out.
- Six font files are loaded for four roles.
- The dot grid is drawn over the photographs too, so white dots cross the products.
