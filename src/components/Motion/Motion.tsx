"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { INTRO_DONE_EVENT } from "@/components/Intro/Intro";

/**
 * The page's single motion system: GSAP for choreography, ScrollTrigger for
 * scroll-linked moments, Lenis as the one smooth-scroll engine.
 *
 * Content is fully readable without this component. Under reduced motion it
 * skips smooth scrolling and scrubbing and shows every final state at once.
 */
export function Motion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-hero]", { opacity: 1 });
      return;
    }

    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const introRunning = root.getAttribute("data-intro") !== "off";
    if (introRunning) lenis.stop();

    const ctx = gsap.context(() => {
      // Hero entrance: the atmosphere brightens, then the words rise out of it.
      const hero = gsap.timeline({ paused: true, defaults: { ease: "expo.out", duration: 1.2 } });
      hero
        .fromTo("[data-hero='media']", { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.4 })
        .fromTo("[data-hero='eyebrow']", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0 }, 0.3)
        .set("[data-hero='title']", { autoAlpha: 1 }, 0.4)
        .fromTo("[data-hero='title'] [data-word]", { yPercent: 110 }, { yPercent: 0, stagger: 0.09 }, 0.4)
        .fromTo("[data-hero='lede']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 0.85)
        .fromTo("[data-hero='actions']", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0 }, 1.0)
        .fromTo("[data-hero='caption']", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 }, 1.3);

      const start = () => {
        lenis.start();
        hero.play();
      };
      if (introRunning) window.addEventListener(INTRO_DONE_EVENT, start, { once: true });
      else start();

      // Leaving orbit: the photograph drifts down and away as the page scrolls.
      gsap.to("[data-parallax]", {
        yPercent: 16,
        scale: 1.05,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero-section]", start: "top top", end: "bottom top", scrub: true },
      });

      // Section headings rise word by word as they enter.
      gsap.utils.toArray<HTMLElement>("[data-reveal-heading]").forEach((heading) => {
        gsap.from(heading.querySelectorAll("[data-word]"), {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        });
      });

      // Supporting copy and lists follow the heading.
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // The career trajectory draws itself as you read down it.
      gsap.fromTo(
        "[data-trajectory]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-trajectory-track]", start: "top 70%", end: "bottom 65%", scrub: true },
        },
      );
    });

    // Fonts and images change layout; re-measure once they settle.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
