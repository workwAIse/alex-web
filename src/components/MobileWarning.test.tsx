import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MobileWarning from "./MobileWarning";

describe("MobileWarning", () => {
  it("does not render on desktop", () => {
    Object.defineProperty(window, "innerWidth", { value: 1024, writable: true });
    Object.defineProperty(navigator, "userAgent", {
      value: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      writable: true,
      configurable: true,
    });

    const { container } = render(<MobileWarning />);
    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it("renders on a narrow viewport (mobile)", () => {
    Object.defineProperty(window, "innerWidth", { value: 375, writable: true });

    render(<MobileWarning />);
    expect(screen.getByText("Not optimized for mobile")).not.toBeNull();
  });

  it("dismisses when the button is clicked", () => {
    Object.defineProperty(window, "innerWidth", { value: 375, writable: true });

    const { container } = render(<MobileWarning />);
    expect(container.querySelector('[role="dialog"]')).not.toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /got it/i }));

    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });
});
