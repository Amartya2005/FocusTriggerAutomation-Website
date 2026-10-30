# Implementation Notes — FocusTrigger Automation Website

These notes record what has been built, what was tested, and what must be confirmed before publication. The site is developed in eight approved phases. Each phase is reviewed before the next begins.

## Phase status

| Phase | Scope | Status |
| --- | --- | --- |
| 0 | Repository audit and preparation | Complete. The repository was empty, so this is a new build. |
| 1 | Design system and website foundation | Complete and approved (`fc5af0a`) |
| 2 | Homepage | Complete and approved (`4df969c`, correction `0ac2172`) |
| 3 | Products and FocusTag | Complete and approved (`c6f2395`) |
| 4 | Software Services | Complete and approved (`aa361ba`) |
| 5 | About, Contact, Privacy Policy (Work only if real content exists) | Complete and approved (`e09bd51`). The Privacy Policy is still a **draft awaiting company and legal approval**. |
| 6 | Integration and quality assurance (plus official logo and confirmed email) | Complete and approved (`4ffbb7c`) |
| 7 | Launch readiness and handover | Complete and approved (`35f1dd8`). **Launch is NOT approved**; see Phase 7 → Launch checklist. |
| 8 | Brand colour system and visual refinement | Complete, awaiting review. **Launch is still NOT approved.** |

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

## Phase 4 — Software Solutions & Services

### Implemented
- **Content:** `src/content/services.ts` holds all `/services` copy. A comment at the top lists what is confirmed and what must not be published as an established offering.
- **Shared enquiry link:** `softwareContactHref` (`/contact?enquiry=software`) lives in `services.ts`, and the homepage now uses it too. The homepage output is unchanged.
- **Service areas are data-driven:** the page renders whatever `serviceAreas` contains. Each item has a title, a description and optional confirmed `examples`.
  - Confirmed categories can be added, or can replace the broad areas, without changing the page.
  - The grid adapts automatically: one column on mobile, and as many as fit at 18rem or wider on larger screens.
  - At launch it holds only the two broad, confirmed areas: **Software solutions** and **Technology services**.
- **`/services` sections:**
  1. **Hero** (services style):
     - heading "Turn your requirements into working software."
     - an intro naming both pillars
     - two buttons: **Discuss a project** (`/contact?enquiry=software`) and **How engagements begin** (jumps to `#how-engagements-begin`)
     - an original illustration of requirements becoming software, captioned "Not a client project or product screenshot"
  2. **Who we are:** positioning as one company with two pillars. A pillar list marks Software solutions & services as "This page" and links to `/products`.
  3. **What we offer:** the `ServiceCard` grid, rendered from `serviceAreas`.
  4. **Who we work with:** businesses, startups and partners, taken from the specification's audience list.
  5. **Engineering experience:** evidence limited to FocusTrigger's own product, using the confirmed FocusTag summary and a link to the FocusTag page. No technology stack is claimed.
  6. **How engagements begin:** `ProcessSteps`, three modest steps: share your requirement, discuss the context, agree the next step.
  7. **FAQ:** three questions, answered without unconfirmed claims.
  8. **Closing call to action:** one route, **Discuss a project** → `/contact?enquiry=software`.
- **Contact:** the page has no form, and no wording suggests a message can already be sent. The contact page is still the Phase 1 placeholder, which says the enquiry form is being prepared. The form and pre-selecting the enquiry type are Phase 5.
- **Not created:** separate service pages.
- **New reusable components:**
  - `src/components/sections/ServiceCard`
  - `src/components/sections/ProcessSteps` (an ordered list; horizontal with connecting lines from 768px, vertical on mobile)
  - `src/components/visuals/ServicesIllustration`

### Validation performed (Phase 4)
- `npm run typecheck`: passed. `npm run lint`: passed, 0 problems. `npm run build`: passed, all routes static.
- **Phase 4 Playwright suite** (production build, `/services`): 57 passed, 0 failed.
  - **Widths 320, 375, 414, 768, 1024, 1280, 1440 and 1920px:** no sideways scrolling, clipped text, console errors or failed requests.
  - **Structure and metadata:** one H1, no skipped heading levels, and every section labelled by its heading. The title and description are unique across the site, and the canonical URL and Open Graph title are present. Services is active in the header and marked as the current page.
  - **Links:** every link returns 200, and both in-page jumps have targets.
  - **Project enquiry:** both "Discuss a project" buttons, including the hero's main one, go to `/contact?enquiry=software`.
    - The services page has no form or input fields.
    - Clicking through lands on `/contact?enquiry=software`. That page offers no way to send a message and claims nothing was sent or received.
  - **"How engagements begin":** the button jumps to the section, with the heading below the sticky header (heading top at 215px, header bottom at 73px).
  - **Positioning:** the section links to the products pillar.
  - **Service grid:** it shows exactly the content entries, Software solutions and Technology services. At 1440px it renders 2 × 584px cards; the empty third column collapses to 0px. It is one column at 375px.
  - **Engagement steps:** they render as a three-item ordered list.
  - **Engineering evidence:** it contains only the confirmed FocusTag model.
  - **Content check:** none of the following appear in the visible text or illustration labels:
    - research-derived categories: web/mobile apps, MVP, cloud, AI/ML, IoT, integrations, backend, DevOps
    - named technologies or frameworks, or delivery methods such as agile, scrum or sprints
    - certifications, years of experience, client names, case studies, testimonials or percentages
    - guarantees, SLAs or "on time" promises
    - superlatives, tag or printed-code wording, or placeholders
  - **Visuals:** decorative graphics are hidden from screen readers, and the caption states it is an illustration, not a client project or screenshot.
  - **FAQ:** opens with Enter and closes with Space.
  - **Contrast:** WCAG AA met for all 86 text elements with FAQ answers expanded. The lowest is 4.56:1.
  - **Keyboard:** a focus ring on all 22 tab stops, and each is visible and drawn on top.
  - **First screen:** the heading and Discuss a project button are visible without scrolling at 1440×900, 1024×768, 375×812 and 320×640.
- **Regression suites:**
  - Phase 3 (product pages): 97 passed, 0 failed.
  - Homepage: 63 passed, 0 failed.
  - Phase 1: 86 passed, 0 failed.
- **Problems found and fixed:** the hero illustration had empty space at the bottom and duplicate labels. I removed the duplicate labels and reduced the drawing height from 400 to 360.

### Known limitations
- `?enquiry=software` is not read until the contact form is built in Phase 5.
- No Service structured data, because the specific offerings are not confirmed.
- Testing used Chromium only. Other browsers, real devices and screen readers are scheduled for Phase 6.

### Services-page statements needing company confirmation
- **Service areas:** only "Software solutions" and "Technology services" are shown, with their one-line descriptions. Please supply 3–5 confirmed categories, with optional examples. `[REQUIRES COMPANY CONFIRMATION]`
- **Who we work with:** businesses, startups and partners, as listed in the specification's audiences. `[REQUIRES COMPANY CONFIRMATION]`
- **How engagements begin:** share your requirement → discuss the context → agree the next step, before work begins. `[REQUIRES COMPANY CONFIRMATION]`
- **Engineering experience:** describes building FocusTag as direct, first-hand engineering experience. Confirm the wording, and supply any technologies or capabilities to list. `[REQUIRES COMPANY CONFIRMATION]`
- **FAQ answers:** "Can startups discuss an early product idea? — Yes…", and that FocusTag is separate from client projects. `[REQUIRES COMPANY CONFIRMATION]`
- **Case studies:** none are published. `[REAL CLIENT CASE STUDY NEEDED]`

