"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import hobbyProjects from "@/data/hobby-projects";
import { Gallery4 } from "@/components/ui/gallery4";
import type { Gallery4Item } from "@/components/ui/gallery4";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { SquareArrowOutUpRight, Play, Code2, Lock } from "lucide-react";

type TokenType = "keyword" | "string" | "name" | "comment" | "plain";

type CodeToken = { type: TokenType; text: string };
type CodeLine = { tokens: CodeToken[] };

const COMMENT_COLOR = "#6a9955";

function buildCodeLines(projects: typeof hobbyProjects): CodeLine[] {
  const lines: CodeLine[] = [];

  lines.push({
    tokens: [
      { type: "keyword", text: "const" },
      { type: "plain", text: " " },
      { type: "name", text: "hobbyProjects" },
      { type: "plain", text: " = [" },
    ],
  });

  projects.forEach((p, i) => {
    lines.push({
      tokens: [
        { type: "plain", text: "  {" },
        { type: "name", text: " title" },
        { type: "plain", text: ": " },
        { type: "string", text: `"${p.title.replace(/"/g, '\\"')}"` },
        { type: "plain", text: "," },
      ],
    });
    lines.push({
      tokens: [
        { type: "name", text: " link" },
        { type: "plain", text: ": " },
        { type: "string", text: `"${p.link}"` },
        { type: "plain", text: "," },
      ],
    });
    lines.push({
      tokens: [
        { type: "plain", text: "  }" },
        ...(i < projects.length - 1 ? ([{ type: "plain", text: "," }] as CodeToken[]) : []),
      ],
    });
  });

  lines.push({
    tokens: [
      { type: "plain", text: "];" },
    ],
  });
  lines.push({
    tokens: [
      { type: "keyword", text: "export" },
      { type: "plain", text: " " },
      { type: "keyword", text: "default" },
      { type: "plain", text: " " },
      { type: "name", text: "hobbyProjects" },
      { type: "plain", text: ";" },
    ],
  });

  return lines;
}

const CODE_LINES = buildCodeLines(hobbyProjects);

/** Map tech string to plausible import lines for the fake IDE (engineer-friendly) */
function techToImportLines(tech: string): string[] {
  const lower = tech.toLowerCase();
  const lines: string[] = [];
  if (lower.includes("next")) lines.push("import ... from 'next'");
  if (lower.includes("vercel ai") || lower.includes("ai sdk")) lines.push("import { useChat } from '@vercel/ai/react'");
  if (lower.includes("neon")) lines.push("import { neon } from '@neondatabase/server'");
  if (lower.includes("openai")) lines.push("import OpenAI from 'openai'");
  if (lower.includes("supabase")) lines.push("import { createClient } from '@supabase/supabase-js'");
  if (lower.includes("lottie")) lines.push("import Lottie from 'lottie-react'");
  if (lower.includes("unicorn")) lines.push("import { UnicornStudio } from 'unicornstudio-react'");
  if (lower.includes("tailwind")) lines.push("// tailwindcss (PostCSS)");
  if (lower.includes("framer") && !lower.includes("framer-motion")) return []; // no-code Framer
  return lines;
}

function getProjectTabLabel(title: string): string {
  if (title.startsWith("workwAIse")) return "workwAIse";
  if (title === "CV Website") return "CV Website";
  if (title === "Portfolio Website") return "Portfolio Website";
  if (title.startsWith("Stance") || title.startsWith("stance-ai")) return "Stance";
  return title.slice(0, 20);
}

function CodeLine({ line, lineNum }: { line: CodeLine; lineNum: number }) {
  return (
    <div className="flex w-full">
      <span
        className="select-none pr-6 text-right font-mono text-sm"
        style={{ color: "#6b7b6b", minWidth: "3ch" }}
        aria-hidden
      >
        {lineNum}
      </span>
      <code className="flex-1 font-mono text-sm leading-relaxed">
        {line.tokens.map((t, i) => (
          <span
            key={i}
            style={{
              color:
                t.type === "keyword"
                  ? "#c586c0"
                  : t.type === "string"
                    ? "#ce9178"
                    : t.type === "name"
                      ? "#9cdcfe"
                      : t.type === "comment"
                        ? COMMENT_COLOR
                        : "#d4d4d4",
            }}
          >
            {t.text}
          </span>
        ))}
      </code>
    </div>
  );
}

