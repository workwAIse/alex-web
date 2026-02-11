import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders footer with id and role", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer#footer");
    expect(footer).toBeDefined();
    expect(footer?.getAttribute("aria-label")).toBe("Site footer");
  });

  it("renders footer navigation links", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer navigation/i });
    expect(nav).toBeDefined();
    expect(screen.getByRole("link", { name: /top/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /projects/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /skills/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /code/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /gems/i })).toBeDefined();
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeDefined();
  });
});
