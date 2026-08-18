"use client"

import Link from "next/link"
import { ArrowUpRight, ShieldCheck, Eye, Repeat } from "lucide-react"
import { recurringTools, catalogStats } from "@/lib/data"
import { byAffiliateStrength } from "@/lib/data/helpers"
import { Eyebrow, Reveal } from "@/components/ui/primitives"

const pillars = [
  {
    icon: Eye,
    title: "Ranked on usefulness",
    desc: "No paid placements, no sponsored slots. Editorial signal decides what you see.",
  },
  {
    icon: ShieldCheck,
    title: "Economics disclosed",
    desc: "Affiliate terms live separately from rankings and are shown on every tool page.",
  },
  {
    icon: Repeat,
    title: "Recurring-first",
    desc: "We favor programs that keep paying, so a good recommendation compounds.",
  },
]

export function TrustSection() {
  const stats = catalogStats()
  const marquee = [...recurringTools()]
    .sort(byAffiliateStrength)
    .slice(0, 10)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-label="Why trust EchoTools">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal>
          <Eyebrow className="mb-4">Independent by design</Eyebrow>
          <h2 className="text-h2 text-fg">
            Reviews humans trust,{" "}
            <span className="serif-accent text-accent">economics</span> agents can verify.
          </h2>
          <p className="mt-4 max-w-md text-body text-muted">
            {stats.recurring} of the {stats.total} tools in our catalog run verified recurring
            affiliate programs. We surface that, plainly, on every card and tool page.
          </p>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-xl border border-line-subtle bg-surface p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                  <p.icon className="size-4.5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-fg">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-14" delay={0.1}>
        <div className="overflow-hidden rounded-xl border border-line-subtle bg-sunken/60 py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max animate-marquee items-center gap-10 pr-10 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {[...marquee, ...marquee].map((tool, i) => (
              <Link
                key={`${tool.slug}-${i}`}
                href={`/tools/${tool.slug}`}
                className="group inline-flex items-center gap-3 whitespace-nowrap"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-muted transition-colors group-hover:text-fg">
                  {tool.name}
                </span>
                <span className="rounded-full border border-accent/40 px-1.5 py-0.5 font-mono text-[0.625rem] text-accent tabular-nums">
                  {tool.affiliate.commission}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                  recurring
                  <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                <span className="text-faint" aria-hidden>
                  ✦
                </span>
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-3 text-center font-mono text-[0.625rem] uppercase tracking-wider text-faint">
          Top recurring affiliate programs in the catalog: hover to explore
        </p>
      </Reveal>
    </section>
  )
}