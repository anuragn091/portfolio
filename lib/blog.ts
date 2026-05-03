import fs from "fs";
import path from "path";
import matter from "gray-matter";
export type { BlogPost } from "./blog-shared";
export { formatDate } from "./blog-shared";
import type { BlogPost } from "./blog-shared";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const filePath = path.join(BLOG_DIR, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);

      return {
        slug,
        title: data.title ?? "Untitled",
        summary: data.summary ?? "",
        date: data.date ?? "",
        readingTime: calculateReadingTime(content),
        tags: data.tags ?? [],
        content,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    summary: data.summary ?? "",
    date: data.date ?? "",
    readingTime: calculateReadingTime(content),
    tags: data.tags ?? [],
    content,
  };
}
