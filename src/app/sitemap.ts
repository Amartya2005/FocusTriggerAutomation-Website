import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Public routes. Add a route here when a new page is published. */
export const publicRoutes = ["/", "/products", "/products/focustag", "/services", "/about", "/contact", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({ url: `${site.url}${route === "/" ? "" : route}` }));
}
