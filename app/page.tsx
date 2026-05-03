import dynamic from "next/dynamic";
import Nav from "@/components/nav";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Skills from "@/components/sections/skills";
import Writing from "@/components/sections/writing";
import Contact from "@/components/sections/contact";

const Cursor = dynamic(() => import("@/components/cursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <Cursor />
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
