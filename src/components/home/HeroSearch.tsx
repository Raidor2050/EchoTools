"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, CornerDownLeft, Search } from "lucide-react"
import { allTools } from "@/lib/data"
import { searchTool } from "@/lib/utils"
import { cn } from "@/lib/utils"

/**
 * In-app hero search. Typing shows live results on the page (no
 * navigation); Enter routes internally to the directory with the
 * query — never a raw form submit, so basePath stays correct on
 * GitHub Pages.
 */
export function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const trimmed = query.trim()

  const results = useMemo(() => {
    if (!trimmed) return []
    return allTools.filter((t) => searchTool(t, trimmed)).slice(0, 6)
  }, [trimmed])

  const total = useMemo(() => {
    if (!trimmed) return 0
    return allTools.filter((t) => searchTool(t, trimmed)).length
  }, [trimmed])

  useEffect(() => {
    setActiveIndex(0)
  }, [trimmed])

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [])

  const goToDirectory = () => {
    const q = trimmed
    setOpen(false)
    router.push(q ? `/tools?q=${encodeURIComponent(q)}` : "/tools")
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false)
      return
    }
    if (e.key === "Enter") {
      e.preventDefault()
      goToDirectory()
      return
    }
    if (!open) return
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    }
  }

  const showPanel = open && trimmed.length > 0

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 transition-colors focus-within:border-accent/60">
        <Search className="size-4 shrink-0 text-faint" aria-hidden />
        <input
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="hero-search-listbox"
          aria-activedescendant={
            showPanel && results[activeIndex]
              ? `hero-search-opt-${results[activeIndex].slug}`
              : undefined
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          type="search"
          placeholder="Try “email automation”, “vector db”, “screen recorder”…"
          className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
          aria-label="Search the directory"
        />
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-line-strong bg-overlay text-left shadow-[0_24px_60px_-16px_rgba(0,0,0,0.7)]"
          >
            <ul id="hero-search-listbox" role="listbox" aria-label="Search results" className="p-1.5">
              {results.length === 0 ? (
                <li className="px-3 py-4 text-center text-sm text-faint">
                  No tools match “{trimmed}”.
                </li>
              ) : (
                results.map((tool, i) => (
                  <li key={tool.slug} role="option" id={`hero-search-opt-${tool.slug}`} aria-selected={i === activeIndex}>
                    <a
                      href={`/tools/${tool.slug}`}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={cn(
                        "flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                        i === activeIndex ? "bg-accent-soft" : ""
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span className="truncate font-medium text-fg">{tool.name}</span>
                        <span className="truncate font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                          {tool.useCase}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider",
                          tool.type === "human"
                            ? "border-[#e8a94e]/40 bg-[oklch(20%_0.05_85)] text-[#f0b95c]"
                            : "border-[#8f7bff]/40 bg-[oklch(20%_0.06_295)] text-[#b9a6ff]"
                        )}
                      >
                        {tool.type}
                      </span>
                    </a>
                  </li>
                ))
              )}
            </ul>
            <button
              type="button"
              onClick={goToDirectory}
              className="flex w-full items-center justify-between gap-2 border-t border-line-subtle bg-surface px-4 py-2.5 text-xs text-muted transition-colors hover:text-fg"
            >
              <span>
                {total > 0 ? (
                  <>
                    Search all <span className="text-fg">{total}</span> result{total === 1 ? "" : "s"} in the directory
                  </>
                ) : (
                  "Open the directory"
                )}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CornerDownLeft className="size-3.5 text-faint" aria-hidden />
                <ArrowRight className="size-3.5" aria-hidden />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}