"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { ArrowRight, SlidersHorizontal } from "lucide-react"
import { useApp } from "@/components/providers/AppProviders"
import { LayerToggle } from "./LayerToggle"
import { HeroSearch } from "./HeroSearch"
import { catalogStats } from "@/lib/data"

const copy = {
  human: {
    eyebrow: "Independent SaaS discovery · 2026 edition",
    headline: (
      <>
        The best software for{" "}
        <span className="serif-accent text-accent">people</span>.
      </>
    ),
    sub: "Eighty tools across marketing, work, dev, design and finance — verified, curated and compared for humans who ship.",
  },
  agent: {
    eyebrow: "Independent SaaS discovery · 2026 edition",
    headline: (
      <>
        The best software for{" "}
        <span className="serif-accent text-accent">agents</span>.
      </>
    ),
    sub: "Frameworks, memory, scraping, vector data and observability — the toolchain autonomous AI actually runs on.",
  },
}

export function Hero() {
  const { layer } = useApp()
  const stats = catalogStats()

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[34rem]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 0%, oklch(var(--accent-l) var(--accent-c) var(--accent-h) / 0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 text-center sm:px-6 sm:pt-28">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={layer}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-6">{copy[layer].eyebrow}</p>
            <h1 className="mx-auto max-w-3xl text-display font-semibold text-fg">
              {copy[layer].headline}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-body text-muted">{copy[layer].sub}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <LayerToggle />
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex-1">
            <HeroSearch />
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-fg px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            Browse all
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-subtle bg-line-subtle sm:grid-cols-4">
          <div className="bg-surface px-4 py-5">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">Catalog</dt>
            <dd className="mt-1 text-metric font-semibold text-fg">{stats.total} tools</dd>
          </div>
          <div className="bg-surface px-4 py-5">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">Layers</dt>
            <dd className="mt-1 text-metric font-semibold text-fg">
              <span className="text-human">H</span>
              <span className="text-agent">A</span>
            </dd>
          </div>
          <div className="bg-surface px-4 py-5">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">Categories</dt>
            <dd className="mt-1 text-metric font-semibold text-fg">{stats.categories}</dd>
          </div>
          <div className="bg-surface px-4 py-5">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">Recurring %</dt>
            <dd className="mt-1 text-metric font-semibold text-fg">
              {Math.round((stats.recurring / stats.total) * 100)}%
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-faint">
          <span className="inline-flex items-center gap-1.5">
            <SlidersHorizontal className="size-3.5" aria-hidden /> Independent ratings
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden /> Commissions disclosed
          </span>
          <span className="inline-flex items-center gap-1.5">Built for agents too — llms.txt ready</span>
        </div>
      </div>
    </section>
  )
}