import Link from "next/link";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { CtaStrip, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";
import { NewsletterSignup } from "./newsletter-signup";

export function NewsArticlePage({ lang, post }) {
  const t = getDictionary(lang, "news").article;
  const r = localizedRoutes(lang);

  return (
    <>
      <SiteNav lang={lang} current="news" />
      <article>
        <header style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border-1)", background: "var(--bg-0)" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse 1000px 500px at 20% 0%, rgba(200,247,60,0.12), transparent 60%), radial-gradient(ellipse 900px 500px at 80% 80%, rgba(116,214,200,0.07), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: 1040, margin: "0 auto", padding: "82px 32px 56px" }}>
            <Link href={r.news} className="btn ghost sm" style={{ marginBottom: 28 }}>
              <Icon d={I.chevRight} size={12} style={{ transform: "rotate(180deg)" }} /> {t.back}
            </Link>
            <div className="gne-row" style={{ gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              <span className="chip lime">{post.eyebrow}</span>
              <span className="chip ghost">{post.date}</span>
              <span className="chip ghost">{post.readTime}</span>
            </div>
            <h1
              className="pretty"
              style={{
                fontSize: "clamp(42px, 6vw, 72px)",
                lineHeight: 0.98,
                letterSpacing: 0,
                fontWeight: 600,
                margin: 0,
                maxWidth: 960,
              }}
            >
              {post.title}
            </h1>
            <p className="pretty" style={{ fontSize: 18, lineHeight: 1.6, color: "var(--fg-1)", margin: "24px 0 0", maxWidth: 760 }}>
              {post.dek}
            </p>
            <div className="site-grid-3" style={{ marginTop: 34, gap: 12 }}>
              {post.heroStats.map(([label, value]) => (
                <div key={label} className="card" style={{ padding: "14px 16px", background: "rgba(19,19,17,0.72)", border: "1px solid var(--border-2)" }}>
                  <div className="label-cap" style={{ marginBottom: 6 }}>
                    {label}
                  </div>
                  <div className="pretty" style={{ fontSize: 13.5, color: "var(--fg-0)", lineHeight: 1.45 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <section className="site-section" style={{ background: "var(--bg-1)", paddingTop: 72 }}>
          <div className="news-article-grid">
            <div>
              {post.body.map((block, index) => (
                <ArticleBlock key={`${block.type}-${index}`} block={block} />
              ))}
              <div className="card" style={{ marginTop: 42, padding: "20px 22px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
                <div className="label-cap" style={{ marginBottom: 12 }}>
                  {t.references}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {post.sources.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} style={{ color: "var(--lime)", textDecoration: "none", fontSize: 13 }} target="_blank" rel="noreferrer">
                        {source.label} <span aria-hidden="true">-&gt;</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="news-article-aside">
              <NewsletterSignup
                lang={lang}
                id="article-newsletter"
                eyebrow={t.aside.eyebrow}
                heading={t.aside.heading}
                sub={t.aside.sub}
                compact
              />
              <div className="card" style={{ marginTop: 14, padding: "16px 18px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
                <div className="label-cap" style={{ marginBottom: 8 }}>
                  {t.authorLabel}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{post.author}</div>
                <div className="mono" style={{ marginTop: 6, color: "var(--fg-3)", fontSize: 11 }}>
                  {post.category}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function ArticleBlock({ block }) {
  if (block.type === "heading") {
    return (
      <h2
        className="pretty"
        style={{
          fontSize: 30,
          lineHeight: 1.12,
          letterSpacing: 0,
          margin: "42px 0 16px",
          fontWeight: 600,
        }}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    return (
      <ul style={{ margin: "20px 0 28px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
        {block.items.map((item) => (
          <li key={item} className="gne-row" style={{ gap: 12, alignItems: "flex-start", fontSize: 15.5, lineHeight: 1.65, color: "var(--fg-1)" }}>
            <Icon d={I.check} size={13} stroke={2.4} style={{ color: "var(--lime)", marginTop: 7, flex: "0 0 auto" }} />
            <span className="pretty">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="pretty" style={{ fontSize: 16.5, lineHeight: 1.78, color: "var(--fg-1)", margin: "0 0 22px" }}>
      {block.text}
    </p>
  );
}
