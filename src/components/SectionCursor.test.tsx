import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

vi.mock("lottie-react", () => ({ default: () => React.createElement("div", { "data-testid": "lottie-cursor" }) }));

import SectionCursor, {
  getSectionIdFromElement,
  getCursorContextFromPoint,
  isOverAILogo,
  SECTION_ICONS,
  AI_LOGO_CURSOR_AREA,
} from "./SectionCursor";

describe("getSectionIdFromElement", () => {
  it("returns section id when element has that id", () => {
    const el = document.createElement("div");
    el.id = "code";
    expect(getSectionIdFromElement(el)).toBe("code");
  });

  it("returns section id when ancestor has that id", () => {
    const section = document.createElement("section");
    section.id = "gems";
    const child = document.createElement("div");
    section.appendChild(child);
    expect(getSectionIdFromElement(child)).toBe("gems");
  });

  it("returns null when element and ancestors have no section id", () => {
    const el = document.createElement("div");
    expect(getSectionIdFromElement(el)).toBeNull();
  });

  it("returns null for null element", () => {
    expect(getSectionIdFromElement(null)).toBeNull();
  });
});

describe("isOverAILogo", () => {
  it("returns true when element has data-cursor-area=ai-logo", () => {
    const el = document.createElement("div");
    el.setAttribute("data-cursor-area", AI_LOGO_CURSOR_AREA);
    expect(isOverAILogo(el)).toBe(true);
  });

  it("returns true when ancestor has data-cursor-area=ai-logo", () => {
    const parent = document.createElement("div");
    parent.setAttribute("data-cursor-area", AI_LOGO_CURSOR_AREA);
    const child = document.createElement("span");
    parent.appendChild(child);
    expect(isOverAILogo(child)).toBe(true);
  });

  it("returns false when no element has data-cursor-area=ai-logo", () => {
    const el = document.createElement("div");
    expect(isOverAILogo(el)).toBe(false);
  });
});

describe("getCursorContextFromPoint", () => {
  beforeEach(() => {
    if (typeof document.elementsFromPoint !== "function") {
      (document as Document & { elementsFromPoint: (x: number, y: number) => Element[] }).elementsFromPoint =
        vi.fn().mockReturnValue([]);
    }
  });

  it("returns ai-logo when pointer is over AI logo trigger", () => {
    const trigger = document.createElement("div");
    trigger.setAttribute("data-cursor-area", AI_LOGO_CURSOR_AREA);
    document.body.appendChild(trigger);
    vi.mocked(document.elementsFromPoint).mockReturnValue([trigger]);

    expect(getCursorContextFromPoint(100, 100)).toBe(AI_LOGO_CURSOR_AREA);

    document.body.removeChild(trigger);
    vi.mocked(document.elementsFromPoint).mockReturnValue([]);
  });

  it("returns section id when pointer is over section (no AI logo in stack)", () => {
    const section = document.createElement("section");
    section.id = "code";
    document.body.appendChild(section);
    vi.mocked(document.elementsFromPoint).mockReturnValue([section]);

    expect(getCursorContextFromPoint(50, 50)).toBe("code");

    document.body.removeChild(section);
    vi.mocked(document.elementsFromPoint).mockReturnValue([]);
  });

  it("prefers ai-logo over section when both in stack", () => {
    const section = document.createElement("section");
    section.id = "code";
    const trigger = document.createElement("div");
    trigger.setAttribute("data-cursor-area", AI_LOGO_CURSOR_AREA);
    section.appendChild(trigger);
    document.body.appendChild(section);
    vi.mocked(document.elementsFromPoint).mockReturnValue([trigger, section]);

    expect(getCursorContextFromPoint(50, 50)).toBe(AI_LOGO_CURSOR_AREA);

    document.body.removeChild(section);
    vi.mocked(document.elementsFromPoint).mockReturnValue([]);
  });
});

