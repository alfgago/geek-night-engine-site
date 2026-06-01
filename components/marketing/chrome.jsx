import Link from "next/link";
import { routes } from "@/lib/site-links";
import { Icon, I } from "./icons";
import { NewsletterSignup } from "./newsletter-signup";

export function GNEMark({ size = 36, glow = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      style={{
        display: "block",
        filter: glow ? "drop-shadow(0 0 6px rgba(200,247,60,0.5))" : "none",
      }}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="var(--lime)" strokeWidth="1.6" />
      <rect x="7" y="7" width="5" height="5" fill="var(--lime)" />
      <rect x="14" y="7" width="5" height="5" fill="var(--lime)" opacity="0.35" />
      <rect x="21" y="7" width="3" height="5" fill="var(--lime)" opacity="0.6" />
      <rect x="7" y="14" width="5" height="5" fill="var(--lime)" opacity="0.35" />
      <rect x="14" y="14" width="5" height="5" fill="var(--lime)" />
      <rect x="21" y="14" width="3" height="5" fill="var(--lime)" opacity="0.35" />
      <rect x="7" y="21" width="5" height="3" fill="var(--lime)" opacity="0.6" />
      <rect x="14" y="21" width="5" height="3" fill="var(--lime)" />
      <rect x="21" y="21" width="3" height="3" fill="var(--lime)" opacity="0.35" />
    </svg>
  );
}

export function GNELockup({ size = 22, color = "var(--fg-0)" }) {
  return (
    <span className="gne-row" style={{ gap: 9 }}>
      <GNEMark size={size + 4} />
      <span style={{ fontSize: size, fontWeight: 600, letterSpacing: 0, color }}>Geek&nbsp;Night</span>
      <span
        style={{
          fontSize: size,
          fontWeight: 400,
          letterSpacing: 0,
          color: "var(--lime)",
          fontStyle: "italic",
          textShadow: "0 0 6px var(--lime-edge)",
        }}
      >
        Engine
      </span>
    </span>
  );
}

const navLinks = [
  { id: "home", label: "Home", href: routes.home },
  { id: "product", label: "Product", href: routes.product },
  { id: "how", label: "How it works", href: routes.how },
  { id: "pricing", label: "Pricing", href: routes.pricing },
  { id: "news", label: "News", href: routes.news },
  { id: "contact", label: "Contact", href: routes.contact },
];

