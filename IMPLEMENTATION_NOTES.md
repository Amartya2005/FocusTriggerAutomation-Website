# Implementation Notes — FocusTrigger Automation Website

These notes record what has been built, what was tested, and what must be confirmed before publication. The site is developed in eight approved phases. Each phase is reviewed before the next begins.

## Phase status

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Repository audit and preparation | Complete. The repository was empty, so this is a new build. |
| 1 | Design system and website foundation | Complete and approved (`fc5af0a`) |
| 2 | Homepage | Complete and approved (`4df969c`, correction `0ac2172`) |
| 3 | Products and FocusTag | Complete, awaiting review |
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

## Phase 2 — Homepage

### Implemented
- **Homepage copy** lives in `src/content/home.ts`, separate from the layout, so it can be edited without touching components.
- **Section order:**
  1. **Hero** (`Hero`, corporate variant):
     - headline "Technology products we own. Software we build for clients."
     - a lead sentence that names both pillars
     - two buttons: Explore FocusTag → `/products/focustag`, and Discuss a project → `/contact?enquiry=software`
     - an original SVG illustration of two phones linked by an NFC tap, with a QR fallback, plus a client-software window, captioned "Not a product screenshot"
  2. **What we do:** two equal `PathwayCard`s.
     - Proprietary products (teal accent) and Software solutions & services (blue accent).
     - Each card has a description, a "Relevant for" audience note, and main and secondary links.
  3. **FocusTag spotlight:**
     - a plain-language description of the confirmed interaction model: phone-to-phone NFC interaction, with a QR code available as a fallback
     - a "Product direction" note that presents smart-campus productivity and spatial compliance as vision, not current capability
     - `InteractionConcept`, which shows two methods, **Primary: Phone-to-phone NFC** and **Fallback: QR code**, separated by "or, as a fallback". It is not a numbered sequence and is visibly labelled "Concept / FocusTag interaction model — illustrative".
  4. **Services overview:**
     - broad wording only; no specific service categories are named
     - "Common starting points" are taken from the audiences listed in the specification
  5. **How we work:** three principles instead of fake proof. There are no testimonials, logos, metrics or case studies.
  6. **Closing call to action** (`CTASection`, dark): two routes, Ask about FocusTag → `/contact?enquiry=focustag` and Discuss a project → `/contact?enquiry=software`.
  7. **Footer:** unchanged from Phase 1.
- **New reusable components:**
  - `src/components/ui/Eyebrow` (shared label above headings; `PageHeader` now uses it)
  - `src/components/sections/SectionHeading`
  - `src/components/sections/Hero`, with corporate, product and services variants
  - `src/components/sections/PathwayCard`
  - `src/components/sections/CTASection`
  - `src/components/visuals/PillarsIllustration`
  - `src/components/visuals/InteractionConcept`, reusable on the FocusTag page in Phase 3
- **Dark sections:** `Section` with the dark tone now sets the label colour to teal (7.9:1) and the intro-text colour automatically.
- **Unchanged routes:** `/products`, `/products/focustag`, `/services`, `/about`, `/contact` and `/privacy-policy` are still the Phase 1 placeholders and all work.
- **Contact links:** links to `/contact?enquiry=focustag|software` are in place. Pre-selecting the enquiry type arrives with the form in Phase 5; until then the parameter is ignored.

