---
url: https://oxide.computer
captured: 2026-11-22
type: landing
sector: infrastructure hardware
tags: [dark, tinted-dark, render-hero, single-weight, mono-labels, square, single-accent]
summary: Blue-black hardware landing: one weight, five greys, terminal green, the rack render as hero.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a grotesque (Suisse Intl) at weight 400 only, and a mono (GT America Mono, 26% of the text) for labels, terminal lines and diagrams. h1 65px/1.0 −0.025em; section heads 50px/1.1 −0.02em; statements 36px/1.17 −0.013em; 25px/1.28; 20px/1.3; 18px/1.33; body 16px/1.38; 14px/1.29; 12px; 11px. Small text is tracked open: 0.021em at 16px, 0.03em at 14px, 0.044em at 11px. Labels are 11–12px mono, uppercase, 0.053–0.058em.
- colour: page #0b0e12; surfaces #181a1d and #303235; text in five levels #dedede / #a3a4a5 / #818284 / #5d5e61 / #434547; borders solid 1px #1f2124, #303235 where they need to show; accent #00d892 on #002923, with #006d4a for unlit cells.
- space: content 1200 of 1440 on 12 columns with 20px gaps; nav and hero 1360 wide with 40px gutters; 128px between sections; scale 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40.
- shape: 1–2px radii, 4px at most (panels and cards); solid 1px rules; no shadows.
- motion: 150ms on cubic-bezier(0.4, 0, 0.2, 1); a 45s linear logo marquee; a 2s status ping; a 0.8s stepped caret blink in the terminal.

## Structure
- Pinned 60px nav: #0b0e12 at 85% over a 12px blur with a 1px #1f2124 rule beneath; green wordmark left, six mono labels centred, two 32px buttons right.
- Hero, 840px: a 396×251 terminal widget top-left, a thin leader line running from it to the rack render, which takes the right half at nearly full height under a "FIG. 1" caption; the 65px h1, 720 wide on two lines, bottom-left; under it a ruled mono label and a marquee of grey customer logos.
- Statement and pictures, 1366px: a 36px three-tone statement 1098 wide; two pictures 529 tall, 387 and 793 wide, 20px apart, the first carrying a small sign-in panel; a 25px paragraph 580 wide with its key words in white; a bracket rule; four vignette columns.
- Two options, 798px: a 36px statement, white then grey; two 560px columns 80px apart, each edged by a column of "#" characters, with a box drawing made of text characters over four 16px lines.
- Platform, 1124px: a 50px head on two lines; #181a1d panels in two 590px columns 20px apart, each with 16px copy and a mock-up, one on a green field.
- Console, 822px: a 50px head, a "FIG. 2" caption and a product console mock-up running off the bottom.
- Below the six captured screens, from measurement only: a 113px newsletter strip; six 387×158 bordered link cards in three columns; a 700 + 500 hardware block; three 387×214 bordered cards; a 182px closing line at 50px with two links; a 549px footer with a 50px grey tagline and mono-labelled link columns.

## Components
- **Button**: 32px tall, 12px side padding, 2px radius, label 12px mono uppercase tracked 0.053em. Primary is #00d892 text on #002923 with no border. Secondary is grey text with a 1px grey border and no fill. No icon, no shadow.
- **Terminal widget** (396×251, #181a1d, 4px radius): a 41px tab bar closed by a 1px #303235 rule, with three 11px mono uppercase tabs; the active tab is #00d892 with a 1px green underline, the others #818284; two #303235 placeholder bars at its right end. Below, 16px padding and 13px mono lines in #bababb that type themselves behind a block caret.
- **Vignette column** (285 wide, four across with 20px gaps): a 12px mono uppercase label ending in ▶; a #181a1d panel holding a fragment of product UI in green on dark, cut off by the panel's right edge; then three 12px lines, lead words in white and the rest grey, divided by 1px #1f2124 rules.
- **Figure caption**: "FIG. 1" in a 1px #303235 box (2px 4px padding, 1px radius), then a title 8px to its right, both 12px mono uppercase in #818284. Used on the render and on the console.

## Phone
- Nav: six labels and two buttons → a 28px bordered menu square at the left and the wordmark centred, in the same pinned 60px bar.
- Hero reorders and grows 840 → 1070px: h1 65px bottom-left → 36px centred at the top; the render (334×397) under it; the terminal widget (352×237) last; then the logos.
- Gutters 40 and 120 → 19px; content 1200 → 352.
- Statement 36 → 18px/1.33; section heads 50 → 25px/1.28. The 25px paragraph keeps its size, so it ends up larger than the statement above it.
- Pictures: two side by side → the wide one only, 352×234.
- Vignettes: four columns → one column of 320×347 blocks 60px apart, between 1px #303235 side rules.
- Page 11 → 16.2 screens.

## Moves
- The hardware is the hero: a render of the racks, green LEDs lit, takes the right half of the first screen; a working-looking terminal widget sits top-left and the 65px headline is pushed to the bottom-left corner.
- One weight. Everything is 400, so hierarchy comes from size and from five greys.
- Statements change tone mid-paragraph: a white claim, a grey elaboration, a white close, all at 36px.
- The accent is borrowed from the object. Terminal green appears on the wordmark, the primary button, the active tab, status chips and the lit cells of the mock-ups, matching the LEDs in the render; there is no second brand colour.
- Square and ruled: near-zero radii, solid 1px rules, mono uppercase labels for nav, buttons, section tags and figure captions.
- Feature vignettes as instrument panels: four narrow columns, each a small green-on-dark diagram over three 12px lines. Elsewhere diagrams are typed rather than drawn: box drawings, cell grids and margin rules made of mono characters.

## Weak spots
- The two lowest greys, #5d5e61 and #434547 on #0b0e12, are about 3:1 and 2:1 and carry a fifth of the text.
- A third of the characters are 12px.
- Mock-up text is smaller still: 11px on desktop and down to 7.5px on a phone.
- On a phone the hero is 1.3 screens tall and the body of the terminal widget, the one moving part, falls below the first screen.

## Owner notes
- 2026-11-25, owner, blind A/B on a developer-tool landing brief: preferred a build based on this entry (blue-black ground, one typeface at one weight, four greys, near-square corners, one amber accent for actions) over the baseline. No reason given.
