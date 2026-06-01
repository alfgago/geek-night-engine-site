import Link from "next/link";
import { routes } from "@/lib/site-links";
import { corePillars, studioBenefits, trustedStudios } from "@/data/marketing-data";
import { CtaStrip, SiteFooter, SiteNav } from "./chrome";
import { Avatar, Icon, I, PEOPLE } from "./icons";
import { HeroProductMock } from "./previews";

export function HomePage() {
  return (
    <>
      <SiteNav current="home" />
      <HomeHero />
      <MarketPositioning />
      <CorePillars />
      <StudioBenefits />
      <SocialProof />
      <CtaStrip
        heading="Product access is coming soon."
        sub="Subscribe for launch windows, build notes, and early studio access."
        cta="Subscribe for launch updates"
      />
      <SiteFooter />
    </>
  );
}

function HomeHero() {
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
              <span className="dot lime" /> Multi-tenant cloud · public beta
            </span>
            <span className="chip ghost">
              <Icon d={I.cube} size={10} /> Godot 4.3
            </span>
          </div>
          <h1
            className="pretty"
            style={{
              fontSize: "clamp(46px, 6vw, 64px)",
              lineHeight: 0.98,
              letterSpacing: 0,
              margin: 0,
              fontWeight: 600,
              color: "var(--fg-0)",
            }}
          >
            Imagine the game.{" "}
            <span style={{ color: "var(--lime)", textShadow: "0 0 24px rgba(200,247,60,0.35)" }}>Speak it</span>{" "}
            <span style={{ fontStyle: "italic", fontWeight: 500 }}>into existence.</span>
          </h1>
          <p
            className="pretty"
            style={{ fontSize: 17.5, lineHeight: 1.55, color: "var(--fg-1)", margin: "22px 0 30px", maxWidth: 580 }}
          >
            The world's first browser-based, multi-tenant AI game production workspace. Design, edit, compile, playtest,
            and deploy high-fidelity 2D and 3D games using natural language.
          </p>
          <div className="gne-row" style={{ gap: 10, flexWrap: "wrap" }}>
            <a href={routes.newsletter} className="btn primary lg" style={{ minHeight: 44, padding: "0 22px", fontSize: 14.5, gap: 9 }}>
              <Icon d={I.bell} size={14} /> Join the launch newsletter
            </a>
            <Link href={routes.product} className="btn lg" style={{ minHeight: 44, padding: "0 18px", fontSize: 14, gap: 8 }}>
              <Icon d={I.layers} size={13} /> Explore studio features
            </Link>
          </div>
          <div className="gne-row mono" style={{ gap: 20, marginTop: 22, fontSize: 11.5, color: "var(--fg-3)", flexWrap: "wrap" }}>
            <span>
              <span className="dot lime" style={{ marginRight: 6 }} /> 5,000 credits / mo free
            </span>
            <span>· no installation</span>
            <span>· runs on Godot 4.3</span>
          </div>
        </div>

        <div className="home-hero-preview">
          <HeroProductMock />
        </div>
      </div>

      <div style={{ position: "relative", borderTop: "1px solid var(--border-1)", background: "var(--bg-2)", padding: "20px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          <span className="label-cap">Trusted by studios</span>
          {trustedStudios.map((studio) => (
            <span key={studio} style={{ fontSize: 13.5, fontWeight: 500, color: "var(--fg-2)", letterSpacing: "0.05em", opacity: 0.85 }}>
              {studio}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MarketPositioning() {
  return (
    <section className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap narrow">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 14 }}>
          Market positioning
        </div>
        <h2
          data-anim="reveal"
          className="pretty"
          style={{ fontSize: 44, fontWeight: 600, letterSpacing: 0, margin: 0, lineHeight: 1.05, maxWidth: 900 }}
        >
          The entire game development lifecycle, <span style={{ color: "var(--lime)" }}>consolidated</span>.
        </h2>
        <p data-anim="reveal" className="pretty" style={{ fontSize: 17, lineHeight: 1.65, color: "var(--fg-1)", margin: "26px 0 0", maxWidth: 780 }}>
          Geek Night Engine replaces fragmented local development suites with a centralized, web-native creative workspace. By
          unifying an advanced AI Game Architect with a powerful cloud compiler, we enable independent developers, digital
          entrepreneurs, and established studios to design multi-platform games without technical friction.
        </p>
      </div>
    </section>
  );
}

function CorePillars() {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-1)" }}>
      <div className="site-wrap">
        <div style={{ marginBottom: 56, maxWidth: 780 }}>
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 12 }}>
            Core pillars
          </div>
          <h2 data-anim="reveal" className="pretty" style={{ fontSize: 40, fontWeight: 600, letterSpacing: 0, margin: 0, lineHeight: 1.1 }}>
            Why modern game studios build on our platform.
          </h2>
        </div>
        <div data-anim-grid className="site-grid-3">
          {corePillars.map((pillar) => (
            <FeatureCard key={pillar.title} icon={pillar.icon} title={pillar.title} body={pillar.body} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, body }) {
  return (
    <div data-anim-card className="card" style={{ padding: "26px 24px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          marginBottom: 22,
          background: "var(--lime-bg)",
          border: "1px solid var(--lime-edge)",
          color: "var(--lime)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon d={I[icon]} size={20} />
      </div>
      <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 10px", letterSpacing: 0 }}>{title}</h3>
      <p className="pretty" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-1)", margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

function StudioBenefits() {
  return (
    <section data-anim-section="features" className="site-section" style={{ background: "var(--bg-0)" }}>
      <div className="site-wrap">
        <div data-anim="reveal" className="label-cap" style={{ marginBottom: 12 }}>
          For every workspace tier
        </div>
        <h2
          data-anim="reveal"
          className="pretty"
          style={{ fontSize: 40, fontWeight: 600, letterSpacing: 0, margin: "0 0 48px", lineHeight: 1.1, maxWidth: 820 }}
        >
          Accelerate iteration, whoever's at the keyboard.
        </h2>
        <div data-anim-grid className="site-grid-3">
          {studioBenefits.map((benefit) => (
            <div key={benefit.title} data-anim-card className="card" style={{ padding: "24px 24px", background: "var(--bg-2)", border: "1px solid var(--border-1)" }}>
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

function SocialProof() {
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
          Our mission
        </div>
        <h2 data-anim="reveal" className="pretty" style={{ fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.2, letterSpacing: 0, margin: "0 0 24px", fontWeight: 500 }}>
          Designed to eliminate technical gatekeeping.
        </h2>
        <p data-anim="reveal" className="pretty" style={{ fontSize: 17.5, lineHeight: 1.6, color: "var(--fg-1)", margin: 0, maxWidth: 760, marginLeft: "auto", marginRight: "auto" }}>
          We built this platform to ensure that resource constraints never crush a creative dream again. By providing automated
          debugging, procedural asset studios, and cross-platform export controls in a single interface, we are incubating the next
          generation of digital media entrepreneurs.
        </p>
        <div data-anim="reveal" className="gne-row" style={{ gap: 12, marginTop: 30, justifyContent: "center" }}>
          <Avatar {...PEOPLE.noor} size={32} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Noor Aydin</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--fg-3)" }}>founder · Geek Night Engine</div>
          </div>
        </div>
      </div>
    </section>
  );
}
