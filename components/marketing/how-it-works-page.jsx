import { routes } from "@/lib/site-links";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const STEPS_JSON = [
  {
    n: "01",
    l: "Blueprint",
    t: "Scaffolding from templates or prompt blueprints",
    c: "Initialize your project via a blank slate or select from our curated production templates — including 2D/3D platformers, top-down tactical setups, endless runners, and shooter frameworks. Tell the AI Architect your thematic goals, and it auto-populates your target design rules, global variables, and starter asset libraries.",
  },
  {
    n: "02",
    l: "Decompose",
    t: "Modular task breakdown and ticket ordering",
    c: "Our pipeline prevents the system from getting overwhelmed by complex instructions. When you prompt a massive system modification, the platform splits the intent into atomic execution tickets on an interactive kanban board. You review the board, reorder tasks to set priorities, add design image assets, and approve execution step-by-step.",
  },
  {
    n: "03",
    l: "Compile",
    t: "Headless cloud assembly and self-correction",
    c: "The approved tasks are pulled into our cloud worker architecture. The system safely builds scenes, writes clean logic scripts, and compiles a headless distribution target. If the compiler encounters an error, our pre-flight environment checks and self-healing systems analyze the error log, update the faulty logic pattern, and re-compile instantly.",
  },
  {
    n: "04",
    l: "Deploy",
    t: "Continuous deployment and version snapshots",
    c: "Every successful build generates an absolute snapshot of the entire game design model. You can label, pin, or revert to past snapshots at any time, protecting your work. The finalized code is securely routed to high-speed cloud distribution storage, delivering a live URL to your playtest iframe and external testers.",
  },
];

export function HowItWorksPage() {
  return (
    <>
      <SiteNav current="how" />
      <PageHero
        eyebrow="The production pipeline"
        heading="The science of error-free AI game synthesis."
        sub="How our structured orchestration layer turns conversational ideas into production-ready game builds without code regression."
        primaryCta="Join launch newsletter"
        secondaryCta="See pricing"
        secondaryHref={routes.pricing}
      />
      <PipelineSection />
      <PrinciplesGrid />
      <CtaStrip
        heading="Four stages, all auditable, all reversible."
        sub="Snapshot before, snapshot after — and release notes before the product opens."
        cta="Get build notes"
      />
      <SiteFooter />
    </>
  );
}

