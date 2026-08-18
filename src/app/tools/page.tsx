import type { Metadata } from "next"
import { Suspense } from "react"
import { DirectoryExplorer } from "@/components/directory/DirectoryExplorer"
import { siteMetadata } from "@/lib/seo"
import { allTools } from "@/lib/data"

export const metadata: Metadata = siteMetadata({
  title: "Directory — EchoTools",
  description:
    "Browse and compare software for humans and AI agents. Search by use case, filter by layer and category, and see which vendors run recurring affiliate programs.",
})

export default function DirectoryPage() {
  return (
    <div>
      <Suspense fallback={<p className="px-6 py-20 text-center text-sm text-faint">Loading directory…</p>}>
        <DirectoryExplorer />
      </Suspense>
      <p className="sr-only">{allTools.length} tools in catalog.</p>
    </div>
  )
}