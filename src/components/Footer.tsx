"use client";

/**
 * Footer — sticky reveal effect (Dataleap.ai style).
 * Renders footer content that sits behind the main page. When the user scrolls
 * to the bottom, the main content (with rounded corners) appears to lift away,
 * revealing this footer. Height is driven by content + min-height for the
 * reveal viewport; avoid hard-coded pixel heights where possible.
 */

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative z-0 flex min-h-[60vh] w-full flex-col items-center justify-center px-6 py-16 text-center md:min-h-[50vh] md:py-24"
      style={{
        backgroundColor: "var(--footer-bg)",
        color: "var(--footer-fg)",
      }}
      aria-label="Site footer"
    >
      {/* Footer content — links, copyright, etc. */}
      <div className="mx-auto max-w-2xl space-y-6">
        <p className="text-sm opacity-80">
          Built with Next.js · Portfolio
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-sm"
          aria-label="Footer navigation"
        >
          <a
            href="#"
            className="underline-offset-4 hover:underline"
          >
            Top
          </a>
          <a
            href="#projects"
            className="underline-offset-4 hover:underline"
          >
            Projects
          </a>
          <a
            href="#skills"
            className="underline-offset-4 hover:underline"
          >
            Skills
          </a>
          <a
            href="#code"
            className="underline-offset-4 hover:underline"
          >
            Code
          </a>
          <a
            href="#gems"
            className="underline-offset-4 hover:underline"
          >
            Gems
          </a>
        </nav>
        <p className="text-xs opacity-60">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
