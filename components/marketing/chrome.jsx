import Link from "next/link";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { contacts } from "@/data/marketing-data";
import { Icon, I } from "./icons";
import { NewsletterSignup } from "./newsletter-signup";
import { GNELockup, GNEMark } from "./brand";
import { MobileNav } from "./mobile-nav";
import { LanguageSwitcher } from "./language-switcher";

export { GNELockup, GNEMark };

function buildNavLinks(lang) {
  const t = getDictionary(lang, "common");
  const r = localizedRoutes(lang);
  return [
    { id: "home", label: t.nav.home, href: r.home },
    { id: "product", label: t.nav.product, href: r.product },
    { id: "how", label: t.nav.how, href: r.how },
    { id: "pricing", label: t.nav.pricing, href: r.pricing },
    { id: "news", label: t.nav.news, href: r.news },
    { id: "contact", label: t.nav.contact, href: r.contact },
  ];
}

export function SiteNav({ lang, current }) {
  const t = getDictionary(lang, "common");
  const r = localizedRoutes(lang);
  const navLinks = buildNavLinks(lang);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(12px)",
        background: "rgba(12, 12, 10, 0.7)",
        borderBottom: "1px solid var(--border-1)",
      }}
    >
      <div className="nav-shell">
        <Link href={r.home} style={{ textDecoration: "none" }} aria-label={t.aria.homeLink}>
          <GNELockup size={17} brand={t.brand} />
        </Link>
        <nav className="gne-row nav-links" aria-label={t.aria.marketingNav}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="nav-link"
              data-active={current === link.id}
              aria-current={current === link.id ? "page" : undefined}
              style={{
                color: current === link.id ? "var(--fg-0)" : "var(--fg-1)",
                textDecoration: "none",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-spacer" style={{ flex: 1 }} />
        <div className="gne-row nav-actions">
          <LanguageSwitcher lang={lang} label={t.aria.languageSwitcher} names={t.langSwitch} />
          <span className="chip amber">
            <span className="dot amber" /> {t.chips.comingSoon}
          </span>
          <a href={r.newsletter} className="btn primary sm">
            <Icon d={I.bell} size={11} /> {t.cta.joinNewsletter}
          </a>
        </div>
        <MobileNav lang={lang} navLinks={navLinks} current={current} />
      </div>
    </header>
  );
}

