"use client";

import { Marquee } from "@/components/ui/marquee";

/**
 * Companies/tools to show in the Skills section marquee (logos only).
 * Use Logo.dev (domain) for most; set logoSrc for local assets (e.g. Claude/Gemini = section cursor icons).
 */
export const MARQUEE_COMPANIES: {
  name: string;
  domain?: string;
  logoSrc?: string;
}[] = [
  { name: "OpenAI", domain: "openai.com" },
  { name: "Claude AI", logoSrc: "/claude-ai-icon.webp" },
  { name: "Gemini", logoSrc: "/google-gemini-icon.webp" },
  { name: "Cursor", domain: "cursor.com" },
  { name: "Miro", domain: "miro.com" },
  { name: "Notion", domain: "notion.so" },
  { name: "GitHub", domain: "github.com" },
  { name: "Jira", domain: "atlassian.com" },
  { name: "Vercel", domain: "vercel.com" },
  { name: "n8n", domain: "n8n.io" },
  { name: "Tableau", domain: "tableau.com" },
  { name: "Mixpanel", domain: "mixpanel.com" },
  { name: "Zapier", domain: "zapier.com" },
  { name: "Microsoft Office", domain: "microsoft.com" },
  { name: "Google Workspace", domain: "google.com" },
];

const LOGO_SIZE = 40;
/** PNG for transparency support (Logo.dev returns transparent logos when available). */
const LOGO_FORMAT = "png" as const;

function getLogoUrl(domain: string): string | null {
  const token =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY?.trim();
  if (!token) return null;
  const params = new URLSearchParams({
    token,
    size: String(LOGO_SIZE),
    format: LOGO_FORMAT,
    theme: "light",
  });
  return `https://img.logo.dev/${encodeURIComponent(domain)}?${params.toString()}`;
}

function MarqueeSlot({
  name,
  domain,
  logoSrc,
}: {
  name: string;
  domain?: string;
  logoSrc?: string;
}) {
  const logoUrl = logoSrc ?? (domain ? getLogoUrl(domain) : null);

  if (!logoUrl) return null;

  return (
    <div className="relative h-full w-fit mx-[4rem] flex items-center justify-center">
      <img
        src={logoUrl}
        alt={name}
        width={LOGO_SIZE}
        height={LOGO_SIZE}
        className="h-10 w-10 object-contain shrink-0"
        loading="lazy"
      />
    </div>
  );
}

export function MarqueeDemo() {
  return (
    <Marquee>
      {MARQUEE_COMPANIES.map((company, index) => (
        <MarqueeSlot
          key={`${company.name}-${index}`}
          name={company.name}
          domain={company.domain}
          logoSrc={company.logoSrc}
        />
      ))}
    </Marquee>
  );
}
