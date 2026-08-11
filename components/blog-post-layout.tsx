import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import type { NativeBlogPost } from "@/lib/blog-posts";
import { formatPostDate } from "@/lib/posts";
import { createBlogPostingSchema } from "@/lib/schema";

export default function BlogPostLayout({
  post,
  children,
}: {
  post: NativeBlogPost;
  children: ReactNode;
}) {
  const articleSchema = createBlogPostingSchema(post);

  return (
    <div className="min-h-screen bg-[#09090B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#71717A] transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            <Image src="/logo.png" alt="AN" width={24} height={24} className="rounded-md object-cover" />
            <span>
              <span className="block font-medium text-white">Anurag Nigam</span>
              <span className="block text-[10px]">Software &amp; AI Engineer</span>
            </span>
          </Link>
          <Link href="/blog" className="font-mono text-xs text-[#71717A] hover:text-white">
            All posts
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-6 py-20">
        <div className="mb-10">
          <div className="mb-6 flex flex-wrap items-center gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#F97316]/15 bg-[#F97316]/10 px-2 py-0.5 text-[10px] font-semibold text-[#F97316]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 font-mono text-xs text-[#52525B]">
            <span>{formatPostDate(post.date)}</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {post.readingTime} min read
            </span>
          </div>
        </div>

        <div className="mb-12 h-px bg-white/[0.06]" />

        <div className="relative mb-12 aspect-[1200/630] overflow-hidden rounded-2xl border border-white/[0.06]">
          <Image
            src={post.image}
            alt={post.heroAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        {children}

        <section className="mt-16 border-t border-white/[0.06] pt-8" aria-label="About the author">
          <div className="flex items-start gap-4">
            <Image
              src="/avatar.png"
              alt="Anurag Nigam"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-white">Anurag Nigam</p>
              <p className="mt-1 text-sm text-[#A1A1AA]">
                Software Development Engineer II at SpotDraft with 4+ years of experience. I write
                about software engineering, AI systems, markets, and things I build.
              </p>
              <Link href="/" className="mt-2 inline-block text-sm text-[#F97316] hover:text-[#FB923C]">
                About Anurag Nigam →
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
