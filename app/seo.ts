import type { Metadata } from "next";

// Next replaces (does not merge) nested openGraph/twitter objects, so every page spreads the shared values.
export const sharedOpenGraph = { siteName: "After the Form", locale: "en_ZA", type: "website" } as const;

/** Page metadata: title (template adds " | After the Form"), description, canonical, Open Graph and Twitter. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...sharedOpenGraph, url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
