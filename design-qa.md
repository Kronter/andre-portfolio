# Design QA

## Comparison target

- Source visual truth: `C:/Users/Andrev/AppData/Local/Temp/codex-clipboard-da87257b-c567-4640-aa08-a2f55891a57c.png` (1479 × 921 px), supplemented by the previously supplied desktop/mobile boards and HTML mock-up.
- Rendered implementation evidence:
  - `http://localhost:3001/` — browser-rendered homepage captures at 1440 × 900, 1440 × 1000, 1440 × 1200, and 390 × 844.
  - `http://localhost:3001/design-writing/` — browser-rendered desktop capture at 1440 × 900.
  - Persistent preview: `https://african-statutory-terrace-clean.trycloudflare.com/`.
- State: dark theme, homepage default state, project focus closed, desktop navigation visible, mobile navigation closed.

## Capture normalization

- Source: 1479 × 921 raster at its original density. It is a cropped desktop reference rather than a full-page or device-framed specification.
- Desktop implementation: CSS viewports of 1440 × 900/1000/1200 at device pixel ratio 1.
- Mobile implementation: 390 × 844 CSS px at device pixel ratio 1.
- The comparison aligned the source card rows and section rhythm with the corresponding browser-rendered regions. Browser chrome, the source's crop, and different page content heights were excluded from fidelity judgments.

## Full-view comparison evidence

- The desktop homepage hero now follows the approved mobile composition at desktop scale: one centered content column over a restrained violet-to-black gradient, with no generated or decorative hero artwork.
- Selected Work uses verified project imagery with a distinct opaque information footer. Titles and tag rows no longer fight the image contrast.
- Desktop Experience now translates the mobile career-card language horizontally: VISTIC and continuous Mytona employment are primary cards, while Hublix, Outfire and Ravenhill sit within the Mytona card as project evidence.
- The Design Writing landing hero uses the same centered, image-free gradient treatment as the homepage.
- At 390 × 844 the mobile hero and Selected Work composition remain left-aligned and unchanged in structure; only the requested skill-tag color carries through.

## Focused-region comparison evidence

- Project cards: compared the supplied Selected Work and More Projects crop directly with the 1440 × 900 browser capture. The implementation intentionally uses opaque footers instead of the source's image overlay because the user specifically identified poor tag contrast. Every title row reserves the same height, including the two-line Environment Query System Tool title.
- Experience: the 1440 × 1200 capture verifies the horizontal connector, paired employment cards and three nested Mytona project cards. The relationships match the mobile card hierarchy without implying sequential title replacement.
- Skills: the 1440 × 900 capture verifies category-specific violet, cyan and pink tag treatments with readable text and subdued surfaces.
- Heroes: the 1440 × 1000 homepage and 1440 × 900 Design Writing captures verify centered desktop headings and copy. The 390 × 844 capture verifies mobile remains left aligned.

## Required fidelity surfaces

- Fonts and typography: passed. Display hierarchy remains clean and human, title wrapping is controlled, project-card title blocks align, and small tags use sufficient weight.
- Spacing and layout rhythm: passed. Desktop hero content is centered; Selected Work footers align; Experience reads horizontally; mobile retains its established vertical rhythm.
- Colors and visual tokens: passed. Violet remains the primary accent, while skill categories add restrained violet/cyan/pink differentiation. Project tags have an opaque dark-violet surface and higher-contrast text.
- Image quality and asset fidelity: passed. Existing verified project images are preserved with responsive crops; no generated or unrelated artwork was introduced.
- Copy and content: passed. Employment continuity, overlapping Hublix responsibilities, project names, dates and skill labels remain grounded in the verified content.

## Findings and comparison history

- [Resolved P2] Selected Work tags were difficult to read over several project images.
  - Fix: moved desktop titles and tags into opaque, bordered information footers and strengthened tag contrast.
  - Post-fix evidence: 1440 × 900 capture shows consistent readability across bright Hublix/Outfire/Ravenhill imagery and the dark District Underground image.
- [Resolved P2] Project title and tag rows did not align when a title wrapped.
  - Fix: made cards flex columns and reserved a consistent two-line heading area for Selected Work and More Projects.
  - Post-fix evidence: 1440 × 900 capture shows equal card bottoms and aligned tag zones, including the two-line Environment Query System Tool title.
- [Resolved P2] Desktop Experience used a different visual grammar from the preferred mobile timeline.
  - Fix: replaced proportional bars with horizontal employment cards and nested project cards connected by a restrained timeline rule.
  - Post-fix evidence: 1440 × 1200 capture shows VISTIC and Mytona as peer career periods with the three Mytona projects nested correctly.
- [Resolved P2] The new desktop Experience row was not hidden by the legacy mobile breakpoint selector and caused mobile overflow.
  - Fix: hide `.desktop-career-flow` below 768 px and contain the mobile filter row without negative margins.
  - Post-fix evidence: 390 × 844 browser measurement reports the desktop flow as `display: none`, the mobile timeline as `block`, and no document-level horizontal overflow.
- [Resolved P3] Skills lacked category differentiation.
  - Fix: added restrained category colors to tag borders, fills and text for Design, Technical and Production / Collaboration.

## Interaction and technical checks

- Primary responsive checks: 1440 × 900, 1440 × 1000, 1440 × 1200 and 390 × 844.
- Homepage, Design Writing library and responsive navigation rendered in the in-app browser.
- Mobile document width rechecked after the overflow fix.
- Browser console checked; no application errors were found.
- Production build completed successfully.

## Follow-up polish

- No actionable P0/P1/P2 differences remain. Any further adjustment would be subjective density or accent-color tuning.

final result: passed
