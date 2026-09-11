export type CandidateStatus =
  | 'concept'
  | 'hero'
  | 'structure'
  | 'motion'
  | 'polish'
  | 'ready'
  | 'champion'
  | 'archived'

export type CandidateMeta = {
  id: string
  slug: string
  title: string
  status: CandidateStatus
  thesis?: string
}

/** Hub registry — concept skill appends entries here. */
export const candidates: CandidateMeta[] = [
  {
    id: 'c00',
    slug: 'dry-run',
    title: 'Dry-run',
    status: 'concept',
    thesis: 'M1 acceptance fixture — proves hub + route wiring, not a landing.',
  },
  {
    id: 'c01',
    slug: 'outside-in',
    title: 'Outside In',
    status: 'concept',
    thesis:
      'Moody weather outside the terrace glass, then you descend into Prime — richer, darker, more intimate room by room.',
  },
]

export function candidateKey(c: Pick<CandidateMeta, 'id' | 'slug'>) {
  return `${c.id}-${c.slug}`
}

export function candidatePath(c: Pick<CandidateMeta, 'id' | 'slug'>) {
  return `/c/${candidateKey(c)}`
}

/** Parse `c01-kebab-slug` → `{ id, slug }` or null. */
export function parseCandidateKey(key: string): Pick<CandidateMeta, 'id' | 'slug'> | null {
  const match = /^([a-z]\d+)-([a-z0-9]+(?:-[a-z0-9]+)*)$/i.exec(key)
  if (!match) return null
  return { id: match[1].toLowerCase(), slug: match[2].toLowerCase() }
}

export function getCandidate(id: string) {
  return candidates.find((c) => c.id === id)
}

export function getCandidateByKey(key: string) {
  const parsed = parseCandidateKey(key)
  if (!parsed) return undefined
  return candidates.find((c) => c.id === parsed.id && c.slug === parsed.slug)
}

/** Next id like c01, c02… (skips non-cNN ids such as c00 dry-run numbering). */
export function nextCandidateId(list: CandidateMeta[] = candidates) {
  let max = 0
  for (const c of list) {
    const m = /^c(\d+)$/i.exec(c.id)
    if (m) max = Math.max(max, Number(m[1]))
  }
  return `c${String(max + 1).padStart(2, '0')}`
}
