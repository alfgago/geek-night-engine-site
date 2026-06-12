"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedRoutes } from "@/lib/site-links";
import { getDictionary } from "@/lib/i18n";

/**
 * Desktop mega menu.
 *
 * - Four top-level buttons (Product, Studio, Learn, Company).
 * - Hover OR click opens a shared full-width panel beneath the nav bar.
 * - Legal links live in a bottom strip inside the panel, not as a 5th column.
 * - GSAP fade + y entrance, ~200 ms, reduced-motion: instant.
 * - Keyboard: arrow keys navigate within open panel; Escape / Tab-out closes.
 * - Active-route section detected from the current pathname.
 * - Focus rings from globals.css apply automatically via .gne scope.
 */
export function MegaMenu({ lang }) {
  const t = getDictionary(lang, "common");
  const r = localizedRoutes(lang);
  const m = t.megaMenu;
  const pathname = usePathname() || "/";

  const [activeId, setActiveId] = useState(null);
  const panelRef = useRef(null);
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Which top-level section is the user currently in?
  function currentSection() {
    if (pathname.startsWith(`/${lang}/product`) || pathname.startsWith("/product")) return "product";
    if (pathname.startsWith(`/${lang}/how-it-works`) || pathname.startsWith("/how-it-works") ||
        pathname.startsWith(`/${lang}/pricing`) || pathname.startsWith("/pricing")) return "studio";
    if (pathname.startsWith(`/${lang}/docs`) || pathname.startsWith("/docs") ||
        pathname.startsWith(`/${lang}/guides`) || pathname.startsWith("/guides") ||
        pathname.startsWith(`/${lang}/news`) || pathname.startsWith("/news") ||
        pathname.startsWith(`/${lang}/status`) || pathname.startsWith("/status")) return "learn";
    if (pathname.startsWith(`/${lang}/about`) || pathname.startsWith("/about") ||
        pathname.startsWith(`/${lang}/launch-updates`) || pathname.startsWith("/launch-updates") ||
        pathname.startsWith(`/${lang}/contact`) || pathname.startsWith("/contact") ||
        pathname.startsWith(`/${lang}/careers`) || pathname.startsWith("/careers")) return "company";
    return null;
  }

  const isOpen = activeId !== null;

  const open = useCallback((id) => {
    clearTimeout(closeTimerRef.current);
    setActiveId(id);
  }, []);

  const close = useCallback(() => {
    setActiveId(null);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(close, 120);
  }, [close]);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimerRef.current);
  }, []);

  // GSAP entrance when panel opens
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const cols = Array.from(panelRef.current.querySelectorAll("[data-mega-col]"));
    const strip = panelRef.current.querySelector("[data-mega-strip]");

    if (prefersReduced) {
      cols.forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
      if (strip) { strip.style.opacity = "1"; strip.style.transform = "none"; }
      return;
    }

    let cancelled = false;
    import("gsap").then(({ default: gsap }) => {
      if (cancelled || !panelRef.current) return;
      tlRef.current?.kill();
      tlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });
      tlRef.current
        .fromTo(
          panelRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.18 },
          0,
        )
        .fromTo(
          cols,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.22, stagger: 0.04 },
          0.04,
        )
        .fromTo(
          strip || [],
          { opacity: 0 },
          { opacity: 1, duration: 0.18 },
          "-=0.1",
        );
    });

    return () => {
      cancelled = true;
      tlRef.current?.kill();
    };
  }, [isOpen, activeId]);

  // Escape closes
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        // Return focus to the triggering button
        const btn = containerRef.current?.querySelector(`[data-mega-trigger="${activeId}"]`);
        btn?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, activeId]);

  // Click-outside closes
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(e) {
      if (!containerRef.current?.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen, close]);

  // Route change closes
  useEffect(() => {
    close();
  }, [pathname, close]);

  const section = currentSection();
  const panelId = "mega-panel";

  const topItems = [
    { id: "product", label: m.product.label },
    { id: "studio", label: m.studio.label },
    { id: "learn", label: m.learn.label },
    { id: "company", label: m.company.label },
  ];

  return (
    <div
      ref={containerRef}
      className="mega-nav-root desktop-only"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      {/* Top-level trigger buttons */}
      <nav className="gne-row mega-nav-bar" aria-label={t.aria.marketingNav}>
        {topItems.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            data-mega-trigger={id}
            className="mega-nav-btn"
            data-active={section === id}
            data-open={activeId === id}
            aria-expanded={activeId === id}
            aria-controls={panelId}
            onMouseEnter={() => open(id)}
            onClick={() => activeId === id ? close() : open(id)}
            onFocus={() => activeId !== null && open(id)}
          >
            {label}
            <span className="mega-nav-btn-chevron" aria-hidden="true" />
          </button>
        ))}
      </nav>

      {/* Shared panel */}
      <div
        id={panelId}
        ref={panelRef}
        className="mega-panel"
        data-open={isOpen}
        role="region"
        aria-label={t.aria.megaPanel}
        hidden={!isOpen}
        onMouseEnter={cancelClose}
      >
        <div className="mega-panel-inner">
          {/* Panel body: columns switch based on activeId */}
          {activeId === "product" && (
            <ProductCols m={m} r={r} close={close} />
          )}
          {activeId === "studio" && (
            <StudioCols m={m} r={r} close={close} />
          )}
          {activeId === "learn" && (
            <LearnCols m={m} r={r} close={close} />
          )}
          {activeId === "company" && (
            <CompanyCols m={m} r={r} close={close} />
          )}

          {/* Legal strip at the bottom of every panel state */}
          <div className="mega-legal-strip" data-mega-strip>
            <span className="label-cap" style={{ color: "var(--fg-3)", marginRight: 12 }}>
              {m.legalStrip.label}
            </span>
            <Link href={r.privacy} className="mega-legal-link" onClick={close}>{m.legalStrip.privacy}</Link>
            <Link href={r.terms} className="mega-legal-link" onClick={close}>{m.legalStrip.terms}</Link>
            <Link href={r.security} className="mega-legal-link" onClick={close}>{m.legalStrip.security}</Link>
            <Link href={r.dmca} className="mega-legal-link" onClick={close}>{m.legalStrip.dmca}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCols({ m, r, close }) {
  const p = m.product;
  return (
    <div className="mega-cols">
      {/* Overview lead link */}
      <div className="mega-col" data-mega-col>
        <div className="label-cap" style={{ marginBottom: 14 }}>{p.label}</div>
        <Link href={r.product} className="mega-overview-link" onClick={close}>
          <span className="mega-overview-dot" aria-hidden="true" />
          <span>
            <span className="mega-link-title">{p.overview}</span>
            <span className="mega-link-desc">{p.overviewDesc}</span>
          </span>
        </Link>
      </div>
      <MegaLinkCol label="" items={[
        { label: p.links.architect, desc: p.links.architectDesc, href: r.productArchitect },
        { label: p.links.scene, desc: p.links.sceneDesc, href: r.productScenes },
      ]} close={close} />
      <MegaLinkCol label="" items={[
        { label: p.links.assets, desc: p.links.assetsDesc, href: r.productAssetStudios },
        { label: p.links.playtest, desc: p.links.playtestDesc, href: r.productPlaytest },
      ]} close={close} />
      <MegaLinkCol label="" items={[
        { label: p.links.hub, desc: p.links.hubDesc, href: r.productWorkspace },
      ]} close={close} />
    </div>
  );
}