function PipelineSection() {
  return (
    <section data-anim-section="how" style={{ position: "relative", background: "var(--bg-0)", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ height: "440vh", position: "relative" }}>
        <div data-anim-pin style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "40px 32px 18px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
            <div className="label-cap" style={{ marginBottom: 10 }}>
              The pipeline · live
            </div>
            <h2 className="pretty" style={{ fontSize: 32, fontWeight: 600, letterSpacing: 0, margin: 0, lineHeight: 1.1 }}>
              Four stages, all auditable, all reversible.
            </h2>
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 32px 12px" }}>
            <div className="gne-row" data-anim-steps style={{ gap: 12 }}>
              {STEPS_JSON.map((step, index) => (
                <div
                  key={step.n}
                  data-step={index}
                  className="gne-col"
                  style={{
                    flex: 1,
                    gap: 4,
                    padding: "10px 14px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--border-1)",
                    borderRadius: 8,
                    transition: "all 0.4s",
                    alignItems: "flex-start",
                  }}
                >
                  <div className="gne-row" style={{ gap: 9, width: "100%" }}>
                    <span
                      data-step-num
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: "var(--bg-3)",
                        border: "1px solid var(--border-2)",
                        color: "var(--fg-2)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.4s",
                      }}
                    >
                      {step.n}
                    </span>
                    <span data-step-label style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-1)", transition: "color 0.4s" }}>
                      {step.l}
                    </span>
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 10.5,
                      color: "var(--fg-3)",
                      paddingLeft: 31,
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {step.t}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, position: "relative", margin: "0 32px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 1100, aspectRatio: "16/9", maxHeight: "60vh" }}>
              <PipelineStages />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineStages() {
  return (
    <>
      <div
        data-stage="0"
        className="card"
        style={{ position: "absolute", inset: "6% 10%", padding: 0, background: "var(--bg-2)", opacity: 0, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,247,60,0.08)" }}
      >
        <div className="panel-head">
          <span className="title">SCAFFOLDING · CHOOSE A STARTER</span>
        </div>
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, height: "calc(100% - 41px)", overflow: "hidden" }}>
          {["2D platformer", "3D platformer", "Top-down", "Shooter", "Puzzle", "Endless run", "Blank 2D", "From prompt"].map((title, index) => (
            <div key={title} className="card" style={{ padding: 0, overflow: "hidden", borderColor: index === 7 ? "var(--lime-edge)" : "var(--border-1)" }}>
              <div className="placeholder" style={{ height: 60, borderRadius: 0, border: 0, background: "linear-gradient(135deg, rgba(200,247,60,0.08), transparent)" }}>
                {index === 7 ? (
                  <Icon d={I.sparkles} size={18} style={{ color: "var(--lime)" }} />
                ) : (
                  <span className="mono" style={{ fontSize: 9, color: "var(--fg-3)", letterSpacing: "0.1em" }}>
                    {title.toUpperCase()}
                  </span>
                )}
              </div>
              <div style={{ padding: "8px 10px", fontSize: 12 }}>{title}</div>
              {index === 7 && (
                <div className="mono" style={{ padding: "0 10px 8px", fontSize: 10, color: "var(--lime)" }}>
                  ↳ described by you
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        data-stage="1"
        className="card"
        style={{ position: "absolute", inset: "6% 10%", padding: 0, background: "var(--bg-2)", opacity: 0, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,247,60,0.08)" }}
      >
        <div className="panel-head">
          <span className="title">DECOMPOSE · 6 ATOMIC TICKETS</span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-3)" }}>
            drag · prioritize · approve
          </span>
        </div>
        <div style={{ padding: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, height: "calc(100% - 41px)" }}>
          {[
            { l: "BACKLOG", items: [["#318", "tune dash cooldown"], ["#319", "add fall damage"]] },
            { l: "QUEUED · 4", items: [["#312", "add_node Boss.Phase1"], ["#313", "add_node Boss.Phase2 · Stomp"], ["#314", "add_node Boss.Phase3 · Charge"], ["#315", "edit_script boss.gd"]] },
            { l: "APPROVED · 2", items: [["#316", "bind boss-roar.wav"], ["#317", "trigger build v0.5.0"]] },
          ].map((column, columnIndex) => (
            <div key={column.l} style={{ background: "var(--bg-0)", border: "1px solid var(--border-1)", borderRadius: 6, padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="label-cap" style={{ color: columnIndex === 2 ? "var(--lime)" : columnIndex === 1 ? "var(--amber)" : "var(--fg-3)" }}>
                {column.l}
              </div>
              {column.items.map(([id, label]) => (
                <div key={id} data-anim-op className="card" style={{ padding: "8px 10px", background: columnIndex === 2 ? "var(--lime-bg)" : "var(--bg-2)", borderColor: columnIndex === 2 ? "var(--lime-edge)" : "var(--border-1)", opacity: 0, transform: "translateX(-10px)" }}>
                  <div className="gne-row mono" style={{ fontSize: 10, color: "var(--fg-3)", gap: 6 }}>
                    {id}
                    {columnIndex === 2 && (
                      <span className="chip lime" style={{ height: 12, fontSize: 8, padding: "0 4px", marginLeft: "auto" }}>
                        READY
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--fg-0)", marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div data-stage="2" style={{ position: "absolute", inset: "6% 10%", opacity: 0 }}>
        <div className="card scanline" style={{ padding: "24px 26px", background: "var(--bg-2)", height: "100%", display: "flex", flexDirection: "column", gap: 22, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,247,60,0.08)" }}>
          <div className="gne-row">
            <div>
              <div className="label-cap">CLOUD COMPILE · BUILD #149</div>
              <h3 style={{ fontSize: 18, margin: "4px 0 0", fontWeight: 600 }}>godot --headless · self-healing</h3>
            </div>
            <div style={{ flex: 1 }} />
            <span className="chip lime">
              <span className="dot lime" /> retry · ok
            </span>
          </div>
          <div className="gne-row" style={{ gap: 12, flexWrap: "wrap" }}>
            {[
              ["GDD validate", "0.4s", "ok"],
              ["Doctor", "0.2s", "ok"],
              ["Op resolve", "1.1s", "ok"],
              ["godot compile", "13.8s", "err"],
              ["Self-heal", "2.1s", "ok"],
              ["godot retry", "9.4s", "ok"],
              ["WebGL bundle", "1.0s", "ok"],
              ["Deploy", "0.2s", "ok"],
            ].map(([label, time, status]) => (
              <div key={label} data-anim-pipe className="gne-row" style={{ gap: 9, opacity: 0, transform: "translateY(8px)" }}>
                <span data-anim-pipe-tick style={{ width: 22, height: 22, borderRadius: 999, background: status === "err" ? "var(--red-bg)" : "var(--lime-bg)", border: `1px solid ${status === "err" ? "var(--red-edge)" : "var(--lime-edge)"}`, color: status === "err" ? "var(--red)" : "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon d={status === "err" ? I.close : I.check} size={11} stroke={2.4} />
                </span>
                <div className="gne-col" style={{ alignItems: "flex-start" }}>
                  <span style={{ fontSize: 12.5, color: "var(--fg-0)" }}>{label}</span>
                  <span className="mono" style={{ fontSize: 10, color: status === "err" ? "var(--red)" : "var(--lime)" }}>{time}</span>
                </div>
              </div>
            ))}
          </div>
          <div data-anim-snap className="card" style={{ padding: "14px 18px", background: "var(--bg-1)", marginTop: "auto", opacity: 0, transform: "translateY(20px)", border: "1px solid var(--amber-edge)" }}>
            <div className="gne-row" style={{ gap: 10 }}>
              <span className="dot amber" />
              <span className="mono" style={{ fontSize: 11, color: "var(--amber)" }}>SELF-HEAL · 1 ERROR PATCHED</span>
              <div style={{ flex: 1 }} />
              <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>CollisionShape3D null · auto-bound</span>
            </div>
            <div className="mono pretty" style={{ marginTop: 8, fontSize: 12.5, color: "var(--fg-1)" }}>
              Snapshot #95 created before patch · build #149 succeeded on retry · revert one click
            </div>
          </div>
        </div>
      </div>

      <div
        data-stage="3"
        className="card"
        style={{ position: "absolute", inset: "6% 10%", padding: 0, background: "var(--bg-2)", opacity: 0, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,247,60,0.15)" }}
      >
        <div className="panel-head">
          <span className="title">DEPLOY · SNAPSHOTS</span>
        </div>
        <div style={{ padding: 22, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22, height: "calc(100% - 41px)" }}>
          <div>
            <div className="label-cap" style={{ marginBottom: 10 }}>
              Snapshot timeline
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "var(--border-1)" }} />
              {[
                { id: 149, t: "deployed · play.gne/pebble-punks", c: "lime", head: true },
                { id: 148, t: "+ gem pickups · architect", c: "lime" },
                { id: 147, t: "drifter jitter", c: "lime" },
                { id: 146, t: "coyote time + speed", c: "lime" },
                { id: 144, t: "boss room attempt · failed", c: "red" },
                { id: 138, t: "pinned · pre-boss-pass", c: "cyan", pin: true },
              ].map((snapshot) => (
                <div key={snapshot.id} className="gne-row" style={{ padding: "8px 0 8px 22px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, top: 12, width: 18, height: 18, borderRadius: 999, background: snapshot.head ? "var(--lime)" : "var(--bg-2)", border: `2px solid var(--${snapshot.c})`, boxShadow: snapshot.head ? "0 0 8px var(--lime-edge)" : "none" }} />
                  <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)", flex: "0 0 50px" }}>#{snapshot.id}</span>
                  <span style={{ fontSize: 12.5, color: "var(--fg-1)" }} className="pretty">{snapshot.t}</span>
                  {snapshot.pin && <span className="chip cyan" style={{ marginLeft: 8, height: 16, fontSize: 9, padding: "0 5px" }}>PINNED</span>}
                  {snapshot.head && <span className="chip lime" style={{ marginLeft: 8, height: 16, fontSize: 9, padding: "0 5px" }}>HEAD</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="label-cap" style={{ marginBottom: 10 }}>
              Distribution
            </div>
            <div className="card" style={{ padding: 14, background: "var(--bg-1)" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>LIVE URL</div>
              <div className="mono" style={{ fontSize: 13.5, color: "var(--lime)", marginTop: 4, textShadow: "0 0 8px var(--lime-edge)" }}>play.gne/pebble-punks</div>
              <div className="gne-divider" style={{ margin: "10px 0" }} />
              {[["artifact", "3.42 MB · WebGL"], ["CDN edge", "12 regions · 38ms p50"], ["testers", "12 signed up · 1 live"], ["snapshot", "#149 · 11.8s ago"]].map(([key, value]) => (
                <div key={key} className="gne-row mono" style={{ fontSize: 11, padding: "4px 0", borderTop: "1px dashed var(--border-1)" }}>
                  <span style={{ color: "var(--fg-3)", flex: "0 0 70px" }}>{key}</span>
                  <span style={{ color: "var(--fg-0)" }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="gne-row mono" style={{ marginTop: 16, gap: 6, color: "var(--lime)", fontSize: 11, textShadow: "0 0 6px var(--lime-edge)" }}>
              <Icon d={I.check} size={12} stroke={2.4} /> revert · re-pin · re-deploy · anytime
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PrinciplesGrid() {
  const items = [
    { i: I.layers, t: "Atomic, not monolithic", d: "Every prompt is split into typed operations. Nothing is a black box; nothing overwrites accidentally." },
    { i: I.doctor, t: "Self-correcting", d: "Pre-flight checks + automated error analysis patch broken builds without your team noticing." },
    { i: I.history, t: "Snapshot before & after", d: "Every successful build captures the full GDD. Roll back to any state in one click." },
    { i: I.users, t: "Audit-trailed", d: "Prompts, builds, snapshots, settings, billing — every action lands in the immutable log." },
  ];
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          Principles
        </div>
        <h2 data-anim="reveal" className="pretty" style={{ fontSize: 36, fontWeight: 600, letterSpacing: 0, margin: "0 0 48px", lineHeight: 1.1, maxWidth: 780 }}>
          Built so the AI never costs you a regression.
        </h2>
        <div data-anim-grid className="site-grid-4">
          {items.map((principle) => (
            <div key={principle.t} data-anim-card className="card" style={{ padding: "22px 22px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, marginBottom: 16, background: "var(--lime-bg)", border: "1px solid var(--lime-edge)", color: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={principle.i} size={16} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px", letterSpacing: 0 }}>{principle.t}</h3>
              <p className="pretty" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--fg-1)", margin: 0 }}>
                {principle.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
