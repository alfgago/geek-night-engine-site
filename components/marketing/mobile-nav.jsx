"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { Icon, I } from "./icons";
import { GNELockup } from "./brand";
import { LanguageSwitcher } from "./language-switcher";

/**
 * Accessible mobile navigation — full-screen sheet with grouped sections.
 *
 * Tap-target: hamburger button is 48×48 px minimum (class mobile-hamburger).
 * The icon itself stays ~24 px; the button padding makes up the rest.
 *
 * Groups: Product, Studio, Learn, Company — each with a mono-caps label and
 * large link rows (≥1.25 rem, ≥48 px tap target).
 * Legal links appear as a compact strip below the groups.
 *
 * A11y:
 * - aria-expanded / aria-controls on the trigger.
 * - role="dialog" / aria-modal on the overlay.
 * - Focus trapped while open; returned to trigger on close.
 * - Escape closes; overlay-backdrop click closes.
 * - Body scroll lock via .nav-locked class.
 * - Staggered GSAP entrance per group; instant for prefers-reduced-motion.
 */
export function MobileNav({ lang, current }) {
  const [open, setOpen] = useState(false);
  const overlayId = "mobile-nav-overlay";
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);

  const t = getDictionary(lang, "common");
  const r = localizedRoutes(lang);
  const m = t.megaMenu;

  const close = useCallback(() => setOpen(false), []);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.classList.add("nav-locked");
    } else {
      document.body.classList.remove("nav-locked");
    }
    return () => document.body.classList.remove("nav-locked");
  }, [open]);

  // Staggered group entrance (GSAP) + reduced-motion fallback
  useEffect(() => {
    if (!open) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const groups = panelRef.current
      ? Array.from(panelRef.current.querySelectorAll("[data-mobile-group]"))
      : [];
    const footer = panelRef.current?.querySelector("[data-mobile-foot]");

    let cancelled = false;

    if (prefersReduced) {
      groups.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      if (footer) { footer.style.opacity = "1"; footer.style.transform = "none"; }
      return;
    }

    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !panelRef.current) return;
      tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current
        .fromTo(
          groups,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.48, stagger: 0.07 },
          0.06,
        )
        .fromTo(
          footer || [],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2",
        );
    });

    return () => {
      cancelled = true;
      if (tlRef.current) tlRef.current.kill();
    };
  }, [open]);

  // Escape to close + focus trap + return focus to trigger
  useEffect(() => {
    if (!open) return;

    const trigger = buttonRef.current;

    function getFocusable() {
      if (!panelRef.current) return [];
      return Array.from(
        panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first || !panelRef.current.contains(document.activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);

    // Move focus into the panel (first focusable) on open.
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Return focus to the trigger when closing.
      if (trigger) trigger.focus();
    };
  }, [open, close]);

  // Build grouped link sections
  const groups = [
    {
      id: "product",
      label: m.product.label,
      links: [
        { label: m.product.overview, href: r.product },
        { label: m.product.links.architect, href: r.productArchitect },
        { label: m.product.links.scene, href: r.productScenes },
        { label: m.product.links.assets, href: r.productAssetStudios },
        { label: m.product.links.playtest, href: r.productPlaytest },
        { label: m.product.links.hub, href: r.productWorkspace },
      ],
    },
    {
      id: "studio",
      label: m.studio.label,
      links: [
        { label: m.studio.links.how, href: r.how },
        { label: m.studio.links.pricing, href: r.pricing },
        { label: m.studio.links.comingSoon, href: r.newsletter },
      ],
    },
    {
      id: "learn",
      label: m.learn.label,
      links: [
        { label: m.learn.links.docs, href: r.docs },
        { label: m.learn.links.guides, href: r.guides },
        { label: m.learn.links.news, href: r.news },
        { label: m.learn.links.status, href: r.status },
      ],
    },
    {
      id: "company",
      label: m.company.label,
      links: [
        { label: m.company.links.about, href: r.about },
        { label: m.company.links.updates, href: r.launchUpdates },
        { label: m.company.links.contact, href: r.contact },
        { label: m.company.links.careers, href: r.careers },
      ],
    },
  ];

  const legalLinks = [
    { label: m.legalStrip.privacy, href: r.privacy },
    { label: m.legalStrip.terms, href: r.terms },
    { label: m.legalStrip.security, href: r.security },
    { label: m.legalStrip.dmca, href: r.dmca },
  ];

  return (
    <>
      {/* Hamburger trigger — 48×48 tap target */}
      <button
        ref={buttonRef}
        type="button"
        className="hamburger mobile-hamburger mobile-only"
        aria-label={open ? t.aria.closeMenu : t.aria.openMenu}
        aria-expanded={open}
        aria-controls={overlayId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="hamburger-box" aria-hidden="true">
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </span>
      </button>

      <div
        id={overlayId}
        ref={overlayRef}
        className="mobile-overlay"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label={t.aria.siteMenu}
        hidden={!open}
        onMouseDown={(event) => {
          // Overlay-backdrop click (outside the inner panel) closes.
          if (event.target === overlayRef.current) close();
        }}
      >
        <div className="mobile-overlay-inner" ref={panelRef}>
          {/* Header row */}
          <div className="mobile-overlay-head">
            <Link href={r.home} onClick={close} style={{ textDecoration: "none" }} aria-label={t.aria.homeLink}>
              <GNELockup size={17} brand={t.brand} />
            </Link>
            <button
              type="button"
              className="hamburger"
              aria-label={t.aria.closeMenu}
              aria-expanded="true"
              onClick={close}
            >
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-bar" />
                <span className="hamburger-bar" />
                <span className="hamburger-bar" />
              </span>
            </button>
          </div>

          {/* Grouped navigation */}
          <nav className="mobile-nav-groups" aria-label={t.aria.mobileNav}>
            {groups.map((group) => (
              <div key={group.id} className="mobile-nav-group" data-mobile-group>
                <div className="label-cap mobile-nav-group-label">{group.label}</div>
                <ul className="mobile-nav-group-list">
                  {group.links.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={close}
                        data-mobile-link
                        className="mobile-nav-link-row"
                      >
                        {label}
                        <span className="mobile-nav-link-arrow" aria-hidden="true">
                          <Icon d={I.chevRight} size={16} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Legal compact strip */}
            <div className="mobile-nav-legal-strip" data-mobile-group>
              <div className="label-cap mobile-nav-group-label">{m.legalStrip.label}</div>
              <div className="mobile-nav-legal-links">
                {legalLinks.map(({ label, href }) => (
                  <Link key={href} href={href} onClick={close} className="mobile-nav-legal-link">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Footer: language switcher + primary CTA */}
          <div className="mobile-overlay-foot" data-mobile-foot>
            <div className="gne-row" style={{ gap: 12, flexWrap: "wrap" }}>
              <span className="chip amber" style={{ alignSelf: "flex-start" }}>
                <span className="dot amber" /> {t.chips.comingSoon}
              </span>
              <LanguageSwitcher lang={lang} label={t.aria.languageSwitcher} names={t.langSwitch} onNavigate={close} />
            </div>
            <a href={r.newsletter} className="btn primary lg" onClick={close} style={{ justifyContent: "center" }}>
              <Icon d={I.bell} size={13} /> {t.cta.joinNewsletter}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
