---
url: https://obsidian.md
captured: 2026-11-22
type: landing
sector: productivity software
tags: [dark, product-led, system-font, plain, single-accent]
summary: Plain near-black app landing: system font, 60px heads, the real app UI, one violet for actions.
picked-by: agent, pilot placeholder
---

## Tokens
- type: the system UI stack and nothing else; no webfont is loaded. h1 and every section head 60px/1.0 w600 −0.02em; hero sub 36px/1.11 w400; claims and section intros 24px/1.33; card text 20px/1.25; lists 18px; support 14–16px. Weight 600 on heads and card titles, 500 on claim lines and the button, 400 on everything else.
- colour: page #0f0f0f; surfaces stepped #171717 → #1f1f1f → #262626, app window #1e1e1e; text #eeeeee / #bcbcbc / #b3b3b3; borders solid #262626, #363636, #404040; action #7c3aed; links and line icons #a78bfa.
- space: content 1120 of 1440; section padding 96px (128 for the largest breaks, 64 for the smallest); scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 96.
- shape: 12px on cards, 8px on the main button and the app window, 4px on small controls, pills on tags and toggles, 20% on the icon tile; no decorative shadows, only a 1px inset ring of white at 5% on cards.
- motion: 150ms on cubic-bezier(0.4, 0, 0.2, 1), colour properties only.

## Structure
- Nav, fixed, 90px with no fill at the top of the page: a 126px logo with five 14px links beside it, then a language button and two more links at the right, all inside the 1120 column. Once the page scrolls it is about 60px, filled, with a hairline under it.
- Hero, 1037px: 96px of padding, then the h1 on one line, the 36px sub in two lines (576px wide), and a 60px violet button with a violet text link beside it, all at the left edge. Under them the app window, cut by the fold, with a phone overlapping its right corner out to the column edge.
- Claims, 638px: three 24px claims in a 528px column on the left; a 256px icon tile, the wordmark and a centred two-line note ending in a violet link on the right.
- "Spark ideas", 1542px: the 60px head and a 24px paragraph, indented from the column edge, over four feature cards in two rows, 24px apart.
- "Sync securely", 736px: two 544px columns, 32px apart. Left, the head and a list of three icon-led 18px lines, one on a lighter rounded ground. Right, a #a78bfa panel holding a white card of sharing rows: the only light surface on the page.
- "Publish instantly", 1216px: the head, a 24px line with a violet link, three 341px columns 48px apart (24px line icon, 20px/1.4 w600 title, 18px/1.33 grey text), then a wide picture of a docs site that fades into the page, with a one-line centred caption.
- Not in the screenshots, from the structure map only: a centred 60px closing head over three 357×156 link cards (708px), and a 620px footer with three 171px link columns in 16px.

## Components
- **Primary button**: 264×60, padding 16px 24px, 8px radius, #7c3aed with white 20px/1.4 w500 text and a 1px inset ring of white at 10%. A plain 18px w500 #a78bfa text link sits 24px to its right. Colour changes over 150ms.
- **App window** (963×589): built from boxes and text, not a picture. #1e1e1e, 1px #363636 border, 8px radius. A 38px #262626 title strip split by #363636 rules: a 200px sidebar head with three 12px traffic dots and small icon buttons, then two tab groups. Tabs are 32px tall with 6px radius and 13px text, the active one #1e1e1e with #dadada text, the rest #666666. Below, a file tree, a note and a graph view side by side.
- **Claim list**: three blocks 16px apart, each a 24px/1.33 w500 #eeeeee line directly over a 24px/1.33 w400 #bcbcbc sentence; the second and third have 16px padding and a 1px #262626 rule above.
- **Feature card** (548×543): #1f1f1f, 12px radius, 1px inset ring of white at 5%. 24px padding around a 24px/1.33 w600 title and 20px/1.25 #bcbcbc text. Under it a demo panel (#171717, 12px radius, 1px #262626 on its top and left edges only) starts 48px in from the left and runs off the card's right and bottom edges. Inside, a fragment of the app at 16px/1.5: linked text with a 250px suggestion menu (#262626, 1px #404040, 8px radius), a graph, a canvas, or 81px rows with 42×22 pill toggles in #8b5cf6.

## Phone
- 7.4 screens → 10.8 (6,683 → 9,101px): the page gets longer, since every pair of columns stacks.
- h1 60px/1.0 on one line → 50.7px/1.1 on two, centred; hero sub 36 → 30px, centred; section heads 60 → 44px/1.1, still at the left.
- Gutters 160 → about 20px (content 351 of 390); section padding 96 → 64px.
- The button stays 264×60 and centres; the text link beside it goes.
- App window 963×589 → 771×472, not reflowed: it hangs off the left edge, so only its right part and the phone show.
- Claims 24px/1.33 → 20px/1.4; the icon tile 256 → 192px, moved under them.
- Feature cards two across → one column of 351×601; titles 24 → 18px, text 20 → 18px, demo text 16 → 14px.
- Nav 90 → 60px: logo, language button and a menu icon. Footer three columns → two; 620 → 1,158px tall.

## Moves
- No webfont. The system stack carries the whole page. Five 60px heads at weight 600 are the only loud type; under them come a 36px hero sub and text at 14–24px.
- The real app is the picture, left in its own colours: the product's dark UI, 963px wide under a left-aligned hero, with a phone overlapping its corner. Later cards embed working-looking fragments of it.
- One violet on solid greys. A 60px-tall #7c3aed button is the single saturated object on the first screen; the lighter #a78bfa marks links, line icons and one panel. Surfaces and borders are stepped solid greys, with no glow and no blur.
- Claims are plain: a 24px line in white followed by a grey sentence at the same size, stacked with hairlines beside the app icon and a "Free without limits" line.
- It is short: 7.4 screens.

## Weak spots
- Little here is ownable: radii, timing and greys are framework defaults. The restraint works because the app rendering is strong.
- The fixed nav is 90px tall at the top of the page, a tenth of the screen for one row of 14px links; the capture counts 39 links in it, of which seven show.
- The canvas demo sets its text at 6px, 10% of the page's characters: it reads as texture, not content.
- On a phone the app window is not adapted: it stays 771px wide with most of it off screen, and the page grows from 7.4 to 10.8 screens.
