"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";
import { Icon, I } from "./icons";
import { GNELockup } from "./brand";
import { LanguageSwitcher } from "./language-switcher";

/**
 * Accessible mobile navigation.
 * - Hamburger button morphs burger -> X (CSS, see globals.css).
 * - Opens a full-screen slide-in overlay with backdrop blur/dim.
 * - Staggered nav-link entrance (GSAP timeline; instant swap if reduced-motion).
 * - Body scroll lock while open; Escape and overlay-click close it.
 * - Focus is trapped while open and returned to the trigger on close.
 * - aria-expanded / aria-controls wired; respects prefers-reduced-motion.
 */
export function MobileNav({ lang, navLinks, current }) {
  const [open, setOpen] = useState(false);
  const overlayId = "mobile-nav-overlay";
  const buttonRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const tlRef = useRef(null);

  const t = getDictionary(lang, "common");
  const r = localizedRoutes(lang);

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

  // Staggered entrance (GSAP) + reduced-motion fallback
  useEffect(() => {
    if (!open) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const links = panelRef.current
      ? Array.from(panelRef.current.querySelectorAll("[data-mobile-link]"))
      : [];
    const footer = panelRef.current?.querySelector("[data-mobile-foot]");

    let cancelled = false;

    if (prefersReduced) {
      links.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      if (footer) {
        footer.style.opacity = "1";
        footer.style.transform = "none";
      }
      return;
    }

    // Dynamic import keeps GSAP out of the critical path and avoids SSR.
    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !panelRef.current) return;
      tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current
        .fromTo(
          links,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          0.08,
        )
        .fromTo(
          footer || [],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45 },
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

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="hamburger mobile-only"
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
          // Overlay-click (outside the inner panel) closes.
          if (event.target === overlayRef.current) close();
        }}
      >
        <div className="mobile-overlay-inner" ref={panelRef}>
          <div className="mobile-overlay-head">
            <Link href={r.home} onClick={close} style={{ textDecoration: "none" }} aria-label={t.aria.homeLink}>
              <GNELockup size={17} />
            </Link>
            <button type="button" className="hamburger" aria-label={t.aria.closeMenu} aria-expanded="true" onClick={close}>
              <span className="hamburger-box" aria-hidden="true">
                <span className="hamburger-bar" />
                <span className="hamburger-bar" />
                <span className="hamburger-bar" />
              </span>
            </button>
          </div>

          <nav className="mobile-nav-list" aria-label={t.aria.mobileNav}>
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={close}
                data-mobile-link
                data-active={current === link.id}
                className="mobile-nav-link"
                aria-current={current === link.id ? "page" : undefined}
              >
                <span>{link.label}</span>
                <span className="arrow" aria-hidden="true">
                  <Icon d={I.chevRight} size={20} />
                </span>
              </Link>
            ))}
          </nav>

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
