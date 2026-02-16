"use client";

import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import Footer from "./Footer";

/**
 * StickyFooterReveal — wrapper for the "page lifts to reveal footer" effect (Dataleap.ai style).
 *
 * Desktop: Main content (z-10) scrolls up over a fixed footer (z-0); spacer creates scroll run.
 * Mobile: Footer is in normal document flow so the full footer (including legal links) is scrollable.
 *
 * Corner radius uses a CSS variable so you can tweak it in globals.css.
 */

const CORNER_RADIUS = "var(--footer-reveal-radius, clamp(1.5rem, 5vw, 3rem))";

interface StickyFooterRevealProps {
  children: ReactNode;
}

export default function StickyFooterReveal({ children }: StickyFooterRevealProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <div
          data-testid="sticky-reveal-main"
          className="relative z-10 min-h-screen overflow-hidden bg-background"
          style={{
            borderBottomLeftRadius: CORNER_RADIUS,
            borderBottomRightRadius: CORNER_RADIUS,
            boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {children}
        </div>
        <div data-testid="footer-in-flow" className="relative z-0 w-full">
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <div
        data-testid="sticky-reveal-main"
        className="relative z-10 min-h-screen overflow-hidden bg-background"
        style={{
          borderBottomLeftRadius: CORNER_RADIUS,
          borderBottomRightRadius: CORNER_RADIUS,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {children}
      </div>

      <div
        className="relative z-0 w-full"
        style={{ minHeight: "60vh" }}
        aria-hidden
      />

      <div
        className="fixed bottom-0 left-0 right-0 z-0 w-full"
        style={{ minHeight: "60vh" }}
      >
        <Footer />
      </div>
    </>
  );
}
