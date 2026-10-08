import manifest from "../images.manifest.json";

// Static image loader: maps a requested width to the nearest pre-sized file from scripts/build-images.mjs
// (public/_img/<name>-<width>.webp or .avif). No runtime image service is needed, so the same build works on
// Cloudflare Workers, Vercel and next start. Images not in images.manifest.json are served as they are.
type Args = { src: string; width: number; quality?: number };
const ladder = manifest as Record<string, number[]>;

function pick(src: string, width: number, ext: "webp" | "avif") {
  const sizes = ladder[src];
  if (!sizes) return src;
  const w = sizes.find((s) => s >= width) ?? sizes[sizes.length - 1];
  return `/_img${src.replace(/\.(png|jpe?g)$/i, "")}-${w}.${ext}`;
}

export default function webpLoader({ src, width }: Args) {
  return pick(src, width, "webp");
}

/** Accurate srcset for a manifest image: one entry per pre-sized width, for hand-written picture sources. */
export function staticSrcSet(src: string, ext: "webp" | "avif") {
  return (ladder[src] ?? []).map((w) => `${pick(src, w, ext)} ${w}w`).join(", ");
}
