import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anurag's Portfolio | Software Engineer",
  description: "Software Engineer specializing in React, Next.js, Angular, JavaScript, React Native and modern web technologies. Creating and scaling responsive, accessible, and performant web and mobile applications.",
  keywords: [
    "React", 
    "Next.js", 
    "Angular", 
    "JavaScript", 
    "React Native", 
    "Web", 
    "Mobile", 
    "Frontend Developer",
    "Software Engineer",
    "frontend developer",
    "web developer",
    "React developer",
    "React Native developer",
    "Next.js developer",
    "UI/UX",
    "JavaScript",
    "TypeScript",
    "responsive design",
  ],
  authors: [
    {
      name: "Anurag",
      url: "https://anuragnigam.in",
    }
  ],
  creator: "Anurag",
  publisher: "Anurag",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
