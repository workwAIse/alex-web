"use client";

import dynamic from "next/dynamic";

const SectionCursor = dynamic(
  () => import("@/components/SectionCursor").then((m) => m.default),
  { ssr: false }
);

export default function SectionCursorLoader() {
  return <SectionCursor />;
}
