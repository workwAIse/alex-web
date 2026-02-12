"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import UnicornScene from "unicornstudio-react/next";

const UNICORN_PROJECT_ID = "i9BQoAQqkzcqJPHn60gG";
const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

const LABELS = ["Alex Buechel", "Senior PM"];
const FLIP_INTERVAL_MS = 4500;
const SLOT_COUNT = 12;
const FLIP_DURATION = 0.35;

const TEXT_SHADOW =
  "0 0 40px rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.2)";

/*
 * Slot sizing: 12 slots must fit ~80vh.
 * SLOT_H = height of one full slot = line-height of the letter.
 * Each half = SLOT_H / 2, clipped so only its half of the glyph shows.
 * Using CSS clamp so it scales between small and large screens.
 */
const SLOT_H = "clamp(2.4rem, 5.5vh, 3.6rem)";
const FONT_SIZE = "clamp(2rem, 5vh, 3.2rem)";

function padToSlots(s: string): string {
  return s.padEnd(SLOT_COUNT).slice(0, SLOT_COUNT);
}
const LABELS_PADDED = LABELS.map(padToSlots);

/* ------------------------------------------------------------------ */
/* Half renders one cropped half (top or bottom) of a single letter.  */
/* The letter is absolutely positioned inside a clipped container.     */
/* ------------------------------------------------------------------ */
function Half({
  char,
  half,
}: {
  char: string;
  half: "top" | "bottom";
}) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `calc(${SLOT_H} / 2)` }}
    >
      <span
        className="absolute left-1/2 -translate-x-1/2 whitespace-pre font-semibold uppercase text-zinc-100/90"
        style={{
          fontSize: FONT_SIZE,
          lineHeight: SLOT_H,
          height: SLOT_H,
          top: half === "top" ? "0" : `calc(-1 * ${SLOT_H} / 2)`,
          textShadow: TEXT_SHADOW,
        }}
      >
        {char}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FlipSlot: one character position in the split-flap display.        */
/* - Static layers:  new char top-half behind, old char bottom-half   */
/* - Flipping layers: old char top-half (flips away),                 */
/*                    new char bottom-half (flips in after delay)      */
/* ------------------------------------------------------------------ */
function FlipSlot({
  char,
  delay = 0,
}: {
  char: string;
  delay?: number;
}) {
  const [current, setCurrent] = useState(char);
  const [next, setNext] = useState(char);
  const [flipping, setFlipping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    if (char === current && !flipping) return;
    if (flipping) return;
    setNext(char);
    setFlipping(true);
    timer.current = setTimeout(() => {
      setCurrent(char);
      setFlipping(false);
    }, (FLIP_DURATION * 2 + 0.05) * 1000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [char, current, flipping]);

  const isSpace = current === " " && next === " ";

  return (
    <div
      className="relative"
      style={{
        width: "clamp(2rem, 5vh, 3rem)",
        height: SLOT_H,
        perspective: "300px",
      }}
    >
      {isSpace ? null : (
        <>
          {/* --- static layers (always visible) --- */}
          {/* New char top half (sits behind the flipping old top) */}
          <div className="absolute inset-x-0 top-0 z-0">
            <Half char={next} half="top" />
          </div>
          {/* Old char bottom half (sits behind the flipping new bottom) */}
          <div className="absolute inset-x-0 bottom-0 z-0">
            <Half char={current} half="bottom" />
          </div>

          {/* Separator line */}
          <div
            className="absolute inset-x-0 z-20 h-px bg-zinc-700/50"
            style={{ top: `calc(${SLOT_H} / 2)` }}
            aria-hidden
          />

          {/* --- flipping layers --- */}
          {/* Old char top half - flips away (rotateX to -90) */}
          <motion.div
            className="absolute inset-x-0 top-0 z-10"
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            animate={{ rotateX: flipping ? -90 : 0 }}
            transition={{
              duration: flipping ? FLIP_DURATION : 0,
              delay: flipping ? delay / 1000 : 0,
              ease: "easeIn",
            }}
          >
            <Half char={current} half="top" />
          </motion.div>

          {/* New char bottom half - flips in (from 90 to 0) */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            initial={false}
            animate={{ rotateX: flipping ? 0 : 90 }}
            transition={{
              duration: flipping ? FLIP_DURATION : 0,
              delay: flipping ? delay / 1000 + FLIP_DURATION : 0,
              ease: "easeOut",
            }}
          >
            <Half char={next} half="bottom" />
          </motion.div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % LABELS.length);
    }, FLIP_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const activeLabel = LABELS[activeIndex];
  const chars = LABELS_PADDED[activeIndex].split("");

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Unicorn Studio WebGL scene */}
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

      {/* Per-letter split-flap display */}
      <div
        className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center select-none sm:left-10"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        aria-live="polite"
        aria-atomic
        aria-label={activeLabel}
      >
        {chars.map((c, i) => (
          <FlipSlot key={i} char={c} delay={i * 40} />
        ))}
      </div>
    </section>
  );
}
