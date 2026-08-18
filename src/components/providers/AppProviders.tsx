"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

export type Layer = "human" | "agent"

interface AppContextValue {
  layer: Layer
  setLayer: (layer: Layer) => void
  toggleLayer: () => void
  compare: string[]
  toggleCompare: (slug: string) => void
  clearCompare: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export const MAX_COMPARE = 4

export function AppProviders({ children }: { children: ReactNode }) {
  const [layer, setLayer] = useState<Layer>("human")
  const [compare, setCompare] = useState<string[]>([])

  const toggleLayer = useCallback(() => {
    setLayer((l) => (l === "human" ? "agent" : "human"))
  }, [])

  const toggleCompare = useCallback((slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, slug]
    })
  }, [])

  const clearCompare = useCallback(() => setCompare([]), [])

  const value = useMemo(
    () => ({ layer, setLayer, toggleLayer, compare, toggleCompare, clearCompare }),
    [layer, compare, toggleLayer, toggleCompare, clearCompare]
  )

  return (
    <MotionConfig reducedMotion="user">
      <AppContext.Provider value={value}>
        <div data-layer={layer} className="layer-accent min-h-dvh">
          {children}
        </div>
      </AppContext.Provider>
    </MotionConfig>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProviders")
  return ctx
}