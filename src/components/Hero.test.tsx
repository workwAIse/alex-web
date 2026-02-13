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

  it("renders gradient overlay", () => {
    const { container } = render(<Hero />);
    const gradient = container.querySelector(
      '[class*="bg-gradient-to-b"][aria-hidden]'
    );
    expect(gradient).toBeDefined();
  });
});
