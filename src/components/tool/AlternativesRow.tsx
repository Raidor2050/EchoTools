"use client"

import Link from "next/link"
import { motion } from "motion/react"
import type { Tool } from "@/lib/types"
import { relatedTools } from "@/lib/data"
import { fmtPrice } from "@/lib/utils"
import { ToolLogo } from "@/components/tools/ToolLogo"
import { SectionHeader } from "@/components/ui/primitives"
import { listItem, stagger, viewportOnce } from "@/lib/motion"

export function AlternativesRow({ tool }: { tool: Tool }) {
  const related = relatedTools(tool, 3)
  if (related.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6" aria-label={`Alternatives to ${tool.name}`}>
      <SectionHeader
        eyebrow="Alternatives"
        title={`Similar tools to ${tool.name}`}
        description="Compared on usefulness first: affiliate economics are always disclosed, never decisive."
      />
      <motion.ul
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {related.map((r) => (
          <motion.li key={r.slug} variants={listItem}>
            <Link
              href={`/tools/${r.slug}`}
              className="flex items-center gap-3 rounded-xl border border-line-subtle bg-surface p-3.5 transition-colors hover:border-line-strong"
            >
              <ToolLogo slug={r.slug} name={r.name} type={r.type} size="sm" className="size-9 rounded-[10px]" />
              <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-medium text-fg">{r.name}</span>
                  <span className="block truncate text-xs text-faint">{r.useCase}</span>
                </span>
                <span className="shrink-0 text-xs font-medium tabular-nums text-muted">
                  {r.plans.some((p) => p.price === 0) ? "Free" : fmtPrice(Math.min(...r.plans.map((p) => p.price)))}
                </span>
              </span>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}