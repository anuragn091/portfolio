"use client";

import SectionHeading from "@/components/ui/section-heading";
import { fadeUp, stagger, viewportConfig } from "@/lib/motion";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    company: "SpotDraft",
    role: "Software Engineer",
    period: "Aug 2024 - Present",
    location: "Bengaluru, KA",
    type: "Full-time",
    color: "#6366F1",
    metrics: [
      { label: "Latency reduced", value: "5s → 50ms", sub: "99% improvement" },
      { label: "Features shipped", value: "10+", sub: "end-to-end" },
    ],
    bullets: [
      "Leading a foundational initiative to rethink how contracts are created on the platform (in progress)",
      "Built Computation Builder & Library: a VS Code-like editor with a TypeScript-like evaluation language, enabling customers to self-serve complex computations",
      "Optimized contract creation workflows using dependency graphs, memoization, and topological sorting, achieving 99% latency improvement (5s to 50ms)",
      "Owned and delivered 10+ medium to large frontend features from technical design through production",
      "Designed modular frontend libraries in a micro-frontend monorepo using OOP-based abstractions",
      "Participated in frontend on-call, debugging production performance and reliability issues",
      "Mentored juniors through architecture walkthroughs and code reviews",
    ],
    tech: ["React", "TypeScript", "Micro-frontend", "OOP", "Dependency Graphs"],
  },
  {
    company: "Janitri Innovations",
    role: "Founding Product Engineer",
    period: "Mar 2023 - Apr 2024",
    location: "Bengaluru, KA",
    type: "Full-time",
    color: "#10B981",
    metrics: [
      { label: "Hospitals using platform", value: "400+", sub: "live deployments" },
      { label: "p90 performance gain", value: "80%", sub: "improvement" },
      { label: "Bundle size reduction", value: "20%", sub: "via code splitting" },
    ],
    bullets: [
      "Architected and built real-time labor monitoring web solutions used by 400+ hospitals",
      "Improved application performance by 80% at p90 and reduced bundle size by 20% through virtualization and code splitting",
      "Led a 10-member product team, establishing engineering and delivery processes",
    ],
    tech: ["React", "React Native", "WebSockets", "Virtualization", "Code Splitting"],
  },
  {
    company: "Realate",
    role: "Founder",
    period: "Aug 2023 - Apr 2024",
    location: "",
    type: "Side Project",
    color: "#F43F5E",
    metrics: [],
    bullets: [
      "Built a dating app designed to bring real conversations back, replacing mindless swiping with word-based matching and genuine connection",
      "Owned product, design, and engineering end-to-end alongside full-time work at Janitri",
      "Shipped to users targeting the social networking space with a focus on substance over surface",
    ],
    tech: ["React Native", "Node.js", "Product Design"],
  },
  {
    company: "Hart",
    role: "Founder & CTO",
    period: "Oct 2022 - Jul 2023",
    location: "Bengaluru, KA",
    type: "Founder",
    color: "#EC4899",
    metrics: [
      { label: "Accelerator batch", value: "GSF '22", sub: "Winter cohort" },
      { label: "Selected from", value: "Top 200", sub: "founders nationally" },
    ],
    bullets: [
      "Co-founded Hart, a healthtech startup focused on patient monitoring and care workflows",
      "Selected for GSF Academy Winter '22 batch by GSF Accelerator, among top 200 founders nationally",
      "Owned product, engineering, and go-to-market end-to-end as the technical co-founder",
      "Explored adjacent consumer space in parallel, laying groundwork for what became Realate",
    ],
    tech: ["React Native", "Node.js", "Product Strategy", "Healthtech"],
  },
  {
    company: "Fountain9",
    role: "Frontend Developer Intern",
    period: "Sept 2022 - Feb 2023",
    location: "Remote",
    type: "Internship",
    color: "#F59E0B",
    metrics: [],
    bullets: [
      "Built and maintained frontend features for analytics dashboards",
      "Worked with React and TypeScript in an agile team environment",
    ],
    tech: ["React", "TypeScript", "Analytics"],
  },
  {
    company: "Omniflo",
    role: "Software Developer Intern",
    period: "Jun 2022 - Aug 2022",
    location: "Remote",
    type: "Internship",
    color: "#8B5CF6",
    metrics: [],
    bullets: [
      "Developed UI components for logistics management platform",
      "Collaborated on API integration and state management",
    ],
    tech: ["React", "REST APIs"],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative py-28 bg-[#0A0A0F]">
      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've built things"
          description="From founding-stage startups to growth-stage product companies. I've owned complex features end-to-end."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F97316]/40 via-white/[0.06] to-transparent hidden md:block" />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <motion.div key={exp.company} variants={fadeUp}>
                <div
                  className="relative md:pl-16 group cursor-pointer"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-[18px] top-6 w-3 h-3 rounded-full border-2 border-[#F97316] bg-[#09090B] hidden md:block"
                    animate={{ scale: expanded === i ? 1.4 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />

                  <div
                    className="glass rounded-2xl p-6 transition-all duration-300 hover:border-[#F97316]/15"
                    style={{
                      boxShadow:
                        expanded === i
                          ? `0 0 0 1px rgba(249,115,22,0.2), 0 8px 40px rgba(0,0,0,0.5)`
                          : "0 0 0 1px rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white">{exp.company}</h3>
                          <span
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{ background: `${exp.color}20`, color: exp.color }}
                          >
                            {exp.type}
                          </span>
                        </div>
                        <p className="text-[#F97316] font-medium text-sm">{exp.role}</p>
                        <p className="text-[#52525B] text-xs font-mono mt-1">
                          {exp.period}{exp.location ? ` · ${exp.location}` : ""}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: expanded === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#52525B] mt-1 flex-shrink-0"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>

                    {/* Metrics (always visible for main roles) */}
                    {exp.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {exp.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F97316]/[0.08] border border-[#F97316]/15"
                          >
                            <span className="text-sm font-bold text-[#F97316] font-mono">{m.value}</span>
                            <span className="text-xs text-[#71717A]">{m.sub}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Expandable content */}
                    <AnimatePresence>
                      {expanded === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="mt-5 pt-5 border-t border-white/[0.06]">
                            <ul className="space-y-2.5 mb-5">
                              {exp.bullets.map((b, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F97316] flex-shrink-0" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.07] text-[#71717A]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
