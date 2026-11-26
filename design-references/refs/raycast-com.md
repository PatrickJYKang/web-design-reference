---
url: https://www.raycast.com
captured: 2026-11-22
type: landing
sector: developer tools
tags: [dark, product-led, single-sans, centred, airy, render-hero]
summary: Black, centred product landing: 64px h1 over one abstract render, 20px intros, 224px section gaps.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one sans (Inter, 88% of characters), a mono (Geist Mono) for small technical notes, SF Pro Text on the drawn keyboard keys. h1 64px/1.1 w600, untracked; one 56px/1.17 w400 head and one 32px/1.2 w500 −0.025em head; then 24px/1.6 w500, 20px w500, 18px w400, 16px/1.6 w500, 14px/1.6 w500, 13px/1.8. Small sizes are tracked out, not in: 0.014em at 14px, 0.011em at 18px, 0.01em at 20px, 0.008em at 24px.
- colour: page #07080a; text #ffffff / #9c9c9d / #6a6b6c plus white at 60% and 40%; surfaces white at 2% and 5%; borders 1px white at 10% and 6%; buttons #e6e6e6 with #2f3031 text; accent #ff6363.
- space: content 1204, text column 750; section padding 224px top and bottom; small scale 4 · 8 · 12 · 16 · 20 · 24 · 32.
- shape: 12px on panels, 8px on buttons, 16px on the nav bar, 20px on large cards, 26px on the launcher window, 25% on small app icons, pills on tags.
- motion: 200 / 300 / 400ms, nearly all on one curve, cubic-bezier(0.23, 1, 0.32, 1), across colour, opacity, transform and box-shadow; entrances 0.7s on cubic-bezier(0.215, 0.61, 0.355, 1).

## Structure
- Nav: a fixed rounded bar, 1204×76, 16px below the top edge.
- Hero, 967px: a canvas render of diagonal red bars behind everything; the h1 centred in two lines 370px down; a two-line 18px white sub 32px under it; at the foot a 36px download button, a 12px mono requirement line and two 12px mono text links.
- Product band, 1375px: a centred two-line 20px intro; a 1204×740 framed desktop with the launcher window floating in it and a five-tile switcher on its bottom edge; a centred 16px #6a6b6c caption with a white lead-in.
- Keyboard band, 720px: a 320px statement and a download button at the left, a drawn keyboard at the right. Most keys are faded to the page colour; the lit ones each carry an icon and a short claim.
- Extensions band, 1257px: a two-line intro at the left, a four-tab pill switch at the right; a sideways snap row of 18 cards, three in view; under it a text link at the left and two round arrow buttons at the right.
- Assistant band, 1409px: a coral uppercase mono label, the 32px head and a two-line grey sub, centred, over an app window with a 290px sidebar and a 724px chat pane.
- Not in the screenshots, from the structure map only: quotes under a 20px intro (1,100px), a second keyboard band (1,145px), a band under a 24px head (986px), a two-row strip of 230×129 thumbnails (795px), a 2,734px band under the 56px head with Geist Mono copy, a third keyboard band (1,244px), and a footer of six 147px link columns in 14px (1,276px).

## Components
- **Nav bar** (1204×76): padding 16px 32px, 16px radius, 1px white-at-6% border, a faint white gradient fill, a 1px inset highlight along the top (white at 15%), 5px backdrop blur. Logo left; nine 14px w500 #9c9c9d links, 16px apart; log in and the download button at the right. The button is the page's only filled button style: 36px tall, padding 8px 12px, 8px radius, #e6e6e6, a 16px icon and 14px w500 #2f3031 text, ringed by 2px of black at 50%.
- **Product stage**: an outer frame 1204×740 with 8px padding, black at 44%, 1px white-at-8% border, 19px radius and a soft white glow (0 0 40px 20px at 3%); inside, a 12px-radius desktop picture with a menu bar. Centred on it, the launcher window: 750×475, 26px radius, 30px backdrop blur, shadow 0 16px 48px 8px rgba(0,0,0,.2); a 64px search row with an 18px placeholder at white 40% and a 2px caret; a 285px list beside a detail pane; a 44px foot with 36px pill chips. On the stage's bottom edge, a 332×72 switcher (20px radius, 8px padding and gaps): the active tile 68px with 16px radius, four more at 54px with 12px radius, a 26px label chip above the active one. The stage holds five windows side by side and shows one at a time.
- **Key** (110×110, the escape key 167): 11px radius, a dark gradient face, 15px padding, a 16px/1.15 w500 label (23.8px for named keys), stacked shadows that give a raised edge (0 1.5px 0.5px 2.5px rgba(0,0,0,.4) over a 1px black ring), 12px between keys. A lit key is wider and holds an icon top-left and a white bold word running into a grey phrase.
- **Extension card** (360×536, 20px radius): a gradient tinted to the app's colour, with a 1px inset highlight on the top edge (white at 10%). 24px padding; a 56px icon with 12px radius, the name at 18px/1.15, a 36px square chevron button (8px radius) at the right; 24px lower a two-line 16px/1.6 w500 white description; then a 360×360 illustration. Cards sit 56px apart and snap.

## Phone
- 17.8 screens → 19 (16,041 → 16,033px): almost no shorter, because most bands keep their height.
- h1 64 → 36px/1.1; sub 18 → 14px; intros 20 → 18px/1.6; the 56px head → 32px.
- Section padding 224 → 168px; content 1204 → 342 (24px gutters).
- Nav bar 1204×76 → 358×58 with the logo and a menu icon; the nine links go behind the icon.
- Hero 967 → 615px. The download button and its mono notes go, from the hero and from the nav bar; a 30px announcement pill (#130d0e in a 1px red-brown edge) is the only control.
- Product stage 1204×740 → 409×508, edge to edge without its radius; the launcher fills the width and the 332×72 switcher keeps its size.
- Keyboard: keys stay 110px, so about three columns show; the statement moves under the keys and centres.
- Extension cards 360×536 at 56px apart → 300×446 at 24px, still a snap row, description 16 → 14px; the tab switch drops under the intro and runs off the right edge.
- Footer: six columns → two; 1,276 → 1,619px tall.

## Moves
- Section intros are whispered. A band opens with two 20px/500 lines, white then #6a6b6c, centred or at the left, not a heading. Of twelve bands only three open above 24px: the 64px h1, one 32px head and one 56px head.
- 224px of padding above and below every section, so a quarter to half a screen of black separates one idea from the next.
- One abstract render carries the brand: diagonal red glass bars behind the centred h1, filling 83% of the first screen, and again as the wallpaper inside the product stage. Elsewhere coral (#ff6363) comes only in small doses: the logo, one mono label, a swatch inside the product. Buttons are pale grey, never coral.
- The product is shown in place: a launcher window floating over a dimmed desktop with a soft glow, at full content width, not a cropped screenshot in a card.
- The nav is a bordered, rounded bar inset to the content width, not a full-width strip.

## Weak spots
- #6a6b6c on #07080a is about 3.8:1 and carries 13% of the text, including the second line of every intro.
- The page runs to 17.8 screens with 134 media elements; heavy for a landing page, and a phone gets all of it.
- The extension row shows three of 18 cards and the stage one of five windows; most of both stays unseen without interaction.
- On a phone the keyboard is cropped to its left three columns, and the claim keys on its right side are cut off at the edge.
