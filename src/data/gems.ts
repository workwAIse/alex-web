export type GemIconName =
  | "sparkles"
  | "code-2"
  | "activity"
  | "book-open"
  | "users"
  | "map-pin"
  | "search"
  | "mic";

export type Gem = {
  id: string;
  title: string;
  shortDescription: string;
  icon: GemIconName;
  iconColor: string;
  /** Optional "Favorite" link; when absent, menu still shows but item has no href. */
  favoriteLink?: string;
};

const gems: Gem[] = [
  {
    id: "always-moving",
    title: "Sport Lover",
    shortDescription:
      "Group training, running, cycling — and always exploring new group sports to stay energized and sharp.",
    icon: "activity",
    iconColor: "#10B981",
    favoriteLink: "https://www.beat81.com",
  },
  {
    id: "books-worlds",
    title: "Avid Reader",
    shortDescription:
      "From PM classics (Teresa Torres) to fantasy and sci-fi — I love good books and great storytelling.",
    icon: "book-open",
    iconColor: "#FB7185",
    favoriteLink:
      "https://www.amazon.de/Blood-Song-Book-Ravens-Shadow/dp/0356502481",
  },
  {
    id: "city-collector",
    title: "City Collector",
    shortDescription:
      "I love discovering new countries (especially cities) and learning culture through food, people, and history.",
    icon: "map-pin",
    iconColor: "#FB923C",
    favoriteLink: "https://www.google.com/maps/place/New+York",
  },
  {
    id: "ai-playground",
    title: "AI Explorer",
    shortDescription:
      "Experimenting with LLMs and AI workflows — stay at the forefront of whats possible now.",
    icon: "sparkles",
    iconColor: "#A78BFA",
    favoriteLink: "https://cursor.com",
  },
  {
    id: "curiosity-engine",
    title: "Lifelong Learner",
    shortDescription:
      "Always learning something new — and connecting dots across tech, products, and completely random topics.",
    icon: "search",
    iconColor: "#FACC15",
    favoriteLink: "https://www.doppelgaenger.io/",
  },
  {
    id: "people-fuel",
    title: "People Enthusiast",
    shortDescription:
      "I get energy from meeting friends, exchanging ideas, and being around people I genuinely like.",
    icon: "users",
    iconColor: "#38BDF8",
  },
  {
    id: "side-projects",
    title: "Product Builder",
    shortDescription:
      "Building small tools and products — mostly because I love the art of craft.",
    icon: "code-2",
    iconColor: "#3B82F6",
    favoriteLink: "https://github.com/workwAIse?tab=repositories",
  },
  {
    id: "speaker",
    title: "Confident Presenter",
    shortDescription:
      "Sharing ideas and presenting to audiences. Sometimes even on a big stage.",
    icon: "mic",
    iconColor: "#A855F7",
    favoriteLink:
      "https://youtu.be/NNas1HOY0jM?si=T5yvNkr_9HRnazmL&t=365",
  },
];

export default gems;
