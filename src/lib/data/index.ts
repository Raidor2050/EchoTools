import type { Tool } from "../types"
import { toolsHumanAi } from "./tools-human-ai"
import { toolsHumanGrowth } from "./tools-human-growth"
import { toolsHumanWork } from "./tools-human-work"
import { toolsHumanDev } from "./tools-human-dev"
import { toolsHumanDesignFinance } from "./tools-human-design-finance"
import { toolsAgent } from "./tools-agent"

export const allTools: Tool[] = [
  ...toolsHumanAi,
  ...toolsHumanGrowth,
  ...toolsHumanWork,
  ...toolsHumanDev,
  ...toolsHumanDesignFinance,
  ...toolsAgent,
]

const toolMap = new Map(allTools.map((tool) => [tool.slug, tool]))

export function getTool(slug: string): Tool | undefined {
  return toolMap.get(slug)
}

export function toolsByType(type: Tool["type"]): Tool[] {
  return allTools.filter((tool) => tool.type === type)
}

export function toolsByCategory(slug: string): Tool[] {
  return allTools.filter((tool) => tool.categories.includes(slug))
}

export function toolsInCategories(slugs: string[]): Tool[] {
  return allTools.filter((tool) => tool.categories.some((c) => slugs.includes(c)))
}

export function recurringTools(): Tool[] {
  return allTools.filter((t) => t.affiliate.available && t.affiliate.recurring === true)
}

export function featuredTools(type: Tool["type"]): Tool[] {
  return allTools.filter((t) => t.type === type && t.flags.featured)
}

export function trendingTools(type: Tool["type"]): Tool[] {
  return allTools.filter((t) => t.type === type && t.flags.trending)
}

export function editorPicks(type: Tool["type"]): Tool[] {
  return allTools.filter((t) => t.type === type && (t.flags.featured || t.flags.trending))
}

export function bestValueTools(type: Tool["type"]): Tool[] {
  return allTools.filter((t) => t.type === type && t.flags.bestValue)
}

export function emergingTools(type: Tool["type"]): Tool[] {
  return allTools.filter((t) => t.type === type && t.flags.emerging)
}

export function recentTools(type: Tool["type"], count = 6): Tool[] {
  return [...allTools]
    .filter((t) => t.type === type)
    .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    .slice(0, count)
}

export function relatedTools(tool: Tool, count = 4): Tool[] {
  const scored = allTools
    .filter((t) => t.slug !== tool.slug && t.type === tool.type)
    .map((candidate) => {
      let score = 0
      candidate.categories.forEach((c) => {
        if (tool.categories.includes(c)) score += 2
      })
      candidate.tags.forEach((tag) => {
        if (tool.tags.includes(tag)) score += 1
      })
      if (candidate.affiliate.available) score += 0.5
      return { tool: candidate, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
  return scored.map((s) => s.tool)
}

export function catalogStats() {
  const human = toolsByType("human")
  const agent = toolsByType("agent")
  return {
    total: allTools.length,
    human: human.length,
    agent: agent.length,
    recurring: recurringTools().length,
    categories: new Set(allTools.flatMap((t) => t.categories)).size,
  }
}