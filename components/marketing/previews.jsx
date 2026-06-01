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
          <span className="chip desktop-only" style={{ height: 18, fontSize: 9.5 }}>
            <span className="dot lime" /> build v0.4.7
          </span>
          <Avatar {...PEOPLE.noor} size={18} />
          <Avatar {...PEOPLE.sam} size={18} style={{ marginLeft: -4 }} />
        </div>

        <div className="hero-mock-body" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", height: "calc(100% - 36px)" }}>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden", borderRight: "1px solid var(--border-1)" }}>
            <div className="gne-row" style={{ gap: 9 }}>
              <Avatar {...PEOPLE.you} size={20} />
              <div style={{ flex: 1 }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>You · 12m</div>
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
                  flex: "0 0 auto",
                }}
              >
                <Icon d={I.sparkles} size={10} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="gne-row mono" style={{ gap: 6 }}>
                  <span style={{ fontSize: 10.5, color: "var(--lime)", fontWeight: 500 }}>Architect</span>
                  <span style={{ fontSize: 10, color: "var(--fg-3)" }}>just now</span>
                  <span className="chip ghost" style={{ height: 14, fontSize: 9, padding: "0 4px" }}>-36 cr</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-1)", marginTop: 2 }} className="pretty">
                  Spawned <code style={inlCode}>Gem x3</code> under <code style={inlCode}>World/Pickups</code>,
                  bound generated <code style={inlCode}>gem.png</code> + <code style={inlCode}>coin-pickup.wav</code>.
                  HUD score now shows <code style={inlCode}>0/3</code>.
                </div>
                <div style={{ marginTop: 8, border: "1px solid var(--border-1)", borderRadius: 4, background: "var(--bg-0)" }}>
                  {[
                    ["add_node", "Gem x 3", "World/Pickups"],
                    ["bind_asset", "gem.png", "Gem.Sprite"],
                    ["edit_script", "gem.gd", "+ collected signal"],
                    ["trigger_build", "v0.4.7", "11.8s · success"],
                  ].map(([kind, title, value], i) => (
                    <div
                      key={kind}
                      className="gne-row mono"
                      style={{ fontSize: 9.5, padding: "4px 8px", gap: 8, borderBottom: i < 3 ? "1px solid var(--border-1)" : "none" }}
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

          <MiniPlaytest gradientId="heroSky" fullHeight />
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
          <span className="mono" style={{ fontSize: 10, color: "var(--cyan)" }}>SNAPSHOT #148 · NOW</span>
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

export function ShellWrap({ title, children }) {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        height: "100%",
        padding: 0,
        overflow: "hidden",
        background: "var(--bg-2)",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,247,60,0.06)",
      }}
    >
      <div className="gne-row" style={{ height: 32, padding: "0 14px", background: "var(--bg-1)", borderBottom: "1px solid var(--border-1)", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#ff5f57" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#febc2e" }} />
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#28c840" }} />
        <span className="mono" style={{ marginLeft: 6, fontSize: 11, color: "var(--fg-2)" }}>{title}</span>
        <div style={{ flex: 1 }} />
        <span className="chip ghost" style={{ height: 16, fontSize: 9.5 }}>
          <span className="dot lime" /> live
        </span>
      </div>
      {children}
    </div>
  );
}

export function ModulePreview({ kind }) {
  const previews = {
    hub: <HubPreview />,
    ai: <AIPreview />,
    scene: <ScenePreview />,
    assets: <AssetsPreview />,
    playtest: <PlaytestPreview />,
  };
  return previews[kind] || null;
}

function HubPreview() {
  const cards = [
    { n: "Pebble Punks", s: "lime", t: "ready · v0.4.7" },
    { n: "Goldcrest Run", s: "amber", t: "compiling..." },
    { n: "Hollow Garden", s: "lime", t: "ready · v0.2.0" },
    { n: "Mooncourt", s: "red", t: "build failed" },
    { n: "Tinwhistle", s: "lime", t: "ready · v0.1.9" },
    { n: "Untitled", s: "muted", t: "never built" },
  ];
  return (
    <ShellWrap title="geeknight.engine / projects">
      <div style={{ padding: 18, height: "calc(100% - 32px)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {cards.map((card) => (
            <div key={card.n} className="card" style={{ padding: 10, background: "var(--bg-1)" }}>
              <div className="placeholder" style={{ height: 50, marginBottom: 6, borderRadius: 4, background: "linear-gradient(135deg, rgba(200,247,60,0.05), transparent)" }}>
                <span className="mono" style={{ fontSize: 9, color: "var(--fg-3)" }}>{card.n}</span>
              </div>
              <div className="gne-row" style={{ gap: 5 }}>
                <span className={`dot ${card.s}`} />
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-1)" }}>{card.n}</span>
              </div>
              <div className="mono" style={{ fontSize: 9, color: "var(--fg-3)", marginTop: 3 }}>{card.t}</div>
            </div>
          ))}
        </div>
        <div className="label-cap" style={{ marginTop: 18, marginBottom: 8 }}>STUDIO ACTIVITY</div>
        {["sam rebuilt goldcrest-run", "noor snapshotted v0.4.7", "kai invited rin as editor"].map((activity, i) => (
          <div
            key={activity}
            className="gne-row mono"
            style={{ fontSize: 11, padding: "5px 0", borderTop: i ? "1px dashed var(--border-1)" : 0, color: "var(--fg-1)", gap: 8 }}
          >
            <span className="dot lime" /> {activity}
            <div style={{ flex: 1 }} />
            <span style={{ color: "var(--fg-3)" }}>{["now", "3m", "42m"][i]}</span>
          </div>
        ))}
      </div>
    </ShellWrap>
  );
}

