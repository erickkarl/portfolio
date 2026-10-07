/** Cursor blink period in ms (one "on" + one "off"). */
export const BLINK_MS = 480;
/** How many times the cursor blinks before typing starts. */
export const IDLE_BLINKS = 3;
/** Pause after the last key, while the cursor blinks again. */
export const HOLD_MS = 700;
/** Duration of the overlay's exit transition. */
export const LEAVE_MS = 450;

/**
 * Delay in ms before each character appears, imitating a person typing:
 * uneven keystrokes, slower spaces, a short "think" before each new word
 * and the odd hesitation. Pass a seeded `rng` for repeatable timing.
 */
export function buildTypingSchedule(text: string, rng: () => number = Math.random): number[] {
  return Array.from(text, (ch, i) => {
    if (i === 0) return 80;

    let delay = 35 + rng() * 65; // regular keystroke: 35–100 ms
    if (ch === " ") delay = 90 + rng() * 70; // thumb on the space bar
    if (text[i - 1] === " ") delay += 70 + rng() * 130; // think before the next word
    if (rng() < 0.08) delay += 90 + rng() * 120; // occasional hesitation

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
