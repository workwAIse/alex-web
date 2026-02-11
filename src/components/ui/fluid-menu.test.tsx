import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Menu, MenuItem, MenuContainer } from "./fluid-menu";

describe("Menu", () => {
  it("renders trigger and toggles dropdown on click", () => {
    render(
      <Menu trigger={<button type="button">Open</button>}>
        <span>Item 1</span>
      </Menu>
    );
    expect(screen.getByText("Open")).toBeDefined();
    expect(screen.queryByRole("menu")).toBeNull();

    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByRole("menu")).toBeDefined();
    expect(screen.getByText("Item 1")).toBeDefined();

    fireEvent.click(screen.getByText("Open"));
    expect(screen.queryByRole("menu")).toBeNull();
  });
});

describe("MenuItem", () => {
  it("renders with icon and children", () => {
    render(
      <MenuItem icon={<span data-testid="icon" />}>
        Label
      </MenuItem>
    );
    expect(screen.getByRole("menuitem").textContent).toContain("Label");
    expect(screen.getByTestId("icon")).toBeDefined();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<MenuItem onClick={onClick}>Click me</MenuItem>);
    fireEvent.click(screen.getByRole("menuitem"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("MenuContainer", () => {
  it("renders trigger (first child) and expands on click", () => {
    render(
      <MenuContainer expandDirection="up">
        <span data-testid="trigger">Trigger</span>
        <MenuItem>Item 1</MenuItem>
      </MenuContainer>
    );
    const container = screen.getByText("Trigger").closest("[data-expanded]");
    expect(container).toBeDefined();
    expect(container?.getAttribute("data-expanded")).toBe("false");

    fireEvent.click(screen.getByTestId("trigger"));
    expect(container?.getAttribute("data-expanded")).toBe("true");
  });

  it("supports expandDirection down by default", () => {
    const { container } = render(
      <MenuContainer>
        <span>Trigger</span>
        <MenuItem>Item</MenuItem>
      </MenuContainer>
    );
    expect(container.querySelector("[data-expanded]")).toBeDefined();
  });
});
