"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportConfig } from "@/lib/motion";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedCounter from "@/components/ui/animated-counter";
import Image from "next/image";

const stats = [
  { value: 4, suffix: "+", label: "Years experience", prefix: "" },
  { value: 400, suffix: "+", label: "Hospitals impacted", prefix: "" },
  { value: 10, suffix: "+", label: "Features shipped", prefix: "" },
  { value: 99, suffix: "%", label: "Latency reduction", prefix: "" },
];

const facts = [
  "Software Development Engineer II at SpotDraft, promoted July 2026 - building complex legal-tech UI systems",
  "Previously founding engineer at Janitri, building real-time labor monitoring for hospitals",
  "Building AI agents and LLM-powered tools for investing, research, and automation",
  "Obsessed with performance: dependency graphs, memoization, topological sorting",
  "B.Tech ECE, Ramaiah University, Bangalore (CGPA 8.29)",
  "Working on billion-dollar ideas on weekends 🚀",
];

export default function About() {
  return (
    <section id="about" className="relative pt-16 pb-20 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex items-center gap-4 mb-8"
            >
              <Image
                src="/anurag-nigam-software-engineer.jpg"
                alt="Anurag Nigam, SDE II at SpotDraft in Bengaluru"
                width={72}
                height={72}
                className="rounded-2xl object-cover border border-white/10"
              />
              <div>
                <p className="text-white font-bold text-lg leading-tight">Anurag Nigam</p>
                <p className="text-[#71717A] text-sm mt-0.5">
                  Software Development Engineer II at SpotDraft, Bengaluru
                </p>
              </div>
            </motion.div>

            <SectionHeading
              eyebrow="About"
              title="Engineering with craft and conviction"
              description="I care about the full picture: not just making things work, but making them fast, maintainable, and a pleasure to use."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="space-y-4 mt-8"
            >
              {facts.map((fact, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-[#A1A1AA] text-sm sm:text-base"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#F97316] flex-shrink-0" />
                  {fact}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="mt-10 flex flex-wrap gap-3"
            >
              <a
                href="https://github.com/anuragn091"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-[#A1A1AA] hover:text-white hover:border-white/20 transition-all"
              >
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/anuragn091/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-[#A1A1AA] hover:text-white hover:border-white/20 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="mailto:me@anuragnigam.in"
                className="px-5 py-2.5 rounded-lg bg-[#F97316]/10 border border-[#F97316]/20 text-sm font-medium text-[#F97316] hover:bg-[#F97316]/20 transition-all"
              >
                me@anuragnigam.in
              </a>
            </motion.div>
          </div>

          {/* Right: stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass rounded-2xl p-6 group hover:border-[#F97316]/20 transition-colors"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)" }}
              >
                <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">
                  <AnimatedCounter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1600}
                    className="gradient-text"
                  />
                </div>
                <p className="text-sm text-[#71717A] font-medium leading-tight">{stat.label}</p>
              </motion.div>
            ))}

            {/* Stack card */}
            <motion.div
              variants={fadeUp}
              className="col-span-2 glass rounded-2xl p-6"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#52525B] mb-4">
                Primary stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["Angular", "React", "TypeScript", "Next.js", "Node.js", "AI Agents", "LLMs", "AWS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-white/[0.04] border border-white/[0.08] text-[#A1A1AA]"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
