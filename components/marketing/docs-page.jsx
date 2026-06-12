import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";

export function DocsPage({ lang }) {
  const t = getDictionary(lang, "docs");
  const r = localizedRoutes(lang);

  return (
    <>
      <SiteNav lang={lang} current="docs" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
        secondaryCta={t.hero.secondaryCta}
        secondaryHref={r.how}
      />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div className="site-wrap docs-layout" style={{ maxWidth: 1100, display: "grid", gridTemplateColumns: "240px 1fr", gap: 48, alignItems: "start" }}>
          <nav className="docs-toc" aria-label={t.tocLabel} style={{ position: "sticky", top: 90 }}>
            <div className="label-cap" style={{ marginBottom: 12 }}>
              {t.tocLabel}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {t.articles.map((article) => (
                <li key={article.id}>
                  <a href={`#${article.id}`} style={{ fontSize: 13.5, color: "var(--fg-1)", textDecoration: "none" }}>
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {t.articles.map((article) => (
              <article key={article.id} id={article.id} data-anim="reveal" className="card" style={{ padding: "26px 28px", background: "var(--bg-2)", border: "1px solid var(--border-1)", scrollMarginTop: 90 }}>
                <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0, margin: "0 0 16px", lineHeight: 1.15 }}>
                  {article.title}
                </h2>
                {article.body.map((paragraph) => (
                  <p key={paragraph} className="pretty" style={{ fontSize: 14.5, lineHeight: 1.72, color: "var(--fg-1)", margin: "0 0 12px" }}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}
