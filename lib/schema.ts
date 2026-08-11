export const SITE_URL = "https://anuragnigam.in";
export const AUTHOR_ID = `${SITE_URL}/#person`;

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

export function createBlogPostingSchema({
  title,
  description,
  slug,
  image,
  publishedAt,
  modifiedAt = publishedAt,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image,
    datePublished: publishedAt,
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
