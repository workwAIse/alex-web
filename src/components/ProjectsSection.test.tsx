import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectsSection from "./ProjectsSection";

describe("ProjectsSection", () => {
  it("renders section with id projects", () => {
    const { container } = render(<ProjectsSection />);
    const section = container.querySelector("#projects");
    expect(section).toBeDefined();
  });

  it("renders Projects heading", () => {
    render(<ProjectsSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Projects/i })
    ).toBeDefined();
  });

  it("renders placeholder content", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/Senior Engineer — Company A/i)).toBeDefined();
    expect(screen.getByText(/Tech Lead — Company B/i)).toBeDefined();
  });
});
