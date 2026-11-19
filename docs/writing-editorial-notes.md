# Writing update — 19 November 2026

The two hypothetical philosophy exercises (“Three Ways Across a River” and “What Would Make Me Come Back to This Garden?”) were removed. The remaining five philosophy essays now run in contiguous order and the internal next/previous links point to existing articles.

Prototype 1: added the author’s intended account of resources as a generated/spent/recycled utility engine, explicitly distinguishing useful decisions from excess cognitive load and lost main-deck design space. Added the quick-note element required by the editorial test; refined the hierarchy with two subheadings under “Cognitive and resource overload”.

One Deck, Two Jobs: rewritten to explain Maneuvers having printed costs and generating resources, and the basic Momentum → Hype → Flow → Momentum generation triangle. The story now focuses on why joining resource generation to the main action deck supports the intended player experience, instead of previewing the dedicated Improv article.

Improv: rewritten around the original reason to add it—avoiding unplayable hands caused by the three-resource economy—then the resulting opportunity costs, pacing, agency and timing decisions. The speculative testing checklist and Tracer Entrance discussion were removed from this article; the separate Entrance article already covers that interaction.

Editorial dates define reading order, not test chronology. Existing series keys and anchors remain unchanged. The actual list contains 19 articles (14 TCG and 5 Design Philosophy). `npm run test:writing` now asserts 19 and checks the corrected philosophy ordering, article headings and separation of resource/Improv topics.

Image placement requested for the two TCG posts: prototype photo as first cover, paper prototype photo above the “cheap to change” heading, deck comparison slide near the overload section, and resource loop slide as the “One Deck, Two Jobs” cover. These source assets must be present under `public/` before setting `coverImage` or image blocks, to avoid broken images at build time.
