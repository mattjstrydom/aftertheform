// Fails the production build while any placeholder is left.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

// Preview deployments may show placeholders; production (and local builds) may not.
if (process.env.VERCEL_ENV === "preview") {
  console.log("Preview deployment: skipping placeholder check.");
  process.exit(0);
}

const hits = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.tsx?$/.test(f) && f !== "ph.tsx") {
      readFileSync(p, "utf8")
        .split("\n")
        .forEach((l, i) => /<Ph[\s>]/.test(l) && hits.push(`${p}:${i + 1}`));
    }
  }
};
walk("app");
if (!existsSync("public/matt.jpg")) hits.push("public/matt.jpg (headshot) is missing");

if (hits.length) {
  console.error("Placeholders remain:\n  " + hits.join("\n  "));
  process.exit(1);
}
