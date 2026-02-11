import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StickyFooterReveal from "./StickyFooterReveal";

describe("StickyFooterReveal", () => {
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
});
