---
url: https://teenage.engineering/store/bc-1
captured: 2026-11-22
type: commerce
sector: consumer electronics
tags: [product-page, light, small-type, lowercase, light-weight, minimal-chrome, greyscale]
summary: Three-screen product page: name and price as one 40px light statement, a black add-to-cart bar.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one custom family in two cuts, one for the 40px lines and one for everything below. Four sizes: 39.7px/1.11 for name, price and section heads; 26.4px/1.11 for the button label; 19.1px/1.15 for nearly everything else (83% of characters); 16px/1.5 for the remainder. Weight 300, with weight 100 on the 16px text and the footer row. All lowercase except product codes.
- colour: #f5f5f5 for the product block and tiles, #ffffff for the page beneath; text #000000 on the 40px lines, #0f0e12 on tiles and footer, #4d4d4d for the description; the button #0f0e12, the nav strip black; #0071bb on two text links. No accent.
- space: a 12-column grid. Product block: a 720px picture, 120px, a 480px buy column, 120px. Tile grid 1411px wide with 15px gaps; 66px above and below every block; 33px inside a tile; scale 8 · 15 · 22 · 33 · 66.
- shape: no radii, no shadows, one 1px border on the whole page.
- motion: 150ms and 250ms `ease` on transform and opacity.

## Structure
- Nav, 118px, black, not pinned: wordmark, four pictograms each with a word and three small links, a block of Japanese text, a large logo at the right.
- Product block, 998px, #f5f5f5: a 720px square picture on the left; on the right a 480px column starting 66px down with name, price, shipping note, a 73px button, the description, twelve bullets and two blue links.
- Accessories, 1040px, white, 66px below: a centred 40px head, then eight tiles in two rows of four.
- Related, 559px, white: the same head over one row of four tiles.
- Footer, 96px, white: one row in three parts (327 + 654 + 327) holding a country picker, seven links and the copyright line.

## Components
- **Buy column** (480px wide, a column with 22px gaps): the name at 39.7px/1.11 weight 300 over two lines; the price directly under it at the same size and weight; a 19px shipping note 15px below; a 480×73 bar in #0f0e12 with square corners and a centred 26.4px label in #f5f5f5. Then a 19.1px/1.15 paragraph in #4d4d4d, a plain disc list of twelve 19px lines indented 22px, and two #0071bb text links 8px apart.
- **Product tile** (342×448, #f5f5f5, 33px padding, no border or radius): name and price centred at the top in 19px #0f0e12; a 276px square picture in the middle; the action at the bottom as bare centred 19px text, either "add to cart" or "sold out", 131×19 with a 250ms transform transition. Four across, 15px apart.
- **Section head**: one lowercase word, 39.7px/1.11 weight 300, #000000, centred; 66px of space between the block above and the word, and 66px between the word and the tiles.

## Phone
- The black nav strip is gone. The top is a 72px white band holding only the product name, centred at 14.3px. Navigation moves into the footer, which goes from a 96px white row to an 861px #0f0e12 block: two 21.5px shipping lines, a grey newsletter button, eight ruled link rows with chevrons, the logo, three 10.3px columns.
- Name 39.7 → 14.3px, above the picture; price 39.7 → 28.7px, below it.
- Picture 720 → 354px square with a 9.9px radius. Radii exist only at this width.
- The 480×73 black bar → an 84px yellow (#fab413) square, 9.9px radius, reading "buy" at 28.7px weight 100, to the right of the price.
- Description 19.1 → 14.3px/1.11 in two columns. The bullet list folds into a "details" row, and the two links become 41px rows ruled in 1px #e5e5e5 with chevrons.
- Tiles 4 × 342 → 2 × 173 with 8px gaps, and turn inside out: a 173px square picture on #f5f5f5 with the radius; name and price left-aligned beneath it on white at 14.3px; a 20px plus icon in place of the text action.
- Section heads 39.7 → 28.7px; side gutters 18px; 3.3 → 3.9 screens.

## Moves
- Name and price are one statement: the same size and weight, the price directly under the name. Nothing on the page is larger.
- The buy column is short and ordered: name, price, a shipping note, the add-to-cart bar, then the description and a plain bullet list. The decision is possible without scrolling.
- One product image, shot from above on pale grey. No gallery, no thumbnails.
- Everything is lowercase, in four sizes and two light weights.
- Accessories and related products are tiles, four across: name and price centred at the top, picture in the middle, the action as plain text at the bottom. No borders.
- The page is greyscale. The only colour is in the product photographs and two blue links.

## Weak spots
- Weight 100 is hard to read: the footer row at 19px is hairline-thin.
- The spec list is twelve undifferentiated bullets.
- "add to cart" on the tiles is plain text 19px tall, a small target, and "sold out" looks the same.
- No reviews, no second image, no size or scale reference.
- Desktop and phone are two designs, not one reflowed: a black bar against a yellow square, square corners against 9.9px radii.
