import { ImageResponse } from "next/og"
import { SITE_TAGLINE } from "@/lib/seo"

export const alt = "EchoTools — the software layer for humans and agents"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const dynamic = "force-static"

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
          background: "#0b0d12",
          color: "#f5f6f7",
          padding: "72px 84px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: 44,
            }}
          >
            <div style={{ width: 44, height: 8, borderRadius: 3, background: "#e8a94e" }} />
            <div style={{ width: 44, height: 8, borderRadius: 3, background: "#8f7bff" }} />
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: "-0.02em" }}>
            EchoTools
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            The software layer
            <br />
            for humans and agents.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a3a8b3" }}>
            80 tools · 32 categories · independent & verified
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            color: "#6f7480",
          }}
        >
          <span>Independent · Verified · Useful first</span>
          <span>{SITE_TAGLINE}</span>
        </div>
      </div>
    ),
    { ...size }
  )
}