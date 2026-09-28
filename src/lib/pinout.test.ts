import { describe, expect, it } from "vitest";
import { pinLabel, pinPosition } from "./pinout";

describe("pinPosition", () => {
  it("puts pins 1–7 down the left side of a DIP-14", () => {
    expect(pinPosition(1, 14)).toEqual({ side: "left", row: 1 });
    expect(pinPosition(7, 14)).toEqual({ side: "left", row: 7 });
  });

  it("runs pins 8–14 counter-clockwise up the right side", () => {
    expect(pinPosition(8, 14)).toEqual({ side: "right", row: 7 });
    expect(pinPosition(14, 14)).toEqual({ side: "right", row: 1 });
  });

  it("places each pin directly across from its partner", () => {
    for (let n = 1; n <= 7; n++) {
      expect(pinPosition(15 - n, 14).row).toBe(pinPosition(n, 14).row);
    }
  });

  it("rejects pins that do not exist", () => {
    expect(() => pinPosition(0, 14)).toThrow(RangeError);
    expect(() => pinPosition(15, 14)).toThrow(RangeError);
    expect(() => pinPosition(1, 13)).toThrow(RangeError);
  });
});

describe("pinLabel", () => {
  it("zero-pads to two digits", () => {
    expect(pinLabel(3)).toBe("03");
    expect(pinLabel(14)).toBe("14");
  });
});
