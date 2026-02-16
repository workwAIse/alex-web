"use client";

import { LampDesk } from "lucide-react";
import { MarqueeDemo } from "@/components/ui/marquee-demo";
import { BestSkillPill } from "@/components/ui/best-skill-pill";

/** Best skills (easter egg): show particle + Claude-style hover effect. Match by normalized substring or exact. */
const BEST_SKILLS = [
  "Product Delivery",
  "forefront of AI",
  "Product Analytics",
  "ML enabled products",
  "german",
];

function isBestSkill(skill: string): boolean {
  const s = skill.toLowerCase();
  return BEST_SKILLS.some((b) => {
    const bn = b.toLowerCase();
    if (bn === "german") return s === "german";
    if (bn === "product delivery") return s.includes("product delivery");
    if (bn === "forefront of ai") return s.includes("forefront");
    if (bn === "product analytics") return s === "product analytics";
    if (bn === "ml enabled products") return s.includes("ml-enabled") || s.includes("ml enabled");
    return false;
  });
}

/**
 * Skills section — Claude (Anthropic) brand.
 * Uses official Anthropic colors and typography: Poppins headings, Lora body,
 * light #faf9f5, dark text #141413, accent #d97757, secondary #b0aea5, subtle bg #e8e6dc.
 */

const CATEGORIES = [
  {
    title: "Product Management",
    skills: [
      "Product Strategy & Roadmapping",
      "User Journey Design",
      "Product Discovery",
      "Cross-functional Collaboration",
      "Product Delivery",
      "Stakeholder Alignment",
      "Outcome-driven Product Development",
    ],
  },
  {
    title: "AI & Innovation",
    skills: [
      "AI Product Discovery",
      "LLM-powered Workflows",
      "Prototyping with AI Tools",
      "AI-Assisted Research & Synthesis",
      "AI Adoption in Teams",
      "Staying at the forefront of emerging AI tools",
    ],
  },
  {
    title: "Product Analytics & Decision Making",
    skills: [
      "Product Analytics",
      "KPI Definition & Tracking",
      "Data-informed Decisions",
    ],
  },
  {
    title: "Platforms, Hardware & Systems",
    skills: [
      "Software + Hardware Product Development",
      "ML-enabled Products",
      "Cross-Ecosystem Delivery",
      "Partner Integration",
    ],
  },
  {
    title: "Languages",
    skills: ["German", "English"],
  },
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
        {/* Header: title with lamp-desk icon + subheadline */}
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span
              className="flex shrink-0 text-3xl md:text-4xl text-black"
              aria-hidden
            >
              <LampDesk className="size-[1em]" strokeWidth={1.5} />
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
          </div>
          <p
            className="text-base opacity-80"
            style={{
              color: "#141413",
              fontFamily: "var(--font-lora), Georgia, serif",
            }}
          >
            This amongst others is what I bring to the team
          </p>
        </header>

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
                {cat.skills.map((skill, j) =>
                  isBestSkill(skill) ? (
                    <BestSkillPill key={j}>{skill}</BestSkillPill>
                  ) : (
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
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logo marquee at bottom of section */}
      <MarqueeDemo />
      {/* Logo.dev free tier: attribution required in production (public, followable). Do not add rel="noreferrer". Align with marquee strip (max-w-[90vw] mx-auto). */}
      {typeof process !== "undefined" &&
        process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY?.trim() && (
          <div className="max-w-[90vw] mx-auto mt-4">
            <p
              className="text-right text-2xl"
              style={{
                color: "#b0aea5",
                fontFamily: "var(--font-caveat), cursive",
              }}
            >
              🙏 to{" "}
              <a
                href="https://logo.dev"
                title="Logo API"
                className="underline-offset-2 hover:underline"
                style={{ color: "#2563eb" }}
              >
                logo.dev
              </a>
            </p>
          </div>
        )}
    </section>
  );
}
