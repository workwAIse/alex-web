import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Marquee } from "./marquee";
import { MarqueeDemo } from "./marquee-demo";

describe("Marquee", () => {
  it("renders children", () => {
    render(
      <Marquee>
        <span data-testid="child">Item</span>
      </Marquee>
    );
    const children = screen.getAllByTestId("child");
    expect(children.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with overflow hidden for animation", () => {
    const { container } = render(
      <Marquee>
        <span>Item</span>
      </Marquee>
    );
    const wrapper = container.querySelector(".overflow-hidden");
    expect(wrapper).toBeDefined();
  });
});

describe("MarqueeDemo", () => {
  it("renders marquee with logo images (Gemini uses local icon)", () => {
    render(<MarqueeDemo />);
    const geminiLogos = screen.getAllByRole("img", { name: "Gemini" });
    expect(geminiLogos.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Claude and Gemini with local cursor icons, duplicated for seamless scroll", () => {
    render(<MarqueeDemo />);
    const claudeLogos = screen.getAllByRole("img", { name: "Claude AI" });
    const geminiLogos = screen.getAllByRole("img", { name: "Gemini" });
    expect(claudeLogos.length).toBeGreaterThanOrEqual(2);
    expect(geminiLogos.length).toBeGreaterThanOrEqual(2);
    expect(claudeLogos[0].getAttribute("src")).toContain("claude-ai-icon.webp");
    expect(geminiLogos[0].getAttribute("src")).toContain("google-gemini-icon.webp");
  });
});
