import type { Metadata } from "next";
import { site } from "./site";

type PageMetadataInput = {
  /** Page title; the root layout appends " | FocusTrigger Automation". */
  title: string;
  description: string;
  /** Route path starting with "/", used for the canonical URL. */
  path: string;
};

/**
 * Social share image (src/app/opengraph-image.png — the official logo on its
 * own background). Listed explicitly because a page-level `openGraph` object
 * replaces the root one, which would otherwise drop the file-based image.
 */
export const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "FocusTrigger Automation logo",
};

/** Per-page metadata with a canonical URL and matching Open Graph / Twitter fields. */
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
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", images: [shareImage.url] },
  };
}
