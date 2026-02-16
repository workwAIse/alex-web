"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  Activity,
  BookOpen,
  Code2,
  Gem as GemIcon,
  MapPin,
  Mic,
  MoreVertical,
  Pin,
  Search,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, LayoutGroup } from "framer-motion";
import gemsData, { type Gem, type GemIconName } from "@/data/gems";

/**
 * Gems section — Google Gem Manager–style grid.
 * Matches Gemini UI: icon on its own line, three-dots overflow menu, Material surface colors.
 * Section bg #e8eaed, cards #fff, border #dadce0, elevation shadow.
 */

const ICON_MAP: Record<GemIconName, LucideIcon> = {
  sparkles: Sparkles,
  "code-2": Code2,
  activity: Activity,
  "book-open": BookOpen,
  users: Users,
  "map-pin": MapPin,
  search: Search,
  mic: Mic,
};

function GemCard({
  gem,
  menuOpen,
  onMenuToggle,
  onMenuClose,
  onPin,
}: {
  gem: Gem;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onPin?: () => void;
}) {
  const IconComponent = ICON_MAP[gem.icon];
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onMenuClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, onMenuClose]);

  const handlePin = () => {
    onPin?.();
    onMenuClose();
  };

  return (
    <motion.article
      layout
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="relative min-h-[7.5rem] rounded-2xl border border-[#dadce0] bg-white p-5"
      style={{
        boxShadow:
          "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
      }}
    >
      {/* Top row: icon (left) + three-dots menu (right), Google layout */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: gem.iconColor }}
          aria-hidden
        >
          {IconComponent && (
            <IconComponent className="h-5 w-5" strokeWidth={2} />
          )}
        </span>
        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={onMenuToggle}
            className="rounded-full p-1 transition-colors hover:bg-black/5"
            style={{ color: "#5f6368" }}
            aria-label="More options"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
          >
            <MoreVertical className="h-5 w-5" strokeWidth={2} />
          </button>
          {menuOpen && (
            <div
              className="absolute right-0 top-full z-10 mt-1 min-w-[140px] rounded-lg border border-[#dadce0] bg-white py-1 shadow-lg"
              role="menu"
            >
              {gem.favoriteLink ? (
                <a
                  href={gem.favoriteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-[13px] text-left transition-colors hover:bg-black/5"
                  style={{ color: "#202124" }}
                  role="menuitem"
                  onClick={onMenuClose}
                >
                  <Star className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Favorite
                </a>
              ) : (
                <span
                  className="flex items-center gap-2 px-3 py-2 text-[13px]"
                  style={{ color: "#5f6368" }}
                  role="menuitem"
                >
                  <Star className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Favorite
                </span>
              )}
              {onPin && (
                <button
                  type="button"
                  onClick={handlePin}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] transition-colors hover:bg-black/5"
                  style={{ color: "#202124" }}
                  role="menuitem"
                >
                  <Pin className="h-4 w-4 shrink-0" strokeWidth={2} />
                  Pin
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <h3
        className="text-[15px] font-medium leading-snug tracking-tight"
        style={{ color: "#202124" }}
      >
        {gem.title}
      </h3>
      <p
        className="mt-1.5 text-[13px] leading-[1.45]"
        style={{ color: "#5f6368" }}
      >
        {gem.shortDescription}
      </p>
    </motion.article>
  );
}

export default function GemsSection() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  /** Pinned gem ids in order: most recently pinned first. Not persisted — resets on reload. */
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  const orderedGems = useMemo(() => {
    const byId = new Map(gemsData.map((g) => [g.id, g]));
    const pinned = pinnedIds.map((id) => byId.get(id)).filter(Boolean) as Gem[];
    const rest = gemsData.filter((g) => !pinnedIds.includes(g.id));
    return [...pinned, ...rest];
  }, [pinnedIds]);

  const handlePin = (gemId: string) => {
    setPinnedIds((ids) => [gemId, ...ids.filter((id) => id !== gemId)]);
  };

  return (
    <section
      id="gems"
      className="relative w-full px-6 pt-16 pb-16 md:px-8 md:pt-24 md:pb-24"
      style={{
        backgroundColor: "#e8eaed",
        color: "#202124",
        fontFamily: "var(--font-roboto), Roboto, sans-serif",
      }}
    >
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <GemIcon
              className="h-9 w-9 shrink-0 text-[#202124] md:h-10 md:w-10"
              strokeWidth={1.5}
              aria-hidden
            />
            <h2
              className="text-3xl font-normal tracking-tight md:text-4xl"
              style={{ color: "#202124", letterSpacing: "-0.02em" }}
            >
              Private Gems
            </h2>
          </div>
          <p
            className="text-base font-normal"
            style={{ color: "#5f6368" }}
          >
            Learn a bit about me besides (and maybe within) work
          </p>
        </header>

        <LayoutGroup>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orderedGems.map((gem) => (
              <GemCard
                key={gem.id}
                gem={gem}
                menuOpen={openMenuId === gem.id}
                onMenuToggle={() =>
                  setOpenMenuId((id) => (id === gem.id ? null : gem.id))
                }
                onMenuClose={() => setOpenMenuId(null)}
                onPin={() => handlePin(gem.id)}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
