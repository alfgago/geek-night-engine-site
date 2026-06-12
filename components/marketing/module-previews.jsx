import { getDictionary } from "@/lib/i18n";
import { Avatar, Icon, I, PEOPLE } from "./icons";

export function ModulePreview({ kind, lang = "en" }) {
  const t = getDictionary(lang, "product").previewMock;

  if (kind === "hub") return <HubPreview t={t} />;
  if (kind === "ai") return <AIPreview t={t} />;
  if (kind === "scene") return <ScenePreview t={t} />;
  if (kind === "assets") return <AssetsPreview t={t} />;
  if (kind === "playtest") return <PlaytestPreview t={t} />;
  return null;
}

export function ShellWrap({ title, liveLabel, children }) {
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
        <span className="mono" style={{ marginLeft: 6, fontSize: 11, color: "var(--fg-2)" }}>
          {title}
        </span>
        <div style={{ flex: 1 }} />
        <span className="chip ghost" style={{ height: 16, fontSize: 9.5 }}>
          <span className="dot lime" /> {liveLabel}
        </span>
      </div>
      {children}
    </div>
  );
}

function HubPreview({ t }) {
  return (
    <ShellWrap title={t.hub.title} liveLabel={t.shell.live}>
      <div style={{ padding: 18, height: "calc(100% - 32px)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {t.hub.cards.map((card) => (
            <div key={card.name} className="card" style={{ padding: 10, background: "var(--bg-1)" }}>
              <div className="placeholder" style={{ height: 50, marginBottom: 6, borderRadius: 4, background: "linear-gradient(135deg, rgba(200,247,60,0.05), transparent)" }}>
                <span className="mono" style={{ fontSize: 9, color: "var(--fg-3)" }}>
                  {card.name}
                </span>
              </div>
              <div className="gne-row" style={{ gap: 5 }}>
                <span className={`dot ${card.statusColor}`} />
                <span className="mono" style={{ fontSize: 10, color: "var(--fg-1)" }}>
                  {card.name}
                </span>
              </div>
              <div className="mono" style={{ fontSize: 9, color: "var(--fg-3)", marginTop: 3 }}>
                {card.status}
              </div>
            </div>
          ))}
        </div>
        <div className="label-cap" style={{ marginTop: 18, marginBottom: 8 }}>
          {t.hub.activityLabel}
        </div>
        {t.hub.activities.map((activity, index) => (
          <div
            key={activity.text}
            className="gne-row mono"
            style={{ fontSize: 11, padding: "5px 0", borderTop: index ? "1px dashed var(--border-1)" : 0, color: "var(--fg-1)", gap: 8 }}
          >
            <span className="dot lime" /> {activity.text}
            <div style={{ flex: 1 }} />
            <span style={{ color: "var(--fg-3)" }}>{activity.time}</span>
          </div>
        ))}
      </div>
    </ShellWrap>
  );
}

