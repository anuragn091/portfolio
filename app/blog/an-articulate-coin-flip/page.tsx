import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "An Articulate Coin Flip, or Something Better | Anurag Nigam",
  description:
    "I asked my AI if I should buy gold. It gave me entry, stop, and target. Then I asked what it just did. That question led to a method, a logged experiment, and a six-month public scorecard.",
  keywords: [
    "algo trading",
    "algorithmic trading",
    "AI trading",
    "AI investing",
    "AI stock analysis",
    "gold trading strategy",
    "AI market forecast",
    "investment AI agent",
    "trading with AI",
    "AI vs algo trading",
    "automated investing",
    "AI financial analysis",
  ],
  openGraph: {
    title: "An Articulate Coin Flip, or Something Better",
    description:
      "I asked my AI if I should buy gold. It gave me entry, stop, and target. Then I asked what it just did. That question led to a method, a logged experiment, and a six-month public scorecard.",
    type: "article",
    url: "https://anuragnigam.in/blog/an-articulate-coin-flip",
    images: [
      {
        url: "https://anuragnigam.in/blog-algo-trading.png",
        width: 1200,
        height: 630,
        alt: "AI vs algo trading - an experiment in AI-powered investment forecasting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anuragnigam_",
    creator: "@anuragnigam_",
    title: "An Articulate Coin Flip, or Something Better",
    description:
      "I asked my AI if I should buy gold. It gave me entry, stop, and target. That question led to a method, a logged experiment, and a six-month public scorecard.",
    images: ["https://anuragnigam.in/blog-algo-trading.png"],
  },
};

export default function ArticulateCoinFlipPost() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Header */}
      <div className="border-b border-white/[0.06] sticky top-0 bg-[#09090B]/80 backdrop-blur-xl z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-[#71717A] hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <img src="/logo.png" alt="AN" className="w-6 h-6 rounded-md object-cover" />
            <span className="font-medium">All posts</span>
          </Link>
          <span className="text-xs font-mono text-[#52525B]">writing</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-20">
        {/* Meta */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-1.5 mb-6">
            {["AI", "Investing", "Trading"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            An Articulate Coin Flip, or Something Better
          </h1>

          <div className="flex items-center gap-4 text-xs text-[#52525B] font-mono">
            <span>August 10, 2026</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> 5 min read
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12" />

        {/* Hero image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/[0.06]">
          <img
            src="/blog-algo-trading.png"
            alt="Algo Trading - An Articulate Coin Flip"
            className="w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="prose-dark">
          <p>
            Last Monday I asked my AI a simple question: should I buy gold?
          </p>

          <p>
            What came back surprised me. Not &quot;gold looks bullish&quot;, but a plan. Gold was 28% off its
            January peak and rebounding, a geopolitical deal in the Middle East was days from signing
            and would likely cause a dip, the Fed was leaning toward a cut after an ugly jobs report.
            So: don&apos;t chase, wait for the dip, enter around $4,250-4,350, stop below $4,000 because
            that&apos;s where the thesis dies, target $4,700. Same numbers in rupees and in the ETF I&apos;d
            actually buy.
          </p>

          <p>
            That&apos;s when I got curious about the wrong thing in the right way. I stopped caring about
            gold and asked: what did you just do? Show me every step.
          </p>

          <p>
            It laid out a funnel. Fresh prices first, cross-checked, because stale data kills more
            calls than bad logic. Name the one variable that drives the asset. Macro for direction,
            scheduled events for timing, structural buyers for how far a move can run. The chart comes
            last, and its only job is turning the view into exact numbers.
          </p>

          <p>
            We argued for a while. I made it add a test for hype sectors (a theme only counts if it
            shows up in revenue, not just headlines) and split every forecast by horizon, because a
            six-month trade and a ten-year holding are different games pretending to be the same one.
            Then I froze the whole method into a skill. Now when I type &quot;forecast copper&quot; or &quot;should
            I buy Bitcoin&quot;, the entire funnel runs on its own and hands me entry, stop, target, verdict.
          </p>

          <p>
            Somewhere in that process a question started nagging me: haven&apos;t I just rebuilt algo
            trading, badly?
          </p>

          <p>
            I don&apos;t think so, and the difference is the part I find interesting. An algo is
            yesterday&apos;s judgment frozen into code; it backtests beautifully and then trades blind, no
            idea a Hormuz deal or a jobs shock even exists. My agent is the opposite: judgment that
            stays liquid. It read this morning&apos;s news before giving me a number. The price of that
            flexibility is brutal though. An algo shows you its track record before risking a rupee.
            My agent&apos;s hit rate is exactly zero data points.
          </p>

          <p>
            So we&apos;re going to find out. Every call gets logged with its entry, stop, and date,
            starting with this week&apos;s gold and silver. In six months I compare the sheet against the
            market and publish the score either way. If it works, I have a system that reasons about
            tomorrow instead of extrapolating yesterday. If it doesn&apos;t, I&apos;ve built a very articulate
            coin flip.
          </p>

          <p>
            Both are worth knowing.
          </p>

          <p className="text-[#52525B] text-sm italic">
            Not investment advice. Just an experiment I&apos;m publishing so I can&apos;t quietly forget the
            calls that go wrong.
          </p>
        </div>
      </article>
    </div>
  );
}
