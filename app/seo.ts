import type { Metadata } from "next";

// Next replaces (does not merge) nested openGraph/twitter objects, so every page spreads the shared values.
export const sharedOpenGraph = { siteName: "After the Form", locale: "en_ZA", type: "website" } as const;

// The app/opengraph-image.png and app/twitter-image.png file conventions apply to the root segment only: a page in a
// sub-segment that sets its own openGraph/twitter object drops them (shallow merge), so sub-pages name the image here.
const ogAlt = "After the Form: Google Ads should bid on pipeline, not form fills. Example of a HubSpot SQL counted for bidding in Google Ads.";
const ogImage = { url: "/opengraph-image.png", width: 1200, height: 630, alt: ogAlt, type: "image/png" };
const twImage = { ...ogImage, url: "/twitter-image.png" };

/** Page metadata: title (template adds " | After the Form"), description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title, description, images: [ogImage] },
    twitter: { card: "summary_large_image", title, description, images: [twImage] },
  };
}
