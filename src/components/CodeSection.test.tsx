import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CodeSection from "./CodeSection";

describe("CodeSection", () => {
  it("renders section with id code", () => {
    const { container } = render(<CodeSection />);
    const section = container.querySelector("#code");
    expect(section).toBeDefined();
  });

  it("renders Code heading", () => {
    render(<CodeSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Code/i })
    ).toBeDefined();
  });

  it("renders placeholder content", () => {
    render(<CodeSection />);
    expect(screen.getByText(/Project 1/)).toBeDefined();
    expect(screen.getByText(/Project 2/)).toBeDefined();
  });
});
