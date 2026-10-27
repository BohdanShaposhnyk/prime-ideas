import { t } from '../../copy/translate'
import { mapsHref, SEO_VENUES } from '../../lib/seo'

/**
 * Five-star Google reviews, two from each lounge.
 * Wording is the guest's, with light punctuation so a card can hold it.
 */
type ReviewVenue = 'mennica' | 'mokotow' | 'wroclaw'

function asVenue(id: string): ReviewVenue {
  if (id === 'mennica' || id === 'mokotow' || id === 'wroclaw') return id
  throw new Error(`Unknown review venue ${id}`)
}

export const REVIEWS = t('reviews.items').map((item) => ({
  ...item,
  venue: asVenue(item.venue),
}))

export type Review = (typeof REVIEWS)[number]

export function venueLabel(id: Review['venue']) {
  return t('reviews.venueLabel')[id]
}

export function googleHref(venueId: Review['venue']) {
  const venue = SEO_VENUES.find((item) => item.id === venueId)
  return venue ? mapsHref(venue.mapsCid) : undefined
}

/** Collective Google score for Mennica, Mokotów, and Wrocław. */
export const GOOGLE_RATING = Number(t('reviews.score'))

export const STAR_PATH =
  'M10 1.4 12.35 6.7l5.75.5-4.35 3.75 1.35 5.55L10 13.85 4.9 16.5l1.35-5.55L1.9 7.2l5.75-.5z'

/** Vertical wheel on the horizontal row. A new gesture picks an axis, then holds it. */
export const AXIS_LOCK_MS = 80
export const AXIS_BIAS = 1.25
export const SNAP_RESTORE_MS = 140
/** Wheel deltaMode 1 is lines. One line is 16px. */
export const LINE_PX = 16
export const EDGE_SLOP = 2
export const WHEEL_DEAD = 0.5
