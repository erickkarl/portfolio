import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { formatTime, LocalTime } from "./LocalTime";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("LocalTime", () => {
  it("formats the time in the given zone, not the reader's", () => {
    const noonUtc = new Date("2026-06-01T12:00:00Z");
    expect(formatTime(noonUtc, "America/Sao_Paulo")).toBe("09:00");
    expect(formatTime(noonUtc, "Asia/Tokyo")).toBe("21:00");
  });

  it("shows the current time and keeps it current", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-01T12:00:00Z"));
    render(<LocalTime timeZone="America/Sao_Paulo" />);
    expect(screen.getByText("09:00")).toBeTruthy();

    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("09:01")).toBeTruthy();
  });
});
