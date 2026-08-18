import Link from "next/link"
import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("size-8", className)}
    >
      <rect x="1" y="1" width="30" height="30" rx="7" className="fill-surface stroke-line-strong" strokeWidth="1.5" />
      <rect x="7" y="9" width="18" height="5" rx="1.5" fill="oklch(78% 0.14 85)" opacity="0.9" />
      <rect x="7" y="18" width="18" height="5" rx="1.5" fill="oklch(72% 0.19 295)" opacity="0.9" />
    </svg>
  )
}

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="EchoTools — home"
    >
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-3" />
      <span className="text-[1.05rem] font-semibold tracking-tight text-fg">
        <span className="serif-accent text-[1.12rem]">Echo</span>
        Tools
      </span>
    </Link>
  )
}