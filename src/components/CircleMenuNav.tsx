"use client";

import { CircleMenu } from "@/components/ui/circle-menu";
import type { CircleMenuRef } from "@/components/ui/circle-menu";
import {
  VenetianMask,
  BriefcaseBusiness,
  PocketKnife,
  Compass,
  Balloon,
  User,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

const NAV_ITEMS = [
  { label: "Home", icon: <VenetianMask size={16} />, href: "/" },
  { label: "Selected projects", icon: <BriefcaseBusiness size={16} />, href: "/#projects" },
  { label: "Skills", icon: <PocketKnife size={16} />, href: "/#skills" },
  { label: "Code", icon: <Compass size={16} />, href: "/#code" },
  { label: "Gems", icon: <Balloon size={16} />, href: "/#gems" },
  { label: "About", icon: <User size={16} />, href: "/#projects" },
  { label: "Contact", icon: <Mail size={16} />, href: "/#gems" },
];

const CORNER = { top: 24, right: 24, left: "auto" as const };

export default function CircleMenuNav() {
  const [position, setPosition] = useState<"corner" | "center">("corner");
  const [open, setOpen] = useState(false);
  const menuRef = useRef<CircleMenuRef>(null);
  const pendingHrefRef = useRef<string | null>(null);

  const goToCenterThenOpen = () => {
    setPosition("center");
    setTimeout(() => setOpen(true), 400);
  };

  const handleCloseComplete = () => {
    setPosition("corner");
    const href = pendingHrefRef.current;
    pendingHrefRef.current = null;
    if (href) {
      if (href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const id = href.replace(/^.*#/, "");
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleItemClick = (href: string) => {
    pendingHrefRef.current = href;
    menuRef.current?.requestClose();
  };

  return (
    <motion.div
      className="fixed z-40 md:top-6 md:right-6"
      initial={CORNER}
      animate={
        position === "corner"
          ? { top: 24, right: 24, left: "auto" }
          : { top: "50%", left: "50%", right: "auto", x: "-50%", y: "-50%" }
      }
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        position: "fixed",
        width: 250,
        height: 250,
      }}
    >
      <CircleMenu
        ref={menuRef}
        items={NAV_ITEMS}
        lottieTriggerSrc="/AI logo Foriday.json"
        open={open}
        onOpenChange={setOpen}
        onCloseComplete={handleCloseComplete}
        onItemClick={handleItemClick}
        onTriggerClickWhenClosed={position === "corner" ? goToCenterThenOpen : undefined}
      />
    </motion.div>
  );
}