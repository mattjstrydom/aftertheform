import type { MetadataRoute } from "next";
import { site } from "./site.config";

// Static export: metadata routes must opt in to being written as files at build time.
export const dynamic = "force-static";

// No lastModified, changeFrequency or priority: Google ignores the last two, and a wrong lastModified is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/agencies", "/agencies/teardown", "/sample-report", "/teardown", "/privacy", "/terms"].map((p) => ({ url: p === "/" ? site.url : `${site.url}${p}` }));
}
