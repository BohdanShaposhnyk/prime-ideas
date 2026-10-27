import { t } from '../../copy/translate'
import { VENUES, type Venue } from '../../lib/venues'

export type Location = {
  id: string
  label: string
  city: string
  venue: Venue
}

export const LOCATIONS: Location[] = t('locations.tabs').map((item) => {
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
