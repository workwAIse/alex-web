"use client";

import Image from "next/image";

/**
 * Gems section — Gemini (gemini.google.com) UI match.
 * Colors: main bg #f1f3f4 (Gemini light), text #202124 / #5f6368, surfaces #fff / #e8eaed, border #dadce0.
 * Typography: Roboto (Google-style sans). Uses official Gemini sparkle icon.
 */

const GEMINI_SPARKLE_URL =
  "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg";

const GEM_CHIPS = ["Gem 1", "Gem 2", "Gem 3", "Gem 4"];

export default function GemsSection() {
  return (
    <section
      id="gems"
      className="relative w-full py-16 px-6 md:py-24 md:px-8"
      style={{
        backgroundColor: "#f1f3f4",
        color: "#202124",
        fontFamily: "var(--font-roboto), Roboto, sans-serif",
      }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header: official Gemini sparkle + greeting (Gemini zero-state style) */}
        <header className="flex flex-col items-center text-center">
          <Image
            src={GEMINI_SPARKLE_URL}
            alt=""
            width={32}
            height={32}
            className="mb-3 shrink-0"
            aria-hidden
            unoptimized
          />
          <h2 className="sr-only">Gems</h2>
          <p
            className="text-base font-normal"
            style={{ color: "#202124" }}
          >
            Hi there
          </p>
          <p
            className="mt-1 text-[28px] font-bold leading-tight tracking-tight md:text-[32px]"
            style={{ color: "#202124" }}
          >
            Where should we start?
          </p>
        </header>

        {/* Prompt card — pure white, barely visible border (Gemini input area) */}
        <div
          className="mt-10 rounded-[28px] border px-5 py-4 shadow-sm"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#dadce0",
          }}
          role="presentation"
        >
          <p
            className="text-base"
            style={{ color: "#5f6368" }}
          >
            Enter a prompt for Gemini
          </p>
          <div
            className="mt-3 flex items-center justify-between gap-2 text-sm"
            style={{ color: "#5f6368" }}
          >
            <span className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              Tools
            </span>
            <span className="flex items-center gap-2">
              Thinking
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M7 10l5 5 5-5z" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              </svg>
            </span>
          </div>
        </div>

        {/* Suggestion chips — very light grey bg, subtle border (Write / Plan / Research / Learn style) */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {GEM_CHIPS.map((label, i) => (
            <button
              key={i}
              type="button"
              className="rounded-xl border px-4 py-3 text-left text-base font-normal transition-colors hover:bg-[#dadce0]/50"
              style={{
                backgroundColor: "#e8eaed",
                borderColor: "#dadce0",
                color: "#202124",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <p
          className="mt-10 text-center text-xs"
          style={{ color: "#5f6368" }}
        >
          Private highlights. Replace with your own gems.
        </p>
      </div>
    </section>
  );
}
