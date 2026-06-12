import Link from "next/link";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary, format } from "@/lib/i18n";
import { pricingNumbers } from "@/data/marketing-data";
import { CtaStrip, SiteFooter, SiteNav } from "./chrome";
import { Avatar, Icon, I, PEOPLE } from "./icons";
import { HeroProductMock } from "./hero-product-mock";

const pillarIcons = ["sparkles", "build", "layers"];

export function HomePage({ lang }) {
  const t = getDictionary(lang, "home");

  return (
    <>
      <SiteNav lang={lang} current="home" />
      <HomeHero lang={lang} t={t} />
      <MarketPositioning t={t} />
      <CorePillars t={t} />
      <StudioBenefits t={t} />
      <SocialProof t={t} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function HomeHero({ lang, t }) {
  const r = localizedRoutes(lang);

  return (
    <section style={{ position: "relative", overflow: "hidden", borderBottom: "1px solid var(--border-1)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 1200px 600px at 50% -10%, rgba(200,247,60,0.10), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 900px 500px at 80% 80%, rgba(116,214,200,0.06), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="home-hero-grid">
        <div>
          <div className="gne-row" style={{ gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
            <span className="chip lime">
              <span className="dot lime" /> {t.hero.chipCloud}
            </span>
            <span className="chip ghost">
              <Icon d={I.cube} size={10} /> {t.hero.chipGodot}
            </span>
          </div>
          <h1
            className="balance display"
            style={{
              fontSize: "clamp(48px, 6.4vw, 72px)",
              lineHeight: 0.94,
              margin: 0,
              fontWeight: 600,
              color: "var(--fg-0)",
            }}
          >
            {t.hero.h1.pre}{" "}
            <span style={{ color: "var(--lime)", textShadow: "0 0 24px rgba(200,247,60,0.35)" }}>{t.hero.h1.highlight}</span>{" "}
            <span style={{ fontStyle: "italic", fontWeight: 500 }}>{t.hero.h1.italic}</span>
          </h1>
          <p
            className="pretty"
            style={{ fontSize: 17.5, lineHeight: 1.55, color: "var(--fg-1)", margin: "22px 0 30px", maxWidth: 580 }}
          >
            {t.hero.sub}
          </p>
          <div className="gne-row" style={{ gap: 10, flexWrap: "wrap" }}>
            <a href={r.newsletter} className="btn primary lg" style={{ minHeight: 44, padding: "0 22px", fontSize: 14.5, gap: 9 }}>
              <Icon d={I.bell} size={14} /> {t.hero.primaryCta}
            </a>
            <Link href={r.product} className="btn lg" style={{ minHeight: 44, padding: "0 18px", fontSize: 14, gap: 8 }}>
              <Icon d={I.layers} size={13} /> {t.hero.secondaryCta}
            </Link>
          </div>
          <div className="gne-row mono" style={{ gap: 20, marginTop: 22, fontSize: 11.5, color: "var(--fg-3)", flexWrap: "wrap" }}>
            <span>
              <span className="dot lime" style={{ marginRight: 6 }} />{" "}
              {format(t.hero.micro.credits, { credits: pricingNumbers.tiers.hobbyist.credits })}
            </span>
            <span>{t.hero.micro.noInstall}</span>
            <span>{t.hero.micro.godot}</span>
          </div>
        </div>

        <div className="home-hero-preview">
          {/* depth layer the product mock overlaps */}
          <div
            data-anim-hero-depth
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "8% -6% 18% 10%",
              borderRadius: "var(--r-6)",
              background: "linear-gradient(135deg, rgba(200,247,60,0.07), rgba(116,214,200,0.04))",
              border: "1px solid var(--border-1)",
              boxShadow: "var(--shadow-2)",
            }}
          />
          <HeroProductMock lang={lang} />
        </div>
      </div>
    </section>
  );
}

function MarketPositioning({ t }) {
  return (
    <section className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap narrow">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          {t.positioning.label}
        </div>
        <h2
          data-anim="reveal"
          className="balance display"
          style={{ fontSize: "clamp(36px, 4.6vw, 50px)", fontWeight: 600, margin: 0, lineHeight: 1.02, maxWidth: 900 }}
        >
          {t.positioning.heading.pre}
          <span style={{ color: "var(--lime)" }}>{t.positioning.heading.highlight}</span>.
        </h2>
        <p data-anim="reveal" className="pretty" style={{ fontSize: 17, lineHeight: 1.65, color: "var(--fg-1)", margin: "26px 0 0", maxWidth: 780 }}>
          {t.positioning.body}
        </p>
      </div>
    </section>
  );
}

function CorePillars({ t }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div style={{ marginBottom: 56, maxWidth: 780 }}>
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 12 }}>
            {t.pillars.label}
          </div>
          <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(34px, 4.4vw, 46px)", fontWeight: 600, margin: 0, lineHeight: 1.04 }}>
            {t.pillars.heading}
          </h2>
        </div>
        {/* Asymmetric: lead pillar spans wide, the other two stack — breaks the 3-equal monotony */}
        <div data-anim-grid className="pillar-grid">
          {t.pillars.items.map((pillar, index) => (
            <FeatureCard key={pillar.title} icon={pillarIcons[index]} title={pillar.title} body={pillar.body} lead={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, body, lead }) {
  return (
    <div
      data-anim-card
      className={`card spotlight${lead ? " pillar-lead" : ""}`}
      style={{
        padding: lead ? "34px 32px" : "26px 24px",
        background: "var(--bg-2)",
        border: "1px solid var(--border-1)",
        borderRadius: lead ? "var(--r-6)" : "var(--r-4)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: lead ? 52 : 44,
          height: lead ? 52 : 44,
          borderRadius: 10,
          marginBottom: 22,
          background: "var(--lime-bg)",
          border: "1px solid var(--lime-edge)",
          color: "var(--lime)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon d={I[icon]} size={lead ? 24 : 20} />
      </div>
      <h3 style={{ fontSize: lead ? 26 : 20, fontWeight: 600, margin: "0 0 10px", letterSpacing: "-0.01em" }}>{title}</h3>
      <p className="pretty" style={{ fontSize: lead ? 15 : 14, lineHeight: 1.6, color: "var(--fg-1)", margin: 0, maxWidth: "60ch" }}>
        {body}
      </p>
    </div>
  );
}

function StudioBenefits({ t }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-0)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 12 }}>
          {t.benefits.label}
        </div>
        <h2
          data-anim="reveal"
          className="balance display"
          style={{ fontSize: "clamp(32px, 4.2vw, 44px)", fontWeight: 600, margin: "0 0 48px", lineHeight: 1.04, maxWidth: 820 }}
        >
          {t.benefits.heading}
        </h2>
        <div data-anim-grid className="site-grid-3">
          {t.benefits.items.map((benefit) => (
            <div key={benefit.title} data-anim-card className="card spotlight" style={{ padding: "24px 24px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
              <div className="label-cap" style={{ color: "var(--lime)", marginBottom: 8 }}>{benefit.tag}</div>
              <h3 style={{ fontSize: 22, fontWeight: 600, margin: "0 0 10px", letterSpacing: 0 }}>{benefit.title}</h3>
              <p className="pretty" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)", margin: "0 0 16px" }}>{benefit.body}</p>
              <div className="gne-row" style={{ gap: 6, flexWrap: "wrap" }}>
                {benefit.chips.map((chip) => (
                  <span key={chip} className="chip mono" style={{ height: 18, fontSize: 9.5, padding: "0 6px" }}>
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof({ t }) {
  return (
    <section className="site-section" style={{ background: "var(--bg-1)", position: "relative", overflow: "hidden" }}>
      <div
        data-anim-grain
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 1000px 600px at 50% 50%, rgba(200,247,60,0.06), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 980, margin: "0 auto", textAlign: "center" }}>
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 22 }}>
          {t.mission.label}
        </div>
        <h2 data-anim="reveal" className="pretty" style={{ fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.2, letterSpacing: 0, margin: "0 0 24px", fontWeight: 500 }}>
          {t.mission.heading}
        </h2>
        <p data-anim="reveal" className="pretty" style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--fg-1)", margin: 0, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
          {t.mission.body}
        </p>
        <div data-anim="reveal" className="gne-row" style={{ gap: 12, marginTop: 30, justifyContent: "center" }}>
          <Avatar {...PEOPLE.noor} size={32} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{t.mission.founderName}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>{t.mission.founderRole}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
