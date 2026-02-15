"use client";

import { MenuContainer, MenuItem } from "@/components/ui/fluid-menu";
import {
  VenetianMask,
  BriefcaseBusiness,
  PocketKnife,
  Compass,
  Balloon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRef } from "lottie-react";

const LOGO_SIZE = 96;
const LOTTIE_SRC = "/AI logo Foriday.json";

const NAV_ICON_SIZE = 36;
const NAV_ITEMS = [
  { label: "Home", icon: <VenetianMask size={NAV_ICON_SIZE} strokeWidth={1.5} />, href: "/" },
  {
    label: "Selected projects",
    icon: <BriefcaseBusiness size={NAV_ICON_SIZE} strokeWidth={1.5} />,
    href: "/#projects",
  },
  { label: "Skills", icon: <PocketKnife size={NAV_ICON_SIZE} strokeWidth={1.5} />, href: "/#skills" },
  { label: "Code", icon: <Compass size={NAV_ICON_SIZE} strokeWidth={1.5} />, href: "/#code" },
  { label: "Gems", icon: <Balloon size={NAV_ICON_SIZE} strokeWidth={1.5} />, href: "/#gems" },
  { label: "Contact", href: "/#gems" },
];

function AILogoTrigger() {
  const lottieRef = useRef<LottieRef["current"]>(null);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const path = LOTTIE_SRC;
    const url = path.includes(" ")
      ? path.split("/").map((s) => encodeURIComponent(s)).join("/")
      : path;
    fetch(url)
      .then((r) => r.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  useEffect(() => {
    if (!animationData || !lottieRef.current) return;
    lottieRef.current.play();
  }, [animationData]);

  if (!animationData) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-muted"
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        style={{ width: LOGO_SIZE, height: LOGO_SIZE }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}

export default function FluidMenuNav() {
  const handleItemClick = (href: string) => {
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const id = href.replace(/^.*#/, "");
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40" data-cursor-area="nav">
      <MenuContainer expandDirection="up">
        <MenuItem>
          <AILogoTrigger />
        </MenuItem>
        {NAV_ITEMS.map((item) => (
          <MenuItem
            key={item.href}
            icon={item.icon}
            onClick={() => handleItemClick(item.href)}
          />
        ))}
      </MenuContainer>
    </div>
  );
}
