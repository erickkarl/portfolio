/** Cursor blink period in ms (one "on" + one "off"). */
export const BLINK_MS = 700;
/** How many times the cursor blinks before typing starts. */
export const IDLE_BLINKS = 3;
/** Pause after the last key, while the cursor blinks again. */
export const HOLD_MS = 1400;
/** Duration of the overlay's exit transition. */
export const LEAVE_MS = 600;

/**
 * Delay in ms before each character appears, imitating a person typing:
 * uneven keystrokes, slower spaces, a short "think" before each new word
 * and the odd hesitation. Pass a seeded `rng` for repeatable timing.
 */
export function buildTypingSchedule(text: string, rng: () => number = Math.random): number[] {
  return Array.from(text, (ch, i) => {
    if (i === 0) return 120;

    let delay = 55 + rng() * 110; // regular keystroke: 55–165 ms
    if (ch === " ") delay = 140 + rng() * 120; // thumb on the space bar
    if (text[i - 1] === " ") delay += 120 + rng() * 260; // think before the next word
    if (rng() < 0.1) delay += 160 + rng() * 220; // occasional hesitation

    return Math.round(delay);
  });
}

export type IntroTimeline = {
  /** Time at which each character appears, from the start of the intro. */
  keys: number[];
  typingStart: number;
  leaveAt: number;
  endAt: number;
};

export function buildTimeline(text: string, rng?: () => number): IntroTimeline {
  const typingStart = BLINK_MS * IDLE_BLINKS;
  let t = typingStart;
  const keys = buildTypingSchedule(text, rng).map((d) => (t += d));
  const leaveAt = t + HOLD_MS;
  return { keys, typingStart, leaveAt, endAt: leaveAt + LEAVE_MS };
}
