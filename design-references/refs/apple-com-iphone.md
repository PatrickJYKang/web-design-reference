---
url: https://www.apple.com/iphone/
captured: 2026-11-22
type: commerce
sector: consumer electronics
tags: [index, light, horizontal-scroll, photo-led, single-sans, pills, rounded-cards]
summary: Product-family page made of four sideways card shelves on white and pale grey, under one 80px word.
picked-by: owner
---

## Tokens
- type: one grotesque in two optical cuts (SF Pro Display at 28px and up, SF Pro Text at 17px and down), weights 600 and 400 only. Page title 80px/1.05 −0.015em; slide title 56px/1.07; section heads 48px/1.08 −0.003em; card titles 28px/1.14 +0.007em; copy 17px/1.47 or 1.24, −0.022em; prices 14px/1.29; flags 12px and 10px; legal 12px/1.33.
- colour: grounds #ffffff and #f5f5f7 in alternation, #fafafc for the closing index; text #1d1d1f, secondary #6e6e73 or black at 56–88%; one blue, #0071e3 as a fill and #0066cc as text and outline (#2997ff on a dark slide); "New" flag #b64400; control chips #e8e8ed; hairlines #d2d2d7.
- space: content 1260 of 1440 (90px gutters); 144px above every section head; 20px between cards; 28–32px inside them; 48px inside a hero slide; legal column 980.
- shape: 28px radius on every card, tile, panel and image; pills for buttons; circles for swatches (12px) and paging chips (36px). No borders or shadows on cards.
- motion: link colour over 300ms cubic-bezier(0, 0, 0.5, 1); 240–344ms on cubic-bezier(0.4, 0, 0.6, 1) elsewhere; accordion 400ms ease-in-out. The hero shelf advances by itself and has a pause button.

## Structure
- 44px nav, not pinned; then a 46px #f5f5f7 strip with one centred 14px offer line and a blue link.
- Title band, 390px, white: the single word at 80px, left at the gutter, 96px above it; under it a row of ten small product pictures (66px tall) with 14px semibold labels, which is the real navigation.
- Hero shelf, 892px, white: two 1260×612 slides, the second showing 70px at the right edge; 224px left empty below.
- Lineup shelf, 1042px, #f5f5f7: head on the left, one text link on the right of the same line; six product cards, three and a half in view.
- Reasons-to-buy shelf, 935px, #f5f5f7: eight white cards, three and a half in view.
- Two 620×648 tiles side by side, 922px, white: #f5f5f7 tiles with a centred 28px title, 17px copy and a blue text link over a photo.
- One 1260×784 #f5f5f7 panel, 1172px, white: a three-item accordion in the left 350px, and a device picture on the right that changes with the open item.
- Closing index, 813px, #fafafc: the word again at 48px over three columns of links (312 + 289 + 252), product names at 28px, the rest at 17px semibold.
- 9,344px of 12px legal text in the 980px column, then a 5 × 196px directory of 12px links.

## Components
- **Shelf**: a row that scrolls sideways with `scroll-snap-type: x mandatory` and no visible scrollbar. Items are 372px wide and 20px apart, start at the page gutter and run off the right edge, so a cut-off card is the cue. Above it, a 48px head with one 17px blue link at the far right. Below it, right-aligned, two 36px round grey chips with chevrons.
- **Product card** (372×768, no surface of its own): an image tile 372×395 with 28px radius, a row of 12px colour dots, "New" in 12px semibold #b64400, the name at 28px semibold, a one-line promise at 17px semibold, two 14px price lines, then a filled pill and a text link 34px apart. Everything centred.
- **Reason card** (372×495, white on #f5f5f7, 28px radius): 32px inset; a 17px semibold label, a 28px semibold headline, 17px copy; a picture across the bottom 284px; a 36px round #e8e8ed chip bottom-right.
- **Hero slide** (1260×612, 28px radius, ground matched to the photo): a 56px title with a 28px regular line under it, top-left at 48px; two pills top-right; the product fills the rest. A dots-and-pause control stays 32px above the bottom of the window while the shelf is on screen.
- **Buttons**: a pill 44px tall with 11px 21px padding and 17px regular text, either filled #0071e3 with white text or outlined 1px #0066cc with blue text. The third level is a plain blue text link ending in ›.

## Phone
- Nothing stacks: every shelf stays a shelf. Cards 372 → 260px wide, 1.3 in view; the two tiles become a shelf too.
- Title 80 → 48px; section heads 48 → 32px; card titles 28 → 21px; copy 17 → 14px; pills 44 → 36px tall.
- Gutters 90 → 24px; space above section heads 144 → 112px.
- Hero slides 1260×612 → 321×480, with the title centred above the picture and the pills under it. Product-card text turns left-aligned. Head links drop under the head.
- The nav becomes a 48px bar with logo, search, bag and menu; the product-picture row scrolls sideways.

## Moves
- The page is shelves, not a stack. Twenty-one items sit in under seven screens because each band scrolls sideways.
- The title is one word with no tagline, button or picture beside it. The first thing to use is the picture row beneath it.
- Colour comes from the product photos only. Chrome is white, pale grey, near-black and one blue, and blue always means something can be pressed.
- Separation is by ground, never by line: white cards on grey, grey tiles on white, the same 28px radius throughout.
- Every product gets the same pair of actions: a filled pill to learn more, a quieter link to buy.

## Weak spots
- Legal text is 58% of the page's height at 1440px, and about 30 of 37 screens on a phone.
- Shelves hide most of what they hold: three and a half of six product cards and of eight reason cards are in view, with no scrollbar.
- The hero plays by itself; it needs the pause button it has.
- The 224px under the hero is there to park the slide control. Without that control it is dead space.
