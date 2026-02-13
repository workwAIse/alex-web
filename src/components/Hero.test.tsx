import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Hero from "./Hero";

vi.mock("unicornstudio-react/next", () => ({
  default: function MockUnicornScene() {
    return <div data-testid="unicorn-scene" />;
  },
}));

vi.mock("@/components/ui/typewriter", () => ({
  Typewriter: function MockTypewriter({ words }: { words: string[] }) {
    return <span data-testid="typewriter">{words[0]}</span>;
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

  it("renders typewriter with first phrase", () => {
    const { getByTestId, getByText } = render(<Hero />);
    expect(getByTestId("typewriter")).toBeDefined();
    expect(getByText(/Hello, welcome/)).toBeDefined();
  });

  it("has aria-live and aria-label for accessibility", () => {
    const { container } = render(<Hero />);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toBeDefined();
    const label = live?.getAttribute("aria-label") ?? "";
    expect(label).toContain("Alex");
    expect(label).toContain("Hello, welcome");
  });
});
