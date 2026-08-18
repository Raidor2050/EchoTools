import type { Tool } from "@/lib/types"
import { cn } from "@/lib/utils"

/**
 * Affiliate availability indicator. Never a link itself — the card CTA
 * carries the actual tracking URL. Verified recurring programs are
 * highlighted; everything else stays quiet.
 */
export function AffiliateBadge({ tool, className }: { tool: Tool; className?: string }) {
  const a = tool.affiliate
  if (!a.available) return null
  if (a.recurring === true) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded border border-accent/35 bg-accent-soft px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-accent",
          className
        )}
        title={a.commission ?? "Recurring affiliate program"}
      >
        <span className="size-1.5 rounded-full bg-accent animate-pulse-dot" aria-hidden />
        Recurring
      </span>
    )
  }
  if (a.recurring === false) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded border border-line-subtle bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-faint",
          className
        )}
        title={a.commission ?? "Affiliate program (one-time)"}
      >
        Affiliate
      </span>
    )
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-line-subtle bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-faint",
        className
      )}
      title={a.commission ?? "Affiliate program (terms unverified)"}
    >
      Affiliate?
    </span>
  )
}