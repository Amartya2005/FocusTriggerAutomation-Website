/**
 * Company identity, navigation and contact configuration shared by every page.
 *
 * Contact fields are deliberately `null` until the company confirms them.
 * Components must not render a field that is `null` — never substitute a guess.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export type FooterGroup = {
  heading: string;
  links: NavLink[];
};

/**
 * Canonical origin from NEXT_PUBLIC_SITE_URL (read at build time). Trailing
 * slashes are removed so `${site.url}/path` never contains `//`. A value that
 * is set but is not an absolute http(s) URL fails the build. When unset, local
 * development falls back to localhost — production builds must set it (see
 * `npm run build:production` and README → Deploying to production).
 */
function resolveSiteUrl(value: string | undefined): string {
  const raw = value?.trim();
  if (!raw) return "http://localhost:3000";
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error(`NEXT_PUBLIC_SITE_URL must be an absolute URL such as https://www.your-domain.example (got "${raw}").`);
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error(`NEXT_PUBLIC_SITE_URL must use http(s) (got "${raw}").`);
  }
  return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
}

export const site = {
  legalName: "FocusTrigger Automation Private Limited",
  name: "FocusTrigger",
  productName: "FocusTag",
  description:
    "FocusTrigger Automation Private Limited builds proprietary technology products, beginning with FocusTag, and provides software solutions and technology services for clients.",
  /** Canonical origin; set NEXT_PUBLIC_SITE_URL in each deployment environment. */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "en_IN",
  /** Official logo supplied by the company (background removed; artwork unchanged). */
  logo: {
    src: "/brand/focustrigger-automation-logo.png",
    width: 659,
    height: 186,
    alt: "FocusTrigger Automation",
  },
  contact: {
    /** Confirmed general company contact address (not a designated privacy/grievance contact). */
    email: "focustriggerautomation@gmail.com" as string | null,
    phone: null as string | null, // [REQUIRES COMPANY CONFIRMATION]
    address: null as string | null, // [REQUIRES COMPANY CONFIRMATION]
    /** Designated privacy/grievance contact — only set once separately confirmed. */
    privacyEmail: null as string | null, // [REQUIRES COMPANY CONFIRMATION]
    /**
     * Public URL that accepts enquiry-form POSTs (JSON). The contact form is
     * only rendered when this is set; it must not embed a secret key.
     * Set NEXT_PUBLIC_CONTACT_FORM_ENDPOINT at build time once approved.
     */
    formEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || null,
  },
} as const;

export const primaryNav: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "All products", href: "/products", description: "Products built by FocusTrigger" },
      { label: "FocusTag", href: "/products/focustag", description: "Phone-to-phone NFC with QR fallback" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

/** Rendered as the header's call-to-action rather than a plain nav link. */
export const headerCta: NavLink = { label: "Contact", href: "/contact" };

export const footerGroups: FooterGroup[] = [
  {
    heading: "Products",
    links: [
      { label: "Products overview", href: "/products" },
      { label: "FocusTag", href: "/products/focustag" },
    ],
  },
  {
    heading: "Services",
    links: [{ label: "Software Solutions & Services", href: "/services" }],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [{ label: "Privacy Policy", href: "/privacy-policy" }],
  },
];

/** True when `href` is the current page or a parent section of it. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
