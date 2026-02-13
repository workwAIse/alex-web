"use client";

import { useState } from "react";
import { ArrowRight, FolderHeart, FolderOpen, SquareArrowOutUpRight } from "lucide-react";
import { getLogoUrl } from "@/lib/logo";
import ChatModal from "./ChatModal";

/**
 * Projects section — ChatGPT projects UI style.
 * Clean, minimalist, white canvas; prominent title, list with title/description/date.
 */
const COMPANY_LOGO: Record<"egym" | "interhyp", { domain: string; name: string }> = {
  egym: { domain: "egym.com", name: "EGYM" },
  interhyp: { domain: "interhyp-gruppe.de", name: "Interhyp Gruppe" },
};

type ProjectEntry = {
  title: string;
  company: "egym" | "interhyp";
  defaultPrompt: string;
  outcome: string;
  impact: string;
  tasks: string;
  role: string;
};

const PROJECT_ENTRIES: ProjectEntry[] = [
  {
    title: "EGYM Squat Test: AI Mobility Assessment",
    company: "egym",
    defaultPrompt: "Tell Me More About Alex Time at EGYM",
    outcome: "Delivered a premium onboarding assessment and unlock actionable mobility insights using 3D body analysis.",
    impact: "Reduced flexibility test time 5 min → 20 sec; doubled flexibility test retention",
    tasks:
      "Led the whole development process from ideation to launch, including design sprint, rapid prototyping, cross-functional execution (tech, UX, research, sport science), rollout + post-launch optimization.",
    role: "Product Lead",
  },
  {
    title: "Fitness Hub seca edition: Integrated BIA Assessments",
    company: "egym",
    defaultPrompt: "Tell Me More About Alex Time at EGYM",
    outcome: "Launched a new product that combines best in class onboarding with medical-grade body composition analysis.",
    impact:
      "Successfully shipped a partner-integrated innovation product to global markets; enabled large-scale pilots and GTM execution with enterprise customers.",
    tasks:
      "Owned the software product from concept to global launch, drove product/design/engineering decisions, cross-company coordination with seca, ensured readiness for key milestones (tradeshows, pilots, enterprise customers).",
    role: "Software Product Lead (EGYM side)",
  },
  {
    title: "EGYM Genius: AI Training Plans",
    company: "egym",
    defaultPrompt: "Tell Me More About Alex Time at EGYM",
    outcome: "Democratized personal training experiences by enabling fast, AI-powered training plan creation at scale.",
    impact:
      "Reduced plan creation time 60 min → 20 min; increased Fitness Hub NPS 4.0 → 4.2; ensured great launch success in time for the 2024 tradeshows",
    tasks:
      "Owned the end-to-end Fitness Hub experience, shaped holistic member journey across devices, ensured delivery across MVP/pilot/rollout.",
    role: "Contributing Product Manager (Fitness Hub)",
  },
  {
    title: "Interhyp Home: New mortgage comparison product",
    company: "interhyp",
    defaultPrompt: "Tell Me More About Alex Time at Interhyp",
    outcome: "Modernized a core part of the interhyp platform (the mortgage comparison engine) to be used by both professional advisors and end customers.",
    impact:
      "Rolled out the new product to 10,000+ professional users, supporting the readiness for €10B+ annual volume through the platform.",
    tasks:
      "Took over the rebuild of core comparison product, translated the (new) platform strategy into quarterly planning + sprint execution, coordinated internal/external developers and UX designers, managed rollout strategy.",
    role: "Product Owner",
  },
];

