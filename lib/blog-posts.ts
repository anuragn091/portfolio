import type { BlogPostConfig } from "@/lib/schema";

export interface NativeBlogPost extends BlogPostConfig {
  summary: string;
  date: string;
  heroAlt: string;
  tags: string[];
  readingTime: number;
}

export const nativeBlogPosts = {
  angularFormLatency: {
    title: "How I Reduced an Angular Form's Latency From 5 Seconds to 50 Milliseconds",
    description:
      "A form with hundreds of conditional fields froze for seconds on every keystroke. It looked like API latency. Profiling said otherwise.",
    twitterDescription:
      "A form with hundreds of conditional fields froze on every keystroke. It looked like API latency. It was a dependency problem.",
    summary:
      "A contract form with hundreds of conditional fields froze for seconds on every keystroke. It looked like API latency, but the data had already loaded and the main thread was blocked. Here is how dependency-aware recomputation fixed it, and what it taught us about cloning in hot paths.",
    slug: "angular-form-latency-5s-to-50ms",
    image: "/blog-angular-form-latency.png",
    imageAlt:
      "Dependency graph showing only the affected chain being recomputed, reducing latency from 5s to 50ms",
    heroAlt:
      "Dependency-aware recomputation: only the affected chain is recomputed, the rest is skipped",
    publishedAt: "2026-08-17T00:00:00+05:30",
    date: "2026-08-17",
    tags: ["Performance", "Angular", "DSA"],
    readingTime: 8,
    keywords: [
      "angular performance optimization",
      "frontend performance",
      "dependency graph frontend",
      "topological sort javascript",
      "memoization",
      "cache invalidation",
      "structuredClone",
      "deep clone performance",
      "main thread blocking",
      "long tasks",
      "javascript performance profiling",
      "conditional form fields",
      "web performance debugging",
    ],
  },
  articulateCoinFlip: {
    title: "An Articulate Coin Flip, or Something Better",
    description:
      "I asked my AI if I should buy gold. It gave me entry, stop, and target. Then I asked what it just did. That question led to a method, a logged experiment, and a six-month public scorecard.",
    twitterDescription:
      "I asked my AI if I should buy gold. It gave me entry, stop, and target. That question led to a method, a logged experiment, and a six-month public scorecard.",
    summary:
      "I asked my AI if I should buy gold. It gave me entry, stop, and target. Then I asked what it just did. That question led to a method, a logged experiment, and a six-month public scorecard.",
    slug: "an-articulate-coin-flip",
    image: "/blog-algo-trading.png",
    imageAlt: "AI vs algo trading - an experiment in AI-powered investment forecasting",
    heroAlt: "Algo Trading - An Articulate Coin Flip",
    publishedAt: "2026-08-10T00:00:00+05:30",
    date: "2026-08-10",
    tags: ["AI", "Investing", "Trading"],
    readingTime: 5,
    keywords: [
      "algo trading",
      "algorithmic trading",
      "AI trading",
      "AI investing",
      "AI stock analysis",
      "gold trading strategy",
      "AI market forecast",
      "investment AI agent",
      "trading with AI",
      "AI vs algo trading",
      "automated investing",
      "AI financial analysis",
    ],
  },
  investorOperatingSystem: {
    title: "Building My Investor Operating System",
    description:
      "I have always been curious about investing, so I decided to turn that curiosity into an experiment. I built an AI research desk, ran its first analysis, and chose ICICI Bank as the first live test.",
    summary:
      "I have always been curious about investing, private equity, and venture capital, so I decided to turn that curiosity into a small experiment. I built an AI research desk, ran its first analysis, and chose ICICI Bank as the first live test. More to come.",
    slug: "building-my-investor-operating-system",
    image: "https://pbs.twimg.com/media/HOs1-e7aYAA3ZGd?format=jpg&name=large",
    imageAlt: "Building My Investor Operating System - AI research desk",
    heroAlt: "Investor OS research desk - running the full pipeline",
    publishedAt: "2026-08-02T00:00:00+05:30",
    date: "2026-08-02",
    tags: ["AI", "Investing", "Building"],
    readingTime: 6,
  },
} satisfies Record<string, NativeBlogPost>;
