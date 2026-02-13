/**
 * Shared logo URL helper — used by Skills marquee and Projects section.
 * Prefer Logo.dev when NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY is set; fallback to Clearbit.
 */
const LOGO_FORMAT = "png" as const;

export function getLogoUrl(domain: string, size: number = 40): string {
  const token =
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY?.trim();
  if (token) {
    const params = new URLSearchParams({
      token,
      size: String(size),
      format: LOGO_FORMAT,
      theme: "light",
    });
    return `https://img.logo.dev/${encodeURIComponent(domain)}?${params.toString()}`;
  }
  return `https://logo.clearbit.com/${domain}`;
}
