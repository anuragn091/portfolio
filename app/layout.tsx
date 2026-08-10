import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/cursor";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Anurag Nigam | Software Engineer & AI Engineer",
  description:
    "Software and AI engineer with 4+ years building scalable web apps and AI-powered tools. Specialized in React, Next.js, TypeScript, LLM integrations, and AI agent systems.",
  keywords: [
    "Anurag Nigam",
    "Software Engineer",
    "Software Development Engineer II",
    "SDE-2",
    "AI Engineer",
    "AI Developer",
    "Frontend Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Engineer",
    "LLM Engineer",
    "AI Agent Developer",
    "Agent Skills",
    "GenAI Developer",
    "AI Applications",
    "Product Engineer",
    "JavaScript Developer",
    "Web Developer",
    "Performance Optimization",
    "Bengaluru",
    "India",
    "Portfolio",
  ],
  authors: [{ name: "Anurag Nigam", url: "https://anuragnigam.in" }],
  metadataBase: new URL("https://anuragnigam.in"),
  alternates: { canonical: "https://anuragnigam.in" },
  openGraph: {
    type: "website",
    url: "https://anuragnigam.in",
    title: "Anurag Nigam | Software Engineer & AI Engineer",
    description:
      "Software and AI engineer building scalable web apps and AI-powered tools. React, Next.js, TypeScript, LLM integrations.",
    siteName: "Anurag Nigam",
    images: [
      {
        url: "https://anuragnigam.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Anurag Nigam - Software Engineer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anuragnigam_",
    creator: "@anuragnigam_",
    title: "Anurag Nigam | Software Engineer & AI Engineer",
    description:
      "Software and AI engineer building scalable web apps and AI-powered tools. React, Next.js, TypeScript, LLM integrations.",
    images: ["https://anuragnigam.in/logo.png"],
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anurag Nigam",
  url: "https://anuragnigam.in",
  sameAs: [
    "https://github.com/anuragn091",
    "https://www.linkedin.com/in/anuragn091/",
    "https://twitter.com/anuragnigam_",
  ],
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Freelance" },
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="bg-[#09090B] text-[#F4F4F5] font-sans antialiased">
        <Cursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
