import type { NextConfig } from "next";

// Static export (https://nextjs.org/docs/app/guides/static-exports): `next build` writes every page to out/ as plain
// files, which Cloudflare Workers static assets serves without running any code. The only server code is the form
// endpoint in worker/index.ts. Static exports ignore next.config headers, redirects and rewrites, so:
// - headers: security-headers.ts, written to out/_headers by scripts/cf-postbuild.mjs
// - apex to www: a Cloudflare redirect rule (README, "Deploy")
// - /favicon.ico: written by scripts/cf-postbuild.mjs from the generated icon
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  // Images are pre-sized to AVIF and WebP (scripts/build-images.mjs) and served as static files by
  // app/image-loader.ts, so no image optimiser or Cloudflare image transformation is needed. qualities stays as Next 16 requires.
  images: {
    loader: "custom",
    loaderFile: "./app/image-loader.ts",
    qualities: [75],
  },
};

export default nextConfig;
