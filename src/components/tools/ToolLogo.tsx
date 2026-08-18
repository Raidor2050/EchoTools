import { cn } from "@/lib/utils"

function hashHue(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) % 360
  }
  return h
}

export function ToolLogo({
  slug,
  name,
  type,
  className,
}: {
  slug: string
  name: string
  type: "human" | "agent"
  className?: string
}) {
  const hue = hashHue(slug)
  const bg =
    type === "human"
      ? `oklch(22% 0.045 ${hue})`
      : `oklch(22% 0.05 ${hue})`
  const fg = `oklch(88% 0.05 ${hue})`
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-10 shrink-0 select-none items-center justify-center rounded-lg border border-white/10 font-semibold tracking-tight",
        className
      )}
      style={{ backgroundColor: bg, color: fg }}
    >
      {name.slice(0, 2)}
    </span>
  )
}