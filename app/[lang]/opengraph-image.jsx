import { ImageResponse } from "next/og";
import enCommon from "@/data/i18n/en/common.json";
import { getDictionary } from "@/lib/i18n";

export const alt = enCommon.og.alt;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }) {
  const { lang } = await params;
  const og = getDictionary(lang, "common").og;

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
          <div style={{ fontSize: 34, fontWeight: 700 }}>{og.brandName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ color: "#c8f73c", fontSize: 24, letterSpacing: 2, textTransform: "uppercase" }}>
            {og.kicker}
          </div>
          <div style={{ maxWidth: 920, fontSize: 70, lineHeight: 0.98, fontWeight: 700 }}>
            {og.headline}
          </div>
        </div>
        <div style={{ color: "#c9c4b7", fontSize: 26 }}>{og.footer}</div>
      </div>
    ),
    size,
  );
}
