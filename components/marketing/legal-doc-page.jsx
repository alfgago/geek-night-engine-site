import { getDictionary, format } from "@/lib/i18n";
import { contacts } from "@/data/marketing-data";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";

/**
 * Generic legal/policy document page (Security, DMCA). Renders a hero plus a
 * stack of titled sections with body paragraphs and/or bullet lists. Contact
 * emails are interpolated from data/marketing-data.js so they live in one
 * place. Distinct from legal-page.jsx, which is the Privacy/Terms pair.
 */
const emailVars = {
  privacyEmail: contacts.privacy,
  legalEmail: contacts.legal,
  dmcaEmail: contacts.dmca,
  supportEmail: contacts.support,
};

export function LegalDocPage({ lang, namespace, navCurrent }) {
  const t = getDictionary(lang, namespace);

  return (
    <>
      <SiteNav lang={lang} current={navCurrent} />
      <PageHero lang={lang} eyebrow={t.hero.eyebrow} heading={t.hero.heading} sub={t.hero.sub} />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 }}>
          {t.sections.map((section) => (
            <LegalSection key={section.title} {...section} />
          ))}
        </div>
      </section>
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function LegalSection({ title, body, list }) {
  return (
    <article data-anim="reveal" className="card" style={{ padding: "24px 26px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0, margin: "0 0 14px", lineHeight: 1.15 }}>{title}</h2>
      {body?.map((paragraph) => (
        <p key={paragraph} className="pretty" style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--fg-1)", margin: "0 0 12px" }}>
          {format(paragraph, emailVars)}
        </p>
      ))}
      {list && (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map((item) => (
            <li key={item} className="pretty" style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--fg-1)", paddingLeft: 18, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, top: 9, width: 6, height: 6, borderRadius: 999, background: "var(--lime)" }} />
              {format(item, emailVars)}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
