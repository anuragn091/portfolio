"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportConfig } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#F97316] mb-3">
        <span className="w-4 h-[1px] bg-[#F97316]" />
        {eyebrow}
        <span className="w-4 h-[1px] bg-[#F97316]" />
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-[#71717A] text-base sm:text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
