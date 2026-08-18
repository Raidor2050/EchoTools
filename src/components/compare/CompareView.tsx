"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Check, Minus, SlidersHorizontal, X } from "lucide-react"
import { allTools, getTool } from "@/lib/data"
import { cn, fmtPrice, layerLabel, pricingLabel } from "@/lib/utils"
import { useApp } from "@/components/providers/AppProviders"
import { ToolLogo } from "@/components/tools/ToolLogo"
import { Eyebrow } from "@/components/ui/primitives"
import type { Tool } from "@/lib/types"

interface Row {
  key: string
  label: string
  render: (tool: Tool) => React.ReactNode
}

function Bool({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex text-accent"><Check className="size-4" aria-hidden /></span>
  ) : (
    <span className="inline-flex text-faint"><Minus className="size-4" aria-hidden /></span>
  )
}

function Cta({ tool }: { tool: Tool }) {
  const href =
    tool.affiliate.available && tool.affiliate.trackingUrl
      ? tool.affiliate.trackingUrl
      : tool.website
  return (
    <a
      href={href}
      target="_blank"
      rel={tool.affiliate.available ? "nofollow sponsored noopener" : "noopener noreferrer"}
      className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-bg transition-colors hover:bg-accent-strong"
    >
      Visit <ArrowUpRight className="size-3.5" aria-hidden />
    </a>
  )
}

const rows: Row[] = [
  { key: "layer", label: "Layer", render: (t) => <span className="font-mono text-xs uppercase tracking-wider text-muted">{layerLabel(t.type)}</span> },
  { key: "useCase", label: "Use case", render: (t) => <span className="text-sm text-muted">{t.useCase}</span> },
  { key: "price", label: "Pricing", render: (t) => <span className="text-sm font-medium text-fg">{pricingLabel(t)}</span> },
  { key: "free", label: "Free tier", render: (t) => <Bool value={t.freeTier} /> },
  { key: "api", label: "API", render: (t) => <Bool value={t.api} /> },
  { key: "ai", label: "AI features", render: (t) => <Bool value={t.ai} /> },
  { key: "platforms", label: "Platforms", render: (t) => <span className="text-xs text-muted">{t.platforms.join(", ")}</span> },
  { key: "integrations", label: "Integrations", render: (t) => <span className="text-sm text-fg">{t.integrations.length}</span> },
  {
    key: "affiliate",
    label: "Affiliate",
    render: (t) =>
      t.affiliate.available ? (
        <span className={cn("font-mono text-xs uppercase tracking-wider", t.affiliate.recurring === true ? "text-accent" : "text-muted")}>
          {t.affiliate.recurring === true ? "Recurring" : t.affiliate.recurring === false ? "One-time" : "Unknown"}
          {t.affiliate.commission ? ` · ${t.affiliate.commission}` : ""}
        </span>
      ) : (
        <span className="font-mono text-xs uppercase tracking-wider text-faint">None</span>
      ),
  },
  { key: "tags", label: "Tags", render: (t) => <span className="text-xs text-faint">{t.tags.slice(0, 3).join(", ")}</span> },
]

export function CompareView() {
  const params = useSearchParams()
  const { compare, toggleCompare, clearCompare } = useApp()
  const [diffOnly, setDiffOnly] = useState(false)

  const slugs = useMemo(
    () => (params.get("tools") ?? "").split(",").filter(Boolean).slice(0, 4),
    [params]
  )

  const tools = useMemo(() => {
    const list = slugs.map((s) => getTool(s)).filter((t): t is Tool => Boolean(t))
    const fromTray = compare.map((s) => getTool(s)).filter((t): t is Tool => Boolean(t))
    const merged = [...list]
    for (const t of fromTray) {
      if (!merged.some((m) => m.slug === t.slug)) merged.push(t)
    }
    return merged
  }, [slugs, compare])

  const visibleRows = diffOnly
    ? rows.filter((row) => {
        const values = tools.map((t) => JSON.stringify(row.render(t)))
        return new Set(values).size > 1
      })
    : rows

  if (tools.length < 2) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6">
        <SlidersHorizontal className="size-6 text-faint" aria-hidden />
        <div>
          <p className="text-sm font-medium text-fg">Pick at least two tools to compare.</p>
          <p className="mt-1 text-sm text-muted">Use the + button on any card, or open the directory and choose.</p>
        </div>
        <Link href="/tools" className="rounded-lg border border-line-strong px-4 py-2 text-xs font-medium text-fg hover:border-accent/50">
          Open directory
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Eyebrow className="mb-3">Comparison</Eyebrow>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-hero font-semibold text-fg">Side by side.</h1>
        <div className="flex items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={diffOnly}
              onChange={(e) => setDiffOnly(e.target.checked)}
              className="size-3.5 accent-[oklch(var(--accent-l)_var(--accent-c)_var(--accent-h))]"
            />
            Differences only
          </label>
          <button type="button" onClick={clearCompare} className="text-xs text-faint hover:text-fg">
            Clear
          </button>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl border border-line-subtle">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-line-subtle bg-surface">
              <th scope="col" className="w-40 px-4 py-4 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                {tools.length} tools
              </th>
              {tools.map((tool) => (
                <th key={tool.slug} scope="col" className="px-4 py-4 align-top">
                  <div className="flex items-center gap-3">
                    <ToolLogo slug={tool.slug} name={tool.name} type={tool.type} className="size-9" />
                    <div>
                      <Link href={`/tools/${tool.slug}`} className="text-sm font-semibold text-fg hover:text-accent">
                        {tool.name}
                      </Link>
                      <p className="mt-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                        {tool.category}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${tool.name}`}
                      onClick={() => toggleCompare(tool.slug)}
                      className="text-faint hover:text-fg"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {visibleRows.map((row) => (
                <motion.tr
                  key={row.key}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-b border-line-subtle last:border-0 odd:bg-sunken/30"
                >
                  <th scope="row" className="px-4 py-3.5 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                    {row.label}
                  </th>
                  {tools.map((tool) => (
                    <td key={tool.slug} className="px-4 py-3.5">
                      {row.render(tool)}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
            <tr className="bg-surface">
              <th scope="row" className="px-4 py-4 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                Visit
              </th>
              {tools.map((tool) => (
                <td key={tool.slug} className="px-4 py-4">
                  <Cta tool={tool} />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl border border-accent/30 bg-accent-soft/40 p-5">
        <p className="eyebrow mb-2 text-accent">Verdict</p>
        <p className="text-sm leading-relaxed text-muted">
          {tools.filter((t) => t.affiliate.available && t.affiliate.recurring === true).length} of{" "}
          {tools.length} tools run recurring affiliate programs — disclosed in the table above.
          Rankings here are neutral: pick on price, API access, and fit, and treat affiliate
          economics as a bonus, not a factor.
        </p>
        {allTools.length > 0 && (
          <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
            Cheapest starting price: {fmtPrice(Math.min(...tools.map((t) => t.plans.filter((p) => p.price > 0).reduce((m, p) => Math.min(m, p.price), Infinity))))}
          </p>
        )}
      </div>
    </div>
  )
}