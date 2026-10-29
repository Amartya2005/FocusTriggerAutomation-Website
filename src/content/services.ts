/**
 * Software Solutions & Services page copy.
 *
 * Confirmed by the company:
 *   - FocusTrigger provides software solutions and technology services to clients.
 *   - FocusTrigger develops its own products, beginning with FocusTag
 *     (direct phone-to-phone NFC interaction with QR fallback).
 * Not yet confirmed — do not publish as established offerings:
 *   - specific service categories (custom software, web/mobile apps, MVPs,
 *     integrations, cloud/backend, AI, IoT, …)
 *   - technology stack / expertise list
 *   - delivery methodology, timelines, guarantees, clients or results
 * See IMPLEMENTATION_NOTES.md → Phase 4.
 */

import { focustag } from "./focustag";

export const softwareContactHref = "/contact?enquiry=software";

export type ServiceArea = {
  title: string;
  description: string;
  /** Optional confirmed examples of work within this area. */
  examples?: readonly string[];
};

/**
 * Service areas rendered on /services. The page renders whatever is listed
 * here, so confirmed categories can be added (or replace these broad areas)
 * without changing the page structure. Add only company-confirmed offerings.
 */
export const serviceAreas: readonly ServiceArea[] = [
  {
    title: "Software solutions",
    description: "Software designed and developed around a client’s requirements, scoped for each project.",
  },
  {
    title: "Technology services",
    description: "Technology work for client organisations, agreed according to what each engagement needs.",
  },
];

export const servicesPage = {
  hero: {
    eyebrow: "Software Solutions & Services",
    title: "Turn your requirements into working software.",
    lead: "FocusTrigger Automation Private Limited develops software solutions and provides technology services for clients — and builds its own products, beginning with FocusTag.",
  },
  positioning: {
    eyebrow: "Who we are",
    title: "A technology company that builds for clients and for itself",
    paragraphs: [
      "FocusTrigger works across two connected pillars. Client work is one of them: developing software solutions and providing technology services for organisations that need software built.",
      "The other is product development. FocusTrigger builds and owns its own products, beginning with FocusTag.",
    ],
    pillars: [
      {
        label: "Software solutions & services",
        text: "Software developed for client organisations.",
        current: true,
      },
      {
        label: "Proprietary products",
        text: "Products built by FocusTrigger, beginning with FocusTag.",
        href: "/products",
        linkLabel: "Explore products",
      },
    ],
  },
  overview: {
    eyebrow: "What we offer",
    title: "Services shaped around your project",
    lead: "Our client work covers two broad areas. Tell us what you need and we can discuss how it fits.",
  },
  audiences: {
    eyebrow: "Who we work with",
    title: "Is this a fit for you?",
    lead: "Our services are intended for organisations at different starting points.",
    /** [REQUIRES COMPANY CONFIRMATION] — derived from the specification’s key audiences. */
    items: [
      { title: "Businesses", text: "Organisations that need software developed around their processes and requirements." },
      { title: "Startups", text: "Teams turning a product idea into working software." },
      { title: "Partners", text: "Organisations exploring an institutional or technology partnership." },
    ],
  },
  engineering: {
    eyebrow: "Engineering experience",
    title: "Experience from building our own product",
    lead: "FocusTrigger builds its own product, FocusTag. That product work is direct, first-hand engineering experience.",
    evidence: {
      label: "From FocusTag",
      title: "Phone-based NFC and QR interaction",
      text: focustag.summary,
      href: focustag.href,
      linkLabel: "Explore FocusTag",
    },
  },
  /** [REQUIRES COMPANY CONFIRMATION] — engagement outline; no formal methodology is claimed. */
  engagement: {
    eyebrow: "How engagements begin",
    title: "From first conversation to agreed next steps",
    lead: "Every engagement starts with understanding what you need.",
    steps: [
      { title: "Share your requirement", text: "Tell us what you need built and the context it is for." },
      { title: "Discuss the context", text: "We talk through the problem, the people involved and any constraints." },
      { title: "Agree the next step", text: "Scope and next steps are agreed with you before work begins." },
    ],
  },
  faq: [
    {
      question: "What kinds of software does FocusTrigger develop?",
      answer:
        "Each project is shaped around the client’s requirements. The best way to find out whether your project is a fit is to describe it to us.",
    },
    {
      question: "Can startups discuss an early product idea?",
      answer: "Yes. If you are turning a product idea into software, you can discuss it with us.",
    },
    {
      question: "How is FocusTag related to your services?",
      answer:
        "FocusTag is FocusTrigger’s own product and is separate from client projects. Both are part of the same company.",
    },
  ],
  cta: {
    title: "Discuss your project",
    lead: "Tell us what you need built and the context it is for.",
    route: {
      title: "Have a software project in mind?",
      text: "Start a project enquiry with FocusTrigger.",
      action: { label: "Discuss a project", href: softwareContactHref },
    },
  },
};
