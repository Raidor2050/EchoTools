import type { Metadata } from "next"
import { Suspense } from "react"
import { CompareView } from "@/components/compare/CompareView"
import { siteMetadata } from "@/lib/seo"

export const metadata: Metadata = siteMetadata({
  title: "Compare tools — EchoTools",
  description:
    "Compare software for humans and agents side by side: pricing, API access, integrations, and disclosed affiliate economics.",
})

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="px-6 py-24 text-center text-sm text-faint">Loading comparison…</p>}>
      <CompareView />
    </Suspense>
  )
}