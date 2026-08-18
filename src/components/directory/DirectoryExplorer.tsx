"use client"

import { useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Search, X, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react"
import { allTools } from "@/lib/data"
import { categoriesFor } from "@/lib/categories"
import { searchTool, sortTools, cn } from "@/lib/utils"
import { stagger, listItem, viewportOnce } from "@/lib/motion"
import { useApp, type Layer } from "@/components/providers/AppProviders"
import { ToolCard } from "@/components/tools/ToolCard"
import { Eyebrow } from "@/components/ui/primitives"

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name A–Z" },
  { value: "price-asc", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
  { value: "affiliate", label: "Recurring affiliate" },
]

const layerTabs: Array<{ value: Layer | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "human", label: "Human" },
  { value: "agent", label: "Agent" },
]

const facetBase =
  "shrink-0 rounded-full border px-3 py-1.5 font-mono text-[0.625rem] uppercase tracking-wider transition-colors"

function readParam(value: string | null): string {
  return value ?? ""
}

export function DirectoryExplorer() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const { layer, setLayer } = useApp()

  const q = readParam(params.get("q"))
  const type = (readParam(params.get("type")) as Layer | "all") || layer
  const category = readParam(params.get("category"))
  const sort = readParam(params.get("sort")) || "featured"

  const [query, setQuery] = useState(q)
  const [sheetOpen, setSheetOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync local input state when the URL query changes (back/forward,
  // shared links) — adjusting state during render per React guidance.
  const [syncedQ, setSyncedQ] = useState(q)
  if (q !== syncedQ) {
    setSyncedQ(q)
    setQuery(q)
  }

  const updateParams = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === "") next.delete(key)
      else next.set(key, value)
    }
    const qs = next.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  const onQueryChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      updateParams({ q: value })
    }, 150)
  }

  const onTypeChange = (value: Layer | "all") => {
    updateParams({ type: value === layer ? null : value, category: null })
    if (value !== "all") setLayer(value)
  }

  const resetAll = () => {
    setQuery("")
    router.replace(pathname, { scroll: false })
  }

  const visibleCategories = useMemo(() => {
    if (type !== "all") return categoriesFor(type)
    return [...categoriesFor("human"), ...categoriesFor("agent")]
  }, [type])

  const results = useMemo(() => {
    let tools = allTools
    if (type !== "all") tools = tools.filter((t) => t.type === type)
    if (category) tools = tools.filter((t) => t.categories.includes(category))
    if (query) tools = tools.filter((t) => searchTool(t, query))
    return sortTools(tools, sort)
  }, [type, category, query, sort])

  const activeFilters = [
    query ? { key: "q", label: `“${query}”` } : null,
    type !== "all" ? { key: "type", label: type === "human" ? "Human layer" : "Agent layer" } : null,
    category
      ? { key: "category", label: visibleCategories.find((c) => c.slug === category)?.name ?? category }
      : null,
  ].filter(Boolean) as Array<{ key: string; label: string }>

  const facetList = visibleCategories.slice(0, 14)

  return (
    <div>
      <div className="border-b border-line-subtle bg-sunken/40">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={stagger}
          >
            <motion.div variants={listItem} className="mb-2">
              <Eyebrow className="tabular-nums">Directory · {allTools.length} tools</Eyebrow>
            </motion.div>
            <motion.h1 variants={listItem} className="text-hero font-semibold text-fg">
              Every tool, both layers.
            </motion.h1>
            <motion.p variants={listItem} className="mt-4 max-w-2xl text-body text-muted">
              Search the full catalog, filter by layer and category, sort by what matters —
              and see exactly which vendors pay recurring commissions.
            </motion.p>

            <motion.div variants={listItem} className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 transition-colors focus-within:border-accent/60">
                <Search className="size-4 shrink-0 text-faint" aria-hidden />
                <input
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  type="search"
                  placeholder="Search name, use case, feature, integration…"
                  className="w-full bg-transparent text-sm text-fg outline-none placeholder:text-faint"
                  aria-label="Search tools"
                />
                {query && (
                  <button type="button" onClick={() => onQueryChange("")} aria-label="Clear search" className="text-faint hover:text-fg">
                    <X className="size-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div role="radiogroup" aria-label="Layer filter" className="flex rounded-xl border border-line-subtle bg-sunken p-0.5">
                  {layerTabs.map((tab) => {
                    const active = type === tab.value
                    return (
                      <button
                        key={tab.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => onTypeChange(tab.value)}
                        className={cn(
                          "relative z-10 rounded-md px-4 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors",
                          active ? "text-bg" : "text-muted hover:text-fg"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="dir-layer-knob"
                            className="absolute inset-0 -z-10 rounded-md bg-accent"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSheetOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-line-subtle bg-surface px-3 py-2 text-xs text-muted lg:hidden"
                    aria-expanded={sheetOpen}
                  >
                    <SlidersHorizontal className="size-3.5" aria-hidden />
                    Categories
                  </button>
                  <div className="relative inline-flex items-center">
                    <ArrowUpDown className="pointer-events-none absolute left-3 size-3.5 text-faint" aria-hidden />
                    <select
                      value={sort}
                      onChange={(e) => updateParams({ sort: e.target.value })}
                      aria-label="Sort tools"
                      className="appearance-none rounded-xl border border-line-subtle bg-surface py-2 pl-8 pr-8 text-xs text-muted outline-none transition-colors hover:border-line-strong focus-visible:border-accent/60"
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

              <div className="hidden gap-2 overflow-x-auto pb-1 lg:flex">
                <button
                  type="button"
                  onClick={() => updateParams({ category: null })}
                  className={cn(
                    facetBase,
                    !category
                      ? "border-accent/50 bg-accent-soft text-accent"
                      : "border-line-subtle bg-surface text-muted hover:border-line-strong hover:text-fg"
                  )}
                >
                  All
                </button>
                {facetList.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => updateParams({ category: c.slug === category ? null : c.slug })}
                    className={cn(
                      facetBase,
                      category === c.slug
                        ? "border-accent/50 bg-accent-soft text-accent"
                        : "border-line-subtle bg-surface text-muted hover:border-line-strong hover:text-fg"
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {activeFilters.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint tabular-nums">
                      {results.length} result{results.length === 1 ? "" : "s"}
                    </span>
                    {activeFilters.map((f) => (
                      <button
                        key={f.key}
                        type="button"
                        onClick={() => {
                          if (f.key === "q") updateParams({ q: null })
                          if (f.key === "type") updateParams({ type: null })
                          if (f.key === "category") updateParams({ category: null })
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:border-line-strong"
                      >
                        {f.label}
                        <X className="size-3" aria-hidden />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={resetAll}
                      className="text-xs text-faint underline-offset-4 hover:text-fg hover:underline"
                    >
                      Clear all
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {results.length > 0 ? (
          <AnimatePresence mode="popLayout" initial={false}>
            <ul
              key={`${type}-${category}-${sort}`}
              className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4"
            >
              {results.map((tool) => (
                <ToolCard key={tool.slug} tool={tool}  />
              ))}
            </ul>
          </AnimatePresence>
        ) : (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-line-subtle bg-surface px-6 py-20 text-center">
            <Sparkles className="size-6 text-faint" aria-hidden />
            <div>
              <p className="text-sm font-medium text-fg">Nothing matches “{query}”.</p>
              <p className="mt-1 text-sm text-muted">
                Try a different term, or check the other layer —{" "}
                {type === "human" ? (
                  <button type="button" onClick={() => onTypeChange("agent")} className="text-accent underline-offset-4 hover:underline">
                    agent tools
                  </button>
                ) : (
                  <button type="button" onClick={() => onTypeChange("human")} className="text-accent underline-offset-4 hover:underline">
                    human tools
                  </button>
                )}
                .
              </p>
            </div>
            <button type="button" onClick={resetAll} className="rounded-xl border border-line-strong px-4 py-2 text-xs font-medium text-fg hover:border-accent/50">
              Reset all filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              role="dialog"
              aria-modal="true"
              aria-label="Category filters"
              className="fixed inset-x-0 bottom-0 z-50 max-h-[75vh] overflow-y-auto rounded-t-2xl border-t border-line-strong bg-overlay p-5 lg:hidden"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-fg">Categories</p>
                <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close" className="text-faint hover:text-fg">
                  <X className="size-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    updateParams({ category: null })
                    setSheetOpen(false)
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs",
                    !category ? "border-accent/50 bg-accent-soft text-accent" : "border-line-subtle bg-surface text-muted"
                  )}
                >
                  All
                </button>
                {visibleCategories.map((c) => (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => {
                      updateParams({ category: c.slug === category ? null : c.slug })
                      setSheetOpen(false)
                    }}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs",
                      category === c.slug
                        ? "border-accent/50 bg-accent-soft text-accent"
                        : "border-line-subtle bg-surface text-muted"
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
