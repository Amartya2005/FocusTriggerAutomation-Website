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

## Project structure

```
src/
  app/                 Routes (one folder per page) and the root layout
  components/
    contact/           ContactEnquiry (enquiry-type chooser) and ContactForm
    layout/            Container, Section, PageHeader, Prose, SiteHeader, SiteFooter
    sections/          Hero, SectionHeading, PathwayCard, ProductCard, CapabilityComparison, ServiceCard, ProcessSteps, PrincipleList, FaqList, CTASection
    ui/                Button, Eyebrow, Breadcrumbs and other primitives
    visuals/           Original illustrations and concept diagrams (labelled as illustrative)
  content/             Page copy, confirmed product facts (focustag.ts) and service areas (services.ts), kept separate from layout
  lib/
    site.ts            Company identity, navigation and contact configuration
    metadata.ts        Per-page metadata helper
  styles/
    tokens.css         Design tokens (colour, type, spacing, radius, motion)
    globals.css        Reset, base typography, focus and reduced-motion rules
```

## Content rules

Company facts, product capabilities, services, clients and contact details must come from approved sources. Open items are tracked in [`IMPLEMENTATION_NOTES.md`](./IMPLEMENTATION_NOTES.md).
