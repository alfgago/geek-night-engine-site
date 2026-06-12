import Link from "next/link";
import { getNewsPosts } from "@/data/news-posts";
import { getDictionary, localizePath } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";
import { NewsletterSignup } from "./newsletter-signup";

export function NewsPage({ lang }) {
  const t = getDictionary(lang, "news");

  return (
    <>
      <SiteNav lang={lang} current="news" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
      />
      <NewsIndex lang={lang} t={t} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function NewsIndex({ lang, t }) {
  const tc = getDictionary(lang, "common");
  const posts = getNewsPosts(lang);

  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        {posts.length > 0 ? (
          <div data-anim-grid className="site-grid-3">
            {posts.map((post) => (
              <article key={post.slug} data-anim-card className="card" style={{ padding: "24px 24px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
                <div className="label-cap" style={{ color: "var(--lime)", marginBottom: 10 }}>
                  {post.date}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 10px", letterSpacing: 0 }}>{post.title}</h2>
                <p className="pretty" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)", margin: "0 0 18px" }}>
                  {post.excerpt}
                </p>
                <Link href={localizePath(lang, `/news/${post.slug}`)} className="btn sm" style={{ alignSelf: "flex-start" }}>
                  {t.index.readMore} <Icon d={I.chevRight} size={12} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="site-grid-2" style={{ alignItems: "stretch" }}>
            <div data-anim="reveal" className="card" style={{ padding: "30px 28px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
              <span className="chip amber" style={{ marginBottom: 18 }}>
                <span className="dot amber" /> {tc.chips.comingSoon}
              </span>
              <h2 className="pretty" style={{ fontSize: 34, fontWeight: 600, letterSpacing: 0, margin: "0 0 14px", lineHeight: 1.1 }}>
                {t.index.emptyHeading}
              </h2>
              <p className="pretty" style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--fg-1)", margin: 0, maxWidth: 560 }}>
                {t.index.emptyBody}
              </p>
            </div>
            <NewsletterSignup
              lang={lang}
              id="news-dispatch"
              eyebrow={t.index.dispatch.eyebrow}
              heading={t.index.dispatch.heading}
              sub={t.index.dispatch.sub}
            />
          </div>
        )}
      </div>
    </section>
  );
}
