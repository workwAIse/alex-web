export type HobbyProject = {
  title: string;
  link: string;
  description: string;
  tech: string;
  details: string[];
  previewImageUrl?: string;
};

const hobbyProjects: HobbyProject[] = [
  {
    title: "workwAIse — AI Chat Interface",
    link: "https://www.workwaise.app/home",
    description:
      "AI chat with built-in prompt engineering.",
    tech: "Next.js, Vercel AI SDK, Neon DB, Tailwind",
    details: [
      "Built a clean, extensible AI assistant interface from scratch.",
      "Integrated Vercel AI SDK with Neon for persistence.",
      "Focus on context persistence + conversational UX for product workflows.",
    ],
  },
  {
    title: "CV Website",
    link: "https://alexbuechel.framer.ai",
    description: "Fersonal CV site built in Framer.",
    tech: "Framer",
    details: [
      "Rapid no-code design iteration for personal branding.",
      "Experimented with layout and visual expression without code.",
      "Served as prototype to inform my later code-based CV.",
    ],
  },
  {
    title: "Portfolio Website",
    link: "https://alexb-ai.vercel.app",
    description:
      "Portfolio site leveraging AI, animations, and interactive visuals.",
    tech: "Next.js, OpenAI SDK, Unicorn Studio, Lottie",
    details: [
      "Full code implementation of personal site with AI extensions.",
      "Leveraged Lottie + Unicorn Studio for expressive visuals.",
      "Experimented with AI-powered interactions and UI.",
    ],
  },
  {
    title: "Stance — AI Persona Panel & User Feedback",
    link: "https://stance-ai.vercel.app",
    description:
      "AI persona panel + user research feedback platform for product teams.",
    tech: "Next.js, Supabase, OpenAI SDK, Tailwind",
    details: [
      "Built a tool to enable product teams to structure qualitative feedback.",
      "Combined Supabase backend with Next.js frontend.",
      "AI used for thematic tagging & summarization of feedback.",
    ],
  },
];

export default hobbyProjects;
