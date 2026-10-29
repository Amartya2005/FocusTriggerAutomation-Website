/**
 * Homepage copy. Keep every statement within what the company has confirmed:
 * - FocusTag is associated with NFC- and QR-enabled interactions.
 * - Confirmed interaction model: phone-to-phone NFC, with QR as a fallback.
 *   Do not describe physical tags, printed codes, location/object
 *   identification or post-interaction outcomes unless confirmed.
 * - Smart-campus productivity and spatial compliance are product *direction*,
 *   not current capabilities.
 * - Specific software service categories are not yet confirmed, so services
 *   are described broadly. See IMPLEMENTATION_NOTES.md before adding detail.
 */

import { focustag, focustagContactHref } from "./focustag";
import { softwareContactHref } from "./services";

export type LinkAction = { label: string; href: string };

export const contactLinks = {
  focustag: focustagContactHref,
  software: softwareContactHref,
} as const;

export const hero = {
  eyebrow: "Products · Software solutions",
  title: "Technology products we own. Software we build for clients.",
  lead:
    "FocusTrigger Automation Private Limited builds proprietary products, beginning with FocusTag for NFC- and QR-enabled interactions, and delivers software solutions and technology services for clients.",
  primary: { label: "Explore FocusTag", href: "/products/focustag" },
  secondary: { label: "Discuss a project", href: contactLinks.software },
};

export type Pathway = {
  id: "products" | "services";
  index: string;
  label: string;
  title: string;
  description: string;
  audience: string;
  primary: LinkAction;
  secondary: LinkAction;
};

export const pathwaysIntro = {
  eyebrow: "What we do",
  title: "Two connected areas of work",
  lead: "FocusTrigger is one technology company with two pillars. Choose the path that matches what you are looking for.",
};

export const pathways: Pathway[] = [
  {
    id: "products",
    index: "01",
    label: "Proprietary products",
    title: "Products built and owned by FocusTrigger",
    description: "Our product work begins with FocusTag, a product built around NFC- and QR-enabled interactions.",
    audience:
      "Educational institutions and organisations interested in phone-based NFC and QR interactions and smart-campus ideas.",
    primary: { label: "Explore FocusTag", href: "/products/focustag" },
    secondary: { label: "All products", href: "/products" },
  },
  {
    id: "services",
    index: "02",
    label: "Software solutions & services",
    title: "Software developed for your organisation",
    description:
      "We develop software solutions and provide technology services for clients who need software built around their requirements.",
    audience: "Businesses that need software developed, startups turning a product idea into software, and prospective partners.",
    primary: { label: "Explore services", href: "/services" },
    secondary: { label: "Discuss a project", href: contactLinks.software },
  },
];

export const spotlight = {
  eyebrow: "Product spotlight",
  title: "FocusTag",
  lead:
    "FocusTag is FocusTrigger’s first proprietary product. It supports phone-to-phone NFC interaction, with a QR code available as a fallback.",
  conceptLabel: focustag.interactionModelLabel,
  methods: focustag.interactionMethods,
  direction: {
    label: "Product direction",
    text: "FocusTag’s broader vision relates to smart-campus productivity and spatial compliance. The FocusTag page separates what is available today from what is planned.",
  },
  primary: { label: "Explore FocusTag", href: "/products/focustag" },
  secondary: { label: "Ask about FocusTag", href: contactLinks.focustag },
};

export const servicesOverview = {
  eyebrow: "Software solutions & services",
  title: "Software built around your requirements",
  lead:
    "Alongside its own products, FocusTrigger develops software solutions and provides technology services for clients.",
  startingPointsTitle: "Common starting points",
  startingPoints: [
    { title: "You have a product idea", text: "and need help turning it into working software." },
    { title: "Your organisation needs software", text: "built around its processes and requirements." },
    { title: "You are considering a technology partnership", text: "and want to discuss how to collaborate." },
  ],
  primary: { label: "Explore services", href: "/services" },
  secondary: { label: "Discuss a project", href: contactLinks.software },
};

/** [REQUIRES COMPANY CONFIRMATION] — approach statements, see IMPLEMENTATION_NOTES.md. */
export const approach = {
  eyebrow: "How we work",
  title: "Product thinking, applied to client work",
  lead: "FocusTrigger builds its own product and builds software for clients. The same principles guide both.",
  principles: [
    {
      title: "Understand the context first",
      text: "Work starts with the problem, the people involved and the environment the software has to operate in.",
    },
    {
      title: "Be clear about what exists",
      text: "We describe what is available today separately from what is planned, for our product and for client work.",
    },
    {
      title: "Build in reviewable steps",
      text: "Work is shaped in stages so that decisions can be checked and adjusted along the way.",
    },
  ],
};

export const closingCta = {
  title: "Start a conversation",
  lead: "Tell us whether you are interested in FocusTag or have a software project in mind.",
  routes: [
    {
      title: "Interested in FocusTag?",
      text: "Ask about demonstrations, pilots or how FocusTag could fit your context.",
      action: { label: "Ask about FocusTag", href: contactLinks.focustag },
    },
    {
      title: "Have a software project?",
      text: "Share what you need built and the context it is for.",
      action: { label: "Discuss a project", href: contactLinks.software },
    },
  ],
};
