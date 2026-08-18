"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import { Menu, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { allTools } from "@/lib/data"
import { Logo } from "@/components/ui/Logo"
import { useApp, type Layer } from "@/components/providers/AppProviders"

const navLinks = [
  { href: "/tools", label: "Directory" },
  { href: "/human-saas", label: "Human SaaS" },
  { href: "/agent-saas", label: "Agent SaaS" },
  { href: "/compare", label: "Compare" },
]

function LayerSwitch({ compact = false }: { compact?: boolean }) {
  const { layer, setLayer } = useApp()
  const options: Array<{ value: Layer; label: string }> = [
    { value: "human", label: "Human" },
    { value: "agent", label: "Agent" },
  ]
  return (
    <div
      role="radiogroup"
      aria-label="Software layer"
      className={cn("relative flex rounded-lg border border-line-subtle bg-sunken p-0.5", compact && "scale-90 origin-right")}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={layer === opt.value}
          onClick={() => setLayer(opt.value)}
          className={cn(
            "relative z-10 rounded-md px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors",
            layer === opt.value ? "text-bg" : "text-muted hover:text-fg"
          )}
        >
          {layer === opt.value && (
            <motion.span
              layoutId="header-layer-knob"
              className="absolute inset-0 -z-10 rounded-md bg-accent"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu when navigating — state adjusted during render.
  const [prevPath, setPrevPath] = useState(pathname)
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-line-subtle bg-bg/85 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                pathname === link.href || (link.href !== "/tools" && pathname.startsWith(link.href))
                  ? "text-fg"
                  : "text-muted hover:text-fg"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LayerSwitch />
          </div>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-line-subtle bg-surface px-3 py-2 text-xs text-faint transition-colors hover:border-line-strong hover:text-muted"
            aria-label="Search tools (Command K)"
          >
            <Search className="size-3.5" />
            <span className="hidden lg:inline">Search tools…</span>
            <kbd className="hidden rounded border border-line-subtle bg-sunken px-1.5 py-0.5 font-mono text-[0.625rem] lg:inline">
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line-subtle text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line-subtle bg-bg md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm text-fg hover:bg-surface"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-3">
                <LayerSwitch />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {searchOpen && <GlobalSearch onClose={() => setSearchOpen(false)} />}
    </header>
  )
}

function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const { layer } = useApp()

  const tools = allTools.filter((t) => t.type === layer)

  const results = query.trim()
    ? tools.filter((t) => {
        const q = query.toLowerCase()
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.category.includes(q.toLowerCase())
        )
      })
    : tools.filter((t) => t.flags.trending).slice(0, 5)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, Math.max(results.length - 1, 0)))
      }
      if (e.key === "ArrowUp") {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [results.length, onClose])

  const safeIndex = Math.min(activeIndex, Math.max(results.length - 1, 0))

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 p-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-line-strong bg-overlay shadow-[0_24px_80px_-16px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line-subtle px-4 py-3">
          <Search className="size-4 text-faint" />
          <input
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls="search-listbox"
            aria-activedescendant={results[safeIndex] ? `search-opt-${results[safeIndex].slug}` : undefined}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${layer === "human" ? "human" : "agent"} SaaS…`}
            className="flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-faint"
          />
          <kbd className="rounded border border-line-subtle px-1.5 py-0.5 font-mono text-[0.625rem] text-faint">
            Esc
          </kbd>
        </div>
        <ul
          id="search-listbox"
          role="listbox"
          aria-label="Search results"
          className="max-h-[50vh] overflow-y-auto p-2"
        >
          {results.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-faint">
              No {layer} tools match “{query}”. Try the other layer.
            </li>
          )}
          {results.map((tool, i) => (
            <li key={tool.slug} role="option" id={`search-opt-${tool.slug}`} aria-selected={safeIndex === i}>
              <Link
                href={`/tools/${tool.slug}`}
                onClick={onClose}
                onMouseEnter={() => setActiveIndex(i)}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  safeIndex === i ? "bg-accent-soft text-fg" : "text-muted"
                }`}
              >
                <span className="truncate font-medium text-fg">{tool.name}</span>
                <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                  {tool.useCase}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-line-subtle px-4 py-2 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
          ↑↓ navigate · enter open · esc close
        </div>
      </motion.div>
    </div>
  )
}