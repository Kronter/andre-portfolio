# Writing update — 19 November 2026

The original TCG introduction is the style reference: personal framing, quick
notes, inline sidenotes, violet emphasis and purple inset reflections. Existing
articles keep their factual accounts and distinguish hypothetical examples and
planned tests from reported observations. The new Part 14 uses the author's full
supplied text, adding formatting and a quick note without resolving open Aura
timing or claiming the proposed comparisons have happened.

Displayed article dates are editorial dates chosen for this update, not a record
of when the files first appeared on GitHub or when individual playtests occurred.
The original introduction retains 30 July 2025. Later posts run from October to
November 2026 in series order; the competition article describing October 2026
decisions stays on 28 October, and subsequent parts follow it. Part 14 is dated
19 November 2026. Do not use this editorial schedule as playtest evidence.

Series identity remains `TCG` / `Design Philosophy`; shared display names and
existing `series-tcg` / `series-philosophy` anchors live in
`src/lib/writing-series.js`. Series cards sort by the newest article `updated`
date, falling back to `date`. Latest-post cards sort by publication date. The
homepage fills at most three slots, using series first and latest posts for
remaining slots. Both `/blog/[slug]` and `/design-writing/[slug]` remain available.

Validation: `npm run test:writing` checks fallback counts, update ordering,
anchors, all 21 articles, contiguous parts, date ordering, balanced styling,
related links and preservation of the new article's unresolved questions.
`npm run build` includes lint/type checks and exports all 47 pages. Browser
checks at 1440px and 390px verified homepage cards, series navigation, latest two
posts, all 21 library cards, article callouts, no horizontal overflow and no page
errors. No significant new abstraction requires a separate simplicity review;
shared series data and the compact card component replace duplicated navigation.

Retrospective: one implementation agent and one independent verifier; dependency
setup needed npm's locked install to match CI. Local build/export and browser
checks required normal host access. No routing or policy changes were made.
