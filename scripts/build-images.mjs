// Pre-sizes every image in images.manifest.json to AVIF and WebP in public/_img/.
// The site serves these static files through app/image-loader.ts instead of the Next image optimiser, so it needs no
// image service on any host (Cloudflare Workers, Vercel or plain next start). Run after adding or changing an image:
//   node scripts/build-images.mjs
// Commit the output. Uses sharp, which Next already installs.
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const sharp = createRequire(import.meta.url)("sharp");
const manifest = JSON.parse(readFileSync("images.manifest.json", "utf8"));

for (const [src, widths] of Object.entries(manifest)) {
  const input = join("public", src);
  const base = join("public/_img", src.replace(/\.(png|jpe?g)$/i, ""));
  mkdirSync(dirname(base), { recursive: true });
  for (const w of widths) {
    const img = () => sharp(input).resize({ width: w, withoutEnlargement: true });
    await img().avif({ quality: 50, effort: 6 }).toFile(`${base}-${w}.avif`);
    await img().webp({ quality: 75 }).toFile(`${base}-${w}.webp`);
    console.log(`${base}-${w}.{avif,webp}`);
  }
}
