import type { Metadata } from "next"
import type { Category, Tool } from "./types"
import { getCategory } from "./categories"

export const SITE_NAME = "EchoTools"
export const SITE_TAGLINE = "The software layer for humans and agents."
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://echotools.dev"

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export function siteMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${SITE_TAGLINE}`,
      template: `%s — ${SITE_NAME}`,
    },
    description:
      "Discover, compare, and understand subscription SaaS for humans and AI agents. Verified pricing, features, and alternatives.",
    keywords: [
      "SaaS directory",
      "AI agent tools",
      "human SaaS",
      "agent SaaS",
      "compare SaaS",
    ],
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description:
        "Discover, compare, and understand subscription SaaS for humans and AI agents.",
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description:
        "Discover, compare, and understand subscription SaaS for humans and AI agents.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    alternates: { canonical: SITE_URL },
    ...overrides,
  }
}

export function toolMetadata(tool: Tool): Metadata {
  const category = getCategory(tool.category)
  return {
    title: `${tool.name} — Pricing, Features & Alternatives`,
    description: `${tool.description} Compare ${tool.name}'s pricing, features, and alternatives.`,
    keywords: [
      tool.name,
      category?.name ?? tool.category,
      "SaaS",
      "pricing",
      "alternatives",
      ...tool.tags,
    ],
    openGraph: {
      type: "article",
      title: `${tool.name} — Pricing, Features & Alternatives`,
      description: tool.description,
      url: absoluteUrl(`/tools/${tool.slug}`),
    },
    alternates: { canonical: `/tools/${tool.slug}` },
  }
}

export function categoryMetadata(category: Category): Metadata {
  const layer = category.type === "human" ? "Human SaaS" : "Agent SaaS"
  return {
    title: `${category.name} ${layer} Tools`,
    description: category.blurb,
    alternates: { canonical: `/categories/${category.slug}` },
  }
}

/** SoftwareApplication JSON-LD per tool page. */
export function toolJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: absoluteUrl(`/tools/${tool.slug}`),
    applicationCategory: getCategory(tool.category)?.name ?? tool.category,
    operatingSystem: tool.platforms.join(", "),
    offers: tool.plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.price,
      priceCurrency: "USD",
      priceValidUntil: "2027-12-31",
    })),
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}