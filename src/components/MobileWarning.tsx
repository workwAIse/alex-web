"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const MOBILE_BREAKPOINT = 768;

export default function MobileWarning() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile =
      window.innerWidth < MOBILE_BREAKPOINT ||
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );

    if (isMobile) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-warning-title"
    >
      <div className="mx-4 flex max-w-sm flex-col items-center rounded-2xl bg-white px-6 pb-6 pt-8 text-center shadow-2xl">
        <Image
          src="/no-mobile.png"
          alt="Sad phone illustration"
          width={180}
          height={180}
          className="mb-4"
          priority
          unoptimized
        />

        <h2
          id="mobile-warning-title"
          className="mb-2 text-lg font-semibold text-gray-900"
        >
          Not optimized for mobile
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-gray-500">
          This site is built for desktop screens. You can still browse, but the
          experience may not be ideal.
        </p>

        <button
          type="button"
          onClick={() => setVisible(false)}
          className="w-full rounded-xl bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
        >
          Got it, continue anyway
        </button>
      </div>
    </div>
  );
}
