import type { Tool } from "@/lib/types"
import { relatedTools } from "@/lib/data"
import { ToolCard } from "@/components/tools/ToolCard"
import { SectionHeader } from "@/components/ui/primitives"

export function AlternativesRow({ tool }: { tool: Tool }) {
  const related = relatedTools(tool, 3)
  if (related.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6" aria-label={`Alternatives to ${tool.name}`}>
      <SectionHeader
        eyebrow="Alternatives"
        title={`Similar tools to ${tool.name}`}
        description="Compared on usefulness first — affiliate economics are always disclosed, never decisive."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((r, i) => (
          <ToolCard key={r.slug} tool={r} index={i} />
        ))}
      </ul>
    </section>
  )
}