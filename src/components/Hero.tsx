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

/** Total zoom + white-blend duration. */
const ZOOM_TOTAL_S = 1.6;
/** Initial fade-in of the laptop overlay (black bg appears). */
const OVERLAY_FADE_IN_S = 0.2;
/** The white starts fading in this many seconds into the zoom. */
const WHITE_STARTS_AT_S = 0.8;
/** White fade-in duration (overlaps with the tail end of the zoom). */
const WHITE_FADE_IN_S = ZOOM_TOTAL_S - WHITE_STARTS_AT_S; // 0.8s
/** How long the whole overlay takes to fade out, revealing the section. */
const OVERLAY_FADE_OUT_S = 0.25;
/** Scale range — goes further than before so zoom continues during the white blend. */
const LAPTOP_FINAL_SCALE = 3.2;
/** Threshold for triggering the zoom when scrolling down (near top of page). */
const HERO_SCROLL_TRIGGER_PX = 20;

const LAPTOP_IMAGE_SRC = "/Laptop (1).png";

/**
 * idle     → user scrolls down → zooming
 * zooming  → zoom + white blend complete → revealing (instant jump + fade-out)
 * revealing → overlay faded out → done
 * done     → user scrolls back up → idle
 */
type ZoomPhase = "idle" | "zooming" | "revealing" | "done";

export default function Hero() {
  const [showScrollDown, setShowScrollDown] = useState(true);
  const [zoomPhase, setZoomPhase] = useState<ZoomPhase>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setShowScrollDown((prev) => !prev);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  /* Block scroll during the animation sequence. */
  useEffect(() => {
    if (zoomPhase !== "zooming" && zoomPhase !== "revealing") return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [zoomPhase]);

  /* In idle: intercept scroll-down at the top to start the zoom. */
  useEffect(() => {
    if (zoomPhase !== "idle") return;

    const handleWheel = (e: WheelEvent) => {
      if (typeof window !== "undefined") {
        const atTop = window.scrollY <= HERO_SCROLL_TRIGGER_PX;
        const scrollingDown = e.deltaY > 0;
        if (atTop && scrollingDown) {
          e.preventDefault();
          setZoomPhase("zooming");
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [zoomPhase]);

  /* Reset to idle when user scrolls back into the hero area. */
  useEffect(() => {
    if (zoomPhase !== "done") return;

    const handleScroll = () => {
      if (window.scrollY <= window.innerHeight * 0.5) {
        setZoomPhase("idle");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [zoomPhase]);

  /**
   * White blend finished → instant-jump to projects, then start fade-out.
   * The white overlay is fully opaque at this point so the jump is invisible.
   */
  const handleWhiteComplete = useCallback(() => {
    if (zoomPhase !== "zooming") return;
    const nextSection = document.getElementById("projects");
    if (nextSection) {
      const top = nextSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top);
    }
    setZoomPhase("revealing");
  }, [zoomPhase]);

  /** Overlay fade-out complete → done, overlay unmounts. */
  const handleRevealComplete = useCallback(() => {
    setZoomPhase("done");
  }, []);

  const isAnimating = zoomPhase === "zooming" || zoomPhase === "revealing";

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

      {/* Full-screen overlay: laptop zoom + white blend + fade-out reveal */}
      {isAnimating && (
        <motion.div
          ref={overlayRef}
          className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: zoomPhase === "revealing" ? 0 : 1 }}
          transition={{
            duration:
              zoomPhase === "revealing" ? OVERLAY_FADE_OUT_S : OVERLAY_FADE_IN_S,
            ease: "easeOut",
          }}
          onAnimationComplete={
            zoomPhase === "revealing" ? handleRevealComplete : undefined
          }
          aria-hidden
        >
          {/* Laptop image — zooms continuously for the full duration */}
          <motion.div
            className="flex h-full w-full items-center justify-center overflow-hidden"
            initial={{ scale: 1 }}
            animate={{ scale: LAPTOP_FINAL_SCALE }}
            transition={{
              duration: ZOOM_TOTAL_S,
              ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth deceleration
              delay: OVERLAY_FADE_IN_S,
            }}
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

          {/*
            White overlay — starts fading in partway through the zoom so
            the zoom-to-white feels like one continuous motion.
            Its onAnimationComplete fires the jump + reveal.
          */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: zoomPhase === "zooming" ? 1 : 1 }}
            transition={{
              duration: WHITE_FADE_IN_S,
              ease: "easeIn",
              delay: zoomPhase === "zooming" ? WHITE_STARTS_AT_S + OVERLAY_FADE_IN_S : 0,
            }}
            onAnimationComplete={handleWhiteComplete}
          />
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
