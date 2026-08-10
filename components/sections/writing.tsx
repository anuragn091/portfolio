"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, viewportConfig } from "@/lib/motion";
import SectionHeading from "@/components/ui/section-heading";
import { ArrowRight, Clock } from "lucide-react";
import { posts, formatPostDate, type ExternalPost } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

function SourceBadge({ source }: { source: ExternalPost["source"] }) {
  if (source === "linkedin") {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2]">
        LinkedIn
      </span>
    );
  }
  if (source === "native") {
    return (
      <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316]">
        Original
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#71717A]">
      Medium
    </span>
  );
}

export default function Writing() {
  return (
    <section id="writing" className="relative py-20 bg-[#09090B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <SectionHeading
            eyebrow="Writing"
            title="Thoughts on building"
            description="Writing about engineering, markets, and things I am building."
            className="mb-0"
          />
          <a
            href="https://medium.com/@anuraga091"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 text-sm text-[#71717A] hover:text-[#F97316] transition-colors font-medium"
          >
            All posts
            <ArrowRight size={14} />
          </a>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {posts.map((post) => (
            <motion.div key={post.url} variants={fadeUp}>
              {post.source === "native" ? (
              <Link
                href={post.url}
                className="block h-full glass rounded-2xl overflow-hidden group hover:border-[#F97316]/15 transition-all duration-300"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)" }}
              >
                {post.image && (
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  {/* Tags + source */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/15"
                      >
                        {tag}
                      </span>
                    ))}
                    <SourceBadge source={post.source} />
                  </div>

                  <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#F97316] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#71717A] text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-xs text-[#52525B] font-mono">{formatPostDate(post.date)}</span>
                    <span className="flex items-center gap-1 text-xs text-[#52525B]">
                      <Clock size={11} />
                      {post.readingTime} min read
                    </span>
                  </div>
                </div>
              </Link>
              ) : (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full glass rounded-2xl p-6 group hover:border-[#F97316]/15 transition-all duration-300"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)" }}
              >
                {/* Tags + source */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/15"
                    >
                      {tag}
                    </span>
                  ))}
                  <SourceBadge source={post.source} />
                </div>

                <h3 className="text-white font-bold text-base leading-snug mb-3 group-hover:text-[#F97316] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[#71717A] text-sm leading-relaxed mb-5 line-clamp-3">
                  {post.summary}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                  <span className="text-xs text-[#52525B] font-mono">{formatPostDate(post.date)}</span>
                  <span className="flex items-center gap-1 text-xs text-[#52525B]">
                    <Clock size={11} />
                    {post.readingTime} min read
                  </span>
                </div>
              </a>
              )}
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 text-center sm:hidden">
          <a
            href="https://medium.com/@anuraga091"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#71717A] hover:text-[#F97316] transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
