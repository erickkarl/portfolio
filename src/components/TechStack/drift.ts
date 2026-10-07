// Pure motion math for the draggable tech rows, kept free of the DOM so it
// can be tested on its own.

/** How quickly a flung row settles back to its cruising speed, per second. */
export const SETTLE_RATE = 2.4;
/** A throw is clamped to this speed so a hard flick doesn't blur the row. */
export const MAX_THROW = 4000;

/** Keeps the offset inside one loop, [0, loopWidth), in either direction. */
export function wrapOffset(offset: number, loopWidth: number): number {
  if (loopWidth <= 0) return 0;
  return ((offset % loopWidth) + loopWidth) % loopWidth;
}

/**
 * Moves a velocity toward its target with exponential decay, so a throw eases
 * back to cruising speed the same way at any frame rate.
 */
export function approach(velocity: number, target: number, dt: number, rate = SETTLE_RATE): number {
  return target + (velocity - target) * Math.exp(-rate * dt);
}

/** The release speed of a drag, from its recent movement, clamped. */
export function throwVelocity(dx: number, dtMs: number): number {
  if (dtMs <= 0) return 0;
  const v = (dx / dtMs) * 1000;
  return Math.max(-MAX_THROW, Math.min(MAX_THROW, v));
}
