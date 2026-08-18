import Link from "next/link"
import { BadgeCheck, Repeat, Lock, ExternalLink, CircleDollarSign } from "lucide-react"
import type { Tool } from "@/lib/types"

/**
 * The affiliate transparency panel. Shows exactly what we know about
 * the program behind this tool — or, when none exists, says so.
 */
export function AffiliateCard({ tool }: { tool: Tool }) {
  const a = tool.affiliate

  if (!a.available) {
    return (
      <aside className="rounded-xl border border-line-subtle bg-surface p-5">
        <div className="flex items-center gap-2">
          <Lock className="size-4 text-faint" aria-hidden />
          <h2 className="text-sm font-semibold text-fg">No affiliate program</h2>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {tool.name} has no affiliate program EchoTools participates in — we still link and
          recommend it because it earns its place in the catalog on usefulness alone.
        </p>
      </aside>
    )
  }

  const rows = [
    { label: "Commission", value: a.commission ?? "See program terms", icon: CircleDollarSign },
    { label: "Structure", value: a.recurring === true ? "Recurring" : a.recurring === false ? "One-time" : "Unverified", icon: Repeat },
    { label: "Cookie window", value: a.cookieDuration ?? "See program terms", icon: ExternalLink },
    { label: "Network", value: a.network ?? "Direct", icon: BadgeCheck },
  ]

  return (
    <aside className="rounded-xl border border-accent/30 bg-accent-soft/40 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-fg">How this link works</h2>
        <span className="inline-flex items-center gap-1 font-mono text-[0.625rem] uppercase tracking-wider text-accent">
          <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden />
          {a.verified ? "Verified" : "Unverified"}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        If you subscribe through the{" "}
        <span className="text-fg">Visit {tool.name}</span> button, EchoTools may earn a
        commission at no extra cost to you. Rankings and reviews are independent of these
        economics.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line-subtle bg-line-subtle">
        {rows.map((row) => (
          <div key={row.label} className="bg-surface px-3.5 py-3">
            <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">
              <row.icon className="mr-1.5 inline size-3" aria-hidden />
              {row.label}
            </dt>
            <dd className="mt-1 text-sm font-medium text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-faint">
        Program terms verified {tool.verifiedAt}.{" "}
        {a.evidenceUrl && (
          <>
            <a
              href={a.evidenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline-offset-4 hover:text-fg hover:underline"
            >
              View evidence
            </a>
            {" · "}
          </>
        )}
        <Link href="/disclosure" className="text-muted underline-offset-4 hover:text-fg hover:underline">
          Full disclosure
        </Link>
      </p>
    </aside>
  )
}