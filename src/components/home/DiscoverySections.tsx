"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useApp } from "@/components/providers/AppProviders"
import { bestValueTools, editorPicks, trendingTools } from "@/lib/data"
import { ToolCard } from "@/components/tools/ToolCard"
import { Reveal, SectionHeader } from "@/components/ui/primitives"
import type { Tool } from "@/lib/types"
import { EASE_IN, EASE_OUT } from "@/lib/motion"

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
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool}  />
        ))}
      </ul>
    </AnimatePresence>
  )
}

const sectionCopy = {
  human: {
    trending: { title: "Trending for humans", desc: "What teams are adopting right now, ranked by editorial signal." },
    picks: { title: "Editor's picks", desc: "The handful we'd pay for ourselves." },
    value: { title: "Best value picks", desc: "Tools that earn their subscription the moment you start." },
  },
  agent: {
    trending: { title: "Trending for agents", desc: "The infrastructure agents actually run on, ranked by editorial signal." },
    picks: { title: "Editor's picks", desc: "The stack we'd build an agent on." },
    value: { title: "Best value picks", desc: "Agent infrastructure that earns its keep from day one." },
  },
}

export function DiscoverySections() {
  const { layer } = useApp()
  const copy = sectionCopy[layer]

  const sections = [
    {
      key: "trending" as const,
      ...copy.trending,
      tools: trendingTools(layer),
      href: "/tools?sort=trending",
      limit: 9,
    },
    {
      key: "picks" as const,
      ...copy.picks,
      tools: editorPicks(layer),
      href: "/tools?sort=picks",
      limit: 6,
    },
    {
      key: "value" as const,
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
          <Reveal className="flex items-end justify-between gap-4">
            <SectionHeader
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
          </Reveal>
          <div className="mt-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={layer}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE_IN } }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
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