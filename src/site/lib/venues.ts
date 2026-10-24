import barExt from '@/site/assets/bar_ext.webp'
import danceNeon from '@/site/assets/dance_neon.webp'
import barInterior from '@/site/assets/bar_interior.webp'
import { SEO_VENUES, mapsHref, type SeoVenue } from './seo'

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
  mapsCid: string
  maps: string
  image: string
}

const images: Record<SeoVenue['id'], string> = {
  mennica: barExt,
  mokotow: danceNeon,
  wroclaw: barInterior,
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
  mapsCid: venue.mapsCid,
  maps: mapsHref(venue.mapsCid),
  image: images[venue.id],
}))
