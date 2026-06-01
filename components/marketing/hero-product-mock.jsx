import { Avatar, Icon, I, PEOPLE } from "./icons";

const inlCode = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.9em",
  background: "var(--bg-3)",
  padding: "0 4px",
  borderRadius: 2,
  color: "var(--lime)",
};

export function HeroProductMock() {
  return (
    <>
      <div
        className="card"
        style={{
          position: "absolute",
          inset: "0 0 40px 20px",
          padding: 0,
          overflow: "hidden",
          border: "1px solid var(--border-2)",
          background: "var(--bg-2)",
          boxShadow: "0 50px 100px -25px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,247,60,0.08)",
          transform: "rotate(-0.6deg)",
        }}
      >
        <div className="gne-row" style={{ height: 36, padding: "0 14px", background: "var(--bg-1)", borderBottom: "1px solid var(--border-1)", gap: 10 }}>
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#ff5f57" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#febc2e" }} />
          <span style={{ width: 9, height: 9, borderRadius: 999, background: "#28c840" }} />
          <span className="mono" style={{ marginLeft: 6, fontSize: 11, color: "var(--fg-2)" }}>
            geeknight.engine / pebble-punks <span style={{ color: "var(--fg-4)" }}>/</span>{" "}
            <span style={{ color: "var(--lime)" }}>Architect</span>
          </span>
          <div style={{ flex: 1 }} />
          <span className="chip" style={{ height: 18, fontSize: 9.5 }}>
            <span className="dot lime" /> build v0.4.7
          </span>
          <Avatar {...PEOPLE.noor} size={18} />
          <Avatar {...PEOPLE.sam} size={18} style={{ marginLeft: -4 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", height: "calc(100% - 36px)" }}>
          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              overflow: "hidden",
              borderRight: "1px solid var(--border-1)",
            }}
          >
            <div className="gne-row" style={{ gap: 9 }}>
              <Avatar {...PEOPLE.you} size={20} />
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>
                  You · 12m
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-1)", marginTop: 2 }} className="pretty">
                  Add three pickup gems near each checkpoint, with a sparkly collect sound.
                </div>
              </div>
            </div>
            <div className="gne-row" style={{ gap: 9 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  background: "var(--lime-bg)",
                  border: "1px solid var(--lime-edge)",
                  color: "var(--lime)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon d={I.sparkles} size={10} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="gne-row mono" style={{ gap: 6 }}>
                  <span style={{ fontSize: 10.5, color: "var(--lime)", fontWeight: 500 }}>Architect</span>
                  <span style={{ fontSize: 10, color: "var(--fg-3)" }}>just now</span>
                  <span className="chip ghost" style={{ height: 14, fontSize: 9, padding: "0 4px" }}>
                    -36 cr
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-1)", marginTop: 2 }} className="pretty">
                  Spawned <code style={inlCode}>Gem x3</code> under <code style={inlCode}>World/Pickups</code>, bound generated{" "}
                  <code style={inlCode}>gem.png</code> + <code style={inlCode}>coin-pickup.wav</code>. HUD score now shows{" "}
                  <code style={inlCode}>0/3</code>.
                </div>
                <div style={{ marginTop: 8, border: "1px solid var(--border-1)", borderRadius: 4, background: "var(--bg-0)" }}>
                  {[
                    ["add_node", "Gem x 3", "World/Pickups"],
                    ["bind_asset", "gem.png", "Gem.Sprite"],
                    ["edit_script", "gem.gd", "+ collected signal"],
                    ["trigger_build", "v0.4.7", "11.8s · success"],
                  ].map(([kind, title, value], index) => (
                    <div
                      key={kind}
                      className="gne-row mono"
                      style={{
                        fontSize: 9.5,
                        padding: "4px 8px",
                        gap: 8,
                        borderBottom: index < 3 ? "1px solid var(--border-1)" : "none",
                      }}
                    >
                      <span style={{ color: "var(--lime)", flex: "0 0 70px" }}>{kind}</span>
                      <span style={{ color: "var(--fg-0)", flex: "0 0 70px" }}>{title}</span>
                      <span style={{ color: "var(--fg-2)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <div className="card" style={{ padding: "6px 8px", background: "var(--bg-1)" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-1)" }}>
                <span style={{ color: "var(--fg-3)", marginRight: 4 }}>›</span>
                Tune the boss room - phase 2 should add stomp attacks...
                <span style={{ display: "inline-block", width: 6, height: 12, background: "var(--lime)", verticalAlign: "-2px", marginLeft: 2 }} />
              </div>
            </div>
          </div>

          <div className="checker scanline" style={{ position: "relative", background: "linear-gradient(180deg, #0a0d05 0%, #060805 100%)" }}>
            <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <defs>
                <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#1a2b08" />
                  <stop offset="1" stopColor="#0a0f04" />
                </linearGradient>
              </defs>
              <rect width="400" height="280" fill="url(#heroSky)" />
              <path d="M0 200 Q100 170 200 195 T400 190 V280 H0 Z" fill="#152007" opacity="0.7" />
              <path d="M0 230 Q120 210 240 220 T400 230 V280 H0 Z" fill="#0e1505" />
              {Array.from({ length: 20 }).map((_, index) => (
                <rect key={index} x={index * 20} y={240} width={20} height={40} fill={index % 2 ? "#1c2a0a" : "#172308"} stroke="#0a1004" />
              ))}
              <g transform="translate(140 215)">
                <circle r="13" fill="#c8f73c" />
                <circle cx="-4" cy="-3" r="2" fill="#1a2407" />
                <circle cx="5" cy="-3" r="2" fill="#1a2407" />
                <path d="M-5 5 Q0 8 5 5" stroke="#1a2407" strokeWidth="1.5" fill="none" />
              </g>
              {[200, 240, 280].map((x, index) => (
                <g key={index} transform={`translate(${x} 215)`}>
                  <polygon points="0,-8 6,0 0,8 -6,0" fill="#f5a524" stroke="#3b1d04" strokeWidth="1.2" />
                </g>
              ))}
              <g transform="translate(330 225)">
                <ellipse cx="0" cy="0" rx="13" ry="9" fill="#74d6c8" />
                <circle cx="-4" cy="-2" r="1.8" fill="#0a1f1c" />
                <circle cx="4" cy="-2" r="1.8" fill="#0a1f1c" />
              </g>
            </svg>
            <div
              className="mono"
              style={{ position: "absolute", top: 10, left: 12, color: "var(--lime)", fontSize: 10, letterSpacing: "0.05em", textShadow: "0 0 8px rgba(200,247,60,0.4)" }}
            >
              ♥♥♥ · ⛀ 0/3 · T 00:42
            </div>
            <div className="gne-row mono" style={{ position: "absolute", bottom: 10, left: 12, gap: 6, fontSize: 9, color: "var(--fg-2)" }}>
              <span className="dot lime" /> LIVE · v0.4.7
            </div>
          </div>
        </div>
      </div>

      <div
        className="card"
        style={{
          position: "absolute",
          bottom: 0,
          right: -10,
          width: 220,
          padding: "10px 12px",
          background: "var(--bg-2)",
          boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(116,214,200,0.18)",
          transform: "rotate(3deg)",
        }}
      >
        <div className="gne-row" style={{ gap: 8, marginBottom: 6 }}>
          <span className="dot cyan" />
          <span className="mono" style={{ fontSize: 10, color: "var(--cyan)" }}>
            SNAPSHOT #148 · NOW
          </span>
        </div>
        <div className="mono pretty" style={{ fontSize: 11.5, color: "var(--fg-1)", lineHeight: 1.5 }}>
          <span style={{ color: "var(--lime)" }}>+3</span> nodes · <span style={{ color: "var(--amber)" }}>~4</span> properties ·{" "}
          <span style={{ color: "var(--violet)" }}>+1</span> asset
        </div>
        <div className="mono" style={{ fontSize: 9.5, color: "var(--fg-3)", marginTop: 6 }}>
          revertable · safe to playtest
        </div>
      </div>
    </>
  );
}
