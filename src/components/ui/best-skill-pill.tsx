"use client";

import { useEffect, useMemo, useState, useId } from "react";
import { Sparkle } from "lucide-react";
import { loadFull } from "tsparticles";

import type { ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { cn } from "@/lib/utils";

/* Claude (Anthropic) palette: #d97757 accent, #e8a87c light coral, #b0aea5 gray, #faf9f5 cream, #141413 dark */
const CLAUDE_PARTICLE_COLORS = [
  "#d97757",
  "#e8a87c",
  "#b0aea5",
  "#faf9f5",
  "#d4a574",
  "#141413",
];

const getClaudeParticleOptions = (): ISourceOptions => ({
  key: "claude-star",
  name: "ClaudeStar",
  particles: {
    number: {
      value: 18,
      density: { enable: false },
    },
    color: { value: CLAUDE_PARTICLE_COLORS },
    shape: {
      type: "star",
      options: { star: { sides: 4 } },
    },
    opacity: { value: 0.8 },
    size: { value: { min: 1, max: 3.5 } },
    rotate: {
      value: { min: 0, max: 360 },
      enable: true,
      direction: "clockwise",
      animation: { enable: true, speed: 10, sync: false },
    },
    links: { enable: false },
    reduceDuplicates: true,
    move: {
      enable: true,
      center: { x: 50, y: 50 },
    },
  },
  interactivity: { events: {} },
  smooth: true,
  fpsLimit: 120,
  background: { color: "transparent", size: "cover" },
  fullScreen: { enable: false },
  detectRetina: true,
  absorbers: [
    {
      enable: true,
      opacity: 0,
      size: { value: 1, density: 1, limit: { radius: 5, mass: 5 } },
      position: { x: 50, y: 50 },
    },
  ],
  emitters: [
    {
      autoPlay: true,
      fill: true,
      life: { wait: true },
      rate: { quantity: 4, delay: 0.5 },
      position: { x: 50, y: 50 },
    },
  ],
});

export interface BestSkillPillProps {
  children: React.ReactNode;
  className?: string;
}

export function BestSkillPill({ children, className }: BestSkillPillProps) {
  const id = useId();
  const [particleState, setParticlesReady] = useState<"loaded" | "ready">();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setParticlesReady("loaded"));
  }, []);

  const modifiedOptions = useMemo(
    () => ({ ...getClaudeParticleOptions(), autoPlay: isHovering } as ISourceOptions),
    [isHovering]
  );

  return (
    <span
      className={cn(
        "group relative inline-flex cursor-default rounded-full border transition-transform hover:scale-105",
        "border-[#b0aea5] bg-[#e8e6dc] text-[#141413]",
        "hover:border-[#d97757]/60 hover:bg-gradient-to-r hover:from-[#d97757]/20 hover:via-[#e8a87c]/15 hover:via-40% hover:to-[#d97757]/20",
        "px-2.5 py-1 text-sm",
        className
      )}
      style={{ fontFamily: "var(--font-poppins), Arial, sans-serif" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="relative z-10 flex items-center gap-1.5">
        <Sparkle
          className="size-3.5 shrink-0 fill-[#d97757] group-hover:animate-sparkle"
          style={{ animationDelay: "0.2s" }}
          aria-hidden
        />
        {children}
      </span>
      {!!particleState && (
        <Particles
          id={`best-skill-particles-${id.replace(/:/g, "")}`}
          className={cn(
            "pointer-events-none absolute -bottom-4 -left-4 -right-4 -top-4 z-0 opacity-0 transition-opacity duration-200",
            particleState === "ready" && "group-hover:opacity-100"
          )}
          particlesLoaded={async () => setParticlesReady("ready")}
          options={modifiedOptions}
        />
      )}
    </span>
  );
}
