import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Icon } from "./Icon";

afterEach(cleanup);

describe("Icon", () => {
  it("renders a decorative icon hidden from assistive technology", () => {
    const { container } = render(<Icon name="tabler:arrow-up-right" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.innerHTML).not.toBe("");
  });

  it("exposes a labelled icon as an image", () => {
    render(<Icon name="tabler:mail" label="Email" />);
    expect(screen.getByRole("img", { name: "Email" })).toBeTruthy();
  });

  it("fails loudly on a name that does not exist", () => {
    expect(() => render(<Icon name="tabler:not-a-real-icon" />)).toThrow(/Unknown icon/);
  });
});
