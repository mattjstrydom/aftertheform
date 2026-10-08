import type { NextConfig } from "next";

// Same rule as site.indexable in app/site.config.ts: only the production deployment is indexable.
const indexable = process.env.VERCEL_ENV === "production" || process.env.SITE_INDEXABLE === "1";

// Google tag hosts (GTM, GA4, Google Ads conversion and remarketing, conversion linker, user data beacons).
// Checked against https://developers.google.com/tag-platform/security/guides/csp (October 2026): the guide also lists
// pagead2.googlesyndication.com and ad.doubleclick.net for Ads, so they are added. Country Google domains
// (www.google.co.za and so on) cannot be wildcarded in CSP and are not listed.
const G =
  "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://*.googleadservices.com https://pagead2.googlesyndication.com https://ad.doubleclick.net";

// 'unsafe-inline' for scripts is deliberate: nonces would force every page to render dynamically. No 'unsafe-eval'.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.googleadservices.com https://*.google.com https://*.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: ${G}`,
  `connect-src 'self' ${G}`,
  "font-src 'self'",
  "frame-src https://*.googletagmanager.com https://td.doubleclick.net",
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