export function PageHero({ lang, eyebrow, heading, sub, primaryCta, secondaryCta, primaryHref, secondaryHref }) {
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
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "100px 32px 60px", textAlign: "left" }}>
        {eyebrow && (
          <div data-anim="reveal" className="label-cap" style={{ marginBottom: 16 }}>
            {eyebrow}
          </div>
        )}
        <h1
          data-anim="reveal"
          className="balance display"
          style={{
            fontSize: "clamp(42px, 6.6vw, 72px)",
            lineHeight: 0.96,
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
            className="pretty measure"
            style={{ fontSize: 17.5, lineHeight: 1.55, color: "var(--fg-1)", margin: "22px 0 0" }}
          >
            {sub}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div data-anim="reveal" className="gne-row" style={{ gap: 10, marginTop: 30, flexWrap: "wrap" }}>
            {primaryCta && (
              <a
                href={primaryHref || r.newsletter}
                className="btn primary lg"
                style={{ minHeight: 44, padding: "0 22px", fontSize: 14.5, gap: 9 }}
              >
                <Icon d={I.bell} size={14} /> {primaryCta}
              </a>
            )}
            {secondaryCta && (
              <a href={secondaryHref || r.login} className="btn lg" style={{ minHeight: 44, padding: "0 18px", fontSize: 14, gap: 8 }}>
                <Icon d={I.play} size={12} fill /> {secondaryCta}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function buildFooterCols(lang) {
  const t = getDictionary(lang, "common").footer.cols;
  const r = localizedRoutes(lang);

  return [
    {
      head: t.product.head,
      links: [
        [t.product.links.architect, r.productArchitect],
        [t.product.links.scene, r.productScenes],
        [t.product.links.assets, r.productAssetStudios],
        [t.product.links.playtest, r.productPlaytest],
        [t.product.links.hub, r.productWorkspace],
      ],
    },
    {
      head: t.studio.head,
      links: [
        [t.studio.links.how, r.how],
        [t.studio.links.pricing, r.pricing],
        [t.studio.links.comingSoon, r.newsletter],
      ],
    },
    {
      head: t.learn.head,
      links: [
        [t.learn.links.docs, r.docs],
        [t.learn.links.guides, r.guides],
        [t.learn.links.news, r.news],
        [t.learn.links.status, r.status],
      ],
    },
    {
      head: t.company.head,
      links: [
        [t.company.links.about, r.about],
        [t.company.links.updates, r.launchUpdates],
        [t.company.links.contact, r.contact],
        [t.company.links.careers, r.careers],
      ],
    },
    {
      head: t.legal.head,
      links: [
        [t.legal.links.privacy, r.privacy],
        [t.legal.links.terms, r.terms],
        [t.legal.links.security, r.security],
        [t.legal.links.dmca, r.dmca],
      ],
    },
  ];
}

export function SiteFooter({ lang }) {
  const common = getDictionary(lang, "common");
  const t = common.footer;
  const r = localizedRoutes(lang);
  const footerCols = buildFooterCols(lang);

  return (
    <footer style={{ padding: "60px 32px 40px", background: "var(--bg-1)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          data-anim-wordmark
          aria-hidden="true"
          style={{
            position: "relative",
            fontSize: "clamp(72px, 12vw, 180px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            lineHeight: 0.9,
            margin: "0 0 40px",
            userSelect: "none",
          }}
        >
          {/* outline layer (always visible) */}
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1px var(--border-3)",
            }}
          >
            {common.brand.footerFirst}<span style={{ fontStyle: "italic", fontWeight: 500 }}> {common.brand.footerSecond}</span>
          </span>
          {/* fill layer — scroll reveals it via clip-path (data-anim-wordmark-fill) */}
          <span
            data-anim-wordmark-fill
            style={{
              position: "absolute",
              inset: 0,
              color: "var(--lime)",
              opacity: 0.9,
              clipPath: "inset(0 100% 0 0)",
              willChange: "clip-path",
            }}
          >
            {common.brand.footerFirst}<span style={{ fontStyle: "italic", fontWeight: 500 }}> {common.brand.footerSecond}</span>
          </span>
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
            <GNELockup size={15} brand={common.brand} />
            <div className="mono pretty" style={{ fontSize: 12, color: "var(--fg-3)", marginTop: 12, maxWidth: 280 }}>
              {t.blurb}
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
          <span>{t.copyright}</span>
          <span>·</span>
          <Link href={r.privacy} style={{ color: "inherit", textDecoration: "none" }}>
            {t.privacy}
          </Link>
          <Link href={r.terms} style={{ color: "inherit", textDecoration: "none" }}>
            {t.terms}
          </Link>
          <Link href={r.security} style={{ color: "inherit", textDecoration: "none" }}>
            {t.security}
          </Link>
          <div style={{ flex: 1 }} />
          <Link href={r.status} style={{ color: "var(--lime)", textDecoration: "none" }}>
            ● {t.status}
          </Link>
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

export function CtaStrip({ lang, heading, sub, cta }) {
  const t = getDictionary(lang, "common");

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
          <span className="dot amber" /> {t.chips.comingSoon}
        </span>
        <h2
          data-anim="reveal"
          className="balance display"
          style={{ fontSize: "clamp(40px, 5.2vw, 58px)", fontWeight: 600, margin: 0, lineHeight: 1.02 }}
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
            lang={lang}
            eyebrow={t.ctaStrip.newsletterEyebrow}
            heading={cta || t.ctaStrip.defaultHeading}
            sub={t.ctaStrip.newsletterSub}
            compact
          />
        </div>
      </div>
    </section>
  );
}
