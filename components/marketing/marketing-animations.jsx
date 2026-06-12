"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Marketing motion system. Three signature moves, reused everywhere:
 *
 *   1. CASCADE      — staggered y+opacity entrance (never all-at-once).
 *                     Drives [data-anim="reveal"] and grouped [data-anim-card]s.
 *   2. CLIP WIPE    — scroll-driven clip-path reveal ([data-anim-mask] / section
 *                     headers), plus the footer wordmark outline-to-fill wipe.
 *   3. PINNED SCRUB — one pinned/scrubbed showcase per major page: the
 *                     how-it-works pipeline pins and progresses with scroll;
 *                     the home hero mock parallax-drifts its depth layers.
 *
 * Plus choreographed hero entrance, magnetic/scale CTA feedback, and
 * spotlight-border cursor tracking. Everything is gated behind
 * prefers-reduced-motion and torn down on App Router navigation.
 */
export function MarketingAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Spotlight cursor tracking works regardless of reduced motion
    //      (it's a hover affordance, not an entrance animation). ----
    const spotlightCleanup = wireSpotlights();

    if (prefersReduced) {
      // Reveal everything in place; no GSAP entrance/scroll work.
      revealAllStatic();
      return () => {
        spotlightCleanup();
      };
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      buildHeroTimeline();
      buildCascades();
      buildPinnedPipeline();
      buildAmbient();
      buildFooterWordmark();
    });

    const magneticCleanup = wireMagneticCtas();
    const navMarkCleanup = wireNavMarkGlitch();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      magneticCleanup();
      navMarkCleanup();
      spotlightCleanup();
    };
    // Re-run on route change so triggers bind to the new page and old ones die.
  }, [pathname]);

  return null;
}

/* ============================ MOVE: HERO ============================ */

