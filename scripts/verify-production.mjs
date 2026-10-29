#!/usr/bin/env node
/**
 * Production launch guard (no dependencies).
 *
 *   node scripts/verify-production.mjs               env + build-output checks
 *   node scripts/verify-production.mjs --env-only     before `next build`
 *   node scripts/verify-production.mjs --output-only  after `next build`
 *
 * Fails (exit 1) when the production configuration or the rendered output is
 * not safe to deploy: missing/non-HTTPS/placeholder NEXT_PUBLIC_SITE_URL,
 * a non-HTTPS form endpoint, or localhost / test / example URLs in the
 * rendered pages, robots.txt, sitemap.xml or metadata.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const args = new Set(process.argv.slice(2));
const runEnv = !args.has("--output-only");
const runOutput = !args.has("--env-only");
const errors = [];
const notes = [];

const PLACEHOLDER_HOST = /(^|\.)(localhost|example\.(com|org|net)|test|invalid|example|local)$/i;
const LOOPBACK = /^(127\.\d+\.\d+\.\d+|0\.0\.0\.0|\[::1\])$/;

function checkUrl(name, value, { required }) {
  if (!value) {
    if (required) errors.push(`${name} is not set.`);
    return null;
  }
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    errors.push(`${name} is not an absolute URL: "${value}".`);
    return null;
  }
  if (url.protocol !== "https:") errors.push(`${name} must use https:// (got "${value}").`);
  if (PLACEHOLDER_HOST.test(url.hostname) || LOOPBACK.test(url.hostname))
    errors.push(`${name} points to a local, test or reserved example host (${url.hostname}).`);
  return url;
}

// ---------- Environment ----------
let siteUrl = null;
if (runEnv) {
  siteUrl = checkUrl("NEXT_PUBLIC_SITE_URL", process.env.NEXT_PUBLIC_SITE_URL, { required: true });
  checkUrl("NEXT_PUBLIC_CONTACT_FORM_ENDPOINT", process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT, { required: false });
  if (!process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT)
    notes.push("NEXT_PUBLIC_CONTACT_FORM_ENDPOINT not set: the contact form stays hidden; email is the contact channel.");
}

// ---------- Build output ----------
if (runOutput) {
  const appDir = join(".next", "server", "app");
  const staticDir = join(".next", "static");
  if (!existsSync(appDir)) {
    errors.push("No build output found (.next/server/app). Run `next build` first.");
  } else {
    const walk = (dir) =>
      readdirSync(dir).flatMap((name) => {
        const full = join(dir, name);
        return statSync(full).isDirectory() ? walk(full) : [full];
      });
    // Rendered output: HTML, RSC payloads, robots/sitemap bodies and metadata.
    const rendered = walk(appDir).filter((f) => /\.(html|rsc|body|meta|json)$/.test(f));
    // Example-domain *URLs* only: plain text such as the form hint "name@example.com" is fine.
    const forbiddenRendered = [/localhost/i, /127\.0\.0\.1/, /https?:\/\/(www\.)?example\.(com|org|net)\b/i];
    const hits = new Map();
    for (const file of rendered) {
      const text = readFileSync(file, "utf8");
      for (const re of forbiddenRendered) if (re.test(text)) hits.set(re.source, [...(hits.get(re.source) ?? []), file]);
    }
    for (const [pattern, files] of hits)
      errors.push(`Rendered output contains /${pattern}/ in ${files.length} file(s), e.g. ${files.slice(0, 3).join(", ")}`);

    // Client bundles: no test endpoints (the localhost fallback literal in
    // resolveSiteUrl is unreachable once NEXT_PUBLIC_SITE_URL is inlined).
    if (existsSync(staticDir)) {
      const chunks = walk(staticDir).filter((f) => f.endsWith(".js"));
      const testHosts = chunks.filter((f) => /localhost:3999|127\.0\.0\.1:\d+/.test(readFileSync(f, "utf8")));
      if (testHosts.length) errors.push(`Client bundle references a test endpoint in ${testHosts.length} file(s).`);
    }

    // The configured domain must actually appear in robots.txt and the sitemap.
    const expected = siteUrl?.origin ?? (process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin : null);
    for (const file of ["robots.txt.body", "sitemap.xml.body"]) {
      const path = join(appDir, file);
      if (!existsSync(path)) errors.push(`Missing ${file} in build output.`);
      else if (expected && !readFileSync(path, "utf8").includes(expected))
        errors.push(`${file} does not use ${expected}.`);
    }
    notes.push(`Scanned ${rendered.length} rendered output files.`);
  }
}

for (const n of notes) console.log(`ℹ  ${n}`);
if (errors.length) {
  console.error("\n✖ Production verification failed:");
  for (const e of errors) console.error(`  - ${e}`);
  console.error("\nSee README → Deploying to production.\n");
  process.exit(1);
}
console.log(`✔ Production verification passed${runEnv && runOutput ? "" : runEnv ? " (environment)" : " (build output)"}.`);
