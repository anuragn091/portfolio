import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/cursor";

export const metadata: Metadata = {
  title: "Anurag Nigam | Software Engineer",
  description:
    "Frontend engineer with 3.5+ years building scalable web applications. Specialized in performance optimization, complex UI systems, and owning features end-to-end.",
  keywords: ["Frontend Engineer", "React", "Next.js", "TypeScript", "Software Engineer", "Bengaluru"],
  authors: [{ name: "Anurag Nigam", url: "https://anuragnigam.in" }],
  openGraph: {
    type: "website",
    url: "https://anuragnigam.in",
    title: "Anurag Nigam | Software Engineer",
    description:
      "Frontend engineer specializing in performance optimization and complex UI systems.",
    siteName: "Anurag Nigam",
  },
  twitter: {
    card: "summary_large_image",
    site: "@anuragnigam_",
    creator: "@anuragnigam_",
    title: "Anurag Nigam | Software Engineer",
    description: "Frontend engineer specializing in performance optimization and complex UI systems.",
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
      </body>
    </html>
  );
}