function buildHeroTimeline() {
  const heroH1 = document.querySelector("section h1");
  if (heroH1 && !heroH1.dataset.animSplit) {
    const text = heroH1.innerHTML;
    heroH1.innerHTML = text.replace(/(<[^>]+>|[^\s<]+)/g, (match) => {
      if (match.startsWith("<")) return match;
      return `<span class="anim-word" style="display:inline-block;will-change:transform">${match}</span>`;
    });
    heroH1.dataset.animSplit = "true";
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // wordmark / nav first
  if (document.querySelector("header nav a, header .btn")) {
    tl.from("header nav a, header .btn", { y: -6, opacity: 0, stagger: 0.05, duration: 0.4 }, 0);
  }
  // headline lines stagger in
  if (document.querySelector(".anim-word")) {
    tl.from(".anim-word", { y: 44, opacity: 0, stagger: 0.045, duration: 0.85 }, 0.1);
  }
  if (document.querySelector("section:first-of-type p")) {
    tl.from("section:first-of-type p", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");
  }
  if (document.querySelector("section:first-of-type .btn")) {
    tl.from("section:first-of-type .btn", { y: 12, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.4");
  }
  // mock parallax layers settle last
  if (document.querySelector(".card[style*='rotate(-0.6deg)']")) {
    tl.from(
      ".card[style*='rotate(-0.6deg)']",
      { x: 80, opacity: 0, rotation: -4, duration: 1.1, ease: "expo.out" },
      "-=0.9",
    );
  }
  const depth = document.querySelector("[data-anim-hero-depth]");
  if (depth) {
    tl.from(depth, { x: 40, opacity: 0, duration: 1.0, ease: "expo.out" }, "-=1.0");
  }
  if (document.querySelector(".card[style*='rotate(3deg)']")) {
    tl.from(
      ".card[style*='rotate(3deg)']",
      { y: 30, opacity: 0, rotation: 8, duration: 0.9, ease: "back.out(1.4)" },
      "-=0.6",
    );
  }

  // Home hero mock parallax on scroll (subtle, transforms only).
  const mock = document.querySelector(".home-hero-preview");
  if (mock && depth) {
    gsap.to(depth, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: mock, start: "top bottom", end: "bottom top", scrub: 1 },
    });
  }
}

/* ========================= MOVE: CASCADE ========================== */

function buildCascades() {
  // Generic reveals — clip-wipe headers, cascade everything else.
  gsap.utils.toArray("[data-anim='reveal']").forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 88%" },
      y: 28,
      opacity: 0,
      duration: 0.85,
      ease: "power3.out",
    });
  });

  // Grouped card cascades — staggered, alternating tilt, in feature sections.
  gsap.utils.toArray("[data-anim-section='features'] [data-anim-card]").forEach((el, index) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 88%" },
      y: 40,
      opacity: 0,
      rotation: index % 2 === 0 ? -1 : 1,
      duration: 0.8,
      ease: "power3.out",
      delay: (index % 3) * 0.08,
    });
  });

  // Pricing cards: deeper cascade + hover lift.
  gsap.utils.toArray("[data-anim-section='pricing'] [data-anim-card]").forEach((el, index) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: index * 0.12,
    });
    const enter = () => gsap.to(el, { y: -8, duration: 0.35, ease: "power2.out" });
    const leave = () => gsap.to(el, { y: 0, duration: 0.35, ease: "power2.out" });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
  });

  const feat = document.querySelector("[data-anim-section='pricing'] .card[style*='lime-edge']");
  if (feat) {
    gsap.to(feat, {
      boxShadow: "0 0 0 1px var(--lime), 0 30px 80px -20px rgba(200,247,60,0.32)",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }
}

/* ====================== MOVE: PINNED SCRUB ======================== */

function buildPinnedPipeline() {
  const pin = document.querySelector("[data-anim-pin]");
  const stages = gsap.utils.toArray("[data-stage]");
  const steps = gsap.utils.toArray("[data-step]");
  const sectionContainer = document.querySelector("[data-anim-section='how']");

  if (!(pin && stages.length && sectionContainer)) return;

  gsap.set(stages, { opacity: 0 });
  gsap.set(stages[0], { opacity: 1 });
  setStepActive(0, steps);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
    },
  });

  stages.forEach((stage, index) => {
    if (index === 0) return;
    const prev = stages[index - 1];
    tl.to(prev, { opacity: 0, duration: 0.5 }, index)
      .to(stage, { opacity: 1, duration: 0.5 }, index)
      .call(() => setStepActive(index, steps), [], index);
  });

  ScrollTrigger.create({
    trigger: sectionContainer,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (state) => {
      const progress = state.progress;
      if (progress > 0.27 && progress < 0.55) {
        document.querySelectorAll("[data-anim-op]").forEach((el, index) => {
          const localProgress = (progress - 0.27) / 0.28;
          if (localProgress > index * 0.12) {
            gsap.to(el, { opacity: 1, x: 0, duration: 0.35, overwrite: "auto" });
          }
        });
      }
      if (progress > 0.55 && progress < 0.8) {
        document.querySelectorAll("[data-anim-pipe]").forEach((el, index) => {
          const localProgress = (progress - 0.55) / 0.25;
          if (localProgress > index * 0.12) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.35, overwrite: "auto" });
          }
        });
        const snap = document.querySelector("[data-anim-snap]");
        if (snap && progress > 0.72) {
          gsap.to(snap, { opacity: 1, y: 0, duration: 0.5, overwrite: "auto" });
        }
      }
    },
  });
}

/* ========================== AMBIENT FX =========================== */

