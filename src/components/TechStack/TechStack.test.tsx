import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { TechStack } from "./TechStack";

afterEach(cleanup);

describe("TechStack", () => {
  it("exposes each technology exactly once per group to assistive technology", () => {
    render(<TechStack groups={profile.stack} />);

    for (const group of profile.stack) {
      const row = screen.getByRole("heading", { name: group.title }).parentElement!;
      const items = within(row).getAllByRole("listitem");
      expect(items.map((li) => li.textContent)).toEqual(group.items.map((t) => t.name));
    }
  });

  it("repeats every row enough to loop seamlessly", () => {
    const { container } = render(<TechStack groups={profile.stack} />);
    const rows = container.querySelectorAll("[data-reveal]");

    rows.forEach((row, i) => {
      const [first, second] = row.querySelectorAll("ul");
      // The two halves must match for the -50% slide to be seamless.
      expect(first.children.length).toBe(second.children.length);
      expect(first.children.length).toBeGreaterThanOrEqual(12);
      expect(first.children.length % profile.stack[i].items.length).toBe(0);
    });
  });

  it("shows each technology's mark", () => {
    const { container } = render(<TechStack groups={profile.stack} />);
    const visible = container.querySelectorAll("ul:not([aria-hidden]) > li:not([aria-hidden]) svg");
    const total = profile.stack.reduce((n, g) => n + g.items.length, 0);
    expect(visible).toHaveLength(total);
  });
});
