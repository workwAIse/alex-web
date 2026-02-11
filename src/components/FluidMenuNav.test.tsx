import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("lottie-react", () => ({ default: () => null }));

import FluidMenuNav from "./FluidMenuNav";

describe("FluidMenuNav", () => {
  it("renders the fluid menu container in the document", () => {
    const { container } = render(<FluidMenuNav />);
    const expandedEl = container.querySelector("[data-expanded]");
    expect(expandedEl).toBeDefined();
  });

  it("is fixed at bottom-right (z-40)", () => {
    const { container } = render(<FluidMenuNav />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("fixed");
    expect(wrapper.className).toContain("bottom-4");
    expect(wrapper.className).toContain("right-4");
    expect(wrapper.className).toContain("z-40");
  });
});