describe("SectionCursor", () => {
  const mockMatchMedia = (matches = false) =>
    vi.fn().mockImplementation(() => ({ matches, addListener: vi.fn(), removeListener: vi.fn(), addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(), onchange: null }));

  beforeEach(() => {
    vi.stubGlobal("matchMedia", mockMatchMedia(false));
    if (typeof document.elementsFromPoint !== "function") {
      (document as Document & { elementsFromPoint: (x: number, y: number) => Element[] }).elementsFromPoint =
        vi.fn().mockReturnValue([]);
    }
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.style.cursor = "";
  });

  it("renders nothing when disabled (reduced motion)", () => {
    vi.stubGlobal("matchMedia", (query: string) => {
      return mockMatchMedia(query === "(prefers-reduced-motion: reduce)")();
    });
    const { container } = render(<SectionCursor />);
    expect(container.firstChild).toBeNull();
  });

  it("shows code section icon when pointer is over #code", async () => {
    const codeSection = document.createElement("section");
    codeSection.id = "code";
    document.body.appendChild(codeSection);

    const elementsFromPoint = vi.mocked(document.elementsFromPoint).mockReturnValue([codeSection]);

    const { container } = render(<SectionCursor />);

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    await act(async () => {
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 100, clientY: 200, bubbles: true })
      );
      await new Promise((resolve) => requestAnimationFrame(resolve));
    });

    await waitFor(() => {
      const img = container.querySelector("img");
      expect(img).toBeTruthy();
      expect(img?.getAttribute("src")).toContain("cursor-icon.png");
    });

    elementsFromPoint.mockReturnValue([]);
    document.body.removeChild(codeSection);
  });

  it("shows correct icon for each section id", async () => {
    const sectionIds = ["projects", "skills", "code", "gems"] as const;

    for (const id of sectionIds) {
      const section = document.createElement("section");
      section.id = id;
      document.body.appendChild(section);

      vi.mocked(document.elementsFromPoint).mockReturnValue([section]);

      const { container, unmount } = render(<SectionCursor />);
      await act(async () => {
        await new Promise((r) => setTimeout(r, 0));
      });
      await act(async () => {
        document.dispatchEvent(
          new MouseEvent("mousemove", { clientX: 50, clientY: 50, bubbles: true })
        );
        await new Promise((r) => requestAnimationFrame(r));
      });

      await waitFor(() => {
        const img = container.querySelector("img");
        expect(img).toBeTruthy();
        expect(img?.getAttribute("src")).toBe(SECTION_ICONS[id]);
      });

      unmount();
      document.body.removeChild(section);
      vi.mocked(document.elementsFromPoint).mockReturnValue([]);
    }
  });

  it("renders no cursor when pointer is not over a section", async () => {
    const div = document.createElement("div");
    div.id = "other";
    document.body.appendChild(div);

    vi.mocked(document.elementsFromPoint).mockReturnValue([div]);

    const { container } = render(<SectionCursor />);
    await act(async () => {
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 10, clientY: 10, bubbles: true })
      );
      await new Promise((r) => requestAnimationFrame(r));
    });

    await waitFor(() => {
      expect(container.querySelector("img")).toBeNull();
    });

    document.body.removeChild(div);
    vi.mocked(document.elementsFromPoint).mockReturnValue([]);
  });

  it("shows cursor overlay (no section img) when pointer is over AI logo", async () => {
    const aiLogoTrigger = document.createElement("div");
    aiLogoTrigger.setAttribute("data-cursor-area", AI_LOGO_CURSOR_AREA);
    document.body.appendChild(aiLogoTrigger);
    vi.mocked(document.elementsFromPoint).mockReturnValue([aiLogoTrigger]);

    const { container } = render(<SectionCursor />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    await act(async () => {
      document.dispatchEvent(
        new MouseEvent("mousemove", { clientX: 200, clientY: 200, bubbles: true })
      );
      await new Promise((r) => requestAnimationFrame(r));
    });

    await waitFor(() => {
      const cursorWrapper = container.querySelector(".fixed");
      expect(cursorWrapper).toBeTruthy();
      expect(container.querySelector("img")).toBeNull();
    });

    document.body.removeChild(aiLogoTrigger);
    vi.mocked(document.elementsFromPoint).mockReturnValue([]);
  });
});
