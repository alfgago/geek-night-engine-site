"use client";

import { useState } from "react";
import { routes } from "@/lib/site-links";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const TIERS_JSON = [
  {
    tier: "Hobbyist",
    price: "$0",
    per: "Free forever",
    seats: "1 seat",
    credits: "5,000 credits / mo",
    storage: "1 GB storage",
    f: [
      "Browser-based game editing & template access",
      "Standard priority cloud build queue",
      "Web-only publishing via hosted platform player",
      "Client-side local storage for default game saves",
      "Basic asset library uploads and generation features",
    ],
    cta: "Join waitlist",
  },
  {
    tier: "Core Creator",
    price: "$29",
    per: "per month",
    seats: "3 seats",
    credits: "30,000 credits / mo",
    storage: "25 GB storage, then $0.50/GB",
    featured: true,
    f: [
      "Real-time multiplayer team workspace collaboration",
      "High-priority cloud build queue access",
      "Web publishing with white-label & custom domain support",
      "Comprehensive snapshot version comparison tools",
      "Shared organization asset libraries",
    ],
    cta: "Join Core waitlist",
  },
  {
    tier: "Studio Pro",
    price: "$99",
    per: "per month",
    seats: "10 seats",
    credits: "100,000 credits / mo",
    storage: "100 GB storage, then $0.40/GB",
    f: [
      "Direct cross-platform commercial export to Steam and Mobile stores",
      "Turbo priority cloud build queue (isolated worker instances)",
      "Advanced 3D model parsing and animation pipeline matching",
      "Full raw project source-code zip extraction and downloading",
      "Extended build history retention window",
    ],
    cta: "Join Studio waitlist",
  },
];

export function PricingPage() {
  return (
    <>
      <SiteNav current="pricing" />
      <PageHero
        eyebrow="Pricing"
        heading="Predictable, resource-backed plans."
        sub="Every tier features transparent credit mapping. 1,000 workspace credits converts directly to $1.00 of raw background processing and AI consumption value — keeping your costs entirely open."
      />
      <PricingTiers />
      <AddOns />
      <PricingFAQ />
      <CtaStrip heading="Pricing is published. Access is coming soon." sub="Join the list and we will send the first availability window." cta="Subscribe for access" />
      <SiteFooter />
    </>
  );
}

function PricingTiers() {
  return (
    <section data-anim-section="pricing" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div data-anim-grid className="site-grid-3">
          {TIERS_JSON.map((tier) => (
            <div
              key={tier.tier}
              data-anim-card
              className="card"
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
                  MOST POPULAR
                </span>
              )}
              <div className="label-cap" style={{ marginBottom: 8 }}>
                {tier.tier}
              </div>
              <div className="gne-row" style={{ alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 44, fontWeight: 600, letterSpacing: 0 }}>{tier.price}</span>
                <span className="mono" style={{ fontSize: 12, color: "var(--fg-3)" }}>
                  {tier.per}
                </span>
              </div>
              <div className="gne-row mono" style={{ gap: 14, marginTop: 14, fontSize: 12, color: "var(--fg-2)", flexWrap: "wrap" }}>
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
                {tier.f.map((feature) => (
                  <li key={feature} className="gne-row" style={{ gap: 10, fontSize: 13.5, alignItems: "flex-start" }}>
                    <Icon d={I.check} size={12} stroke={2.4} style={{ color: "var(--lime)", marginTop: 4, flex: "0 0 auto" }} />
                    <span className="pretty">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={routes.newsletter} className={`btn lg ${tier.featured ? "primary" : ""}`} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AddOns() {
  const items = [
    {
      i: I.users,
      n: "Additional seat licensing",
      c: "$10",
      per: "/ user / month",
      d: "Available across all subscription plans. Adding an extra user seat to your organization instantly unlocks advanced collaboration pathways and injects an additional 5,000 creation credits into your team's shared monthly workspace balance.",
    },
    {
      i: I.zap,
      n: "Metered credit overage top-ups",
      c: "$1.50",
      per: "/ 1,000 credits",
      d: "Keep your design pipeline active. Purchase extra processing capacity whenever your studio hits peak development cycles.",
    },
    {
      i: I.layers,
      n: "Live cloud database add-on",
      c: "$19",
      per: "/ month / project",
      d: "Unlock online persistence. The platform automatically provisions a secure, cloud-hosted relational database for your game. The AI automatically generates the remote network logic scripts required to run live multiplayer leaderboards, secure player accounts, and cloud saves.",
    },
  ];
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-0)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          Add-ons
        </div>
        <h2 data-anim="reveal" className="pretty" style={{ fontSize: 36, fontWeight: 600, letterSpacing: 0, margin: "0 0 40px", lineHeight: 1.1, maxWidth: 820 }}>
          Scale your studio workspace on demand.
        </h2>
        <div data-anim-grid className="site-grid-3" style={{ gap: 16 }}>
          {items.map((addon) => (
            <div key={addon.n} data-anim-card className="card" style={{ padding: "24px 22px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
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
                  <Icon d={addon.i} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="gne-row" style={{ alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 0 }}>{addon.c}</span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>
                      {addon.per}
                    </span>
                  </div>
                </div>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px", letterSpacing: 0 }}>{addon.n}</h3>
              <p className="pretty" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--fg-1)", margin: 0 }}>
                {addon.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingFAQ() {
  const qs = [
    {
      q: "How are credits calculated during production?",
      a: "Our credit system maps exactly to the background processing cost of your changes. Minor text tweaks or node reorder tasks cost minimal credits, whereas generating deep 3D assets or running intensive self-healing error analysis loops burns higher volumes of your allocated pool.",
    },
    {
      q: "Can teams pool their credits together?",
      a: "Yes. All credits included in your base plan, alongside any credits added by purchasing extra user seats, are placed into a centralized pool accessible by all authorized editors within that specific organization workspace.",
    },
    {
      q: "What happens if our project does not buy the cloud database?",
      a: "By default, your games utilize client-side local storage frameworks. This follows standard platform rules for single-player games, offline settings saving, and local machine progress. You only require the database add-on if you want your game to read and write records across a persistent global web network.",
    },
  ];
  return (
    <section className="site-section" style={{ background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 12 }}>
          FAQ
        </div>
        <h2 data-anim="reveal" className="pretty" style={{ fontSize: 36, fontWeight: 600, letterSpacing: 0, margin: "0 0 40px", lineHeight: 1.1 }}>
          Frequently asked pricing questions.
        </h2>
        <div>
          {qs.map((item, index) => (
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
