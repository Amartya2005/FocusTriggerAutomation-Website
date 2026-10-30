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

| Command                     | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`               | Development server                                                      |
| `npm run build`             | Local or test build. It warns if `NEXT_PUBLIC_SITE_URL` is unset; **don't deploy** that build. |
| `npm run build:production`  | **Deployment build.** It checks the environment, builds, then scans the output, and fails on a missing or non-HTTPS domain or on localhost, example or test URLs. |
| `npm run verify:production` | Re-runs the environment and output checks against an existing build.  |
| `npm run start`             | Serves the build (`next start`) with the security headers.             |
| `npm run lint`              | ESLint (Next.js core-web-vitals + TypeScript)                          |
| `npm run typecheck`         | TypeScript type-check without emitting                                 |

## Environment

Copy `.env.example` to `.env.local` for local work, or set these in the hosting provider's build settings.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, for production** | The canonical HTTPS origin, for example `https://www.<domain>`. It drives canonical URLs, Open Graph and Twitter URLs, `sitemap.xml`, `robots.txt` and the structured data. A trailing slash is removed automatically, and an invalid value fails the build. When unset, it falls back to `http://localhost:3000`. |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | No | A public HTTPS URL that accepts enquiry-form submissions as a JSON POST, without a secret key. The contact form appears only when this is set, and its origin is added to the CSP `connect-src`. The Privacy Policy's form section changes when it is set, so it must be reviewed first. Currently unset: email is the contact channel. |

Both variables are **read at build time**. After changing them, rebuild and redeploy.

## Deploying to production

