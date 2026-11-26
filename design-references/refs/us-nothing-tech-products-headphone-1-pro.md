---
url: https://us.nothing.tech/products/headphone-1-pro
captured: 2026-11-22
type: commerce
sector: consumer electronics
tags: [product-page, dark, object-led, render-hero, pinned-buy-bar, multi-voice-type, mono-labels]
summary: Long dark product page: the object alone on black, a pinned buy bar, renders as the argument.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a display face (NType 82), weight 400, for headlines at 48px/1.0, 40px/1.0 and 24px/1.1; nothing is larger than 48px. A sans (Geist) for copy at 16px/1.3 (31% of the text) and, in the specs, 14px/1.4 (59%). Uppercase mono (Geist Mono) at 12px and 11px for links, labels and buttons. A dot-matrix face (Ndot), uppercase at 20px, for the wordmark and the product name.
- colour: page #181818 under a grid of 1px white dots; the opening screen is a black photograph; #000000 is the ground of seven sections lower down, #040404 of one split band and the footer. Text #ffffff for heads, #d8d9d9 for copy, #9b9d9d in the specs; image tiles #f5f5f5 at 10%; glass panels #3c3c3c at 60% (the buy bar #585a5a at 60%) over a 45px backdrop blur; borders 1px #595a5a; yellow #ffc700 on the promo strip, the saving pill and the chosen thumbnail's 1px ring.
- space: a 12-column grid, 8px gaps, 8px side margins; text columns 469px beside an image and 708px alone; wide blocks 1185px; cards 469px, three across; 144px between sections; scale 8 · 12 · 16 · 20 · 24 · 32 · 40 · 96 · 144.
- shape: 8px on tiles and panels; 4px on buttons, thumbnails and the nav; pills on badges and colour dots; no drop shadows.
- motion: 150ms most often, then 300–500ms, on cubic-bezier(0.4, 0, 0.2, 1), mostly opacity and colour; smooth scrolling; one render drawn on a canvas that comes apart as the page scrolls.

## Structure
- Opening, 900px: a black photograph on the #181818 page, the product side-on at centre, a thumbnail rail on the left edge, no headline. The 708px floating header (a 30px #ffc700 strip over a 54px blurred bar of #3c3c3c at 60%, both 4px radius) shows on this screen only. The 56px buy bar is pinned 8px above the bottom from here to the footer.
- Pinned stage, 1251px, #181818: a 900px stage that holds for the extra 351px. A centred 48px head, one mono link, and a 1185×507 render of the ear cup that has come apart into a row of parts by the time the stage lets go.
- Overview, 1384px, #181818: a 48px head on 469px at the left margin and three image tiles (two 589px, one 469px) staggered right, left and centre, each with a 24px caption and a mono link. Then a 72px glass strip, centred: an icon, one 20px line, a white button.
- Chapter opener, 927px, #181818: a centred 48px head and one 16px line over a photograph of the product being worn, edge to edge. The screenshots stop at 5400px, 290px past this band; every line below comes from the section map alone (sections 07–27).
- Sections 07–09, #181818: two 589px feature rows (a 589px square image and a 469px text column 127px apart, a 40px head over 16px copy), then a 730px card row: a 48px head at the left margin over three 469×605 cards (square tile, 24px title, 16px copy).
- Sections 10–15: a 1105px band on #000000 and a 968px band on #181818, each a centred 48px head with 16px copy and one image; a 712px split on #040404 in two 712px halves; two more 589px feature rows; a 734px band with a 48px head at the left margin.
- Sections 16–21, a run of six with no gaps, 5575px on #000000: four centred openers of 948–1100px, a 777px pair of 708px images with 24px captions, and a 712px band holding a sideways snap row of four 410×422 cards.
- Sections 22–23, #181818: a 713px band with a 48px head at the left margin, then a 286px row of three 469px glass panels (20px icon, 24px title, 16px copy at 80% white).
- Specs, 1326px, #181818: a 48px head, then 14px/1.4 text in #9b9d9d on 708px, in two 346px columns 16px apart.
- Closing, #181818: a 332px band with a sideways row of five 320×244 glass panels; a 721px band of three 469×553 cross-sell panels; a 952px #040404 footer with 40px dot-matrix heads and 11px mono links.

