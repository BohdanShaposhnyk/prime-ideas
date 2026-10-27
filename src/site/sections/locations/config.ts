import { VENUES, type Venue } from '../../lib/venues'

const ORDER = [
  { id: 'mokotow', label: 'Mokotów', city: 'Warsaw' },
  { id: 'mennica', label: 'Mennica', city: 'Warsaw' },
  { id: 'wroclaw', label: 'Opera', city: 'Wrocław' },
] as const

export type Location = {
  id: (typeof ORDER)[number]['id']
  label: string
  city: string
  venue: Venue
}

export const LOCATIONS: Location[] = ORDER.map((item) => {
  const venue = VENUES.find((entry) => entry.id === item.id)
  if (!venue) throw new Error(`Missing venue ${item.id}`)
  return { id: item.id, label: item.label, city: item.city, venue }
})

/** Consecutive venues that share a city, in picker order. `span` is how many equal slots the label covers. */
export const CITIES = LOCATIONS.reduce<{ city: string; span: number }[]>((groups, item) => {
  const last = groups.at(-1)
  if (last && last.city === item.city) last.span += 1
  else groups.push({ city: item.city, span: 1 })
  return groups
}, [])
