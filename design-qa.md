# Design QA

## Comparison target

- Source visual truth:
  - Browser Comments 1–5 and their annotated footer/About screenshots for `https://african-statutory-terrace-clean.trycloudflare.com/`.
  - `C:/Users/Andrev/AppData/Local/Temp/codex-clipboard-e48877dd-d124-4a2f-8755-2ddef87d266d.png` showing the expanded Environment Query System Tool project view exceeding the intended visible area.
- Rendered implementation evidence:
  - `http://localhost:3001/` — About/footer capture at 1304 × 892.
  - `http://localhost:3001/#project/environment-query-system` — expanded Project Focus capture at 1304 × 892.
  - Mobile Project Focus measured at 390 × 844.
  - Persistent preview: `https://african-statutory-terrace-clean.trycloudflare.com/`.
- State: dark theme; desktop footer at the bottom of the homepage; Project Focus opened to Environment Query System Tool and expanded.

## Capture normalization

- Desktop source and implementation use equivalent wide desktop states. Implementation capture used a 1304 × 892 CSS viewport at device pixel ratio 1.
- The attached expanded-project screenshot includes Windows/browser chrome, while implementation measurements use the browser content viewport. Comparison therefore targets the project panel’s relationship to the visible viewport, not operating-system chrome.
- Mobile regression check used 390 × 844 CSS px at device pixel ratio 1.
- Source captures and browser-rendered implementation captures were opened in the same review context before judging.

## Full-view comparison evidence

- About now uses the complete 1240 px site shell instead of the former 930 px content restriction.
- Footer keeps the Contact heading and a three-item Quick Links panel. The duplicate standalone email, upper brand mark, Design Writing quick link and copyright symbol are removed.
- The four-colour brand mark is now paired with the year and name in the bottom sign-off row.
- Expanded desktop Project Focus has a measured 16 px inset on all sides and is fully contained within the 1304 × 892 browser viewport.

## Focused-region comparison evidence

- About: measured `.about-copy-layout` width and `.about-grid` shell width are both 1240 px.
- Footer: DOM verification confirms no `.footer-email`, no mark in the main footer column, one mark in `.footer-bottom`, no copyright symbol, and exactly three Quick Links.
- Expanded Project Focus: panel bounds are left 16, top 16, right 1288, bottom 876 inside a 1304 × 892 viewport. Its inner content remains independently scrollable (`overflow-y: auto`, 802 px client height, 1663 px scroll height).
- Floating Project Focus: after toggling out of expanded mode, its measured panel bounds also remain fully inside the viewport.
- Mobile Project Focus: remains edge-to-edge with no document-level horizontal overflow.

## Required fidelity surfaces

- Fonts and typography: passed. No requested type hierarchy changed; the wider About paragraph retains its established size and line height.
- Spacing and layout rhythm: passed. About fills the shell, the simplified footer remains balanced, and expanded Project Focus uses a consistent 16 px desktop inset.
- Colors and visual tokens: passed. Existing charcoal, violet and four-colour brand tokens are preserved.
- Image quality and asset fidelity: passed. Profile and project media remain unchanged and correctly cropped.
- Copy and content: passed. Only the explicitly requested duplicate footer items and copyright symbol were removed.

## Findings and comparison history

- [Resolved P2] Expanded Project Focus could exceed the visible browser area because `100vw × 100dvh` was combined with backdrop padding.
  - Fix: expanded mode now fills the backdrop’s available content box, with overflow containment and a 16 px desktop inset; mobile keeps zero inset.
  - Post-fix evidence: measured desktop panel bounds remain within all four viewport edges, with inner content scrolling independently.
- [Resolved P2] About retained the old two-column width constraint after Quick Links moved away.
  - Fix: removed the 930 px cap so the image/text layout spans the full 1240 px site shell.
  - Post-fix evidence: browser measurement confirms equal About content and shell widths.
- [Resolved P2] Footer contained duplicated contact/writing actions and an unnecessary upper mark.
  - Fix: removed standalone email and Design Writing from Quick Links, removed the upper mark, and moved the mark beside the bottom sign-off.
  - Post-fix evidence: 1304 × 892 footer capture and DOM checks match all five annotations.
- [Resolved P3] Footer showed a copyright symbol despite no copyright claim being desired.
  - Fix: removed the symbol while retaining the year and name.

## Interaction and technical checks

- Tested Project Focus open, expand, return to floating mode and Escape close.
- Verified body/panel containment at 1304 × 892 and mobile behavior at 390 × 844.
- Verified Quick Links remain semantic links for Resume, LinkedIn and direct email.
- Browser console checked with no errors or warnings.
- Production build completed successfully.

## Follow-up polish

- No actionable P0/P1/P2 differences remain for the supplied annotations and overflow report.

final result: passed
