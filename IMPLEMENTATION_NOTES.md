# Implementation Notes — FocusTrigger Automation Website

These notes record what has been built, what was tested, and what must be confirmed before publication. The site is developed in eight approved phases. Each phase is reviewed before the next begins.

## Phase status

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Repository audit and preparation | Complete. The repository was empty, so this is a new build. |
| 1 | Design system and website foundation | Complete, awaiting review |
| 2 | Homepage | Not started |
| 3 | Products and FocusTag | Not started |
| 4 | Software Services | Not started |
| 5 | About, Contact, Privacy Policy (Work only if real content exists) | Not started |
| 6 | Integration and quality assurance | Not started |
| 7 | Launch readiness and handover | Not started |

## Phase 1 — Foundation

### Implemented
- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), CSS Modules, ESLint 9 with `eslint-config-next`. No other runtime dependencies.
- **Design tokens** in `src/styles/tokens.css`:
  - colours from the specification, plus dark-surface and status colours
  - fluid type scale (display, H1–H4, body, small)
  - 4px spacing scale and section rhythm
  - container widths (1200px and 760px), radii, shadows, motion, tap-target size and z-index layers
- **Breakpoints:** 640 / 768 / 1024 / 1280px, mobile-first. They are documented in the token file because CSS variables can't be used inside media queries.
- **Global styles** in `src/styles/globals.css`:
  - reset and base typography
  - visible `:focus-visible` ring, with a dark-surface variant
  - skip link and `.visually-hidden` utility
  - `prefers-reduced-motion` handling
- **Font:** Inter is self-hosted through `next/font`, so the live site makes no request to Google at runtime.
- **Shared configuration** in `src/lib/site.ts`:
  - legal name, short name, product name
  - navigation and footer link groups
  - contact fields, all `null` until confirmed; `null` fields are never rendered
- **Metadata:**
  - The root layout sets the default title and the template `%s | FocusTrigger Automation`.
  - `src/lib/metadata.ts` builds each page's description, canonical URL and Open Graph fields.
- **Components:**
  - `Container`: default or narrow width.
  - `Section`: default, soft or dark tone; default or compact spacing.
  - `PageHeader`: the single H1 for inner pages, with an optional label above the title, intro text and actions.
  - `Button`: primary, secondary or text style, in two sizes. It renders as an internal link, an external link or a native button, has a dark-background variant and a disabled state, and is at least 44px tall.
  - `SiteHeader`:
    - text wordmark that links to `/`
    - Products with a FocusTag submenu, then Services, About, and a Contact button
    - desktop submenu opens by click or keyboard; Escape, an outside click or moving focus away closes it
    - mobile menu has `aria-expanded`/`aria-controls`, closes on Escape from anywhere, returns focus to the Menu button, locks page scroll while open, and closes on navigation or when the window widens to desktop
    - `aria-current="page"` on the current link, and an active marker on the parent section
  - `SiteFooter`: full company name, link groups, copyright line, and a line stating that FocusTag is a product of FocusTrigger. Contact details appear only once they are confirmed.
- **Routes (stubs):**
  - `/`, `/products`, `/products/focustag`, `/services`, `/about`, `/contact`, `/privacy-policy`
  - Each has a unique title, a description and one H1, using only approved, general wording.
  - There is also a custom 404 page that is excluded from search indexing.

### Validation performed (Phase 1)
- `npm run typecheck`: passed, no errors.
- `npm run lint`: passed, no warnings or errors.
- `npm run build`: passed. All 7 routes and the 404 page are prerendered as static pages.
- **Playwright on the production build** (`next start`): 86 checks passed, 0 failed.
  - **Layout:** no horizontal overflow on any of the 7 routes at 320, 375, 768, 1024 and 1440px (35 combinations).
  - **Errors and requests:** no console errors and no failed network requests at any width.
  - **Page structure and metadata:** each page has exactly one H1, a meta description, header/main/footer landmarks and `lang="en"`. Titles are unique across all 7 pages, and Inter is applied.
  - **Links:** every link found on the pages returns 200, and an unknown route returns 404.
  - **Mobile menu:**
    - opens and closes by click and by keyboard
    - Escape closes it and returns focus to the Menu button
    - Tab moves into the panel
    - page scroll is locked while it's open
    - it closes and unlocks scrolling after navigation
    - it closes when resized to desktop
    - header tap targets are at least 44px
  - **Desktop keyboard:**
    - the first Tab reaches a visible skip link, which moves focus to `<main>`
    - Tab order is logical, and every focused control shows a focus ring
    - the submenu opens with Enter, and Tab moves into it
    - Escape closes the submenu and returns focus to its toggle; an outside click or moving focus away also closes it
    - Products is marked active on `/products/focustag`
  - **Reduced motion:** with `prefers-reduced-motion` set, transitions are effectively removed.
