import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/cursor";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/google-analytics";

export const metadata: Metadata = {
  title: {
    default: "Anurag Nigam | SDE II at SpotDraft | AI & Software Engineer",
    template: "%s | Anurag Nigam",
  },
  description:
    "Anurag Nigam is an SDE II at SpotDraft in Bengaluru, building scalable web systems, AI agents, and high-performance products with Angular and React.",
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
  authors: [{ name: "Anurag Nigam", url: "https://www.anuragnigam.in" }],
  metadataBase: new URL("https://www.anuragnigam.in"),
  openGraph: {
    type: "website",
    url: "https://www.anuragnigam.in",
    title: "Anurag Nigam | SDE II at SpotDraft | AI & Software Engineer",
    description:
      "Anurag Nigam is a Software Development Engineer II at SpotDraft in Bengaluru with 4+ years of experience building scalable web systems and AI-powered products.",
    siteName: "Anurag Nigam",
    images: [
      {
        url: "https://www.anuragnigam.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Anurag Nigam - SDE II at SpotDraft and AI & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anuragnigam_",
    creator: "@anuragnigam_",
    title: "Anurag Nigam | SDE II at SpotDraft | AI & Software Engineer",
    description:
      "Anurag Nigam is a Software Development Engineer II at SpotDraft in Bengaluru with 4+ years of experience building scalable web systems and AI-powered products.",
    images: ["https://www.anuragnigam.in/logo.png"],
  },
  robots: { index: true, follow: true },
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
      </head>
      <body className="bg-[#09090B] text-[#F4F4F5] font-sans antialiased">
        <Cursor />
        {children}
        <Analytics />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
