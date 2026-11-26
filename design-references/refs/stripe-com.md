---
url: https://stripe.com
captured: 2026-11-22
type: landing
sector: fintech
tags: [light, single-sans, light-weight, gradient-fields, bento, drawn-grid, product-led]
summary: White fintech landing: one grotesque at weight 300, navy and slate text, gradients, a drawn grid.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one sans (Söhne, variable) at weight 300 for 97% of the text, headings included; 400 only on buttons and nav labels; a mono only inside mock-ups. 56px/1.03 −0.025em; h1 48px/1.15 −0.02em; section intros 32px/1.1 −0.02em; 26px/1.12 and 22px/1.1 at −0.01em; 18px/1.4; body 16px/1.4; 14px/1.4 and 12px/1.45 for support.
- colour: page #ffffff; headings #061b31 (navy); body #50617a and #64748d (slate); action #533afd (indigo); hairline #e5edf5; tinted grounds #f8fafd; announcement bar #0d1738. Illustration spectrum: violet #7f7dfc, magenta #f44bcc, orange.
- space: content 1232 of 1440 on 12 columns with 16px gaps, between rules 1266px apart; cards 16px apart; 80 or 96px above and below a band where it is padded at all; small scale 4 · 8 · 12 · 16 · 20 · 24 · 32 · 64.
- shape: 4px (buttons, controls) and 6px (cards, media) radii only; 1px #e5edf5 borders; shadows tinted with the text navy, tight and offset down: rgba(3,3,39,.25) 0 14px 21px −14px over rgba(0,0,0,.1) 0 8px 17px −8px.
- motion: 300ms on cubic-bezier(0.25, 1, 0.5, 1) for colour, background and opacity; 800ms on cubic-bezier(0.165, 0.84, 0.44, 1) for larger moves; 240ms on nav labels.

## Structure
- 36px #0d1738 announcement bar: one centred 14px white line with a link and a close mark.
- 76px white header, not pinned: logo, five 14px labels, then a white and a filled 40px button at the right.
- Hero, 685px: a gradient ribbon sweeps down from the top right behind the text; a 14px counter line, the 48px two-tone h1 on four lines across columns 2–11 (1024px), two 48px buttons; closed by a 73px strip of customer logos.
- Section intro, 106px: a 32px two-tone statement at the left edge. The same intro opens each later group.
- Bento, 1834px: three rows of bordered cards 16px apart: 816 + 400, three of 400, one of 1232.
- Event banner, 560px: a content-wide photo panel 400px tall with 80px above and below; a 48px/1.03 white heading top-left over a white button.
- Stats, 977px: a centred 56px heading on two lines; a ruled row of four 304px stats, one in navy and three in grey; a burst of fine lines on a blue and orange glow fills the rest.
- Customer group, 1388px: a 26px head and a 48px button on the left 504px, an 18px paragraph on the right 504px; then a story row (40px logo, 22px title, outlined button at the far right) over a 1232×531 photo.
- Below the six captured screens, from measurement only: a sideways shelf of eight 332×552 story cards; a second group ending in four sideways quotes; about 2,150px set in white and #839bc8 text; news (1788px); a 379px #f8fafd closing band of two 608px columns; a 1299px #f8fafd footer of four 296px columns divided by rules.

## Components
- **Two-tone statement**: one heading at one size and weight (32px/1.1, 300, −0.02em) in an 856px column, left-aligned at the content edge. The first sentence is #061b31; the rest runs on in #64748d in the same paragraph. No eyebrow, no button, nothing beside it. The h1 is the same thing at 48px/1.15.
- **Bento card** (816, 400 or 1232 wide): white, 1px #e5edf5 border, 6px radius. Title top-left at 26px/1.12; a small tinted square with an expand icon top-right; below, the product's own UI rebuilt in HTML (labels down to 9–10px) on a gradient field, cut off by the card's bottom or right edge. The whole card is one button.
- **Buttons**: 48px tall, 16px 24px padding, 4px radius, 16px weight 400, a 5×8 chevron 8px after the label. Primary #533afd with white text; secondary white at 65% with a 1px #b9b9f9 border and indigo text. In the header 40px tall, 20px side padding, 14px. Background eases over 300ms.
- **Logo strip**: 73px tall, a 1px #e5edf5 rule above and below, running between the two vertical rules. One row of logos about 142×34 in their own colours on a 172px pitch, clipped at both ends.

## Phone
- Header: five labels and two buttons → logo and a 40px square menu button, 66px tall. The announcement bar wraps to three lines, 36 → 67px.
- Hero 685 → 484px: h1 48px/1.15 on four lines → 34px/1.03 on two, with the slate half of the sentence dropped; buttons 48 → 44px tall, full width, stacked.
- Gutters 104 → 16px (content 1232 → 358). The vertical rules go; the horizontal ones stay.
- Section intros 32px/1.1 → 22px/1.2; card titles 26 → 20px/1.2.
- Bento: three rows → one column of six 358×525 cards, 16px apart.
- Logo strip stays one clipped row, 73 → 65px. Page 16.8 → 24.7 screens.

## Moves
- One weight. Light (300) carries headings and body alike, so hierarchy comes from size and from navy against slate, never from bold.
- Two-tone statements: the claim in navy, then the explanation continuing in slate in the same size and paragraph. Used for the h1 and every section intro, always left-aligned with the right of the row left empty.
- The grid is drawn. 1px #e5edf5 vertical rules at the content edges run the full height of the page and horizontal rules close each band, so logos and cards sit in visible cells. Rules, not padding, separate most bands.
- Colour lives in gradient fields, not in chrome. An orange-to-violet ribbon covers the first screen behind the text, and the same spectrum sits behind each product mock-up. Chrome stays white, navy and one indigo, which is used for every action.
- Products appear as working UI built in HTML, not screenshots, each bleeding off its card's edge.
- Customer logos are shown in their own colours, in a ruled strip directly under the hero.

## Weak spots
- Weight 300 at 16px in slate is thin on low-density screens; #64748d on white is about 4.7:1, with little to spare.
- Three of the four stats rest in #7d8ba4 at weight 300, about 3.4:1 on white.
- Text inside the mock-ups goes down to 9–10px (about 7px on a phone) and is texture, not content.
- The h1 is four lines of running copy; a long sentence makes a weak document heading.
- The page is long: 16.8 screens at 1440px, 24.7 on a phone.
