import type { Metadata } from "next";

export const SITE_URL = "https://anuragnigam.in";
export const AUTHOR_ID = `${SITE_URL}/#person`;

export interface BlogPostConfig {
  title: string;
  description: string;
  slug: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  modifiedAt?: string;
  twitterDescription?: string;
  keywords?: string[];
}

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  mainEntity: {
    "@type": "Person",
    "@id": AUTHOR_ID,
    name: "Anurag Nigam",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/avatar.png`,
    description:
      "Software Development Engineer II at SpotDraft. Software and AI engineer based in Bengaluru, India.",
    jobTitle: "Software Development Engineer II",
    worksFor: {
      "@type": "Organization",
      name: "SpotDraft",
      url: "https://www.spotdraft.com/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/anuragn091",
      "https://www.linkedin.com/in/anuragn091/",
      "https://peerlist.io/anuragnigam",
      "https://twitter.com/anuragnigam_",
    ],
    knowsAbout: [
      "Software Engineering",
      "Frontend Engineering",
      "Artificial Intelligence",
      "AI Agents",
      "Angular",
      "React",
      "Next.js",
      "TypeScript",
      "Web Performance",
    ],
  },
};

export function createBlogPostMetadata(post: BlogPostConfig): Metadata {
  const path = `/blog/${post.slug}`;
  const modifiedAt = post.modifiedAt ?? post.publishedAt;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: "Anurag Nigam", url: SITE_URL }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: post.title,
      description: post.description,
      authors: ["Anurag Nigam"],
      publishedTime: post.publishedAt,
      modifiedTime: modifiedAt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@anuragnigam_",
      creator: "@anuragnigam_",
      title: post.title,
      description: post.twitterDescription ?? post.description,
      images: [post.image],
    },
  };
}

export function createBlogPostingSchema(post: BlogPostConfig) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const modifiedAt = post.modifiedAt ?? post.publishedAt;
  const image = post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image,
    datePublished: post.publishedAt,
    dateModified: modifiedAt,
    author: {
      "@type": "Person",
      "@id": AUTHOR_ID,
      name: "Anurag Nigam",
      url: `${SITE_URL}/`,
    },
    publisher: {
      "@type": "Person",
      "@id": AUTHOR_ID,
      name: "Anurag Nigam",
    },
  };
}
