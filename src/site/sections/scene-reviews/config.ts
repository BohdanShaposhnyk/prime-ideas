import { mapsHref, SEO_VENUES } from '../../lib/seo'

/**
 * Five-star Google reviews, two from each lounge.
 * Wording is the guest's, with light punctuation so a card can hold it.
 */
export const REVIEWS = [
  {
    id: 'kampouri',
    venue: 'mennica',
    name: 'Maria Kampouri',
    date: 'August 2025',
    quote:
      'Amazing PCs, WiFi, and equipment. We took the duo private area and it was an amazing experience — gaming, eating, and relaxing in our own space. The service is amazing and the people here are polite. I will come again.',
  },
  {
    id: 'bolatbek',
    venue: 'mokotow',
    name: 'Alisher Bolatbek',
    date: 'April 2026',
    quote:
      'It was the best cyber lounge I have ever been. The PCs are really cool and the internet is fast. The music in the reception is nice. I surely recommend this place if you want to relax with friends and play some games.',
  },
  {
    id: 'chanel',
    venue: 'wroclaw',
    name: 'Jvachka Chanel',
    date: 'August 2025',
    quote:
      'A wonderful bootcamp experience. This club provides an unforgettable experience. The service staff is top notch. Also pleasantly surprised by the cinema room. Excellent Dolby Atmos sound and noise isolation provides great emotions.',
  },
  {
    id: 'sawchuk',
    venue: 'mennica',
    name: 'Alex Sawchuk',
    date: 'August 2025',
    quote:
      'I visited this place with my friend. Computers, mice, and keyboards are incredible. PlayStation with a cinema room is a great option for a large company. The service was incredible.',
  },
  {
    id: 'barmaley',
    venue: 'mokotow',
    name: 'barmaley',
    date: 'April 2026',
    quote:
      'Prime Lounge Mokotów feels like a perfect setup — smooth like a high-end PC running without any lag. Clean vibe, great service, and everything just works. Hookah quality is on point too. Definitely coming back.',
  },
  {
    id: 'frantsishko',
    venue: 'wroclaw',
    name: 'Vitalii Frantsishko',
    date: 'September 2026',
    quote:
      'The wholesome experience starting from atmosphere, service, quality to simply prices. Highly recommend.',
  },
] as const

export type Review = (typeof REVIEWS)[number]

export const VENUE_LABEL = {
  mennica: 'Mennica',
  mokotow: 'Mokotów',
  wroclaw: 'Wrocław',
} as const

export function googleHref(venueId: Review['venue']) {
  const venue = SEO_VENUES.find((item) => item.id === venueId)
  return venue ? mapsHref(venue.mapsCid) : undefined
}

/** Collective Google score for Mennica, Mokotów, and Wrocław. */
export const GOOGLE_RATING = 4.8

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
