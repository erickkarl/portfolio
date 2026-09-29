import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyEmail } from "./CopyEmail";

const EMAIL = "erickkarl5@gmail.com";

function setClipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("CopyEmail", () => {
  it("shows the address as text", () => {
    render(<CopyEmail email={EMAIL} copyIcon={null} doneIcon={null} />);
    expect(screen.getByText(EMAIL)).toBeTruthy();
  });

  it("copies the address and confirms, then resets", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    render(<CopyEmail email={EMAIL} copyIcon={null} doneIcon={null} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: `Copy ${EMAIL}` }));
    });
    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(screen.getByText("Copied")).toBeTruthy();

    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByText("Copy")).toBeTruthy();
  });

  it("selects the address when the clipboard is blocked", async () => {
    setClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    render(<CopyEmail email={EMAIL} copyIcon={null} doneIcon={null} />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: `Copy ${EMAIL}` }));
    });
    expect(window.getSelection()?.toString()).toBe(EMAIL);
  });
});