### Validation performed (Phase 2)
- `npm run typecheck`: passed. `npm run lint`: passed, 0 problems. `npm run build`: passed, all routes static.
- **Homepage Playwright suite** (production build): 57 passed, 0 failed.
  - **Widths 320, 360, 375, 414, 768, 1024, 1280, 1440 and 1920px:** no sideways scrolling, no clipped text, and no console errors or failed requests.
  - **Headings and landmarks:** one H1, no skipped heading levels, and every section is labelled by its heading.
  - **Links:** every link in the page content returns 200. The homepage links to `/products/focustag`, `/services`, `/products` and both contact enquiry routes. FocusTag and Services are each one click from Home, tested by clicking through.
  - **Equal pillars:** the two pathway cards render at the same size (584×479px at 1440px).
  - **First screen:** the headline, lead and both hero buttons are visible without scrolling at 1440×900, 1024×768, 375×812 and 320×640.
  - **Visuals:** all decorative SVGs are hidden from assistive technology, both illustrations have captions saying they are illustrative, and there are no images without alt text.
  - **Contrast:** all 94 rendered text elements meet WCAG AA. The lowest is 4.56:1.
  - **Keyboard:** Tab reaches all 26 tab stops in logical order. Each shows a focus ring and is scrolled into view, not hidden under the sticky header.
  - **Content check:** no raw placeholders, "trusted by" wording, testimonials, number claims or banned superlatives in the visible text.
- **Phase 1 regression suite:** 86 passed, 0 failed (navigation, mobile menu, keyboard, reduced motion, all routes at 5 widths).
- **Defects found and fixed during testing:**
  - The decorative "01/02" card numbers measured 1.48:1. They are now `--color-text-muted`.
  - At 320×640 the second hero button sat exactly at the bottom of the screen. I trimmed the lead slightly and tightened the mobile top padding, and it now ends at 605px.

### Phase 2 correction: FocusTag interaction model
The company confirmed that **FocusTag supports phone-to-phone NFC interaction with QR fallback**. The first Phase 2 version (`4df969c`) implied a physical NFC tag or printed QR code that identifies a place or object, and a "digital response" step. Those were corrected:
- **Spotlight intro:** now states the confirmed model. The "Relevant for" note on the products card no longer says "physical-to-digital".
- **`InteractionConcept`:** it now takes `methods` (primary or fallback) instead of `steps`, and renders an unordered list with a visible "or, as a fallback" divider, so QR is never read as a second step. The tap/location-pin/response icons are replaced with a two-phones icon and a QR icon.
- **`PillarsIllustration`:** it now shows two matching phones linked by an NFC tap, with a separate dashed QR fallback link. The "NFC tag · QR code", "Tap or scan" and "Digital response" labels are gone, along with the checkmark. The caption names the confirmed model.
- **Not described:** what happens after the interaction, where the QR code is displayed, and any location or object identification.
- **Revalidation:**
  - type-check, lint and build all passed
  - homepage suite: 63 passed, 0 failed, including new checks that block tag, printed-code and location wording in visible text and SVG labels, and that require the diagram to show only Primary: phone-to-phone NFC and Fallback: QR
  - Phase 1 regression suite: 86 passed, 0 failed

### Known limitations
- At very short screens such as 320×568 (iPhone SE, first generation), the second hero button falls below the first screen. It is reachable by scrolling.
- Testing used Chromium only. Other browsers, real devices and screen readers are scheduled for Phase 6.

### Homepage statements needing company confirmation
These are written in safe, general language but should be confirmed before publication:
- **How we work principles** (`approach` in `src/content/home.ts`): "Understand the context first", "Be clear about what exists", "Build in reviewable steps". `[REQUIRES COMPANY CONFIRMATION]`
- **Audience notes and "Common starting points":** these come from the specification's list of key audiences. `[REQUIRES COMPANY CONFIRMATION]`
- **"Ask about demonstrations, pilots…"** in the closing call to action: this assumes FocusTag demos or pilots can be discussed. It promises nothing, but confirm it. `[PRODUCT CAPABILITY TO BE VERIFIED]`
- **The FocusTag interaction diagram** shows only the confirmed model (phone-to-phone NFC, QR fallback). Any further detail about the interaction flow or its result needs confirmation before it is added. `[PRODUCT CAPABILITY TO BE VERIFIED]`

## Phase 3 — Products and FocusTag