export function SiteNav({ current }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        backdropFilter: "blur(12px)",
        background: "rgba(12, 12, 10, 0.7)",
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div className="nav-shell">
        <Link href={routes.home} style={{ textDecoration: "none" }} aria-label="Geek Night Engine home">
          <GNELockup size={17} />
        </Link>
        <nav className="gne-row nav-links" aria-label="Marketing">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              style={{
                color: current === link.id ? "var(--fg-0)" : "var(--fg-1)",
                textDecoration: "none",
                fontWeight: 400,
                borderBottom: current === link.id ? "1px solid var(--lime)" : "1px solid transparent",
                paddingBottom: 2,
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a href={routes.demo} style={{ color: "var(--fg-2)", textDecoration: "none", whiteSpace: "nowrap" }}>
            Demo ↗
          </a>
        </nav>
        <div style={{ flex: 1 }} />
        <div className="gne-row nav-actions">
          <span className="chip amber">
            <span className="dot amber" /> Coming soon
          </span>
          <a href={routes.newsletter} className="btn primary sm">
            <Icon d={I.bell} size={11} /> Join newsletter
          </a>
        </div>
      </div>
    </header>
  );
}

export function PageHero({ eyebrow, heading, sub, primaryCta, secondaryCta, primaryHref, secondaryHref }) {
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
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "100px 32px 60px", textAlign: "left" }}>
        {eyebrow && (
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 16 }}>
            {eyebrow}
          </div>
        )}
        <h1
          data-anim="reveal"
          className="pretty"
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            lineHeight: 0.98,
            letterSpacing: 0,
            fontWeight: 600,
            margin: 0,
            maxWidth: 980,
          }}
        >
          {heading}
        </h1>
        {sub && (
          <p
            data-anim="reveal"
            className="pretty"
            style={{ fontSize: 17.5, lineHeight: 1.55, color: "var(--fg-1)", margin: "22px 0 0", maxWidth: 720 }}
          >
            {sub}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div data-anim="reveal" className="gne-row" style={{ gap: 10, marginTop: 30, flexWrap: "wrap" }}>
            {primaryCta && (
              <a
                href={primaryHref || routes.newsletter}
                className="btn primary lg"
                style={{ minHeight: 44, padding: "0 22px", fontSize: 14.5, gap: 9 }}
              >
                <Icon d={I.bell} size={14} /> {primaryCta}
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryHref || routes.demo} className="btn lg" style={{ minHeight: 44, padding: "0 18px", fontSize: 14, gap: 8 }}>
                <Icon d={I.play} size={12} fill /> {secondaryCta}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

const footerCols = [
  {
    head: "Product",
    links: [
      ["Architect", `${routes.product}#ai`],
      ["Scene inspector", `${routes.product}#scene`],
      ["Asset studios", `${routes.product}#assets`],
      ["Playtest", `${routes.product}#playtest`],
      ["Workspace hub", `${routes.product}#hub`],
    ],
  },
  {
    head: "Studio",
    links: [
      ["How it works", routes.how],
      ["Pricing", routes.pricing],
      ["Live demo", routes.demo],
      ["Coming soon", routes.newsletter],
    ],
  },
  {
    head: "Learn",
    links: [
      ["Docs", "#"],
      ["Guides", "#"],
      ["News", routes.news],
      ["Status", "#"],
    ],
  },
  {
    head: "Company",
    links: [
      ["About", "#"],
      ["Launch updates", routes.newsletter],
      ["Contact", routes.contact],
      ["Careers", "#"],
    ],
  },
  {
    head: "Legal",
    links: [
      ["Privacy", routes.privacy],
      ["Terms", routes.terms],
      ["Security", "#"],
      ["DMCA", "mailto:dmca@geeknight.engine"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer style={{ padding: "60px 32px 40px", background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          data-anim-wordmark
          style={{
            fontSize: "clamp(72px, 12vw, 180px)",
            fontWeight: 700,
            letterSpacing: 0,
            lineHeight: 0.9,
            color: "transparent",
            WebkitTextStroke: "1px var(--border-3)",
            margin: "0 0 40px",
            userSelect: "none",
          }}
        >
          geek night<span style={{ fontStyle: "italic", fontWeight: 500 }}> engine</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(5, 1fr)",
            gap: 30,
            paddingTop: 30,
            borderTop: "1px solid var(--border-1)",
          }}
          className="site-footer-grid"
        >
          <div>
            <GNELockup size={15} />
            <div className="mono pretty" style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 12, maxWidth: 280 }}>
              The professional cloud workspace for AI-native game production.
            </div>
          </div>
          {footerCols.map((col) => (
            <FooterCol key={col.head} {...col} />
          ))}
        </div>
        <div
          className="gne-row mono"
          style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid var(--border-1)", gap: 16, fontSize: 11, color: "var(--fg-3)", flexWrap: "wrap" }}
        >
          <span>© 2026 Geek Night Engine</span>
          <span>·</span>
          <Link href={routes.privacy} style={{ color: "inherit", textDecoration: "none" }}>
            privacy
          </Link>
          <Link href={routes.terms} style={{ color: "inherit", textDecoration: "none" }}>
            terms
          </Link>
          <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
            security
          </a>
          <div style={{ flex: 1 }} />
          <span style={{ color: "var(--lime)" }}>● </span>
          <span>all systems operational</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ head, links }) {
  return (
    <div>
      <div className="label-cap" style={{ marginBottom: 12 }}>
        {head}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} style={{ fontSize: 13, color: "var(--fg-1)", textDecoration: "none" }}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CtaStrip({ heading, sub, cta }) {
  return (
    <section
      data-anim-section="cta"
      style={{
        padding: "100px 32px",
        background: "var(--bg-0)",
        borderBottom: "1px solid var(--border-1)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        data-anim-cta-bg
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 800px 400px at 50% 60%, rgba(200,247,60,0.15), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 860, margin: "0 auto" }}>
        <span className="chip amber" style={{ marginBottom: 18 }}>
          <span className="dot amber" /> Coming soon
        </span>
        <h2
          data-anim="reveal"
          className="balance"
          style={{ fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 600, letterSpacing: 0, margin: 0, lineHeight: 1.05 }}
        >
          {heading}
        </h2>
        {sub && (
          <p
            data-anim="reveal"
            className="pretty"
            style={{ fontSize: 17, lineHeight: 1.55, color: "var(--fg-1)", margin: "22px auto 30px", maxWidth: 600 }}
          >
            {sub}
          </p>
        )}
        <div style={{ maxWidth: 620, margin: "30px auto 0" }}>
          <NewsletterSignup
            eyebrow="Launch newsletter"
            heading={cta || "Join the first-access list"}
            sub="Get the first public build notes, launch access, and founder updates."
            compact
          />
        </div>
      </div>
    </section>
  );
}
