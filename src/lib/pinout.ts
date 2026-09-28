export type PinSide = "left" | "right";

export type PinPosition = {
  side: PinSide;
  /** 1-based row, counted from the top of the package. */
  row: number;
};

/**
 * Position of pin `n` on a dual in-line package with `total` pins, seen from the top.
 *
 * DIP numbering starts at the notch, runs down the left side, then continues
 * counter-clockwise up the right side. On a DIP-14, pin 8 sits bottom-right
 * and pin 14 sits top-right, directly across from pin 1.
 */
export function pinPosition(n: number, total: number): PinPosition {
  if (total <= 0 || total % 2 !== 0) {
    throw new RangeError(`A DIP package needs an even, positive pin count; got ${total}.`);
  }
  if (!Number.isInteger(n) || n < 1 || n > total) {
    throw new RangeError(`Pin ${n} does not exist on a ${total}-pin package.`);
  }

  const perSide = total / 2;
  if (n <= perSide) return { side: "left", row: n };
  return { side: "right", row: total + 1 - n };
}

/** Zero-padded pin label as printed on datasheets, e.g. 3 → "03". */
export function pinLabel(n: number): string {
  return String(n).padStart(2, "0");
}
