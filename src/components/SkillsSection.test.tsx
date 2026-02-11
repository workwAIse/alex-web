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

  it("renders placeholder content", () => {
    render(<SkillsSection />);
    expect(screen.getByText("Skill 1")).toBeDefined();
    expect(screen.getByText("Skill 2")).toBeDefined();
    expect(screen.getByText("Skill 3")).toBeDefined();
  });
});