export default function ProjectsSection() {
  const [promptByProject, setPromptByProject] = useState<Record<string, string>>({});
  const [openChat, setOpenChat] = useState<{ jobTitle: string; initialPrompt: string } | null>(null);

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
              <FolderHeart
                className="h-9 w-9 shrink-0 text-[#171717] md:h-12 md:w-12"
                aria-hidden
              />
              <h2 className="text-4xl font-semibold tracking-tight text-[#171717] md:text-5xl">
                Projects
              </h2>
            </div>
          </header>

          {/* List: case studies with Goal, Role, Key work, Impact + chat bar */}
          <ul className="mt-12 space-y-12">
            {PROJECT_ENTRIES.map((item, i) => {
              const inputValue =
                promptByProject[item.title] ?? item.defaultPrompt;
              const trimmedPrompt = inputValue.trim();

              return (
                <li key={i} className="group">
                  <div className="flex flex-col gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="flex flex-wrap items-center gap-2 text-lg font-semibold leading-snug text-[#171717] md:text-xl">
                        <FolderOpen
                          className="h-5 w-5 shrink-0 text-[#171717] md:h-6 md:w-6"
                          aria-hidden
                        />
                        <img
                          src={getLogoUrl(COMPANY_LOGO[item.company].domain, 24)}
                          alt={COMPANY_LOGO[item.company].name}
                          width={24}
                          height={24}
                          className="h-5 w-5 shrink-0 object-contain md:h-6 md:w-6"
                          loading="lazy"
                          title={COMPANY_LOGO[item.company].name}
                        />
                        <span className="min-w-0 flex-1">{item.title}</span>
                      </h3>
                      <dl className="mt-3 space-y-2 text-sm md:text-base">
                        <div>
                          <dt className="sr-only">Outcome</dt>
                          <dd className="font-semibold text-[#171717]">Outcome:</dd>
                          <dd className="mt-0.5 leading-relaxed text-[#6e6e80]">{item.outcome}</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Impact</dt>
                          <dd className="font-semibold text-[#171717]">Impact:</dd>
                          <dd className="mt-0.5 leading-relaxed text-[#6e6e80]">{item.impact}</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Tasks</dt>
                          <dd className="font-semibold text-[#171717]">Tasks:</dd>
                          <dd className="mt-0.5 leading-relaxed text-[#6e6e80]">{item.tasks}</dd>
                        </div>
                        <div>
                          <dt className="sr-only">Role</dt>
                          <dd className="font-semibold text-[#171717]">Role:</dd>
                          <dd className="mt-0.5 leading-relaxed text-[#6e6e80]">{item.role}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Squat Test: external links (article + video) before prompt */}
                    {item.title === "EGYM Squat Test: AI Mobility Assessment" && (
                      <nav className="flex items-center gap-3" aria-label="Squat Test links">
                        <a
                          href="https://athletechnews.com/egym-adds-layer-personalization-connectivity-squat-flexibility-test/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#6e6e80] transition-colors hover:text-[#171717]"
                          aria-label="Read article on Athletech News (opens in new tab)"
                        >
                          <SquareArrowOutUpRight className="h-4 w-4 shrink-0" aria-hidden />
                          <span>Article</span>
                        </a>
                        <a
                          href="https://www.youtube.com/watch?v=5D5Ic5IiLEg"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#6e6e80] transition-colors hover:text-[#171717]"
                          aria-label="Watch on YouTube (opens in new tab)"
                        >
                          <img
                            src={getLogoUrl("youtube.com", 20)}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 shrink-0 object-contain"
                            loading="lazy"
                          />
                          <span>YouTube</span>
                        </a>
                      </nav>
                    )}

                    {/* EGYM Genius: article + YouTube before prompt */}
                    {item.title === "EGYM Genius: AI Training Plans" && (
                      <nav className="flex items-center gap-3" aria-label="EGYM Genius links">
                        <a
                          href="https://insider.fitt.co/egyms-powering-the-smart-gym-revolution/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#6e6e80] transition-colors hover:text-[#171717]"
                          aria-label="Read article on Fitt Insider (opens in new tab)"
                        >
                          <SquareArrowOutUpRight className="h-4 w-4 shrink-0" aria-hidden />
                          <span>Article</span>
                        </a>
                        <a
                          href="https://www.youtube.com/watch?v=_A7KxQgK5VQ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#6e6e80] transition-colors hover:text-[#171717]"
                          aria-label="Watch on YouTube (opens in new tab)"
                        >
                          <img
                            src={getLogoUrl("youtube.com", 20)}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 shrink-0 object-contain"
                            loading="lazy"
                          />
                          <span>YouTube</span>
                        </a>
                      </nav>
                    )}

                    {/* Fitness Hub seca edition: article link before prompt */}
                    {item.title === "Fitness Hub seca edition: Integrated BIA Assessments" && (
                      <nav className="flex items-center gap-3" aria-label="Fitness Hub seca edition links">
                        <a
                          href="https://www.fitnessmanagement.de/egym-fitness-hub-seca-edition/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[#6e6e80] transition-colors hover:text-[#171717]"
                          aria-label="Read article on fitness MANAGEMENT (opens in new tab)"
                        >
                          <SquareArrowOutUpRight className="h-4 w-4 shrink-0" aria-hidden />
                          <span>Article</span>
                        </a>
                      </nav>
                    )}

                    {/* Chat bar — input and send button separate, clean pill style */}
                    <form
                      className="mt-3 flex items-center gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!trimmedPrompt) return;
                        setOpenChat({
                          jobTitle: item.title,
                          initialPrompt: trimmedPrompt,
                        });
                      }}
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) =>
                          setPromptByProject((prev) => ({
                            ...prev,
                            [item.title]: e.target.value,
                          }))
                        }
                        placeholder="Ask a follow-up..."
                        className="min-w-0 flex-1 rounded-full bg-white py-2.5 pl-5 pr-4 text-sm text-[#171717] shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] placeholder:text-[#a3a3a3] outline-none focus:ring-2 focus:ring-black/10"
                        aria-label={`Ask about ${item.title}`}
                      />
                      <button
                        type="submit"
                        disabled={!trimmedPrompt}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition-opacity hover:opacity-90 disabled:opacity-30"
                        aria-label="Open chat with this prompt"
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </button>
                    </form>
                  </div>
                </li>
              );
            })}
          </ul>

        </div>
      </section>

      {/* Chat overlay — opened with the prompt from the project's input */}
      {openChat && (
        <ChatModal
          jobTitle={openChat.jobTitle}
          initialPrompt={openChat.initialPrompt}
          onClose={() => setOpenChat(null)}
        />
      )}
    </>
  );
}
