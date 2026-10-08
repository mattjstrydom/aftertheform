import { ImageResponse } from "next/og";
import { site } from "./site.config";

// Static export: metadata routes must opt in to being written as files at build time.
export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// "AF" mark in brand ink and paper (no third-party marks). Static at build time.
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#15171a", color: "#f2f6f5", fontSize: 34, fontWeight: 700, borderRadius: 12 }}>
        {site.monogram}
      </div>
    ),
    size,
  );
}
