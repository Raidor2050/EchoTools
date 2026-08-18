# EchoTools Design Directives v2 — "Model Black"

Ground truth for the v2 visual pass. Collated from impeccable + taste skill research,
Linear/Vercel/Raycast/Resend design analysis, OKLCH contrast math, and motion canon.
Each implementing agent MUST follow these values. When in doubt, match the site's
existing editorial identity (Geist + Instrument Serif italic accent + Geist Mono).

## 1. Color — Model Black background (user requirement)

Page canvas is near-pure black, NEVER `#000` and never pure `#fff`. Keep hue 255 (blue-
neutral) and chroma near zero so it reads as pure premium black.

| Token | Value | Hex ~ | Role |
|---|---|---|---|
| `--bg` | `oklch(0.095 0.003 255)` | `#070708` | page canvas (Model Black) |
| `--sunken` | `oklch(0.07 0.002 255)` | `#08080A` | wells/inset zones |
| `--surface` | `oklch(0.14 0.004 255)` | `#0F0F11` | cards |
| `--raised` | `oklch(0.18 0.005 255)` | `#17171A` | dropdowns, sticky header |
| `--overlay` | `oklch(0.22 0.006 255)` | `#202024` | modals/popovers |
| `--line-subtle` | `oklch(0.20 0.005 255)` | `#18181B` | hairline ≈ white 6% |
| `--line` | `oklch(0.26 0.006 255)` | `#232327` | default borders ≈ white 10% |
| `--line-strong` | `oklch(0.34 0.008 255)` | `#303036` | strong borders ≈ white 15% |
| `--fg` | `oklch(0.93 0.005 255)` | `#ECECEE` | off-white, never pure white |
| `--muted` | `oklch(0.71 0.008 255)` | `#A7A7AC` | ≥4.5:1 on every surface ✓ |
| `--faint` | `oklch(0.60 0.010 255)` | `#86868C` | metadata only (≥4.5:1 on bg) |
| `--disabled` | `oklch(0.46 0.008 255)` | `#5F5F65` | disabled/placeholder |

Accents — same hue system, slightly desaturated for dark:
- Human amber: `--accent-l 76%`, `--accent-c 0.12`, hue 85 (unchanged)
- Agent violet: `--accent-l 72%`, `--accent-c 0.13`, hue 295 (unchanged)
- `--accent-soft`: `oklch(0.17 0.04 85)` / agent `oklch(0.17 0.05 295)`

Rules:
- Keep ALL @theme inline token NAMES identical (`bg`, `surface`, `raised`, `overlay`, `sunken`, `fg`, `muted`, `faint`, `disabled`, `line-subtle`, `line`, `line-strong`, `accent`, `accent-strong`, `accent-soft`, `human`, `agent`, `text-*`, `animate-*`). Change values only — components reference names.
- Dark ink on accent/white fills for buttons (`text-bg` pattern already used) — never white text on accent fills (2.4:1 fails).
- Accent = punctuation only (<10% of view): links, hover, focus, selected chips, layer badge, hero glow, knob. NEVER card fills, never section backgrounds.
- Faint accent glow ONLY behind hero frame and at the layer-switch moment. Never per-card glow.
- Shadows only on floating layers (dropdowns, modals): `0 8px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.45)` + surface fill. Cards: border-only, no shadows.
- Elevation = lighter surface, never shadow.

## 2. Typography & readability

- Keep fonts: Geist sans body, Instrument Serif italic for editorial accents, Geist Mono for eyebrows/labels/data.
- Body ≥15px, line-height 1.6 (already `text-body`). Prose measure ≤65ch.
- Keep current `text-*` fluid scale and tracking (display -0.03em, hero -0.025em) — matches research.
- `tabular-nums` on ALL prices, ratings, counts (add utility or inline style where missing).
- Body weight never below 400; use 500/600 for emphasis (never 300 on dark).
- Eyebrow class: keep for section labels; cap at ~1 per 3 sections; NEVER above the hero H1 (remove if any exist there).
- Section headers 13px/600 uppercase mono, tracking 0.08-0.12em, muted — consistent everywhere.
- Links: accent color, weight 500, underline on hover (1px, offset 2-3px). Add a reusable underline treatment if it doesn't exist.
- Focus-visible rings, selection tint, scrollbar: keep existing (already accent-tinted).
- Kill em-dashes in hero/section copy where trivial (use commas/colons); keep within code/data.

## 3. Minimal SaaS cards (ToolCard)

