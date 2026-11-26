---
url: https://press.stripe.com
captured: 2026-11-22
type: commerce
sector: publishing
tags: [index, object-led, render-hero, serif-display, mono-labels, full-bleed, colour-shifting]
summary: Book catalogue: one rendered book per screen on a painting, titles in a sliding 52px serif ribbon.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a display serif (Cardinal Fruit) for titles, 52.6px/1.12 w500 −0.03em, and 137.5px/1.0 w300 −0.03em for one section head; a second serif (Ivar Headline) at 35px/1.12 −0.03em; a sans (Suisse) at 14–18px/1.45–1.5 for copy; a mono (Suisse Mono) for all chrome: 17px for the wordmark, 11px uppercase for labels, 12px uppercase −0.055em for the two book actions. No h1.
- colour: no fixed ground. The page starts at #e2e9f0 and re-tints for each book (pale blue-grey, aubergine, taupe and olive in the captured screens), then turns #191715 for the multimedia section. Text follows: ink #1c1b19 on light (78% for the superscripts), #f7f7ef on dark, yellow on the olive screens. Hairlines 1px ink at 52%. No accent colour.
- space: content 1408 of 1440 (16px gutters); small scale 4 · 8 · 12 · 16 · 20; 72px between ribbon titles.
- shape: 8px radius on the image and video panels; controls are bare text; no shadows.
- motion: 400–560ms on transform and opacity (`ease`, `ease-in-out`) for moving between books; a 1.6s entrance.

## Structure
- The whole page is one fixed 1440×900 stage. 6708px of scroll (7.5 screens) changes what the stage shows; nothing travels up the page.
- Top edge, fixed: the wordmark left, the cart and a country switch right, over a 1px rule across the content width. Under the rule, a bracketed 11px label naming the current chapter, and a 17px ring at the far right.
- Title ribbon, fixed 70px down, 91px tall: every title on one line.
- Panel, 1408×714, 162px down: a painting with the rendered book over it. Screens one to four are one featured book each, and the page tint changes with every one.
- Bottom edge, fixed at 872px: the current title in mono on the left, two text actions on the right.
- Screen five, labelled as the full catalogue: the panel and painting go and every book stands as a spine in one row across the window. The ribbon and bottom row stay.
- Screen six, the multimedia section, on #191715: the 137.5px head top-left, an 18px/1.45 paragraph held to 562px, and a sideways row of 8px-radius video panels that runs off the right edge.
- The last screen and a half (film details, footer) is outside the captured shots.

## Components
- **Title ribbon**: one row fixed 70px from the top, 91px tall with 20px padding, holding all the titles at 52.6px/1.12 w500 −0.03em, 72px apart, running off both edges. The current title is upright in full ink; the others are italic and faded. Each carries "(Hardcover)" at 11px in ink at 78%, raised to cap height at its right. Scrolling slides the row sideways to the next title.
- **Book stage**: a 1408×714 panel with 8px radius, 162px below the top and 16px from the other three edges. A painting fills it; a rendered hardcover, tilted and nearly as tall as the panel, floats at its centre with a soft shadow; a small magnifier icon sits in the panel's top-right corner. Scrolling swaps book, painting, page tint and text colour together.
- **Bracketed chrome**: every control is uppercase mono text with no fill or border, in the current screen's text colour. Top-left the 17px wordmark; under the rule an 11px label in square brackets; top-right "[ CART 0 ]" and a two-letter country switch at 11px; bottom-left "[▸]" and the current title at 11px; bottom-right "OPEN BOOK [+]" and "VIEW DETAILS [+]" at 12px, split by a hairline.
- **Spine shelf**: every book as a rendered spine standing upright in one row the width of the window, running off both edges, with no panel behind it. The current book stands forward, taller than its neighbours, and turns its cover to face; its title is the upright one in the ribbon. Drawn in canvas, so not measured.

## Phone
- Same fixed stage, nothing stacks: a 390×844 window over 6422px of scroll (7.6 screens).
- Panel 1408×714 landscape → 358×663 portrait, 140px down instead of 162; gutters stay 16px. The book fills the panel's width, so the painting shows mostly above and below it.
- Ribbon titles 52.6 → 44.2px (−0.036em), 72 → 30px apart, and the "(Hardcover)" superscripts go; one title is in view instead of three or four.
- Section head 137.5 → 64px; second serif 35 → 24px; copy 17–18 → 15px.
- Chrome keeps its sizes (17px wordmark, 11px labels). The bottom row shows only the current title; the two book actions are not in the phone shots.

## Moves
- One object per screen. Each book is a rendered hardcover, tilted, floating over a painting chosen to suit its cover, and the catalogue is a sequence of these with 16px gutters and no text column. Media covers the whole first screen.
- The ground changes with the object: page tint and text colour change for each book, so every screen has its own palette and the site has none. All colour comes from the books and paintings.
- No slogan and no h1. The book titles are the only display type in the catalogue: one ribbon at 52px, the current title upright, its neighbours italic and faded.
- Chrome is bracketed mono: two lines of small text and a cart at the top, two text actions at the bottom, tucked against the edges.
- Scroll turns pages instead of moving the page. The stage is fixed and each change takes 400–560ms, several times longer than an interface hover.

## Weak spots
- One book per screen makes the catalogue slow to scan. The only overview is the spine shelf at screen five, where the titles read sideways.
- Every control is 11–12px mono: small targets. The faded neighbouring titles are low contrast, and on the darker tints so is the chrome.
- It depends on expensive assets: a render and a matched painting per book.
- Everything is drawn into one fixed stage, much of it in canvas, and there is no h1.
