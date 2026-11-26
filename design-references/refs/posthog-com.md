---
url: https://posthog.com
captured: 2026-11-22
type: landing
sector: developer tools
tags: [light, os-metaphor, playful, chunky-buttons, highlighter, mono-copy, boxed]
summary: Landing page as a desktop OS: wallpaper, icons, a window; 36px h1, highlighter, chunky orange keys.
picked-by: agent, pilot placeholder
---

## Tokens
- type: a rounded sans (RoundHog, 65% of the text) and the system mono (32%). h1 36px/1.11 w800 −0.025em; section heads 30px/1.33 w700 −0.025em; demo head 24px/1.33 w700; step heads 18px/1.56 w600 −0.025em; body 18px/1.5 at weight 500 (17px under the h1); step copy 15px/1.5 w500; lists and chips 14px/1.43 w500–600; mono 15px/1.5 and 11px/1.78 inside the product mocks; one number at 72px/1 w700.
- colour: the window shows pale sage #d3dac6 over a page ground of #eeefe9; panels #fdfdf8, #e5e7e0 and #ffffff; borders 1px #bfc1b7; text #111827 for heads, #374151 and #65675e for copy, black at 35% for mono asides; buttons #eb9d2a on a #cd8407 base, edged 1px #b17816; purple #b62ad9 for the demo frame and its active tab; blue #2f80fa for the big number; the dark mock is #0f0f10 with #26262a lines and #ffc23d dots.
- space: window 1139 of 1440, content 979 inside it (80px window padding); 48–64px between bands; 32px between hero columns, 16–24px inside panels; scale 4 · 8 · 12 · 16 · 20 · 24 · 32.
- shape: 6px on panels and small buttons, 8px on the big buttons, 4px inside the demo frame, 12px on the dark mock, 20px on the logo boxes, pills on chips. Shadows are a hard ledge (0 2.3px 0 #d2d3cc) or one deep float (0 25px 50px −12px, black at 25%) under the mocks.
- motion: 150ms and 200ms on cubic-bezier(0, 0, 0.2, 1) and (0.4, 0, 0.2, 1). The demo tabs advance on a 5s linear progress bar; the tool ticker loops every 45s.

## Structure
- Desktop: an illustrated grass wallpaper edge to edge. A menu bar about 40px tall stays across the top (logo, six labels, a 32px orange button, three icons). Seven labelled icons run down the left edge and six down the right, about 84px apart.
- Window: 1139 wide, centred, rounded, with maximise and close glyphs top-right and its own scrollbar. Everything below scrolls inside it.
- Opening, 298px: the logo, then two 474px columns 32px apart. Left: the h1, a 17px sentence, an 18px grey line. Right: a 448×209 set-up card.
- Demo, 506px: three tabs over a purple-framed panel.
- Ticker, 32px: a 14px label, then tool names at 14px/600 with small coloured icons sliding sideways.
- "Social proof", 477px: 30px head, one 18px line, two logo boxes.
- A 30px head with an orange-marked phrase, then four numbered steps of 727–835px. Each is an 18px head and 15px copy in a 672px measure above a product mock up to 979 wide: a dark chat app overlapped by an event table and a box-plot card; an agent panel over a dock of six app icons; an inbox with a side rail and report rows; a pull-request card.
- Live count, 480px: columns of 305 and 642, 32px apart. Left: the 72px blue number on a pale blue swipe, over a grey caption. Right: five numbered rows of merged pull requests, 71px each, 18px/600 title over a 14px meta line, hairlines between.
- A last 765px band on #e5e7e0 lies below the six captured screens and is not described here.

## Components
- **Desktop shell**: full-screen wallpaper; a menu bar pinned on top, inset 8px; icon-and-label pairs in a column at each edge as navigation; one centred window 1139 wide on #d3dac6 with rounded corners, 80px inner padding and its own scroll. About 70px of wallpaper shows above the window and 30px below.
- **Key button** (203×47, 8px radius, 18px/500 label in #111111): two layers of the same shape, a face sitting a few px above a base so the base shows as a ledge along the bottom; 1px #b17816 border. Primary: face #eb9d2a on base #cd8407. Secondary: white face on base #eb9d2a. Small version 32–35px tall, 6px radius.
- **Tabbed demo frame** (979×506): three equal tabs, 326×40, 14px/600 centred. The active tab is filled #b62ad9 with white text and a 3px white bar that fills over 5s before the next tab takes over; the others are plain grey text. Joined to it below, an 8px #b62ad9 frame around a white panel (963×450, 4px radius, 24px padding) with two columns 32px apart: a 515×400 product mock on #f3f4ee with a 1px #bfc1b7 border, and 368px of text (24px/700 head, two 18px paragraphs, a small key button, a two-column list of product links). A 32×32 pause button sits in the panel's top-right corner.
- **Logo box pair**: two 482×378 boxes 16px apart, #fefef8 at 75% over a 64px backdrop blur, 1px #bfc1b7 border, 20px radius, 16px padding. Each has a centred 14px/700 label and logos 20–48px tall wrapped in centred rows 16px apart. A small round white button sits on the seam between them at the top.

## Phone
- The desktop goes: no wallpaper, icons or window frame. The page fills the screen on the same sage ground with one close glyph left top-right; the menu bar becomes logo with a chevron, the 32px orange button and three icons.
- Content 979 → 358 (16px gutters). Hero two columns → one, centred; h1 36px/1.11 → 30px/1.2 on two lines.
- Set-up card 448 → 358 wide; its two 203px buttons side by side → two 324×47 buttons stacked 8px apart.
- Demo tabs 3 × 326 in a row → 3 × 358 stacked, the active one last so it stays joined to the panel; panel 466 → 741px tall with the mock (310×240) above the text; padding 24 → 16.
- Logo boxes stay side by side, 482 → 175 wide and 16 → 8px apart, logos in one column each; the band grows 477 → 893px.
- Mono in the mocks 15 → 12px; pull-request rows 71 → 96px. Page 7.1 → 9.9 screens.

## Moves
- The site is an operating system. An illustrated wallpaper fills the screen, icons run down both edges, a menu bar sits on top, and the page lives in a window with its own scroll and controls. Navigation is the icons and the menu bar.
- Because the window is the frame, type is small: a 36px h1 and 18px body at weight 500. A page inside a window doesn't need a display size.
- Emphasis is a highlighter, never bold or italic. Body phrases get a flat yellow swipe behind them; in a head the marked words also take the swipe's hue (blue on pale blue, orange on pale orange); one word gets a hand-drawn underline.
- Buttons are chunky and tactile, built like physical keys. Orange is theirs alone; the only other loud colour is the purple demo frame.
- Humour is in the interface itself: a section plainly titled "Social proof", logo boxes labelled "Colorful logos" and "'Sleek' logos", a Trash icon on the desktop. The copy does the branding that decoration would otherwise do.
- Neutrals are a warm grey-green, and content sits in bordered boxes inside the window.

## Weak spots
- The desktop spends 300 of 1440px on wallpaper and icons and has no phone form: at 390px it is dropped for an ordinary single column.
- Scrolling happens inside the window, not the browser: the scrollbar sits 150px in from the screen edge, and about 100px of every screen stays menu bar and wallpaper.
- Black at 35% on the window and panel grounds is under 3:1 and carries 23% of the text.
- Wallpaper, thirteen icons, menu bar and window all compete on the first screen.
- Two of the four step mocks are empty white panels in the capture, one leaving 505px blank: demos that draw themselves leave a hole until they run.
