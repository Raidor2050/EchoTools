import type { MetadataRoute } from "next"
import { allTools } from "@/lib/data"
import { categories } from "@/lib/categories"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/tools"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/human-saas"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/agent-saas"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/compare"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/disclosure"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const toolPages: MetadataRoute.Sitemap = allTools.map((tool) => ({
    url: absoluteUrl(`/tools/${tool.slug}`),
    lastModified: new Date(tool.verifiedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticPages, ...toolPages, ...categoryPages]
}