import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Hero from "./Hero";

vi.mock("unicornstudio-react/next", () => ({
  default: function MockUnicornScene() {
    return <div data-testid="unicorn-scene" />;
  },
}));

describe("Hero", () => {
  it("renders hero section with Unicorn scene container", () => {
    const { container } = render(<Hero />);
    const section = container.querySelector("section");
    expect(section).toBeDefined();
    const sceneWrapper = section?.querySelector('[class*="absolute inset-0"]');
    expect(sceneWrapper).toBeDefined();
  });

  it("renders per-letter flip-clock block (initial: Alex Buechel)", () => {
    const { getAllByText, container } = render(<Hero />);
    expect(getAllByText("A").length).toBeGreaterThanOrEqual(1);
    expect(getAllByText("B").length).toBeGreaterThanOrEqual(1);
    const flipBlock = container.querySelector('[style*="font-family"]');
    expect(flipBlock).toBeDefined();
    expect(flipBlock?.children.length).toBe(12);
  });

  it("flip block has aria-label for accessibility and shows one of the labels", () => {
    const { container } = render(<Hero />);
    const liveRegion = container.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeDefined();
    expect(liveRegion?.getAttribute("aria-atomic")).toBe("true");
    const label = liveRegion?.getAttribute("aria-label");
    expect(["Alex Buechel", "Senior PM"]).toContain(label);
  });
});
