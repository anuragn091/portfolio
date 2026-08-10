"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import { GitHubIcon, LinkedInIcon, TwitterXIcon } from "@/components/icons";

const links = [
  { label: "GitHub", href: "https://github.com/anuragn091", icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anuragn091/", icon: LinkedInIcon },
  { label: "Twitter / X", href: "https://twitter.com/anuragnigam_", icon: TwitterXIcon },
  { label: "Email", href: "mailto:me@anuragnigam.in", icon: Mail },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 bg-[#0A0A0F] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F97316] opacity-[0.04] blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#F97316] mb-6">
            <span className="w-4 h-[1px] bg-[#F97316]" />
            Contact
            <span className="w-4 h-[1px] bg-[#F97316]" />
          </span>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
            Let&apos;s build something
            <br />
            <span className="gradient-text">exceptional.</span>
          </h2>

          <p className="text-[#71717A] text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            {"If something here resonates, let's talk. Currently based in Bengaluru, India."}
          </p>

          <motion.a
            href="mailto:me@anuragnigam.in"
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(249,115,22,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-black font-bold text-lg mb-16 hover:opacity-95 transition-opacity"
          >
            <Mail size={20} />
            me@anuragnigam.in
          </motion.a>

          <div className="flex items-center justify-center gap-4">
            {links.map(({ label, href, icon: Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 rounded-xl glass flex items-center justify-center text-[#71717A] hover:text-white hover:border-white/15 transition-all"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.07)" }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/[0.05] max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="AN" width={24} height={24} className="rounded-md object-cover" />
            <span className="text-xs text-[#52525B] font-mono">Anurag Nigam</span>
          </div>
          <p className="text-xs text-[#3F3F46] font-mono text-center">
            Built with Next.js, Framer Motion, and care for every device.
          </p>
          <div className="flex items-center gap-1 text-xs text-[#52525B] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Bengaluru, India
          </div>
        </div>
      </div>
    </section>
  );
}
