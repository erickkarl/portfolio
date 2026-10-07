"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { approach, throwVelocity, wrapOffset } from "./drift";
import styles from "./TechStack.module.css";

type Props = {
  /** Seconds the row takes to drift one full loop on its own. */
  duration: number;
  /** Drift rightward instead of leftward. */
  reverse?: boolean;
  label: string;
  children: ReactNode;
};

/** Share of cruising speed kept while the pointer rests on the row. */
const HOVER_SPEED = 0.25;
/** Speed a keyboard arrow press throws the row at. */
const KEY_THROW = 900;

/**
 * A row that drifts on its own and can be dragged, flung, swiped or scrolled
 * sideways. Released, it glides with its own momentum and eases back into the
 * drift. The track holds two identical halves, so the offset wraps at half
 * its width without a visible seam.
 */
export function Marquee({ duration, reverse, label, children }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    // Without these (old browsers, test DOMs) the row simply stays still.
    if (!window.matchMedia || !("IntersectionObserver" in window) || !("ResizeObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const half = track.firstElementChild as HTMLElement | null;
    let loop = half?.offsetWidth ?? 0;
    const cruise = () => ((reverse ? -1 : 1) * loop) / duration;

    let offset = 0;
    let velocity = 0;
    let hovered = false;
    let focused = false;
    let drag: { id: number; x: number; t: number; dx: number; dt: number } | null = null;

    const render = () => {
      offset = wrapOffset(offset, loop);
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    let frame = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.1);
      last = now;
      if (!drag) {
        const target = focused ? 0 : cruise() * (hovered ? HOVER_SPEED : 1);
        velocity = approach(velocity, target, dt);
        offset += velocity * dt;
      }
      render();
      frame = requestAnimationFrame(tick);
    };
    const play = () => {
      if (frame) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const pause = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Only spend frames on rows that are on screen.
    const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting ? play() : pause()));
    visibility.observe(viewport);

    const resize = new ResizeObserver(() => {
      loop = half?.offsetWidth ?? 0;
      render();
    });
    if (half) resize.observe(half);

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, t: e.timeStamp, dx: 0, dt: 0 };
      velocity = 0;
      viewport.setPointerCapture(e.pointerId);
      viewport.dataset.dragging = "";
    };
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      offset -= dx;
      // Remember only the latest movement, so the throw matches the release.
      drag = { ...drag, x: e.clientX, t: e.timeStamp, dx, dt: e.timeStamp - drag.t };
      render();
    };
    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      // A pause before letting go means no throw.
      const still = e.timeStamp - drag.t > 80;
      velocity = still ? 0 : -throwVelocity(drag.dx, drag.dt);
      drag = null;
      delete viewport.dataset.dragging;
    };

    // Sideways scrolling (trackpad swipe, shift + wheel) moves the row;
    // vertical scrolling is left to the page.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      offset += e.deltaX;
      velocity = 0;
      render();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") velocity = -KEY_THROW;
      else if (e.key === "ArrowRight") velocity = KEY_THROW;
      else return;
      e.preventDefault();
    };

    const on = <K extends keyof HTMLElementEventMap>(
      type: K,
      fn: (e: HTMLElementEventMap[K]) => void,
      opts?: AddEventListenerOptions,
    ) => {
      viewport.addEventListener(type, fn, opts);
      return () => viewport.removeEventListener(type, fn, opts);
    };
    const off = [
      on("pointerdown", onDown),
      on("pointermove", onMove),
      on("pointerup", onUp),
      on("pointercancel", onUp),
      on("wheel", onWheel, { passive: false }),
      on("keydown", onKey),
      on("pointerenter", (e) => {
        if (e.pointerType === "mouse") hovered = true;
      }),
      on("pointerleave", () => {
        hovered = false;
      }),
      on("focus", () => {
        focused = true;
      }),
      on("blur", () => {
        focused = false;
      }),
    ];

    return () => {
      pause();
      visibility.disconnect();
      resize.disconnect();
      for (const remove of off) remove();
      track.style.transform = "";
    };
  }, [duration, reverse]);

  return (
    <div
      ref={viewportRef}
      className={styles.viewport}
      tabIndex={0}
      role="group"
      aria-label={`${label}. Drag, swipe or use the arrow keys to scroll.`}
    >
      <div ref={trackRef} className={styles.track}>
        {children}
      </div>
    </div>
  );
}