type ActiveTab = "hobby-projects" | number;

function ImportLine({ line, lineNum }: { line: string; lineNum: number }) {
  const isComment = line.startsWith("//");
  const fromMatch = line.match(/\s+from\s+['"]([^'"]+)['"]/);
  const binding = fromMatch
    ? line.slice("import ".length, line.length - fromMatch[0].length).trim()
    : line.slice("import ".length);

  return (
    <div className="flex w-full">
      <span
        className="select-none pr-6 text-right font-mono text-sm"
        style={{ color: "#6b7b6b", minWidth: "3ch" }}
        aria-hidden
      >
        {lineNum}
      </span>
      <code className="flex-1 font-mono text-sm leading-relaxed">
        {isComment ? (
          <span style={{ color: COMMENT_COLOR }}>{line}</span>
        ) : (
          <>
            <span style={{ color: "#c586c0" }}>import </span>
            <span style={{ color: "#9cdcfe" }}>{binding}</span>
            {fromMatch && (
              <>
                <span style={{ color: "#c586c0" }}> from </span>
                <span style={{ color: "#ce9178" }}>&apos;{fromMatch[1]}&apos;</span>
              </>
            )}
          </>
        )}
      </code>
    </div>
  );
}

function ProjectTabContent({ project }: { project: (typeof hobbyProjects)[number] }) {
  const importLines = techToImportLines(project.tech);
  const isFramer = project.tech.toLowerCase().includes("framer") && importLines.length === 0;

  return (
    <div className="w-full max-w-4xl py-4 pl-6 pr-8 shrink-0 space-y-6 font-mono text-sm">
      {importLines.length > 0 && (
        <div className="space-y-0">
          {importLines.map((line, i) => (
            <ImportLine key={i} line={line} lineNum={i + 1} />
          ))}
        </div>
      )}
      {isFramer && (
        <div className="flex w-full">
          <span
            className="select-none pr-6 text-right font-mono text-sm"
            style={{ color: "#6b7b6b", minWidth: "3ch" }}
            aria-hidden
          >
            1
          </span>
          <code style={{ color: COMMENT_COLOR }}>// No-code (Framer). No imports.</code>
        </div>
      )}
      <div className="space-y-2">
        <div style={{ color: "#6a9955" }}>// Description</div>
        <div style={{ color: "#d4d4d4" }}>{project.description}</div>
      </div>
      <div className="space-y-2">
        <div style={{ color: "#6a9955" }}>// Details</div>
        <ul className="list-disc list-inside space-y-1" style={{ color: "#d4d4d4" }}>
          {project.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function IDEView({
  onRunClick,
  activeTab,
  setActiveTab,
}: {
  onRunClick: () => void;
  activeTab: ActiveTab;
  setActiveTab: (t: ActiveTab) => void;
}) {
  const isProjectTab = activeTab !== "hobby-projects";
  const project = typeof activeTab === "number" ? hobbyProjects[activeTab] : null;
  const breadcrumbPath = isProjectTab && project
    ? `src > projects > ${getProjectTabLabel(project.title).toLowerCase().replace(/\s+/g, "-")}`
    : "src > components > hobby-projects.ts";
  const breadcrumbFile = isProjectTab && project
    ? "README.md"
    : "hobby-projects.ts";

  return (
    <div
      className="h-full w-full flex flex-col font-mono min-h-0"
      style={{
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
      }}
    >
      {/* Menu bar: Cursor + Run only */}
      <div
        className="flex items-center gap-4 px-4 py-2 text-xs shrink-0"
        style={{ backgroundColor: "#252526", color: "#cccccc" }}
      >
        <span>Cursor</span>
        <button
          type="button"
          onClick={onRunClick}
          className="inline-flex items-center gap-1.5 hover:bg-white/10 rounded px-1 -mx-1 focus:outline-none focus:ring-2 focus:ring-[#9cdcfe]/50"
          aria-label="Run build — show built view"
        >
          <Play className="h-3.5 w-3.5" aria-hidden />
          Run
        </button>
      </div>

      {/* Tab bar + breadcrumbs */}
      <div
        className="flex flex-col border-b shrink-0"
        style={{ backgroundColor: "#252526", borderColor: "#3c3c3c" }}
      >
        <div className="flex items-center gap-1 px-2 pt-2">
          <span className="text-xs" style={{ color: "#858585" }}>
            {breadcrumbPath}
          </span>
          <span className="text-xs" style={{ color: "#cccccc" }}>
            {breadcrumbFile}
          </span>
        </div>
        <div className="mt-1 flex flex-wrap gap-px">
          <button
            type="button"
            onClick={() => setActiveTab("hobby-projects")}
            className="flex items-center gap-2 border-t-2 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9cdcfe]/50 rounded-t"
            style={{
              backgroundColor: activeTab === "hobby-projects" ? "#2e3d37" : "#252526",
              borderColor: activeTab === "hobby-projects" ? "#2e3d37" : "transparent",
              color: activeTab === "hobby-projects" ? "#cccccc" : "#858585",
            }}
          >
            <span style={{ color: "#ce9178" }}>hobby-projects.ts</span>
          </button>
          {hobbyProjects.map((p, i) => (
            <button
              key={p.link}
              type="button"
              onClick={() => setActiveTab(i)}
              className="flex items-center gap-2 border-t-2 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#9cdcfe]/50 rounded-t"
              style={{
                backgroundColor: activeTab === i ? "#2e3d37" : "#252526",
                borderColor: activeTab === i ? "#2e3d37" : "transparent",
                color: activeTab === i ? "#cccccc" : "#858585",
              }}
            >
              <span style={{ color: "#ce9178" }}>{getProjectTabLabel(p.title)}.md</span>
            </button>
          ))}
        </div>
      </div>

      {/* Editor: code or project content */}
      <div
        className="flex-1 min-h-0 flex overflow-auto"
        style={{ backgroundColor: "#2e3d37" }}
      >
        {activeTab === "hobby-projects" ? (
          <div className="w-full max-w-4xl py-4 pl-6 pr-8 shrink-0">
            {CODE_LINES.map((line, i) => (
              <CodeLine key={i} line={line} lineNum={i + 1} />
            ))}
          </div>
        ) : project ? (
          <ProjectTabContent project={project} />
        ) : null}
      </div>

      {/* Quick links row: all projects in overview tab, single project link in project tabs */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 shrink-0"
        style={{ backgroundColor: "#252526", color: "#cccccc", fontSize: "12px" }}
      >
        <span style={{ color: "#858585" }}>Open:</span>
        {activeTab === "hobby-projects"
          ? hobbyProjects.map((p) => (
              <a
                key={p.link}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9cdcfe] hover:underline focus:outline-none focus:ring-2 focus:ring-[#9cdcfe]/50 rounded"
                aria-label={`Open ${p.title} in new tab`}
              >
                <SquareArrowOutUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {p.title.split("—")[0].trim() || p.title.slice(0, 20)}
              </a>
            ))
          : project && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9cdcfe] hover:underline focus:outline-none focus:ring-2 focus:ring-[#9cdcfe]/50 rounded"
                aria-label={`Open ${project.title} in new tab`}
              >
                <SquareArrowOutUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {project.title.split("—")[0].trim() || project.title.slice(0, 20)}
              </a>
            )}
      </div>

      {/* Terminal: run dev + pulsing cursor; click + Enter triggers build (above status bar, like Cursor/VS Code) */}
      <div
        role="button"
        tabIndex={0}
        onClick={onRunClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") onRunClick();
        }}
        className="flex items-center gap-0 px-4 py-2 text-sm shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#4ec9b0]/50"
        style={{ backgroundColor: "#1e1e1e", color: "#4ec9b0" }}
        aria-label="Terminal: npm run dev — press Enter to build"
      >
        <span style={{ color: "#4ec9b0" }}>$ npm run dev</span>
        <span
          className="inline-block w-[1ch] h-4 ml-0.5 animate-[terminal-cursor_1s_step-end_infinite]"
          style={{ backgroundColor: "#4ec9b0" }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/** Real project screenshots for the built view. Order: workwAIse, CV Website, Stance, Portfolio (4th). */
const BUILT_VIEW_IMAGES = [
  "/projects/workwaise.png",
  "/projects/cv-website.png",
  "/projects/stance.png",
  "/projects/portfolio.png",
];

/** Gallery order: workwAIse, CV Website, Stance, Portfolio (4th). */
const BUILT_VIEW_ORDER = [0, 1, 3, 2]; // indices into hobbyProjects

function builtViewGalleryItems(): Gallery4Item[] {
  return BUILT_VIEW_ORDER.map((idx, orderIndex) => {
    const p = hobbyProjects[idx];
    return {
      id: p.link,
      title: p.title.split("—")[0].trim() || p.title,
      description: p.description,
      href: p.link,
      image: p.previewImageUrl ?? BUILT_VIEW_IMAGES[orderIndex],
    };
  });
}

function BuiltView({ onViewSource }: { onViewSource: () => void }) {
  const galleryItems = useMemo(builtViewGalleryItems, []);
  return (
    <div
      className="min-h-[360px] max-h-[85vh] w-full flex flex-col overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 md:min-h-[480px] md:h-[520px] md:max-h-none lg:h-[600px]"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Mac-like browser: same height as code view; in flow so you can scroll to other sections */}
      <div className="flex h-full w-full flex-col min-h-0">
        {/* Mac title bar: traffic lights + URL (centered on page) + back to source code */}
        <div className="relative flex items-center gap-2 px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/95 shrink-0">
          <div className="flex gap-2 shrink-0 items-center">
            <button
              type="button"
              onClick={onViewSource}
              className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-1"
              title="Close"
              aria-label="Close"
            />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" title="Minimize" aria-hidden />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" title="Maximize" aria-hidden />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 py-1.5 px-4 rounded-lg bg-zinc-200/90 dark:bg-zinc-700/90 max-w-md pointer-events-auto">
              <Lock className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden />
              <span className="truncate text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                localhost:3000
              </span>
            </div>
          </div>
          <div className="flex-1" aria-hidden />
          <RainbowButton
            type="button"
            onClick={onViewSource}
            className="shrink-0 h-8 min-h-8 py-1.5 px-4 text-sm font-medium inline-flex items-center gap-2"
            aria-label="Back to source code"
          >
            <Code2 className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Back to source code
          </RainbowButton>
        </div>
        {/* Browser content: Gallery4 carousel (scrollable inside this height) */}
        <div className="flex-1 min-h-0 overflow-auto p-6 bg-white dark:bg-zinc-900/50">
          <Gallery4
            title="My hobby projects"
            description="Non-dev friendly UI"
            items={galleryItems}
          />
        </div>
      </div>
    </div>
  );
}

export default function CodeSection() {
  const [view, setView] = useState<"ide" | "built">("ide");
  const [activeTab, setActiveTab] = useState<ActiveTab>("hobby-projects");
  const sectionRef = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (view !== "ide") return;
      const el = e.target instanceof Node ? (e.target as Element) : null;
      if (el?.closest?.("[aria-label*='Terminal']")) return;
      const pos = mousePosRef.current;
      if (!pos || !sectionRef.current) return;
      const under = document.elementFromPoint(pos.x, pos.y);
      if (under && sectionRef.current.contains(under)) setView("built");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [view]);

  return (
    <section
      ref={sectionRef}
      id="code"
      className="relative w-full font-mono"
      style={{
        backgroundColor: "#1e1e1e",
        color: "#d4d4d4",
      }}
    >
      <h2 className="sr-only">Code</h2>
      {view === "ide" ? (
        <div className="min-h-[480px] h-[520px] md:h-[600px] flex flex-col">
          <IDEView
            onRunClick={() => setView("built")}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      ) : (
        <BuiltView onViewSource={() => setView("ide")} />
      )}
    </section>
  );
}
