import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { allTools, getTool } from "@/lib/data"
import { jsonLdSafe } from "@/lib/utils"
import { breadcrumbJsonLd, toolJsonLd, toolMetadata } from "@/lib/seo"
import { ToolHero } from "@/components/tool/ToolHero"
import { PricingBlock, ProsCons, FeaturesGrid } from "@/components/tool/blocks"
import { AlternativesRow } from "@/components/tool/AlternativesRow"

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return allTools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return {}
  return toolMetadata(tool)
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdSafe(toolJsonLd(tool)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdSafe(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Directory", href: "/tools" },
              { name: tool.name },
            ])
          ),
        }}
      />
      <ToolHero tool={tool} />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_22rem]">
        <div className="min-w-0 space-y-14">
          <FeaturesGrid tool={tool} />
          <PricingBlock tool={tool} />
          <ProsCons tool={tool} />
        </div>
        <div className="space-y-6">
          <div className="rounded-xl border border-line-subtle bg-surface p-5">
            <h2 className="text-sm font-semibold text-fg">Also worth noting</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {tool.competitors.slice(0, 4).map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-line-strong" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <AlternativesRow tool={tool} />
    </>
  )
}