"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export interface TypewriterProps {
  words: string[];
  speed?: number;
  delayBetweenWords?: number;
  cursor?: boolean;
  cursorChar?: string;
  /** Rendered between the typed text and the cursor (e.g. an icon so the pipe appears after it). */
  trailingContent?: ReactNode;
  onWordChange?: (index: number) => void;
  /** Called when the current phrase has been fully typed (before the pause before deleting). */
  onPhraseComplete?: (index: number) => void;
}

export function Typewriter({
  words,
  speed = 100,
  delayBetweenWords = 2000,
  cursor = true,
  cursorChar = "|",
  trailingContent,
  onWordChange,
  onPhraseComplete,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const currentWord = words[wordIndex] ?? words[0] ?? "";

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < currentWord.length) {
            const nextCharIndex = charIndex + 1;
            setDisplayText(currentWord.substring(0, nextCharIndex));
            setCharIndex(nextCharIndex);
            if (nextCharIndex === currentWord.length) {
              onPhraseComplete?.(wordIndex);
            }
          } else {
            setTimeout(() => {
              setIsDeleting(true);
            }, delayBetweenWords);
          }
        } else {
          if (charIndex > 0) {
            setDisplayText(currentWord.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    currentWord,
    isDeleting,
    speed,
    delayBetweenWords,
    wordIndex,
    words.length,
  ]);

  useEffect(() => {
    onWordChange?.(wordIndex);
  }, [wordIndex, onWordChange]);

  useEffect(() => {
    if (!cursor) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <div className="inline-block">
      <span>
        {displayText}
        {trailingContent}
        {cursor && (
          <span
            className="ml-1 transition-opacity duration-75"
            style={{ opacity: showCursor ? 1 : 0 }}
          >
            {cursorChar}
          </span>
        )}
      </span>
    </div>
  );
}