function buildAmbient() {
  const grain = document.querySelector("[data-anim-grain]");
  if (grain) {
    gsap.to(grain, {
      scrollTrigger: { trigger: grain, start: "top bottom", end: "bottom top", scrub: 1 },
      yPercent: -14,
    });
  }

  const ctaBg = document.querySelector("[data-anim-cta-bg]");
  if (ctaBg) {
    gsap.to(ctaBg, { opacity: 0.6, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }
}

/* =================== MOVE: FOOTER WORDMARK ======================= */

function buildFooterWordmark() {
  const wordmark = document.querySelector("[data-anim-wordmark]");
  if (!wordmark) return;

  gsap.from(wordmark, {
    scrollTrigger: { trigger: wordmark, start: "top 90%", end: "bottom 50%", scrub: 1 },
    y: 80,
    opacity: 0,
  });

  // outline -> fill wipe: clip-path scrubbed across the wordmark width.
  const fill = wordmark.querySelector("[data-anim-wordmark-fill]");
  if (fill) {
    gsap.fromTo(
      fill,
      { clipPath: "inset(0 100% 0 0)" },
      {
        clipPath: "inset(0 0% 0 0)",
        ease: "none",
        scrollTrigger: { trigger: wordmark, start: "top 85%", end: "bottom 60%", scrub: 0.8 },
      },
    );
  }
}

/* ===================== INTERACTION WIRING ======================== */

function wireMagneticCtas() {
  const ctas = Array.from(document.querySelectorAll(".btn.primary.lg"));
  const handlers = [];

  ctas.forEach((btn) => {
    const onMove = (event) => {
      const rect = btn.getBoundingClientRect();
      const relX = event.clientX - rect.left - rect.width / 2;
      const relY = event.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: relX * 0.18, y: relY * 0.22, duration: 0.4, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    handlers.push([btn, onMove, onLeave]);
  });

  return () => {
    handlers.forEach(([btn, onMove, onLeave]) => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
      gsap.set(btn, { clearProps: "transform" });
    });
  };
}

function wireSpotlights() {
  const cards = Array.from(document.querySelectorAll(".spotlight"));
  const handlers = [];

  cards.forEach((card) => {
    const onMove = (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    card.addEventListener("mousemove", onMove);
    handlers.push([card, onMove]);
  });

  return () => {
    handlers.forEach(([card, onMove]) => card.removeEventListener("mousemove", onMove));
  };
}

function wireNavMarkGlitch() {
  const navMark = document.querySelector("header svg");
  if (!navMark) return () => {};
  const onEnter = () => {
    gsap.to(navMark.querySelectorAll("rect"), {
      opacity: () => Math.random(),
      stagger: { each: 0.04, from: "random" },
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };
  navMark.addEventListener("mouseenter", onEnter);
  return () => navMark.removeEventListener("mouseenter", onEnter);
}

/* ===================== REDUCED MOTION ============================ */

function revealAllStatic() {
  // Ensure nothing that JS would have animated-in stays hidden.
  document.querySelectorAll("[data-anim='reveal'], [data-anim-card]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  // Pinned pipeline: show every stage stacked so content is reachable.
  document.querySelectorAll("[data-stage]").forEach((el) => {
    el.style.opacity = "1";
  });
  document
    .querySelectorAll("[data-anim-op], [data-anim-pipe], [data-anim-snap]")
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  const fill = document.querySelector("[data-anim-wordmark-fill]");
  if (fill) fill.style.clipPath = "inset(0 0 0 0)";
}

function setStepActive(index, steps) {
  steps.forEach((step, stepIndex) => {
    const num = step.querySelector("[data-step-num]");
    const label = step.querySelector("[data-step-label]");
    const isActive = stepIndex <= index;
    gsap.to(step, {
      background: isActive ? "var(--lime-bg)" : "var(--bg-2)",
      borderColor: isActive ? "var(--lime-edge)" : "var(--border-1)",
      duration: 0.4,
    });
    if (num) {
      gsap.to(num, {
        background: stepIndex === index ? "var(--lime)" : isActive ? "var(--lime-bg)" : "var(--bg-3)",
        color: stepIndex === index ? "var(--lime-ink)" : isActive ? "var(--lime)" : "var(--fg-2)",
        borderColor: stepIndex === index ? "var(--lime)" : isActive ? "var(--lime-edge)" : "var(--border-2)",
        duration: 0.35,
      });
    }
    if (label) {
      gsap.to(label, {
        color: isActive ? "var(--fg-0)" : "var(--fg-1)",
        duration: 0.35,
      });
    }
  });
}
