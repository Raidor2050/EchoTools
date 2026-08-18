"use client"

import { motion } from "motion/react"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp, type Layer } from "@/components/providers/AppProviders"

const options: Array<{ value: Layer; label: string; icon: typeof User; sub: string }> = [
  { value: "human", label: "Human", icon: User, sub: "For people at desks" },
  { value: "agent", label: "Agent", icon: Bot, sub: "For autonomous AI" },
]

/**
 * The defining control of EchoTools. A radiogroup whose sliding knob
 * re-tunes the entire page's accent hue through CSS custom properties.
 */
export function LayerToggle({ size = "lg" }: { size?: "sm" | "lg" }) {
  const { layer, setLayer } = useApp()

  return (
    <div
      role="radiogroup"
      aria-label="Which layer are you buying for?"
      className={cn(
        "relative inline-flex rounded-full border border-line-strong bg-sunken p-1.5",
        size === "lg" ? "gap-1.5" : "gap-1"
      )}
    >
      {options.map((opt) => {
        const active = layer === opt.value
        const Icon = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLayer(opt.value)}
            className={cn(
              "relative z-10 flex items-center gap-2.5 rounded-full px-5 py-3 text-left transition-colors sm:px-7",
              active ? "text-bg" : "text-muted hover:text-fg"
            )}
          >
            {active && (
              <motion.span
                layoutId="hero-layer-knob"
                className="absolute inset-0 z-0 rounded-full bg-accent glow-accent"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <Icon className="relative z-10 size-5" strokeWidth={2.2} aria-hidden />
            <span className="relative z-10 flex flex-col">
              <span className={cn("font-semibold tracking-tight", size === "lg" ? "text-base" : "text-sm")}>
                {opt.label}
              </span>
              <span
                className={cn(
                  "font-mono text-[0.625rem] uppercase tracking-wider",
                  active ? "text-bg/70" : "text-faint"
                )}
              >
                {opt.sub}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}