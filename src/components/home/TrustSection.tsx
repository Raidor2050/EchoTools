"use client"

import Link from "next/link"
import { ArrowUpRight, BadgeCheck, ShieldCheck, SlidersHorizontal } from "lucide-react"
import { editorPicks, catalogStats } from "@/lib/data"
import { Eyebrow, Reveal } from "@/components/ui/primitives"

const pillars = [
  {
    icon: SlidersHorizontal,
    title: "Ranked on usefulness",
    desc: "No paid placements, no sponsored slots. Editorial signal decides what you see.",
  },
  {
    icon: BadgeCheck,
    title: "Verified & dated",
    desc: "Pricing, features, and alternatives are checked against the vendor and stamped with a date.",
  },
  {
    icon: ShieldCheck,
    title: "Independent by design",
    desc: "Rankings are editorial. What you see is what we would pick ourselves.",
  },
]

export function TrustSection() {
  const stats = catalogStats()
  const marquee = [...editorPicks("human"), ...editorPicks("agent")].slice(0, 10)

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" aria-label="Why trust EchoTools">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <Reveal>
          <Eyebrow className="mb-4">Independent by design</Eyebrow>
          <h2 className="text-h2 text-fg">
            Reviews humans trust,{" "}
            <span className="serif-accent text-accent">signals</span> agents can verify.
          </h2>
          <p className="mt-4 max-w-md text-body text-muted">
            {stats.total} tools across {stats.human} human and {stats.agent} agent picks, each
            one evaluated on usefulness alone.
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
                <span className="rounded-full border border-line px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-faint tabular-nums">
                  {tool.category}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                  editor&apos;s pick
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
          Editor&apos;s picks across both layers: hover to explore
        </p>
      </Reveal>
    </section>
  )
}