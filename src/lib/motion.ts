import type { Variants } from "motion/react"

/**
 * Shared motion canon (see docs/design-directives.md §5).
 * Transform + opacity only. No bounce, no overshoot.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const
export const EASE_IN = [0.3, 0, 1, 1] as const

export const springUi = { type: "spring", stiffness: 400, damping: 25 } as const
export const springSoft = { type: "spring", stiffness: 200, damping: 25, mass: 1.2 } as const
export const springKnob = { type: "spring", stiffness: 400, damping: 30 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
  },
}

export const viewportOnce = { once: true, amount: 0.3 } as const