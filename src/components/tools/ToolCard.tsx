"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Check, Plus } from "lucide-react"
import type { ReactNode } from "react"
import type { Tool } from "@/lib/types"
import { cn, pricingLabel, toolHref } from "@/lib/utils"
import { EASE_IN, EASE_OUT } from "@/lib/motion"
import { useApp } from "@/components/providers/AppProviders"
import { ToolLogo } from "./ToolLogo"

const badgeBase =
  "inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-medium text-muted"

/**
 * Product card. The whole card is one link; the only exception is the
 * quiet compare toggle. Border-only, no shadow, no entrance animation
 * (perf rule for the 80-card directory).
 */
export function ToolCard({
  tool,
  showDescription = true,
  className,
}: {
  tool: Tool
  showDescription?: boolean
  className?: string
}) {
  const { compare, toggleCompare } = useApp()
  const inCompare = compare.includes(tool.slug)
  const price = pricingLabel(tool)

  const badges: ReactNode[] = []
  const pushBadge = (node: ReactNode) => {
    if (badges.length < 2) badges.push(node)
  }
  if (tool.api) pushBadge(<span key="api" className={badgeBase}>API</span>)
  if (tool.ai) pushBadge(<span key="ai" className={badgeBase}>AI</span>)

  return (
    <motion.li
      layout
      whileHover={{ y: -2 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.18, ease: EASE_IN } }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
      className={cn(
        "group relative flex flex-col rounded-xl border border-line-subtle bg-surface p-5 transition-colors duration-200",
        "hover:border-line-strong",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <ToolLogo slug={tool.slug} name={tool.name} type={tool.type} />
          <h3 className="truncate text-[0.9375rem] font-semibold tracking-tight text-fg">
            <Link
              href={toolHref(tool.slug)}
              className="after:absolute after:inset-0 after:rounded-xl after:content-['']"
            >
              {tool.name}
            </Link>
          </h3>
        </div>
        <button
          type="button"
          aria-pressed={inCompare}
          aria-label={inCompare ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
          onClick={() => toggleCompare(tool.slug)}
          className={cn(
            "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors",
            inCompare
              ? "border-accent/50 bg-accent-soft text-accent"
              : "border-line-subtle text-faint opacity-60 hover:border-line-strong hover:text-fg hover:opacity-100"
          )}
        >
          {inCompare ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
        </button>
      </div>

      {showDescription && (
        <p className="mt-3 line-clamp-2 text-[0.8125rem] leading-relaxed text-muted">{tool.description}</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-y-1 text-xs text-faint">
        {[tool.useCase, ...tool.platforms.slice(0, 2)].map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center">
            {i > 0 && (
              <span className="mx-1.5 text-faint" aria-hidden>
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">{badges}</div>
        <span
          className={cn(
            "shrink-0 text-[0.8125rem] font-medium tabular-nums",
            price === "Free" ? "text-muted" : "text-fg"
          )}
        >
          {price}
        </span>
      </div>
    </motion.li>
  )
}
