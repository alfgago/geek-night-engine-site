"use client";

import { useState } from "react";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary, format } from "@/lib/i18n";
import { pricingNumbers } from "@/data/marketing-data";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const tierOrder = ["hobbyist", "core", "studio"];
const featuredTier = "core";
const addOnOrder = ["seat", "credits", "database"];
const addOnIcons = { seat: I.users, credits: I.zap, database: I.layers };

/**
 * Builds the displayed tier rows by combining translated copy (pricing
 * dictionary) with the canonical numbers in data/marketing-data.js, so
 * prices/credits/storage can never drift between locales.
 */
function buildTiers(t) {
  return tierOrder.map((id) => {
    const numbers = pricingNumbers.tiers[id];
    const copy = t.tiers[id];
    return {
      id,
      featured: id === featuredTier,
      name: copy.name,
      price: numbers.price,
      per: copy.per,
      seats: format(copy.seatsLabel, { seats: numbers.seats }),
      credits: format(copy.creditsLabel, { credits: numbers.credits }),
      storage: format(copy.storageLabel, { gb: numbers.storageGb, rate: numbers.storageOveragePerGb }),
      features: copy.features,
      cta: copy.cta,
    };
  });
}

export function PricingPage({ lang }) {
  const t = getDictionary(lang, "pricing");

  return (
    <>
      <SiteNav lang={lang} current="pricing" />
      <PageHero
        lang={lang}
        eyebrow={t.hero.eyebrow}
        heading={t.hero.heading}
        sub={format(t.hero.sub, pricingNumbers.creditUnit)}
      />
      <PricingTiers lang={lang} t={t} />
      <AddOns t={t} />
      <PricingFAQ t={t} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function PricingTiers({ lang, t }) {
  const r = localizedRoutes(lang);
  const tiers = buildTiers(t);

  return (
    <section data-anim-section="pricing" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div data-anim-grid className="site-grid-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              data-anim-card
              className="card spotlight"
              style={{
                padding: "30px 28px 26px",
                background: "var(--bg-2)",
                border: `1px solid ${tier.featured ? "var(--lime-edge)" : "var(--border-1)"}`,
                boxShadow: tier.featured ? "0 0 0 1px var(--lime-edge), 0 30px 60px -20px rgba(200,247,60,0.18)" : "none",
                position: "relative",
              }}
            >
              {tier.featured && (
                <span
                  className="chip lime"
                  style={{
                    position: "absolute",
                    top: -10,
                    left: 26,
                    height: 22,
                    fontSize: 10,
                    padding: "0 8px",
                    background: "var(--lime)",
                    color: "var(--lime-ink)",
                    borderColor: "var(--lime)",
                  }}
                >
                  {t.featuredBadge}
                </span>
              )}
              <div className="label-cap" style={{ marginBottom: 8 }}>
                {tier.name}
              </div>
              <div className="gne-row" style={{ alignItems: "baseline", gap: 6 }}>
                <span className="tnum" style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.03em" }}>{tier.price}</span>
                <span className="mono" style={{ fontSize: 12, color: "var(--fg-3)" }}>
                  {tier.per}
                </span>
              </div>
              <div className="gne-row mono tnum" style={{ gap: 14, marginTop: 14, fontSize: 12, color: "var(--fg-2)", flexWrap: "wrap" }}>
                <span>
                  <span className="dot lime" style={{ marginRight: 5 }} />
                  {tier.seats}
                </span>
                <span className="gne-row" style={{ gap: 5 }}>
                  <Icon d={I.zap} size={10} style={{ color: "var(--lime)" }} /> {tier.credits}
                </span>
                <span>
                  <span className="dot lime" style={{ marginRight: 5 }} />
                  {tier.storage}
                </span>
              </div>
              <ul style={{ margin: "22px 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {tier.features.map((feature) => (
                  <li key={feature} className="gne-row" style={{ gap: 10, fontSize: 13.5, alignItems: "flex-start" }}>
                    <Icon d={I.check} size={12} stroke={2.4} style={{ color: "var(--lime)", marginTop: 4, flex: "0 0 auto" }} />
                    <span className="pretty">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={r.newsletter} className={`btn lg ${tier.featured ? "primary" : ""}`} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddOns({ t }) {
  const items = addOnOrder.map((id) => {
    const numbers = pricingNumbers.addOns[id];
    const copy = t.addOns.items[id];
    return {
      id,
      icon: addOnIcons[id],
      name: copy.name,
      cost: numbers.cost,
      per: format(copy.per, { credits: numbers.unitCredits }),
      body: format(copy.body, { credits: numbers.bonusCredits }),
    };
  });

  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-0)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          {t.addOns.label}
        </div>
        <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 600, margin: "0 0 40px", lineHeight: 1.04, maxWidth: 820 }}>
          {t.addOns.heading}
        </h2>
        <div data-anim-grid className="site-grid-3" style={{ gap: 16 }}>
          {items.map((addon) => (
            <div key={addon.id} data-anim-card className="card" style={{ padding: "24px 22px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
              <div className="gne-row" style={{ gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "var(--lime-bg)",
                    border: "1px solid var(--lime-edge)",
                    color: "var(--lime)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon d={addon.icon} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="gne-row" style={{ alignItems: "baseline", gap: 4 }}>
                    <span className="tnum" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{addon.cost}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>
                      {addon.per}
                    </span>
                  </div>
                </div>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px", letterSpacing: 0 }}>{addon.name}</h3>
              <p className="pretty" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--fg-1)", margin: 0 }}>
                {addon.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingFAQ({ t }) {
  return (
    <section className="site-section" style={{ background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 12 }}>
          {t.faq.label}
        </div>
        <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 600, margin: "0 0 40px", lineHeight: 1.04 }}>
          {t.faq.heading}
        </h2>
        <div>
          {t.faq.items.map((item, index) => (
            <FAQ key={item.q} q={item.q} a={item.a} open={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ q, a, open: openProp }) {
  const [open, setOpen] = useState(openProp);

  return (
    <div data-anim="reveal" style={{ borderTop: "1px solid var(--border-1)" }}>
      <button onClick={() => setOpen(!open)} className="gne-row" style={{ width: "100%", padding: "22px 0", gap: 14, textAlign: "left" }}>
        <span style={{ fontSize: 18, fontWeight: 500, letterSpacing: 0, flex: 1, color: "var(--fg-0)" }}>{q}</span>
        <Icon d={open ? I.close : I.plus} size={16} style={{ color: "var(--lime)" }} stroke={2.2} />
      </button>
      {open && (
        <p className="pretty" style={{ fontSize: 15, lineHeight: 1.65, color: "var(--fg-1)", margin: "0 0 26px", maxWidth: 720 }}>
          {a}
        </p>
      )}
    </div>
  );
}
