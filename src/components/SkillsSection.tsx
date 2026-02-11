"use client";

/**
 * Skills section — Claude (Anthropic) brand.
 * Uses official Anthropic colors and typography: Poppins headings, Lora body,
 * light #faf9f5, dark text #141413, accent #d97757, secondary #b0aea5, subtle bg #e8e6dc.
 */

const SPARKLE_ICON = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
      fill="currentColor"
    />
    <path
      d="M18 14L18.8 16.2L21 17L18.8 17.8L18 20L17.2 17.8L15 17L17.2 16.2L18 14Z"
      fill="currentColor"
    />
    <path
      d="M6 4L6.5 5.5L8 6L6.5 6.5L6 8L5.5 6.5L4 6L5.5 5.5L6 4Z"
      fill="currentColor"
    />
  </svg>
);

const CATEGORIES = [
  { title: "Programming", skills: ["Skill 1", "Skill 2", "Skill 3"] },
  { title: "Frameworks & tools", skills: ["Skill 4", "Skill 5"] },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full py-16 px-6 md:py-24 md:px-8"
      style={{
        backgroundColor: "#faf9f5",
        color: "#141413",
        fontFamily: "var(--font-lora), Georgia, serif",
      }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header: title with Anthropic orange accent */}
        <header className="flex items-center gap-3">
          <span
            className="flex shrink-0"
            style={{ color: "#d97757" }}
            aria-hidden
          >
            {SPARKLE_ICON}
          </span>
          <h2
            className="text-3xl font-bold tracking-tight md:text-4xl"
            style={{
              color: "#141413",
              fontFamily: "var(--font-poppins), Arial, sans-serif",
            }}
          >
            Skills
          </h2>
        </header>
        <p
          className="mt-2 text-base leading-relaxed"
          style={{ color: "#b0aea5" }}
        >
          What I work with. Replace with your own.
        </p>

        {/* Category blocks with pill-shaped tags — Anthropic light gray */}
        <div className="mt-10 space-y-10">
          {CATEGORIES.map((cat, i) => (
            <div key={i}>
              <h3
                className="text-lg font-semibold md:text-xl"
                style={{
                  color: "#141413",
                  fontFamily: "var(--font-poppins), Arial, sans-serif",
                }}
              >
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="rounded-full border px-2.5 py-1 text-sm"
                    style={{
                      backgroundColor: "#e8e6dc",
                      borderColor: "#b0aea5",
                      color: "#141413",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Input bar — Anthropic subtle background */}
        <div
          className="mt-12 flex items-center gap-3 rounded-2xl border px-4 py-3.5"
          style={{
            backgroundColor: "#e8e6dc",
            borderColor: "#b0aea5",
          }}
          role="presentation"
        >
          <span style={{ color: "#b0aea5" }}>
            <svg
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
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </span>
          <span
            className="flex-1 text-sm"
            style={{ color: "#b0aea5" }}
          >
            Add a skill…
          </span>
        </div>

        {/* Footer disclaimer — mid gray */}
        <p
          className="mt-8 text-center text-xs"
          style={{ color: "#b0aea5" }}
        >
          Claude-style section. Update categories and skills with your real data.
        </p>
      </div>
    </section>
  );
}
