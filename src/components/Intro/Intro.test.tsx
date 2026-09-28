import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { INTRO_SEEN_KEY, Intro, introBootScript } from "./Intro";
import { buildTimeline } from "./typing";

const NAME = "Erick Karl Volkert Alves";
const rng = () => 0.5;
const timeline = buildTimeline(NAME, rng);

beforeEach(() => {
  vi.useFakeTimers();
  sessionStorage.clear();
  document.documentElement.removeAttribute("data-intro");
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const typedText = () => screen.getByTestId("intro").querySelector("p")!.textContent;
const phase = () => screen.getByTestId("intro").dataset.phase;

describe("Intro", () => {
  it("starts with only the blinking cursor", () => {
    render(<Intro text={NAME} rng={rng} />);
    expect(typedText()).toBe("");
    expect(phase()).toBe("idle");
  });

  it("keeps blinking until three blinks have passed", () => {
    render(<Intro text={NAME} rng={rng} />);
    act(() => vi.advanceTimersByTime(timeline.typingStart - 1));
    expect(typedText()).toBe("");
  });

  it("types the name one key at a time", () => {
    render(<Intro text={NAME} rng={rng} />);
    act(() => vi.advanceTimersByTime(timeline.keys[4]));
    expect(typedText()).toBe("Erick");
    expect(phase()).toBe("typing");

    act(() => vi.advanceTimersByTime(timeline.keys.at(-1)! - timeline.keys[4]));
    expect(typedText()).toBe(NAME);
    expect(phase()).toBe("done");
  });

  it("opens the site when the animation ends", () => {
    render(<Intro text={NAME} rng={rng} />);
    act(() => vi.advanceTimersByTime(timeline.leaveAt));
    expect(phase()).toBe("leaving");
    act(() => vi.advanceTimersByTime(timeline.endAt - timeline.leaveAt));
    expect(document.documentElement.getAttribute("data-intro")).toBe("off");
  });

  it("remembers that the visitor has seen it this session", () => {
    render(<Intro text={NAME} rng={rng} />);
    expect(sessionStorage.getItem(INTRO_SEEN_KEY)).toBe("1");
  });

  it("can be skipped with the button or Escape", () => {
    render(<Intro text={NAME} rng={rng} />);
    fireEvent.click(screen.getByRole("button", { name: "Skip intro" }));
    expect(document.documentElement.getAttribute("data-intro")).toBe("off");

    document.documentElement.removeAttribute("data-intro");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(document.documentElement.getAttribute("data-intro")).toBe("off");
  });
});

describe("introBootScript", () => {
  it("does nothing on a first visit", () => {
    new Function(introBootScript)();
    expect(document.documentElement.hasAttribute("data-intro")).toBe(false);
  });

  it("hides the intro before paint on a repeat visit", () => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    new Function(introBootScript)();
    expect(document.documentElement.getAttribute("data-intro")).toBe("off");
  });
});
