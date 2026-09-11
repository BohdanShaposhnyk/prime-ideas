import { Link } from '@tanstack/react-router'

export default function DryRunPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-5 py-10">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        c00 — dry-run
      </p>
      <h1 className="text-3xl font-medium tracking-tight">Dry-run concept</h1>
      <p className="text-sm text-muted-foreground">
        Dry-run concept — not a landing. Hub + `/c/$candidateKey` wiring only.
      </p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Back to hub
      </Link>
    </main>
  )
}
