# Design QA

## Comparison target

- Source visual truth:
  - `C:/Users/Andrev/Desktop/andre_portfolio_mockup.html`
  - `C:/Users/Andrev/Desktop/ChatGPT Image Sep 27, 2026, 01_44_52 PM.png`
  - `C:/Users/Andrev/Desktop/ChatGPT Image Sep 27, 2026, 01_45_57 PM.png`
  - User refinement: preserve the approved mobile composition and simplify all desktop page heroes to a purple-to-black gradient without AI-styled decoration.
- Implementation capture:
  - `http://localhost:3003/` — in-app browser desktop capture
  - `http://localhost:3003/design-writing/` — in-app browser desktop capture
  - `http://localhost:3003/design-writing/tcg-part-one/` — in-app browser desktop capture
- State: default page load, dark theme, navigation closed.

## Capture normalization

- Desktop viewport and implementation pixels: 1440 × 1000 CSS px at device pixel ratio 1.
- Mobile viewport and implementation pixels: 390 × 844 CSS px at device pixel ratio 1.
- Source boards contain several framed desktop and mobile states rather than a single pixel-matched viewport. Comparison therefore used the corresponding hero, navigation, content hierarchy and mobile regions rather than browser chrome or board annotations.

## Full-view comparison evidence

- Homepage: the implementation now follows the approved mobile hierarchy at desktop scale—label, direct headline, evidence-led summary, location and two actions—with no unrelated hero artwork competing with the work section.
- Design Writing library: the grid texture and radial glow are removed; its header uses the same restrained gradient, typography and spacing language as the portfolio.
- Article: the header uses the shared gradient and keeps article-specific metadata readable without decorative visual effects.
- Project imagery remains limited to verified portfolio and article assets below the page headers.

## Focused-region comparison evidence

- Hero background: verified as one continuous `linear-gradient(135deg, #21143a 0%, #15101f 38%, #09090b 78%)` at desktop and mobile sizes. An earlier mobile capture exposed accidental 38 px background tiling; the inherited `background-size` was removed and the corrected capture shows a continuous gradient.
- Typography: desktop headline stays large enough to establish immediate positioning but uses the same left-aligned rhythm and controlled width as mobile. Design Writing and article display sizes were reduced from the previous oversized editorial treatment.
- Asset treatment: promotional Outfire hero art and its generated-sounding caption were removed. Real project images begin in Selected Work; the article cover remains the author’s real work.

## Required fidelity surfaces

- Fonts and typography: passed. Inter/system type remains consistent; display sizes, line height, wrapping and weights are restrained and readable.
- Spacing and layout rhythm: passed. Desktop hero has one content column, stable 1240 px shell alignment and clean transition into Selected Work. Mobile spacing remains unchanged apart from the corrected background.
- Colors and visual tokens: passed. All page heroes share the same muted violet-to-black token with sufficient foreground contrast.
- Image quality and asset fidelity: passed. No unrelated or generated hero image is used; verified project and article images remain sharp and correctly cropped.
- Copy and content: passed. Game Designer positioning, experience summary, location and actions are unchanged; the removed caption carried no factual evidence.

## Findings and comparison history

- [Resolved P2] Desktop homepage hero felt more like a promotional/generated landing page than the approved mobile experience.
  - Fix: removed the split artwork panel, glow, grid and caption; adopted a simple one-column gradient hero.
  - Post-fix evidence: 1440 × 1000 homepage capture shows a clean content-led hero and direct transition into real project work.
- [Resolved P2] Design Writing library used a grid texture and radial glow inconsistent with the requested cleanup.
  - Fix: replaced both with the shared hero gradient and reduced display scale.
  - Post-fix evidence: 1440 × 1000 Design Writing capture shows the same visual language as the homepage.
- [Resolved P2] Mobile hero gradient tiled into visible squares after the shared gradient change.
  - Fix: removed the stale mobile `background-size: 38px 38px` rule.
  - Post-fix evidence: 390 × 844 capture shows one uninterrupted gradient with no document-level horizontal overflow.

## Interaction and technical checks

- Desktop homepage, Design Writing library and article rendered in the in-app browser.
- Mobile homepage rechecked at 390 × 844.
- Document width remains within the viewport at tested desktop and mobile sizes.
- Browser console: no errors. One non-blocking Next.js development LCP warning was observed for an already-prioritized article image.
- Production build: passed.

## Follow-up polish

- No blocking visual differences remain. Further change would be subjective color tuning rather than correction.

final result: passed
