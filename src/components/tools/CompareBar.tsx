"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, X } from "lucide-react"
import { useApp, MAX_COMPARE } from "@/components/providers/AppProviders"
import { allTools } from "@/lib/data"
import { EASE_IN, EASE_OUT } from "@/lib/motion"

/**
 * Sticky comparison tray. Appears once 2+ tools are selected; links to
 * the /compare page which reads the same slugs from URL state.
 */
export function CompareBar() {
  const { compare, toggleCompare, clearCompare } = useApp()

  const selected = compare
    .map((slug) => allTools.find((t) => t.slug === slug))
    .filter(Boolean)

  return (
    <AnimatePresence>
      {compare.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.28, ease: EASE_OUT } }}
          exit={{ y: 80, opacity: 0, transition: { duration: 0.2, ease: EASE_IN } }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="flex w-full max-w-2xl items-center gap-3 rounded-2xl bg-overlay/95 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.6),0_2px_6px_rgba(0,0,0,0.45)] ring-1 ring-line-strong backdrop-blur">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {selected.map(
              (tool) =>
                tool && (
                  <span
                    key={tool.slug}
                    className="flex items-center gap-1.5 rounded-md border border-line-subtle bg-sunken px-2 py-1 text-xs text-fg"
                  >
                    {tool.name}
                    <button
                      type="button"
                      aria-label={`Remove ${tool.name}`}
                      onClick={() => toggleCompare(tool.slug)}
                      className="text-faint hover:text-fg"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                )
            )}
            <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint tabular-nums">
              {compare.length}/{MAX_COMPARE}
            </span>
          </div>
          <button
            type="button"
            onClick={clearCompare}
            className="rounded-md px-2 py-1 text-xs text-faint hover:text-fg"
          >
            Clear
          </button>
          <Link
            href={`/compare?tools=${compare.join(",")}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-bg transition-colors hover:bg-accent-strong"
          >
            Compare
            <ArrowRight className="size-3.5" />
          </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}