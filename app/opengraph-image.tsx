import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "After the Form";

// Placeholder: wordmark only, replace with a designed image when ready.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", padding: 80, background: "#f4f5f2", color: "#17202a", fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
        After the Form
      </div>
    ),
    size,
  );
}
