"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import UnicornScene from "unicornstudio-react/next";

const UNICORN_PROJECT_ID = "i9BQoAQqkzcqJPHn60gG";
const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

const LABELS = ["Alex Buechel", "Senior PM"];
const FLIP_INTERVAL_MS = 4500;
const SLOT_COUNT = 12; // max length; shorter label is padded with spaces

const LETTER_STYLE =
  "text-[clamp(2.25rem,6vw,3.75rem)] uppercase leading-none text-zinc-100/90";
const TEXT_SHADOW =
  "0 0 40px rgba(255,255,255,0.06), 0 1px 2px rgba(0,0,0,0.2)";
const FLIP_DURATION = 0.35;

/** Pad string to SLOT_COUNT with spaces (for consistent slot count). */
function padToSlots(s: string): string {
  const chars = s.split("");
  while (chars.length < SLOT_COUNT) chars.push(" ");
  return chars.slice(0, SLOT_COUNT).join("");
}

const LABELS_PADDED = LABELS.map(padToSlots);

/** Single letter flip slot: top half flips away, bottom half flips in (split-flap style). */
function FlipSlot({
  char,
  delay = 0,
  style: fontStyle,
}: {
  char: string;
  delay?: number;
  style: string;
}) {
  const [displayChar, setDisplayChar] = useState(char);
  const [nextChar, setNextChar] = useState(char);
  const [isFlipping, setIsFlipping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (char === displayChar && !isFlipping) return;
    if (isFlipping) return;
    setNextChar(char);
    setIsFlipping(true);
    timeoutRef.current = setTimeout(() => {
      setDisplayChar(char);
      setIsFlipping(false);
    }, FLIP_DURATION * 1000 + 50);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [char, displayChar, isFlipping]);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        height: "clamp(2.5rem, 6.5vw, 4rem)",
        perspective: "400px",
      }}
    >
      {/* Top half: current char, flips up (rotateX -90) */}
      <div
        className="flex flex-1 items-end justify-center overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.span
          className={`${fontStyle} flex items-end justify-center`}
          style={{
            textShadow: TEXT_SHADOW,
            transformOrigin: "bottom",
          }}
          animate={{ rotateX: isFlipping ? -90 : 0 }}
          transition={{
            duration: isFlipping ? FLIP_DURATION : 0,
            delay: isFlipping ? delay / 1000 : 0,
            ease: "easeIn",
          }}
        >
          {displayChar}
        </motion.span>
      </div>
      <div className="h-px shrink-0 bg-zinc-600/40" aria-hidden />
      {/* Bottom half: next char, flips from 90 to 0 */}
      <div
        className="flex flex-1 items-start justify-center overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.span
          className={`${fontStyle} flex items-start justify-center`}
          style={{
            textShadow: TEXT_SHADOW,
            transformOrigin: "top",
          }}
          initial={false}
          animate={{ rotateX: isFlipping ? 0 : 90 }}
          transition={{
            duration: isFlipping ? FLIP_DURATION : 0,
            delay: isFlipping ? delay / 1000 : 0,
            ease: "easeOut",
          }}
        >
          {nextChar}
        </motion.span>
      </div>
    </div>
  );
}

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

      {/* Per-letter flip clock */}
      <div
        className="absolute left-6 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-0 select-none sm:left-10"
        style={{ fontFamily: "var(--font-archivo), sans-serif" }}
        aria-live="polite"
        aria-atomic
        aria-label={activeLabel}
      >
        {chars.map((_, i) => (
          <FlipSlot
            key={i}
            char={chars[i]}
            delay={i * 35}
            style={`${LETTER_STYLE} font-semibold`}
          />
        ))}
      </div>
    </section>
  );
}
