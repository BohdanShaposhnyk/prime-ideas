import { VENUES } from '../../lib/venues'

export const DEFAULT_INDEX = 1
/** Matches AccordionGallery's default width tween. */
export const CARD_OPEN_S = 0.6

export const GALLERY_ITEMS = VENUES.map((venue) => ({
  id: venue.id,
  image: venue.image,
  label: venue.title,
  alt: `${venue.title}, ${venue.address}`,
}))
