"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import SectionHeading from "@/components/ui/section-heading";
import Marquee from "@/components/ui/marquee";

const row1 = [
  "React", "TypeScript", "Next.js", "Redux", "React Query", "Tailwind CSS",
  "Node.js", "Express.js", "Angular", "RxJS", "Framer Motion", "Webpack",
];

const row2 = [
  "AWS", "Figma", "PostgreSQL", "MongoDB", "Firebase", "Docker",
  "Jest", "Datadog", "Git", "REST APIs", "GraphQL", "Vercel",
];

const categories = [
  {
    name: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "React Query", "Angular", "RxJS"],
    color: "#6366F1",
  },
  {
    name: "Backend & Infra",
    skills: ["Node.js", "Express.js", "AWS (EC2, S3, Lambda)", "PostgreSQL", "MongoDB", "Firebase", "REST APIs"],
    color: "#10B981",
  },
  {
    name: "Tools & Process",
    skills: ["Git", "Figma", "Jest", "Datadog", "Google Analytics", "JIRA", "Webpack", "Vite"],
    color: "#F97316",
  },
  {
    name: "Fundamentals",
    skills: ["DSA", "OOP", "System Design", "Performance Optimization", "Responsive Design", "Accessibility"],
    color: "#8B5CF6",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Skills"
          title="Technology I work with"
          description="From UI systems and state management to cloud infrastructure and observability."
        />
      </div>

      {/* Marquee rows */}
      <div className="space-y-3 mb-16">
        <Marquee items={row1} direction="left" />
        <Marquee items={row2} direction="right" />
      </div>

      {/* Skill category grid */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              className="glass rounded-2xl p-5 group hover:border-opacity-30 transition-all"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <h3 className="text-xs font-semibold tracking-widest uppercase" style={{ color: cat.color }}>
                  {cat.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded-md text-xs text-[#A1A1AA] bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:text-white transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
