"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MarketingAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroH1 = document.querySelector("section h1");
    if (heroH1 && !heroH1.dataset.animSplit) {
      const text = heroH1.innerHTML;
      heroH1.innerHTML = text.replace(/(<[^>]+>|[^\s<]+)/g, (match) => {
        if (match.startsWith("<")) return match;
        return `<span class="anim-word" style="display:inline-block;will-change:transform">${match}</span>`;
      });
      heroH1.dataset.animSplit = "true";
    }

    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    if (document.querySelector(".anim-word")) {
      heroTl.from(".anim-word", { y: 40, opacity: 0, stagger: 0.04, duration: 0.85 });
    }
    if (document.querySelector("section:first-of-type p")) {
      heroTl.from("section:first-of-type p", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5");
    }
    if (document.querySelector("section:first-of-type .btn")) {
      heroTl.from("section:first-of-type .btn", { y: 12, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.4");
    }
    if (document.querySelector(".card[style*='rotate(-0.6deg)']")) {
      heroTl.from(
        ".card[style*='rotate(-0.6deg)']",
        { x: 80, opacity: 0, rotation: -4, duration: 1.1, ease: "expo.out" },
        "-=0.8",
      );
    }
    if (document.querySelector(".card[style*='rotate(3deg)']")) {
      heroTl.from(
        ".card[style*='rotate(3deg)']",
        { y: 30, opacity: 0, rotation: 8, duration: 0.9, ease: "back.out(1.4)" },
        "-=0.6",
      );
    }
    if (document.querySelector("header nav a, header .btn")) {
      heroTl.from("header nav a, header .btn", { y: -6, opacity: 0, stagger: 0.05, duration: 0.4 }, "-=1.2");
    }

    const trustItems = document.querySelectorAll("section:first-of-type span[style*='letter-spacing']");
    if (trustItems.length) {
      gsap.from(trustItems, {
        scrollTrigger: { trigger: "section:first-of-type", start: "bottom 90%" },
        y: 14,
        opacity: 0,
        stagger: 0.06,
        duration: 0.5,
      });
    }

    gsap.utils.toArray("[data-anim='reveal']").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 88%" },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
    });

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

    gsap.utils.toArray("[data-anim-section='pricing'] [data-anim-card]").forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: index * 0.12,
      });
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { y: -8, duration: 0.35, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { y: 0, duration: 0.35, ease: "power2.out" });
      });
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

    const pin = document.querySelector("[data-anim-pin]");
    const stages = gsap.utils.toArray("[data-stage]");
    const steps = gsap.utils.toArray("[data-step]");
    const sectionContainer = document.querySelector("[data-anim-section='how']");

    if (pin && stages.length && sectionContainer) {
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

    const grain = document.querySelector("[data-anim-grain]");
    if (grain) {
      gsap.to(grain, {
        scrollTrigger: { trigger: grain, start: "top bottom", end: "bottom top", scrub: 1 },
        y: -80,
      });
    }

    const ctaBg = document.querySelector("[data-anim-cta-bg]");
    if (ctaBg) {
      gsap.to(ctaBg, { opacity: 0.6, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }

    const wordmark = document.querySelector("[data-anim-wordmark]");
    if (wordmark) {
      gsap.from(wordmark, {
        scrollTrigger: { trigger: wordmark, start: "top 90%", end: "bottom 50%", scrub: 1 },
        y: 80,
        opacity: 0,
      });
    }

    const navMark = document.querySelector("header svg");
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
    if (navMark) navMark.addEventListener("mouseenter", onEnter);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      if (navMark) navMark.removeEventListener("mouseenter", onEnter);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return null;
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