## Components
- **Buy bar**: sticky 8px above the bottom of every screen, 1424×56, #585a5a at 60% over a 45px backdrop blur, rounded corners, 8px padding (16px on the left). Left: the product name in 20px dot-matrix capitals. Right, 32px apart: two underlined mono links to page sections; a hairline divider; the old price struck through in #b1b3b3 beside the new one, both 24px/1.1; a yellow pill with a small icon and the saving in mono; a 40px colour dropdown in #040404 at 70%; a 40px white add-to-bag button with 16px side padding and 4px radius.
- **Thumbnail rail**: on the left edge of the opening screen, seven 64px squares, 8px apart, 4px radius, four in view between two 20px chevrons. One per full-screen photograph; the chosen one carries a 1px #ffc700 border.
- **Pinned render stage**: a 900px block held with `position: sticky; top: 0` inside a 1251px section. 118px top padding, a centred 48px/1.0 head on 704px, 40px below it a 12px uppercase mono link in #d8d9d9 with a 16px chevron, then a 1185×507 image and canvas on the middle ten columns.
- **Feature tile**: an image tile, 8px radius, on #f5f5f5 at 10%; 16px beneath, a 24px/1.1 caption in white, then an underlined 12px uppercase mono link with a chevron. No card surface around the three.

## Phone
- Buy bar: one 56px row → a 374×117 panel with the name and the saving pill on top, a full-width 40px white button carrying both prices and "Buy", and the two section links at the bottom corners. By the third screen the name line has dropped away. The colour dropdown is not in the bar.
- Thumbnails 64 → 50px, still four in view; the photograph is cropped to fill the 844px screen.
- Heads 48 → 32px; captions 24 → 20px/1.2; copy sizes stay. By measurement the 40px sub-heads become 32px.
- Pinned stage 900 → 844px inside a 1213px section; the exploded render turns from a row of parts into a column, 1185×507 → 374×506.
- Staggered tiles → a sideways snap row of 344px cards, 8px apart, the next card showing 30px at the edge. By measurement the card and panel rows further down do the same.
- The glass strip stacks, 72 → 97px: its line (20 → 18px) above, the button full width below.
- Between sections 144 → 96px; grid 12 → 6 columns; the nav becomes a 374×48 bar with three icons.

## Moves
- The first screen is only the object: black ground, the product photographed side-on at centre, small thumbnails down the left edge. No headline.
- The buy bar travels with you. A translucent rounded bar sits 8px from the bottom of every screen: product name, two section links, the old price struck through and the new one, a yellow saving pill, a colour dropdown, a white add-to-bag button.
- Chapter heads are 48px, centred, with one mono link or one small line under them, and then a render or photograph is given most of a screen. Eight sections open this way.
- Exploded views and close-up renders make the argument. Copy is 16px in pale grey, mostly in columns no wider than half the page (469px beside an image, 708px alone).
- Two blacks: the opening photograph is pure black and the page after it #181818, so the first screen reads as a photograph and the rest as a page. By measurement #000000 returns as the ground of one earlier band and the whole six-section run.
- Yellow means money: the promo strip and the saving pill. Its only other use is the ring on the chosen thumbnail.

## Weak spots
- It runs to 26.5 screens, 24.7 on a phone.
- A dark product on a black ground is hard to make out.
- The name and price appear only in the bar, at 20px and 24px, on the first screen.
- The dot grid is drawn above the content, so dots land on photographs and on a white button.
- On a phone the header and buy bar take 207px of the 844px first screen.
