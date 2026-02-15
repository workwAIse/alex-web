import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CodeSection from "./CodeSection";

const mockMatchMedia = () =>
  vi.fn().mockImplementation(() => ({
    matches: false,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }));

const mockIntersectionObserver = () =>
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: "",
    thresholds: [],
  }));

const mockResizeObserver = () =>
  vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

describe("CodeSection", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", mockMatchMedia());
    vi.stubGlobal("IntersectionObserver", mockIntersectionObserver());
    vi.stubGlobal("ResizeObserver", mockResizeObserver());
  });

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

  it("renders hobby project content and open link in IDE view", () => {
    render(<CodeSection />);
    expect(screen.getAllByText(/workwAIse/).length).toBeGreaterThanOrEqual(1);
    const openLinks = screen.getAllByRole("link", {
      name: /Open workwAIse.*in new tab/i,
    });
    expect(openLinks.length).toBeGreaterThanOrEqual(1);
    expect(openLinks[0].getAttribute("href")).toBe(
      "https://www.workwaise.app/home"
    );
  });

  it("shows Stance (not stance-ai) in tab label and built view", () => {
    render(<CodeSection />);
    expect(screen.getByText(/Stance\.md/)).toBeDefined();
    expect(screen.queryByText(/stance-ai\.md/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Run build — show built view/i }));
    expect(screen.getByRole("link", { name: /Open Stance.*in new tab/i })).toBeDefined();
  });

  it("Run button switches to built view with 4 cards; Back to source code returns to IDE", () => {
    render(<CodeSection />);

    expect(screen.getByRole("button", { name: /Run build/i })).toBeDefined();

    fireEvent.click(screen.getByRole("button", { name: /Run build — show built view/i }));

    expect(screen.getByRole("button", { name: /Back to source code/i })).toBeDefined();
    const projectLinks = screen.getAllByRole("link", { name: /Open .* in new tab/i });
    expect(projectLinks.length).toBe(4);
    // Order: workwAIse, CV Website, Stance, Portfolio (4th)
    expect(projectLinks[0].getAttribute("href")).toBe("https://www.workwaise.app/home");
    expect(projectLinks[3].getAttribute("href")).toBe("https://alexb-ai.vercel.app");

    fireEvent.click(screen.getByRole("button", { name: /Back to source code/i }));

    expect(screen.getByRole("button", { name: /Run build/i })).toBeDefined();
    expect(screen.queryByText(/Built — hobby projects/)).toBeNull();
  });
});
