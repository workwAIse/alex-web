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

  it("renders craft message and key phrases", () => {
    render(<Footer />);
    expect(screen.getByText(/Happy that you came this far/i)).toBeDefined();
    expect(screen.getByText(/craft of digital products/i)).toBeDefined();
    expect(screen.getByText(/Shipping value fast/i)).toBeDefined();
  });

  it("renders Get in contact and LinkedIn link", () => {
    render(<Footer />);
    expect(screen.getByText("Get in contact")).toBeDefined();
    const linkedInLink = screen.getByRole("link", { name: /Alex Büchel on LinkedIn/i });
    expect(linkedInLink).toBeDefined();
    expect(linkedInLink.getAttribute("href")).toMatch(/linkedin\.com/);
    expect(linkedInLink.getAttribute("target")).toBe("_blank");
  });

  it("renders dachshund image and funny footer message", () => {
    render(<Footer />);
    const img = screen.getByRole("img", { name: /Dachshund enjoying a meal/i });
    expect(img).toBeDefined();
    expect(screen.getByText(/Leave me alone with my footer/i)).toBeDefined();
  });

  it("renders copyright and legal links (Impressum, Datenschutz, Haftungsausschluss) on the right", () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeDefined();
    const impressumLink = screen.getByRole("link", { name: /Impressum/i });
    expect(impressumLink).toBeDefined();
    expect(impressumLink.getAttribute("href")).toBe("/impressum");
    const datenschutzLink = screen.getByRole("link", {
      name: /Datenschutzerklärung/i,
    });
    expect(datenschutzLink).toBeDefined();
    expect(datenschutzLink.getAttribute("href")).toBe("/datenschutz");
    const haftungLink = screen.getByRole("link", {
      name: /Haftungsausschluss/i,
    });
    expect(haftungLink).toBeDefined();
    expect(haftungLink.getAttribute("href")).toBe("/haftungsausschluss");
  });

  it("renders current year in copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeDefined();
  });
});
