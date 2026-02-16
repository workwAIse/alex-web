import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StickyFooterReveal from "./StickyFooterReveal";

const mockMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation((query: string) => ({
    matches,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }));

describe("StickyFooterReveal", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", mockMatchMedia(false));
  });

  it("renders children inside the main content wrapper", () => {
    render(
      <StickyFooterReveal>
        <span data-testid="child">Main content</span>
      </StickyFooterReveal>
    );
    expect(screen.getByTestId("child")).toBeDefined();
    expect(screen.getByText("Main content")).toBeDefined();
  });

  it("renders footer (site footer) for reveal", () => {
    render(
      <StickyFooterReveal>
        <div>Content</div>
      </StickyFooterReveal>
    );
    const footer = document.querySelector("footer#footer");
    expect(footer).toBeDefined();
  });

  it("main content wrapper has rounded bottom corners", () => {
    render(
      <StickyFooterReveal>
        <div>Content</div>
      </StickyFooterReveal>
    );
    const main = screen.getByTestId("sticky-reveal-main");
    expect(main).toBeDefined();
    expect(main.style.borderBottomLeftRadius).toBeTruthy();
    expect(main.style.borderBottomRightRadius).toBeTruthy();
  });

  it("on mobile renders footer in document flow so full footer is scrollable", async () => {
    vi.stubGlobal("matchMedia", mockMatchMedia(true));
    render(
      <StickyFooterReveal>
        <div>Content</div>
      </StickyFooterReveal>
    );
    await waitFor(() => {
      expect(screen.getByTestId("footer-in-flow")).toBeDefined();
    });
    const footer = document.querySelector("footer#footer");
    expect(footer).toBeDefined();
    const fixedWrapper = document.querySelector(".fixed.bottom-0");
    expect(fixedWrapper).toBeNull();
  });
});
