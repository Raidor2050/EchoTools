import type { Metadata } from "next"
import { siteMetadata } from "@/lib/seo"

export const metadata: Metadata = siteMetadata({
  title: "Affiliate disclosure — EchoTools",
  description:
    "How EchoTools makes money, why rankings stay independent, and exactly what we disclose on every tool page.",
})

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="eyebrow mb-3">Trust</p>
      <h1 className="text-hero font-semibold text-fg">Affiliate disclosure</h1>

      <div className="mt-10 space-y-10 text-body leading-relaxed text-muted">
        <section>
          <h2 className="text-h3 font-semibold text-fg">What we are</h2>
          <p className="mt-3">
            EchoTools is an independent software directory covering two layers — the software
            humans use and the software AI agents run on. Listings are editorial, and every
            tool is evaluated on usefulness first.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-semibold text-fg">How we make money</h2>
          <p className="mt-3">
            Some of the links on this site are affiliate links. If you sign up for a tool
            through one of them, EchoTools may receive a commission — typically a percentage
            of the subscription or a fixed referral fee — at no additional cost to you.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Affiliate economics are stored separately from editorial data and never affect rankings.</li>
            <li>Every card and tool page shows whether the vendor runs an affiliate program, and its verified terms.</li>
            <li>Tools with no affiliate program are listed and linked exactly like everyone else.</li>
            <li>Affiliate links carry <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">rel=&quot;nofollow sponsored&quot;</code>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-h3 font-semibold text-fg">What we disclose</h2>
          <p className="mt-3">
            On each tool page, the “How this link works” panel shows the commission structure
            (recurring, one-time, or unverified), cookie window, and network, along with the
            date terms were last verified and a link to the source evidence when available.
            Programs we could not verify are labeled unverified — never assumed.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-semibold text-fg">Why recurring-first</h2>
          <p className="mt-3">
            We favor recurring programs because they align incentives: a tool we genuinely
            recommend keeps paying us as long as you stay subscribed. One-time payout programs
            are treated as neutral, and their links are disclosed the same way.
          </p>
        </section>

        <section>
          <h2 className="text-h3 font-semibold text-fg">Questions</h2>
          <p className="mt-3">
            Found a program that changed? Write to{" "}
            <a href="mailto:hello@echotools.dev" className="text-fg underline-offset-4 hover:underline">
              hello@echotools.dev
            </a>{" "}
            and we will re-verify and update the listing.
          </p>
        </section>
      </div>
    </div>
  )
}