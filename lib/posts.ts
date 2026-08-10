export type PostSource = "medium" | "linkedin" | "native";

export interface ExternalPost {
  title: string;
  summary: string;
  date: string;
  url: string;
  slug?: string;
  image?: string;
  tags: string[];
  readingTime: number;
  source: PostSource;
}

export const posts: ExternalPost[] = [
  {
    title: "An Articulate Coin Flip, or Something Better",
    summary:
      "I asked my AI if I should buy gold. It gave me entry, stop, and target. Then I asked what it just did. That question led to a method, a logged experiment, and a six-month public scorecard.",
    date: "2026-08-10",
    url: "/blog/an-articulate-coin-flip",
    slug: "an-articulate-coin-flip",
    image: "/blog-algo-trading.png",
    tags: ["AI", "Investing", "Trading"],
    readingTime: 5,
    source: "native",
  },
  {
    title: "Building My Investor Operating System",
    summary:
      "I have always been curious about investing, private equity, and venture capital, so I decided to turn that curiosity into a small experiment. I built an AI research desk, ran its first analysis, and chose ICICI Bank as the first live test. More to come.",
    date: "2026-08-02",
    url: "/blog/building-my-investor-operating-system",
    slug: "building-my-investor-operating-system",
    image: "https://pbs.twimg.com/media/HOs1-e7aYAA3ZGd?format=jpg&name=large",
    tags: ["AI", "Investing", "Building"],
    readingTime: 6,
    source: "native",
  },
  {
    title: "React: Diffing Algorithm, Keys and Why You Should Not Use Index as Key",
    summary:
      "A deep dive into how React's reconciliation engine works under the hood: why keys matter, how the diffing algorithm uses them, and the three concrete problems that arise when you use array indices instead of stable identifiers.",
    date: "2024-05-16",
    url: "https://medium.com/@anuraga091/reacts-diffing-algorithm-keys-and-why-should-we-not-use-index-as-key-394fe5c4d0a0",
    tags: ["React", "Performance", "JavaScript"],
    readingTime: 5,
    source: "medium",
  },
  {
    title: "Frontend is Not Just Changing Button Colors: Real DSA in Production",
    summary:
      "How I used dependency graphs, BFS, topological ordering, and memoization to fix a multi-second UI lag at SpotDraft. The DSA concepts from interview prep have very real applications in frontend engineering.",
    date: "2024-09-10",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7405513352027832320/",
    tags: ["Performance", "DSA", "Frontend"],
    readingTime: 3,
    source: "linkedin",
  },
  {
    title: "Setting Up Your Custom Email for Free",
    summary:
      "A step-by-step guide to getting a professional custom email address without paying for a plan. Because me@anuragnigam.in hits different than gmail.",
    date: "2025-01-16",
    url: "https://medium.com/@anuraga091/setting-up-your-custom-email-for-free-5aad8372f491",
    tags: ["Tutorial", "Productivity"],
    readingTime: 4,
    source: "medium",
  },
];

export function formatPostDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
