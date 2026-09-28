import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { Pinout } from "./Pinout";

afterEach(cleanup);

describe("Pinout", () => {
  it("renders one pressable label per pin", () => {
    render(<Pinout pins={profile.pins} partNo={profile.partNo} />);
    expect(screen.getAllByRole("button")).toHaveLength(profile.pins.length);
  });

  it("opens with pin 1 selected so the detail panel is never empty", () => {
    render(<Pinout pins={profile.pins} partNo={profile.partNo} />);
    expect(screen.getByRole("button", { name: "Pin 1: React" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText(profile.pins[0].note)).toBeTruthy();
  });

  it("shows the selected pin's details on click", async () => {
    const user = userEvent.setup();
    render(<Pinout pins={profile.pins} partNo={profile.partNo} />);

    await user.click(screen.getByRole("button", { name: "Pin 13: AWS" }));

    expect(screen.getByRole("button", { name: "Pin 13: AWS" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "Pin 1: React" }).getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByText(/Pin 13 · server, data, delivery/)).toBeTruthy();
  });
});
