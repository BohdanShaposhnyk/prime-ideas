import { Link, useParams } from '@tanstack/react-router'
import {
  lazy,
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from 'react'
import { getCandidateByKey } from '@/app/candidates'

const modules = import.meta.glob<{ default: ComponentType }>(
  '../visions/candidates/*/index.tsx',
)

const pages: Record<string, LazyExoticComponent<ComponentType>> = {}
for (const [path, loader] of Object.entries(modules)) {
  const key = path.match(/candidates\/([^/]+)\/index\.tsx$/)?.[1]
  if (key) pages[key] = lazy(loader)
}

function CandidateNotFound({ candidateKey }: { candidateKey: string }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 px-5 py-10">
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Missing
      </p>
      <h1 className="text-3xl font-medium tracking-tight">Candidate not found</h1>
      <p className="text-sm text-muted-foreground">
        No page for <code className="text-foreground">{candidateKey}</code>. Check
        the registry and folder name.
      </p>
      <Link to="/" className="text-sm underline underline-offset-4">
        Back to hub
      </Link>
    </main>
  )
}

export function CandidatePage() {
  const { candidateKey } = useParams({ from: '/c/$candidateKey' })
  const meta = getCandidateByKey(candidateKey)
  const Page = pages[candidateKey]

  if (!meta || !Page) {
    return <CandidateNotFound candidateKey={candidateKey} />
  }

  return (
    <Suspense
      fallback={
        <main className="mx-auto flex min-h-dvh max-w-lg items-center px-5 py-10">
          <p className="text-sm text-muted-foreground">Loading…</p>
        </main>
      }
    >
      <Page />
    </Suspense>
  )
}
