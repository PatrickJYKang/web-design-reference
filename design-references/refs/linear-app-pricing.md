---
url: https://linear.app/pricing
captured: 2026-11-22
type: pricing
sector: developer tools
tags: [dark, single-sans, grey-hierarchy, no-cards, comparison-table, dense, pills]
summary: Near-black pricing page with no cards: four text columns, 17px prices, one solid pill to recommend.
picked-by: agent, pilot placeholder
---

## Tokens
- type: one sans (Inter Variable) at weights 400, 510 and 590. h1 48px/1 w510 −0.022em; closing line 72px/1 w510 −0.022em; plan names 24px/1.33 w590 −0.012em, table heads the same size at w510; prices 17px/1.6 w510; table rows and copy 15px/1.6 −0.011em; notes 14px/1.5 −0.013em; lists and footer 13px/1.5 −0.01em; button labels 13px w510.
- colour: page #08090a; text #f7f8f8 / #d0d6e0 / #8a8f98, with #62666d for footnotes; table rules 1px #202122; white at 5% for the ghost fill and the hairlines inside a plan, white at 8% under the header; solid button #e5e5e6 with #08090a text. One colour, indigo #5e6ad2, on the billing switch only.
- space: content 1344 of 1440 (46px page padding, then 32px inside each column); 80px above the title and 72 below; section padding 56–72px; table grid 448 + 4 × 224; list lines 16px apart; scale 8 · 12 · 16 · 24 · 32.
- shape: pills for every button and the switch; no cards, no boxes, no shadows that read as depth; ghost pills carry a 1px inset ring of white at 3%.
- motion: 100–160ms on cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity and colour; no keyframe animation.

## Structure
- Header, 73px, fixed: translucent dark with a 20px blur and a 1px white-8% line under it; logo left; six links, Log in and a 32px solid pill right.
- Title, 187px: the one word at 48px, left, 80px above and 72 below. Nothing else.
- Plans, 551px: four 336px columns with a 1px vertical rule between them, buttons on one line at the foot.
- Trust: a centred 15px grey line with its number in white, a 40px row of seven white logos spread across the full width, a centred 15px link; then 149px of empty ground.
- Plan-name row, 56px, pinned under the header: "Features" and the four plan names at 24px.
- Comparison table, 3,448px (3.8 screens): groups of rows under 24px heads.
- Button row, 114px: the four plan buttons again under their table columns, 160px wide, the same one solid with a small text link under it. Then a 14px footnote in #62666d.
- Closing line, 228px band: 72px/1, centred, two lines.
- Below the captured screens, measured only: two pills (127 and 144 wide, 12px apart) under the closing line, and a 524px footer of five 224px link columns at 13px.

## Components
- **Plan column** (336×551, 32px side padding, no surface, a 1px rule between neighbours): name 24px/590; under it the price on one line, 17px/510 in #d0d6e0 with its unit in #8a8f98; a 60px strip between two 1px white-5% hairlines holding either a 14px grey note or the billing switch (32×20 pill in #5e6ad2, 14px white knob, 14px grey label); a list of 13px #d0d6e0 lines 16px apart, each with a 16px filled check-circle 8px to its left; a full-width button at the bottom of the column.
- **Pill button**: 40px tall, 14px side padding, 13px/510, 272 wide. Ghost: white at 5%, 1px inset ring, #f7f8f8 text. Solid: #e5e5e6 with #08090a text. The recommended plan gets the solid one, with a ghost second button beside it in the same column. Header version 32px tall, 12px padding.
- **Pinned plan row** (1344×56, sticky at 72px, directly under the header): the table's own grid, 448 + 4 × 224, cells padded 12px 32px, names at 24px/510. Once stuck it shows a hairline under it.
- **Comparison table**: grid 448 + 4 × 224. Group head 24px/510 in #f7f8f8. Rows about 44px apart with no horizontal rules; label 15px/1.6 in #8a8f98. Each plan cell has a 1px #202122 rule on its left running the height of the group, then a 16px filled check-circle, sometimes followed by a 15px value; a missing feature is a small dim ×.

## Phone
- Four columns → one stack, 64px apart, 342 wide (24px gutters). The vertical rules go, and each button follows its own list, so nothing is bottom-aligned.
- Type holds: h1 48px, names 24px, prices 17px, lists 13px. Only the closing line shrinks, 72px/1 → 38px/1.1.
- Buttons 272 → 342 wide, still 40px tall; the recommended pair becomes 2 × 168 with 8px between.
- Header 73 → 65px: logo, Log in, the solid pill and a two-line menu glyph; the six links fold away.
- Table five columns → two: label left, one plan's value right-aligned. The pinned row becomes a 48px plan picker, the plan name at 24px/590 in #62666d with a small up-down chevron.
- Footer five columns → 2 × 171, 16px apart, 524 → 938px. Page 7 → 9.1 screens.

## Moves
- No cards. The four plans are four columns of text on the page ground, divided by faint vertical rules. Nothing is boxed, tinted or raised.
- The recommendation is one button. Every plan gets a ghost pill except one, which gets the solid pill. There is no badge and no highlighted column.
- Prices are small: a 17px figure with its unit in grey, on one line under a 24px plan name. The billing toggle is a 32×20 switch inside each paid column, the only colour on the page.
- Buttons sit at the foot of the columns on a shared line, after the feature lists, so the lists are read first. The same four return under the table.
- The comparison table is a dense grid: a pinned row of plan names, 15px rows about 44px apart, filled check-circles and dim crosses, vertical dividers only, group heads at 24px.
- The title is the single word "Pricing" at 48px, left-aligned, with no subhead. The pitch comes at the bottom of the page, at 72px.

## Weak spots
- Bottom-aligned buttons leave a large empty area under the shorter feature lists: about 145px under the five-line plan.
- Dim crosses and the lowest grey (#62666d) are hard to see on #08090a.
- The plans carry almost no description of who each is for.
- At 390px the table shows one plan at a time, so two plans can't be read side by side.

## Owner notes
- 2026-11-21, owner, blind A/B on a pricing brief: preferred a build with this structure (text columns without cards, small prices, buttons at the foot, one solid button) as "more professional". The other build had "the cleaner graphic". (Which entries the builder read was not recorded; the structure matches this one.)
- 2026-11-25, owner, blind A/B on a pricing brief: again preferred a build based on this entry (plans as text columns split by thin lines, no cards, one solid button, 28px prices) over the baseline. No reason given.
