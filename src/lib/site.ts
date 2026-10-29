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

export const site = {
  legalName: "FocusTrigger Automation Private Limited",
  name: "FocusTrigger",
  productName: "FocusTag",
  description:
    "FocusTrigger Automation Private Limited builds proprietary technology products, beginning with FocusTag, and provides software solutions and technology services for clients.",
  /** Canonical origin; set NEXT_PUBLIC_SITE_URL in each deployment environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
  contact: {
    email: null as string | null, // [REQUIRES COMPANY CONFIRMATION]
    phone: null as string | null, // [REQUIRES COMPANY CONFIRMATION]
    address: null as string | null, // [REQUIRES COMPANY CONFIRMATION]
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
