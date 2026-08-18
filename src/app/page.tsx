import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/home/Hero"
import { TrustSection } from "@/components/home/TrustSection"
import { DiscoverySections } from "@/components/home/DiscoverySections"
import { CategoryExplorer } from "@/components/home/CategoryExplorer"
import { Reveal } from "@/components/ui/primitives"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <DiscoverySections />
      <CategoryExplorer />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(50% 80% at 50% 0%, oklch(var(--accent-l) var(--accent-c) var(--accent-h) / 0.12), transparent 70%)",
              }}
            />
            <h2 className="relative text-h2 text-fg">
              Find your stack. Both of them.
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-body text-muted">
              Filter, compare, and pick with full knowledge of what each vendor pays —
              then subscribe through a link that keeps this directory running.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-strong"
              >
                Open the directory
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/50"
              >
                Compare tools
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}