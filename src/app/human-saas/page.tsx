import type { Metadata } from "next"
import { LayerArchive } from "@/components/layer/LayerArchive"
import { toolsByType } from "@/lib/data"
import { siteMetadata } from "@/lib/seo"

export const metadata: Metadata = siteMetadata({
  title: "Human SaaS — EchoTools",
  description:
    "The best human software: marketing, CRM, productivity, design, finance, hosting, and AI assistants — curated and compared for people who ship.",
})

export default function HumanSaaSPage() {
  return (
    <LayerArchive
      tools={toolsByType("human")}
      title="Human SaaS"
      eyebrow="Layer one · Human"
      description="Sixty-eight tools across marketing, work, dev, design, and finance. Curated for humans who ship."
    />
  )
}