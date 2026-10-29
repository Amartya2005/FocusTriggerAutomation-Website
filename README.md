# FocusTrigger Automation — Website

Official website of **FocusTrigger Automation Private Limited**, presenting its proprietary products (beginning with **FocusTag**) and its software solutions and services.

## Stack

- [Next.js](https://nextjs.org/) (App Router) with React and TypeScript (strict)
- CSS Modules with a single design-token file: `src/styles/tokens.css`
- Inter, self-hosted at build time via `next/font`
- No backend, database, CMS or analytics

## Getting started

Requires Node.js 20.9 or later.

```bash
npm install
```

```bash
npm run dev
```

The site runs at http://localhost:3000.

## Scripts

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Development server                       |
| `npm run build`     | Production build                         |
| `npm run start`     | Serve the production build               |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TS)    |
| `npm run typecheck` | TypeScript type-check without emitting   |

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`: the deployed origin.
- `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` (optional): a public URL that accepts enquiry-form submissions as a JSON POST. The contact form appears only when this is set, so leave it unset until an approved service exists. The Privacy Policy changes when it is set and must be reviewed first.

Both are read at build time, so rebuild after changing them.

## Company details and branding

- **Company details:** these live in `src/lib/site.ts` and nowhere else.
  - `contact.email` is the confirmed general company address, `focustriggerautomation@gmail.com`. It appears in the footer and on the Contact page.
  - `contact.phone`, `contact.address` and `contact.privacyEmail` stay `null` until confirmed. The general email is **not** used as a privacy or grievance contact.
- **Official logo:**
  - The web version is `public/brand/focustrigger-automation-logo.png`. Only the background was removed; the artwork is unchanged.
  - The untouched cropped original is `assets/brand/focustrigger-automation-logo-cropped-original.png`.
  - The favicon and app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) are cut from the logo's icon mark and sit on the logo's own cream background.
  - `scripts/make-brand-assets.py` (Python 3 with Pillow and NumPy) regenerates all of these from the supplied artwork.
- **Search files:** `robots.txt` and `sitemap.xml` are generated from `src/app/robots.ts` and `src/app/sitemap.ts`. The root layout includes Organization structured data, using confirmed facts only.

## Project structure

```
src/
  app/                 Routes (one folder per page) and the root layout
  components/
    contact/           ContactEnquiry (enquiry-type chooser) and ContactForm
    layout/            Container, Section, PageHeader, Prose, SiteHeader, SiteFooter
    sections/          Hero, SectionHeading, PathwayCard, ProductCard, CapabilityComparison, ServiceCard, ProcessSteps, PrincipleList, FaqList, CTASection
    ui/                Button, Eyebrow, Breadcrumbs, Logo and other primitives
    visuals/           Original illustrations and concept diagrams (labelled as illustrative)
  content/             Page copy, confirmed product facts (focustag.ts) and service areas (services.ts), kept separate from layout
  lib/
    site.ts            Company identity, navigation and contact configuration
    metadata.ts        Per-page metadata helper
  styles/
    tokens.css         Design tokens (colour, type, spacing, radius, motion)
    globals.css        Reset, base typography, focus and reduced-motion rules
public/brand/          Web logo asset
assets/brand/          Unmodified cropped original logo (source of truth, not served)
scripts/               Dev-only tooling (brand asset derivation)
```

## Content rules

Company facts, product capabilities, services, clients and contact details must come from approved sources. Open items are tracked in [`IMPLEMENTATION_NOTES.md`](./IMPLEMENTATION_NOTES.md).
