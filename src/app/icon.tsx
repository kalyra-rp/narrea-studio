import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon « sceau » : N doré sur fond prune.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#5B2E4E",
          color: "#E3AC3A",
          fontSize: 42,
          fontWeight: 700,
          fontFamily: "Georgia, serif",
          borderRadius: "12px",
        }}
      >
        N
      </div>
    ),
    { ...size },
  );
}
