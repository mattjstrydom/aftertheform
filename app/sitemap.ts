import type { MetadataRoute } from "next";
import { site } from "./site.config";

// No lastModified, changeFrequency or priority: Google ignores the last two, and a wrong lastModified is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/sample-report", "/teardown", "/privacy", "/terms"].map((p) => ({ url: p === "/" ? site.url : `${site.url}${p}` }));
}
