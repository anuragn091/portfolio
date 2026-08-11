import Image from "next/image";
import Link from "next/link";

export default function BlogAuthor() {
  return (
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
            Software Development Engineer II at SpotDraft. I write about software engineering, AI
            systems, markets, and things I build.
          </p>
          <Link href="/" className="mt-2 inline-block text-sm text-[#F97316] hover:text-[#FB923C]">
            About Anurag Nigam →
          </Link>
        </div>
      </div>
    </section>
  );
}
