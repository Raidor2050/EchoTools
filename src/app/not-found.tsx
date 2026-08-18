import Link from "next/link"

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-32 text-center sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="text-hero font-semibold text-fg">
        This page drifted to the{" "}
        <span className="serif-accent text-accent">other layer</span>.
      </h1>
      <p className="max-w-md text-body text-muted">
        The tool or page you are looking for doesn&apos;t exist — or was retired like Figma&apos;s
        affiliate program. Try the directory instead.
      </p>
      <div className="flex gap-3">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-strong"
        >
          Open the directory
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/50"
        >
          Back home
        </Link>
      </div>
    </div>
  )
}