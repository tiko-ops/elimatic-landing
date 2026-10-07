import { ImageResponse } from "next/og";

export const alt = "Elimatic. Cost, optimized by AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time. Uses the font bundled with next/og (no network).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px 80px",
          color: "#21201c",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>
          Elimatic
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02 }}>
            Cost, optimized by AI.
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#63635e", maxWidth: 900 }}>
            Engineering data in. Cost impact, savings and lower-cost alternatives out.
          </div>
        </div>
        <svg width="1040" height="90" viewBox="0 0 1040 90">
          <path
            d="M0 14 C120 8 200 30 300 24 S460 6 560 40 S760 80 860 80 L1040 80"
            fill="none"
            stroke="#ef5f00"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="860" cy="80" r="9" fill="#ef5f00" />
        </svg>
      </div>
    ),
    size,
  );
}
