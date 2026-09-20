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
    status: 'structure',
    thesis:
      'Moody weather outside the terrace glass, then you descend into Prime — richer, darker, more intimate room by room.',
  },
  {
    id: 'c02',
    slug: 'one-night',
    title: 'One Night',
    status: 'structure',
    thesis:
      'A single Warsaw night compressed into four rooms — eat, play, sing, linger.',
  },
  {
    id: 'c03',
    slug: 'blade-night',
    title: 'Blade Night',
    status: 'structure',
    thesis:
      'A single diagonal cut opens Prime — heat, play, stage, hush — until the night is flush with the frame.',
  },
  {
    id: 'c04',
    slug: 'film-gate',
    title: 'Film Gate',
    status: 'structure',
    thesis:
      'Prime framed like cinema stock — each gate holds a room until the night advances one frame.',
  },
  {
    id: 'c05',
    slug: 'smoke-line',
    title: 'Smoke Line',
    status: 'structure',
    thesis:
      'A single smoke horizon cuts the night — rooms drift past beneath it until Prime fills both sides of the line.',
  },
  {
    id: 'c06',
    slug: 'glass-cap',
    title: 'Glass Cap',
    status: 'motion',
    thesis:
      'The night is sealed under a glass canopy — scroll lifts the frost and the rooms bloom underneath.',
  },
  {
    id: 'c07',
    slug: 'lodge-depth',
    title: 'Lodge Depth',
    status: 'motion',
    thesis:
      'From a Norwegian lodge window onto a cloudy street, scroll pulls you back into stone-wood greenery — then rooms shear open on diagonals with captions that migrate across the glass.',
  },
  {
    id: 'c08',
    slug: 'storm-seam',
    title: 'Storm Seam',
    status: 'motion',
    thesis:
      'A storm sky opens into a Norwegian lodge bar, then a corner seam rips the night into neon dual panels, a black spiral of four rooms, and the side floor.',
  },
  {
    id: 'c09',
    slug: 'private-axis',
    title: 'Private Axis',
    status: 'motion',
    thesis:
      'Scroll plunges you down Prime’s private Z-axis — rooms dock from the sides and from behind while type discovers on its own delay.',
  },
  {
    id: 'c10',
    slug: 'lockup',
    title: 'Lockup',
    status: 'motion',
    thesis:
      'Prime is a compositor’s wall — type-blocks slam from the edges, latch to a spine, and restack until the night is locked.',
  },
  {
    id: 'c11',
    slug: 'ember-lattice',
    title: 'Ember Lattice',
    status: 'motion',
    thesis:
      'Prime is a voltage lattice — each scroll pulse ripples a new room through living shader currents until the night ignites.',
  },
  {
    id: 'c12',
    slug: 'caustic-focus',
    title: 'Caustic Focus',
    status: 'motion',
    thesis:
      'Prime is seen through a cinema lens — scroll racks the focal plane through liquid glass until each room snaps sharp.',
  },
  {
    id: 'c13',
    slug: 'penumbra',
    title: 'Penumbra',
    status: 'motion',
    thesis:
      'Prime is found in a moving rake of light — scroll pulls focus through warm shadow until each room snaps in the penumbra.',
  },
  {
    id: 'c14',
    slug: 'live-offset',
    title: 'Live Offset',
    status: 'motion',
    thesis:
      'Prime is a dim field cut by a living bright offset — rooms arrive as zooming shards while type belts run the seam.',
  },
  {
    id: 'c15',
    slug: 'hard-invert',
    title: 'Hard Invert',
    status: 'motion',
    thesis:
      'Prime is a Warsaw rave poster that inverts as you snap — rooms slam as flyer frames until the night strobes OWN / THE / NIGHT.',
  },
  {
    id: 'c16',
    slug: 'night-crop',
    title: 'Night Crop',
    status: 'motion',
    thesis:
      'Prime is shot like a fashion night — vertical scroll recrops the frame until each room is the only thing in the finder.',
  },
  {
    id: 'c17',
    slug: 'quiet-cast',
    title: 'Quiet Cast',
    status: 'motion',
    thesis:
      'Prime is a composing stick — one contained measure of living type; scroll recasts the night in place.',
  },
  {
    id: 'c18',
    slug: 'rsvp',
    title: 'RSVP',
    status: 'motion',
    thesis:
      'Prime is a stack of night invitations — scroll compresses each look into a thin lip until the house is indexed.',
  },
  {
    id: 'c19',
    slug: 'flyhouse',
    title: 'Flyhouse',
    status: 'motion',
    thesis:
      'Prime is scenery in the flies — scroll docks each room on the pinrail, then flies it out for the next drop.',
  },
  {
    id: 'c20',
    slug: 'charge-split',
    title: 'Charge Split',
    status: 'structure',
    thesis:
      'Prime holds the left cell as a charged name — lightning over a deep-blue core — while the night plays on the right.',
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

/** Active champion, if any (at most one). */
export function getChampion(list: CandidateMeta[] = candidates) {
  return list.find((c) => c.status === 'champion')
}

/** Permanent archive via registry status (skills / CONCEPT). */
export function isRegistryArchived(c: Pick<CandidateMeta, 'status'>) {
  return c.status === 'archived'
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
