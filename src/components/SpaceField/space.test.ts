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
    expect(starCount(7680, 4320)).toBe(320);
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

  it("gives stars a range of real star colors", () => {
    const tints = new Set(createStars(1440, 900, seeded(5)).map((s) => s.tint));
    expect(tints.size).toBeGreaterThanOrEqual(3);
  });

  it("keeps most stars distant", () => {
    const stars = createStars(1440, 900, seeded(2));
    const near = stars.filter((s) => s.z > 0.6).length;
    // Expected share is about 0.21 (z = u^2.2), well below a uniform 0.4.
    expect(near / stars.length).toBeLessThan(0.3);
  });

  it("wraps drifting coordinates back onto the screen", () => {
    expect(wrap(-5, 100)).toBe(95);
    expect(wrap(105, 100)).toBe(5);
  });
});

describe("stardust", () => {
  it("emits more for longer moves, and less on touch", () => {
    expect(dustToEmit(0, false)).toBe(0);
    expect(dustToEmit(60, false)).toBeGreaterThan(dustToEmit(12, false));
    expect(dustToEmit(60, true)).toBeLessThan(dustToEmit(60, false));
    expect(dustToEmit(10_000, false)).toBe(10);
  });

  it("is pulled toward the pointer", () => {
    const d = createDust(0, 0, 0, 0, () => 0.5);
    d.vx = 0;
    d.vy = 0;
    stepDust(d, 0.1, 200, 0);
    expect(d.x).toBeGreaterThan(0);
  });

  it("fades in, then out, and dies at the end of its life", () => {
    const d = createDust(0, 0, 0, 0, seeded(3));
    expect(dustAlpha(d)).toBe(0);
    d.age = d.life * 0.12;
    expect(dustAlpha(d)).toBeCloseTo(1);
    expect(stepDust(d, d.life, null, null)).toBe(false);
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
