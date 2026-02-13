"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Mouse } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import UnicornScene from "unicornstudio-react/next";
import Header from "@/components/Header";

const UNICORN_PROJECT_ID = "i9BQoAQqkzcqJPHn60gG";
const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

const ROTATE_INTERVAL_MS = 5000;
const ZOOM_DURATION_S = 1.2;
const ZOOM_FADE_DURATION_S = 0.2;
const LAPTOP_FINAL_SCALE = 2.5;
/** Threshold for triggering the zoom when scrolling down (near top of page). */
const HERO_SCROLL_TRIGGER_PX = 20;

const LAPTOP_IMAGE_SRC = "/Laptop (1).png";

type ZoomPhase = "idle" | "zooming" | "zoomed";

export default function Hero() {
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [zoomPhase, setZoomPhase] = useState<ZoomPhase>("idle");
  const autoScrollingRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      setShowScrollDown((prev) => !prev);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (zoomPhase === "zoomed") return;

    const handleWheel = (e: WheelEvent) => {
      // During the zoom animation, block all scroll
      if (zoomPhase === "zooming") {
        e.preventDefault();
        return;
      }
      // In idle: only intercept scroll-down at the top to start the zoom
      if (typeof window !== "undefined") {
        const atTop = window.scrollY <= HERO_SCROLL_TRIGGER_PX;
        const scrollingDown = e.deltaY > 0;
        if (atTop && scrollingDown) {
          e.preventDefault();
          setZoomPhase("zooming");
        }
        // Scroll-up and other scroll events pass through normally
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [zoomPhase]);

  /* Reset to idle (remove laptop overlay) when user scrolls back to the hero.
     Skip while the programmatic auto-scroll to projects is still running. */
  useEffect(() => {
    if (zoomPhase !== "zoomed") return;

    const handleScroll = () => {
      if (autoScrollingRef.current) return;
      // Reset as soon as ~half the hero section comes back into view
      if (window.scrollY <= window.innerHeight * 0.5) {
        setZoomPhase("idle");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [zoomPhase]);

  const handleZoomComplete = useCallback(() => {
    setZoomPhase("zoomed");
    autoScrollingRef.current = true;

    // Smooth-scroll to the projects section with a longer, custom-eased animation
    const nextSection = document.getElementById("projects");
    if (!nextSection) {
      autoScrollingRef.current = false;
      return;
    }

    const start = window.scrollY;
    const end = nextSection.getBoundingClientRect().top + start;
    const distance = end - start;
    const duration = 800; // ms
    let startTime: number | null = null;

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * easeInOutCubic(progress));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        autoScrollingRef.current = false;
      }
    }

    requestAnimationFrame(step);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <Header />
      <div className="absolute inset-0 h-full w-full">
        <UnicornScene
          projectId={UNICORN_PROJECT_ID}
          sdkUrl={UNICORN_SDK_URL}
          width="100%"
          height="100%"
          lazyLoad={true}
          production={true}
          scale={0.8}
          placeholderClassName="bg-zinc-950 animate-pulse"
          className="absolute inset-0 h-full w-full"
          altText="Interactive hero background"
          ariaLabel="WebGL hero scene"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"
        aria-hidden
      />

      {/* Laptop zoom overlay: full viewport, black bg, image scales from fit to laptop-only */}
      {zoomPhase !== "idle" && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: ZOOM_FADE_DURATION_S, ease: "easeOut" }}
          aria-hidden
        >
          <motion.div
            className="flex h-full w-full items-center justify-center overflow-hidden"
            initial={{ scale: 1 }}
            animate={{ scale: LAPTOP_FINAL_SCALE }}
            transition={{
              duration: ZOOM_DURATION_S,
              ease: "easeOut",
              delay: ZOOM_FADE_DURATION_S,
            }}
            onAnimationComplete={handleZoomComplete}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={LAPTOP_IMAGE_SRC}
              alt=""
              width={1920}
              height={1080}
              className="h-full w-full object-contain"
              priority
              unoptimized
            />
          </motion.div>
        </motion.div>
      )}

      <div
        className="absolute bottom-[74px] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/90"
        aria-hidden
      >
        {showScrollDown ? (
          <>
            <Mouse
              className="h-6 w-6 animate-scroll-down"
              strokeWidth={2}
              aria-hidden
            />
            <span className="text-sm font-medium tracking-wide">Scroll down</span>
          </>
        ) : (
          <>
            <Mouse
              className="h-6 w-6 animate-wave"
              strokeWidth={2}
              aria-hidden
            />
            <span className="text-sm font-medium tracking-wide">Rub me</span>
          </>
        )}
      </div>
    </section>
  );
}
