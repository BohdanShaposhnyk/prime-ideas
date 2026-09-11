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

/** Hub registry — concept skill appends entries here (M1+). */
export const candidates: CandidateMeta[] = []

export function candidatePath(c: Pick<CandidateMeta, 'id' | 'slug'>) {
  return `/c/${c.id}-${c.slug}`
}
