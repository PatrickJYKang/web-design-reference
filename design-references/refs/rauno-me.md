---
url: https://rauno.me
captured: 2026-11-22
type: portfolio
sector: personal site
tags: [light, horizontal-scroll, giant-type, flat-primaries, single-sans, minimal-chrome, experimental]
summary: Personal site as a sideways filmstrip of white cards: 85px sentence, 720px letters, flat circles.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one grotesque, weight 400 throughout, line height left at the default. Four sizes only: 720px for single letters and words, 85px for the sentence, 75px for the link card and the closing list, 14px for labels.
- colour: ground #ededed; cards #ffffff; text #171717 (sentence) and #000000 (giant glyphs); labels #6f6f6f; shapes in flat #ffff02 and #ff5800; scrubber lines 1px #8f8f8f. A blue pixel drawing and a red handwritten title are pictures.
- space: cards 1059 wide and about 636 tall, about 36px apart; labels 8px above each card; measured scale 8 · 9 · 50 · 64.
- shape: square corners on every card; no shadows; the only curves are the two circles.
- motion: 200ms ease-in-out on background, border colour and opacity; a 0.35s ease-in-out fade between frames.

## Structure
- One block 6108px tall (6.8 screens) on #ededed with no header, nav or footer. Scrolling down moves a single row of cards sideways. The six screenshots reach eight cards, left to right:
- Sentence card: six lines at 85px over a card-height yellow circle.
- "Devouring Details": a 720px D beside a card-height orange circle.
- "Craft", and two cards later "Projects": one word each at 720px, wider than its card and cropped by it.
- Between them, "History of Software Design": a blue pixel-art pointing hand centred on empty white. After them, "Field Notes": a red handwritten title, centred.
- Link card: five 75px words, one in each corner and one in the centre.
- Closing card: #ffff02 ground, a seven-line list at 75px, left-aligned.
- Fixed over the strip: a tick scrubber centred about 64px from the top, and a crosshair at the centre of the window.

## Components
- **Card**: 1059 × about 636, #ffffff, square, no border or shadow, about 36px from the next. A 14px #6f6f6f label sits outside it, 8px above the top-left corner. Each card holds one thing, and anything bigger than the card is cropped by its edges.
- **Sentence card**: six lines at 85px (about 90px a line) in #171717, starting about 57px in from the card's left edge, with lines 2, 4 and 6 indented a further 56px. A #ffff02 circle as tall as the card sits flush with its right edge, under the text.
- **Glyph card**: a letter or word at 720px in #000000, its cap height centred with about 90px clear above and below. A word wider than the card slides inside it as the strip moves, so the card works as a window: one screenshot shows "ject", the next "cts".
- **Scrubber**: sixteen ticks, 1px wide, 18px tall and 10px apart, in a row about 190px wide, fixed and centred near the top. A 30×17 frame with a 1px #8f8f8f border rides along the row to show position. A 20px crosshair of 1px lines stays at the centre of the window.

## Phone
- Only the first screen was captured (the page reports 844px, one screen), so nothing past the first card is known.
- The strip is shrunk as one piece, not re-set: the first card goes 1059 → 360px wide and about 636 → 216px tall, 15px from each side, centred in the height with bare #ededed above and below.
- Type still measures 85px and 720px; the sentence shows at about a third of that.
- Scrubber and crosshair stay, at the same size as on desktop. The next card's edge still shows at the right.

## Moves
- The page is a filmstrip. White cards sit in one horizontal row on a grey ground and vertical scrolling moves them sideways, so the next card's edge is always in view. The strip also shrinks as it travels: cards are about 636px tall on the first screen, 570 on the second and 432 from the third on.
- Scale is the idea. The introduction is one sentence at 85px; after it, each destination is a card holding a single letter or word at 720px, cropped by the card ("D", "Craft").
- Flat primaries as geometry: a 636px yellow circle sits behind the sentence, an orange one stands in for a letter. Pure colour, no tints, no gradients.
- The sentence is staggered: alternate lines are indented by about 56px, breaking it into phrases.
- Navigation is an instrument: a row of 1px ticks at the top with a small frame that slides to show position, and a fixed crosshair at the centre of the viewport.
- Labels are 14px grey and sit outside the cards, above their top-left corners.

## Weak spots
- Vertical scroll is hijacked to move sideways, which some people find disorienting and which breaks expectations on trackpads.
- Destinations are cropped glyphs; without the small labels there is no way to know what a card leads to.
- Almost no real text: one sentence, five links and a seven-line list.
- On a phone the strip is only shrunk to fit, so the 85px sentence shows at about a third of its size.
