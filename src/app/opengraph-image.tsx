import { ImageResponse } from "next/og";

export const alt = "Narrea Studio — Clarifiez votre offre. Structurez votre présence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image de partage par défaut, dans la DA (prune profond + doré + ivoire).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3F2138",
          color: "#FAF4E8",
          fontFamily: "Georgia, serif",
          padding: "80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 110,
            height: 110,
            borderRadius: "9999px",
            border: "4px solid #E3AC3A",
            color: "#E3AC3A",
            fontSize: 60,
            fontWeight: 600,
            marginBottom: 36,
          }}
        >
          N
        </div>
        <div style={{ fontSize: 84, fontWeight: 600, color: "#FAF4E8" }}>
          Narrea Studio
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#F1DFB8",
            maxWidth: 900,
          }}
        >
          Clarifiez votre offre. Structurez votre présence. Vendez plus simplement.
        </div>
      </div>
    ),
    { ...size },
  );
}
