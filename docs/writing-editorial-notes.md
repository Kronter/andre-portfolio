# Writing update — 19 November 2026

The original TCG introduction is the style reference: personal framing, quick
notes, inline sidenotes, violet emphasis and purple inset reflections. Existing
articles keep their factual accounts and distinguish hypothetical examples and
planned tests from reported observations. Part 14 keeps the author's account of card draw and proposed comparisons, with a light copy edit. Aura timing remains open.

The series use editorial dates to space the reading order from July 2025 to November 2026. The original introduction keeps 30 July 2025 and Part 14 keeps 19 November 2026. These dates do not record uploads or establish when tests took place. Later revisions can describe newer decisions. The competition article explicitly identifies the October prediction work as a later update.

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
