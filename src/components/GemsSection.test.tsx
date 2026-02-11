import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GemsSection from "./GemsSection";

describe("GemsSection", () => {
  it("renders section with id gems", () => {
    const { container } = render(<GemsSection />);
    const section = container.querySelector("#gems");
    expect(section).toBeDefined();
  });

  it("renders Gems heading", () => {
    render(<GemsSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Gems/i })
    ).toBeDefined();
  });

  it("renders placeholder content", () => {
    render(<GemsSection />);
    expect(screen.getByText("Gem 1")).toBeDefined();
    expect(screen.getByText("Gem 2")).toBeDefined();
  });
});
