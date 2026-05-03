export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: number;
  tags: string[];
  content: string;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
