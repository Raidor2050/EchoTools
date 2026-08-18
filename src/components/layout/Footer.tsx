import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { categories } from "@/lib/categories"

const explore = [
  { href: "/tools", label: "Directory" },
  { href: "/human-saas", label: "Human SaaS" },
  { href: "/agent-saas", label: "Agent SaaS" },
  { href: "/compare", label: "Compare tools" },
]

export function Footer() {
  return (
    <footer className="border-t border-line-subtle bg-sunken/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              The software layer for humans and agents. Independent, verified, and useful
              first, affiliate revenue second.
            </p>
          </div>

          <nav aria-label="Explore">
            <p className="eyebrow mb-4 font-semibold">Explore</p>
            <ul className="space-y-2.5">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-accent hover:underline hover:underline-offset-4"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular categories">
            <p className="eyebrow mb-4 font-semibold">Categories</p>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-muted transition-colors hover:text-accent hover:underline hover:underline-offset-4"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4 font-semibold">Trust & disclosure</p>
            <p className="text-xs leading-relaxed text-faint">
              EchoTools may earn commissions when you subscribe through links on this site.
              Commissions never influence rankings — every tool is listed and evaluated on
              usefulness, with affiliate economics stored separately and disclosed on each
              tool page.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                href="/disclosure"
                className="text-xs text-muted underline-offset-4 hover:text-accent hover:underline"
              >
                Affiliate disclosure
              </Link>
              <Link
                href="/llms.txt"
                className="text-xs text-muted underline-offset-4 hover:text-accent hover:underline"
              >
                llms.txt
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-subtle pt-6 text-xs text-faint tabular-nums sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EchoTools. Built for humans and agents.</p>
          <p className="font-mono text-[0.625rem] uppercase tracking-wider">
            Human layer ↔ Agent layer · One stack
          </p>
        </div>
      </div>
    </footer>
  )
}