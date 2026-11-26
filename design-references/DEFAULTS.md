# Agent defaults

Habits that showed up when an agent built a page cold and the reference did something else. Each line reads `default → what the references do instead (refs)`.

This list was measured once, from 25 blind builds on 2026-11-21 and 2026-11-22, and adding an entry no longer adds to it. A line changes only when the owner says so, or when the builds are re-run for a different builder (`npm run cold`). It is capped at 20 lines, because a long list gets skimmed and turns into a house style of its own.

Builder for the 25 cold pages behind this list: claude-opus-5-5 with `eval/baseline.md`. These are that pairing's habits; a different model or prompt may have others.

- A warm cream or warm-grey page (#ebeae4 to #f5f3ee) with near-black text, in all 25 builds whatever the subject → the ground comes from the subject: 9 of 25 references are dark (linear-app, raycast-com, mercury-com, oxide-computer, obsidian-md, wearecollins-com, teenage-engineering, linear-app-pricing, us-nothing-tech-products-headphone-1-pro), 8 are plain white, the rest neutral grey or tinted for a reason (pink paper for worksinprogress-co).
- One orange-red accent (#c4411a to #ff5a1f), often on a single italic word of the headline → no accent at all (linear-app, pentagram-com, press-stripe-com, us-nothing-tech, linear-app-pricing), or one taken from the subject: terminal green (oxide-computer), violet for actions only (obsidian-md), orange as a second ink (teenage-engineering), one colour per article (asteriskmag-com-issues-16-six-gutenberg-revolutions-in-a-row).
- The headline as the hero, at 92–223px (115px or more in 20 of 25) → the largest type is 26–86px in 24 of 25 references; press-stripe-com is the exception. On long-read articles the gap is smaller (titles are 50–86px in the three article references), and the owner preferred a build with a large title to one that tucked the title into a caption block.
- A first screen of type, with the picture as a side panel covering 0–34% of it → an image, render or the product itself covers 77–100% of the first screen in 14 of 25 (stripe-com, mercury-com, oxide-computer, pentagram-com, teenage-engineering, us-nothing-tech, press-stripe-com, posthog-com, linear-app, raycast-com, worksinprogress-co, craigmod-com-essays-electric-bikes, and the two long-slug entries for Noema and the Nothing headphones).
- A display face plus a mono for labels, often with a third family for body → one family doing nearly everything in 13 of 25 (among them linear-app, raycast-com, stripe-com, mercury-com, obsidian-md, pentagram-com, teenage-engineering-store-bc-1); where there are more, each has one strict job (worksinprogress-co, us-nothing-tech).
- A light serif (300) or heavy grotesque (600–900) for display against regular body → one weight for the whole page, with hierarchy from size and grey (stripe-com at 300; oxide-computer, pentagram-com, wearecollins-com, rauno-me at 400), or in-between weights such as 510 and 480 (linear-app, mercury-com).
- Display type tracked at −0.035 to −0.055em → −0.02 to −0.033em at most, and small text often tracked slightly open (raycast-com, oxide-computer, mercury-com).
- Body copy at 15–19px on product, docs, index and shop pages → smaller and denser there: 14px for 88% of the text (tailwindcss-com-docs-installation), 14px and 12px (the Fellow kettle page), 13–15px (linear-app, linear-app-pricing), 12px (worksinprogress-co, mercury-com, oxide-computer).
- 96–160px between sections → set by the page: 32–72px on dense pages (worksinprogress-co, pentagram-com, linear-app-pricing, the Fellow kettle page), 128px and 224px on sparse ones (linear-app, raycast-com), rules instead of padding (stripe-com).
- Sections numbered 01, 02, 03 under uppercase tracked mono labels → no numbering, and labels in sentence case at a small size of the main face (docs-stripe-com, notion-com-pricing, mercury-com, wearecollins-com, worksinprogress-co).
- A full-bleed black band for the testimonial, pitch or manifesto → no inversion; it sits on the page's own ground (worksinprogress-co, notion-com-pricing, rauno-me).
- On a product page, the price in the accent colour or inside the button's label, and reviews or specifications as full-width bands under large headings → a small price beside or under the name, and everything else folded into one narrow column (the Fellow kettle page, teenage-engineering-store-bc-1, the Nothing headphones page).
- Hover transitions on plain `ease` → a named ease-out curve at 100–400ms (linear-app, raycast-com, stripe-com, mercury-com, wearecollins-com, docs-stripe-com).

## Where the default is already right

- Long-read articles: a 20–21px serif body in a column of about 650px. Two of the three article references do the same (Noema at 21px in 649px, craigmod-com-essays-electric-bikes at 20px in 746px), and the owner preferred the plain article layout in a blind A/B. Change the ground, the accent and the title treatment; leave the reading column alone.

## From the owner

Dated notes from blind A/B reviews, quoted. Where one conflicts with a line above, the note wins.

- 2026-11-21, developer-tool landing: preferred the library build for "brighter colours, better scale, sans serif, better animations". It was near-black with one sans, a 58px headline and an amber accent; the other was the cream page with a 107px serif.
- 2026-11-21, long-read article: preferred the baseline, "more readable / reads more like an article". It had a 118px serif title over a centred text column; the library build led with a full-width image and put the title in a caption block.
- 2026-11-21, studio home: preferred the library build's "scale and colour contrast", but it "only really works on a big desktop".
- 2026-11-21, product page: "both not so good". No reason given yet.
- 2026-11-25, second reviewed run, no reasons given. Preferred the archive build on four briefs: long-read article (based on the Asterisk article entry), developer-tool landing (oxide-computer), pricing (linear-app-pricing) and product page (the Fellow kettle entry). Preferred the baseline on the studio home (the archive build followed pentagram-com). The article and product results reverse 2026-11-21, when the archive had no single-article or single-product entries. All five picks were the right-hand page, so read this as a weak signal.
