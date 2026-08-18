# EchoTools

**The software layer for humans and agents.**

EchoTools is an independent SaaS discovery directory. The
defining interaction is a HUMAN ↔ AGENT layer switch: one catalog, two
audiences. Dark, OKLCH-tinted interface; the accent re-tunes between amber
(Human) and violet (Agent) when you switch layers.

## What's inside

- **80 curated tools** (68 human, 12 agent) across 32 categories
- **Layer switch** — the whole interface re-tunes its accent (amber ↔ violet) when you flip between Human and Agent
- **Independent rankings** — every tool is evaluated on usefulness alone; pricing, features, and alternatives are verified and dated
- **Compare up to 4 tools** side by side, differences-only mode
- **⌘K command palette**, URL-state search/filter/sort, mobile-first
- **llms.txt** for AI agents, full JSON-LD (website/breadcrumb/tool schemas), sitemap, robots, branded OG image
- **124 static pages**, all prerendered (SSG) with `generateStaticParams`

## Tech

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
(OKLCH tokens) · motion (Framer Motion) · lucide-react

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # type-check + generate 124 static pages
npm run lint
```

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com   # default: https://echotools.dev
```

## Editorial policy

- Rankings are editorial and independent.
- Pricing, features, and alternatives are verified and dated on each tool page.
- Agent-readable summary: `/llms.txt`.

## Project layout

```
src/
  app/            pages, sitemap, robots, OG image, llms.txt (public/)
  components/     home · directory · tool · compare · layout · ui · providers
  lib/            types, categories, utils, seo, data/ (80-tool catalog)
```

See `implementation.md` for architecture decisions and `progress.md` for
status.

## License

MIT — see [LICENSE](LICENSE). (Tool names, logos, and vendor trademarks
remain the property of their owners.)