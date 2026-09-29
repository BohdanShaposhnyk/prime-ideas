import { useState } from 'react'
import { Phone } from 'lucide-react'
import AccordionGallery from '@/shared/bits/AccordionGallery'
import { BookNightButton } from '../book-night'
import { TelegramIcon } from '../icons'
import { ctaClass, palette } from '../palette'
import { VENUES, type Venue } from '../venues'

const DEFAULT_INDEX = 1

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
  const query =
    venue.lat != null && venue.lng != null ? `${venue.lat},${venue.lng}` : venue.address
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`
}

const actionClass =
  `${ctaClass} inline-flex items-center justify-center gap-2 text-[var(--cs-ice)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--cs-ice)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:gap-2.5 sm:underline-offset-4 sm:hover:underline sm:focus-visible:underline`

const iconBtnClass =
  'h-[calc(20px+var(--cs-text-cta))] w-[calc(20px+var(--cs-text-cta))] shrink-0 rounded-full bg-[color-mix(in_srgb,var(--cs-void)_55%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_18%,transparent)] backdrop-blur-[2px] sm:h-auto sm:w-auto sm:rounded-none sm:bg-transparent sm:ring-0 sm:backdrop-blur-none'

function VenuePanel({ venue, appleMaps }: { venue: Venue; appleMaps: boolean }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-3 sm:gap-4">
      <div className="order-1 flex shrink-0 items-center gap-3">
        <span
          className="h-6 w-[3px] flex-none rounded-[3px] bg-[var(--cs-ice)]"
          style={{
            boxShadow: `0 0 12px color-mix(in srgb, ${palette.ice} 55%, transparent)`,
          }}
          aria-hidden
        />
        <h2 className="min-w-0 font-[family-name:var(--cs-display)] text-[clamp(1.35rem,6.5vw,2.2rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
          {venue.title}
        </h2>
      </div>

      <div className="order-3 min-h-0 flex-1 overflow-hidden rounded-[var(--cs-radius-media)] bg-[color-mix(in_srgb,var(--cs-void)_72%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] backdrop-blur-[2px] sm:order-2">
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

      <div className="order-2 flex shrink-0 flex-col gap-3 sm:order-3">
        <p className="font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug text-[var(--cs-caption)] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-[0.85rem]">
          {venue.address}
        </p>
        <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4">
          <BookNightButton size="sm" className={`shrink-0 ${ctaClass}`} />
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
      className="cs-scene relative isolate overflow-hidden bg-[var(--cs-pitch)]"
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
        accentColor={palette.ice}
        overlayColor={palette.pitch}
        textColor={palette.ice}
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