**Status: not deployed, and launch is not approved.** See [Launch checklist](#launch-checklist). No domain or hosting provider has been chosen, so nothing below assumes a specific provider.

### Requirements
- Node.js **20.9 or later**. The site was built and tested with Node 22.
- **A host that runs Next.js**, either `next start` on a Node server or a platform with native Next.js support. All pages are pre-rendered static HTML, but the security headers in `next.config.ts` are applied by the Next.js server.
- **A static-only host** would also work if you set `output: "export"`. In that case the host must be configured to send the same security headers, because `next.config.ts` headers are not applied to a static export.
- No database, background jobs or server secrets are needed.

### Build and run
1. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (exactly one canonical host, for example `https://www.<domain>`).
2. Install dependencies:

```bash
npm ci
```

3. Build. This stops if the domain is missing, not HTTPS, or a placeholder, and stops if the output contains localhost or test URLs:

```bash
npm run build:production
```

4. Serve on the host's port:

```bash
npm run start -- -p "${PORT:-3000}"
```

### Host and DNS settings (outside this repository)
- Serve over HTTPS, and redirect HTTP to HTTPS.
- Choose one canonical host (`www` or the bare domain), set `NEXT_PUBLIC_SITE_URL` to it, and 301-redirect the other one to it.
- Add `Strict-Transport-Security` at the host or CDN once HTTPS is confirmed. The app deliberately doesn't send it.
- Keep the security headers from `next.config.ts`. If a CDN or proxy sits in front, make sure it passes them through.

### Security headers sent by the app
These are sent on every response by `next start`:
- `Content-Security-Policy`: `default-src 'self'`; scripts and styles from self with `'unsafe-inline'` (needed for Next.js on pre-rendered pages); images from self and `data:`; fonts from self; `connect-src` self, plus the form origin if one is configured; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`; `object-src 'none'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

`X-Powered-By` is disabled.

### Verifying a deployment
1. Each of the 7 routes returns 200, and an unknown path returns 404.
2. View the page source. The canonical URL, `og:url` and `og:image` use the production domain, and nothing says `localhost`.
3. `/robots.txt` and `/sitemap.xml` use the production domain, and the sitemap lists exactly 7 URLs.
4. The response headers include the security headers above.
5. The logo, favicon, `/icon.png`, `/apple-icon.png` and `/opengraph-image.png` all load.
6. Clicking the email link on `/contact` opens a new email to `focustriggerautomation@gmail.com`. Send a test message and confirm it arrives.
7. `/contact` shows no form while `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` is unset.

## Rollback

- The site is stateless: there is no database, no migrations and no user data stored by the site, so rolling back means redeploying an earlier build.
- **Before each release**, record the commit SHA you're deploying, and keep the previous build or deployment available. Most hosts keep previous deployments; on a self-managed server, keep the previous `.next` build directory.
- **To roll back:** redeploy the last known-good commit or build with the **same** environment variables, then repeat the "Verifying a deployment" checks.
- **Domain or DNS rollback:** keep the old DNS records and TTLs documented before switching, so DNS changes can be reverted.
- **After any change to environment variables,** rebuild. A rollback that changes those variables also needs a rebuild.

## Launch checklist

Statuses are kept up to date in `IMPLEMENTATION_NOTES.md` → Phase 7.

1. ⛔ **Domain and hosting:** choose a provider, confirm the domain, configure HTTPS and the canonical-host redirect, and add HSTS.
2. ⛔ **Production environment:** set `NEXT_PUBLIC_SITE_URL` to the real HTTPS origin, then run `npm run build:production` until it passes.
3. ⏳ **Privacy Policy:** company and legal review and approval, including designating the privacy or grievance contact.
4. ⛔ **Cross-browser, device and accessibility checks:** Firefox, Safari/WebKit, real iOS and Android devices, and screen readers (NVDA or JAWS, VoiceOver, TalkBack).
5. ⏳ **Contact channel:** send a real email to the address and confirm it arrives. Also decide whether to add a form endpoint now or later.
6. ⏳ **Release record:** record the commit SHA and the previous deployment for rollback.
7. ⛔ **Deploy and run the post-deploy checks** in "Verifying a deployment".
8. ⏳ **Launch approval:** explicit sign-off from the company after items 1–7.

## Company details and branding

- **Company details:** these live in `src/lib/site.ts` and nowhere else.
  - `contact.email` is the confirmed general company address, `focustriggerautomation@gmail.com`. It appears in the footer and on the Contact page.
  - `contact.phone`, `contact.address` and `contact.privacyEmail` stay `null` until confirmed. The general email is **not** used as a privacy or grievance contact.
- **Official logo:**
  - The web version is `public/brand/focustrigger-automation-logo.png`. Only the background was removed; the artwork is unchanged.
  - The untouched cropped original is `assets/brand/focustrigger-automation-logo-cropped-original.png`.
  - The favicon and app icons (`src/app/favicon.ico`, `icon.png`, `apple-icon.png`) are cut from the logo's icon mark and sit on the logo's own cream background.
  - `scripts/make-brand-assets.py` (Python 3 with Pillow and NumPy) regenerates all of these from the supplied artwork.
- **Brand colours:** every colour is a token in `src/styles/tokens.css`. The palette is derived from the logo's sampled teal `#34A487`, black `#000000` and cream `#F9E9D7`. Components use the semantic tokens (`--color-primary`, `--color-surface-cream`, `--button-*`, `--illus-*` and so on), never raw hex. The logo teal is decorative only: use teal-700 (`--color-primary`) for text and buttons. The full palette, rules and contrast results are in `IMPLEMENTATION_NOTES.md` → Phase 8.
- **Search files:** `robots.txt` and `sitemap.xml` are generated from `src/app/robots.ts` and `src/app/sitemap.ts`. The root layout includes Organization structured data, using confirmed facts only.
- **Share image:** `src/app/opengraph-image.png` is the unmodified logo centred on its own background, at 1200×630. It is added to every page through `pageMetadata()`.

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
scripts/               make-brand-assets.py (brand assets) · verify-production.mjs (launch guard)
```

## Content rules

Company facts, product capabilities, services, clients and contact details must come from approved sources. Open items are tracked in [`IMPLEMENTATION_NOTES.md`](./IMPLEMENTATION_NOTES.md).
