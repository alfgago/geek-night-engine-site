"use client";

import { getDictionary, format } from "@/lib/i18n";
import { contacts } from "@/data/marketing-data";
import { CtaStrip, PageHero, SiteFooter, SiteNav } from "./chrome";
import { Icon, I } from "./icons";

const channelIcons = [I.user, I.layers, I.sparkles];
const channelColors = ["lime", "cyan", "violet"];

const linkStyle = { color: "var(--lime)", textDecoration: "none" };

export function ContactPage({ lang }) {
  const t = getDictionary(lang, "contact");

  return (
    <>
      <SiteNav lang={lang} current="contact" />
      <PageHero lang={lang} eyebrow={t.hero.eyebrow} heading={t.hero.heading} sub={t.hero.sub} />
      <SupportChannels t={t} />
      <ContactSplit t={t} />
      <CtaStrip lang={lang} heading={t.ctaStrip.heading} sub={t.ctaStrip.sub} cta={t.ctaStrip.cta} />
      <SiteFooter lang={lang} />
    </>
  );
}

function SupportChannels({ t }) {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          {t.channels.label}
        </div>
        <h2 data-anim="reveal" className="balance display" style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 600, margin: "0 0 40px", lineHeight: 1.04, maxWidth: 760 }}>
          {t.channels.heading}
        </h2>
        <div data-anim-grid className="site-grid-3">
          {t.channels.items.map((channel, index) => (
            <div
              key={channel.title}
              data-anim-card
              className="card spotlight"
              style={{ padding: "26px 26px", background: "var(--bg-2)", border: "1px solid var(--border-1)", display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 8,
                  background: `var(--${channelColors[index]}-bg)`,
                  border: `1px solid var(--${channelColors[index]}-edge, var(--border-2))`,
                  color: `var(--${channelColors[index]})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon d={channelIcons[index]} size={20} />
              </div>
              <h3 style={{ fontSize: 19, fontWeight: 600, margin: 0, letterSpacing: 0 }}>{channel.title}</h3>
              <p className="pretty" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)", margin: 0, flex: 1 }}>
                {channel.body}
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

function ContactSplit({ t }) {
  return (
    <section data-anim-section="contact" className="site-section" style={{ background: "var(--bg-0)" }}>
      <div className="site-wrap site-grid-2" style={{ maxWidth: 1180 }}>
        <div>
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
            {t.direct.label}
          </div>
          <h2 data-anim="reveal" className="pretty" style={{ fontSize: 32, fontWeight: 600, letterSpacing: 0, margin: "0 0 30px", lineHeight: 1.1, maxWidth: 480 }}>
            {t.direct.heading}
          </h2>

          <ContactCard label={t.direct.supportLabel} value={contacts.support} detail={t.direct.supportDetail} />
          <ContactCard label={t.direct.enterpriseLabel} value={contacts.studios} detail={t.direct.enterpriseDetail} />

          <div data-anim="reveal" className="card" style={{ padding: "18px 22px", background: "var(--bg-2)", marginBottom: 12 }}>
            <div className="label-cap" style={{ marginBottom: 6 }}>
              {t.direct.communityLabel}
            </div>
            <div className="gne-row mono" style={{ gap: 14, fontSize: 13, color: "var(--fg-1)", flexWrap: "wrap" }}>
              <a href="#" style={linkStyle}>
                {t.direct.communityLinks.discord}
              </a>
              <a href="#" style={linkStyle}>
                {t.direct.communityLinks.github}
              </a>
              <a href="#" style={linkStyle}>
                {t.direct.communityLinks.roadmap}
              </a>
              <a href="#" style={linkStyle}>
                {t.direct.communityLinks.changelog}
              </a>
            </div>
          </div>

          <div data-anim="reveal" className="mono" style={{ marginTop: 24, fontSize: 11, color: "var(--fg-3)", lineHeight: 1.7 }}>
            <span className="dot lime" style={{ marginRight: 6 }} /> {format(t.direct.statusLine, { statusHost: contacts.statusHost })}
            <br />
            <span style={{ marginLeft: 14 }}>{t.direct.locations}</span>
          </div>
        </div>

        <form data-anim="reveal" className="card" style={{ padding: 24, background: "var(--bg-2)" }} onSubmit={(event) => event.preventDefault()}>
          <div className="label-cap" style={{ marginBottom: 14 }}>
            {t.form.label}
          </div>
          <FormField label={t.form.topicLabel}>
            <select className="input" style={{ background: "var(--bg-3)" }} defaultValue="billing">
              <option value="billing">{t.form.topics.billing}</option>
              <option value="workspace">{t.form.topics.workspace}</option>
              <option value="enterprise">{t.form.topics.enterprise}</option>
              <option value="feature">{t.form.topics.feature}</option>
              <option value="bug">{t.form.topics.bug}</option>
            </select>
          </FormField>
          <FormField label={t.form.emailLabel}>
            <input className="input" type="email" defaultValue="you@geekengine.ai" />
          </FormField>
          <FormField label={t.form.workspaceLabel}>
            <input className="input" defaultValue="geek-engine" />
          </FormField>
          <FormField label={t.form.messageLabel}>
            <textarea className="input" style={{ height: 130, padding: "10px 12px", resize: "none", lineHeight: 1.5 }} placeholder={t.form.messagePlaceholder} />
          </FormField>
          <div className="gne-row" style={{ gap: 8, marginTop: 8, flexWrap: "wrap" }}>
            <button type="button" className="btn">
              <Icon d={I.upload} size={12} /> {t.form.attach}
            </button>
            <div style={{ flex: 1 }} />
            <button type="submit" className="btn primary">
              <Icon d={I.send} size={12} /> {t.form.submit}
            </button>
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: "var(--fg-3)", marginTop: 14 }}>
            {t.form.footnote}
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
