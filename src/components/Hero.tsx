"use client";

import { useEffect, useState } from "react";
import { Mouse } from "lucide-react";
import UnicornScene from "unicornstudio-react/next";
import Header from "@/components/Header";

const UNICORN_PROJECT_ID = "i9BQoAQqkzcqJPHn60gG";
const UNICORN_SDK_URL =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.5/dist/unicornStudio.umd.js";

const ROTATE_INTERVAL_MS = 5000;

export default function Hero() {
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setShowScrollDown((prev) => !prev);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
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
