import type { MetadataRoute } from "next";
import { site } from "./site.config";

// Production: crawl everything except the form API, with the sitemap.
// Previews and local builds: allow crawling (so crawlers see the noindex) and list no sitemap.
export default function robots(): MetadataRoute.Robots {
  if (!site.indexable) return { rules: { userAgent: "*", allow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
