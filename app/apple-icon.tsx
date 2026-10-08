import { ImageResponse } from "next/og";
import { site } from "./site.config";

// Static export: metadata routes must opt in to being written as files at build time.
export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same "AF" mark as app/icon.tsx at 180 x 180 (iOS applies its own corner mask). Static at build time.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#15171a", color: "#f2f6f5", fontSize: 92, fontWeight: 700 }}>
        {site.monogram}
      </div>
    ),
    size,
  );
}
