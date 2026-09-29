import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { profile } from "@/content/profile";
import { Icon } from "./Icon";

afterEach(cleanup);

describe("Icon", () => {
  it("renders a decorative icon hidden from assistive technology", () => {
    const { container } = render(<Icon name="solar:arrow-right-up-linear" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.innerHTML).not.toBe("");
  });

  it("exposes a labelled icon as an image", () => {
    render(<Icon name="logos:react" label="React" />);
    expect(screen.getByRole("img", { name: "React" })).toBeTruthy();
  });

  it("fails loudly on a name that does not exist", () => {
    expect(() => render(<Icon name="logos:not-a-real-logo" />)).toThrow(/Unknown icon/);
  });

  it("resolves every technology logo used on the page", () => {
    for (const tech of profile.stack.flatMap((g) => g.items)) {
      expect(() => render(<Icon name={tech.logo} />), tech.name).not.toThrow();
      cleanup();
    }
  });
});
