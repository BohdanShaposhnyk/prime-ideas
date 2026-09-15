import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Archive, ArchiveRestore } from 'lucide-react'
import {
  candidates,
  candidateKey,
  isRegistryArchived,
} from '@/app/candidates'
import {
  isEffectivelyArchived,
  useArchivedKeys,
} from '@/shared/lib/archive'
import { cn } from '@/shared/lib/utils'
import { Button, buttonVariants } from '@/shared/ui/button'
import { Switch } from '@/shared/ui/switch'

export function HubPage() {
  const [showArchived, setShowArchived] = useState(false)
  const { archivedKeys, archive, unarchive } = useArchivedKeys()

  const visible = candidates.filter(
    (c) => showArchived || !isEffectivelyArchived(c, archivedKeys),
  )

  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-8 px-5 py-10">
      <header className="space-y-2">
        <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Prime Warsaw
        </p>
        <h1 className="text-3xl font-medium tracking-tight">Candidate lab</h1>
        <p className="text-sm text-muted-foreground">
          Invent concepts, grow them in stages. Trigger skills on demand.
        </p>
        <p className="text-xs text-muted-foreground">
          Hub also at <code className="text-foreground">/lab</code>. When a
          champion is promoted, <code className="text-foreground">/</code>{' '}
          shows that landing.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            Candidates
          </h2>
          <label className="flex items-center gap-2 text-xs text-muted-foreground">
            Show archived
            <Switch
              size="sm"
              checked={showArchived}
              onCheckedChange={setShowArchived}
            />
          </label>
        </div>
        {candidates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            None yet. Trigger the prime-concept skill or start from the
            template.
          </p>
        ) : visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            All candidates are archived. Turn on Show archived to see them.
          </p>
        ) : (
          <ul className="space-y-2">
            {visible.map((c) => {
              const key = candidateKey(c)
              const registryArchived = isRegistryArchived(c)
              const effectivelyArchived = isEffectivelyArchived(
                c,
                archivedKeys,
              )
              const displayStatus = effectivelyArchived
                ? 'archived'
                : c.status

              return (
                <li
                  key={key}
                  className="flex items-center gap-1 rounded-lg border border-border"
                >
                  <Link
                    to="/c/$candidateKey"
                    params={{ candidateKey: key }}
                    className="flex min-w-0 flex-1 items-baseline justify-between gap-3 px-3 py-2 text-sm hover:bg-muted/40"
                  >
                    <span className="truncate">
                      {c.id} — {c.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {displayStatus}
                    </span>
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="mr-1 shrink-0"
                    disabled={registryArchived}
                    title={
                      registryArchived
                        ? 'Archived in registry (status: archived)'
                        : effectivelyArchived
                          ? 'Unarchive'
                          : 'Archive'
                    }
                    aria-label={
                      registryArchived
                        ? 'Archived in registry'
                        : effectivelyArchived
                          ? 'Unarchive'
                          : 'Archive'
                    }
                    onClick={() => {
                      if (registryArchived) return
                      if (effectivelyArchived) unarchive(key)
                      else archive(key)
                    }}
                  >
                    {effectivelyArchived ? (
                      <ArchiveRestore />
                    ) : (
                      <Archive />
                    )}
                  </Button>
                </li>
              )
            })}
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