### Implemented
- **Shared FocusTag facts:** `src/content/focustag.ts` is now the one place FocusTag is described. It holds the summary, the interaction methods, the confirmed functionality and the vision themes. The homepage, both product pages and the header menu all read from it.
  - Confirmed functionality: direct phone-to-phone NFC interaction, and a QR code fallback.
  - Vision only: smart-campus productivity and spatial compliance.
  - The header menu's FocusTag description now reads "Phone-to-phone NFC with QR fallback".
- **`/products` (Products overview):**
  - A product-style `Hero`, with "Products built by FocusTrigger" and an intro sentence.
  - A "Current product" section with a single `ProductCard` for FocusTag. It shows a "Current product" label, the summary, a "Confirmed functionality" checklist, a separate "Product direction" note marked as not current functionality, the illustration, and two buttons: Explore FocusTag and Ask about FocusTag (`/contact?enquiry=focustag`).
  - A closing call to action with two routes: Ask about FocusTag, and Explore services.
  - There are no other or future product cards.
- **`/products/focustag` (FocusTag page):**
  1. **Hero** (product style):
     - breadcrumb: Products / FocusTag
     - the label "A FocusTrigger product", the FocusTag heading and the confirmed summary
     - two buttons: **Discuss FocusTag** (`/contact?enquiry=focustag`) and **How it works** (jumps to `#how-it-works`)
     - `PhoneToPhoneIllustration`, captioned "Illustrative concept… Not a product screenshot"
  2. **How it works:** `InteractionConcept` (Primary: phone-to-phone NFC, Fallback: QR code), plus a "Background: the technologies" panel with general definitions of NFC and QR codes. The panel says explicitly that these are general descriptions, not FocusTag specifications.
  3. **Today and next:** `CapabilityComparison`.
     - The "Available now" panel lists only the two confirmed items.
     - The "Product vision · not current features" panel (dashed border) lists only the two vision themes, with a note that specific capabilities will be listed only once confirmed.
  4. **FAQ:** four questions, each answered only from confirmed facts: what FocusTag is, whether NFC is the only method, whether the vision themes are available now, and how to find out more.
  5. **Closing call to action:** Discuss FocusTag, and Explore services.
- **Left out deliberately:** problem statements, use-case cards, workflows, device compatibility, integrations, deployments, customers, testimonials and outcomes. None of these are confirmed.
- **New reusable components:**
  - `src/components/ui/Breadcrumbs`
  - `src/components/sections/ProductCard`
  - `src/components/sections/CapabilityComparison`
  - `src/components/sections/FaqList`, built on native expand/collapse elements, so it needs no JavaScript
  - `src/components/visuals/PhoneToPhoneIllustration`
  - `src/components/visuals/PhoneOutline`, now also used by the homepage illustration
  - `Illustration.module.css`, the shared illustration styles (renamed from `PillarsIllustration.module.css`)
- **Changes to shared components:**
  - `Hero` gained an optional breadcrumb slot.
  - `CTASection` lays out a single route at full width.
  - The homepage's spotlight and contact link now come from `focustag.ts`; its rendered text is unchanged.

