import { useState } from 'react'
import { Phone } from 'lucide-react'
import AccordionGallery from '@/shared/bits/AccordionGallery'
import SpecularButton from '@/shared/bits/SpecularButton'
import barExt from '@/assets/c20/bar_ext.jpg'
import danceNeon from '@/assets/c20/dance_neon.jpg'
import barInterior from '@/assets/c20/bar_interior.jpg'
import { BOOKING_URL } from '../booking'

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

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
  'inline-flex items-center justify-center gap-2 font-[family-name:var(--cs-body)] font-semibold tracking-[var(--cs-track-micro)] text-[var(--cs-ice)] uppercase transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--cs-ice)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:gap-2.5 sm:text-[0.85rem] sm:underline-offset-4 sm:hover:underline sm:focus-visible:underline'

const iconBtnClass =
  'h-[calc(20px+var(--cs-text-cta))] w-[calc(20px+var(--cs-text-cta))] shrink-0 rounded-full bg-[color-mix(in_srgb,var(--cs-void)_55%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_18%,transparent)] backdrop-blur-[2px] sm:h-auto sm:w-auto sm:rounded-none sm:bg-transparent sm:ring-0 sm:backdrop-blur-none'

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
        <h2 className="truncate font-[family-name:var(--cs-display)] text-[clamp(1.45rem,2.6vw,2.2rem)] leading-none tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          {venue.title}
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-[var(--cs-radius-media)] bg-[color-mix(in_srgb,var(--cs-void)_72%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] backdrop-blur-[2px]">
        <iframe
          key={`${venue.id}-${appleMaps ? 'apple' : 'google'}`}
          title={`Map — ${venue.address}`}
          src={mapEmbedSrc(venue, appleMaps)}
          className="h-full min-h-[120px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>

      <div className="flex shrink-0 flex-col gap-3">
        <p className="font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug tracking-[var(--cs-track-display)] text-[var(--cs-caption)] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-[0.85rem]">
          {venue.address}
        </p>
        <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4">
          <SpecularButton
            size="sm"
            radius={999}
            tint="#ffffff"
            tintOpacity={0.06}
            blur={10}
            textColor="#F4F7FF"
            lineColor="#CFB53B"
            baseColor="#3a3420"
            intensity={1.15}
            autoAnimate
            className="shrink-0 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-medium tracking-[var(--cs-track-micro)] uppercase sm:text-[0.78rem]"
            onClick={() => {
              window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
            }}
          >
            Book a PC
          </SpecularButton>
          <a
            href={`tel:${venue.phone}`}
            className={`${actionClass} ${iconBtnClass}`}
            aria-label="Call"
          >
            <Phone className="size-[1.05em] shrink-0 text-[#34C759]" strokeWidth={2.25} aria-hidden />
            <span className="sr-only sm:not-sr-only">Call</span>
          </a>
          <a
            href={venue.telegram}
            target="_blank"
            rel="noreferrer"
            className={`${actionClass} ${iconBtnClass}`}
            aria-label="Telegram"
          >
            <TelegramIcon className="size-[1.1em] shrink-0 text-[#2AABEE]" />
            <span className="sr-only sm:not-sr-only">Telegram</span>
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
