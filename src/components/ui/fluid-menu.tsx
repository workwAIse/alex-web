"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  showChevron?: boolean;
}

export function Menu({
  trigger,
  children,
  align = "left",
  showChevron = true,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer inline-flex items-center"
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
        {showChevron && (
          <ChevronDown
            className="ml-2 -mr-1 h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
          />
        )}
      </div>

      {isOpen && (
        <div
          className={`absolute ${
            align === "right" ? "right-0" : "left-0"
          } mt-2 w-56 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-9 focus:outline-none z-50`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  isActive?: boolean;
}

export function MenuItem({
  children,
  onClick,
  disabled = false,
  icon,
  isActive = false,
}: MenuItemProps) {
  return (
    <button
      className={`relative flex h-16 w-full items-center justify-center p-0 text-center group
        ${disabled ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" : "text-gray-600 dark:text-gray-300"}
        ${isActive ? "bg-white/10" : ""}
      `}
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="flex items-center justify-center">
        {icon && (
          <span className="flex h-6 w-6 items-center justify-center transition-all duration-200 group-hover:[&_svg]:stroke-[2.5]">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
}

/** Center-to-center spacing when expanded; compact stack (Material / iOS-style ~52px) */
const ITEM_OFFSET_PX = 52;
const ITEM_SIZE = 96;

interface MenuContainerProps {
  children: React.ReactNode;
  /** When "up", items expand above the trigger (e.g. for corner placement). Default "down". */
  expandDirection?: "up" | "down";
}

export function MenuContainer({
  children,
  expandDirection = "down",
}: MenuContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const isUp = expandDirection === "up";

  return (
    <div
      className="relative"
      style={{ width: ITEM_SIZE }}
      data-expanded={isExpanded}
    >
      <div className="relative">
        {/* First item - always visible (trigger); data-cursor-area used by SectionCursor for custom cursor */}
        <div
          className="ai-logo-cursor-trigger relative flex items-center justify-center rounded-full group will-change-transform z-50 [&>*]:h-full [&>*]:min-h-full [&>*]:w-full"
          style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
          onClick={handleToggle}
          data-cursor-area="ai-logo"
          title="Open menu"
        >
          {childrenArray[0]}
        </div>

        {/* Other items - animate up or down */}
        {childrenArray.slice(1).map((child, index) => {
          const offset = (index + 1) * ITEM_OFFSET_PX;
          const translateY = isExpanded
            ? isUp
              ? -offset
              : offset
            : 0;
          return (
            <div
              key={index}
              className="absolute left-0 top-0 flex items-center justify-center will-change-transform [&>*]:h-full [&>*]:min-h-full [&>*]:w-full"
              style={{
                width: ITEM_SIZE,
                height: ITEM_SIZE,
                transform: `translateY(${translateY}px)`,
                opacity: isExpanded ? 1 : 0,
                zIndex: 40 - index,
                clipPath:
                  index === childrenArray.length - 2
                    ? "circle(50% at 50% 50%)"
                    : "circle(50% at 50% 55%)",
                transition: `transform ${isExpanded ? "300ms" : "300ms"} cubic-bezier(0.4, 0, 0.2, 1),
                           opacity ${isExpanded ? "300ms" : "350ms"}`,
                backfaceVisibility: "hidden",
                perspective: 1000,
                WebkitFontSmoothing: "antialiased",
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
