"use client";

import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const CHANNELS_JSON = [
  {
    i: I.user,
    t: "Creator help desk",
    d: "Have questions about credit balances, seat licensing top-ups, or workspace permissions management?",
    cta: "Submit workspace ticket",
    reply: "Avg reply · 4h",
    color: "lime",
  },
  {
    i: I.layers,
    t: "Enterprise studio relations",
    d: "Request custom build environments, elevated storage thresholds, or white-label distribution agreements.",
    cta: "Request studio consultation",
    reply: "Avg reply · same business day",
    color: "cyan",
  },
  {
    i: I.sparkles,
    t: "Feature & community feedback",
    d: "Have recommendations for our task board pipeline, asset synthesizers, or self-healing error catchers?",
    cta: "Share feature request",
    reply: "Reviewed weekly · public roadmap",
    color: "violet",
  },
];

const linkStyle = { color: "var(--lime)", textDecoration: "none" };

export function ContactPage() {
  return (
    <>
      <SiteNav current="contact" />
      <PageHero
        eyebrow="Get in touch"
        heading="Let's optimize your development velocity."
        sub="Whether you're an independent creator needing help with billing or a multi-team game studio requiring bespoke workflow infrastructure — we're here to help."
      />
      <SupportChannels />
      <ContactSplit />
      <CtaStrip heading="Product access is coming soon." sub="Subscribe for launch notes, access windows, and founder updates." cta="Subscribe for updates" />
      <SiteFooter />
    </>
  );
}

function SupportChannels() {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          Pick a channel
        </div>
        <h2 data-anim="reveal" className="pretty" style={{ fontSize: 36, fontWeight: 600, letterSpacing: 0, margin: "0 0 40px", lineHeight: 1.1, maxWidth: 760 }}>
          Three routes in, real humans on the other end.
        </h2>
        <div data-anim-grid className="site-grid-3">
          {CHANNELS_JSON.map((channel) => (
            <div
              key={channel.t}
              data-anim-card
              className="card"
              style={{ padding: "26px 26px", background: "var(--bg-2)", border: "1px solid var(--border-1)", display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: `var(--${channel.color}-bg)`,
                  border: `1px solid var(--${channel.color}-edge, var(--border-2))`,
                  color: `var(--${channel.color})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon d={channel.i} size={20} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: 0 }}>{channel.t}</h3>
              <p className="pretty" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)", margin: 0, flex: 1 }}>
                {channel.d}
              </p>
              <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>
                ↳ {channel.reply}
              </div>
              <button className="btn" style={{ alignSelf: "flex-start" }}>
                {channel.cta} <Icon d={I.chevRight} size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSplit() {
  return (
    <section data-anim-section="contact" className="site-section" style={{ background: "var(--bg-0)" }}>
      <div className="site-wrap site-grid-2" style={{ maxWidth: 1180 }}>
        <div>
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
            Direct routes
          </div>
          <h2 data-anim="reveal" className="pretty" style={{ fontSize: 32, fontWeight: 600, letterSpacing: 0, margin: "0 0 30px", lineHeight: 1.1, maxWidth: 480 }}>
            Prefer email or live? Reach us directly.
          </h2>

          <ContactCard label="Support email" value="hey@geeknight.engine" detail="↳ for billing, accounts, and account-related issues" />
          <ContactCard label="Enterprise relations" value="studios@geeknight.engine" detail="↳ for custom builds, white-label, and procurement" />

          <div data-anim="reveal" className="card" style={{ padding: "18px 22px", background: "var(--bg-2)", marginBottom: 12 }}>
            <div className="label-cap" style={{ marginBottom: 6 }}>
              Community
            </div>
            <div className="gne-row mono" style={{ gap: 14, fontSize: 13, color: "var(--fg-1)", flexWrap: "wrap" }}>
              <a href="#" style={linkStyle}>
                Discord ↗
              </a>
              <a href="#" style={linkStyle}>
                GitHub ↗
              </a>
              <a href="#" style={linkStyle}>
                Roadmap ↗
              </a>
              <a href="#" style={linkStyle}>
                Changelog ↗
              </a>
            </div>
          </div>

          <div data-anim="reveal" className="mono" style={{ marginTop: 24, fontSize: 11, color: "var(--fg-3)", lineHeight: 1.7 }}>
            <span className="dot lime" style={{ marginRight: 6 }} /> all systems operational · status.geeknight.engine
            <br />
            <span style={{ marginLeft: 14 }}>↳ Istanbul · Tokyo · Toronto · async-friendly</span>
          </div>
        </div>

        <form data-anim="reveal" className="card" style={{ padding: 24, background: "var(--bg-2)" }} onSubmit={(event) => event.preventDefault()}>
          <div className="label-cap" style={{ marginBottom: 14 }}>
            Workspace ticket
          </div>
          <FormField label="What can we help with?">
            <select className="input" style={{ background: "var(--bg-3)" }} defaultValue="billing">
              <option value="billing">Billing or credits</option>
              <option value="workspace">Workspace permissions</option>
              <option value="enterprise">Enterprise consultation</option>
              <option value="feature">Feature request</option>
              <option value="bug">Bug report</option>
            </select>
          </FormField>
          <FormField label="Your email">
            <input className="input" type="email" defaultValue="you@geeknightstudio.co" />
          </FormField>
          <FormField label="Workspace (optional)">
            <input className="input" defaultValue="geek-night-studio" />
          </FormField>
          <FormField label="Tell us a bit more">
            <textarea className="input" style={{ height: 130, padding: "10px 12px", resize: "none", lineHeight: 1.5 }} placeholder="Project, plan, error messages, what you're trying to do..." />
          </FormField>
          <div className="gne-row" style={{ gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <button type="button" className="btn">
              <Icon d={I.upload} size={12} /> Attach screenshot
            </button>
            <div style={{ flex: 1 }} />
            <button type="submit" className="btn primary">
              <Icon d={I.send} size={12} /> Submit ticket
            </button>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-3)", marginTop: 14 }}>
            ↳ tickets land in our Linear board with the same audit hygiene as your studio's
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactCard({ label, value, detail }) {
  return (
    <div data-anim="reveal" className="card" style={{ padding: "18px 22px", background: "var(--bg-2)", marginBottom: 12 }}>
      <div className="label-cap" style={{ marginBottom: 6 }}>
        {label}
      </div>
      <div className="mono" style={{ fontSize: 15.5, color: "var(--lime)", textShadow: "0 0 6px var(--lime-edge)" }}>
        {value}
      </div>
      <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)", marginTop: 4 }}>
        {detail}
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div className="label-cap" style={{ marginBottom: 6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}
