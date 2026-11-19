# Writing update — 19 November 2026

The two hypothetical philosophy exercises (“Three Ways Across a River” and “What Would Make Me Come Back to This Garden?”) were removed. The remaining five philosophy essays now run in contiguous order and the internal next/previous links point to existing articles.

Prototype 1: added the author’s intended account of resources as a generated/spent/recycled utility engine, explicitly distinguishing useful decisions from excess cognitive load and lost main-deck design space. Added the quick-note element required by the editorial test; refined the hierarchy with two subheadings under “Cognitive and resource overload”.

One Deck, Two Jobs: rewritten to explain Maneuvers having printed costs and generating resources, and the basic Momentum → Hype → Flow → Momentum generation triangle. The story now focuses on why joining resource generation to the main action deck supports the intended player experience, instead of previewing the dedicated Improv article.

Improv: rewritten around the original reason to add it—avoiding unplayable hands caused by the three-resource economy—then the resulting opportunity costs, pacing, agency and timing decisions. The speculative testing checklist and Tracer Entrance discussion were removed from this article; the separate Entrance article already covers that interaction.

Editorial dates define reading order, not test chronology. Existing series keys and anchors remain unchanged. The actual list contains 21 articles (13 TCG and 8 Design Philosophy). `npm run test:writing` now asserts 21 and checks the corrected philosophy ordering, article headings and separation of resource/Improv topics.

Image placement requested for the two TCG posts: prototype photo as first cover, paper prototype photo above the “cheap to change” heading, deck comparison slide near the overload section, and resource loop slide as the “One Deck, Two Jobs” cover. These source assets must be present under `public/` before setting `coverImage` or image blocks, to avoid broken images at build time.

## Philosophy essays — 19 November 2026

Three additional first-person design-philosophy essays were added as parts 6–8: “When Two Good Mechanics Make a Worse Game”, “Complexity Has an Audience” and “The Difference Between Adding Choices and Creating Decisions”. They are approximately six minutes each and stay within the philosophy series, without linking to the TCG article series.

Each article draws its thesis from the author's established approach and documented prototypes rather than presenting hypothetical concept pitches: systems can be individually good yet collectively compete for design space; complexity is relative to a game's intended experience and audience; meaningful decisions arise from opportunity costs, visible consequences and inter-system relationships. The revised series has eight articles; the preceding article's next-link is updated accordingly. Editorial dates for these three new essays are their actual November 19, 2026 publication date.

Six new visual assets are intended for the portfolio's TCG series. The author will upload them manually into `public/` with clean filenames. References should only be added to posts after the actual binary assets exist on the branch.

## Performance and world merged — 19 November 2026

Merged “The Street After a Jam” (former TCG Part 8) into “When Tracers Started to Feel Like a Performance” (TCG Part 7) as one longer narrative. The retained file is `05-prototype-two-finding-the-performance.md` with its existing cover image. The distinct worldbuilding material survives in the combined essay: non-combat motives, street-performance references, Tracing's environment and magitech equipment, shared traces/movement art, crowd, crew identity, and the relationship between the fiction and alternating Maneuver play. Later character, resource, Style and Sequence developments remain labelled as later decisions rather than misattributed to the original Prototype Two.

The redundant article source file was deleted from the current branch (recoverable from Git history). The former Parts 9–14 are renumbered 8–13; links and relatedSlugs no longer point to the removed slug. The series now contains 13 TCG and 8 Design Philosophy articles, 21 total. The narrative merger has its own test.

## LEGO article rewritten — 19 November 2026

The first Design Philosophy article retains its slug, id, series order, date, original LEGO cover image and link to Part 2, but has a more accurate title and excerpt: “Building Games Like LEGO: Modular Systems, Stronger Connections.” Its body now exclusively explains the author's LEGO philosophy: modular, replaceable/removable mechanics with explicit relationships; reinforcing overlaps across systems without tangled dependencies; and the foundation of cross-disciplinary practice and learning. Tracers, the physical card-game case study and the digital UI lessons from that case have been removed from this article. The prose is grounded in the original NZGDC FINAL slide-deck speaker notes (slides 2–7, 14–15, 25–27 and 32–33) and the author's explicit September/November discussion about modular, interlocking and removable systems. Preserve the separate learning-project article's focus on project exercises rather than duplicating it here.
