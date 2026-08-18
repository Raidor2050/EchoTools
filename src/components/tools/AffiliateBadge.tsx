import type { Tool } from "@/lib/types"
import { cn } from "@/lib/utils"

/**
 * Affiliate availability indicator. Never a link itself — the card CTA
 * carries the actual tracking URL. Verified recurring programs are
 * highlighted with green-tint text; everything else stays quiet.
 */
export function AffiliateBadge({ tool, className }: { tool: Tool; className?: string }) {
  const a = tool.affiliate
  if (!a.available) return null
  if (a.recurring === true) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border border-emerald-500/30 px-2.5 py-1 text-[0.6875rem] font-medium text-emerald-400",
          className
        )}
        title={a.commission ?? "Recurring affiliate program"}
      >
        Recurring
      </span>
    )
  }
  if (a.recurring === false) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-medium text-muted",
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
        "inline-flex items-center rounded-full border border-line px-2.5 py-1 text-[0.6875rem] font-medium text-muted",
        className
      )}
      title={a.commission ?? "Affiliate program (terms unverified)"}
    >
      Affiliate?
    </span>
  )
}
