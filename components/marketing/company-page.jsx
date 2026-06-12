import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";

/**
 * Voice-of-the-studio prose page (About, Careers). Hero plus titled sections,
 * each with one or more paragraphs. An optional contact card (used by Careers)
 * surfaces a marketing-data email so addresses stay in one place.
 */
export function CompanyPage({ lang, namespace, navCurrent, contactEmail }) {
  const t = getDictionary(lang, namespace);

  return (
    <>
      <SiteNav lang={lang} current={navCurrent} />
      <PageHero lang={lang} eyebrow={t.hero.eyebrow} heading={t.hero.heading} sub={t.hero.sub} />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          {t.sections.map((section) => (
            <article key={section.title} data-anim="reveal">
              <h2 className="balance display" style={{ fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 600, margin: "0 0 18px", lineHeight: 1.1 }}>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="pretty" style={{ fontSize: 16, lineHeight: 1.72, color: "var(--fg-1)", margin: "0 0 14px", maxWidth: 720 }}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
          {t.contactCard && contactEmail && (
            <div data-anim="reveal" className="card" style={{ padding: "24px 26px", background: "var(--bg-2)", border: "1px solid var(--lime-edge)" }}>
              <div className="label-cap" style={{ marginBottom: 8 }}>
                {t.contactCard.label}
              </div>
              <div className="pretty" style={{ fontSize: 15, color: "var(--fg-1)", marginBottom: 8 }}>
                {t.contactCard.lead}
              </div>
              <a href={`mailto:${contactEmail}`} className="mono" style={{ fontSize: 16, color: "var(--lime)", textShadow: "0 0 6px var(--lime-edge)", textDecoration: "none" }}>
                {contactEmail}
              </a>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 8 }}>
                {t.contactCard.detail}
              </div>
            </div>
          )}
        </div>
      </section>
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}
