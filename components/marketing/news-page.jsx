import Link from "next/link";
import { newsPosts } from "@/data/news-posts";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";
import { NewsletterSignup } from "./newsletter-signup";

export function NewsPage() {
  return (
    <>
      <SiteNav current="news" />
      <PageHero
        eyebrow="News"
        heading="Field notes from the browser-native game studio."
        sub="Launch updates, product notes, and behind-the-scenes engineering dispatches from Geek Night Engine."
        primaryCta="Subscribe for updates"
      />
      <NewsIndex />
      <CtaStrip heading="First access is still warming up." sub="Subscribe now and we will send the first public post when it goes live." cta="Join the news list" />
      <SiteFooter />
    </>
  );
}

function NewsIndex() {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        {newsPosts.length > 0 ? (
          <div data-anim-grid className="site-grid-3">
            {newsPosts.map((post) => (
              <article key={post.slug} data-anim-card className="card" style={{ padding: "24px 24px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
                <div className="label-cap" style={{ color: "var(--lime)", marginBottom: 10 }}>
                  {post.date}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 10px", letterSpacing: 0 }}>{post.title}</h2>
                <p className="pretty" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)", margin: "0 0 18px" }}>
                  {post.excerpt}
                </p>
                <Link href={`/news/${post.slug}`} className="btn sm" style={{ alignSelf: "flex-start" }}>
                  Read update <Icon d={I.chevRight} size={12} />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="site-grid-2" style={{ alignItems: "stretch" }}>
            <div data-anim="reveal" className="card" style={{ padding: "30px 28px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
              <span className="chip amber" style={{ marginBottom: 18 }}>
                <span className="dot amber" /> Coming Soon
              </span>
              <h2 className="pretty" style={{ fontSize: 34, fontWeight: 600, letterSpacing: 0, margin: "0 0 14px", lineHeight: 1.1 }}>
                No posts yet.
              </h2>
              <p className="pretty" style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--fg-1)", margin: 0, maxWidth: 560 }}>
                The first Geek Night Engine news post is queued for later. This page is ready for launch notes, changelog
                summaries, engineering updates, and early-access announcements.
              </p>
            </div>
            <NewsletterSignup
              id="news-dispatch"
              eyebrow="News dispatch"
              heading="Get the first post."
              sub="Subscribe now and the first launch update will land in your inbox when it is published."
            />
          </div>
        )}
      </div>
    </section>
  );
}
