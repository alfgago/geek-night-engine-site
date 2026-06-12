import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const stepNumbers = ["01", "02", "03", "04"];
const principleIcons = [I.layers, I.doctor, I.history, I.users];

export function HowItWorksPage({ lang }) {
  const t = getDictionary(lang, "how-it-works");
  const r = localizedRoutes(lang);

  return (
    <>
      <SiteNav lang={lang} current="how" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
        secondaryCta={t.hero.secondaryCta}
        secondaryHref={r.pricing}
      />
      <PipelineSection t={t} />
      <PrinciplesGrid t={t} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function PipelineSection({ t }) {
  return (
    <section data-anim-section="how" style={{ position: "relative", background: "var(--bg-0)", borderBottom: "1px solid var(--border-1)" }}>
      <div style={{ height: "440vh", position: "relative" }}>
        <div data-anim-pin style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "40px 32px 18px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
            <div className="label-cap" style={{ marginBottom: 10 }}>
              {t.pipeline.label}
            </div>
            <h2 className="pretty" style={{ fontSize: 32, fontWeight: 600, letterSpacing: 0, margin: 0, lineHeight: 1.1 }}>
              {t.pipeline.heading}
            </h2>
          </div>

          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", padding: "0 32px 12px" }}>
            <div className="gne-row" data-anim-steps style={{ gap: 12 }}>
              {t.steps.map((step, index) => (
                <div
                  key={stepNumbers[index]}
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
                      {stepNumbers[index]}
                    </span>
                    <span data-step-label style={{ fontSize: 14, fontWeight: 500, color: "var(--fg-1)", transition: "color 0.4s" }}>
                      {step.label}
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
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, position: "relative", margin: "0 32px 40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 1100, aspectRatio: "16/9", maxHeight: "60vh" }}>
              <PipelineStages mock={t.pipelineMock} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineStages({ mock }) {
  return (
    <>
      <div
        data-stage="0"
        className="card"
        style={{ position: "absolute", inset: "6% 10%", padding: 0, background: "var(--bg-2)", opacity: 0, boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,247,60,0.08)" }}
      >
        <div className="panel-head">
          <span className="title">{mock.scaffold.title}</span>
        </div>
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, height: "calc(100% - 41px)", overflow: "hidden" }}>
          {mock.scaffold.templates.map((title, index) => (
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
                  {mock.scaffold.describedByYou}
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
          <span className="title">{mock.decompose.title}</span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-3)" }}>
            {mock.decompose.subtitle}
          </span>
        </div>
        <div style={{ padding: 22, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, height: "calc(100% - 41px)" }}>
          {mock.decompose.columns.map((column, columnIndex) => (
            <div key={column.label} style={{ background: "var(--bg-0)", border: "1px solid var(--border-1)", borderRadius: 6, padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              <div className="label-cap" style={{ color: columnIndex === 2 ? "var(--lime)" : columnIndex === 1 ? "var(--amber)" : "var(--fg-3)" }}>
                {column.label}
              </div>
              {column.items.map(([id, label]) => (
                <div key={id} data-anim-op className="card" style={{ padding: "8px 10px", background: columnIndex === 2 ? "var(--lime-bg)" : "var(--bg-2)", borderColor: columnIndex === 2 ? "var(--lime-edge)" : "var(--border-1)", opacity: 0, transform: "translateX(-10px)" }}>
                  <div className="gne-row mono" style={{ fontSize: 10, color: "var(--fg-3)", gap: 6 }}>
                    {id}
                    {columnIndex === 2 && (
                      <span className="chip lime" style={{ height: 12, fontSize: 8, padding: "0 4px", marginLeft: "auto" }}>
                        {mock.decompose.ready}
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
              <div className="label-cap">{mock.compile.label}</div>
              <h3 style={{ fontSize: 18, margin: "4px 0 0", fontWeight: 600 }}>{mock.compile.heading}</h3>
            </div>
            <div style={{ flex: 1 }} />
            <span className="chip lime">
              <span className="dot lime" /> {mock.compile.retryOk}
            </span>
          </div>
          <div className="gne-row" style={{ gap: 12, flexWrap: "wrap" }}>
            {mock.compile.steps.map(({ label, time, status }) => (
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
              <span className="mono" style={{ fontSize: 11, color: "var(--amber)" }}>{mock.compile.selfHealLabel}</span>
              <div style={{ flex: 1 }} />
              <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>{mock.compile.selfHealDetail}</span>
            </div>
            <div className="mono pretty" style={{ marginTop: 8, fontSize: 12.5, color: "var(--fg-1)" }}>
              {mock.compile.summary}
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
          <span className="title">{mock.deploy.title}</span>
        </div>
        <div style={{ padding: 22, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 22, height: "calc(100% - 41px)" }}>
          <div>
            <div className="label-cap" style={{ marginBottom: 10 }}>
              {mock.deploy.timelineLabel}
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 8, top: 8, bottom: 8, width: 2, background: "var(--border-1)" }} />
              {mock.deploy.snapshots.map((snapshot) => (
                <div key={snapshot.id} className="gne-row" style={{ padding: "8px 0 8px 22px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, top: 12, width: 18, height: 18, borderRadius: 999, background: snapshot.head ? "var(--lime)" : "var(--bg-2)", border: `2px solid var(--${snapshot.color})`, boxShadow: snapshot.head ? "0 0 8px var(--lime-edge)" : "none" }} />
                  <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)", flex: "0 0 50px" }}>#{snapshot.id}</span>
                  <span style={{ fontSize: 12.5, color: "var(--fg-1)" }} className="pretty">{snapshot.text}</span>
                  {snapshot.pin && <span className="chip cyan" style={{ marginLeft: 8, height: 16, fontSize: 9, padding: "0 5px" }}>{mock.deploy.pinned}</span>}
                  {snapshot.head && <span className="chip lime" style={{ marginLeft: 8, height: 16, fontSize: 9, padding: "0 5px" }}>{mock.deploy.head}</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="label-cap" style={{ marginBottom: 10 }}>
              {mock.deploy.distributionLabel}
            </div>
            <div className="card" style={{ padding: 14, background: "var(--bg-1)" }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>{mock.deploy.liveUrlLabel}</div>
              <div className="mono" style={{ fontSize: 13.5, color: "var(--lime)", marginTop: 4, textShadow: "0 0 8px var(--lime-edge)" }}>{mock.deploy.liveUrl}</div>
              <div className="gne-divider" style={{ margin: "10px 0" }} />
              {mock.deploy.metrics.map(([key, value]) => (
                <div key={key} className="gne-row mono" style={{ fontSize: 11, padding: "4px 0", borderTop: "1px dashed var(--border-1)" }}>
                  <span style={{ color: "var(--fg-3)", flex: "0 0 70px" }}>{key}</span>
                  <span style={{ color: "var(--fg-0)" }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="gne-row mono" style={{ marginTop: 16, gap: 6, color: "var(--lime)", fontSize: 11, textShadow: "0 0 6px var(--lime-edge)" }}>
              <Icon d={I.check} size={12} stroke={2.4} /> {mock.deploy.actions}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function PrinciplesGrid({ t }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          {t.principles.label}
        </div>
        <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 600, margin: "0 0 48px", lineHeight: 1.04, maxWidth: 780 }}>
          {t.principles.heading}
        </h2>
        <div data-anim-grid className="site-grid-4">
          {t.principles.items.map((principle, index) => (
            <div key={principle.title} data-anim-card className="card spotlight" style={{ padding: "22px 22px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, marginBottom: 16, background: "var(--lime-bg)", border: "1px solid var(--lime-edge)", color: "var(--lime)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon d={principleIcons[index]} size={16} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 8px", letterSpacing: 0 }}>{principle.title}</h3>
              <p className="pretty" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--fg-1)", margin: 0 }}>
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
