import type { Metadata } from "next";
import { site } from "./site";

type PageMetadataInput = {
  /** Page title; the root layout appends " | FocusTrigger Automation". */
  title: string;
  description: string;
  /** Route path starting with "/", used for the canonical URL. */
  path: string;
};

/** Per-page metadata with a canonical URL and matching Open Graph fields. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name} Automation`,
      description,
      url: path,
      siteName: site.legalName,
      locale: site.locale,
      type: "website",
    },
  };
}
