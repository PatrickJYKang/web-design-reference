---
url: https://worksinprogress.co
captured: 2026-11-22
type: editorial
sector: magazine
tags: [index, light, illustration-led, ruled, mono-labels, serif-heads, colour-keyed, dense]
summary: Magazine index led by full-width illustration; 28px serif heads, mono labels, solid black rules.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a serif (Editor, regular and bold cuts) for everything you read, a monospace (GT America Mono, light and bold) for everything you use. Feature head 28px/1.14 bold; promo head 24px/1.33 bold; card head 20px/1.3 bold; dek 14px/1.5 on features, 12px/1.5 on cards (69% of all text); mono 14px/1.29 in the header and on features, 12px/1.25 and 11px/1.36 on cards, 16px on buttons. No tracking, no uppercase.
- colour: paper #fff7f4; text and rules #000000 / #121212; four flat keys, one per story: yellow #f4d06f, indigo #363b8f, red #e20a39, sage #cee0dc. White text and white rules on indigo and red. No greys.
- space: content 1360 of 1440 (40px gutters); section padding 40–60px; 100px between spotlight bands, 30–60px around promo strips; working scale 5 · 10 · 15 · 20 · 30 · 40 · 50; 30px inside a caption block, 15px inside a card, 20px between cards.
- shape: radius 0 throughout; no shadows; 1px solid #121212 borders on 876 elements.
- motion: 150ms ease-in-out on hover states; 500ms ease on transforms (the "Read more" arrows, the menu button).

## Structure
- Header, 115px, paper, sticky: an 85px row with the 124×51 mark left and a 37×20 three-line menu button right, then a 30px strip of mono links ruled top and bottom.
- Feature, 815px with 40px above it: a 1360×775 illustration under a yellow bar, caption block in its bottom-left corner.
- Newsletter strip, 134px, between two full-width rules: an 84×68 line drawing, a 24px head over one mono line, and on the right a 399px input beside a 91×36 yellow button.
- Feature, 775px, indigo key, white text.
- Print promo, 384px, between two full-width rules, in three columns 50px apart: a cover photo (225), a 28px head with mono copy and a yellow button (447), nine mono lines behind a vertical rule (588).
- Feature, 775px, red key.
- Spotlight bands, one per issue: a 670px picture-and-caption half that stays put while the other 670px scrolls two columns of cards past it. The first is 1520px tall, the second 2136px.
- Below the sixth screen (measured, not seen): 28 more bands of 904–2576px, four of them round a 1360×785 pinned stage; then a 162px "View all issues" row, a 170px newsletter row and a 332px footer.

## Components
- **Feature** (1360×775, one link): a 10px bar in the story's key colour across the top, the illustration filling the 1360×765 under it, and a 680px caption block in the same colour set flush into the bottom-left corner, 208–229px tall with 30px padding. The block is three rows divided by 1px rules: the head at 28px bold with the byline under it, the dek at 14px/1.5 held to 568px, the topic in 14px mono. Text and rules are black on yellow, white on indigo and red.
- **Spotlight** (two 670px halves, 20px gap): on the left a picture with two square mono chips at its top-left, in line with the caption text (one black with yellow text, then the issue number on yellow with a 1px black border); under it a caption block in a key colour across the full 670px, built like a feature's, with "Read more →" in bold mono at the right of the dek row. The left half sticks under the header; the right half is two columns of cards.
- **Card** (331×288, or 325 wide inside a spotlight; 1px #121212 border, no fill): three cells divided by 1px rules. Head cell 110px, padding 15 15 10: a 20px/1.3 bold head and a 12px mono byline. Dek cell 140px, padding 15: 12px/1.5 serif at the top, "Read more →" in 12px bold mono at the bottom right. Foot cell 26px: the topic in 11px light mono, padded 5px 15px, with a rule on its right and the rest of the strip left empty.
- **Header strip** (30px, 1px rules above and below, 14px light mono): on the left two dropdown words separated by "|", which give way to the issue number and month once that issue's band is on screen. On the right, cells 28px tall with 12px side padding and a rule on their left; the last, "Subscribe", is filled black with paper-coloured text.

## Phone
- Gutters 40 → 16px. The header keeps its 115px and both rows but no longer sticks; the strip drops to 12px mono and keeps only the two dropdowns and the black cell.
- Feature: caption set into the picture → stacked. The bar, a 390×255 picture edge to edge, then the caption block at full width with 16px padding, head 28 → 22px/1.27, and a new 358×42 outlined "Read now" button (1px border, 16px mono) under it. 775 → 541–562px tall.
- Spotlight: side by side → stacked, text first. Chips, head, dek and topic on the key colour, the picture under them inside the gutters, then the cards in one column at 358×288, 20px apart.
- Promo strips stack. The newsletter input and button go full width and the strip grows 134 → 358px; the print promo becomes one bordered box with the cover on top, a full-width button and a single line from the list.
- Card type does not change (20px heads, 12px deks). The page goes from 46 to 102.5 screens, and pictures from 77% of the first screen to 30%.

## Moves
- Illustration is the display type. Pictures cover 77% of the first screen and no headline is set larger than 28px; each head sits in a 680px colour block in the corner of a 1360px image.
- One key colour per story, used twice: the 10px bar over the picture and the fill of its caption block. Colour identifies stories and never decorates chrome, which stays black on paper.
- Rules instead of space or inversion. Solid 1px black lines divide everything, cards are ruled tables rather than padded boxes, and promos sit on the same paper between two full-width rules with square yellow buttons edged in 1px black. The only black fills are the "Subscribe" cell and the "Spotlight" chip.
- Labels are sentence-case light mono, untracked. Bylines follow one formula, "Words by" in light and the name in bold, directly under every head.
- The spotlight stays pinned while two columns of cards scroll past it, so each issue's lead picture holds the screen for the length of its list.

## Weak spots
- Card deks at 12px are small for reading at desktop width, and they are 69% of the page's text; 14px would keep the density.
- `transition: all` on 884 elements. Name the properties.
- The home page runs to 46 screens, and 102.5 on a phone where every card stacks; the back issues belong behind a link.
- Main navigation is behind a three-line button on desktop, and the only h1 is the wordmark.

## Owner notes
- 2026-11-21, owner, blind A/B on a long-read article brief: a build that carried this page's full-width illustration, with the title set into a caption block, lost to a plain article layout that was "more readable / reads more like an article". These moves belong to an index page. (That they don't transfer to an article is Claude's reading of the note.)