function AIPreview() {
  return (
    <ShellWrap title="pebble-punks / Architect">
      <div style={{ padding: 16, height: "calc(100% - 32px)", overflow: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="gne-row" style={{ gap: 9, alignItems: "flex-start" }}>
          <Avatar {...PEOPLE.you} size={20} />
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>You · 12m</div>
            <div style={{ fontSize: 12.5, color: "var(--fg-1)", marginTop: 2 }} className="pretty">
              Make the boss room have three phases with stomp + charge attacks.
            </div>
          </div>
        </div>
        <div className="gne-row" style={{ gap: 9, alignItems: "flex-start" }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: "var(--lime-bg)", border: "1px solid var(--lime-edge)", color: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
            <Icon d={I.sparkles} size={10} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="gne-row mono" style={{ gap: 6 }}>
              <span style={{ fontSize: 11, color: "var(--lime)", fontWeight: 500 }}>Architect · 6 tickets</span>
              <span className="chip ghost" style={{ height: 14, fontSize: 9, padding: "0 4px" }}>-62 cr</span>
            </div>
            <div style={{ marginTop: 6, border: "1px solid var(--border-1)", borderRadius: 4, background: "var(--bg-0)" }}>
              {[
                ["#312", "add_node", "Boss.Phase1"],
                ["#313", "add_node", "Boss.Phase2 · Stomp"],
                ["#314", "add_node", "Boss.Phase3 · Charge"],
                ["#315", "edit_script", "boss.gd"],
                ["#316", "bind_asset", "boss-roar.wav"],
                ["#317", "trigger_build", "v0.5.0"],
              ].map(([id, kind, title], i) => (
                <div key={id} className="gne-row mono" style={{ fontSize: 10, padding: "5px 9px", gap: 8, borderBottom: i < 5 ? "1px solid var(--border-1)" : 0, color: "var(--fg-1)" }}>
                  <span style={{ color: "var(--fg-3)", flex: "0 0 30px" }}>{id}</span>
                  <span style={{ color: "var(--lime)", flex: "0 0 90px" }}>{kind}</span>
                  <span style={{ color: "var(--fg-0)" }}>{title}</span>
                  <div style={{ flex: 1 }} />
                  <span className="chip ghost" style={{ height: 12, fontSize: 8, padding: "0 3px" }}>READY</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div className="card" style={{ padding: "6px 9px", background: "var(--bg-1)" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--fg-1)" }}>
            <span style={{ color: "var(--fg-3)", marginRight: 4 }}>›</span>
            Adjust phase 3 charge tell to 0.6s...
            <span style={{ display: "inline-block", width: 6, height: 11, background: "var(--lime)", verticalAlign: "-1px", marginLeft: 2 }} />
          </div>
        </div>
      </div>
    </ShellWrap>
  );
}

function ScenePreview() {
  const tree = [
    ["•", "Main", "Node2D", 0],
    ["▦", "World", "TileMap", 1],
    ["✷", "SpawnPoints", "Node2D", 2],
    ["◆", "Player", "CharacterBody2D", 1, true],
    ["▣", "Sprite", "Sprite2D", 2],
    ["◇", "Collider", "CollisionShape2D", 2],
    ["ƒ", "player.gd", "Script", 2],
    ["•", "Enemies", "Node2D", 1],
    ["◆", "Grub", "CharacterBody2D", 2],
    ["▤", "HUD", "CanvasLayer", 1],
  ];
  return (
    <ShellWrap title="pebble-punks / Scene">
      <div style={{ padding: 8, height: "calc(100% - 32px)", overflow: "hidden" }}>
        {tree.map(([ic, label, type, depth, selected], i) => (
          <div key={`${label}-${i}`} className={`tree-row ${selected ? "sel" : ""}`} style={{ paddingLeft: 8 + depth * 12, fontSize: 11 }}>
            <span className="mono" style={{ width: 11, color: "var(--fg-3)", textAlign: "center" }}>{ic}</span>
            <span style={{ flex: 1 }}>{label}</span>
            <span className="mono" style={{ fontSize: 9, color: "var(--fg-3)" }}>{type}</span>
          </div>
        ))}
        <div className="label-cap" style={{ marginTop: 10, marginBottom: 6, padding: "0 8px" }}>INSPECTOR · PLAYER</div>
        <div style={{ padding: "0 8px" }}>
          {[["position", "(96,280)"], ["speed", "180"], ["coyote_time", "0.10s"]].map(([key, value]) => (
            <div key={key} className="gne-row mono" style={{ fontSize: 10.5, padding: "3px 0", borderBottom: "1px dashed var(--border-1)" }}>
              <span style={{ color: "var(--fg-3)", flex: "0 0 90px" }}>{key}</span>
              <span style={{ color: "var(--lime)" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </ShellWrap>
  );
}

function AssetsPreview() {
  const names = ["pebble", "grub", "gem", "boss", "jump", "coin", "tile", "music", "sprite", "sfx", "model", "font"];
  const icons = [I.sparkles, I.wave, I.cube, I.layers];
  const colors = ["var(--lime)", "var(--amber)", "var(--cyan)", "var(--violet)"];
  return (
    <ShellWrap title="pebble-punks / Assets · 24">
      <div style={{ padding: 14, height: "calc(100% - 32px)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {names.map((name, i) => (
            <div key={name} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="placeholder" style={{ height: 50, borderRadius: 0, border: 0, color: colors[i % 4] }}>
                <Icon d={icons[i % 4]} size={14} />
              </div>
              <div className="mono" style={{ fontSize: 8.5, padding: "4px 6px", color: "var(--fg-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {name}
              </div>
            </div>
          ))}
        </div>
        <div className="gne-row mono" style={{ marginTop: 10, fontSize: 10.5, color: "var(--fg-2)", gap: 10 }}>
          <span><span style={{ color: "var(--fg-3)" }}>STORAGE</span> 4.8 GB / 50 GB</span>
          <span><span style={{ color: "var(--fg-3)" }}>UNUSED</span> 3</span>
          <div style={{ flex: 1 }} />
          <span style={{ color: "var(--lime)" }}>auto-bind on save</span>
        </div>
      </div>
    </ShellWrap>
  );
}

function PlaytestPreview() {
  return (
    <ShellWrap title="play.gne / pebble-punks">
      <MiniPlaytest gradientId="pt2sky" telemetry />
    </ShellWrap>
  );
}

function MiniPlaytest({ gradientId, telemetry = false, fullHeight = false }) {
  return (
    <div className="checker scanline" style={{ position: "relative", height: fullHeight ? "100%" : "calc(100% - 32px)", background: "linear-gradient(180deg, #0a0d05 0%, #060805 100%)" }}>
      <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a2b08" />
            <stop offset="1" stopColor="#0a0f04" />
          </linearGradient>
        </defs>
        <rect width="400" height="280" fill={`url(#${gradientId})`} />
        <path d="M0 200 Q100 170 200 195 T400 190 V280 H0 Z" fill="#152007" opacity="0.7" />
        <path d="M0 230 Q120 210 240 220 T400 230 V280 H0 Z" fill="#0e1505" />
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={i * 20} y={240} width={20} height={40} fill={i % 2 ? "#1c2a0a" : "#172308"} stroke="#0a1004" />
        ))}
        <g transform="translate(140 215)">
          <circle r="13" fill="#c8f73c" />
          <circle cx="-4" cy="-3" r="2" fill="#1a2407" />
          <circle cx="5" cy="-3" r="2" fill="#1a2407" />
          <path d="M-5 5 Q0 8 5 5" stroke="#1a2407" strokeWidth="1.5" fill="none" />
        </g>
        {[200, 240, 280].map((x, i) => (
          <polygon key={i} points={`${x},207 ${x + 6},215 ${x},223 ${x - 6},215`} fill="#f5a524" stroke="#3b1d04" strokeWidth="1.2" />
        ))}
        <g transform="translate(330 225)">
          <ellipse cx="0" cy="0" rx="13" ry="9" fill="#74d6c8" />
          <circle cx="-4" cy="-2" r="1.8" fill="#0a1f1c" />
          <circle cx="4" cy="-2" r="1.8" fill="#0a1f1c" />
        </g>
      </svg>
      <div className="mono" style={{ position: "absolute", top: 10, left: 12, color: "var(--lime)", fontSize: 10.5, textShadow: "0 0 8px rgba(200,247,60,0.4)" }}>
        ♥♥♥ · ⛀ 0/3 · T 00:42
      </div>
      {telemetry ? (
        <div
          className="gne-row mono"
          style={{
            position: "absolute",
            bottom: 10,
            right: 12,
            gap: 8,
            fontSize: 9,
            color: "var(--fg-1)",
            background: "rgba(12,12,10,0.8)",
            padding: "4px 8px",
            borderRadius: 4,
            border: "1px solid var(--border-2)",
          }}
        >
          <span><span style={{ color: "var(--fg-3)" }}>EVT</span> 1,284</span>
          <span><span style={{ color: "var(--fg-3)" }}>SESS</span> 38</span>
          <span><span style={{ color: "var(--fg-3)" }}>COMP</span> 62%</span>
        </div>
      ) : (
        <div className="gne-row mono" style={{ position: "absolute", bottom: 10, left: 12, gap: 6, fontSize: 9, color: "var(--fg-2)" }}>
          <span className="dot lime" /> LIVE · v0.4.7
        </div>
      )}
    </div>
  );
}
