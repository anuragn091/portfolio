import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { posts, formatPostDate } from "@/lib/posts";

export const metadata = {
  title: "Blog | Anurag Nigam",
  description: "Writing about engineering, markets, and things I am building.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Header */}
      <div className="border-b border-white/[0.06] sticky top-0 bg-[#09090B]/80 backdrop-blur-xl z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#71717A] hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <img src="/logo.png" alt="AN" className="w-6 h-6 rounded-md object-cover" />
            <span className="font-medium">Anurag Nigam</span>
          </Link>
          <span className="text-xs font-mono text-[#52525B]">writing</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Title */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#F97316] mb-4">
            <span className="w-4 h-[1px] bg-[#F97316]" />
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Thoughts on building
          </h1>
          <p className="text-[#71717A] text-lg">
            Writing about engineering, markets, and things I am building.
          </p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => {
            const isNative = post.source === "native";
            const cardClass =
              "block glass rounded-2xl overflow-hidden group hover:border-[#F97316]/20 transition-all duration-300";
            const cardStyle = { boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)" };

            const inner = (
              <>
                {post.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="flex items-start justify-between gap-4 p-6">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/15"
                      >
                        {tag}
                      </span>
                    ))}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                        post.source === "linkedin"
                          ? "bg-[#0A66C2]/10 border-[#0A66C2]/20 text-[#0A66C2]"
                          : post.source === "native"
                          ? "bg-[#F97316]/10 border-[#F97316]/20 text-[#F97316]"
                          : "bg-white/[0.05] border-white/[0.08] text-[#71717A]"
                      }`}
                    >
                      {post.source === "linkedin" ? "LinkedIn" : post.source === "native" ? "Original" : "Medium"}
                    </span>
                  </div>

                  <h2 className="text-base font-bold text-white mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#71717A] leading-relaxed line-clamp-2 mb-4">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#52525B] font-mono">
                    <span>{formatPostDate(post.date)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {post.readingTime} min read
                    </span>
                  </div>
                </div>

                {!isNative && (
                  <ExternalLink
                    size={16}
                    className="text-[#3F3F46] group-hover:text-[#F97316] transition-colors flex-shrink-0 mt-1"
                  />
                )}
                </div>
              </>
            );

            return isNative ? (
              <Link key={post.url} href={post.url} className={cardClass} style={cardStyle}>
                {inner}
              </Link>
            ) : (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
                style={cardStyle}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
