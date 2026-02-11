import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Home } from "lucide-react";

vi.mock("lottie-react", () => ({ default: () => null }));

import { CircleMenu } from "./circle-menu";

describe("CircleMenu", () => {
  const minimalItems = [
    { label: "Home", icon: <Home size={16} />, href: "/" },
  ];

  it("renders the menu container", () => {
    const { container } = render(<CircleMenu items={minimalItems} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeDefined();
    expect(wrapper.tagName).toBe("DIV");
  });

  it("renders with multiple items", () => {
    const items = [
      { label: "Home", icon: <Home size={16} />, href: "/" },
      { label: "About", icon: <Home size={16} />, href: "/about" },
    ];
    render(<CircleMenu items={items} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders item links with correct href", () => {
    render(<CircleMenu items={minimalItems} />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((el) => el.getAttribute("href") === "/");
    expect(homeLink).toBeDefined();
    expect(homeLink?.getAttribute("href")).toBe("/");
  });
});
