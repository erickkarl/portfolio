"use client";

import { useEffect, useRef } from "react";
import styles from "./SpaceField.module.css";
import {
  createDust,
  createSatellite,
  createStars,
  createStreak,
  dustAlpha,
  dustToEmit,
  stepDust,
  wrap,
  type Dust,
  type Satellite,
  type Star,
  type Streak,
} from "./space";

const MAX_DPR = 1.75;
const MAX_DUST = 260;
/** Dust colors: atmosphere blue, starlight white, sunrise gold. */
const DUST_RGB = ["111,182,255", "235,240,255", "255,207,138"] as const;

/** Soft round glow, drawn once and stamped for every mote and bright star. */
function makeGlow(): HTMLCanvasElement {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  return c;
}

/**
 * Live sky behind the whole site: drifting, twinkling stars in depth, the odd
 * shooting star and satellite, and stardust that trails and follows the
 * pointer. Purely decorative, so it is hidden from assistive technology.
 * Under reduced motion it draws one still starfield and stops.
 */
export function SpaceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const glow = makeGlow();

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const dust: Dust[] = [];
    let streak: Streak | null = null;
    let satellite: Satellite | null = null;
    let nextStreak = 3 + Math.random() * 4;
    let nextSatellite = 6 + Math.random() * 8;

    // Pointer state. Parallax eases toward the pointer so stars never jump.
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let targetPX = 0;
    let targetPY = 0;

    let raf = 0;
    let running = false;
    let prev = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = createStars(width, height);
      if (reduceMotion) draw(0);
    };

    const drawStars = (dt: number) => {
      const scroll = window.scrollY;
      for (const s of stars) {
        // Slow sideways drift; nearer stars move and parallax more.
        s.x = wrap(s.x + (1.2 + s.z * 4) * dt, width);
        const x = wrap(s.x + parallaxX * s.z * 18, width);
        const y = wrap(s.y - scroll * (0.03 + s.z * 0.12) + parallaxY * s.z * 18, height);
        const twinkle = reduceMotion ? 1 : 0.65 + 0.35 * Math.sin(time * s.twinkleSpeed + s.phase);
        const a = (0.25 + s.z * 0.75) * twinkle;
        if (s.z > 0.55) {
          const g = s.r * 7;
          ctx.globalAlpha = a * 0.35;
          ctx.drawImage(glow, x - g / 2, y - g / 2, g, g);
        }
        ctx.globalAlpha = a;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawMovers = (dt: number) => {
      // Shooting star: a bright head with a fading tail.
      nextStreak -= dt;
      if (!streak && nextStreak <= 0) {
        streak = createStreak(width, height);
        nextStreak = 5 + Math.random() * 7;
      }
      if (streak) {
        streak.age += dt;
        streak.x += streak.vx * dt;
        streak.y += streak.vy * dt;
        const t = streak.age / streak.life;
        if (t >= 1) {
          streak = null;
        } else {
          const speed = Math.hypot(streak.vx, streak.vy);
          const tx = streak.x - (streak.vx / speed) * streak.length;
          const ty = streak.y - (streak.vy / speed) * streak.length;
          const fade = Math.sin(Math.PI * t);
          const grad = ctx.createLinearGradient(streak.x, streak.y, tx, ty);
          grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
          grad.addColorStop(1, "rgba(111,182,255,0)");
          ctx.globalAlpha = 1;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(streak.x, streak.y);
          ctx.lineTo(tx, ty);
          ctx.stroke();
        }
      }

      // Satellite: a small steady light crossing slowly.
      nextSatellite -= dt;
      if (!satellite && nextSatellite <= 0) {
        satellite = createSatellite(width, height);
      }
      if (satellite) {
        satellite.x += satellite.vx * dt;
        satellite.y += satellite.vy * dt;
        if (satellite.x < -20 || satellite.x > width + 20) {
          satellite = null;
          nextSatellite = 14 + Math.random() * 16;
        } else {
          ctx.globalAlpha = 0.55;
          ctx.drawImage(glow, satellite.x - 5, satellite.y - 5, 10, 10);
          ctx.globalAlpha = 0.95;
          ctx.fillStyle = "#fff";
          ctx.fillRect(satellite.x - 0.9, satellite.y - 0.9, 1.8, 1.8);
        }
      }
    };

    const drawDust = (dt: number) => {
      ctx.globalCompositeOperation = "lighter";
      for (let i = dust.length - 1; i >= 0; i--) {
        const d = dust[i];
        if (!stepDust(d, dt, pointerX, pointerY)) {
          dust.splice(i, 1);
          continue;
        }
        const a = dustAlpha(d);
        const g = d.size * 9;
        ctx.globalAlpha = a * 0.5;
        ctx.drawImage(glow, d.x - g / 2, d.y - g / 2, g, g);
        ctx.globalAlpha = a;
        ctx.fillStyle = `rgb(${DUST_RGB[d.hue]})`;
        ctx.fillRect(d.x - d.size / 2, d.y - d.size / 2, d.size, d.size);
      }
      ctx.globalCompositeOperation = "source-over";
    };

    function draw(dt: number) {
      ctx!.clearRect(0, 0, width, height);
      drawStars(dt);
      if (!reduceMotion) {
        drawMovers(dt);
        drawDust(dt);
      }
      ctx!.globalAlpha = 1;
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000 || 0);
      prev = now;
      time += dt;
      parallaxX += (targetPX - parallaxX) * Math.min(1, dt * 3);
      parallaxY += (targetPY - parallaxY) * Math.min(1, dt * 3);
      draw(dt);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion || document.hidden) return;
      running = true;
      prev = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dtMs = Math.max(8, now - lastT);
      const fresh = pointerX === null || now - lastT > 200;
      pointerX = e.clientX;
      pointerY = e.clientY;
      targetPX = (e.clientX / width - 0.5) * 2;
      targetPY = (e.clientY / height - 0.5) * 2;

      if (!fresh) {
        const n = dustToEmit(Math.hypot(dx, dy), coarse);
        const vx = (dx / dtMs) * 1000;
        const vy = (dy / dtMs) * 1000;
        for (let i = 0; i < n && dust.length < MAX_DUST; i++) {
          // Spread motes along the segment so fast moves leave an even trail.
          const t = (i + 1) / n;
          dust.push(createDust(lastX + dx * t, lastY + dy * t, vx, vy));
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };
    const onPointerLeave = () => {
      pointerX = null;
      pointerY = null;
      targetPX = 0;
      targetPY = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
    }

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
