import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";
import { ModulePreview } from "./module-previews";

/**
 * Shared layout for the five product detail pages (Architect, Scenes, Asset
 * studios, Playtest, Workspace). All copy comes from a per-page dictionary
 * namespace; structure (hero, feature sections, how-it-connects strip, CTA)
 * is identical, mirroring the established marketing page composition.
 */
export function ProductSubpage({ lang, namespace, navCurrent = "product", previewKind }) {
  const t = getDictionary(lang, namespace);
  const r = localizedRoutes(lang);

  return (
    <>
      <SiteNav lang={lang} current={navCurrent} />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
        secondaryCta={t.hero.secondaryCta}
        secondaryHref={r.how}
      />
      {previewKind && <PreviewBand lang={lang} previewKind={previewKind} />}
      {t.sections.map((section, index) => (
        <FeatureSection key={section.title} {...section} flip={index % 2 === 1} index={index} />
      ))}
      <ConnectStrip connect={t.connect} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function PreviewBand({ lang, previewKind }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-0)", borderBottom: "1px solid var(--border-1)" }}>
      <div className="site-wrap" style={{ maxWidth: 1000 }}>
        <div data-anim="reveal" style={{ position: "relative", width: "100%", aspectRatio: "16/9", maxHeight: "60vh", margin: "0 auto" }}>
          <ModulePreview kind={previewKind} lang={lang} />
        </div>
      </div>
    </section>
  );
}

function FeatureSection({ title, body, caps, flip, index }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: index % 2 === 0 ? "var(--bg-1)" : "var(--bg-0)" }}>
      <div className="site-wrap product-module-grid">
        <div className={`product-module-copy ${flip ? "flip" : ""}`}>
          <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(28px, 3.6vw, 38px)", fontWeight: 600, margin: 0, lineHeight: 1.06 }}>
            {title}
          </h2>
          <p data-anim="reveal" className="pretty" style={{ fontSize: 16, lineHeight: 1.62, color: "var(--fg-1)", margin: "20px 0 26px", maxWidth: 520 }}>
            {body}
          </p>
          <div data-anim-grid style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {caps.map(([heading, copy]) => (
              <div
                key={heading}
                data-anim-card
                className="gne-row"
                style={{ gap: 14, padding: "14px 16px", alignItems: "flex-start", background: "var(--bg-2)", border: "1px solid var(--border-1)", borderRadius: 8 }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    flex: "0 0 auto",
                    background: "var(--lime-bg)",
                    color: "var(--lime)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--lime-edge)",
                  }}
                >
                  <Icon d={I.check} size={13} stroke={2.4} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 3 }}>{heading}</div>
                  <div className="pretty" style={{ fontSize: 13, color: "var(--fg-1)", lineHeight: 1.55 }}>
                    {copy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-anim="reveal" className={`product-module-preview ${flip ? "flip" : ""}`} aria-hidden="true">
          <SectionGlyph index={index} />
        </div>
      </div>
    </section>
  );
}

const glyphIcons = [I.zap, I.history, I.doctor, I.layers, I.cube, I.users];

function SectionGlyph({ index }) {
  return (
    <div
      className="card"
      style={{
        width: "100%",
        aspectRatio: "4/3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(ellipse 70% 70% at 50% 40%, var(--lime-bg), transparent 70%), var(--bg-2)",
        border: "1px solid var(--border-1)",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,247,60,0.06)",
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 20,
          background: "var(--lime-bg)",
          border: "1px solid var(--lime-edge)",
          color: "var(--lime)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon d={glyphIcons[index % glyphIcons.length]} size={40} />
      </div>
    </div>
  );
}

function ConnectStrip({ connect }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          {connect.label}
        </div>
        <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(26px, 3.4vw, 36px)", fontWeight: 600, margin: "0 0 18px", lineHeight: 1.08 }}>
          {connect.heading}
        </h2>
        <p data-anim="reveal" className="pretty" style={{ fontSize: 16, lineHeight: 1.65, color: "var(--fg-1)", margin: "0 auto", maxWidth: 640 }}>
          {connect.body}
        </p>
      </div>
    </section>
  );
}
