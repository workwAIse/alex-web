"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

/**
 * Projects section — ChatGPT projects UI style.
 * Clean, minimalist, white canvas; prominent title, list with title/description/date.
 */
const FOLDER_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
);

const PLACEHOLDER_ENTRIES = [
  { title: "Senior Engineer — Company A", description: "Led platform architecture and delivery.", date: "Feb 8" },
  { title: "Tech Lead — Company B", description: "Shipped mobile and web products.", date: "Jan 12" },
];

export default function ProjectsSection() {
  const [activeJob, setActiveJob] = useState<string | null>(null);

  return (
    <>
      <section
        id="projects"
        className="relative w-full bg-white py-16 px-6 md:py-24 md:px-8"
        style={{ color: "#171717" }}
      >
        <div className="mx-auto max-w-3xl">
          {/* Header: title */}
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[#6e6e80]" aria-hidden>
                {FOLDER_ICON}
              </span>
              <h2 className="text-4xl font-semibold tracking-tight text-[#171717] md:text-5xl">
                Projects
              </h2>
            </div>
          </header>

          {/* List: title, description, date — generous spacing, no dividers */}
          <ul className="mt-12 space-y-10">
            {PLACEHOLDER_ENTRIES.map((item, i) => (
              <li key={i} className="group">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold leading-snug text-[#171717] md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-base leading-relaxed text-[#6e6e80]">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-1 flex shrink-0 items-center gap-3 sm:mt-0 sm:ml-4">
                    <span className="text-sm text-[#6e6e80]">
                      {item.date}
                    </span>
                    <button
                      onClick={() => setActiveJob(item.title)}
                      className="inline-flex items-center justify-center rounded-md p-1.5 text-[#6e6e80] transition-colors hover:bg-[#f0f0f0] hover:text-[#171717]"
                      aria-label={`Chat about ${item.title}`}
                      title="Ask about this role"
                    >
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer disclaimer — subtle */}
          <p className="mt-16 text-center text-xs text-[#a3a3a3]">
            Work experience. Replace placeholder entries with your real projects.
          </p>
        </div>
      </section>

      {/* Chat overlay */}
      {activeJob && (
        <ChatModal
          jobTitle={activeJob}
          onClose={() => setActiveJob(null)}
        />
      )}
    </>
  );
}
