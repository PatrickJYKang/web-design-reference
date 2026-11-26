---
url: https://asteriskmag.com/issues/16/six-gutenberg-revolutions-in-a-row
captured: 2026-11-22
type: editorial
sector: magazine
tags: [article, light, text-only, colour-keyed, serif-text, minimal-chrome, baseline-grid]
summary: Magazine interview, no hero image: title, authors and dek in one blue at 86px, then 18px serif.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a display serif (Noe Standard) for the title block only: title 86.4px/1.0 at −0.01em, authors at the same size in thin italic (weight 100, −0.02em), dek 33.3px/1.2. A text serif (Noe Text) at 18px on 25px lines for 95% of the page; subheads 21.6px bold. A sans (Atlas Grotesk) at 16.2px for the label (bold capitals) and the sign-up line.
- colour: page #faf8f0; text #000000; one article colour, #2d90cf, for the label, title, authors, dek and progress rail; its tint #abd3ec behind the sign-up box; a pink-red in the ornament only. Lines 1px #000000.
- space: every measure is a multiple of 9: 9 · 18 · 36 · 54 · 90. Text column 750px, centred (345px each side); title block 825px wide, starting 90px further left. 18px between paragraphs; 36px above a subhead and 18px below.
- shape: no radii, no shadows.
- motion: 200ms ease-in-out on nearly everything; a few 250ms fades.

## Structure
- Header, 95px, fixed, no ground: a three-bar menu button (32×24, 2px bars) left and a 50px logo mark right, 36px from the edges. It is on the first screen only; in every later screenshot it is gone and the rail on the left edge has taken over.
- Title block, 366px from y 90: label, two lines of title, two lines of authors, all #2d90cf, with no space between them.
- Dek, a single 40px line, 36px below, same blue, on the text column's left edge.
- Introduction, 404px: three 18px paragraphs, the last in italic.
- Ornament, 343px: a 750×271 drawn flourish with 36px above and below.
- Body, from y 1314: six sections, each a bold subhead and then paragraphs, all on #faf8f0 with no rules or pictures between them.
- Sign-up box, 186px, #abd3ec, between the second and third sections (y 4099).
- The six screenshots cover the first 40% of the page; the end of the piece and the footer are not pictured.

## Components
- **Title block** (825px wide, left edge 90px outside the text column): a stack with no gaps. A 16.2px bold sans label in capitals; the title at 86.4px/1.0; the authors' names at the same size and leading in thin italic, separated by commas, as if they were the title's next lines. All #2d90cf on the page ground. 36px below, the dek at 33.3px/1.2 in the same colour, indented to the text column.
- **Reading column**: 750px, centred. 18px text serif on 25px lines, black, 18px between paragraphs, no indents. Each speaker's name is a bold run-in ending in a colon, full name first time and first name after. Subheads are 21.6px bold in the same face. Links are black with a 1px underline.
- **Progress rail**: fixed to the window's left edge once the page scrolls. Six 1px black ticks, 46px long, at heights proportional to where each subhead falls in the piece; a 32px-wide #2d90cf bar grows down from the top as far as the reader has got, passing the ticks. No labels.
- **Sign-up box**: 750×186, #abd3ec, square corners, 36px inside left and right. One 16.2px sans line, then a row: a 558px field drawn as a 1px black underline with serif placeholder text, an 18px gap, and a 102px button with a 1px black outline and a bold sans label.

## Phone
- Title and authors 86.4 → 50.4px, three lines each; dek 33.3 → 28.8px; subheads 21.6 → 19.8px. Body stays 18px on 25px lines.
- Column 750 → 350px with 20px gutters. The 90px step goes: label, title, dek and text share one left edge.
- Header 95 → 77px, 20px from the edges, same two items.
- Rail: the ticks go and the bar narrows 32 → 10px, inside the left gutter.
- Ornament band 343 → 166px; space above subheads 36 → 20px.
- Page 15.1 → 28 screens.

## Moves
- Colour is the image. There is no hero picture; the title, the authors and the dek are set in one saturated colour and that is the only decoration on the first screen.
- The authors are part of the title: the same 86.4px on the lines directly under it, told apart only by thin italic.
- Stepped left edges. The title block hangs 90px to the left of the dek and the text, so the eye drops from title to dek to body in two steps.
- One text size. Subheads are bold at 21.6px against 18px, and speakers' names are bold run-ins, so nothing interrupts the column: no drop cap, no pull quotes.
- An ornament, not a rule, separates the introduction from the piece: a drawn flourish in a second colour.
- The only navigation aid is the rail: a miniature of the piece on the window's edge that fills with the article colour as it is read.

## Weak spots
- A 750px measure at 18px is about 90 characters a line, long for sustained reading.
- Fifteen screens with three images; 28 screens on a phone.
- The rail's ticks have no labels, so it shows how far along you are but not what is where.

## Owner notes
- 2026-11-25, owner, blind A/B on a long-read article brief: preferred a build based on this entry (the title in one colour hanging left of the reading column, a progress bar on the left edge, no banner image) over the baseline. No reason given.
