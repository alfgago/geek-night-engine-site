import { ImageResponse } from "next/og";

export const alt = "Geek Night Engine - AI-assisted Godot in the browser";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0a",
          color: "#f4efe4",
          padding: 64,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #c8f73c",
              borderRadius: 8,
              color: "#c8f73c",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            G
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Geek Night Engine</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ color: "#c8f73c", fontSize: 24, letterSpacing: 2, textTransform: "uppercase" }}>
            AI-native Godot production
          </div>
          <div style={{ maxWidth: 920, fontSize: 70, lineHeight: 0.98, fontWeight: 700 }}>
            Imagine the game. Speak it into existence.
          </div>
        </div>
        <div style={{ color: "#c9c4b7", fontSize: 26 }}>
          Browser workspace. Structured AI tickets. Cloud builds. Playtests.
        </div>
      </div>
    ),
    size,
  );
}
