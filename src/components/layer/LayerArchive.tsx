"use client"

import { useMemo, useState } from "react"
import { AnimatePresence } from "motion/react"
import { ArrowUpDown } from "lucide-react"
import type { Tool } from "@/lib/types"
import { sortTools } from "@/lib/utils"
import { ToolCard } from "@/components/tools/ToolCard"
import { Eyebrow } from "@/components/ui/primitives"

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
  { value: "affiliate", label: "Recurring affiliate" },
]

export function LayerArchive({
  tools,
  title,
  description,
  eyebrow,
}: {
  tools: Tool[]
  title: string
  description: string
  eyebrow: string
}) {
  const [sort, setSort] = useState("featured")

  const sorted = useMemo(() => sortTools(tools, sort), [tools, sort])

  return (
    <div>
      <div className="border-b border-line-subtle bg-sunken/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Eyebrow className="mb-3">{eyebrow}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-hero font-semibold text-fg">{title}</h1>
              <p className="mt-3 max-w-2xl text-body text-muted">{description}</p>
            </div>
            <div className="relative inline-flex items-center">
              <ArrowUpDown className="pointer-events-none absolute left-3 size-3.5 text-faint" aria-hidden />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort tools"
                className="appearance-none rounded-lg border border-line-subtle bg-surface py-2 pl-8 pr-8 text-xs text-muted outline-none transition-colors hover:border-line-strong"
              >
                {sorts.map((s) => (
                  <option key={s.value} value={s.value} className="bg-overlay text-fg">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="mb-6 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
          {tools.length} tools
        </p>
        <AnimatePresence mode="popLayout" initial={false}>
          <ul key={sort} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </ul>
        </AnimatePresence>
      </div>
    </div>
  )
}