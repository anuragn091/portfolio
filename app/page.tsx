import type { Metadata } from "next";
import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Writing from "@/components/sections/writing";
import Contact from "@/components/sections/contact";
import { profilePageSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
