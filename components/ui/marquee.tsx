"use client";

import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speeds = {
  slow: "40s",
  normal: "28s",
  fast: "18s",
};

export default function Marquee({ items, direction = "left", speed = "normal", className }: MarqueeProps) {
  const doubled = [...items, ...items];
  const animClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <div
        className={cn("flex gap-3 w-max", animClass)}
        style={{ animationDuration: speeds[speed] }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.02] text-sm font-mono text-[#71717A] hover:text-white hover:border-[#F97316]/30 hover:bg-[#F97316]/[0.05] transition-all cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
