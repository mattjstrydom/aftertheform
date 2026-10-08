import type { NextConfig } from "next";

// Same rule as site.indexable in app/site.config.ts: only the production build is indexable. On Cloudflare Workers
// Builds that is the build of the main branch (WORKERS_CI_BRANCH); SITE_INDEXABLE=1 forces it; VERCEL_ENV keeps Vercel working.
const indexable =
  process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "1" || process.env.WORKERS_CI_BRANCH === "main";

// Google hosts for GA4 through GTM only (Matt, 8 Oct 2026: no other tags), from Google's tag CSP guide
// (https://developers.google.com/tag-platform/security/guides/csp, "Google Analytics" with Ads-linked features, checked
// October 2026). If Google Ads conversion or remarketing tags are ever added in GTM, add https://*.googleadservices.com and
// https://ad.doubleclick.net to script-src/img-src/connect-src and https://td.doubleclick.net to frame-src first.
// Country Google domains (www.google.co.za and so on) cannot be wildcarded in CSP and are not listed.
const G =
  "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://pagead2.googlesyndication.com";

// 'unsafe-inline' for scripts is deliberate: nonces would force every page to render dynamically. No 'unsafe-eval'.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${G}`,
  `connect-src 'self' ${G}`,
  "font-src 'self'",
  "frame-src https://*.googletagmanager.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const security = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ...(indexable ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Images are pre-sized to AVIF and WebP (scripts/build-images.mjs) and served as static files by
  // app/image-loader.ts, so no image optimiser is needed on Cloudflare Workers. qualities stays as Next 16 requires.
  images: {
    loader: "custom",
    loaderFile: "./app/image-loader.ts",
    qualities: [75],
  },
  // Apex to www (canonical host). Hosts usually do this at the edge too; this keeps it host-independent.
  async redirects() {
    return [{ source: "/:path*", has: [{ type: "host", value: "aftertheform.com" }], destination: "https://www.aftertheform.com/:path*", permanent: true }];
  },
  // browsers probe /favicon.ico regardless of <link rel=icon>
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
  // Production only: next dev needs eval for fast refresh.
  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [{ source: "/:path*", headers: security }];
  },
};

export default nextConfig;
