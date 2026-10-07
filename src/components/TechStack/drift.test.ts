import { describe, expect, it } from "vitest";
import { approach, MAX_THROW, throwVelocity, wrapOffset } from "./drift";

describe("wrapOffset", () => {
  it("keeps the offset inside one loop in both directions", () => {
    expect(wrapOffset(130, 100)).toBe(30);
    expect(wrapOffset(-30, 100)).toBe(70);
    expect(wrapOffset(0, 100)).toBe(0);
  });

  it("survives an unmeasured row", () => {
    expect(wrapOffset(50, 0)).toBe(0);
  });
});

describe("approach", () => {
  it("eases a throw back to cruising speed", () => {
    let v = 2000;
    for (let i = 0; i < 300; i++) v = approach(v, 40, 1 / 60);
    expect(v).toBeCloseTo(40, 0);
  });

  it("settles the same way at any frame rate", () => {
    let fast = 1000;
    for (let i = 0; i < 120; i++) fast = approach(fast, 0, 1 / 120);
    const slow = approach(1000, 0, 1);
    expect(fast).toBeCloseTo(slow, 6);
  });
});

describe("throwVelocity", () => {
  it("measures release speed in pixels per second", () => {
    expect(throwVelocity(50, 100)).toBe(500);
    expect(throwVelocity(-50, 100)).toBe(-500);
  });

  it("clamps hard flicks and ignores zero time", () => {
    expect(throwVelocity(10_000, 1)).toBe(MAX_THROW);
    expect(throwVelocity(10, 0)).toBe(0);
  });
});
