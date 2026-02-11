"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { useCallback, useEffect, useRef, useState } from "react";

const SECTION_IDS = ["projects", "skills", "code", "gems"] as const;
type SectionId = (typeof SECTION_IDS)[number];

/** When over the AI logo trigger we show the AI Searching Lottie cursor. */
const AI_LOGO_CURSOR_AREA = "ai-logo";
/** When over the nav menu we show the default cursor (no custom cursor). */
const NAV_CURSOR_AREA = "nav";

const SECTION_ICONS: Record<SectionId, string> = {
  projects: "/openai-icon.webp",
  skills: "/claude-ai-icon.webp",
  code: "/cursor-icon.png",
  gems: "/google-gemini-icon.webp",
};

export type CursorContext = SectionId | typeof AI_LOGO_CURSOR_AREA;

function isOverAILogo(element: Element): boolean {
  let el: Element | null = element;
  while (el) {
    if (el.getAttribute?.("data-cursor-area") === AI_LOGO_CURSOR_AREA) return true;
    el = el.parentElement;
  }
  return false;
}

function isOverNav(element: Element): boolean {
  let el: Element | null = element;
  while (el) {
    if (el.getAttribute?.("data-cursor-area") === NAV_CURSOR_AREA) return true;
    el = el.parentElement;
  }
  return false;
}

function getSectionIdFromElement(element: Element | null): SectionId | null {
  let el: Element | null = element;
  while (el) {
    if (el.id && SECTION_IDS.includes(el.id as SectionId)) {
      return el.id as SectionId;
    }
    el = el.parentElement;
  }
  return null;
}

function getCursorContextFromPoint(clientX: number, clientY: number): CursorContext | null {
  if (typeof document === "undefined") return null;
  const elements = document.elementsFromPoint(clientX, clientY);
  // Check AI logo first: the trigger is inside the nav, so we must prefer ai-logo over nav
  for (const el of elements) {
    if (isOverAILogo(el)) return AI_LOGO_CURSOR_AREA;
  }
  for (const el of elements) {
    if (isOverNav(el)) return null;
  }
  for (const el of elements) {
    const section = getSectionIdFromElement(el);
    if (section) return section;
  }
  return null;
}

function shouldDisableCustomCursor(): boolean {
  if (typeof window === "undefined") return true;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  return prefersReducedMotion || coarsePointer;
}

const CURSOR_SIZE = 28;
/** AI logo cursor is larger and more visible than section icons. */
const AI_LOGO_CURSOR_SIZE = 88;

function aiLogoCursorLottieUrl(): string {
  const filename = "AI Searching.json";
  return "/" + encodeURIComponent(filename);
}

export default function SectionCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorContext, setCursorContext] = useState<CursorContext | null>(null);
  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [aiLogoCursorData, setAiLogoCursorData] = useState<object | null>(null);
  const aiLogoLottieRef = useRef<import("lottie-react").LottieRefCurrentProps | null>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const contextRef = useRef<CursorContext | null>(null);

  useEffect(() => {
    fetch(aiLogoCursorLottieUrl())
      .then((r) => r.json())
      .then(setAiLogoCursorData)
      .catch(() => setAiLogoCursorData(null));
  }, []);

  const handleAiLogoCursorLoaded = useCallback(() => {
    aiLogoLottieRef.current?.setSpeed(1.25);
  }, []);

  const updateFromPoint = useCallback((clientX: number, clientY: number) => {
    const context = getCursorContextFromPoint(clientX, clientY);
    contextRef.current = context;
    setCursorContext(context);
  }, []);

  useEffect(() => {
    const value = shouldDisableCustomCursor();
    const id = setTimeout(() => setDisabled(value), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (disabled) return;

    const handleMove = (e: MouseEvent) => {
      setActive(true);
      posRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          setPosition(posRef.current);
          updateFromPoint(posRef.current.x, posRef.current.y);
        });
      }
    };

    const handleLeave = () => {
      setActive(false);
      setCursorContext(null);
      contextRef.current = null;
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [disabled, updateFromPoint]);

  useEffect(() => {
    if (disabled || !active || cursorContext === null) {
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
      return;
    }
    document.body.style.cursor = "none";
    document.documentElement.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
      document.documentElement.style.cursor = "";
    };
  }, [disabled, active, cursorContext]);

  if (disabled || !active || cursorContext === null) {
    return null;
  }

  const isAiLogo = cursorContext === AI_LOGO_CURSOR_AREA;
  const size = isAiLogo ? AI_LOGO_CURSOR_SIZE : CURSOR_SIZE;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9999] select-none"
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        transform: `translate(-${size / 2}px, -${size / 2}px)`,
      }}
    >
      {isAiLogo && aiLogoCursorData ? (
        <div
          className="h-full w-full"
          style={{
            filter:
              "drop-shadow(0 0 12px rgba(52, 211, 213, 0.75)) drop-shadow(0 0 4px rgba(34, 211, 238, 0.5))",
          }}
        >
          <Lottie
            lottieRef={aiLogoLottieRef}
            animationData={aiLogoCursorData}
            loop
            onDOMLoaded={handleAiLogoCursorLoaded}
            style={{ width: AI_LOGO_CURSOR_SIZE, height: AI_LOGO_CURSOR_SIZE }}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </div>
      ) : !isAiLogo ? (
        <Image
          src={SECTION_ICONS[cursorContext]}
          alt=""
          width={CURSOR_SIZE}
          height={CURSOR_SIZE}
          className="h-full w-full object-contain"
          draggable={false}
          unoptimized
        />
      ) : null}
    </div>
  );
}

export {
  SECTION_IDS,
  SECTION_ICONS,
  getSectionIdFromElement,
  getCursorContextFromPoint,
  isOverAILogo,
  AI_LOGO_CURSOR_AREA,
};
