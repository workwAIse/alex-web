"use client";

import { useState } from "react";
import Image from "next/image";
import UnicornScene from "unicornstudio-react/next";
import { Typewriter } from "@/components/ui/typewriter";

const UNICORN_PROJECT_ID = "i9BQoAQqkzcqJPHn60gG";
const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

const PHRASES = [
  "Hello, welcome",
  "I am Alex Büchel",
  "a Senior PM,",
  "crafting digital products ",
];

const HERO_FONT_FAMILY = "var(--font-lt-superior)";

const LAST_PHRASE_INDEX = PHRASES.length - 1; // 3

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [showLaptopIcon, setShowLaptopIcon] = useState(false);

  const handleWordChange = (index: number) => {
    setWordIndex(index);
    if (index !== LAST_PHRASE_INDEX) setShowLaptopIcon(false);
  };

  const handlePhraseComplete = (index: number) => {
    if (index === LAST_PHRASE_INDEX) setShowLaptopIcon(true);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
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

      <div
        className="absolute left-6 top-[224px] z-10 select-none sm:left-10 sm:top-[240px]"
        style={{ fontFamily: HERO_FONT_FAMILY, fontWeight: 700 }}
        aria-live="polite"
        aria-label={PHRASES.join(" ")}
      >
        <div
          className="flex flex-wrap items-center gap-2 text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-tight text-white"
          style={{ fontFamily: HERO_FONT_FAMILY, fontWeight: 700 }}
        >
          {wordIndex === 0 && (
            <Image
              src="/waving hand.svg"
              alt=""
              width={32}
              height={32}
              className="inline-block shrink-0 origin-[70%_70%] animate-wave"
              aria-hidden
            />
          )}
          <Typewriter
            words={PHRASES}
            speed={80}
            delayBetweenWords={2000}
            cursor={true}
            cursorChar="|"
            trailingContent={
              showLaptopIcon ? (
                <Image
                  src="/laptop_men.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="inline-block shrink-0"
                  aria-hidden
                />
              ) : null
            }
            onWordChange={handleWordChange}
            onPhraseComplete={handlePhraseComplete}
          />
        </div>
      </div>
    </section>
  );
}
