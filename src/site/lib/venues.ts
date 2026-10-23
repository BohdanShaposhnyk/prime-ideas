import barExt from '@/site/assets/bar_ext.webp'
import danceNeon from '@/site/assets/dance_neon.webp'
import barInterior from '@/site/assets/bar_interior.webp'
import { SEO_VENUES, type SeoVenue } from './seo'

export type Venue = {
  id: string
  shortName: string
  title: string
  address: string
  phone: string
  phoneLabel: string
  telegram: string
  lat: number
  lng: number
  maps: string
  image: string
}

const images: Record<SeoVenue['id'], string> = {
  mennica: barExt,
  mokotow: danceNeon,
  wroclaw: barInterior,
}

function googleMaps(venue: SeoVenue) {
  const query = [venue.name, venue.streetAddress, venue.postalCode, venue.addressLocality, 'Poland']
    .filter(Boolean)
    .join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export const VENUES: Venue[] = SEO_VENUES.map((venue) => ({
  id: venue.id,
  shortName: venue.shortName,
  title: venue.name,
  address: `${venue.streetAddress}, ${venue.addressLocality}`,
  phone: venue.telephone,
  phoneLabel: venue.telephoneLabel,
  telegram: venue.telegram,
  lat: venue.latitude,
  lng: venue.longitude,
  maps: googleMaps(venue),
  image: images[venue.id],
}))
