import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

export const metadata = {
  title: "Building My Investor Operating System | Anurag Nigam",
  description:
    "I have always been curious about investing, so I decided to turn that curiosity into an experiment. I built an AI research desk, ran its first analysis, and chose ICICI Bank as the first live test.",
  openGraph: {
    title: "Building My Investor Operating System",
    description:
      "I have always been curious about investing, so I decided to turn that curiosity into an experiment. I built an AI research desk, ran its first analysis, and chose ICICI Bank as the first live test.",
    type: "article",
    url: "https://anuragnigam.in/blog/building-my-investor-operating-system",
    images: [
      {
        url: "https://pbs.twimg.com/media/HOs1-e7aYAA3ZGd?format=jpg&name=large",
        width: 1200,
        height: 630,
        alt: "Building My Investor Operating System - AI research desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anuragnigam_",
    creator: "@anuragnigam_",
    title: "Building My Investor Operating System",
    description:
      "I have always been curious about investing, so I decided to turn that curiosity into an experiment. I built an AI research desk, ran its first analysis, and chose ICICI Bank as the first live test.",
    images: ["https://pbs.twimg.com/media/HOs1-e7aYAA3ZGd?format=jpg&name=large"],
  },
};

export default function InvestorOSPost() {
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
            {["AI", "Investing", "Building"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/15"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
            Building My Investor Operating System
          </h1>

          <div className="flex items-center gap-4 text-xs text-[#52525B] font-mono">
            <span>August 2, 2026</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> 6 min read
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-12" />

        {/* Hero image */}
        <div className="mb-12 rounded-2xl overflow-hidden border border-white/[0.06]">
          <img
            src="https://pbs.twimg.com/media/HOs1-e7aYAA3ZGd?format=jpg&name=large"
            alt="Investor OS research desk - running the full pipeline"
            className="w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Intro */}
        <div className="prose-dark">
          <p>
            I have always been fascinated by the world of investing - from quantitative finance and
            investment banking to mutual funds, venture capital, and private equity. But I eventually
            realised that pursuing an MBA in finance was not the path I wanted to take just to explore
            these fields more deeply.
          </p>

          <p>
            With AI becoming more capable, exploring these fields has never been more accessible. It
            is now possible to research ideas, analyse companies, test investment frameworks, and learn
            by building.
          </p>

          <p>
            Most of us know that investing deserves regular attention, but actively researching
            companies and managing a portfolio can take significant time. For someone with a full-time
            role and other responsibilities, maintaining that level of consistency is difficult.
          </p>

          <p>
            I wanted to find a practical way to move closer to something I have always been curious
            about, without turning it into another full-time commitment. That led me to this experiment.
          </p>

          <p>
            So I decided to create my own research desk: a team of specialised AI agents that studies
            markets, analyses companies, evaluates risks, challenges conclusions, and recreates parts
            of the research process used by investment firms.
          </p>

          <h2>Building the Team</h2>

          <p>
            Professional investment decisions are rarely based on the work of one person. In an active
            investment management firm, research analysts study companies and financial statements,
            quantitative analysts examine data and portfolio behaviour, risk teams monitor potential
            losses and exposures, and portfolio managers decide how capital should be allocated.
          </p>

          <p>
            The exact structure varies across mutual funds, hedge funds, quantitative firms, venture
            capital firms, and private equity firms. My system most closely resembles a simplified
            public markets research desk, while borrowing selected ideas from the wider investment
            industry. I wanted my research process to follow a similar division of responsibility.
          </p>
        </div>

        {/* Agent role cards - outside prose-dark to avoid CSS inheritance conflicts */}
        <div className="space-y-3 my-8">
          {[
            {
              role: "Opportunity Scanner",
              desc: "Scans a defined universe - such as the NIFTY 500, S&P 500, a sector, or a country - and shortlists companies worth studying. It focuses on discovery, not recommendations.",
            },
            {
              role: "Equity Research Analyst",
              desc: "Studies the company's financials, growth, margins, cash flow, debt, valuation, management activity, and what the market may be mispricing.",
            },
            {
              role: "Market Timing Analyst",
              desc: "Reviews price trends, moving averages, support and resistance levels, entry zones, stop loss levels, and upcoming events.",
            },
            {
              role: "Investment Risk Officer",
              desc: "Checks governance, regulatory actions, pledging, liquidity, leverage, and concentration risks. A serious warning can override the final score.",
            },
            {
              role: "Quantitative Analyst",
              desc: "Uses historical price data to calculate CAGR, volatility, drawdowns, momentum, benchmark performance, and portfolio correlations.",
            },
            {
              role: "Investment Committee",
              desc: "Coordinates the research process, verifies important claims, challenges the strongest idea, and combines all findings into a final view.",
            },
            {
              role: "Portfolio Monitor",
              desc: "Reviews existing holdings for allocation drift, concentration, overlapping exposure, and fit with new investment ideas.",
            },
          ].map(({ role, desc }) => (
            <div
              key={role}
              className="glass rounded-xl p-5"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
            >
              <p className="text-[#F97316] font-semibold text-sm mb-1">{role}</p>
              <p className="text-[#A1A1AA] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Image after agent cards */}
        <div className="mb-8 rounded-2xl overflow-hidden border border-white/[0.06]">
          <img
            src="https://pbs.twimg.com/media/HOs3Q6HaAAAHwoZ?format=jpg&name=medium"
            alt="Portfolio master view after running all agents"
            className="w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Rest of article */}
        <div className="prose-dark">
          <h2>Putting the Research Desk to Work</h2>

          <p>
            Once the team was in place, I ran the complete research process across the Indian and US
            markets. The system shortlisted eight companies, analysed them across fundamentals, market
            timing, risk, and quantitative factors, then produced a preliminary ranking. The lead
            candidate was reviewed by a research verifier and examined by a thesis challenger whose
            role was to identify weaknesses, questionable assumptions, and contradictory evidence.
          </p>

          <h2>What the First Run Produced</h2>

          <p>
            The first complete run shortlisted eight companies across the Indian and US markets. After
            verification and challenge, the system revised some of its initial conclusions. Mahindra
            and Mahindra was moved from Research Buy to Watch, while ICICI Bank and Wells Fargo
            remained the strongest research candidates. UnitedHealth received an Avoid rating after the
            risk officer raised unresolved regulatory concerns.
          </p>

          <blockquote>
            The most valuable outcome was not the final ranking. It was seeing the system question its
            own analysis and change its view when the supporting evidence became weaker.
          </blockquote>
        </div>

        {/* Image after blockquote */}
        <div className="my-8 rounded-2xl overflow-hidden border border-white/[0.06]">
          <img
            src="https://pbs.twimg.com/media/HOsxl4yaAAAIHgT?format=png&name=large"
            alt="Research output - final rankings and conclusions"
            className="w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="prose-dark">
          <p>
            You can read the full research note{" "}
            <a
              href="https://docs.google.com/document/d/1-EfvUJ5UiONV3w3_M1kIFvl8i8Pk7De4XLl5O-3tpDQ/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>

          <h2>What Comes Next</h2>

          <p>
            This first run showed that the system can research companies, compare ideas, verify claims,
            and revise its own conclusions. What it has not proved yet is whether those conclusions can
            lead to better investment outcomes.
          </p>

          <p>
            I am starting with ICICI Bank as the first live experiment. I will track the original
            thesis, quarterly performance, identified risks, and returns against a relevant benchmark.
          </p>
        </div>

        <p className="text-xs text-[#52525B] border border-white/[0.06] rounded-lg px-4 py-3 mt-8">
          Disclaimer: This is a personal learning experiment, not financial advice. The research and
          conclusions may be wrong.
        </p>
      </article>
    </div>
  );
}
