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

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the deployed origin.

## Project structure

```
src/
  app/                 Routes (one folder per page) and the root layout
  components/
    layout/            Container, Section, PageHeader, SiteHeader, SiteFooter
    ui/                Button and other primitives
  lib/
    site.ts            Company identity, navigation and contact configuration
    metadata.ts        Per-page metadata helper
  styles/
    tokens.css         Design tokens (colour, type, spacing, radius, motion)
    globals.css        Reset, base typography, focus and reduced-motion rules
```

## Content rules

Company facts, product capabilities, services, clients and contact details must come from approved sources. Open items are tracked in [`IMPLEMENTATION_NOTES.md`](./IMPLEMENTATION_NOTES.md).
