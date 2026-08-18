import { cn } from "@/lib/utils"

function hashHue(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) % 360
  }
  return h
}

const tileSizes = {
  sm: "size-9 rounded-lg text-xs",
  md: "size-10 rounded-[10px] text-[0.8125rem]",
  lg: "size-14 rounded-xl text-base",
} as const

export function ToolLogo({
  slug,
  name,
  type,
  size = "md",
  className,
}: {
  slug: string
  name: string
  type: "human" | "agent"
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const hue = hashHue(slug)
  const chroma = type === "human" ? 0.08 : 0.1
  const bg = `oklch(70% ${chroma} ${hue} / 0.12)`
  const fg = `oklch(86% ${chroma} ${hue})`
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 select-none items-center justify-center border border-white/10 font-semibold tracking-tight",
        tileSizes[size],
        className
      )}
      style={{ backgroundColor: bg, color: fg }}
    >
      {name.slice(0, 2)}
    </span>
  )
}
