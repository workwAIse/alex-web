"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";

const LINKEDIN_URL =
  process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/in/alexander-b%C3%BCchel/";

/**
 * Footer — sticky reveal effect (Dataleap.ai style).
 * Two zones: left = craft message (Montserrat, same as header), right = dachshund + funny line. Bottom line: Get in contact + LinkedIn, copyright, Impressum.
 */
export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-0 flex min-h-[50vh] w-full flex-col justify-end px-6 py-12 md:min-h-[40vh] md:py-16"
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-fg)",
      }}
      aria-label="Site footer"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Main two-zone row: message | dachshund */}
        <div className="grid grid-cols-1 gap-10 pb-6 md:grid-cols-2 md:gap-8 md:pb-8">
          {/* Left: Craft message — Montserrat to match header */}
          <div className="flex flex-col justify-center md:pr-4">
            <p
              className="text-base leading-relaxed opacity-95 md:text-lg"
              style={{ fontFamily: "var(--font-montserrat, inherit)" }}
            >
              Happy that you came this far. By now you’ve probably learned — I love the craft of digital products. Shipping value fast matters most to me: delighting users, making complexity easy, and driving business metrics.
            </p>
          </div>

          {/* Right: Dachshund with "Leave me alone" at bottom of image */}
          <div className="flex flex-col items-center justify-center md:items-end md:pl-4">
            <div className="relative h-40 w-40 md:h-52 md:w-52">
              <Image
                src="/dachshund1.png"
                alt="Dachshund enjoying a meal"
                fill
                className="object-contain object-center"
                sizes="208px"
              />
              <p
                className="absolute bottom-0 left-0 right-0 text-center text-sm italic opacity-90 md:text-right"
                style={{
                  fontFamily: "var(--font-montserrat, inherit)",
                  textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                }}
              >
                Leave me alone with my footer.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Get in contact (left) | copyright + Impressum (right). Row 14px higher. */}
        <div className="-mt-[14px] flex flex-nowrap items-center justify-between gap-6 border-t border-white/10 pt-6">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-2 text-sm opacity-90 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[var(--footer-bg)]"
            aria-label="Alex Büchel on LinkedIn"
            style={{ fontFamily: "var(--font-montserrat, inherit)" }}
          >
            <span className="font-semibold tracking-wide">Get in contact</span>
            <Linkedin
              className="h-6 w-6 shrink-0 text-[#0A66C2]"
              strokeWidth={1.5}
              aria-hidden
            />
          </a>
          <span
            className="flex shrink-0 items-center gap-4 text-xs opacity-70"
            style={{ fontFamily: "var(--font-montserrat, inherit)" }}
          >
            <span>© {new Date().getFullYear()}. All rights reserved.</span>
            <span aria-hidden className="text-white/50">
              ·
            </span>
            <a
              href="/impressum"
              className="hover:underline hover:opacity-100"
            >
              Impressum
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
