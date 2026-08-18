import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Tool } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmtPrice(price: number): string {
  if (price === 0) return "Free"
  if (Number.isInteger(price)) return `$${price}`
  return `$${price.toFixed(2)}`
}

export function minPrice(tool: Tool): number {
  return tool.plans.reduce((min, p) => Math.min(min, p.price), Infinity)
}

export function pricingLabel(tool: Tool): string {
  if (tool.plans.length === 0) return tool.pricing
  const min = minPrice(tool)
  if (min === Infinity) return tool.pricing
  if (min === 0) return `Free · from $${nextPaid(tool)}${
    nextPaid(tool) === Infinity ? "" : "/mo"
  }`
  return `From $${formatMin(min)}/mo`
}

function nextPaid(tool: Tool): number {
  const paid = tool.plans
    .filter((p) => p.price > 0 && p.per === "month")
    .map((p) => p.price)
  return paid.length ? Math.min(...paid) : Infinity
}

function formatMin(min: number): string {
  return Number.isInteger(min) ? String(min) : min.toFixed(2)
}

export function typeName(type: Tool["type"]): string {
  return type === "human" ? "Human SaaS" : "Agent SaaS"
}

export function toolHref(slug: string): string {
  return `/tools/${slug}`
}

export function layerLabel(type: Tool["type"]): string {
  return type === "human" ? "Human layer" : "Agent layer"
}

export function affiliateLabel(tool: Tool): string | null {
  const a = tool.affiliate
  if (!a.available) return null
  if (a.recurring === true) return "Recurring commission"
  if (a.recurring === false) return "One-time commission"
  return "Affiliate program"
}

export function sortTools(tools: Tool[], sort: string): Tool[] {
  const arr = [...tools]
  switch (sort) {
    case "name":
      return arr.sort((a, b) => a.name.localeCompare(b.name))
    case "price-asc":
      return arr.sort((a, b) => minPrice(a) - minPrice(b))
    case "price-desc":
      return arr.sort((a, b) => minPrice(b) - minPrice(a))
    case "newest":
      return arr.sort((a, b) => b.addedAt.localeCompare(a.addedAt))
    case "affiliate":
      return arr.sort((a, b) => {
        const ra = a.affiliate.recurring === true ? 1 : 0
        const rb = b.affiliate.recurring === true ? 1 : 0
        return rb - ra || Number(b.affiliate.available) - Number(a.affiliate.available)
      })
    case "featured":
    default:
      return arr.sort(
        (a, b) =>
          Number(b.flags.featured ?? false) - Number(a.flags.featured ?? false) ||
          Number(b.flags.trending ?? false) - Number(a.flags.trending ?? false)
      )
  }
}

export function searchTool(tool: Tool, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    tool.name,
    tool.description,
    tool.useCase,
    tool.audience,
    tool.pricing,
    tool.category,
    ...tool.categories,
    ...tool.tags,
    ...tool.useCases,
    ...tool.features,
    ...tool.competitors,
    ...tool.alternatives,
    ...tool.integrations,
    tool.type,
  ]
    .join(" ")
    .toLowerCase()
  return q.split(/\s+/).every((term) => haystack.includes(term))
}

export function countRecurring(tools: Tool[]): number {
  return tools.filter((t) => t.affiliate.available && t.affiliate.recurring === true)
    .length
}

export function jsonLdSafe(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, "\\u003c")
}