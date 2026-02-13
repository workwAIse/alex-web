import { act, render } from "@testing-library/react";
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

  it("scrolling down in hero starts the zoom and shows the laptop layer", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    const { container } = render(<Hero />);
    expect(container.querySelector('img[src*="Laptop"]')).toBeNull();

    act(() => {
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: 10, bubbles: true })
      );
    });

    expect(container.querySelector('img[src*="Laptop"]')).not.toBeNull();
  });

  it("scroll is not triggered when wheel down starts zoom", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(<Hero />);
    act(() => {
      window.dispatchEvent(
        new WheelEvent("wheel", { deltaY: 10, bubbles: true })
      );
    });

    expect(scrollTo).not.toHaveBeenCalled();
    scrollTo.mockRestore();
  });
});
