"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, Plus, Check } from "lucide-react"
import type { Tool } from "@/lib/types"
import { cn, pricingLabel, toolHref } from "@/lib/utils"
import { useApp } from "@/components/providers/AppProviders"
import { ToolLogo } from "./ToolLogo"
import { AffiliateBadge } from "./AffiliateBadge"

/**
 * Product card. One primary affordance (Explore) plus a quiet compare
 * toggle. Rendered with layout animations so grids morph on layer
 * switches and filter changes.
 */
export function ToolCard({
  tool,
  index = 0,
  showDescription = true,
  className,
}: {
  tool: Tool
  index?: number
  showDescription?: boolean
  className?: string
}) {
  const { compare, toggleCompare } = useApp()
  const inCompare = compare.includes(tool.slug)

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.18, ease: "easeIn" } }}
      transition={{ duration: 0.4, delay: Math.min(index, 12) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col rounded-xl border border-line-subtle bg-surface p-5 transition-colors duration-200",
        "hover:border-line-strong hover:bg-raised",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ToolLogo slug={tool.slug} name={tool.name} type={tool.type} />
          <div>
            <h3 className="text-[0.95rem] font-medium tracking-tight text-fg">
              <Link href={toolHref(tool.slug)} className="after:absolute after:inset-0 after:rounded-xl">
                {tool.name}
              </Link>
            </h3>
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-faint">
              {tool.useCase}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-pressed={inCompare}
          aria-label={inCompare ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
          onClick={() => toggleCompare(tool.slug)}
          className={cn(
            "relative z-10 flex size-7 items-center justify-center rounded-md border transition-colors",
            inCompare
              ? "border-accent/50 bg-accent-soft text-accent"
              : "border-line-subtle text-faint opacity-60 hover:border-line-strong hover:text-fg hover:opacity-100"
          )}
        >
          {inCompare ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
        </button>
      </div>

      {showDescription && (
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{tool.description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-mono text-xs font-medium text-accent">{pricingLabel(tool)}</span>
        {tool.api && (
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">API</span>
        )}
        {tool.ai && (
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">AI</span>
        )}
        <AffiliateBadge tool={tool} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line-subtle pt-3">
        <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">
          {tool.platforms.slice(0, 2).join(" · ")}
        </span>
        <span className="relative z-10 inline-flex items-center gap-1 text-xs font-medium text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Explore tool
          <ArrowUpRight className="size-3.5 text-accent" />
        </span>
      </div>
    </motion.li>
  )
}