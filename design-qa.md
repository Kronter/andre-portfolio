# Design QA

## Reference

- `andre_portfolio_mockup.html`
- `ChatGPT Image Sep 27, 2026, 01_44_52 PM.png`
- `ChatGPT Image Sep 27, 2026, 01_45_57 PM.png`

The references were used for visual hierarchy, density, responsive composition and Project Focus behaviour. Portfolio imagery and factual content remain sourced from the project.

## Visual comparison

- Desktop hero now follows the reference's compact split composition: concise positioning and actions on the left, real project media on the right.
- Selected Work is a dense four-card image-led row at desktop widths and a single-column stack on mobile.
- More Projects retains the reference's horizontal browse strip, compact filters and optional expanded grid.
- Experience, Skills, About and Quick Links use the tighter spacing and bordered dark-panel language shown in the references.
- Project Focus uses a fixed desktop window with a compact sticky header, large media stage, vertical thumbnails and side-by-side overview/contribution content. Mobile uses a full-height project screen with horizontal thumbnails and a single reading column.
- Design Writing retains its editorial layout while using the same dark surfaces, grid texture, violet accents, typography and navigation.

## Responsive checks

- 1440 × 1000 desktop: pass
- 1280 × 900 desktop: pass
- 390 × 844 mobile: pass
- No document-level horizontal overflow at tested desktop or mobile widths.
- Mobile project view fills `100dvh`; the desktop overlay remains centred and independently scrollable.

## Interaction checks

- Project open and close: pass
- URL hash deep link: pass
- Browser Back closes and Forward reopens: pass
- Escape closes: pass
- Body scroll lock while open: pass
- Focus restoration to originating project card: pass
- Desktop previous/next controls: present
- Mobile carousel controls, swipe surface and thumbnails: present
- Reduced-motion handling and carousel manual-stop behaviour: preserved

## Content and accessibility checks

- Real portfolio assets are used; no reference artwork was copied into the site.
- Semantic project buttons, labelled icon controls, dialog semantics, focus trap and visible focus treatment are preserved.
- Quick Links email row aligns with the other rows and includes the external-action icon.
- Design Writing and article pages remain linked and visually consistent with the redesigned portfolio.

## Result

Passed. No blocking mismatch remains against the supplied visual direction at the tested representative viewports.
