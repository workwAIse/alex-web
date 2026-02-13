import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Header from "./Header";

vi.mock("@/lib/logo", () => ({
  getLogoUrl: (domain: string, size: number) =>
    `https://img.logo.dev/${domain}?size=${size}`,
}));

vi.mock("next/image", () => ({
  default: function MockImage({
    src,
    alt,
  }: {
    src: string;
    alt: string;
  }) {
    return <img src={src} alt={alt} data-testid="header-logo" />;
  },
}));

describe("Header", () => {
  it("renders Alex Büchel · Senior PM text", () => {
    render(<Header />);
    expect(screen.getByText(/Alex Büchel · Senior PM/)).toBeDefined();
  });

  it("renders three company logos", () => {
    render(<Header />);
    const logos = screen.getAllByTestId("header-logo");
    expect(logos).toHaveLength(3);
  });

  it("has accessible banner role", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeDefined();
  });
});
