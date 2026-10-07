import { describe, expect, it } from "vitest";
import { BLINK_MS, HOLD_MS, IDLE_BLINKS, LEAVE_MS, buildTimeline, buildTypingSchedule } from "./typing";

/** Small deterministic PRNG (mulberry32) so timings are repeatable. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NAME = "Erick Karl";

describe("buildTypingSchedule", () => {
  it("has one delay per character", () => {
    expect(buildTypingSchedule(NAME, seeded(1))).toHaveLength(NAME.length);
  });

  it("keeps every keystroke within human range", () => {
    for (const d of buildTypingSchedule(NAME, seeded(2))) {
      expect(d).toBeGreaterThanOrEqual(35);
      expect(d).toBeLessThanOrEqual(600);
    }
  });

  it("varies its speed instead of ticking evenly", () => {
    const delays = buildTypingSchedule(NAME, seeded(3));
    expect(new Set(delays).size).toBeGreaterThan(NAME.length / 2);
  });

  it("pauses before starting each new word", () => {
    // With rng pinned to 0 the only variation comes from the rules themselves.
    const delays = buildTypingSchedule(NAME, () => 0);
    const wordStarts = [...NAME].flatMap((ch, i) => (i > 0 && NAME[i - 1] === " " ? [i] : []));
    for (const i of wordStarts) expect(delays[i]).toBeGreaterThan(delays[i + 1]);
  });

  it("is repeatable with the same seed", () => {
    expect(buildTypingSchedule(NAME, seeded(7))).toEqual(buildTypingSchedule(NAME, seeded(7)));
  });
});

describe("buildTimeline", () => {
  it("blinks three times, types, holds, then leaves", () => {
    const tl = buildTimeline(NAME, seeded(4));
    expect(tl.typingStart).toBe(BLINK_MS * IDLE_BLINKS);
    expect(tl.keys[0]).toBeGreaterThan(tl.typingStart);
    expect(tl.keys).toEqual([...tl.keys].sort((a, b) => a - b));
    expect(tl.leaveAt).toBe(tl.keys.at(-1)! + HOLD_MS);
    expect(tl.endAt).toBe(tl.leaveAt + LEAVE_MS);
  });
});