## Phase 5 — About, Contact and Privacy Policy

### Pre-implementation audit (what the site actually does)
- **No contact channel exists.** No email, phone or address is configured (`site.contact` is all `null`). There are no API routes, route handlers, server actions, form endpoint, mail library or third-party form service.
- **No data collection code.** No analytics, tag managers, tracking, cookies, `localStorage`, `sessionStorage` or IndexedDB in the source. No external `<script>` tags. No `console` logging. The runtime dependencies are only `next`, `react` and `react-dom`.
- **Fonts:** Inter is self-hosted through `next/font`, so no request goes to Google at runtime.
- **Confirmed at runtime** on the production build (see Validation): no cookies, no Set-Cookie headers, empty storage, and every request same-origin.

### Implemented
- **`/about`:**
  - `Hero`, plus "One company, two connected pillars", which reuses the two `PathwayCard`s from the homepage content.
  - "Our product: FocusTag" uses `CapabilityComparison`. Confirmed functionality (phone-to-phone NFC, QR fallback) is kept separate from the labelled vision (smart-campus productivity, spatial compliance).
  - "How we work" reuses the homepage principles through the new shared `PrincipleList` component.
  - "Company details" lists only confirmed facts: legal name, short name, current product and areas of work.
  - A closing call to action offers Explore FocusTag and Contact.
  - No founding date, history, team, location, customers or achievements.
- **`/contact`:**
  - **Enquiry types:** FocusTag, Software project, Partnership, Other. They are defined in `src/content/contact.ts`, and only these ids are accepted.
  - **Choosing a type:** `?enquiry=<id>` preselects one; an unknown or missing value selects none. Choosing a type updates the URL in place (no extra history entries) and highlights the card with `aria-current`.
  - **No endpoint configured (current build):**
    - The page shows "Online enquiries are not open yet — No information can be submitted here at the moment".
    - If a type is selected, it shows guidance on what to include.
    - There are **no form controls**, so nothing pretends to submit.
  - **Endpoint configured** (`NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`): `ContactForm` renders instead. Its fields:
    - name and email (both required; email must be a valid format)
    - organisation (optional)
    - phone (optional, but validated if entered)
    - enquiry type (required, kept in sync with the URL and cards)
    - message (required, at least 20 characters)
  - **Form behaviour:**
    - inline errors with an icon and text
    - an error summary announced to screen readers, and focus moved to the first invalid field
    - errors update live after the first attempt
    - a "Sending…" state while submitting
    - success shown **only after a 2xx response**
    - a server or network error keeps every entered value and says the enquiry could not be sent
    - a 15-second timeout
  - **Payload:** a JSON POST of `{ name, email, organisation, phone, enquiryType, message }`.
  - **Direct details:** an "Other ways to reach us" section (email, phone, address) appears only once those details are confirmed in `site.contact`.
- **`/privacy-policy`: DRAFT, awaiting company and legal approval.**
  - It states only verified behaviour: what information you provide, cookies and browser storage (none), analytics, advertising and third-party content (none), the technical information any browser sends to a web server, and how changes to the policy are handled.
  - The "Information you provide" section follows the configuration. Unconfigured, it says no form or other way to submit personal information exists. Configured, it lists the form fields and says they go to the form-processing service.
  - A Contact section appears only if `site.contact.email` is set.
  - **Left out:** retention periods, legal basis, security assurances, data-sharing statements, address, grievance officer and effective date.
- **Not created:** `/work`.
- **New components:**
  - `src/components/contact/ContactEnquiry` (chooser, unavailable state, and form host; uses `useSearchParams` inside a `Suspense` boundary so the page stays static)
  - `src/components/contact/ContactForm`
  - `src/components/sections/PrincipleList` (extracted from the homepage; homepage output unchanged)
  - `src/components/layout/Prose` (long-form text)
- **Configuration:** `site.contact.formEndpoint` reads `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`. It is documented in `.env.example` and the README.

### Validation performed (Phase 5)
- `npm run typecheck`: passed. `npm run lint`: passed, 0 problems.
  - Lint first caught a React rule violation (ref callbacks created during render in `ContactForm`). I replaced the refs with focusing by id inside the submit handler, then re-ran lint.
- `npm run build`: passed, a clean rebuild with no endpoint configured. All 8 routes are static, and the bundle was checked to contain no test endpoint URL.
- **Phase 5 suite** (final, unconfigured build): **177 passed, 0 failed**.
  - **Widths:** `/about`, `/contact`, `/contact?enquiry=software` and `/privacy-policy` at 320, 375, 414, 768, 1024, 1280, 1440 and 1920px. No sideways scrolling, clipped text, console errors or failed requests.
  - **Structure and metadata:** one H1 per page, no skipped heading levels, every section labelled, and canonical and Open Graph tags present. Titles and descriptions are unique across all 7 pages.
  - **Navigation and links:** every link returns 200. The header marks About and Contact as the current page.
  - **Contrast:** WCAG AA met. The lowest ratio is 4.68:1 on About, 4.91:1 on Contact and 4.91:1 on Privacy.
  - **Keyboard:** a focus ring on every tab stop, each visible and drawn on top. Decorative SVGs are hidden from screen readers.
  - **About:** both pillars appear; the two current functions are kept separate from the labelled vision; company details show confirmed facts only.
  - **Contact selection:** correct for no parameter, `software`, `focustag`, `partnership`, `other`, and an invalid value. Clicking a card updates the URL and selection without adding history entries.
  - **Contact honesty:** no form controls appear without an endpoint, the page says plainly that enquiries cannot be submitted yet, nothing claims a message was sent, received or will be answered, and no direct-contact section is shown.
  - **No made-up details, all 7 pages:** no email addresses, phone numbers, CIN, address, founding/history/team/office claims, credentials, placeholders, `mailto:`/`tel:` links or external links.
  - **No Work page:** `/work` returns 404, and there is no Work or Case Studies link.
  - **Privacy wording:** it says no form collects data, and makes no claims about retention, legal basis, security, sharing, address, officer or dates. It has no contact section.
  - **Privacy claims verified at runtime** (all pages plus in-site navigation):
    - no cookies and no Set-Cookie headers
    - `document.cookie` empty, `localStorage` empty, `sessionStorage` empty
    - **all 205 requests same-origin**, with no third-party scripts, fonts or content
  - **First screen:** the H1 is visible without scrolling at 1440×900, 375×812 and 320×640.
- **Contact-form suite** (a **temporary** build with `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=http://localhost:3999/submit`, pointing at a local mock server; never committed): **28 passed, 0 failed**.
  - **Preselection and syncing:** `?enquiry=` preselects the select field, and the cards, select field and URL stay in sync both ways.
  - **Labels:** every field has a visible label; the right fields are required and the rest are marked optional.
  - **Empty submit:** four fields are flagged, focus moves to Name, errors are linked to their fields, and "There are 4 problems…" is announced. Nothing is sent while the form is invalid.
  - **Error messages:** specific wording for email, phone and short messages. Focus moves to the first invalid field, errors clear as soon as a field is corrected, and errors use an icon plus text.
  - **Server error (500):** every value is kept, the page says "could not be sent" with no success claim, and the button is re-enabled.
  - **Sending:** the button is disabled, its label changes to "Sending…" and the status is announced.
  - **Success:** shown only after a 200 response, with the heading focused. The POST body contained exactly the six fields.
  - **Unreachable endpoint:** an error is shown and values are kept.
  - **Keyboard only:** the full tab order through the form, and Enter submits.
  - **Mobile (375px):** no overflow with errors shown, all controls are at least 44px tall, and form text (including errors) meets WCAG AA.
  - **Privacy:** with the form enabled, the policy switches to its form-data section.
  - **Console:** no unexpected errors.
