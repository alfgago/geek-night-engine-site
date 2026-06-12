import { getDictionary, format } from "@/lib/i18n";
import { contacts } from "@/data/marketing-data";
import { PageHero, SiteFooter, SiteNav } from "./chrome";

/**
 * Legal copy lives in data/i18n/{lang}/legal.json. Contact emails are
 * interpolated from data/marketing-data.js so they exist in exactly one
 * place across locales.
 */
const emailVars = {
  privacyEmail: contacts.privacy,
  legalEmail: contacts.legal,
  dmcaEmail: contacts.dmca,
  supportEmail: contacts.support,
};

export function PrivacyPage({ lang }) {
  const t = getDictionary(lang, "legal");
  return <LegalLayout lang={lang} current="privacy" doc={t.privacy} chrome={t} />;
}

export function TermsPage({ lang }) {
  const t = getDictionary(lang, "legal");
  return <LegalLayout lang={lang} current="terms" doc={t.terms} chrome={t} />;
}

function LegalLayout({ lang, current, doc, chrome }) {
  return (
    <>
      <SiteNav lang={lang} current={current} />
      <PageHero lang={lang} eyebrow={doc.eyebrow} heading={doc.heading} sub={doc.sub} />
      <section className="site-section" style={{ background: "var(--bg-1)" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <div className="card" style={{ padding: "18px 22px", background: "var(--bg-2)", marginBottom: 26 }}>
            <div className="label-cap" style={{ marginBottom: 8 }}>
              {chrome.effectiveDateLabel}
            </div>
            <div className="mono" style={{ fontSize: 13, color: "var(--fg-1)" }}>
              {format(chrome.lastUpdated, { date: chrome.date })}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {doc.sections.map((section) => (
              <LegalSection key={section.title} {...section} />
            ))}
          </div>
        </div>
      </section>
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
