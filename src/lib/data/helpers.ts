import type {
  AffiliateStatus,
  Confidence,
  Plan,
  Tool,
  ToolFlags,
  ToolType,
} from "../types"

export const NO_AFFILIATE: AffiliateStatus = {
  available: false,
  recurring: null,
  commission: null,
  cookieDuration: null,
  network: null,
  signupUrl: null,
  trackingUrl: null,
  verified: false,
  evidenceUrl: null,
}

type PlanTuple =
  | [name: string, price: number]
  | [name: string, price: number, per: "month" | "year" | "one-time"]
  | [name: string, price: number, per: "month" | "year" | "one-time", billing: "month" | "year"]

export interface ToolInput {
  slug: string
  name: string
  type: ToolType
  category: string
  categories?: string[]
  description: string
  long?: string
  useCase: string
  audience: string
  website: string
  pricing: string
  freeTier?: boolean
  plans?: PlanTuple[]
  features: string[]
  pros?: string[]
  cons?: string[]
  integrations?: string[]
  platforms?: string[]
  api?: boolean
  ai?: boolean
  affiliate?: Partial<AffiliateStatus>
  competitors?: string[]
  alternatives?: string[]
  tags?: string[]
  useCases?: string[]
  confidence?: Confidence
  verifiedAt?: string
  addedAt?: string
  flags?: ToolFlags
}

export function t(input: ToolInput): Tool {
  const plans: Plan[] = (input.plans ?? []).map(([name, price, per = "month", billing = "month"]) => ({
    name,
    price,
    per,
    billing,
  }))
  return {
    slug: input.slug,
    name: input.name,
    type: input.type,
    category: input.category,
    categories: input.categories ?? [input.category],
    description: input.description,
    long: input.long,
    useCase: input.useCase,
    audience: input.audience,
    website: input.website,
    pricing: input.pricing,
    freeTier: input.freeTier ?? false,
    plans,
    features: input.features,
    pros: input.pros ?? [],
    cons: input.cons ?? [],
    integrations: input.integrations ?? [],
    platforms: input.platforms ?? ["web"],
    api: input.api ?? false,
    ai: input.ai ?? false,
    affiliate: { ...NO_AFFILIATE, ...input.affiliate },
    competitors: input.competitors ?? [],
    alternatives: input.alternatives ?? [],
    tags: input.tags ?? [],
    useCases: input.useCases ?? [],
    confidence: input.confidence ?? "medium",
    verifiedAt: input.verifiedAt ?? "2026-08-17",
    addedAt: input.addedAt ?? "2026-08-17",
    flags: input.flags ?? {},
  }
}

/** Recruiting-safe sort: strongest verified programs first. */
export function byAffiliateStrength(a: Tool, b: Tool): number {
  const score = (x: Tool) => {
    if (!x.affiliate.available) return 0
    if (x.affiliate.recurring === true) return x.affiliate.verified ? 3 : 2
    return x.affiliate.verified ? 1 : 0
  }
  return score(b) - score(a)
}