- **Defect found and fixed during testing:** Escape did not close the mobile menu while focus was on the Menu button. The Escape handler now listens at document level while the menu is open, and the case was retested.

### Not yet verified
- Real devices and browsers other than Chromium. This is planned for Phase 6.
- Page-level colour-contrast audit. Token pairs were measured with a WCAG formula script:
  - white on primary: 5.13:1
  - primary on white: 5.13:1
  - primary on #FAFAFA: 4.91:1
  - muted on white: 4.76:1
  - muted on soft: 4.34:1 (avoid this pairing)
  - secondary text on soft: 9.45:1
  - footer text on navy: 12.02:1 and 6.96:1
  - white on teal: 2.26:1 (never use)

  A full in-page audit is planned for Phase 6.
- Screen-reader announcement behaviour, which needs a manual check with assistive technology.

## Missing information register

Placeholders: `[REQUIRES COMPANY CONFIRMATION]`, `[PRODUCT CAPABILITY TO BE VERIFIED]`, `[REAL CLIENT CASE STUDY NEEDED]`, `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]`.

| # | Item | Status | Needed by |
| --- | --- | --- | --- |
| 1 | Approved logo and favicon | `[REQUIRES COMPANY CONFIRMATION]`. A text wordmark "FocusTrigger" is used; there is no favicon yet. | Phase 7, ideally earlier |
| 2 | FocusTag capabilities that work today (beyond NFC/QR-enabled interactions) | `[PRODUCT CAPABILITY TO BE VERIFIED]` | Phase 3 |
| 3 | FocusTag roadmap / planned features | `[PRODUCT CAPABILITY TO BE VERIFIED]` | Phase 3 |
| 4 | FocusTag screenshots, product photos or diagrams | `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]` | Phase 3 |
| 5 | Software service categories (3–5) | `[REQUIRES COMPANY CONFIRMATION]` | Phases 2 and 4 |
| 6 | Technology stack or expertise to list publicly | `[REQUIRES COMPANY CONFIRMATION]` | Phase 4 |
| 7 | Delivery process actually followed | `[REQUIRES COMPANY CONFIRMATION]` | Phase 4 |
| 8 | Approved public projects or case studies | `[REAL CLIENT CASE STUDY NEEDED]`. `/work` is deferred. | Phase 5 |
| 9 | Company description, founding details, location, team | `[REQUIRES COMPANY CONFIRMATION]` | Phase 5 |
| 10 | Contact email, phone, registered address, CIN | `[REQUIRES COMPANY CONFIRMATION]`. All are `null` in `src/lib/site.ts`. | Phase 5 |
| 11 | Contact form delivery method, endpoint and credentials | Not provided | Phases 5 and 7 |
| 12 | Privacy Policy legal review; decision on Terms of Use | Not provided | Phases 5 and 7 |
| 13 | Production domain and hosting provider (`NEXT_PUBLIC_SITE_URL`) | Not provided. Canonical URLs fall back to `http://localhost:3000`. | Phase 7 |
| 14 | Social profile URLs, if any should appear | Not provided | Phase 5 |

## Decisions and notes
- **Phases and commits:** the phase-gated roadmap takes precedence over the specification's "proceed without approval" and "do not commit" instructions. Work is committed and pushed to `claude/sleepy-lamport-nxwwzr` at the end of each approved phase. There is no pull request and no deployment.
- **Reference websites:** they could not be reached from the build environment because the network proxy refused the connections. The design follows the written guidance in the specification only.
- **Header:** Contact is shown as the header's button instead of a plain link, which meets both "Contact in primary navigation" and "one restrained CTA".
- **Desktop submenu:** it opens on click or keyboard, not on hover, so its expanded state is always reported accurately and works the same for every input method.
- **Contrast:** use `--color-text-muted` (#64748B) only on white; it measures about 4.3:1 on `--color-surface-soft`, so use `--color-text-secondary` there instead. Never put white text on teal `--color-accent`.
- **Copyright year:** the footer year is fixed when the site is built, because pages are prerendered. Rebuilding updates it.
- **Stub pages:** they contain temporary, general copy only. Each is replaced in its phase.
