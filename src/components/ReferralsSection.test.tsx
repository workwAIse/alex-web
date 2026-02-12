import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ReferralsSection from "./ReferralsSection";

beforeEach(() => {
  window.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })) as unknown as typeof IntersectionObserver;
});

describe("ReferralsSection", () => {
  it("renders section with id referrals", () => {
    const { container } = render(<ReferralsSection />);
    const section = container.querySelector("#referrals");
    expect(section).toBeDefined();
  });

  it("renders heading What people say", () => {
    render(<ReferralsSection />);
    expect(
      screen.getByRole("heading", { level: 2, name: /What people say/i })
    ).toBeDefined();
  });

  it("renders referral content", () => {
    render(<ReferralsSection />);
    expect(screen.getAllByText(/Working with Alex was a great experience/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Engineering Lead").length).toBeGreaterThanOrEqual(1);
  });
});
