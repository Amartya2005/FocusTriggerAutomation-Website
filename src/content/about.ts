/**
 * About page copy. Company facts only — no founding date, history, team,
 * location, customers or achievements until the company confirms them.
 */

import { focustag } from "./focustag";
import { site } from "@/lib/site";

export const aboutPage = {
  hero: {
    eyebrow: "About",
    title: "About FocusTrigger",
    lead: `${site.legalName} is a technology company. It builds its own products and develops software solutions for clients.`,
  },
  pillars: {
    eyebrow: "What we do",
    title: "One company, two connected pillars",
    lead: "Product development and client work sit within the same company. FocusTag, FocusTrigger’s own product, is developed by the same company that builds software for clients.",
  },
  product: {
    eyebrow: "Our product",
    title: focustag.name,
    lead: `${focustag.summary} Its current functionality is listed separately from its broader product vision.`,
  },
  glance: {
    eyebrow: "At a glance",
    title: "Company details",
    items: [
      { term: "Company name", detail: site.legalName },
      { term: "Short name", detail: site.name },
      { term: "Current product", detail: focustag.name },
      { term: "Areas of work", detail: "Proprietary products; software solutions and technology services" },
    ],
  },
  cta: {
    title: "Continue exploring",
    lead: "Learn more about FocusTag or find out how to get in touch.",
  },
};
