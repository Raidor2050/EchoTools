"use client"

import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import {
  Megaphone,
  Target,
  Zap,
  Kanban,
  PenTool,
  Wallet,
  BarChart3,
  Code2,
  Blocks,
  Server,
  Mail,
  Search,
  FileText,
  Video,
  ClipboardList,
  Workflow,
  Sparkles,
  Clapperboard,
  Mic,
  MessageSquare,
  Compass,
  Users,
  Boxes,
  MemoryStick,
  Network,
  Plug,
  Globe,
  Cpu,
  Gauge,
  Database,
  Bot,
  GitBranch,
  type LucideIcon,
} from "lucide-react"
import { categoriesFor } from "@/lib/categories"
import { toolsByCategory } from "@/lib/data"
import { useApp } from "@/components/providers/AppProviders"
import { SectionHeader } from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  target: Target,
  zap: Zap,
  kanban: Kanban,
  "pen-tool": PenTool,
  wallet: Wallet,
  "bar-chart-3": BarChart3,
  "code-2": Code2,
  blocks: Blocks,
  server: Server,
  mail: Mail,
  search: Search,
  "file-text": FileText,
  video: Video,
  "clipboard-list": ClipboardList,
  workflow: Workflow,
  sparkles: Sparkles,
  clapperboard: Clapperboard,
  mic: Mic,
  "message-square": MessageSquare,
  compass: Compass,
  users: Users,
  boxes: Boxes,
  "memory-stick": MemoryStick,
  network: Network,
  plug: Plug,
  globe: Globe,
  cpu: Cpu,
  gauge: Gauge,
  database: Database,
  bot: Bot,
  "git-branch": GitBranch,
}

const copy = {
  human: {
    eyebrow: "By category",
    title: "Everything a human team needs",
    desc: "Twenty-two categories covering the modern software stack — searchable, comparable, and ranked by usefulness.",
  },
  agent: {
    eyebrow: "By category",
    title: "Everything an agent stack needs",
    desc: "Ten categories of agent infrastructure — frameworks, memory, extraction, and observability.",
  },
}

export function CategoryExplorer() {
  const { layer } = useApp()
  const cats = categoriesFor(layer)

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6" aria-label="Browse by category">
      <SectionHeader {...copy[layer]} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={layer}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          {cats.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Sparkles
            const count = toolsByCategory(cat.slug).length
            return (
              <motion.li
                key={cat.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-xl border border-line-subtle bg-surface p-4 transition-colors hover:border-accent/40 hover:bg-raised"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-9 items-center justify-center rounded-lg border border-line-subtle bg-sunken text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                      {count} tools
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-fg">{cat.name}</h3>
                    <p className={cn("mt-1 text-xs leading-relaxed text-faint", "line-clamp-2")}>{cat.blurb}</p>
                  </div>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </AnimatePresence>
    </section>
  )
}