- Anatomy: single `<a>` card, no inner buttons. Border-only: `border border-line-subtle bg-surface rounded-xl` (12px). No shadow, no gradient, no glow, no scale-on-hover.
- Logo tile: 40px square, radius 10px, brand-hue tint fill at 10-14% alpha, inner 1px ring white/10%, initials 13-14px/600 at brand hue ~85% lightness. Never random neon.
- Name 15-16px/600, one line. Tagline 13px muted, max 2 lines (truncate). Meta row 12px muted, dot-separated (`·`, 6px margins), tabular-nums for price/rating. Price 13px/500, right-aligned; "Free" = muted text, never a badge.
- Max 2 badges per card. Badges: pill, border-only (`border border-line`), 11px/500, muted text.
- Hover: border → `line-strong` + `translateY(-2px)`, 150-200ms. Nothing else moves.
- Grid: `repeat(auto-fill, minmax(280px, 1fr))`, gap 16px. Row heights consistent.
- Directory filter/sort chrome: keep, refine density; inputs match card radius; tabular counts.

## 4. Tool detail pages

- Hero: backlink/breadcrumb row above. Two-column ≥900px: left sticky (logo tile 64px radius 16px, name 24-28px/600 tracking -0.02em, tagline muted 15px, meta row), right column: primary CTA 44-48px radius 10px white fill + black text, disclosure line 12px muted directly beneath CTA (8px gap). Affiliate card stays trust-forward.
- PricingBlock: ≤4 columns; one highlighted (border `line-strong` + "Most popular" pill); per-seat as `$X/user/mo` with "per user" 12px muted; checkmarks 14px; tabular-nums; CTA top and bottom; mobile stacks.
- ProsCons: 2-column grid gap 16px (stack <900px), each column a border-only card, 3-5 rows, 13px text, 8px row gaps, muted check/x icons 14px.
- FeaturesGrid: `repeat(auto-fill, minmax(220px, 1fr))`, 16px icon muted + 13px label, 12px gap, no borders between tiles.
- AlternativesRow: compact horizontal cards — 32px logo, 13px name, 12px meta, border-only.
- Everything readable: body 15px+ on these pages; section spacing rhythm 8/16/24/32.

## 5. Fluid motion canon

Use shared helpers from `src/lib/motion.ts` (already created):
- Eases: out `[0.16,1,0.3,1]`, in-out `[0.65,0,0.35,1]`, in/exits `[0.3,0,1,1]`. No bounce, no overshoot, no `ease` default, no linear (except marquee).
- Durations: micro 150-200ms, state 200-300ms, reveal 400-500ms, hero focal ≤600ms. Exits 60-70% of entrance duration.
- Springs: UI `400/25`, soft `200/25`, knob `400/30`.
- Scroll reveal: `viewport={{ once: true, amount: 0.3 }}`, y 24→0 + opacity, stagger 0.06 children, cap total stagger ≤400ms. Transform+opacity ONLY (never animate layout props).
- Grid cards: no per-card entrance animation on the 80-card directory (perf); animate section headers/filters only. Animate card groups on homepage only.
- Buttons: `whileTap scale 0.97`, hover = color/border change (no scale on grid cards).
- Marquee: CSS keyframes exist (32s linear) — add `animation-play-state: paused` on hover/focus-within, optional edge `mask-image`.
- layoutId knob: keep existing unique layoutIds (`hero-layer-knob`, `header-layer-knob`, `dir-layer-knob`). Never duplicate a layoutId in the DOM simultaneously.
- Reduced motion: `MotionConfig reducedMotion="user"` in AppProviders; CSS kill-switch already exists in globals.
- One focal moment per viewport — don't animate every element; stagger sections, not everything.

## 6. Homepage & chrome

- Hero: headline ≤2 lines, subtext concise, primary CTA white fill (already), secondary ghost. Add ONE faint radial accent glow behind hero (radial-gradient, accent at 18-28% opacity, blur, pointer-events-none, transform+opacity only). Serif italic accent in headline: keep (identity).
- Sticky header: translucent blur veil (`bg-black/70 backdrop-blur-xl` style) — already; keep.
- TrustSection marquee: pause on hover, tabular stats.
- Section rhythm: py-24 to py-32 for major sections; keep current.
- Stats (CountUp): tabular-nums, no decoration.
- Keep LayerToggle knob behavior; polish knob surface (raised + 1px ring, shadow for float only).

## Non-goals
- No new dependencies (motion, lucide-react, clsx, tailwind-merge only).
- No data/content changes (src/lib/data, types, utils, categories, seo untouched).
- No token/class renames that components reference.
- No layoutId duplication; no layout-property animations.
- No pure #000 / pure #fff anywhere.