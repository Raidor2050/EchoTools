import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { categories, getCategory } from "@/lib/categories"
import { toolsByCategory } from "@/lib/data"
import { categoryMetadata } from "@/lib/seo"
import { ToolCard } from "@/components/tools/ToolCard"
import { Eyebrow } from "@/components/ui/primitives"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return {}
  return categoryMetadata(category)
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const tools = toolsByCategory(slug)

  return (
    <div>
      <div className="border-b border-line-subtle bg-sunken/40">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Eyebrow className="mb-3">Category · {category.type === "human" ? "Human layer" : "Agent layer"}</Eyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-hero font-semibold text-fg">{category.name}</h1>
              <p className="mt-3 max-w-2xl text-body text-muted">{category.blurb}</p>
            </div>
            <Link
              href={`/tools?category=${slug}&type=${category.type}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-4 py-2 text-xs font-medium text-fg transition-colors hover:border-accent/50"
            >
              Open in directory
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="mb-6 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
          {tools.length} tools
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.slug} tool={tool} index={i} />
          ))}
        </ul>
      </div>
    </div>
  )
}