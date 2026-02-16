"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = "(max-width: 768px)";

/**
 * Returns true when viewport width is <= 768px (mobile).
 * SSR-safe: returns false until mounted to avoid hydration mismatch.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BREAKPOINT);
    const handler = () => setIsMobile(mql.matches);
    handler(); // set initial value
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
