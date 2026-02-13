"use client";

import Image from "next/image";
import { getLogoUrl } from "@/lib/logo";

const LOGO_SIZE = 32;

const HEADER_LOGOES = [
  { domain: "egym.com", name: "EGYM" },
  { domain: "jobrad-loop.com", name: "Jobrad Loop" },
  { domain: "interhyp-gruppe.de", name: "Interhyp Gruppe" },
] as const;

export default function Header() {
  return (
    <header
      className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-4 sm:px-10"
      role="banner"
    >
      <div className="flex items-center gap-3">
        <span
          className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          style={{ fontFamily: "var(--font-montserrat, inherit)" }}
        >
          Alex Büchel · Senior PM
        </span>
      </div>
      <div className="flex items-center">
        {HEADER_LOGOES.map(({ domain, name }) => (
          <div
            key={domain}
            className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-black/20 first:ml-0 -ml-2"
            title={name}
          >
            <Image
              src={getLogoUrl(domain, LOGO_SIZE)}
              alt={name}
              width={LOGO_SIZE}
              height={LOGO_SIZE}
              className="h-8 w-8 object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
    </header>
  );
}
