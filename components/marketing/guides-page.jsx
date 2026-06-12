import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";

export function GuidesPage({ lang }) {
  const t = getDictionary(lang, "guides");
  const r = localizedRoutes(lang);

  return (
    <>
      <SiteNav lang={lang} current="guides" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
        secondaryCta={t.hero.secondaryCta}
        secondaryHref={r.docs}
      />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div className="site-wrap" style={{ maxWidth: 980 }}>
          <nav aria-label={t.tocLabel} style={{ marginBottom: 40 }}>
            <div className="label-cap" style={{ marginBottom: 12 }}>
              {t.tocLabel}
            </div>
            <div className="gne-row" style={{ gap: 10, flexWrap: "wrap" }}>
              {t.guides.map((guide) => (
                <a key={guide.id} href={`#${guide.id}`} className="chip" style={{ height: 30, padding: "0 12px", fontSize: 12.5, textDecoration: "none" }}>
                  {guide.title}
                </a>
              ))}
            </div>
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {t.guides.map((guide) => (
              <Guide key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function Guide({ guide }) {
  return (
    <article id={guide.id} data-anim="reveal" className="card" style={{ padding: "28px 30px", background: "var(--bg-2)", border: "1px solid var(--border-1)", scrollMarginTop: 90 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: 0, margin: "0 0 8px", lineHeight: 1.12 }}>
        {guide.title}
      </h2>
      <p className="pretty" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 0 24px" }}>
        {guide.intro}
      </p>
      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
        {guide.steps.map(([heading, copy], index) => (
          <li key={heading} className="gne-row" style={{ gap: 16, alignItems: "flex-start" }}>
            <span
              className="mono"
              style={{
                width: 28,
                height: 28,
                flex: "0 0 auto",
                borderRadius: 999,
                background: "var(--lime-bg)",
                border: "1px solid var(--lime-edge)",
                color: "var(--lime)",
                fontSize: 12.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index + 1}
            </span>
            <div>
              <div style={{ fontSize: 15.5, fontWeight: 600, marginBottom: 4 }}>{heading}</div>
              <div className="pretty" style={{ fontSize: 14, color: "var(--fg-1)", lineHeight: 1.65 }}>
                {copy}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
