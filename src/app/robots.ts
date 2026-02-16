import type { MetadataRoute } from "next";

/**
 * Legal pages (Impressum, Datenschutz, Haftungsausschluss) are also set to
 * noindex via page metadata. Disallowing them here reinforces that crawlers
 * should not index them — only users who click the footer links see the content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/impressum", "/datenschutz", "/haftungsausschluss"],
    },
  };
}
