"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useApp } from "@/components/providers/AppProviders"
import { bestValueTools, editorPicks, trendingTools } from "@/lib/data"
import { ToolCard } from "@/components/tools/ToolCard"
import { SectionHeader } from "@/components/ui/primitives"
import type { Tool } from "@/lib/types"

function ToolGrid({ tools, cols = "3" }: { tools: Tool[]; cols?: "3" | "4" }) {
  return (
    <AnimatePresence mode="popLayout">
      <ul
        key="grid"
        className={
          cols === "4"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {tools.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </ul>
    </AnimatePresence>
  )
}

const sectionCopy = {
  human: {
    trending: { title: "Trending for humans", desc: "What teams are adopting right now — ranked by editorial signal, never by affiliate terms." },
    picks: { title: "Editor's picks", desc: "The handful we'd pay for ourselves." },
    value: { title: "Best-value recurring picks", desc: "Tools whose affiliate programs pay you long after the trial ends." },
  },
  agent: {
    trending: { title: "Trending for agents", desc: "The infrastructure agents actually run on — ranked by editorial signal, never by affiliate terms." },
    picks: { title: "Editor's picks", desc: "The stack we'd build an agent on." },
    value: { title: "Best-value recurring picks", desc: "Agent infrastructure with affiliate programs that keep paying." },
  },
}

export function DiscoverySections() {
  const { layer } = useApp()
  const copy = sectionCopy[layer]

  const sections = [
    {
      key: "trending" as const,
      eyebrow: "Now",
      ...copy.trending,
      tools: trendingTools(layer),
      href: "/tools?sort=trending",
      limit: 9,
    },
    {
      key: "picks" as const,
      eyebrow: "Editors",
      ...copy.picks,
      tools: editorPicks(layer),
      href: "/tools?sort=picks",
      limit: 6,
    },
    {
      key: "value" as const,
      eyebrow: "Affiliate",
      ...copy.value,
      tools: bestValueTools(layer).length ? bestValueTools(layer) : trendingTools(layer).slice(0, 3),
      href: "/tools?sort=recurring",
      limit: 4,
    },
  ]

  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6">
      {sections.map((section) => (
        <section key={section.key} aria-labelledby={`home-${section.key}`}>
          <div className="flex items-end justify-between gap-4">
            <SectionHeader
              eyebrow={section.eyebrow}
              title={<span id={`home-${section.key}`}>{section.title}</span>}
              description={section.desc}
              className="mb-0"
            />
            <Link
              href={section.href}
              className="mb-1 hidden shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-fg sm:inline-flex"
            >
              View all <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={layer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ToolGrid tools={section.tools.slice(0, section.limit)} />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      ))}
    </div>
  )
}