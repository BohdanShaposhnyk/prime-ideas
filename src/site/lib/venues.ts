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
  appleMaps: string
  image: string
}

const images: Record<SeoVenue['id'], string> = {
  mennica: barExt,
  mokotow: danceNeon,
  wroclaw: barInterior,
}

const maps: Record<SeoVenue['id'], string> = {
  mennica:
    'https://maps.apple.com/?address=Walic%C3%B3w%2011,%20Warsaw,%20Poland&q=Prime%20Cyber%20Lounge&t=m',
  mokotow:
    'https://maps.apple.com/?address=W%20Rzymowskiego%2053,%2002-697%20Warsaw,%20Poland&auid=16981973767258967933&ll=52.176772,21.001543&lsp=9902&q=Prime%20Cyber%20Lounge&t=m',
  wroclaw:
    'https://maps.apple.com/?address=Plac%20Teatralny%206-8,%2050-051%20Wroc%C5%82aw,%20Poland&ll=51.105700,17.032400&q=PRIME%20CYBER%20LOUNGE&t=m',
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
  appleMaps: maps[venue.id],
  image: images[venue.id],
}))
