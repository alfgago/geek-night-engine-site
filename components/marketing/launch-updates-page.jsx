import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

export function LaunchUpdatesPage({ lang }) {
  const t = getDictionary(lang, "launch-updates");
  const r = localizedRoutes(lang);

  return (
    <>
      <SiteNav lang={lang} current="updates" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={t.hero.sub}
        primaryCta={t.hero.primaryCta}
        secondaryCta={t.hero.secondaryCta}
        secondaryHref={r.news}
      />
      <MilestoneSection group={t.built} tone="lime" />
      <MilestoneSection group={t.next} tone="amber" />
      <DistinctNote distinct={t.distinct} href={r.news} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function MilestoneSection({ group, tone }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: tone === "lime" ? "var(--bg-1)" : "var(--bg-0)" }}>
      <div className="site-wrap" style={{ maxWidth: 920 }}>
        <div data-anim="reveal" className="gne-row" style={{ gap: 10, marginBottom: 14 }}>
          <span className={`chip ${tone}`}>
            <span className={`dot ${tone}`} /> {group.label}
          </span>
        </div>
        <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(28px, 3.6vw, 38px)", fontWeight: 600, margin: "0 0 36px", lineHeight: 1.06 }}>
          {group.heading}
        </h2>
        <div data-anim-grid style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {group.items.map(([title, copy]) => (
            <div
              key={title}
              data-anim-card
              className="gne-row"
              style={{ gap: 14, padding: "16px 18px", alignItems: "flex-start", background: "var(--bg-2)", border: "1px solid var(--border-1)", borderRadius: 8 }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  flex: "0 0 auto",
                  background: `var(--${tone}-bg)`,
                  color: `var(--${tone})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `1px solid var(--${tone}-edge)`,
                }}
              >
                <Icon d={tone === "lime" ? I.check : I.build} size={13} stroke={2.4} />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{title}</div>
                <div className="pretty" style={{ fontSize: 14, color: "var(--fg-1)", lineHeight: 1.6 }}>
                  {copy}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DistinctNote({ distinct, href }) {
  return (
    <section className="site-section" style={{ background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div data-anim="reveal" className="card" style={{ padding: "20px 24px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
          <div className="label-cap" style={{ marginBottom: 8 }}>
            {distinct.label}
          </div>
          <p className="pretty" style={{ fontSize: 15, lineHeight: 1.65, color: "var(--fg-1)", margin: 0 }}>
            {distinct.body}{" "}
            <a href={href} style={{ color: "var(--lime)", textDecoration: "none" }}>
              ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
