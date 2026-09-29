import { describe, expect, it } from "vitest";
import {
  createDust,
  createSatellite,
  createStars,
  dustAlpha,
  dustToEmit,
  starCount,
  stepDust,
  wrap,
} from "./space";

/** Deterministic rng (mulberry32). */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe("stars", () => {
  it("scales with screen area but stays capped", () => {
    expect(starCount(390, 844)).toBeLessThan(starCount(1440, 900));
    expect(starCount(7680, 4320)).toBe(900);
  });

  it("places every star on screen with depth in [0, 1]", () => {
    for (const s of createStars(800, 600, seeded(1))) {
      expect(s.x).toBeGreaterThanOrEqual(0);
      expect(s.x).toBeLessThan(800);
      expect(s.y).toBeGreaterThanOrEqual(0);
      expect(s.y).toBeLessThan(600);
      expect(s.z).toBeGreaterThanOrEqual(0);
      expect(s.z).toBeLessThanOrEqual(1);
    }
  });

  it("keeps most stars distant", () => {
    const stars = createStars(1440, 900, seeded(2));
    const near = stars.filter((s) => s.z > 0.6).length;
    expect(near / stars.length).toBeLessThan(0.25);
  });

  it("wraps drifting coordinates back onto the screen", () => {
    expect(wrap(-5, 100)).toBe(95);
    expect(wrap(105, 100)).toBe(5);
  });
});

describe("stardust", () => {
  it("emits fine dust: more for longer moves, less on touch, capped", () => {
    expect(dustToEmit(0, false)).toBe(0);
    expect(dustToEmit(60, false)).toBeGreaterThan(dustToEmit(12, false));
    expect(dustToEmit(60, true)).toBeLessThan(dustToEmit(60, false));
    expect(dustToEmit(10_000, false)).toBe(16);
  });

  it("is mostly sub-pixel and lingers for over a second", () => {
    const rng = seeded(7);
    const motes = Array.from({ length: 400 }, () => createDust(0, 0, 0, 0, rng));
    const small = motes.filter((d) => d.size < 1).length;
    expect(small / motes.length).toBeGreaterThan(0.7);
    for (const d of motes) expect(d.life).toBeGreaterThanOrEqual(1.2);
  });

  it("drifts slowly instead of flying off", () => {
    const d = createDust(0, 0, 3000, 0, seeded(8));
    for (let i = 0; i < 60; i++) stepDust(d, 1 / 60, seeded(9 + i));
    expect(Math.hypot(d.vx, d.vy)).toBeLessThan(80);
  });

  it("fades in, then out, and dies at the end of its life", () => {
    const d = createDust(0, 0, 0, 0, seeded(3));
    expect(dustAlpha(d)).toBe(0);
    d.age = d.life * 0.99;
    expect(dustAlpha(d)).toBeLessThan(0.02);
    expect(stepDust(d, d.life)).toBe(false);
  });
});

describe("satellite", () => {
  it("starts just off one edge and heads across the screen", () => {
    const s = createSatellite(1000, 800, seeded(4));
    const offLeft = s.x < 0 && s.vx > 0;
    const offRight = s.x > 1000 && s.vx < 0;
    expect(offLeft || offRight).toBe(true);
  });
});
