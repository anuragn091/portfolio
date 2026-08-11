import { nativeBlogPosts } from "@/lib/blog-posts";

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

const nativePosts: ExternalPost[] = Object.values(nativeBlogPosts).map((post) => ({
  title: post.title,
  summary: post.summary,
  date: post.date,
  url: `/blog/${post.slug}`,
  slug: post.slug,
  image: post.image,
  tags: post.tags,
  readingTime: post.readingTime,
  source: "native",
}));

export const posts: ExternalPost[] = [
  ...nativePosts,
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
