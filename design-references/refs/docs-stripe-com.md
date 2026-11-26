---
url: https://docs.stripe.com
captured: 2026-11-22
type: docs
sector: fintech
tags: [light, system-font, link-led, dense, narrow-measure, code-panel]
summary: Docs home in 2.7 screens: system font, 32px h1, one link colour, three-column link lists.
picked-by: agent, pilot placeholder
---

## Tokens
- type: the system UI stack plus Menlo for code (21% of the text); no webfont. h1 32px/1.25 w700; hero sub 24px/1.17 w400; section heads 21px w700; product links 16px/1.5 w600; quick links 16px/1.63 w400; labels and descriptions 14px/1.43; code 13px/1.46.
- colour: page #ffffff; headings #414552 (slate, not black); body #1a2c44, secondary #697386; links and the primary button #5469d4; pale panels #f7fafc and #f4f7fa; hairlines #d4dee9 and #ecf1f6; code panel #2a2f45 with #85d996 strings.
- space: one centred column of 1008 in 1440; 16px between columns, 24px between the two panels; scale 4 · 8 · 12 · 16 · 20 · 24 · 48. A link with its description is 44px tall, rows 16px apart.
- shape: 8px radius on header fields and buttons, 4px on the hero button, 6–7px on the hero's two small cards. Edges are 1px rings; drop shadows only on the hero note card (0 7px 14px at 8%, 0 3px 6px at 12%) and under the code panel.
- motion: 100–240ms, mostly on cubic-bezier(0, 0, 0.4, 1); colour, box-shadow and background only.

## Structure
- Header, 112px, pale grey-blue, two rows: logo, a centred search field with an "Ask AI" button, account links; then nine 14px section links with two dropdowns at the right. It stays in place while the page scrolls.
- Hero, 144px, white: h1, sub and two actions on the left; a note card over a tilted test-card drawing on the right; a field of small coloured dots fading in from the top-left behind them.
- Quick links, 130px: three 325px columns, 16px apart, each a 21px head over three plain links in 26px rows.
- "Try it out", 466px: a 21px head, then a 333px task list beside a 651px code panel.
- "Browse by product", 1098px: seven labelled groups of links in three columns, about 150px for a group of six.
- Footer: a hairline, five 14px help lines with small icons, one credit line. No link directory.

## Components
- **Link group**: a 14px/1.43 label in #414552, 8px of space, a 1px #d4dee9 rule across the full 1008, then a three-column grid with 16px gaps. Each cell is one 325×44 link: the name at 16px/1.5 w600 in #5469d4 over one 14px/1.43 line in #1a2c44. No icon, border or box.
- **Try-it-out pair**: a 333px list and a 651px panel, 24px apart. The list is seven text buttons on a pale rounded panel; the selected one sits on a white pill in the link colour. The panel is #2a2f45 with rounded corners: one command line in white Menlo 13px/1.46 with a copy icon, the response beneath it dimmed, strings in #85d996. It shows the command for the selected task. A white strip along its bottom edge invites sign-in, and one right-aligned link sits under the panel.
- **Hero**: h1 and sub 16px apart, then a row with 24px between a 212×36 button (#5469d4, 4px radius, white 16px w500 label and a chevron) and a 16px w500 #3c4257 text link with a dashed underline. Opposite, a 308×68 note card (white at 85%, 1px #c1c9d2, 7px radius, 4px backdrop blur, 14px text with inline links) overlapping a tilted 208×146 card drawing (1px #7d8ba4, 6px radius).
- **Header controls**: the search field and "Ask AI" are 32px tall, white, 8px radius, 14px text; the field carries a "/" key hint. "Sign in" is a 28px white button, 6px radius, 14px w600; "Create account" is a plain link in the link colour.

## Phone
- Header 112px in two rows → one 64px sticky bar: a menu icon with "Home" (16px w500) on the left, the two account links (14px w600) on the right. Search and "Ask AI" leave the bar.
- Column 1008 → 342 with 24px gutters.
- Hero: h1 stays 32px; sub 24 → 21px/1.33 on two lines; the text link, note card and card drawing go; the dot field stays, 400px tall.
- The quick-link columns and "Try it out" are dropped: "Browse by product" follows the hero directly.
- Link groups 3 columns → 1; a group of six grows from 150 to 390px. Page 2449 → 2790px.

## Moves
- Links are the content. A quarter of all characters are 16px/600 links in one blue-violet, so anything that colour is clickable and anything slate or grey is explanation. No other colour competes.
- Headings stay small: a 32px h1 and 21px section heads, in slate. The search field in the top bar is as prominent as the h1.
- The index is definition lists, not cards: a sentence-case label over a hairline, then three columns of link plus one 14px line of description. No icons, borders or boxes.
- "Try it out" pairs a list of tasks on a pale panel with a dark code panel beside it. That panel is the only dark object on the page.
- One decorative gesture: the dot field bleeding in behind the hero, with a small test-card illustration opposite.
- The whole home page is 2.7 screens.

## Weak spots
- Two stacked navigation rows, 112px, sit above any content and never scroll away.
- Product names are the only way in; a newcomer who doesn't know what "Radar" is has to read every description.
- A phone loses the task links and the live command, the two parts that help a newcomer most.
