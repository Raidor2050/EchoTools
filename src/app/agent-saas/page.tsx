import type { Metadata } from "next"
import { LayerArchive } from "@/components/layer/LayerArchive"
import { toolsByType } from "@/lib/data"
import { siteMetadata } from "@/lib/seo"

export const metadata: Metadata = siteMetadata({
  title: "Agent SaaS — EchoTools",
  description:
    "The agent software stack: frameworks, memory, scraping, vector data, browser agents, and observability — the infrastructure autonomous AI actually runs on.",
})

export default function AgentSaaSPage() {
  return (
    <LayerArchive
      tools={toolsByType("agent")}
      title="Agent SaaS"
      eyebrow="Layer two · Agent"
      description="Twelve tools that power autonomous AI: frameworks, memory, extraction, vector data, and observability. Curated for agents — with every affiliate relationship disclosed."
    />
  )
}