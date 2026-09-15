import { Link } from '@tanstack/react-router'

export function TemplatePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-5 py-10">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Template
      </p>
      <h1 className="text-3xl font-medium tracking-tight">Candidate shell</h1>
      <p className="text-sm text-muted-foreground">
        Copy this folder for a new candidate. Fill CONCEPT.md, then grow via
        skills (hero → structure → motion).
      </p>
      <Link to="/lab" className="text-sm underline underline-offset-4">
        Back to hub
      </Link>
    </main>
  )
}
