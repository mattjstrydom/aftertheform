// Fails the production build while any placeholder is left.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd()); // same .env files next build reads

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
        .forEach((l, i) => {
          if (/<Ph[\s>]/.test(l)) hits.push(`${p}:${i + 1}`);
          if (/\{\{[A-Z0-9_]+\}\}/.test(l)) hits.push(`${p}:${i + 1} token ${l.match(/\{\{[A-Z0-9_]+\}\}/)[0]}`);
        });
    }
  }
};
walk("app");
if (!existsSync("public/matt.jpg")) hits.push("public/matt.jpg (headshot) is missing");
if (!process.env.NEXT_PUBLIC_CAL_URL) hits.push("NEXT_PUBLIC_CAL_URL is not set (Cal.com booking link)");

const cfg = readFileSync("app/site.config.ts", "utf8");
if (/headshotConfirmed:\s*false/.test(cfg)) console.warn("Warning: headshotConfirmed is false (public/matt.jpg not confirmed by Matt).");

if (hits.length) {
  console.error("Placeholders remain:\n  " + hits.join("\n  "));
  process.exit(1);
}
