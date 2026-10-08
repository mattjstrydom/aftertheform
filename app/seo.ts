import type { Metadata } from "next";
import { site } from "./site.config";

// Next replaces (does not merge) nested openGraph/twitter objects, so every page spreads the shared values.
export const sharedOpenGraph = { siteName: site.brand, locale: "en_ZA", type: "website" } as const;

// One share image for Open Graph and Twitter, named in metadata (not the app/opengraph-image.png file convention) so its
// alt text comes from site.config. Every page that sets its own openGraph/twitter object must list it again (shallow merge).
// The brand name is baked into the PNG: re-render it after a rename (outreach/dev-handoff/assets/images/og-image.html, tools/render-handoff.mjs).
const ogAlt = `${site.brand}: Google Ads should bid on pipeline, not form fills. Example of a HubSpot SQL counted for bidding in Google Ads.`;
export const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: ogAlt, type: "image/png" };

/** Page metadata: title (the layout template adds " | <brand>"), description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
