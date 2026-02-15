import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GemsSection from "./GemsSection";

const GEM_TITLES = [
  "Sport Lover",
  "Avid Reader",
  "City Collector",
  "AI Explorer",
  "Lifelong Learner",
  "People Enthusiast",
  "Product Builder",
  "Confident Presenter",
];

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

  it("renders all 8 gem titles", () => {
    render(<GemsSection />);
    GEM_TITLES.forEach((title) => {
      expect(screen.getByText(title)).toBeDefined();
    });
  });

  it("renders short descriptions", () => {
    render(<GemsSection />);
    expect(screen.getByText(/Experimenting with LLMs/)).toBeDefined();
    expect(screen.getByText(/Building small tools/)).toBeDefined();
    expect(screen.getByText(/pitching the product on a big stage/)).toBeDefined();
  });

  it("shows Current favorite with star icon in overflow menu", () => {
    render(<GemsSection />);
    const moreButtons = screen.getAllByRole("button", { name: /More options/i });
    fireEvent.click(moreButtons[0]);
    expect(screen.getByText("Current favorite")).toBeDefined();
    expect(screen.getByRole("menuitem")).toBeDefined();
  });

  it("does not render Show more or Show less button", () => {
    render(<GemsSection />);
    expect(screen.queryByRole("button", { name: /Show more/i })).toBeNull();
    expect(screen.queryByText(/Show less/i)).toBeNull();
  });
});
