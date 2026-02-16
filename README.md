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

The hero section uses a WebGL scene from **Unicorn Studio** and a **typewriter** headline in the top-left:

- **Typewriter:** Cycles through four phrases with a typing/deleting effect: “👋 Hello, welcome” → “I am Alex Büchel” → “a Senior PM,” → “crafting digital products 💻”. Implemented with `Typewriter` from `src/components/ui/typewriter.tsx`. Font: **Climate Crisis** variable font ([@fontsource-variable/climate-crisis](https://www.npmjs.com/package/@fontsource-variable/climate-crisis)), from [bestfreefonts.com/climate-crisis](https://www.bestfreefonts.com/climate-crisis) / [kampanjat.hs.fi/climatefont](https://kampanjat.hs.fi/climatefont).
- **Project ID:** `i9BQoAQqkzcqJPHn60gG`
- **SDK version:** 2.0.5 (loaded via custom `sdkUrl`)

The scene is rendered with the [unicornstudio-react](https://www.npmjs.com/package/unicornstudio-react) Next.js integration (`unicornstudio-react/next`), with lazy loading and production CDN enabled.

For embed options and docs, see [Unicorn Studio – Embed](https://www.unicorn.studio/docs/embed/).

## Sections

The homepage includes five product-themed sections (placeholders for real content):

| Section     | Product | Label     | Content  |
| ----------- | ------- | --------- | -------- |
| `#projects` | OpenAI  | Selected projects  | Work experience: four case studies (Squat Test, EGYM Genius, Fitness Hub seca edition, Mortgage Comparison Engine Rebuild) with Goal, My role, Key work, Impact; AI chat per project |
| `#skills`   | Claude  | Skills    | My skills (with logo marquee at bottom). **Easter egg:** “best” skills (Product Delivery, forefront of AI, Product Analytics, ML-enabled products, German) use **BestSkillPill**: on hover they show a Claude-colored particle effect and a sparkle icon (see `best-skill-pill.tsx`). |
| `#code`     | Cursor  | Code      | Hobby projects in a Cursor IDE–style view: syntax-highlighted `hobby-projects.ts`, link row (“Open: workwAIse · …”). **Easter egg:** click **Run** in the menu bar to “build” and see the built view inside a single Mac-like browser window (localhost chrome): a **Gallery4** carousel of the four hobby project cards (image, title, description, “Read more”); **View Source** returns to the code view. |
| `#gems`     | Gemini  | Gems      | Private Gems (headline), subheadline “Learn a bit about me besides (and maybe within) work”. Google Gem Manager–style grid with three-dots overflow menu per card; one item “Current favorite” (with star icon) (link out per gem, optional). Data in `src/data/gems.ts`. |
Each section uses brand-aligned colors, typography, and layout. Add your real copy and data in the corresponding components when ready.

### Sticky footer reveal

The end of the page uses a **sticky footer reveal** (inspired by [Dataleap.ai](https://dataleap.ai)): the main content has large rounded bottom corners and a subtle shadow. As you scroll past the last section, the footer (fixed behind the content) is revealed, as if the page lifts away. Implemented with:

- **`StickyFooterReveal`** (`src/components/StickyFooterReveal.tsx`) – Wraps the whole page: main content in a rounded wrapper (`z-10`), a spacer (`min-height: 60vh`) for scroll room, and a **fixed** footer (`z-0`) at the bottom. No JavaScript; layout is responsive using `vh` and `clamp()` for corner radius. **On mobile (viewport ≤768px)** the footer is rendered in normal document flow so the full footer (including Impressum, Datenschutzerklärung, Haftungsausschluss) is scrollable.
- **`Footer`** (`src/components/Footer.tsx`) – Footer content in three zones: (1) left — short message about loving the craft of digital products (Montserrat, same as header); (2) center — “Get in contact” with LinkedIn logo (Lucide `Linkedin` icon, link from `NEXT_PUBLIC_LINKEDIN_URL` in `.env.local`, default `https://www.linkedin.com/in/alexander-büchel/`); (3) right — scaled dachshund image (`public/dachshund-final.png`) and the line “Leave me alone with my footer.” Bottom row (right-aligned): copyright and legal links — **Impressum** (`/impressum`), **Datenschutzerklärung** (`/datenschutz`), **Haftungsausschluss** (`/haftungsausschluss`). Theming uses CSS variables `--footer-bg` and `--footer-fg` in `globals.css`; corner radius is `--footer-reveal-radius`. Tweak these in `globals.css` to change the look.

### Mobile behaviour (viewport ≤768px)

- **Hero:** The scroll-triggered laptop zoom animation is disabled; the hero shows the Unicorn scene and scroll hint only. Implemented via `useIsMobile()` from `src/hooks/useMediaQuery.ts`.
- **Code section “built” view:** The hobby projects are shown as a **vertical stack** of cards (no horizontal carousel) so layout stays readable on narrow screens. The built-view container uses a smaller min-height and max-height on mobile so it fits the viewport and scrolls inside.
- **Footer:** See Sticky footer reveal above — footer is in document flow on mobile so the full footer (including legal links) can be scrolled into view.

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

- **`FluidMenuNav`** (`src/components/FluidMenuNav.tsx`) – Fixed at bottom-right (`bottom-4 right-4`). The trigger is the **AI logo** (Lottie from `public/AI logo Foriday.json`). Tapping it expands the menu **upward** with nav items (Home, Selected projects, Skills, Code, Gems, Contact). Item clicks smooth-scroll to the corresponding section. Built with **`fluid-menu`** UI primitives.

- **`src/components/ui/fluid-menu.tsx`** – `Menu`, `MenuItem`, and `MenuContainer`. `MenuContainer` supports `expandDirection: "up" | "down"` so the stack opens above the trigger (for corner placement) or below.

The previous non-interactive **`AILogoCorner`** and the alternate **`CircleMenuNav`** (circle-menu) are still in the codebase; the root layout currently renders **`FluidMenuNav`** only.

## UI components (shadcn-style)

Reusable UI primitives live in **`src/components/ui/`**. This folder follows the [shadcn/ui](https://ui.shadcn.com/) convention: keeping it separate from feature components (`src/components/`) makes it clear which components are generic building blocks vs. page-specific sections, and keeps the path consistent if you later add more shadcn components via the CLI.

- **`src/components/ui/fluid-menu.tsx`** – Fluid vertical menu: `Menu` (dropdown), `MenuItem`, and `MenuContainer` (expandable stack with optional `expandDirection="up"`). Used by `FluidMenuNav`.
- **`src/components/ui/aurora-background.tsx`** – Animated aurora gradient background (blur + moving gradient, optional radial mask). Supports `showRadialGradient`; uses CSS variables for colors and `animate-aurora` keyframes from `globals.css`.
- **`src/components/ui/testimonials-columns-1.tsx`** – Scrolling testimonials column (`TestimonialsColumn`). Uses `motion` for infinite vertical scroll; displays items (dummy user icon + title/role). Exports type `ReferralItem`.
- **`src/components/ui/circle-menu.tsx`** – Animated circular FAB menu (Framer Motion). Used by `CircleMenuNav`; the nav is not currently rendered in the root layout.
- **`src/components/ui/marquee.tsx`** – Horizontal marquee (infinite scroll). Used by `MarqueeDemo` at the bottom of the Skills (Claude) section for a logo strip; supports `direction`, `speed`, and `pauseOnHover`. Custom animation is defined in `globals.css` (`@theme`).
- **`src/components/ui/marquee-demo.tsx`** – Renders the Skills section logo strip via [Logo.dev](https://logo.dev) (logos only). Edit **`MARQUEE_COMPANIES`** to change entries; use `domain` for Logo.dev or `logoSrc` for local assets (e.g. Claude, Gemini use section cursor icons). Set **`NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY`** in `.env.local` for Logo.dev logos.
- **`src/lib/utils.ts`** – `cn()` helper for merging Tailwind classes (used by UI components).
- **`src/components/ui/compare.tsx`** – Compare (image before/after slider) and CompareContent; optional for other uses (Code section uses Run / View Source toggle instead).
- **`src/components/ui/button.tsx`** – **Button**: shadcn-style button (variants: default, ghost, outline, etc.). Used by Carousel and Gallery4.
- **`src/components/ui/carousel.tsx`** – **Carousel**: Embla-based carousel (CarouselContent, CarouselItem, setApi). Used by Gallery4.
- **`src/components/ui/gallery4.tsx`** – **Gallery4**: horizontal carousel of cards (image, gradient overlay, title, description, “Read more”). On mobile (≤768px) it renders a vertical stack instead of the carousel. Used in the Code section’s “built” view inside the Mac browser frame; accepts `items` (Gallery4Item[]), optional `title`, `description`, and `action` (e.g. View Source button).
- **`src/components/ui/background-gradient.tsx`** – **BackgroundGradient**: animated gradient border (Framer Motion). Available for other uses.
- **`src/components/ui/spotlight-card.tsx`** – **GlowCard**: cursor-follow spotlight glow card (available for other uses).
- **`src/components/ui/sparkles.tsx`** – **SparklesCore** (tsparticles). Used by the Compare component for the slider handle sparkles.
- **`src/components/ui/best-skill-pill.tsx`** – **BestSkillPill**: pill badge with Claude colors; on hover shows tsparticles star burst and sparkle icon (used in Skills section for “best” skills). Requires `tsparticles` (full bundle) for emitters/absorbers.
- **`src/components/ui/button-8.tsx`** – Demo button with particle effect on hover (blue/purple gradient, Sparkle icons). Reference implementation for the best-skill pill; not used in the app.
- **`src/data/hobby-projects.ts`** – Data for the Code section: four hobby projects (title, link, description, tech, details; optional `previewImageUrl` for card images).
- **`src/data/gems.ts`** – Data for the Gems section: eight personal gems (title, shortDescription, icon, iconColor, optional favoriteLink) for the Gem Manager–style grid; each card has a three-dots menu with “Current favorite” (star icon; links to favoriteLink when set).

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
- [Framer Motion](https://www.framer.com/motion/) + [motion](https://motion.dev/) + [lucide-react](https://lucide.dev/) (icons, CircleMenu)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react) for tests
