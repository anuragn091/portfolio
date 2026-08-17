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
          gradients. I used to find it funny. Then I spent a few weeks inside a form that took five
          seconds to respond to a single keystroke, and the joke stopped being funny and started
          being a graph problem.
        </p>

        <p>
          This is the story of that fix: what the bug looked like, why the obvious diagnosis was
          wrong, and what it changed about how our team thinks about copying data.
        </p>

        <h2>The symptom only existed at scale</h2>

        <p>
          The feature was a contract creation flow built around a questionnaire. Users answer
          questions, and their answers decide which other questions appear. A field asking for a
          notice period only shows up if the contract has a termination clause. A field asking which
          jurisdiction applies only shows up if the counterparty is outside India. Multiply that by a
          few hundred fields and you have a large, deeply conditional form.
        </p>

        <p>
          On a small template, everything felt fine. Twenty or thirty fields, instant response, no
          complaints. The problem only appeared on the templates our largest workspaces actually
          used, the ones with hundreds of dynamic fields. There, selecting a value from a dropdown or
          typing into a text input would lock the interface for several seconds. Not a spinner. Not a
          loading state. Just a window that stopped responding, then caught up all at once.
        </p>

        <p>
          That gap between small and large is the part worth paying attention to. The bug was
          invisible in every environment where it was cheap to look, and obvious in the one place
          where it was expensive.
        </p>

        <h2>The obvious diagnosis was wrong</h2>

        <p>
          The first assumption, from everyone including me, was that this was network latency. A slow
          form usually means a slow API, and we had plenty of API calls in that flow.
        </p>

        <p>
          Profiling said something else entirely. The data had already arrived. The requests had
          resolved, the payload was in memory, and the browser was sitting on everything it needed.
          What it was not doing was rendering, because the main thread was fully occupied running our
          own synchronous code.
        </p>

        <p>
          This is the single most useful thing I took from the whole exercise. Frontend debugging
          tends to start and stop at the network tab, because that is where the obvious numbers live.
          But a request that finishes in 80ms tells you nothing about what happens in the 4 seconds
          afterwards. Long task analysis and main thread profiling are a different lens, and in this
          case they were the only lens that showed the actual problem.
        </p>

        <h2>The actual cause: recomputing everything, every time</h2>

        <p>
          Once we were looking at the right thing, the cause was not subtle. Every single value
          change triggered a visibility recomputation across essentially the entire questionnaire.
        </p>

        <p>
          Change one dropdown, and the code would walk every field, evaluate every visibility
          condition, and rebuild the answer. It did not matter that the field you touched only
          affected three other fields. All several hundred got recomputed anyway, because nothing in
          the system knew which ones were related.
        </p>

        <p>
          Sitting on top of that was a second cost. The recomputation path did repeated deep cloning
          of the form state to avoid mutating shared objects. Deep cloning a small object is close to
          free, so this had never registered as a problem. Deep cloning a large nested structure,
          hundreds of times, inside the hot path of every keystroke, is a completely different
          proposition. It burned execution time and it created real memory pressure.
        </p>

        <p>
          Neither of these was a bad decision when it was written. Recompute-everything is the
          simplest correct approach, and it is genuinely the right call until the data outgrows it.
          The failure was not the original design. It was that nothing forced us to revisit the
          design when the scale changed.
        </p>

        <h2>The fix: track what changed</h2>

        <p>
          The shift was from <em>recompute everything on every interaction</em> to{" "}
          <em>track what changed and recompute only the affected dependency chain</em>.
        </p>

        <p>
          That sentence is short and the implementation was not, but the pieces are individually
          familiar. This is where the data structures course stops being interview trivia.
        </p>

        <p>
          <strong>Build a dependency graph.</strong> Every visibility condition is a statement about
          which fields depend on which other fields. Written down explicitly, those relationships are
          a directed graph: nodes are fields, edges point from a field to everything whose visibility
          depends on it. Once that graph exists, the question &quot;what does this change affect?&quot;
          stops being a guess and becomes a traversal.
        </p>

        <p>
          <strong>Order the work correctly.</strong> Dependencies are not flat. Field A can control
          field B, which controls field C, and evaluating C before B produces a wrong answer that
          then has to be fixed on a later pass. Topological ordering guarantees that by the time you
          evaluate any field, everything it depends on has already settled. Doing this properly is
          what removes an entire class of subtle correctness bugs where the form eventually reaches
          the right state but flickers through wrong ones on the way.
        </p>

        <p>
          <strong>Recompute selectively.</strong> With the graph and the ordering in place, a change
          to one field walks only its dependents, in dependency-safe order, and stops. Fields with no
          relationship to what you touched are never visited. On a large template this is the
          difference between several hundred evaluations and a handful.
        </p>

        <p>
          <strong>Memoize the results.</strong> Visibility results get cached, so a field whose
          inputs have not changed does not get evaluated again at all. In the common case, most
          interactions become a cache hit.
        </p>

        <p>
          <strong>Invalidate precisely.</strong> This is the part that decides whether the cache is
          an asset or a liability. Invalidate too broadly and you have rebuilt the original problem
          with more machinery. Invalidate too narrowly and you serve stale visibility, which is worse
          than being slow because now the form is simply wrong. The graph is what makes precision
          possible: it tells you exactly which cached results the change reaches.
        </p>

        <p>
          The result was interaction latency down by roughly 99%, from multi-second freezes to
          responses fast enough that the interface felt immediate again. On the large templates we
          profiled, a five second interaction came back in about fifty milliseconds. Completion time
          for a large contract went from around thirty minutes to somewhere between five and ten. The
          rollout covered 50+ enterprise workspaces.
        </p>

        <p>
          The feedback I remember best was not a number. It was someone in QA saying the portal
          felt &quot;great now, not just good&quot;.
        </p>

        <h2>The argument about cloning was the more valuable outcome</h2>

        <p>
          Fixing the slow thing was satisfying. What happened next mattered more.
        </p>

        <p>
          The deep cloning we found in that hot path was not unique to this feature. It was a habit,
          reached for by default across the codebase, because deep cloning is the safe-feeling
          choice. So it turned into a wider discussion about how we copy, clone and transform data,
          and we went through the options properly:
        </p>

        <ul>
          <li>
            <strong>Shallow copy</strong> is nearly free, but it only protects the top level. Nested
            objects stay shared, which is fine when you know the shape and dangerous when you do not.
          </li>
          <li>
            <strong>
              <code>JSON.parse(JSON.stringify(value))</code>
            </strong>{" "}
            is the reflex answer. It is also the most expensive common option, and it silently
            destroys data: <code>undefined</code>, <code>Date</code> objects, <code>Map</code>,{" "}
            <code>Set</code>, functions and circular references either vanish or throw.
          </li>
          <li>
            <strong>
              Lodash <code>cloneDeep</code>
            </strong>{" "}
            is correct across far more types and is a reasonable default outside hot paths, but
            correctness across every type has a cost you pay on every call.
          </li>
          <li>
            <strong>Internal deep-clone utilities</strong> can be faster because they are allowed to
            assume things about our own data shapes. That assumption is exactly what makes them
            fragile when the shapes change.
          </li>
          <li>
            <strong>
              Native <code>structuredClone</code>
            </strong>{" "}
            handles most structured data correctly, is implemented by the browser rather than
            shipped in your bundle, and is a strong default in modern environments. It still does not
            clone functions, and it is still not free.
          </li>
        </ul>

        <p>
          The conclusion we landed on was not &quot;use X&quot;. It was that copying is a
          tradeoff-based decision rather than a default utility choice, and the right answer depends
          on four things: what correctness guarantees you actually need, what shape the data is, what
          the performance cost is, and whether the code sits in a hot interaction path. A clone that
          is perfectly reasonable in a form submit handler can be indefensible inside a keystroke
          handler.
        </p>

        <h2>What generalises</h2>

        <p>
          Stripped of the specifics, these are the parts I have carried into other work:
        </p>

        <ul>
          <li>
            Deep cloning in hot paths gets expensive at scale, and the cost is invisible until the
            data is large enough.
          </li>
          <li>
            Full recomputation is simpler to write and reason about. Dependency-aware recomputation
            is what actually scales.
          </li>
          <li>
            Caching only helps if invalidation is precise. Imprecise invalidation gives you the old
            performance with new complexity, or correctness bugs.
          </li>
          <li>
            Frontend debugging has to include main thread and long task analysis. API timings will
            confidently point you at the wrong thing.
          </li>
          <li>
            Profile at production scale. Small workflows hide the bottlenecks that matter, and the
            environments that are cheapest to test in are the ones least likely to show the bug.
          </li>
        </ul>

        <p>
          The broader point is that frontend performance is not only about faster APIs, smaller
          bundles or fewer renders. Sometimes everything has already arrived and the bottleneck is
          synchronous computation happening after the data is in hand. That failure mode does not
          show up in any of the usual dashboards.
        </p>

        <p>
          And the fix that lasts is not the one that replaces a slow function with a fast one. It is
          the one that leaves behind better debugging habits, a real discussion about tradeoffs, and
          enough context that the next person working in that part of the codebase does not have to
          rediscover all of it.
        </p>

        <p>
          Graphs, topological ordering and memoization are not interview questions. They are what a
          form does when it gets big enough.
        </p>
      </div>
    </BlogPostLayout>
  );
}
