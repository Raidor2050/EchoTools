"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, Check, Plus } from "lucide-react"
import type { Tool } from "@/lib/types"
import { cn, layerLabel, pricingLabel } from "@/lib/utils"
import { useApp } from "@/components/providers/AppProviders"
import { ToolLogo } from "@/components/tools/ToolLogo"
import { Chip } from "@/components/ui/primitives"
import { EASE_OUT } from "@/lib/motion"

function visitHref(tool: Tool): string {
  return tool.affiliate.available && tool.affiliate.trackingUrl
    ? tool.affiliate.trackingUrl
    : tool.website
}

function visitRel(tool: Tool): string {
  return tool.affiliate.available
    ? "nofollow sponsored noopener"
    : "noopener noreferrer"
}

export function ToolHero({ tool }: { tool: Tool }) {
  const { compare, toggleCompare } = useApp()
  const inCompare = compare.includes(tool.slug)

  return (
    <div className="border-b border-line-subtle bg-sunken/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
            <li>
              <Link href="/" className="hover:text-fg">Home</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/tools" className="hover:text-fg">Directory</Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/categories/${tool.category}`} className="hover:text-fg">
                {layerLabel(tool.type)} SaaS
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-muted" aria-current="page">
              {tool.name}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <ToolLogo slug={tool.slug} name={tool.name} type={tool.type} size="lg" className="size-16 rounded-2xl text-lg" />
              <div>
                <h1 className="text-h2 font-semibold text-fg">{tool.name}</h1>
                <p className="mt-1 text-[15px] text-muted">{tool.useCase}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Chip tone={tool.type === "human" ? "human" : "agent"}>
                {layerLabel(tool.type)} layer
              </Chip>
              {tool.api && <Chip tone="accent">API</Chip>}
              {tool.ai && <Chip tone="accent">AI</Chip>}
              {tool.plans.some((p) => p.price === 0) && <Chip>Free tier</Chip>}
            </div>

            <p className="mt-6 text-body text-muted">
              {tool.long ?? tool.description}
            </p>

            <p className="mt-3 font-mono text-[0.6875rem] uppercase tracking-wider text-faint">
              Best for: {tool.audience}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
            className="w-full shrink-0 lg:w-80"
          >
            <div className="rounded-xl border border-line-strong bg-surface p-5">
              <p className="eyebrow mb-2">Pricing</p>
              <p className="text-metric font-semibold text-fg">{pricingLabel(tool)}</p>
              <p className="mt-1 text-xs text-faint">{tool.pricing}</p>

              <div className="mt-5 flex flex-col gap-2.5">
                <motion.a
                  href={visitHref(tool)}
                  rel={visitRel(tool)}
                  target="_blank"
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-fg px-4 text-sm font-semibold text-bg transition-colors hover:bg-fg/90"
                >
                  Visit {tool.name}
                  <ArrowUpRight className="size-4" aria-hidden />
                </motion.a>
                <button
                  type="button"
                  aria-pressed={inCompare}
                  onClick={() => toggleCompare(tool.slug)}
                  className={cn(
                    "inline-flex h-10 items-center justify-center gap-2 rounded-[10px] border px-4 text-sm font-medium transition-colors",
                    inCompare
                      ? "border-accent/50 bg-accent-soft text-accent"
                      : "border-line-strong text-fg hover:border-accent/50"
                  )}
                >
                  {inCompare ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
                  {inCompare ? "In comparison" : "Add to compare"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line-subtle bg-line-subtle sm:grid-cols-4">
          <div className="bg-surface px-4 py-4">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">Platforms</dt>
            <dd className="mt-1 text-sm text-fg">{tool.platforms.join(" · ")}</dd>
          </div>
          <div className="bg-surface px-4 py-4">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">Integrations</dt>
            <dd className="mt-1 text-sm tabular-nums text-fg">{tool.integrations.length}</dd>
          </div>
          <div className="bg-surface px-4 py-4">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">API</dt>
            <dd className="mt-1 text-sm text-fg">{tool.api ? "Yes" : "No"}</dd>
          </div>
          <div className="bg-surface px-4 py-4">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">AI features</dt>
            <dd className="mt-1 text-sm text-fg">{tool.ai ? "Yes" : "No"}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}