import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const formEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim();

if (isProduction && !siteUrl) {
  console.warn(
    "\n⚠  NEXT_PUBLIC_SITE_URL is not set: canonical URLs, Open Graph URLs, sitemap.xml, robots.txt and\n" +
      "   structured data will point to http://localhost:3000. Fine for local testing; never deploy this build.\n" +
      "   Use `npm run build:production` with the real domain for deployment.\n",
  );
}

/** Origin the enquiry form may POST to (only when an endpoint is configured). */
function formOrigin(): string {
  if (!formEndpoint) return "";
  try {
    return new URL(formEndpoint).origin;
  } catch {
    return "";
  }
}

// 'unsafe-inline' is required for Next's inline bootstrap scripts on statically
// rendered pages (a nonce-based CSP would force dynamic rendering). Everything
// else is restricted to this origin. Dev mode also needs eval for fast refresh.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${formOrigin()}${isProduction ? "" : " ws: wss:"}`.trim(),
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS is deliberately left to the HTTPS host/CDN once the production domain exists.
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
