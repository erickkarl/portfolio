import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { INTRO_SEEN_KEY, Intro, introBootScript } from "./Intro";

beforeEach(() => {
  sessionStorage.clear();
  document.documentElement.removeAttribute("data-intro");
});
afterEach(cleanup);

describe("Intro", () => {
  it("writes the full name", () => {
    render(<Intro name="Erick Karl Volkert" role="Senior Software Engineer" />);
    expect(screen.getByText("Erick Karl Volkert")).toBeTruthy();
  });

  it("remembers that the visitor has seen it this session", () => {
    render(<Intro name="Erick Karl Volkert" role="Senior Software Engineer" />);
    expect(sessionStorage.getItem(INTRO_SEEN_KEY)).toBe("1");
  });

  it("turns itself off when skipped", async () => {
    const user = userEvent.setup();
    render(<Intro name="Erick Karl Volkert" role="Senior Software Engineer" />);

    await user.click(screen.getByRole("button", { name: "Skip intro" }));

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
