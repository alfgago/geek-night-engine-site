import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";
import { ModulePreview } from "./module-previews";

/**
 * Structural module config (order, numbering, preview mock, layout flip).
 * All copy comes from the `product` dictionary, keyed by module id.
 */
const moduleConfig = [
  { id: "hub", n: "01", previewKind: "hub" },
  { id: "ai", n: "02", previewKind: "ai", flip: true },
  { id: "scene", n: "03", previewKind: "scene" },
  { id: "assets", n: "04", previewKind: "assets", flip: true },
  { id: "playtest", n: "05", previewKind: "playtest" },
];

export function ProductPage({ lang }) {
  const t = getDictionary(lang, "product");

  return (
    <>
      <SiteNav lang={lang} current="product" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
        secondaryCta={t.hero.secondaryCta}
      />
      {moduleConfig.map((module) => (
        <ProductModule
          key={module.id}
          {...module}
          lang={lang}
          moduleLabel={t.moduleLabel}
          title={t.modules[module.id].title}
          desc={t.modules[module.id].desc}
          caps={t.modules[module.id].caps}
        />
      ))}
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function ProductModule({ id, n, lang, title, desc, caps, previewKind, flip, moduleLabel }) {
  return (
    <section id={id} data-anim-section="features" className="site-section" style={{ background: id.match(/^(ai|assets)$/) ? "var(--bg-0)" : "var(--bg-1)" }}>
      <div className="site-wrap product-module-grid">
        <div className={`product-module-copy ${flip ? "flip" : ""}`}>
          <div data-anim="reveal" className="gne-row" style={{ gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--lime)", letterSpacing: "0.12em" }}>{n} ·</span>
            <span className="label-cap">{moduleLabel}</span>
          </div>
          <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(30px, 3.8vw, 40px)", fontWeight: 600, margin: 0, lineHeight: 1.05 }}>
            {title}
          </h2>
          <p data-anim="reveal" className="pretty" style={{ fontSize: 16, lineHeight: 1.6, color: "var(--fg-1)", margin: "20px 0 26px", maxWidth: 500 }}>
            {desc}
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
        <div data-anim="reveal" className={`product-module-preview ${flip ? "flip" : ""}`}>
          <ModulePreview kind={previewKind} lang={lang} />
        </div>
      </div>
    </section>
  );
}