function AIPreview({ t }) {
  return (
    <ShellWrap title={t.ai.title} liveLabel={t.shell.live}>
      <div style={{ padding: 16, height: "calc(100% - 32px)", overflow: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="gne-row" style={{ gap: 9, alignItems: "flex-start" }}>
          <Avatar {...PEOPLE.you} size={20} />
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--fg-3)" }}>
              {t.ai.userTimestamp}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--fg-1)", marginTop: 2 }} className="pretty">
              {t.ai.prompt}
            </div>
          </div>
        </div>
        <div className="gne-row" style={{ gap: 9, alignItems: "flex-start" }}>
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
              <span style={{ fontSize: 11, color: "var(--lime)", fontWeight: 500 }}>{t.ai.ticketSummary}</span>
              <span className="chip ghost" style={{ height: 14, fontSize: 9, padding: "0 4px" }}>
                {t.ai.creditDelta}
              </span>
            </div>
            <div style={{ marginTop: 6, border: "1px solid var(--border-1)", borderRadius: 4, background: "var(--bg-0)" }}>
              {t.ai.operations.map((operation, index) => (
                <div
                  key={operation.id}
                  className="gne-row mono"
                  style={{ fontSize: 10, padding: "5px 9px", gap: 8, borderBottom: index < t.ai.operations.length - 1 ? "1px solid var(--border-1)" : 0, color: "var(--fg-1)" }}
                >
                  <span style={{ color: "var(--fg-3)", flex: "0 0 30px" }}>{operation.id}</span>
                  <span style={{ color: "var(--lime)", flex: "0 0 90px" }}>{operation.kind}</span>
                  <span style={{ color: "var(--fg-0)" }}>{operation.title}</span>
                  <div style={{ flex: 1 }} />
                  <span className="chip ghost" style={{ height: 12, fontSize: 8, padding: "0 3px" }}>
                    {t.ai.ready}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div className="card" style={{ padding: "6px 9px", background: "var(--bg-1)" }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--fg-1)" }}>
            <span style={{ color: "var(--fg-3)", marginRight: 4 }}>›</span>
            {t.ai.commandPrompt}
            <span style={{ display: "inline-block", width: 6, height: 11, background: "var(--lime)", verticalAlign: "-1px", marginLeft: 2 }} />
          </div>
        </div>
      </div>
    </ShellWrap>
  );
}

function ScenePreview({ t }) {
  return (
    <ShellWrap title={t.scene.title} liveLabel={t.shell.live}>
      <div style={{ padding: 8, height: "calc(100% - 32px)", overflow: "hidden" }}>
        {t.scene.tree.map(([icon, label, type, depth, selected], index) => (
          <div key={index} className={`tree-row ${selected ? "sel" : ""}`} style={{ paddingLeft: 8 + depth * 12, fontSize: 11 }}>
            <span className="mono" style={{ width: 11, color: "var(--fg-3)", textAlign: "center" }}>
              {icon}
            </span>
            <span style={{ flex: 1 }}>{label}</span>
            <span className="mono" style={{ fontSize: 9, color: "var(--fg-3)" }}>
              {type}
            </span>
          </div>
        ))}
        <div className="label-cap" style={{ marginTop: 10, marginBottom: 6, padding: "0 8px" }}>
          {t.scene.inspectorLabel}
        </div>
        <div style={{ padding: "0 8px" }}>
          {t.scene.properties.map(([key, value]) => (
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

function AssetsPreview({ t }) {
  return (
    <ShellWrap title={t.assets.title} liveLabel={t.shell.live}>
      <div style={{ padding: 14, height: "calc(100% - 32px)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {t.assets.names.map((name, index) => (
            <div key={name} className="card" style={{ padding: 0, overflow: "hidden" }}>
              <div
                className="placeholder"
                style={{ height: 50, borderRadius: 0, border: 0, color: ["var(--lime)", "var(--amber)", "var(--cyan)", "var(--violet)"][index % 4] }}
              >
                <Icon d={[I.sparkles, I.wave, I.cube, I.layers][index % 4]} size={14} />
              </div>
              <div className="mono" style={{ fontSize: 8.5, padding: "4px 6px", color: "var(--fg-2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {name}
              </div>
            </div>
          ))}
        </div>
        <div className="gne-row mono" style={{ marginTop: 10, fontSize: 10.5, color: "var(--fg-2)", gap: 10 }}>
          <span>
            <span style={{ color: "var(--fg-3)" }}>{t.assets.storageLabel}</span> {t.assets.storageValue}
          </span>
          <span>
            <span style={{ color: "var(--fg-3)" }}>{t.assets.unusedLabel}</span> {t.assets.unusedValue}
          </span>
          <div style={{ flex: 1 }} />
          <span style={{ color: "var(--lime)" }}>{t.assets.autoBind}</span>
        </div>
      </div>
    </ShellWrap>
  );
}

function PlaytestPreview({ t }) {
  return (
    <ShellWrap title={t.playtest.title} liveLabel={t.shell.live}>
      <div className="checker scanline" style={{ position: "relative", height: "calc(100% - 32px)", background: "linear-gradient(180deg, #0a0d05 0%, #060805 100%)" }}>
        <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="pt2sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1a2b08" />
              <stop offset="1" stopColor="#0a0f04" />
            </linearGradient>
          </defs>
          <rect width="400" height="280" fill="url(#pt2sky)" />
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
            <polygon key={index} points={`${x},207 ${x + 6},215 ${x},223 ${x - 6},215`} fill="#f5a524" stroke="#3b1d04" strokeWidth="1.2" />
          ))}
          <g transform="translate(330 225)">
            <ellipse cx="0" cy="0" rx="13" ry="9" fill="#74d6c8" />
            <circle cx="-4" cy="-2" r="1.8" fill="#0a1f1c" />
            <circle cx="4" cy="-2" r="1.8" fill="#0a1f1c" />
          </g>
        </svg>
        <div className="mono" style={{ position: "absolute", top: 10, left: 12, color: "var(--lime)", fontSize: 10.5, textShadow: "0 0 8px rgba(200,247,60,0.4)" }}>
          {t.playtest.hud}
        </div>
        <div
          className="gne-row mono"
          style={{ position: "absolute", bottom: 10, right: 12, gap: 8, fontSize: 9, color: "var(--fg-1)", background: "rgba(12,12,10,0.8)", padding: "4px 8px", borderRadius: 4, border: "1px solid var(--border-2)" }}
        >
          {t.playtest.telemetry.map(([label, value]) => (
            <span key={label}>
              <span style={{ color: "var(--fg-3)" }}>{label}</span> {value}
            </span>
          ))}
        </div>
      </div>
    </ShellWrap>
  );
}
