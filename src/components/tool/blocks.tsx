import { Check, Minus, Sparkles, Wrench, Plug2 } from "lucide-react"
import type { Tool } from "@/lib/types"
import { fmtPrice } from "@/lib/utils"

function billingLabel(plan: { per: string; billing: string }): string {
  if (plan.per === "one-time") return "one-time"
  return plan.billing === "year" ? "per year" : "per month"
}

export function PricingBlock({ tool }: { tool: Tool }) {
  return (
    <section aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className="text-h3 font-semibold text-fg">
        Pricing
      </h2>
      <p className="mt-2 text-sm text-muted">{tool.pricing}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tool.plans.map((plan) => {
          const free = plan.price === 0
          return (
            <div
              key={plan.name}
              className="rounded-xl border border-line-subtle bg-surface p-5"
            >
              <p className="text-sm font-medium text-fg">{plan.name}</p>
              <p className="mt-2 text-metric font-semibold text-fg">
                {free ? "Free" : fmtPrice(plan.price)}
                {!free && (
                  <span className="ml-1 font-mono text-[0.625rem] font-normal uppercase tracking-wider text-faint">
                    / {billingLabel(plan)}
                  </span>
                )}
              </p>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                {plan.billing === "year" ? "billed yearly" : "billed monthly"}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function ProsCons({ tool }: { tool: Tool }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2" aria-label="Pros and cons">
      <div className="rounded-xl border border-line-subtle bg-surface p-5">
        <h2 className="text-h3 font-semibold text-fg">Why we like it</h2>
        <ul className="mt-4 space-y-2.5">
          {tool.pros.map((pro) => (
            <li key={pro} className="flex items-start gap-2.5 text-sm text-muted">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-line-subtle bg-surface p-5">
        <h2 className="text-h3 font-semibold text-fg">Trade-offs</h2>
        <ul className="mt-4 space-y-2.5">
          {tool.cons.map((con) => (
            <li key={con} className="flex items-start gap-2.5 text-sm text-muted">
              <Minus className="mt-0.5 size-4 shrink-0 text-faint" aria-hidden />
              {con}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function FeaturesGrid({ tool }: { tool: Tool }) {
  return (
    <section aria-labelledby="features-heading">
      <h2 id="features-heading" className="text-h3 font-semibold text-fg">
        Key features
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {tool.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 rounded-lg border border-line-subtle bg-surface px-4 py-3 text-sm text-muted">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
            <Plug2 className="size-4 text-accent" aria-hidden /> Integrations
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tool.integrations.map((i) => (
              <span key={i} className="rounded-full border border-line-subtle bg-surface px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                {i}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="flex items-center gap-2 text-sm font-semibold text-fg">
            <Wrench className="size-4 text-accent" aria-hidden /> Good for
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tool.useCases.map((u) => (
              <span key={u} className="rounded-full border border-line-subtle bg-surface px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-wider text-faint">
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}