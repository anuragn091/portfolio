"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp, viewportConfig } from "@/lib/motion";
import SectionHeading from "@/components/ui/section-heading";
import { ExternalLink, Zap, Building2, Bot } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const projects = [
  {
    name: "Zpply.in",
    tagline: "AI-powered job application automation",
    description:
      "Continuously scans job boards, matches relevant opportunities using rule-based and ML-assisted criteria, and auto-submits applications for scalable workflow automation.",
    tech: ["Next.js", "Django", "AWS", "React Query", "TypeScript", "Claude AI"],
    icon: Bot,
    color: "#6366F1",
    links: { live: "https://zpply.in", github: null },
    badge: "Live Product",
    featured: true,
  },
  {
    name: "Voyager",
    tagline: "Blockchain transaction explorer",
    description:
      "A React-based replica of the Voyager transaction explorer interface with custom infinite scroll, conditional navigation logic, and tooltip-rich transaction detail views.",
    tech: ["React", "Tailwind CSS", "Infinite Scroll", "REST APIs"],
    icon: Zap,
    color: "#F97316",
    links: { live: null, github: "https://github.com/anuragn091/voyager" },
    badge: "Open Source",
    featured: true,
  },
  {
    name: "Folder File Browser",
    tagline: "VS Code-like file navigation",
    description:
      "A TypeScript React app that replicates the file/folder browsing experience of VS Code with an expandable tree structure, configurable file hierarchy, and editor-like UX.",
    tech: ["React", "TypeScript", "CSS"],
    icon: Building2,
    color: "#10B981",
    links: { live: null, github: "https://github.com/anuragn091/folder-file-browser" },
    badge: "Open Source",
    featured: false,
  },
  {
    name: "Chat App",
    tagline: "Real-time messaging platform",
    description:
      "Full-stack real-time chat application with WebSocket-powered instant messaging, user authentication, and a clean, responsive UI.",
    tech: ["React", "Node.js", "WebSockets", "MongoDB"],
    icon: Bot,
    color: "#8B5CF6",
    links: { live: null, github: "https://github.com/anuragn091/chat-app" },
    badge: "Full Stack",
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;
    const rotateY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.transition = "transform 0.1s ease-out";

    const glare = card.querySelector<HTMLElement>(".card-glare");
    if (glare) {
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.06) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    card.style.transition = "transform 0.4s ease-out";
  };

  const Icon = project.icon;

  return (
    <motion.div variants={fadeUp} className={project.featured ? "md:col-span-1" : ""}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full rounded-2xl overflow-hidden group"
        style={{
          boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Glare overlay */}
        <div className="card-glare absolute inset-0 z-10 pointer-events-none rounded-2xl" />

        {/* Card background */}
        <div className="absolute inset-0 bg-[#111116]" />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${project.color}08 0%, transparent 60%)`,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
        />

        <div className="relative z-20 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}
            >
              <Icon size={18} style={{ color: project.color }} />
            </div>
            <span
              className="text-[10px] font-semibold px-2 py-1 rounded-full"
              style={{ background: `${project.color}15`, color: project.color }}
            >
              {project.badge}
            </span>
          </div>

          {/* Content */}
          <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
          <p className="text-[#F97316] text-xs font-medium mb-3">{project.tagline}</p>
          <p className="text-sm text-[#71717A] leading-relaxed flex-1 mb-5">{project.description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] border border-white/[0.07] text-[#71717A]"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.06]">
            {project.links.github && (
              <motion.a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs text-[#71717A] hover:text-white transition-colors font-medium"
              >
                <GitHubIcon style={{ width: 13, height: 13 }} />
                Source
              </motion.a>
            )}
            {project.links.live && (
              <motion.a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs font-medium"
                style={{ color: project.color }}
              >
                <ExternalLink size={13} />
                Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 bg-[#09090B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="A selection of projects spanning AI automation, blockchain tools, and developer utilities."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/anuragn091"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-white transition-colors font-medium"
          >
            <GitHubIcon style={{ width: 16, height: 16 }} />
            View all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
