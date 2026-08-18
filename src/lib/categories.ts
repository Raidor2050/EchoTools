import type { Category } from "./types"

export const categories: Category[] = [
  // ── Human SaaS ────────────────────────────────────────────────
  { slug: "marketing", name: "Marketing", type: "human", blurb: "Funnels, campaigns, and growth platforms for teams that sell.", icon: "megaphone" },
  { slug: "sales-crm", name: "Sales & CRM", type: "human", blurb: "Pipelines, prospecting, and relationship management.", icon: "target" },
  { slug: "productivity", name: "Productivity", type: "human", blurb: "Notes, tasks, calendars, and second brains for individuals and teams.", icon: "zap" },
  { slug: "project-management", name: "Project Management", type: "human", blurb: "Plan, track, and ship work with your team.", icon: "kanban" },
  { slug: "design", name: "Design", type: "human", blurb: "UI, visual, and web design tools for creative teams.", icon: "pen-tool" },
  { slug: "finance", name: "Finance & Accounting", type: "human", blurb: "Invoicing, bookkeeping, payroll, and global payments.", icon: "wallet" },
  { slug: "analytics", name: "Analytics", type: "human", blurb: "Understand product, web, and customer behavior.", icon: "bar-chart-3" },
  { slug: "development", name: "Development", type: "human", blurb: "Deploy, build, and ship software faster.", icon: "code-2" },
  { slug: "no-code", name: "No-Code & Low-Code", type: "human", blurb: "Build apps, sites, and automations without engineering.", icon: "blocks" },
  { slug: "hosting-cloud", name: "Hosting & Cloud", type: "human", blurb: "Infrastructure, managed hosting, and cloud platforms.", icon: "server" },
  { slug: "email", name: "Email Marketing", type: "human", blurb: "Newsletters, campaigns, and email automation.", icon: "mail" },
  { slug: "seo", name: "SEO", type: "human", blurb: "Rank higher: keywords, backlinks, and content optimization.", icon: "search" },
  { slug: "content", name: "Content & Publishing", type: "human", blurb: "Blogs, newsletters, and publishing platforms.", icon: "file-text" },
  { slug: "video", name: "Video", type: "human", blurb: "Recording, editing, streaming, and video messaging.", icon: "video" },
  { slug: "forms", name: "Forms & Surveys", type: "human", blurb: "Collect answers, leads, and registrations.", icon: "clipboard-list" },
  { slug: "automation", name: "Automation", type: "human", blurb: "Connect apps and automate repetitive work.", icon: "workflow" },
  { slug: "ai-writing", name: "AI Writing", type: "human", blurb: "Generate and optimize copy, content, and campaigns.", icon: "sparkles" },
  { slug: "ai-video", name: "AI Video", type: "human", blurb: "Create and edit video with AI assistance.", icon: "clapperboard" },
  { slug: "ai-voice", name: "AI Voice & Audio", type: "human", blurb: "Speech synthesis, cloning, and audio production.", icon: "mic" },
  { slug: "ai-chat", name: "AI Assistants", type: "human", blurb: "General-purpose AI assistants for work and life.", icon: "message-square" },
  { slug: "ai-search", name: "AI Search", type: "human", blurb: "Answer engines and AI-powered research.", icon: "compass" },
  { slug: "creator", name: "Creator Economy", type: "human", blurb: "Courses, communities, and creator business infrastructure.", icon: "users" },

  // ── Agent SaaS ────────────────────────────────────────────────
  { slug: "agent-frameworks", name: "Agent Frameworks", type: "agent", blurb: "Build, orchestrate, and chain AI agents.", icon: "boxes" },
  { slug: "agent-memory", name: "Agent Memory", type: "agent", blurb: "Persistent memory and context for agents.", icon: "memory-stick" },
  { slug: "agent-infrastructure", name: "Agent Infrastructure", type: "agent", blurb: "Runtime, storage, and plumbing for agentic systems.", icon: "network" },
  { slug: "agent-apis", name: "Agent APIs", type: "agent", blurb: "Programmable surfaces for agents to act on the web.", icon: "plug" },
  { slug: "browser-agents", name: "Browser Agents", type: "agent", blurb: "Headless browsers and computer-use infrastructure.", icon: "globe" },
  { slug: "model-tooling", name: "Model Tooling", type: "agent", blurb: "Tooling around LLMs: routing, evals, and prompts.", icon: "cpu" },
  { slug: "agent-observability", name: "Agent Observability", type: "agent", blurb: "Trace, monitor, and evaluate agent runs.", icon: "gauge" },
  { slug: "vector-data", name: "Vector & Data Infrastructure", type: "agent", blurb: "Databases and retrieval for RAG and embeddings.", icon: "database" },
  { slug: "web-scraping", name: "Web Scraping & Extraction", type: "agent", blurb: "Turn the web into structured data for models.", icon: "bot" },
  { slug: "multi-agent", name: "Multi-Agent Systems", type: "agent", blurb: "Coordinate many agents working together.", icon: "git-branch" },
]

export const categoryMap = new Map(categories.map((c) => [c.slug, c]))

export function getCategory(slug: string): Category | undefined {
  return categoryMap.get(slug)
}

export function categoriesFor(type: "human" | "agent"): Category[] {
  return categories.filter((c) => c.type === type)
}