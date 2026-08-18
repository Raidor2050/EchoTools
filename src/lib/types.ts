export type ToolType = "human" | "agent"

export interface Plan {
  name: string
  price: number
  per: "month" | "year" | "one-time"
  billing: "month" | "year"
}

/**
 * Affiliate economics are first-class, isolated from ranking signals.
 * `recurring` is `null` when an affiliate program exists but the
 * recurring structure is unverified — never assumed.
 */
export interface AffiliateStatus {
  available: boolean
  recurring: boolean | null
  commission: string | null
  cookieDuration: string | null
  network: string | null
  signupUrl: string | null
  /** Managed centrally — swap in tracking URLs without touching components. */
  trackingUrl: string | null
  verified: boolean
  evidenceUrl: string | null
}

export type Confidence = "high" | "medium" | "low"

export interface ToolFlags {
  featured?: boolean
  trending?: boolean
  bestValue?: boolean
  emerging?: boolean
}

export interface Tool {
  slug: string
  name: string
  type: ToolType
  /** Primary category slug */
  category: string
  categories: string[]
  description: string
  long?: string
  useCase: string
  audience: string
  website: string
  pricing: string
  freeTier: boolean
  plans: Plan[]
  features: string[]
  pros: string[]
  cons: string[]
  integrations: string[]
  platforms: string[]
  api: boolean
  ai: boolean
  affiliate: AffiliateStatus
  competitors: string[]
  alternatives: string[]
  tags: string[]
  useCases: string[]
  confidence: Confidence
  verifiedAt: string
  addedAt: string
  flags: ToolFlags
}

export interface Category {
  slug: string
  name: string
  type: ToolType
  blurb: string
  icon: string
}