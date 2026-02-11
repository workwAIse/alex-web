"use client";

import type { ReactNode } from "react";
import Footer from "./Footer";

/**
 * StickyFooterReveal — wrapper for the "page lifts to reveal footer" effect (Dataleap.ai style).
 *
 * Structure:
 * 1. Main content: has large rounded bottom corners and sits above the footer (z-10).
 *    As the user scrolls, this block moves up naturally.
 * 2. Spacer: reserves space in the document flow (min-height in vh so we avoid
 *    hard-coding footer height). This is the "scroll run" that reveals the footer.
 * 3. Fixed footer: position fixed at bottom, z-0 (behind main). Stays in view
 *    while the main content scrolls up, so the page appears to lift away and
 *    reveal the footer below.
 *
 * No JavaScript required for the reveal; it's all CSS (sticky/fixed + stacking order).
 * Corner radius uses a CSS variable so you can tweak it in globals.css.
 */

const CORNER_RADIUS = "var(--footer-reveal-radius, clamp(1.5rem, 5vw, 3rem))";

interface StickyFooterRevealProps {
  children: ReactNode;
}

export default function StickyFooterReveal({ children }: StickyFooterRevealProps) {
  return (
    <>
      {/* Main content: rounded bottom corners (overflow hidden so inner sections are clipped to the curve) */}
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

      {/* Spacer: creates scrollable space so the main content can scroll up.
          min-height in vh keeps it responsive and avoids hard-coded footer height. */}
      <div
        className="relative z-0 w-full"
        style={{ minHeight: "60vh" }}
        aria-hidden
      />

      {/* Fixed footer: pinned to viewport bottom, behind main (z-0).
          min-height in vh so content can grow and layout adapts to screen size. */}
      <div
        className="fixed bottom-0 left-0 right-0 z-0 w-full"
        style={{ minHeight: "60vh" }}
      >
        <Footer />
      </div>
    </>
  );
}
