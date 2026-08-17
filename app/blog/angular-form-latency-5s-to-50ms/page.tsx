import BlogPostLayout from "@/components/blog-post-layout";
import { nativeBlogPosts } from "@/lib/blog-posts";
import { createBlogPostMetadata } from "@/lib/schema";

const post = nativeBlogPosts.angularFormLatency;

export const metadata = createBlogPostMetadata(post);

export default function AngularFormLatencyPost() {
  return (
    <BlogPostLayout post={post}>
      <div className="prose-dark">
        <p>
          There is a running joke that frontend work is just changing button colours and adding
          gradients. Then you meet a form that takes five seconds to respond to a single keystroke.
        </p>

        <p>
          This is what that bug looked like, why the first diagnosis was wrong, and what we changed.
        </p>

        <h2>The problem only showed up at scale</h2>

        <p>
          The feature was a contract creation flow built around a questionnaire. Users answer
          questions, and their answers decide which other questions appear. One answer can decide
          whether a whole section appears. That section has questions that decide whether more
          questions appear. With a few hundred fields, the form becomes deeply conditional.
        </p>

        <p>
          Small templates felt fine. Twenty or thirty fields, instant response, no complaints.
        </p>

        <p>
          The problem only appeared on the large templates our biggest workspaces actually used, the
          ones with hundreds of fields. There, picking a value from a dropdown or typing into an
          input froze the screen for several seconds. No spinner. No loading state. The window just
          stopped responding, then caught up all at once.
        </p>

        <p>
          That gap matters. The bug was invisible everywhere it was cheap to test, and obvious only
          where it was expensive.
        </p>

        <h2>It looked like a slow API. It was not.</h2>

        <p>
          Everyone assumed network latency first, including me. A slow form usually means a slow API,
          and that flow had plenty of API calls.
        </p>

        <p>
          Profiling said something else. The data had already arrived. The requests were done and the
          payload was in memory. The browser was not rendering because the main thread was busy
          running our own synchronous code.
        </p>

        <p>
          This is the most useful thing I took from the whole exercise. Frontend debugging usually
          starts and stops at the network tab, because that is where the obvious numbers are. But a
          request that finishes in 80ms tells you nothing about the next four seconds. Main thread
          and long task profiling is a different view, and here it was the only one that showed the
          real problem.
        </p>

        <h2>The cause: recomputing everything, every time</h2>

        <p>
          Once we looked in the right place, the cause was not subtle. Every value change recomputed
          visibility across almost the entire questionnaire.
        </p>

        <p>
          Change one dropdown, and the code walked every field, checked every visibility condition,
          and rebuilt the result. It did not matter that the field you touched only affected three
          others. All several hundred were recomputed, because nothing in the system knew which
          fields were related.
        </p>

        <p>
          There was a second cost on top. The recompute path deep cloned the form state repeatedly to
          avoid mutating shared objects. Deep cloning a small object is almost free, so this never
          looked like a problem. Deep cloning a large nested object hundreds of times, on every
          keystroke, is not. It burned CPU time and added memory pressure.
        </p>

        <p>
          Neither choice was wrong when it was written. Recompute everything is the simplest correct
          approach, and it works until the data grows past it. The real failure was that nothing made
          us revisit it when the scale changed.
        </p>

        <h2>What that looks like with seven questions</h2>

        <p>
          Real templates had hundreds of fields, which is hard to picture. Here is a simplified
          version with seven, just to show the shape. Two independent chains: one starts at contract
          value, the other at counterparty country.
        </p>
      </div>

      {/* Example diagram - outside prose-dark to avoid CSS inheritance conflicts */}
      <div
        className="my-8 rounded-2xl border border-white/[0.06] p-6"
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.04)" }}
      >
        <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-[#52525B]">
          The user changes contract value
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold text-[#F97316]">Chain that depends on it</p>
            <ul className="space-y-2 text-sm">
              {[
                { q: "Contract value", note: "changed", depth: 0 },
                { q: "Approval required?", note: "must recompute", depth: 1 },
                { q: "Approver details", note: "must recompute", depth: 2 },
                { q: "Escalation contact", note: "must recompute", depth: 3 },
              ].map(({ q, note, depth }) => (
                <li
                  key={q}
                  className="flex items-center gap-2"
                  style={{ paddingLeft: `${depth * 14}px` }}
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F97316]" />
                  <span className="text-[#E4E4E7]">{q}</span>
                  <span className="font-mono text-[10px] text-[#71717A]">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold text-[#52525B]">Chain that does not</p>
            <ul className="space-y-2 text-sm">
              {[
                { q: "Counterparty country", depth: 0 },
                { q: "Tax details", depth: 1 },
                { q: "Governing law", depth: 1 },
              ].map(({ q, depth }) => (
                <li
                  key={q}
                  className="flex items-center gap-2"
                  style={{ paddingLeft: `${depth * 14}px` }}
                >
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full border border-[#3F3F46]" />
                  <span className="text-[#52525B]">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 space-y-2 border-t border-white/[0.06] pt-5">
          {[
            {
              stage: "Before",
              value: "7 of 7",
              note: "recomputed, on every single interaction",
              accent: false,
            },
            {
              stage: "After, first pass",
              value: "3 of 7",
              note: "reached by the traversal, 4 never visited",
              accent: false,
            },
            {
              stage: "After, steady state",
              value: "0 of 7",
              note: "inputs unchanged, so every read is a cache hit",
              accent: true,
            },
          ].map(({ stage, value, note, accent }) => (
            <div
              key={stage}
              className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-lg border px-4 py-3 ${
                accent
                  ? "border-[#F97316]/15 bg-[#F97316]/[0.08]"
                  : "border-white/[0.06] bg-white/[0.02]"
              }`}
            >
              <span className="w-40 font-mono text-[10px] uppercase tracking-wide text-[#52525B]">
                {stage}
              </span>
              <span
                className={`font-mono text-sm font-bold ${
                  accent ? "text-[#F97316]" : "text-[#E4E4E7]"
                }`}
              >
                {value}
              </span>
              <span className="text-sm text-[#71717A]">{note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="prose-dark">
        <p>
          The two layers do different jobs, and the second one gave us most of the win.
        </p>

        <p>
          The graph decides which fields are worth checking. That takes seven down to three.
          Memoization then decides whether checking them costs anything at all. If none of a
          field&apos;s inputs changed, the answer comes from the cache.
        </p>

        <p>
          That second layer matters because interactions repeat a lot. A user tabbing through a
          section, fixing a typo, or picking the same dropdown value again asks the same visibility
          questions again. Once results are cached and invalidation is precise enough to trust them,
          the common interaction becomes a lookup instead of a computation. In most cases it became a
          direct cache hit.
        </p>

        <p>
          At seven fields none of this matters and the old code is fine. That is why it survived so
          long. What matters is the ratio, not the count. The old cost grows with the whole form. The
          new cost grows only with the part you touched, and caching removes most of what is left.
        </p>

        <p>
          Now scale that to several hundred fields, where every check also deep clones the form
          state, and run it on every keystroke. That is the five second freeze. Prune the set, cache
          the rest, and the same interaction comes back in about fifty milliseconds.
        </p>

        <h2>The fix: track what changed</h2>

        <p>
          We moved from <em>recompute everything on every interaction</em> to{" "}
          <em>track what changed and recompute only the affected chain</em>.
        </p>

        <p>The sentence is short. The implementation was not. But each piece is familiar.</p>

        <p>
          <strong>Build a dependency graph.</strong> Every visibility condition says which fields
          depend on which. Written out, those relationships form a directed graph: fields are nodes,
          and an edge points from a field to anything whose visibility depends on it. Once the graph
          exists, &quot;what does this change affect&quot; becomes a traversal instead of a guess.
        </p>

        <p>
          <strong>Order the work.</strong> Dependencies are not flat. Field A can control field B,
          which controls field C. Checking C before B gives a wrong answer that has to be fixed on a
          later pass. Topological ordering makes sure everything a field depends on is settled before
          you check that field. This removes a class of bugs where the form reaches the right state
          but flickers through wrong ones first.
        </p>

        <p>
          <strong>Recompute only what is affected.</strong> With the graph and the ordering in place,
          a change walks its dependents in a safe order and stops. Unrelated fields are never
          visited. On a large template that is the difference between several hundred checks and a
          handful.
        </p>

        <p>
          <strong>Cache the results.</strong> Visibility results are memoized, so a field whose
          inputs did not change is not checked again at all.
        </p>

        <p>
          <strong>Invalidate precisely.</strong> This decides whether the cache helps or hurts.
          Invalidate too much and you are back to the original problem with extra machinery.
          Invalidate too little and you show stale visibility, which is worse than slow, because now
          the form is wrong. The graph gives you the exact boundary. It tells you which cached
          results the change can reach.
        </p>

        <p>
          Interaction latency dropped by about 99%. Multi-second freezes became responses fast enough
          to feel instant. On the large templates we profiled, a five second interaction came back in
          about fifty milliseconds. Completing a large contract went from around thirty minutes to
          five or ten. The rollout covered 50+ enterprise workspaces.
        </p>

        <p>
          The feedback I remember best was not a number. Someone in QA said the portal felt
          &quot;great now, not just good&quot;.
        </p>

        <h2>The argument about cloning mattered more</h2>

        <p>Fixing the slow code was satisfying. What happened next mattered more.</p>

        <p>
          The deep cloning we found was not specific to this feature. It was a habit across the
          codebase, because deep cloning feels safe. So it turned into a wider discussion about how
          we copy and transform data, and we compared the options properly:
        </p>

        <ul>
          <li>
            <strong>Shallow copy</strong> is nearly free, but it only protects the top level. Nested
            objects stay shared. Fine when you know the shape, risky when you do not.
          </li>
          <li>
            <strong>
              <code>JSON.parse(JSON.stringify(value))</code>
            </strong>{" "}
            is the reflex answer. It is also the most expensive common option, and it quietly loses
            data. <code>undefined</code>, <code>Date</code>, <code>Map</code>, <code>Set</code>,
            functions and circular references either disappear or throw.
          </li>
          <li>
            <strong>
              Lodash <code>cloneDeep</code>
            </strong>{" "}
            handles far more types correctly and is a fine default outside hot paths. Handling every
            type has a cost you pay on every call.
          </li>
          <li>
            <strong>Internal deep clone helpers</strong> can be faster because they assume things
            about our own data. That assumption is what makes them break when the shapes change.
          </li>
          <li>
            <strong>
              Native <code>structuredClone</code>
            </strong>{" "}
            handles most structured data correctly, ships with the browser instead of your bundle,
            and is a good default in modern environments. It still does not clone functions, and it
            is still not free.
          </li>
        </ul>

        <p>
          We did not conclude &quot;use X&quot;. We concluded that copying is a tradeoff, not a
          default utility choice. The right answer depends on four things: what correctness you need,
          what shape the data is, what it costs, and whether the code runs in a hot path. A clone
          that is fine in a submit handler can be a bad idea inside a keystroke handler.
        </p>

        <h2>What I took from it</h2>

        <ul>
          <li>
            Deep cloning in hot paths gets expensive at scale, and the cost stays invisible until the
            data is big.
          </li>
          <li>
            Full recomputation is simpler to write. Dependency aware recomputation is what scales.
          </li>
          <li>
            Caching only helps when invalidation is precise. Imprecise invalidation gives you the old
            speed with new complexity, or correctness bugs.
          </li>
          <li>
            Frontend debugging needs main thread and long task analysis. API timings will point you
            at the wrong thing with confidence.
          </li>
          <li>
            Profile at production scale. Small workflows hide the bottlenecks that matter, and the
            cheapest environments to test in are the least likely to show them.
          </li>
        </ul>

        <p>
          The wider point is that frontend performance is not only about faster APIs, smaller
          bundles, or fewer renders. Sometimes the data has already arrived and the bottleneck is
          synchronous work happening after it. That failure does not show up on the usual dashboards.
        </p>

        <p>
          And the fix that lasts is not the one that swaps a slow function for a fast one. It is the
          one that leaves behind better debugging habits, a real discussion about tradeoffs, and
          enough context that the next person does not have to work it all out again.
        </p>

        <p>
          Graphs, topological ordering and memoization are not just interview topics. They are what a
          form needs once it gets big enough.
        </p>

        <hr />

        <p className="text-sm text-[#71717A]">
          This article expands on two posts I wrote while the work was fresh:{" "}
          <a
            href="https://www.linkedin.com/posts/anuragn091_frontend-performance-webdevelopment-activity-7405513352027832320-YpA0"
            target="_blank"
            rel="noopener noreferrer"
          >
            on using graphs and caching in the UI
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/posts/anuragn091_frontendperformance-webperformance-javascript-activity-7459486214455468032-vSfw"
            target="_blank"
            rel="noopener noreferrer"
          >
            on debugging the freeze itself
          </a>
          .
        </p>
      </div>
    </BlogPostLayout>
  );
}
