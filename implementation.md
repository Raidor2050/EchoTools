# EchoTools — Implementation Notes

The software layer for humans and agents. An affiliate-first SaaS discovery
directory with a HUMAN ↔ AGENT layer switch as the defining interaction.

## Stack

- **Next.js 16.3.1** (App Router, Turbopack, static export-friendly), React 19.2.8
- **TypeScript** strict
- **Tailwind CSS v4** (`@theme inline` tokens, OKLCH)
- **motion** (Framer Motion) for all animation; `MotionConfig reducedMotion="user"`
- **lucide-react** icons · **clsx** + **tailwind-merge** for class composition
- ESLint 9 (`next/core-web-vitals`, `next/typescript`)

## Architecture

### Data layer (`src/lib/`)
- `types.ts` — `Tool`, `Plan`, `AffiliateStatus`, `ToolFlags`, `Category`.
  Affiliate economics are a first-class, isolated field (`trackingUrl` managed
  centrally) so monetization never leaks into ranking signals.
- `data/helpers.ts` — `t()` builder with sensible defaults (`NO_AFFILIATE`,
  platform normalization, verified/added dates) + `byAffiliateStrength`.
- `data/tools-*.ts` — 80-tool seed catalog (68 human, 12 agent), split by
  research batch: AI tools, growth/marketing, work/productivity, dev/hosting,
  design/finance/creator, agent infrastructure.
- `data/index.ts` — merged catalog + selectors (`getTool`, `toolsByType`,
  `trendingTools`, `relatedTools`, `catalogStats`, …).
- `categories.ts` — 32 categories (22 human, 10 agent) with icon keys.
- `utils.ts` — `cn`, pricing helpers, `sortTools`, `searchTool` (weighted
  field haystack), `jsonLdSafe` (escapes `<` for JSON-LD script safety).
- `seo.ts` — `SITE_URL` (env-overridable, default `https://echotools.dev`),
  metadata builders, JSON-LD builders (website, breadcrumb, software/tool).

### UI layer (`src/components/`)
- `providers/AppProviders.tsx` — layer state (human/agent) + compare tray
  state in one context; renders `data-layer={layer}` wrapper so the CSS
  accent hue re-tunes globally; `MotionConfig` reduced-motion.
- `layout/Header.tsx` — sticky blur header, nav, compact LayerSwitch,
  ⌘K GlobalSearch (combobox pattern, keyboard nav, grouped results).
- `layout/Footer.tsx` — nav columns, trust/disclosure block, llms.txt link.
- `home/` — `LayerToggle` (radiogroup + sliding `layoutId` knob),
  `Hero` (swap headline, search, stats), `TrustSection` (marquee of
  recurring programs), `DiscoverySections` (trending / editor picks /
  best value, animated grids), `CategoryExplorer` (icon bento).
- `tools/` — `ToolCard` (layout-animated), `ToolLogo` (deterministic hue
  from slug), `AffiliateBadge` (recurring / one-time / unverified),
  `CompareBar` (sticky tray, 4 max).
- `directory/DirectoryExplorer.tsx` — full client-side search/filter/sort
  surface; URL-state via `useSearchParams`; layer tabs; category chips;
  mobile bottom sheet; empty state that cross-promotes the other layer.
- `tool/` — `ToolHero` (breadcrumbs, CTAs, quick facts), `AffiliateCard`
  (full economics disclosure + evidence links), `blocks` (pricing/pros-cons/
  features/integrations), `AlternativesRow`.
- `compare/CompareView.tsx` — table comparison from `?tools=slug1,slug2`,
  differences-only toggle, verdict strip with recurring-count disclosure.
- `layer/LayerArchive.tsx` — shared layout for `/human-saas` & `/agent-saas`.

### Pages (`src/app/`)
- `/` — hero with layer toggle + stats, trust/marquee, discovery sections,
  category explorer, CTA banner. JSON-LD website schema in root layout.
- `/tools` — directory (client explorer, Suspense-wrapped for URL state).
- `/tools/[slug]` — 80 static pages via `generateStaticParams`; tool + breadcrumb
  JSON-LD; affiliate disclosure panel; related tools.
- `/categories/[slug]` — 32 static category pages, SEO metadata.
- `/human-saas`, `/agent-saas` — layer archives.
- `/compare` — comparison (Suspense-wrapped).
- `/disclosure` — affiliate disclosure policy.
- `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (branded OG PNG via
  `next/og`), `not-found.tsx`, `public/llms.txt` (agent-readable catalog).

## Design system (`globals.css`)

- Dark-first tinted canvas `oklch(13.5% 0.012 255)` (~`#0b0d12`), surface
  ladder via hairlines, no card shadows.
- **Hue-parameterized accents** via registered `@property` custom props:
  Human = amber `oklch(78% 0.14 85)`, Agent = violet `oklch(72% 0.19 295)`;
  `data-layer` swaps the hue, `.layer-accent` transitions it (~500ms).
- Type: Geist (sans), Instrument Serif (italic accents), Geist Mono (labels)
  via `next/font/google`; fluid `clamp()` scale (`text-display` → `text-label`).
- Motion: spring knob (`visualDuration 0.25, bounce 0.2`-ish), card stagger
  ≤ 12 items × 0.05s, `popLayout` FLIP exits, count-ups ~900ms, marquee,
  `prefers-reduced-motion` kill-switch.

## Affiliate integrity (hard rules)

1. Rankings/curation and affiliate economics are separate data structures.
2. Unverified programs are labeled unverified — never assumed recurring.
3. Every tool page discloses: commission, structure, cookie window, network,
   verification date, evidence URL (when available).
4. Affiliate links: `rel="nofollow sponsored noopener"`; tools without
   programs link with `noopener noreferrer` and say so.
5. `llms.txt` exists so AI agents get the same disclosure.

## Verified programs worth remembering

- **Recurring:** Make 35%/12mo · n8n 30%/12mo · Framer 50%/12mo · Webflow
  50%/12mo · GoHighLevel 40% lifetime · Ghost 30% lifetime · MailerLite 30%
  lifetime · Kit 50%+ · GetResponse 40–60%/12mo · Semrush 40% · HubSpot
  30%/12mo · Apify 20→30% · ElevenLabs 22%/12mo · Jasper 25%/12mo ·
  Copy.ai 45%/12mo · Writesonic 30% lifetime · Rytr 30% · ActiveCampaign 30% ·
  Pipedrive 20–30% · Instantly 20–40% · Reclaim 40% · Jotform 30% ·
  beehiiv ≤60% · Kajabi 100% first-month · Riverside 20% lifetime ·
  StreamYard 25% lifetime · Railway 15% · Netlify 20% · DigitalOcean 10%.
- **One-time:** Hostinger 40–60% CPA · Canva $36 · Surfer 75–125% CPA ·
  Descript $25 · Perplexity $10–20 · WP Engine $100–200 · SiteGround
  $50–100 · Gusto $200 · Deel $500+$1,000.
- **None/retired:** Zapier, Loom, Airtable, Figma, Mailchimp, Render,
  ChatGPT, Claude; most agent-infra vendors (Supabase, Pinecone, Neon…).

## Running

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check + static generation (124 pages)
npm run lint     # ESLint
```

## Next steps (see progress.md)

- Live URL, real tracking IDs in `trackingUrl`, OG image domain fix, content
  depth per tool, GitHub setup, deployment.