# alex-web

A modern personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. The hero section embeds an interactive WebGL scene from [Unicorn Studio](https://unicorn.studio/).

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build and deploy

Build for production:

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com): connect your repo to Vercel or use the [Vercel CLI](https://vercel.com/docs/cli). The app is a standard Next.js App Router project and requires no extra configuration.

## Scripts

- `npm run dev` – start the development server
- `npm run build` – build for production
- `npm start` – start the production server
- `npm run lint` – run ESLint
- `npm run test` – run tests once (Vitest)
- `npm run test:watch` – run tests in watch mode

## Hero and Unicorn Studio

The hero section uses a WebGL scene from **Unicorn Studio**:

- **Project ID:** `i9BQoAQqkzcqJPHn60gG`
- **SDK version:** 2.0.5 (loaded via custom `sdkUrl`)

The scene is rendered with the [unicornstudio-react](https://www.npmjs.com/package/unicornstudio-react) Next.js integration (`unicornstudio-react/next`), with lazy loading and production CDN enabled.

For embed options and docs, see [Unicorn Studio – Embed](https://www.unicorn.studio/docs/embed/).

## Sections

The homepage includes five product-themed sections plus a Referrals section (placeholders for real content):

| Section     | Product | Label     | Future content  |
| ----------- | ------- | --------- | --------------- |
| `#projects` | OpenAI  | Projects  | Work experience |
| `#skills`   | Claude  | Skills    | My skills (with logo marquee at bottom) |
| `#code`     | Cursor  | Code      | Hobby projects  |
| `#gems`     | Gemini  | Gems      | Private stuff   |
| `#referrals`| —       | Referrals | What people say (anonymized referral quotes) |

Each section uses brand-aligned colors, typography, and layout. Add your real copy and data in the corresponding components when ready. The Referrals section uses an **AuroraBackground** (animated aurora gradient from `src/components/ui/aurora-background.tsx`) and a scrolling testimonials-style layout (dummy profile icon and title only, no names). It is linked from the side nav with a Smile icon. The custom cursor is not changed over the Referrals section (normal cursor).

### Sticky footer reveal

The end of the page uses a **sticky footer reveal** (inspired by [Dataleap.ai](https://dataleap.ai)): the main content has large rounded bottom corners and a subtle shadow. As you scroll past the last section, the footer (fixed behind the content) is revealed, as if the page lifts away. Implemented with:

- **`StickyFooterReveal`** (`src/components/StickyFooterReveal.tsx`) – Wraps the whole page: main content in a rounded wrapper (`z-10`), a spacer (`min-height: 60vh`) for scroll room, and a **fixed** footer (`z-0`) at the bottom. No JavaScript; layout is responsive using `vh` and `clamp()` for corner radius.
- **`Footer`** (`src/components/Footer.tsx`) – Footer content (links, copyright). Theming uses CSS variables `--footer-bg` and `--footer-fg` in `globals.css`; corner radius is `--footer-reveal-radius` (default `clamp(1.5rem, 5vw, 3rem)`). Tweak these in `globals.css` to change the look.

### Section-aware custom cursor

When the pointer is over one of the four sections, the mouse cursor is replaced by that section’s logo. When hovering over the **AI logo** (fluid menu trigger in the bottom-right), the cursor becomes the AI Searching Lottie animation. Icons and assets live in `public/` and are mapped as follows:

| Area        | Asset / behaviour                          |
| ----------- | ------------------------------------------ |
| `#projects` | `openai-icon.webp`                         |
| `#skills`   | `claude-ai-icon.webp`                       |
| `#code`     | `cursor-icon.png`                          |
| `#gems`     | `google-gemini-icon.webp`                  |
| AI logo     | `AI Searching.json` (Lottie cursor)        |

The custom cursor is disabled when the user prefers reduced motion or has a coarse pointer (e.g. touch). Outside the four sections and the AI logo (e.g. in the hero), the default cursor is shown.

## Navigation

The site uses a **fluid corner menu** in the bottom-right:

- **`FluidMenuNav`** (`src/components/FluidMenuNav.tsx`) – Fixed at bottom-right (`bottom-4 right-4`). The trigger is the **AI logo** (Lottie from `public/AI logo Foriday.json`). Tapping it expands the menu **upward** with nav items (Home, Projects, Skills, Code, Gems, Referrals, Contact). Referrals uses a Smile icon and smooth-scrolls to `#referrals`. Item clicks smooth-scroll to the corresponding section. Built with **`fluid-menu`** UI primitives.

- **`src/components/ui/fluid-menu.tsx`** – `Menu`, `MenuItem`, and `MenuContainer`. `MenuContainer` supports `expandDirection: "up" | "down"` so the stack opens above the trigger (for corner placement) or below.

The previous non-interactive **`AILogoCorner`** and the alternate **`CircleMenuNav`** (circle-menu) are still in the codebase; the root layout currently renders **`FluidMenuNav`** only.

## UI components (shadcn-style)

Reusable UI primitives live in **`src/components/ui/`**. This folder follows the [shadcn/ui](https://ui.shadcn.com/) convention: keeping it separate from feature components (`src/components/`) makes it clear which components are generic building blocks vs. page-specific sections, and keeps the path consistent if you later add more shadcn components via the CLI.

- **`src/components/ui/fluid-menu.tsx`** – Fluid vertical menu: `Menu` (dropdown), `MenuItem`, and `MenuContainer` (expandable stack with optional `expandDirection="up"`). Used by `FluidMenuNav`.
- **`src/components/ui/aurora-background.tsx`** – Animated aurora gradient background (blur + moving gradient, optional radial mask). Used as the background of the Referrals section. Supports `showRadialGradient`; uses CSS variables for colors and `animate-aurora` keyframes from `globals.css`.
- **`src/components/ui/testimonials-columns-1.tsx`** – Scrolling testimonials column (`TestimonialsColumn`) for the Referrals section. Uses `motion` for infinite vertical scroll; displays anonymized items (dummy user icon + title/role only). Exports type `ReferralItem`.
- **`src/components/ui/circle-menu.tsx`** – Animated circular FAB menu (Framer Motion). Used by `CircleMenuNav`; the nav is not currently rendered in the root layout.
- **`src/components/ui/marquee.tsx`** – Horizontal marquee (infinite scroll). Used by `MarqueeDemo` at the bottom of the Skills (Claude) section for a logo strip; supports `direction`, `speed`, and `pauseOnHover`. Custom animation is defined in `globals.css` (`@theme`).
- **`src/components/ui/marquee-demo.tsx`** – Renders the Skills section logo strip via [Logo.dev](https://logo.dev) (logos only). Edit **`MARQUEE_COMPANIES`** to change entries; use `domain` for Logo.dev or `logoSrc` for local assets (e.g. Claude, Gemini use section cursor icons). Set **`NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY`** in `.env.local` for Logo.dev logos.
- **`src/lib/utils.ts`** – `cn()` helper for merging Tailwind classes (used by UI components).

### Marquee logos (Logo.dev)

The Skills section marquee shows company logos and names. To enable logos (otherwise only names are shown):

1. Copy `.env.example` to `.env.local`.
2. In [Logo.dev Dashboard → API Keys](https://logo.dev/dashboard/api-keys), copy your **publishable key** (starts with `pk_`).
3. Set `NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY=pk_...` in `.env.local` and restart the dev server.

To change which companies appear, edit **`MARQUEE_COMPANIES`** in `src/components/ui/marquee-demo.tsx` (each entry: `{ name: "…", domain: "company.com" }` or `{ name: "…", logoSrc: "/local-icon.webp" }` for local assets).

**Attribution (production):** Logo.dev’s free tier requires an attribution link wherever logos are shown. The app already adds “Logos provided by Logo.dev” (linking to https://logo.dev) below the marquee when the API key is set. Requirements: the link must be on your **production** site, **publicly accessible**, and **must not use `rel="noreferrer"`** (referrer must pass). Paid plans remove this requirement. See [Logo.dev attribution](https://www.logo.dev/docs/platform/attribution).

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Unicorn Studio](https://unicorn.studio/) (WebGL hero scene)
- [Framer Motion](https://www.framer.com/motion/) + [motion](https://motion.dev/) (Referrals section) + [lucide-react](https://lucide.dev/) (icons, CircleMenu)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests
