import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/shared/ui/button'
import { candidates, candidatePath } from '@/app/candidates'
import { cn } from '@/shared/lib/utils'

export function HubPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-8 px-5 py-10">
      <header className="space-y-2">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Prime Warsaw
        </p>
        <h1 className="text-3xl font-medium tracking-tight">Candidate lab</h1>
        <p className="text-sm text-muted-foreground">
          Invent concepts, grow them in stages. Skills land in M1+.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">Candidates</h2>
        {candidates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            None yet. Run the concept skill (M1) or start from the template.
          </p>
        ) : (
          <ul className="space-y-2">
            {candidates.map((c) => (
              <li key={`${c.id}-${c.slug}`}>
                <a
                  href={candidatePath(c)}
                  className="flex items-baseline justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted/40"
                >
                  <span>
                    {c.id} — {c.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{c.status}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap gap-2">
        <Link to="/v/_template" className={cn(buttonVariants())}>
          Open template
        </Link>
        <a
          href="https://www.instagram.com/prime_warsaw/"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          @prime_warsaw
        </a>
      </div>
    </main>
  )
}