- **Regression suites** (final build):
  - Phase 4: **57 passed, 0 failed**. One failure on the first run came from the test, not the page: the old check failed on any use of the word "submitted", and the contact page now says "No information can be **submitted** here…". I narrowed it to actual delivery claims and re-ran.
  - Phase 3: **97 passed, 0 failed**.
  - Homepage: **63 passed, 0 failed** (output unchanged after extracting `PrincipleList`).
  - Phase 1: **88 passed, 0 failed** (two more link checks than before, because pages now contain more links).
- **Fixed during testing:**
  - The enquiry-card link text ran its label and description together ("FocusTagInterest in…"); there is now an explicit space between them.
  - Two test-script problems: the Back-button expectation was wrong (links deliberately replace history), and one selector was ambiguous.

### Privacy Policy — status: DRAFT, awaiting company and legal approval
Items needing company or legal review before publication:
- Registered address and the legal entity details to show (for example, CIN), if required.
- A privacy contact or grievance officer, and how to reach them. No contact section is shown until an email is set.
- The hosting provider, and whether it keeps server logs (IP addresses and so on): what it records, where, and for how long. The policy states only that browsers send technical information to the server.
- The form-processing service, once chosen: its name, data location, retention period and any sharing. The configured-form wording must be reviewed before enabling the form.
- Retention periods, legal basis or applicable law (for example, India's Digital Personal Data Protection Act, 2023), visitor rights and how to exercise them, an effective date, and a "last updated" line.
- Whether a Terms of Use page is needed.
- Review again whenever analytics, cookies, embeds, external fonts or the contact form change.

### Launch blockers (as of Phase 5 — superseded by Phase 6 below)
1. **No public contact channel.** `/contact` honestly says online enquiries are not open, but visitors have no way to reach the company. You need to provide one or both of these:
   - a form-processing endpoint (a public JSON POST URL, without a secret key), or a decision to approve a server-side handler;
   - a confirmed email address and/or phone number.
2. **The Privacy Policy is a draft** awaiting the review items above.
3. **Production domain and hosting** (`NEXT_PUBLIC_SITE_URL`) are not set, so canonical URLs fall back to localhost.
4. **No approved logo or favicon.**
5. **Spam protection** (for example, a honeypot, rate limiting or a CAPTCHA via the provider) needs deciding once a form service is chosen. None is built now, because a fake "success" shown to bots would conflict with the rule that the form never claims delivery falsely.

## Phase 6 — Integration and quality assurance

### Branding: official logo
- **Source:** the company-supplied 1024×1024 PNG.
  - It has an opaque cream background (#F9EAD8, varying by ±2).
  - Its lettering reads "Focustrigger Automation".
  - The artwork occupies x 192–834, y 427–596.
- **Processing** (`scripts/make-brand-assets.py`; the artwork is not redrawn, recoloured or recreated):
  - Cropped to the content plus 8 px.
  - **Background removal:** the cream connected to the outer edge, and the letter counters inside the lettering, are made transparent. Anti-aliased edges are un-blended against the background, so no halo is left.
  - **Kept intact:** the cream fills inside the icon (the light half of each toggle) are part of the design. They and every other icon pixel are byte-identical to the source (29,288 pixels verified).
  - **Check:** recompositing the result over the original background reproduces the source with a mean error of 1.1/255.
- **Files:**
  - `public/brand/focustrigger-automation-logo.png`: 659×186, transparent background, 52 KB.
  - `assets/brand/focustrigger-automation-logo-cropped-original.png`: the untouched crop, kept as the source of truth and not served.
  - `src/app/favicon.ico` (16/32/48, RGBA), `src/app/icon.png` (512) and `src/app/apple-icon.png` (180): the icon mark only, centred on the logo's own cream background. No new artwork was created.
- **Header:**
  - The logo is 44 px tall from 768 px and 36 px on mobile, keeping its aspect ratio.
  - It loads eagerly and is preloaded.
  - The link is named "FocusTrigger Automation — home"; the image alt text is "FocusTrigger Automation".
- **Footer:** the logo sits on a tile in the logo's own cream colour (`--color-brand-cream`), because its black lettering would be illegible on the navy footer. It is not recoloured.
- **Rendering:** a `Logo` component (`src/components/ui/Logo.tsx`) uses `next/image` with `unoptimized`. The PNG is served as-is, so no image-optimisation server is needed on whichever host is chosen.

### Confirmed company email
- **One place to change it:** `site.contact.email = "focustriggerautomation@gmail.com"` in `src/lib/site.ts`. No other file hard-codes the address.
- **Footer (every page):** an "Email / focustriggerautomation@gmail.com" `mailto:` link.
- **Contact page:**
  - The hero now has **Email FocusTrigger** (`mailto:` with subject "Website enquiry") and a "Choose an enquiry type" button.
  - The main panel is headed **Email FocusTrigger**. It explains that the online enquiry form is not available yet and that this page cannot send messages itself.
  - It shows the address as a visible link, plus **Write an email**, whose `mailto:` subject names the selected type (for example "Enquiry: Software project").
  - A note says the email app is the visitor's own and the message does not go through this website.
  - Guidance on what to include stays.
- **Removed:** the earlier "Online enquiries are not open yet / No information can be submitted" message. It is now only a fallback for when no email is configured.
- **Configured form (if an endpoint is set later):** a "Prefer email? Write to …" line appears under the form.
- **Not added:** a phone number, address or CIN.
- **Privacy contact:** the general email is **not** labelled or used as a privacy or grievance contact. That is `site.contact.privacyEmail`, which stays `null`.

### Privacy Policy (still DRAFT, awaiting company and legal approval)
- Re-checked against runtime behaviour after the logo and email changes. Both new resources are served from the site's own origin.
- **Added sentence:** "If you email FocusTrigger at the address shown on this website, your message is sent by your own email provider to FocusTrigger's email account. It does not pass through this website."
- **Unchanged:**
  - It still says no website form collects data, because the form is disabled.
  - It still has no Contact section, because the privacy contact is unconfirmed.
  - It still makes no claims about retention, legal basis, security, sharing or compliance.

### SEO additions
- `src/app/robots.ts` → `/robots.txt`: allows all, and references the sitemap.
- `src/app/sitemap.ts` → `/sitemap.xml`: lists the 7 public routes.
- **Organization JSON-LD in the root layout:** legal name, short name, URL, logo and confirmed email only. No address, phone, founding date or social profiles.
- **Note:** the canonical URLs, sitemap, robots and JSON-LD all use `NEXT_PUBLIC_SITE_URL`, which falls back to `http://localhost:3000` until the production domain is set (Phase 7).

### Defects found and fixed in Phase 6
1. **Favicon `.ico` in RGB:** Next's build rejected it ("PNG is not in RGBA format"). I regenerated it as RGBA with the same pixels.
2. **Logo legibility:** each line of lettering was about 15 px tall at a 40 px logo, so I raised the logo to 44 px on desktop and 36 px on mobile.
3. **Mobile Contact journey:** the email channel sat below four enquiry cards on phones, so I added the "Email FocusTrigger" button to the Contact hero, which shows on the first screen.
4. **Focus ring clipped at the viewport bottom:** when Tab focus scrolled the footer email to the bottom edge, the ring was cut off (bottom 900.36 vs viewport 900). I added `scroll-padding-bottom` alongside the existing `scroll-padding-top`.

### Tests actually executed (all Chromium via Playwright; production build)
| Suite | Result |
|---|---|
| `npm run typecheck` | Passed |
| `npm run lint` | Passed (0 problems) |
| `npm run build` (clean `.next`, no form endpoint) | Passed. All routes are static, plus `/robots.txt`, `/sitemap.xml`, `/icon.png` and `/apple-icon.png`. Checked: no test endpoint in the build. |
| **Phase 6 whole-site suite** | **134 passed, 0 failed**, three consecutive runs on the final build |
| Phase 5 suite (About, Contact, Privacy) | 177 passed, 0 failed |
| Phase 5 contact-form suite (temporary mock-endpoint build, not committed) | 28 passed, 0 failed, plus the configured-mode email and privacy check |
| Phase 4 (Services) | 57 passed, 0 failed |
| Phase 3 (Products, FocusTag) | 97 passed, 0 failed |
| Phase 2 (Homepage) | 63 passed, 0 failed |
| Phase 1 (Foundation) | 88 passed, 0 failed |

**What the Phase 6 suite covers:**
- **Layout:** all 7 routes at 10 widths (320, 360, 375, 414, 768, 834, 1024, 1280, 1440, 1920), 70 combinations with no failures. Checked: horizontal overflow, clipped text, broken images, console errors, failed requests and third-party requests.
- **Per page:** title, description, og:title, `lang`, canonical URL, a single H1 with no skipped levels, landmarks and labelled sections. Every link and button has an accessible name. WCAG AA text contrast passes, with the lowest ratio 4.56:1.
- **Brand and contact on every page:**
  - header logo loaded, 44 px tall, undistorted (ratio 3.54 ≈ 659/186), with alt text, the home link name, eager loading and a preload
  - footer logo loaded, with alt text
  - favicon, icon and apple-touch-icon linked
  - footer `mailto:` uses the confirmed email, and every `mailto:` on the site uses it; no `tel:` links
  - titles and descriptions unique across the site
- **Links and files:** every internal link (crawled) and asset returns 200. Unknown routes return 404. Icons are served as images.
- **Search files:** robots, the sitemap (exactly the 7 routes) and the JSON-LD (confirmed fields only) were validated.
- **FocusTag wording on every route:**
  - no wording about tags, printed codes, locations or unconfirmed features
  - "phone-to-phone NFC … QR … fallback" appears on Home, Products, FocusTag, About and Services
  - "smart-campus productivity" and "spatial compliance" appear only in labelled vision or direction contexts, never under "Available now"
- **Contact:**
  - The `mailto:` subject is right for no type, each of the four types and an invalid type.
  - No form controls appear while the form is disabled.
  - The page says the form is unavailable and directs visitors to email.
  - None of the old "no way to contact" wording remains.
  - No delivery, response or "secure form" claims.
  - The email is described as going via the visitor's own provider.
  - The email is not described as a privacy contact.
  - A `mailto:` link is reachable by keyboard.
- **Privacy:** no claims about form data; the email sentence is present; the email is not a privacy contact; no invented retention, legal-basis or compliance claims.
- **Runtime privacy check:** across all pages plus in-site navigation, no cookies, Set-Cookie headers or browser storage, and **all 221 requests stay on the site's own origin**, including the logo, icons and fonts.
- **Keyboard:** on every page, Tab reaches the end of the footer, with the focus ring visible and unobscured at every stop.
- **Emulated iPhone 13 (Chromium with touch):** header logo 36 px; Menu → FocusTag works by tap; no overflow.
- **JavaScript disabled:** all 7 routes still render their content, footer and email link. `/contact` still offers the email channel through its static fallback. Without JavaScript, the enquiry-type preselection and the mobile menu don't work; the footer links remain.

**Secrets and repository hygiene** (shell scan):
- `.env*` files are ignored except `.env.example`.
- No key, token or private-key patterns in tracked files, git history or the client bundle.
- The bundle mentions only the *names* `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`, as inert lookups with fallbacks. No values are embedded.
- `process.env` is used only in `src/lib/site.ts`.

**Test-script corrections** (the website itself was correct in each case):
- Earlier crawlers tried to fetch `mailto:` as a page.
- Some checks read `innerText` inside closed `<details>`.
- Next 16 implements `priority` as a preload link rather than `fetchpriority`.
- The lazy-loaded footer logo was checked before it scrolled into view; this was confirmed stable over three runs.
- Phase 5 assertions written before the email existed ("no email anywhere", "cannot submit") were updated to the approved state: only the confirmed email is allowed. Every phone, address, CIN, history and credential guard is unchanged.

### Not verified (not run in this environment)
- **Firefox and Safari/WebKit:** not run. Only Chromium is installed, and installing other Playwright browsers isn't permitted here. iPhone emulation uses Chromium, not WebKit.
- **Real devices:** physical phones and tablets.
- **Screen readers:** NVDA, JAWS, VoiceOver and TalkBack.
- **Email client:** that clicking `mailto:` opens a real email client and pre-fills the subject. That depends on the visitor's operating system; only the link markup was verified.
- **Performance audits:** Lighthouse and Core Web Vitals; no tool is installed.
- **Production hosting:** domain, HTTPS, headers and CDN behaviour.

### Decisions needed from the company
1. **Logo lettering:** the official artwork reads "Focustrigger" (lowercase "t"), while the site's text uses "FocusTrigger". The artwork is preserved exactly. Please confirm which capitalisation is correct; the text can be aligned, or a corrected logo supplied.
2. **Higher-resolution or vector logo (SVG):** the icon mark in the supplied file is only about 184 px, so the 512 px app icon is slightly soft.
3. **Privacy or grievance contact:** should `focustriggerautomation@gmail.com` also serve as the privacy contact, or will a separate one be designated?
4. **Contact form:** keep email only, or provide a form-processing endpoint?

### Launch blockers (as of Phase 6 — superseded by the Phase 7 launch checklist below)
1. **The Privacy Policy is a draft** awaiting company and legal approval (see Phase 5 → Privacy Policy). This includes designating a privacy or grievance contact, or confirming that the general email serves that role.
2. **No production domain or hosting** (`NEXT_PUBLIC_SITE_URL`), so canonical URLs, the sitemap, robots and JSON-LD point to localhost. Phase 7.
3. **No cross-browser and assistive-technology verification:** Firefox, Safari/WebKit, real devices and screen readers have not been tested (see "Not verified").

Resolved in Phase 6:
- **No public contact channel:** the confirmed email is now live in the footer and on the Contact page.
- **No approved logo or favicon:** the official logo and icons are integrated.

Spam protection is only relevant if a form endpoint is added later.

## Phase 7 — Launch readiness and handover

### Launch status: **NOT APPROVED**
The site builds, passes every automated check below, and is technically ready to receive a production domain. It is **not** approved for launch. The domain and hosting, the Privacy Policy approval, and checks in other browsers and assistive technology are still outstanding (see the checklist). A passing build is not launch approval.

### Audit findings (starting commit `4ffbb7c`)
| Area | Finding | Action |
| --- | --- | --- |
| Dependencies | `npm audit`: 0 vulnerabilities for all dependencies and for production only. Runtime dependencies are only `next` 16.4.3, `react` and `react-dom` 19.3.1. | None needed |
| Production URL | With `NEXT_PUBLIC_SITE_URL` unset, 76 built files contained `localhost:3000` (canonical, `og:url`, sitemap, robots, JSON-LD). Nothing stopped such a build being deployed, and the value wasn't validated: a trailing slash would give `//`, and invalid values were accepted. | **Fixed** (see below) |
| Social sharing | No `og:image`; Twitter card `summary`. | **Fixed** |
| Security headers | None: the routes manifest showed `headers: []`. | **Fixed** |
| Test artefacts | 0 occurrences of the mock endpoint `localhost:3999`. No secrets in tracked files, history or the bundle (Phase 6 scan). | None needed |
| Logo consistency | One `Logo` component (header and footer), one source in `site.logo`, no leftover text wordmark. Favicon, app icons and share image all come from the same artwork. | None needed |
| `.env.example` | It set an *active* placeholder domain, and its form note was out of date. | **Fixed** |
| Hero label contrast | The small blue label above hero headings measured **4.49:1** against the darkest pixel of the blue hero tint on mobile and tablet (WCAG AA needs 4.5:1). Earlier checks missed it because they ignored the tint layer. | **Fixed** |

### Changes made in Phase 7
1. **Production URL safety:**
   - `src/lib/site.ts` (`resolveSiteUrl`) trims the value and strips a trailing slash. If the value is set but isn't an absolute `http(s)` URL, the build fails with a clear message. Unset still means a localhost fallback for local work.
   - `next.config.ts` prints a prominent warning when a production build has no `NEXT_PUBLIC_SITE_URL`.
2. **`scripts/verify-production.mjs`** (no dependencies), with npm scripts `verify:production` and **`build:production`** (environment check → `next build` → output scan).
   - It rejects a missing `NEXT_PUBLIC_SITE_URL` or one that isn't HTTPS, and localhost, loopback or reserved example and test hosts.
   - It rejects a form endpoint that isn't HTTPS.
   - It rejects rendered output (HTML, RSC payloads, robots, sitemap, metadata) containing localhost or example-domain URLs, and client bundles containing a test endpoint.
   - It requires robots and the sitemap to use the configured domain.
3. **Open Graph and Twitter:**
   - `src/app/opengraph-image.png` (1200×630) is the **unmodified** logo crop, scaled 1.25× and centred on the logo's own background colour. It is generated by `scripts/make-brand-assets.py`. Its alt text is in `opengraph-image.alt.txt`.
   - `pageMetadata()` now lists the image explicitly. Without that, page-level `openGraph` objects dropped it: only the homepage had it before the fix, now all 7 pages do.
   - The Twitter card is now `summary_large_image`.
4. **Security headers** (`next.config.ts`, all routes): CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and `Permissions-Policy`, as listed in README → Deploying.
   - The CSP `connect-src` automatically includes the form endpoint's origin when one is configured at build time.
   - HSTS is deliberately left to the HTTPS host.
5. **Hero label contrast:** the label above hero headings now uses `--color-primary-hover` (#0847B8). Worst-case measured contrast went from **4.49:1 to 7.06:1**. This changes one element, using an existing token; it is not a redesign.
6. **Docs:**
   - `.env.example`: the domain is now blank and marked required for production; the form note is corrected.
   - README: environment table, scripts, "Deploying to production", "Rollback" and "Launch checklist" sections.

### Tests actually executed (Phase 7)
All in Chromium (Playwright, plus Lighthouse's Chromium) on this environment's production builds.

| Check | Result |
| --- | --- |
| `npm run typecheck` / `npm run lint` | Passed / passed (0 problems) |
| `npm run build` (clean, no domain) | Passed. It printed the "NEXT_PUBLIC_SITE_URL is not set" warning, as intended. |
| `npm audit` (all; `--omit=dev`) | 0 vulnerabilities / 0 vulnerabilities |
| **Guard, environment checks** | **Rejected:** unset domain; `http://www.focus.test`; `https://www.example.com`; `https://localhost:3000`; `not-a-url`; an `http://` form endpoint. **Accepted:** a hypothetical `https://` host (used only to exercise the passing branch). |
| Build with an invalid domain (`not-a-url`) | Build failed with the clear `NEXT_PUBLIC_SITE_URL must be an absolute URL…` error, as intended. |
| **Temporary build with `https://www.example.com/`** (reserved test domain, trailing slash on purpose; not committed) | Canonical, `og:url`, `og:image`, robots, all 7 sitemap entries and the JSON-LD use the domain. **0 localhost references** in rendered output. **0 `//`**. |
| **Guard, output scan** | **Rejected** the example-domain build and the local (localhost) build. **Passed** the hypothetical-HTTPS end-to-end `npm run build:production`. With no domain, `build:production` stopped before building. |
| **Security headers** (`curl`, 7 routes plus sitemap, robots, OG image, logo, 404) | All 5 headers present on every response; no `X-Powered-By`. |
| **Phase 7 browser suite** | **69 passed, 0 failed.** Covered: headers present and **no CSP violations, console errors or failed requests** on all 7 routes at 375, 834 and 1440 px, during the interactive desktop journey (submenu, FAQ, anchor, client-side navigation, enquiry switching) and during the mobile menu journey. Share metadata (`og:image` 1200×630 with alt text, `summary_large_image`) checked on all 7 pages. |
| **axe-core 4.14** (WCAG 2.0/2.1/2.2 A/AA plus best practice) | **0 violations** on all 7 routes at 1440 and 375 px, and with the mobile menu open, the desktop submenu open, and an enquiry type selected. Each scan left 1 "needs review" item (colour contrast over the hero's tint layer, which axe can't compute), settled by the next row. |
| Hero contrast measured on rendered pixels (7 routes × 4 sizes) | Before the fix: **4.49:1 (fail)** on Home, Services, About and Contact at 834, 375 and 320 px. After: worst case **7.06:1**. |
| **Lighthouse 13.6** (7 routes × mobile and desktop presets; local `next start`, simulated throttling) | **Accessibility 100, Best Practices 100, SEO 100 on all 14 runs. Performance 100 on all desktop runs; 93–100 on mobile.** Only two weighted audits were below 0.9: Total Blocking Time on Home mobile (310 ms, score 0.78) and LCP on Services mobile (2.6 s, score 0.87). |
| Contact-form suite (temporary mock-endpoint build, not committed) **under the new CSP** | **28 passed, 0 failed.** The CSP `connect-src` included the configured endpoint origin, and submissions succeeded. |
| Regression suites on the final build | Phase 6: 134/134. Phase 5: 177/177. Phase 4: 57/57. Phase 3: 97/97. Phase 2: 63/63. Phase 1: 88/88. |
| Final local build artefacts | 0 rendered files contain a test host (`localhost:3999`), the example domain or the hypothetical domain. The only remaining `example.com` strings are Next.js framework comments and the form's hint text "name@example.com". |

**Lighthouse detail (Performance / Accessibility / Best Practices / SEO):**
| Route | Mobile | Desktop | Mobile LCP | Mobile TBT |
| --- | --- | --- | --- | --- |
| `/` | 93 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 0.9 s | 310 ms |
| `/products` | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 0.9 s | 60 ms |
| `/products/focustag` | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 0.9 s | 100 ms |
| `/services` | 96 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 2.6 s | 70 ms |
| `/about` | 99 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 0.9 s | 120 ms |
| `/contact` | 98 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 2.1 s | 120 ms |
| `/privacy-policy` | 98 / 100 / 100 / 100 | 100 / 100 / 100 / 100 | 2.3 s | 50 ms |

CLS was 0 on every run. These are lab results from a local server, not field data. Real-world numbers depend on the host, CDN and network.

### Not verified (not run here)
- **Firefox and Safari/WebKit:** only Chromium is installed in this environment.
- **Real phones and tablets.**
- **Screen readers:** NVDA, JAWS, VoiceOver and TalkBack.
- **Real email delivery** to `focustriggerautomation@gmail.com`, and `mailto:` behaviour in real email clients.
- **Production hosting:** HTTPS, the redirect to one canonical host, HSTS, CDN behaviour, and that headers pass through a proxy.
- **Field performance:** Core Web Vitals from real users.
- **Social preview rendering** on Facebook, LinkedIn and X (needs a public URL).

### Launch checklist
Legend: ✅ complete · ⛔ blocked (needs information or access not yet provided) · ⏳ awaiting approval or action.

| # | Item | Status | Evidence / decision needed |
| --- | --- | --- | --- |
| 1 | All 7 pages build and render; links, email links, logo, favicon and icons work | ✅ | Regression suites (Phase 1–7) all passed on the final build; Phase 6 link crawl and asset checks. |
| 2 | Production URL handling (canonical, OG, sitemap, robots, JSON-LD) ready for a real domain | ✅ | Example-domain build: every URL switched, 0 localhost, no `//`. The guard rejects unsafe values. |
| 3 | No localhost, test endpoints, mocks or secrets in production output | ✅ (mechanism) / ⛔ (actual production build) | `build:production` enforces it. The real production build can only be made once the domain is known. |
| 4 | Security headers | ✅ | Present on all responses; no CSP violations. HSTS still needs adding at the host (see 6). |
| 5 | Choose a domain and hosting provider | ⛔ | **Decision:** which domain (and `www` or the bare domain as canonical), and which Next.js-capable host (or a static host with headers configured manually). |
| 6 | Configure HTTPS, the canonical-host redirect and HSTS on the host | ⛔ | Depends on 5. |
| 7 | Set `NEXT_PUBLIC_SITE_URL` and run `npm run build:production` until it passes | ⛔ | Depends on 5. |
| 8 | Privacy Policy reviewed and approved | ⏳ | Still a **DRAFT awaiting company and legal approval** (Phase 5 list). Includes designating a privacy or grievance contact; the general email is *not* treated as one. |
| 9 | Cross-browser, device and assistive-technology checks | ⛔ | Not possible here. Needs testing in Firefox and Safari, on real iOS and Android devices, and with NVDA or JAWS, VoiceOver and TalkBack, ideally against a preview deployment. |
| 10 | Contact channel works end to end | ⏳ | Email links verified in the markup. **Needs:** send a real test email after deployment and confirm it arrives. |
| 11 | Online form integration decision | ⏳ | **Decision:** keep email only (current), or provide an HTTPS form endpoint. That would require a review of the Privacy Policy's form section and of spam protection. |
| 12 | Brand decisions | ⏳ | "Focustrigger" vs "FocusTrigger" lettering; a higher-resolution or SVG logo (Phase 6). Not launch blockers. |
| 13 | FocusTag accuracy (phone-to-phone NFC with QR fallback, separate from the vision) | ✅ | Phase 6 suite: correct wording on all routes, and vision terms only in labelled contexts. |
| 14 | Disabled contact form can't imply delivery | ✅ | No form controls without an endpoint, no delivery claims, and success only after a 2xx (form suite). |
| 15 | Release record and rollback preparation | ⏳ | Record the deployed commit SHA, keep the previous deployment, and document the DNS records before the switch (README → Rollback). |
| 16 | Deploy and run the post-deploy checks | ⛔ | Depends on 5–8. Follow README → "Verifying a deployment". |
| 17 | Launch approval | ⏳ | Explicit company sign-off after items 5–16. **Not given.** |

### Decisions required from the company
1. **Production domain and canonical host** (`www` or the bare domain).
2. **Hosting provider:** one that runs Next.js is recommended, so the security headers apply as built.
3. **Privacy Policy approval,** and who the privacy or grievance contact is.
4. **Form integration:** keep email only, or provide an endpoint.
5. **Who runs the browser, device and screen-reader checks,** and against which preview URL.
6. **Brand:** the lettering capitalisation and a higher-resolution logo. Not blocking.
7. **The colour-template refinement** was deliberately **not** part of Phase 7. It was done separately in Phase 8 (see below).

## Phase 8 — Brand colour system and visual refinement

Starting commit `35f1dd8`. The colours were moved from a generic placeholder palette (bright blue `#0B5FFF`, a cold teal `#00C2A8`, slate greys) onto the official logo's own colours.

This is a colour and consistency pass only. **Unchanged:** layout, spacing, fonts, content, routes, metadata, security headers, the production guard, and the logo and icon files.

### Logo colours (sampled)
Sampled from `assets/brand/focustrigger-automation-logo-cropped-original.png`. Only solid pixels were counted (each pixel's 3×3 neighbourhood varies by 6 or less), so anti-aliased edges are excluded.

| Colour | Sampled | Reference supplied | Contrast |
| --- | --- | --- | --- |
| Teal | `#34A487` | `#34A788` | 3.09:1 on white, 2.60:1 on cream. **Decorative only** (rules, icon accents, large fills). Not for small text, and not behind white text. |
| Black | `#000000` | `#000000` | 21:1 on white |
| Cream | `#F9E9D7` | `#F9EAD8` | Surface colour |

### Palette (`src/styles/tokens.css`)
The palette has three layers:
1. **Brand reference:** `--brand-teal`, `--brand-black`, `--brand-cream`.
2. **Two scales:** teal and warm neutral (`ink`).
3. **Semantic tokens:** what components use. Existing token names were kept and new ones added.

| Teal scale | Hex | | Warm neutral scale | Hex |
| --- | --- | --- | --- | --- |
| `--teal-50` | `#EAF6F1` | | `--ink-950` | `#141210` |
| `--teal-100` | `#D3EEE5` | | `--ink-900` | `#211E1A` |
| `--teal-300` | `#7DD3BA` | | `--ink-800` | `#3A352F` |
| `--teal-400` | `#4FBD9E` | | `--ink-700` | `#45403A` |
| `--teal-500` | `#34A487` (logo teal) | | `--ink-600` | `#655D55` |
| `--teal-600` | `#22876D` | | `--ink-500` | `#8A7F72` |
| `--teal-700` | `#1A6E59` | | `--ink-300` | `#CDBFAE` |
| `--teal-800` | `#145847` | | `--ink-200` | `#E7DCCD` |
| `--teal-900` | `#0E4236` | | `--ink-100` | `#F3ECE3` |
| | | | `--ink-50` | `#FCF6EE` |

| Role | Tokens → value |
| --- | --- |
| Primary (products, actions) | `--color-primary` teal-700 · `-hover` teal-800 · `-active` teal-900 · `-soft` teal-50 · `-on-dark` teal-300 |
| Secondary (services) | `--color-secondary` ink-950 · `-hover` ink-700 · `-soft` ink-100 |
| Accent (decorative) | `--color-accent` logo teal · `-soft` teal-50 · `-strong` teal-800 (small teal labels) |
| Text | `--color-text` ink-950 · `-secondary` ink-700 · `-muted` ink-600 · `-inverse` `#FAF6F0` |
| Surfaces | `--color-page` / `--color-surface` white · `--color-surface-cream` logo cream (heroes, page headers) · `-soft` ink-50 (alternate sections) · `-subtle` ink-100 (inset panels) |
| Borders | `--color-border` ink-200 · `-strong` ink-300 · `--color-divider` ink-200 |
| Dark surfaces | `--color-dark-surface` ink-950 · `-raised` ink-900 · `-border` ink-800 · `--color-dark-text` `#FAF6F0` · `-secondary` `#D8CFC3` · `-muted` `#A69C90` |
| Buttons | `--button-primary-bg` / `-bg-hover` / `-bg-active` (primary scale), text white · `--button-secondary-bg` white, `-border` ink-500, `-border-hover` ink-950, `-text` ink-950 |
| Links and navigation | `--color-link` teal-700 · `-hover` teal-800 · `--color-link-on-dark` teal-300 · `--color-nav-text` ink-700 · `-active` ink-950 · `--color-nav-indicator` teal-700 |
| Badges | `--badge-current-bg` teal-50 / `-fg` teal-800 · `--badge-neutral-bg` ink-100 / `-fg` ink-700 |
| Forms | `--input-bg` white · `--input-border` ink-500 · `-hover` ink-700 · `-focus` teal-700 |
| States | Focus: `--focus-ring-color` teal-700, with an ink-950 / teal-300 ring on dark. Disabled: `--color-disabled-bg` ink-100, `-text` ink-600, `-border` ink-200. Error, warning and success: the existing AA values, now as tokens. |
| Illustrations | `--illus-ink`, `-text`, `-text-muted`, `-muted`, `-line`, `-border`, `-panel`, `-surface`, `-cream`, `-accent` (teal-700), `-accent-bright` (logo teal), `-accent-soft`, `-accent-strong`, `-dots` |

Shadows are warm-tinted (`rgb(20 18 16 / x)`).

### How it is applied
- **Header:** white with a warm border. Nav text is ink-700, and the active item has a teal-700 indicator. The Contact button is teal-700.
- **Heroes and page headers:** solid logo cream on every route. This replaces the blue tint. The Products and FocusTag heroes add one faint logo-teal radial tint. Cream is used for these bands only, not on every section.
- **Sections:** white alternates with cream-soft (ink-50). Cards are white with warm borders.
- **The two pillars** follow the logo's teal and black:
  - **Products / FocusTag:** teal rule, teal-50 icon tile.
  - **Software services:** black (ink-950) rule, stone icon tile, black "this page" badge.

  Process step numbers stay teal-700 with white text.
- **Dark CTA bands and footer:** warm near-black `#141210`, used only for those bands. Teal-300 labels and on-dark links. The footer logo keeps its cream tile.
- **FocusTag:**
  - "Available now" uses the teal badge.
  - "Product vision · not current features" uses the neutral stone badge and keeps its dashed border.
  - Interaction concept: the primary NFC path is teal, the QR fallback is neutral.
- **Contact:** the selected enquiry card has a teal-700 border on teal-50. Inputs use the ink-500 border, which fixes a 1.5:1 defect. Error and success states come from tokens.
- **Illustrations:** all hard-coded hex values in `PillarsIllustration`, `PhoneToPhoneIllustration`, `ServicesIllustration` and `PhoneOutline` (about 90 attributes), and in the ProductCard and enquiry checkmarks, became CSS role classes bound to the `--illus-*` and badge tokens. Classes are used rather than `fill="var(--x)"`, because support for `var()` in SVG presentation attributes varies by browser. Shapes are unchanged.

### Contrast (WCAG 2.x; measured in the browser by `qa-phase8.js`)
| Pair | Ratio | Needed |
| --- | --- | --- |
| White text on primary button: default / hover / active | 6.14 / 8.34 / 11.34 | 4.5 |
| Primary button against cream hero | 5.17 | 3 (non-text) |
| Secondary button text / border on white / border on cream | 18.69 / 3.92 / 3.30 | 4.5 / 3 / 3 |
| Nav text / hover; active indicator on white | 10.26 / 18.69; 6.14 | 4.5; 3 |
| Link / hover on white | 6.14 / 8.34 | 4.5 |
| Footer link on dark / hover | 12.13 / 18.69 | 4.5 |
| Teal-700 on cream; teal-800 label on cream | 5.17; 7.02 | 4.5 |
| Muted text on cream / cream-soft | 5.43 / 6.02 | 4.5 |
| Dark muted text on dark / raised dark; on-dark link | 6.92 / 6.15; 10.59 | 4.5 |
| Badges: current / neutral | 7.53 / 8.75 | 4.5 |
| Input border on white / cream-soft; hover; focus | 3.92 / 3.65; 10.26; 6.14 | 3 |
| Error text; error summary; success text | 6.47; 7.60; 8.70 | 4.5 |
| Disabled button text (WCAG-exempt; checked for legibility) | 5.51 | n/a |
| Focus ring against adjacent colours | ≥ 3 at every tab stop on 7 routes at 1440 and 375 px | 3 |
| Hero text against rendered pixels, including the tint (worst case) | 6.33 (`/products` @375, the eyebrow) | 4.5 |

### Fixes made along the way
1. **Form input borders** were `#CBD5E1`, about **1.5:1** on white (fails WCAG 1.4.11). They are now ink-500, 3.92:1.
2. **Invalid fields:** the hover and focus border rules overrode the red error border, because they had higher specificity. The invalid rule is now `.field.invalid input`, so the border stays red on hover and focus. The focus ring still shows outside it. This predated Phase 8.
3. **Disabled buttons** used `opacity: 0.55`. They now have an explicit neutral treatment (ink-100 background, ink-600 text at 5.51:1).

### Files changed
- **Tokens and global styles:** `src/styles/tokens.css` (colour section rewritten) and `src/styles/globals.css` (page background, links, selection).
- **Layout and UI:** `src/components/ui/Button.module.css`, `layout/SiteHeader.module.css`, `PageHeader.module.css`, `Section.module.css`.
- **Sections:** `Hero`, `PathwayCard`, `ProductCard` (`.module.css` and `.tsx`), `CapabilityComparison`, `ProcessSteps`, `ServiceCard`.
- **Contact:** `contact/ContactForm.module.css`, `ContactEnquiry.module.css` and `ContactEnquiry.tsx`.
- **Visuals:** `visuals/Illustration.module.css`, `InteractionConcept.module.css`, `PillarsIllustration.tsx`, `PhoneToPhoneIllustration.tsx`, `ServicesIllustration.tsx`, `PhoneOutline.tsx`.
- **Page CSS:** `src/app/services/page.module.css`.
- **Docs:** this file and `README.md`.
- **Not changed (verified):** the 7 brand files match their pre-Phase-8 sha256 hashes byte for byte:
  - `public/brand/focustrigger-automation-logo.png`
  - `assets/brand/…-cropped-original.png`
  - `src/app/favicon.ico`, `icon.png`, `apple-icon.png`, `opengraph-image.png`, `opengraph-image.alt.txt`

### Test results (executed in Chromium via Playwright, on this environment's production builds)
| Check | Result |
| --- | --- |
| `npm run typecheck`, `npm run lint`, clean `npm run build` | 0 errors; 0 problems; success (15 static routes) |
| **Phase 8 suite (new):** no legacy blue, old-teal or slate colour in any computed colour, border, fill, stroke, shadow or gradient, including pseudo-elements, on 7 routes × 3 widths (1440, 834, 375), with FAQ items and menus open | **21/21 clean.** A negative control (injected `#0B5FFF` and `#CBD5E1`) was detected, confirming the scanner works. |
| **Phase 8 suite:** axe `color-contrast` at 3 widths × 7 routes, in the default state, with details open, with the menu or submenu open, and with an enquiry selected | **0 violations** (66 scans) |
| **Phase 8 suite:** focus ring ≥ 3:1 against adjacent colours at every tab stop, 7 routes at 1440 and 375 px | **14/14** |
| **Phase 8 suite:** hover, active and disabled states, plus 19 token pairs | **37/37** (total 138/138) |
| Form states, measured live (temporary mock-endpoint build, not committed) | **13/13** |
| Contact-form suite (same temporary build) | **28/28** |
| Hero text contrast against rendered pixels (`hero-contrast.js`; 7 routes × 1440, 834, 375 and 320 px) | Worst case **6.33:1**; no failures |
| Phase 7 suite (CSP and security headers at 3 widths, CSP during interaction, axe full rule set, share metadata) | **69/69** |
| Phase 1–6 regression suites | 88/88, 63/63, 97/97, 57/57, 177/177, 134/134. **No test assertions were changed.** |
| Production guard: `npm run build:production` with no `NEXT_PUBLIC_SITE_URL` | Refused (exit 1), as designed |
| Final build output | 0 occurrences of the mock endpoint `localhost:3999` |
| Source scan | No hex colours outside `tokens.css`, except the two exceptions under Limitations |
| Lighthouse 13.6 spot-check (local `next start`, default mobile preset) | `/`: 86 / 100 / 100 / 100. `/products/focustag` and `/contact`: 100 / 100 / 100 / 100. |
| Before and after screenshots: 7 routes × 1440, 834, 375 (full page and first screen) | Captured before any edits (at `35f1dd8`) and after. Reviewed side by side. |

Two fixes were made to the new Phase 8 script's own harness, not to any assertion:
- background parsing became null-safe;
- the click that a mouse press and release triggers while sampling `:active` is now prevented, so the page doesn't navigate away mid-check.

**Not verified (not run here):** Firefox, Safari/WebKit, real phones and tablets, screen readers, and Windows High Contrast / forced-colours rendering. Colour perception on real displays is also unchecked.

### Limitations and notes
- **Hard-coded colours outside `tokens.css`:**
  - `themeColor: "#ffffff"` in `src/app/layout.tsx`: metadata can't read CSS variables. It matches the white header.
  - The select chevron in `ContactForm.module.css` is a data-URI SVG with `#45403A` (ink-700), because data URIs can't read CSS variables.
- **Home Lighthouse Performance** was 86 on this run (93 in Phase 7). The difference is Total Blocking Time in the simulated mobile run. Phase 8 changed no scripts, only CSS and SVG class names. Treat it as lab variance, not field data.
- The **logo teal** (`#34A487`) is used only where contrast rules allow: rules, icon accents and large fills. Text and buttons use the darker teal-700 and teal-800 from the same hue.

## Missing information register

Placeholders: `[REQUIRES COMPANY CONFIRMATION]`, `[PRODUCT CAPABILITY TO BE VERIFIED]`, `[REAL CLIENT CASE STUDY NEEDED]`, `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]`.

| # | Item | Status | Needed by |
| --- | --- | --- | --- |
| 1 | Approved logo and favicon | **Done (Phase 6).** The official logo is in the header and footer; the favicon and app icons are cut from its icon mark. Open: a higher-resolution or vector original, and a decision on the "Focustrigger" lettering (see Phase 6 → Decisions). | Optional |
| 2 | FocusTag capabilities that work today | **Confirmed:** phone-to-phone NFC interaction with QR fallback. Anything further is `[PRODUCT CAPABILITY TO BE VERIFIED]`. | Phase 3 |
| 3 | FocusTag roadmap / planned features | Only the vision themes are published: smart-campus productivity and spatial compliance. Any specific planned features, timelines or workflows are `[PRODUCT CAPABILITY TO BE VERIFIED]`. | Before publication |
| 4 | FocusTag screenshots, product photos or diagrams | `[APPROVED SCREENSHOT OR DIAGRAM NEEDED]`. Original illustrations labelled as concepts are used meanwhile. | Before publication |
| 5 | Software service categories (3–5) | `[REQUIRES COMPANY CONFIRMATION]`. `/services` shows only two broad areas (Software solutions, Technology services). Add confirmed categories to `serviceAreas` in `src/content/services.ts`. | Before publication |
| 6 | Technology stack or expertise to list publicly | `[REQUIRES COMPANY CONFIRMATION]`. No technologies are listed. The engineering section cites only the confirmed FocusTag model. | Before publication |
| 7 | Delivery process actually followed | `[REQUIRES COMPANY CONFIRMATION]`. `/services` shows a modest three-step "How engagements begin" outline, and no methodology, timelines or guarantees. | Before publication |
| 8 | Approved public projects or case studies | `[REAL CLIENT CASE STUDY NEEDED]`. `/work` is not built and has no navigation link; it returns 404. | Before any Work page |
| 9 | Company description, founding details, location, team | `[REQUIRES COMPANY CONFIRMATION]`. `/about` uses only the legal name, the two pillars and confirmed FocusTag facts. | Optional for launch |
| 10 | Contact email, phone, registered address, CIN | **Email confirmed:** `focustriggerautomation@gmail.com` (general company contact, in `site.contact.email`). Phone, address and CIN are still `[REQUIRES COMPANY CONFIRMATION]` and remain `null`. A privacy or grievance contact (`site.contact.privacyEmail`) is also unconfirmed. | Phone and address optional; privacy contact is part of the policy review |
| 11 | Contact form delivery method and endpoint | Not provided. The form is built and tested, but hidden until `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is set. Email is the working channel meanwhile. | Optional (no longer a blocker) |
| 12 | Privacy Policy legal review; decision on Terms of Use | The policy is a **draft awaiting approval**; see Phase 5 → Privacy Policy. No Terms of Use page. | **Launch blocker** |
| 13 | Production domain and hosting provider (`NEXT_PUBLIC_SITE_URL`) | Not provided. The site is ready to use one (proven with the reserved test domain `https://www.example.com` in a temporary build); `npm run build:production` refuses to build without a real HTTPS domain. | **Launch blocker** |
| 14 | Social profile URLs, if any should appear | Not provided. None are shown. | Optional |

## Decisions and notes
- **Phases and commits:** the phase-gated roadmap takes precedence over the specification's "proceed without approval" and "do not commit" instructions. Work is committed and pushed to `claude/sleepy-lamport-nxwwzr` at the end of each approved phase. There is no pull request and no deployment.
- **Reference websites:** they could not be reached from the build environment because the network proxy refused the connections. The design follows the written guidance in the specification only.
- **Header:** Contact is shown as the header's button instead of a plain link, which meets both "Contact in primary navigation" and "one restrained CTA".
- **Desktop submenu:** it opens on click or keyboard, not on hover, so its expanded state is always reported accurately and works the same for every input method.
- **Contrast (Phase 8 palette):** `--color-text-muted` (#655D55) passes AA on white, cream-soft and cream (5.4:1 or better). Never use the logo teal (`--brand-teal`, `--color-accent`, #34A487) for text or as a background behind white text. It is 3.09:1 on white and 2.60:1 on cream. Use `--color-primary` (teal-700) or `--color-accent-strong` (teal-800) instead.
- **Copyright year:** the footer year is fixed when the site is built, because pages are prerendered. Rebuilding updates it.
- **Stub pages:** they contain temporary, general copy only. Each is replaced in its phase.
