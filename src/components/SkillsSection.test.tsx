import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SkillsSection from "./SkillsSection";

describe("SkillsSection", () => {
  it("renders section with id skills", () => {
    const { container } = render(<SkillsSection />);
    const section = container.querySelector("#skills");
    expect(section).toBeDefined();
  });

  it("renders Skills heading", () => {
    render(<SkillsSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Skills/i })
    ).toBeDefined();
  });

  it("renders skill categories and items", () => {
    render(<SkillsSection />);
    expect(screen.getByRole("heading", { level: 3, name: "Product Management" })).toBeDefined();
    expect(screen.getByRole("heading", { level: 3, name: "AI & Innovation" })).toBeDefined();
    expect(screen.getByText("Product Strategy & Roadmapping")).toBeDefined();
    expect(screen.getByText("LLM-powered Workflows")).toBeDefined();
    expect(screen.getByText("German")).toBeDefined();
    expect(screen.getByText("English")).toBeDefined();
  });
});
