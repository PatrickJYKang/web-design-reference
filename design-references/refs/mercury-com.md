---
url: https://mercury.com
captured: 2026-11-22
type: landing
sector: fintech
tags: [dark, tinted-dark, photo-hero, centred, single-sans, pills, narrow-measure]
summary: Tinted-dark banking landing: full-bleed scene as hero, 49px centred head, pills, 1024px column.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one custom family in a text and a display cut (Arcadia). Display at weight 480: 65px/1.1, 49px/1.1 (h1), 42px/1.15, 32px/1.15, 28px/1.2, 24px/1.2, tracked slightly open below 49px (0.01–0.02em); the 28px quote is 360. Body 21px and 18px/1.35 at weight 360, 16px/1.4 at 400, 12px/1.4 at 0.02em. Buttons 14–16px at weight 420.
- colour: dark ground #171721 (indigo-charcoal, 57% of the page), surfaces #1e1e2a and #272735; text #ededf3 and #c3c3cc; action #5266eb with white text; translucent fill #afb4cd at 20%; borders 1px #afb1cd at 36% and #727292 at 22%. The light part (41%) measures #ffffff and shows as warm off-white, then a cooler white, in the shots; its dark text colours are not in the files.
- space: content 1024 of 1440, on a 16-column grid with 32px gaps and 32px page padding; text blocks 672 and 562; section padding 72 and 128; scale 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 72 · 128.
- shape: pills for buttons, the email field and nav links; 12px on cards, media and notes; 4px on tag chips; no shadows; a 20px backdrop blur behind translucent pills and the pinned note.
- motion: colour over 300ms on cubic-bezier(0, 0, 0.2, 1) and 150ms on cubic-bezier(0.4, 0, 0.2, 1); entrances rise and fade over 0.67s with a slight overshoot, cubic-bezier(0.28, 1.1, 0.74, 1). The hero scene and the feature panels are video.

## Structure
- Pinned 72px nav with no ground of its own: logo left, six 14px labels in a 631px centre group, then a text link and two 32px pills at the right. It turns dark-on-light when the page does.
- Hero, 900px (one screen), #171721 under the scene: image and video full-bleed, a black gradient fading out over the top half; a centred 672px block with the 49px h1, two lines at 21px, and a 562×48 row made of a 411px email field with the primary pill inside it and a 143px translucent pill. A 950×41 legal note is pinned 32px above the bottom edge.
- Feature accordion, 972px, #171721: statement, rule, four items and a text link in a 496px column on the left, a product video on the right.
- The next eleven bands (7,620px) have no ground of their own and measure #ffffff. In the shots the page stays dark through the proof head, turns warm off-white while the customer card is on screen, and is a cooler white from the second accordion on.
- Proof, 393px then 668px: a 42px centred head on three lines over one row of white logos 56px apart, fading out at both edges; then the 1024×512 customer card with a three-segment progress bar (3 × 163px) under it.
- Features, 1130px: a hairline, a 32px head at the left on two lines, a 1024×920 grid of four tiles, 2 × 496 with 32px gaps.
- Quote, 338px: 28px/1.2 at weight 360, centred across 808px, name and role beneath; no card, rule or portrait.
- Accordion, 732px: a 24px head and three items in the left 496px, 496×620 media on the right. Then its mirror, 712px: 480×600 media on the left, a 24px head on the right (only its top is in the shots).
- Not seen in a shot, from measurement: a second tile grid under a 32px head (1045px, 2 × 496 in two rows); four centred statistics at 65px, 256px each (449px); three 320×533 tiles (744px); three press items 320 wide under a 32px head (621px); a closing band with a centred 42px head over two 496px columns (787px); then on #171721 a 917px footer of link columns, 4 × 226 in two rows, and 1225px of 12px footnotes.

## Components
- **Pills**: every button is a pill at weight 420. In the nav 32px tall, 16px side padding, 14px; in the page 40px tall, 20px side padding, 16px. Primary #5266eb with white text. Secondary #afb4cd at 20% with a 1px #afb1cd border at 36%, #ededf3 text and a 20px backdrop blur, so the scene shows through. Colour eases over 300ms.
- **Feature accordion**: a 496px left column. A 24px/1.2 statement on two lines, then a list opened by a 1px light rule. Items are 35px rows of 16px text divided by hairlines; the open one has a small dot hung in the margin beside its title and three lines of 16px/1.4 grey copy under it. An underlined 16px text link sits under the list. On the right, a video that swaps with the open item; in the light bands it is 496×620 with 12px radius.
- **Customer card** (1024×512, 12px radius): a photograph fills it. A 376px column inside 32px padding carries a sector chip at the top (16px weight 420 on #1e1e2a, 8px padding, 4px radius) and at the bottom a quote at 21px/1.2 weight 480, the name at 21px weight 480 and the role at 21px weight 360 in #c3c3cc. Three cards share the slot; a three-segment bar under it marks which is showing.
- **Feature tile** (496 wide): an image or looping clip 496×331 with 12px radius, then a title at 18px/1.35 weight 480 and copy at 18px/1.35 weight 360 directly under it with no gap. Two per row, 32px apart. A clip carries a 40px round translucent pause button in its bottom-left corner.

## Phone
- Nav: labels and pills → logo and a three-bar menu icon in the same pinned 72px bar.
- Hero stays one full screen (844px). h1 49 → 28px; the email field takes a full 342px row with two 167px pills side by side under it.
- Page padding 32 → 24px; column 1024 → 342; grid 16 columns → 12.
- Accordion 972 → 887px, two columns → one: a 390×201 product image above the statement (24 → 21px), and the video inside the open item, under its copy (16 → 14px).
- Proof head 42 → 28px on four lines. Customer card 1024×512 → 342×608 (portrait), padding 32 → 24px, quote 21 → 18px, name and role 21 → 16px, chip 16 → 14px.
- Features: head 32 → 24px; tiles 2 × 496 → one column, images 496×331 → 342×228, gap 32 → 16px, text 18 → 14px.
- Legal note 950×41 at 12px → 342×66 at 10px, pinned 24px from the bottom. All 12px small print becomes 10px.
- Below the phone shots, from measurement: quote 28 → 21px, 24px heads → 21px, statistics 65 → 36px, footer link columns four → two. Page 12.9 → 17.9 screens.

## Moves
- A place, not a product. The hero is one atmospheric scene (a desk on a misty ridge at dusk) filling the whole first screen. The headline is only 49px and sits in the sky with an inline email field and two pills. No product UI until the second screen.
- The dark is tinted. Ground, text greys and borders all lean indigo and the action colour is a soft periwinkle, so nothing in the dark part is neutral grey, and text is #ededf3 rather than white.
- The ground changes after about three screens: tinted dark for the pitch and the proof, off-white for the features, and the pinned nav changes with it.
- In-between weights from a variable family: 480 for display, 360 for body, 420 for buttons. Nothing is bold.
- A narrow column. Everything sits in 1024px inside 1440, so the margins frame the content.
- Proof is a face: a row of white customer logos, then a photograph of a named customer in a 12px-radius card, tagged by sector.

## Weak spots
- Almost half the characters on the page (49%) are 12px footnotes and legal copy, which is heavy for a landing page; on a phone they are 10px.
- The hero says nothing about what the product does; it relies on the line beneath it.
- The nav holds 59 links behind six labels.
- A legal note stays pinned over the bottom of the hero scene; on a phone it is three lines and 66px tall.
