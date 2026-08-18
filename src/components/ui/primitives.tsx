"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>
}

const chipTones: Record<string, { className: string; style?: React.CSSProperties }> = {
  neutral: { className: "border-line-subtle bg-surface text-muted" },
  accent: { className: "border-accent/40 bg-accent-soft text-accent" },
  success: { className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" },
  human: {
    className: "text-[#f0b95c]",
    style: { borderColor: "oklch(78% 0.14 85 / 0.4)", backgroundColor: "oklch(20% 0.05 85)" },
  },
  agent: {
    className: "text-[#b9a6ff]",
    style: { borderColor: "oklch(72% 0.19 295 / 0.4)", backgroundColor: "oklch(20% 0.06 295)" },
  },
}

export function Chip({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode
  className?: string
  tone?: "neutral" | "accent" | "human" | "agent" | "success"
}) {
  const t = chipTones[tone]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-wider",
        t.className,
        className
      )}
      style={t.style}
    >
      {children}
    </span>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div className={cn("mb-8 flex flex-col gap-3", align === "center" && "items-center text-center", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="max-w-2xl text-h2 text-fg">{title}</h2>
      {description ? <p className="max-w-2xl text-body text-muted">{description}</p> : null}
    </div>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 0.9,
}: {
  value: number
  suffix?: string
  prefix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [display, setDisplay] = useState(0)
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: reduced ? 0.01 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  )
}