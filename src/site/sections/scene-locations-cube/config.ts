import { VENUES, type Venue } from '../../lib/venues'

const ORDER = [
  { id: 'mokotow', label: 'Warsaw Mokotów' },
  { id: 'mennica', label: 'Warsaw Mennica' },
  { id: 'wroclaw', label: 'Wrocław' },
] as const

export type CubeLocation = {
  id: (typeof ORDER)[number]['id']
  label: string
  venue: Venue
}

export const CUBE_LOCATIONS: CubeLocation[] = ORDER.map((item) => {
  const venue = VENUES.find((entry) => entry.id === item.id)
  if (!venue) throw new Error(`Missing venue ${item.id}`)
  return { id: item.id, label: item.label, venue }
})
