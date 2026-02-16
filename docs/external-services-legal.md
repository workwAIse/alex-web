# External services – Impressum & legal reference

This list covers third-party services used by this website that are typically relevant for an **Impressum**, **Datenschutzerklärung** (privacy policy), and other legal pages (e.g. EU/DSGVO, German TMG).

---

## Hosting & infrastructure

| Service | Purpose | Provider / Link | Legal note |
|--------|---------|------------------|------------|
| **Vercel** | Hosting, deployment, serverless functions | [Vercel Inc.](https://vercel.com), [Legal](https://vercel.com/legal) | Mention as hosting provider; check Vercel’s privacy/DPA if you need GDPR compliance. |

---

## Fonts

| Service | Purpose | Provider / Link | Legal note |
|--------|---------|------------------|------------|
| **Google Fonts** (via Next.js `next/font`) | Fonts: Geist, Geist Mono, Poppins, Montserrat, Lora, Roboto, Caveat, Oswald, Archivo | [Google LLC / Google Ireland](https://fonts.google.com), [Google Privacy](https://policies.google.com/privacy) | Next.js fetches fonts at build time; no runtime request from the user’s browser to Google. Still good to name “Google Fonts” if your legal template asks for “font providers.” |
| **Fontsource (Climate Crisis)** | Variable font “Climate Crisis” (npm package, bundled) | [Fontsource](https://fontsource.org/) – font files are self-hosted in the app | No external request to a third party at runtime. Optional to mention as “font: Climate Crisis via Fontsource.” |

---

## Logos & images

| Service | Purpose | Provider / Link | Legal note |
|--------|---------|------------------|------------|
| **Logo.dev** | Company logos in the Skills marquee (and optionally elsewhere) | [Logo.dev](https://logo.dev), [Attribution](https://www.logo.dev/docs/platform/attribution) | Free tier requires a visible attribution link (already implemented). Mention as “Logo API / image provider” and link to their terms/privacy if required. |
| **Clearbit** | Fallback logo source when Logo.dev key is not set | [Clearbit (Stripe)](https://clearbit.com), [Logo API](https://clearbit.com/logo) | Logos are loaded from Clearbit’s servers; mention if you use this fallback. |

---

## Scripts & CDNs

| Service | Purpose | Provider / Link | Legal note |
|--------|---------|------------------|------------|
| **jsDelivr** | CDN for Unicorn Studio SDK (Hero section) | [jsDelivr](https://www.jsdelivr.com/), [Terms](https://www.jsdelivr.com/terms-of-use) | Script is loaded from `cdn.jsdelivr.net` in the browser. Mention as “CDN provider” and check their privacy/terms for EU. |
| **Unicorn Studio (Hi Unicorn Studio)** | Interactive 3D / scene in Hero (unicornstudio-react, script from jsDelivr) | [GitHub: hiunicornstudio/unicornstudio.js](https://github.com/hiunicornstudio/unicornstudio.js) | If the SDK sends data to Unicorn Studio servers, mention as “interactive content / 3D” provider. |

---

## Backend / APIs (no client-side script)

| Service | Purpose | Provider / Link | Legal note |
|--------|---------|------------------|------------|
| **OpenAI** | Chat/CV feature in Projects section (Assistants API) | [OpenAI](https://openai.com), [Privacy](https://openai.com/policies/privacy-policy) | User messages and context are sent to OpenAI. **Must** be mentioned in privacy policy and, if required, in Impressum (e.g. “AI chat powered by OpenAI”). Consider data processing agreement for strict GDPR. |

---

## Outbound links (no data processing by them on your site)

| Service | Purpose | Legal note |
|--------|---------|------------|
| **LinkedIn** | “Get in contact” link in footer | No embedding; simple link. Often listed in Impressum as “Link to external profile (LinkedIn).” |

---

## Summary checklist for legal pages

- **Impressum (German-style)**  
  - Hosting: **Vercel**  
  - Optional: “Logos: Logo.dev (and Clearbit as fallback)”, “Fonts: Google Fonts”, “Interactive content: Unicorn Studio”, “CDN: jsDelivr”, “AI chat: OpenAI”, “External link: LinkedIn”.

- **Privacy policy / Datenschutzerklärung**  
  - **Vercel** (hosting, server logs, possibly analytics if you add Vercel Analytics).  
  - **Google Fonts** (only if you ever load fonts at runtime from Google; with `next/font` at build time, exposure is minimal).  
  - **Logo.dev / Clearbit** (IP/logs when loading logo images).  
  - **jsDelivr** (when loading Unicorn Studio script – IP, User-Agent).  
  - **OpenAI** (conversation data for the chat feature – must be disclosed).  
  - **Unicorn Studio** (only if their SDK sends data to their servers).

- **Attribution**  
  - **Logo.dev**: keep the existing “Logos provided by Logo.dev” link on the site (required on free tier).

---

*Last updated from codebase: layout (fonts), next.config (images), Hero (Unicorn/jsDelivr), logo.ts (Logo.dev/Clearbit), api/chat (OpenAI), Footer (LinkedIn), README (Vercel).*