function StudioCols({ m, r, close }) {
  const s = m.studio;
  return (
    <div className="mega-cols">
      <MegaLinkCol label={s.label} items={[
        { label: s.links.how, desc: s.links.howDesc, href: r.how },
        { label: s.links.pricing, desc: s.links.pricingDesc, href: r.pricing },
        { label: s.links.comingSoon, desc: s.links.comingSoonDesc, href: r.newsletter },
      ]} close={close} />
    </div>
  );
}

function LearnCols({ m, r, close }) {
  const l = m.learn;
  return (
    <div className="mega-cols">
      <MegaLinkCol label={l.label} items={[
        { label: l.links.docs, desc: l.links.docsDesc, href: r.docs },
        { label: l.links.guides, desc: l.links.guidesDesc, href: r.guides },
        { label: l.links.news, desc: l.links.newsDesc, href: r.news },
        { label: l.links.status, desc: l.links.statusDesc, href: r.status },
      ]} close={close} />
    </div>
  );
}

function CompanyCols({ m, r, close }) {
  const c = m.company;
  return (
    <div className="mega-cols">
      <MegaLinkCol label={c.label} items={[
        { label: c.links.about, desc: c.links.aboutDesc, href: r.about },
        { label: c.links.updates, desc: c.links.updatesDesc, href: r.launchUpdates },
        { label: c.links.contact, desc: c.links.contactDesc, href: r.contact },
        { label: c.links.careers, desc: c.links.careersDesc, href: r.careers },
      ]} close={close} />
    </div>
  );
}

function MegaLinkCol({ label, items, close }) {
  return (
    <div className="mega-col" data-mega-col>
      {label && <div className="label-cap" style={{ marginBottom: 14 }}>{label}</div>}
      <ul className="mega-link-list">
        {items.map(({ label: itemLabel, desc, href }) => (
          <li key={href}>
            <Link href={href} className="mega-link-item" onClick={close}>
              <span className="mega-link-title">{itemLabel}</span>
              {desc && <span className="mega-link-desc">{desc}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
