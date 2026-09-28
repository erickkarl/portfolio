import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { TechStack } from "./TechStack";

afterEach(cleanup);

describe("TechStack", () => {
  it("renders every group with its technologies", () => {
    render(<TechStack groups={profile.stack} />);

    for (const group of profile.stack) {
      const heading = screen.getByRole("heading", { name: group.title });
      const list = heading.nextElementSibling as HTMLElement;
      expect(within(list).getAllByRole("listitem")).toHaveLength(group.items.length);
    }
  });

  it("shows a logo for each technology", () => {
    const { container } = render(<TechStack groups={profile.stack} />);
    const total = profile.stack.reduce((n, g) => n + g.items.length, 0);
    expect(container.querySelectorAll("img")).toHaveLength(total);
  });
});
