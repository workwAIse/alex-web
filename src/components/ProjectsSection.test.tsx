import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectsSection from "./ProjectsSection";

vi.mock("lottie-react", () => ({ default: () => null }));
vi.mock("./ChatModal", () => ({ default: () => null }));

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

  it("renders case study titles", () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/EGYM Squat Test: AI Mobility Assessment/i)).toBeDefined();
    expect(screen.getByText(/EGYM Genius: AI Training Plans/i)).toBeDefined();
    expect(screen.getByText(/Fitness Hub seca edition: Integrated BIA Assessments/i)).toBeDefined();
    expect(screen.getByText(/Interhyp Home: New mortgage comparison product/i)).toBeDefined();
  });

  it("renders Outcome, Impact, Tasks, Role labels", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByText(/^Outcome:$/).length).toBe(4);
    expect(screen.getAllByText(/^Impact:$/).length).toBe(4);
    expect(screen.getAllByText(/^Tasks:$/).length).toBe(4);
    expect(screen.getAllByText(/^Role:$/).length).toBe(4);
  });

  it("renders a chat input bar under each project with pre-filled prompt", () => {
    render(<ProjectsSection />);
    const inputs = screen.getAllByPlaceholderText("Ask a follow-up...");
    expect(inputs.length).toBe(4);
    const firstInput = inputs[0] as HTMLInputElement;
    expect(firstInput.value).toBe("Tell Me More About Alex Time at EGYM");
    const fourthInput = inputs[3] as HTMLInputElement;
    expect(fourthInput.value).toBe("Tell Me More About Alex Time at Interhyp");
  });

  it("renders company logos next to project headlines (EGYM and Interhyp)", () => {
    render(<ProjectsSection />);
    expect(screen.getAllByRole("img", { name: "EGYM" }).length).toBe(3);
    expect(screen.getByRole("img", { name: "Interhyp" })).toBeDefined();
  });
});
