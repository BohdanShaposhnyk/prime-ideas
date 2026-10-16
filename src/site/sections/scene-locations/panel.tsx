import { MapPin, Phone } from 'lucide-react'
import { BookNightButton } from '../../components/book-night'
import { TelegramIcon } from '../../components/icons'
import { cardTitleClass, ctaClass, palette } from '../../lib/palette'
import type { Venue } from '../../lib/venues'

const actionClass =
  `${ctaClass} inline-flex items-center justify-center gap-2 text-[var(--cs-ice)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--cs-ice)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:underline-offset-4 sm:hover:underline sm:focus-visible:underline`

const iconBtnClass =
  'h-10 w-10 shrink-0 rounded-full bg-[color-mix(in_srgb,var(--cs-void)_55%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_18%,transparent)] backdrop-blur-[2px] sm:w-auto sm:bg-transparent sm:px-1 sm:ring-0 sm:backdrop-blur-none'

export function VenuePanel({
  venue,
  slotRef,
}: {
  venue: Venue
  slotRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col gap-3 sm:gap-4">
      <div className="order-1 flex shrink-0 items-center gap-3">
        <span
          className="h-6 w-[3px] flex-none rounded-[3px] bg-[var(--cs-ice)]"
          style={{
            boxShadow: `0 0 12px color-mix(in srgb, ${palette.ice} 55%, transparent)`,
          }}
          aria-hidden
        />
        <h3 className={`min-w-0 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] ${cardTitleClass}`}>
          {venue.title}
        </h3>
      </div>

      <div
        ref={slotRef}
        data-venue={venue.id}
        aria-label={`Map — ${venue.address}`}
        className="relative order-3 min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-[var(--cs-radius-media)] bg-[var(--cs-void)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] sm:order-2"
      />

      <div className="order-2 flex shrink-0 flex-col gap-3 sm:order-3">
        <p className="font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug text-[var(--cs-caption)] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-[0.85rem]">
          {venue.address}
        </p>
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <BookNightButton className="shrink-0" />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={`tel:${venue.phone}`}
              className={`${actionClass} ${iconBtnClass}`}
              aria-label={`Call ${venue.phoneLabel}`}
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
            <a
              href={venue.appleMaps}
              target="_blank"
              rel="noreferrer"
              className={`${actionClass} ${iconBtnClass}`}
              aria-label="Maps"
            >
              <MapPin className="size-[1.05em] shrink-0 text-[var(--cs-ice)]" strokeWidth={2.25} aria-hidden />
              <span className="sr-only sm:not-sr-only">Maps</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
