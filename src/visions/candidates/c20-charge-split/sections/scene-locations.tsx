import { useState } from 'react'
import AccordionGallery from '@/shared/bits/AccordionGallery'
import barExt from '@/assets/c20/bar_ext.jpg'
import danceNeon from '@/assets/c20/dance_neon.jpg'
import barInterior from '@/assets/c20/bar_interior.jpg'

const BOOKING_URL = 'https://prime.booking.enes.tech/'
const DEFAULT_INDEX = 1

type Venue = {
  id: string
  title: string
  address: string
  phone: string
  telegram: string
  lat: number
  lng: number
  appleMaps: string
  image: string
}

const VENUES: Venue[] = [
  {
    id: 'mennica',
    title: 'Prime Mennica',
    address: 'Walicow 11, Warsaw',
    phone: '+48530811888',
    telegram: 'https://t.me/primewarsaw',
    lat: 52.232368,
    lng: 20.993642,
    appleMaps:
      'https://maps.apple.com/?address=I%20L%20Pereca%2014,%2000-849%20Warsaw,%20Poland&auid=2852888507565351073&ll=52.232368,20.993642&lsp=9902&q=Prime%20Cyber%20Lounge&t=m',
    image: barExt,
  },
  {
    id: 'mokotow',
    title: 'Prime Mokotow',
    address: 'Wincentego Rzymowskiego 53, Warsaw',
    phone: '+48530822888',
    telegram: 'https://t.me/primemokotow',
    lat: 52.176772,
    lng: 21.001543,
    appleMaps:
      'https://maps.apple.com/?address=W%20Rzymowskiego%2053,%2002-697%20Warsaw,%20Poland&auid=16981973767258967933&ll=52.176772,21.001543&lsp=9902&q=Prime%20Cyber%20Lounge&t=m',
    image: danceNeon,
  },
  {
    id: 'wroclaw',
    title: 'Prime Wroclaw',
    address: 'Plac Teatralny 6-8, Wroclaw',
    phone: '+48530881888',
    telegram: 'https://t.me/primewroclaw',
    lat: 51.1057,
    lng: 17.0324,
    appleMaps:
      'https://maps.apple.com/?address=pl%20Teatralny%206,%2050-051%20Wroc%C5%82aw,%20Poland&auid=18407165116370831884&ll=51.105700,17.032400&lsp=9902&q=PRIME%20CYBER%20LOUNGE&t=m',
    image: barInterior,
  },
]

const GALLERY_ITEMS = VENUES.map((venue) => ({
  image: venue.image,
  label: venue.title,
  alt: venue.title,
}))

function prefersAppleMaps() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true
  return /Macintosh/i.test(ua) && /Safari/i.test(ua) && !/Chrome|CriOS|Edg|Chromium/i.test(ua)
}

function mapEmbedSrc(venue: Venue, apple: boolean) {
  if (apple) return venue.appleMaps
  return `https://www.google.com/maps?q=${venue.lat},${venue.lng}&z=16&output=embed`
}

const actionClass =
  'font-[family-name:var(--cs-body)] text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--cs-ice)] uppercase underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline focus-visible:outline-none sm:text-[0.72rem]'

function VenuePanel({ venue, appleMaps }: { venue: Venue; appleMaps: boolean }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-3 sm:gap-4">
      <div className="flex shrink-0 items-center gap-3">
        <span
          className="h-6 w-[3px] flex-none rounded-[3px] bg-[var(--cs-ice)]"
          style={{
            boxShadow: '0 0 12px color-mix(in srgb, #F4F7FF 55%, transparent)',
          }}
          aria-hidden
        />
        <h2 className="truncate font-[family-name:var(--cs-display)] text-[clamp(1.45rem,2.6vw,2.2rem)] leading-none tracking-[0.04em] text-[var(--cs-ice)] uppercase [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          {venue.title}
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-[10px] bg-[color-mix(in_srgb,var(--cs-void)_72%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] backdrop-blur-[2px]">
        <iframe
          key={`${venue.id}-${appleMaps ? 'apple' : 'google'}`}
          title={`Map — ${venue.address}`}
          src={mapEmbedSrc(venue, appleMaps)}
          className="h-full min-h-[140px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex shrink-0 flex-col gap-3">
        <p className="font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug tracking-[0.04em] text-[var(--cs-caption)] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-[0.85rem]">
          {venue.address}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className={actionClass}>
            Book a PC
          </a>
          <a href={`tel:${venue.phone}`} className={actionClass}>
            Call
          </a>
          <a href={venue.telegram} target="_blank" rel="noreferrer" className={actionClass}>
            Telegram
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SceneLocations() {
  const [appleMaps] = useState(prefersAppleMaps)

  return (
    <section
      aria-label="Locations"
      data-scene="locations"
      className="relative isolate h-dvh overflow-hidden bg-[var(--cs-pitch)]"
    >
      <AccordionGallery
        items={GALLERY_ITEMS}
        defaultIndex={DEFAULT_INDEX}
        trigger="click"
        orientation="horizontal"
        fillParent
        expandRatio={0.7}
        gap={8}
        radius={14}
        accentColor="#F4F7FF"
        overlayColor="#000000"
        textColor="#F4F7FF"
        grayscale
        showLabels={false}
        activeDim={0.28}
        inactiveDim={0.62}
        tilt={5}
        className="absolute inset-2 sm:inset-3"
        renderPanelContent={(index) => {
          const venue = VENUES[index]
          if (!venue) return null
          return <VenuePanel venue={venue} appleMaps={appleMaps} />
        }}
      />
    </section>
  )
}
