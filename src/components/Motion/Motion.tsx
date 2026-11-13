"use client";

import { useEffect } from "react";

/**
 * The only script behind the page's motion: it marks each [data-reveal]
 * block the first time it is scrolled to, and CSS eases it in. Everything
 * else (hero entrance, parallax) is plain CSS, and scrolling is native.
 *
 * Blocks are only ever hidden after this has run, so the page is complete
 * without script, and under reduced motion nothing is hidden at all.
 */
export function Motion() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Whatever is already on screen (or above it) stays as it is.
    const limit = window.innerHeight * 0.92;
    for (const el of blocks) {
      if (el.getBoundingClientRect().top < limit) el.dataset.in = "";
    }
    root.classList.add("reveal-on");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of blocks) {
      if (!("in" in el.dataset)) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-on");
    };
  }, []);

  return null;
}