### Validation performed (Phase 3)
- `npm run typecheck`: passed. `npm run lint`: passed, 0 problems. `npm run build`: passed, all routes static.
- **Phase 3 Playwright suite** (production build, both product pages): 97 passed, 0 failed.
  - **Widths 320, 375, 414, 768, 1024, 1280, 1440 and 1920px:** no sideways scrolling, clipped text, console errors or failed requests.
  - **Headings, landmarks and metadata:** one H1 per page, no skipped heading levels, every section labelled, and a unique title, description, canonical URL and Open Graph title on each page. Products is marked active in the header on both pages.
  - **Links:** every link in the page content returns 200, every in-page jump has a target, and the FocusTag enquiry link appears on both pages.
  - **Breadcrumb:** Products is a link and FocusTag is marked as the current page.
  - **"How it works":** the button jumps to the section, and the heading lands below the sticky header (heading top at 214px, header bottom at 73px).
  - **Available now vs vision:** "Available now" lists only phone-to-phone NFC and the QR fallback. The vision panel lists only the two themes and is labelled "not current features". No vision theme appears under "Available now".
  - **Products overview:** exactly one product card (FocusTag), and its Explore button opens the FocusTag page.
  - **FAQ:** opens with Enter, shows its answer, and closes with Space.
  - **First screen:** the FocusTag heading and the Discuss FocusTag button are visible without scrolling at 1440×900, 1024×768, 375×812 and 320×640.
  - **Contrast:** WCAG AA met for all text, including expanded FAQ answers. The lowest is 4.76:1 on `/products` and 4.56:1 on `/products/focustag`.
  - **Keyboard:** every tab stop shows a focus ring and is visible on screen, checked against the element actually drawn at that point.
  - **Visuals:** all decorative graphics are hidden from screen readers, and every illustration's caption says it is illustrative or a concept.
  - **Content check:** the visible text and illustration labels contain none of these:
    - tag, printed-code or location wording
    - attendance, access control, payments, analytics, dashboards, check-in, integration or deployment claims
    - phone platform or compatibility claims, security claims or percentages
    - testimonials, "trusted by" wording or placeholders
- **Regression:** the homepage suite passed 63/63, so the homepage output is unchanged. The Phase 1 suite passed 86/86.
- **Problems found and fixed:**
  - The vision badge's fully rounded shape looked wrong when its text wrapped on mobile; it now uses a medium radius.
  - Redundant hero wording ("develops and owns its own") was tightened.
- **Test-only problem:** my first version of the "focused element visible" check wrongly flagged the skip link, which sits above the sticky header by design. It now checks which element is actually drawn at each tab stop, and passes.

### Known limitations
- The labels inside the SVG illustrations scale down to about 8px at 320–375px. The illustrations are decorative, and the visible caption carries the meaning.
- I didn't add Product or FAQ structured data, because price, availability and platform details aren't confirmed.
- The `?enquiry=focustag` value is not read until the contact form is built in Phase 5.
- Testing used Chromium only. Other browsers, real devices and screen readers are scheduled for Phase 6.

### Product-page statements needing company confirmation
- **CTA wording "including whether a demonstration or pilot is possible":** it promises nothing, but please confirm that demos or pilots can be discussed. `[PRODUCT CAPABILITY TO BE VERIFIED]`
- **General definitions of NFC and QR codes** in "Background: the technologies": these are standard descriptions, labelled as not FocusTag specifications.
- **Further capability detail:** supported devices, operating systems, what the interaction exchanges or records, admin features, and any vision-area features. Add these only when confirmed. `[PRODUCT CAPABILITY TO BE VERIFIED]`
- **Real product screenshots or diagrams** to replace or sit alongside the concept illustrations. `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]`

## Missing information register

Placeholders: `[REQUIRES COMPANY CONFIRMATION]`, `[PRODUCT CAPABILITY TO BE VERIFIED]`, `[REAL CLIENT CASE STUDY NEEDED]`, `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]`.

| # | Item | Status | Needed by |
| --- | --- | --- | --- |
| 1 | Approved logo and favicon | `[REQUIRES COMPANY CONFIRMATION]`. A text wordmark "FocusTrigger" is used; there is no favicon yet. | Phase 7, ideally earlier |
| 2 | FocusTag capabilities that work today | **Confirmed:** phone-to-phone NFC interaction with QR fallback. Anything further is `[PRODUCT CAPABILITY TO BE VERIFIED]`. | Phase 3 |
| 3 | FocusTag roadmap / planned features | Only the vision themes are published: smart-campus productivity and spatial compliance. Any specific planned features, timelines or workflows are `[PRODUCT CAPABILITY TO BE VERIFIED]`. | Before publication |
| 4 | FocusTag screenshots, product photos or diagrams | `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]`. Original illustrations labelled as concepts are used meanwhile. | Before publication |
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
