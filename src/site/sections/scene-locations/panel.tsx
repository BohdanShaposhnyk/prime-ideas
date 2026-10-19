import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, MapPin, Phone } from 'lucide-react'
import type { AccordionPanelNav } from '@/site/bits/AccordionGallery'
import { BookNightButton } from '../../components/book-night'
import { TelegramIcon } from '../../components/icons'
import { cardTitleClass, ctaClass } from '../../lib/palette'
import { VENUES, type Venue } from '../../lib/venues'

const actionClass =
  `${ctaClass} inline-flex items-center justify-center gap-2 text-[var(--cs-ice)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--cs-ice)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:underline-offset-4 sm:hover:underline sm:focus-visible:underline`

const iconBtnClass = 'shrink-0 p-1 sm:px-1 sm:py-0'

const chevronBtnClass =
  'absolute z-10 flex size-11 items-center justify-center rounded-full bg-black/55 text-[var(--cs-ice)] shadow-[0_2px_16px_rgba(0,0,0,0.6)] backdrop-blur-[2px] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-ice)]'

export function VenuePanel({
  venue,
  slotRef,
  nav,
}: {
  venue: Venue
  slotRef: (node: HTMLDivElement | null) => void
  nav: AccordionPanelNav
}) {
  const prev = nav.index > 0 ? VENUES[nav.index - 1] : undefined
  const next = nav.index < nav.count - 1 ? VENUES[nav.index + 1] : undefined

  return (
    <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col gap-3 sm:gap-4">
      {prev ? (
        <button
          type="button"
          aria-label={`Show ${prev.title}`}
          onClick={() => nav.select(nav.index - 1)}
          className={`${chevronBtnClass} max-[520px]:top-0 max-[520px]:left-1/2 max-[520px]:-translate-x-1/2 max-[520px]:-translate-y-1/4 min-[521px]:top-1/2 min-[521px]:left-0 min-[521px]:-translate-x-1/3 min-[521px]:-translate-y-1/2`}
        >
          <ChevronUp className="size-7 min-[521px]:hidden" strokeWidth={2.5} aria-hidden />
          <ChevronLeft className="hidden size-7 min-[521px]:block" strokeWidth={2.5} aria-hidden />
        </button>
      ) : null}
      {next ? (
        <button
          type="button"
          aria-label={`Show ${next.title}`}
          onClick={() => nav.select(nav.index + 1)}
          className={`${chevronBtnClass} max-[520px]:bottom-0 max-[520px]:left-1/2 max-[520px]:-translate-x-1/2 max-[520px]:translate-y-1/4 min-[521px]:top-1/2 min-[521px]:right-0 min-[521px]:translate-x-1/3 min-[521px]:-translate-y-1/2`}
        >
          <ChevronDown className="size-7 min-[521px]:hidden" strokeWidth={2.5} aria-hidden />
          <ChevronRight className="hidden size-7 min-[521px]:block" strokeWidth={2.5} aria-hidden />
        </button>
      ) : null}
      <h3
        className={`order-1 min-w-0 shrink-0 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] ${cardTitleClass} ${
          prev ? 'max-[520px]:pt-10' : ''
        }`}
      >
        {venue.title}
      </h3>

      <div
        ref={slotRef}
        data-venue={venue.id}
        aria-label={`Map — ${venue.address}`}
        className="relative order-3 min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-[var(--cs-radius-media)] bg-[var(--cs-void)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] sm:order-2"
      />

      <div className="order-2 flex shrink-0 flex-col gap-3 sm:order-3">
        <a
          href={venue.appleMaps}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${venue.address} in Maps`}
          className="inline-flex items-start gap-1.5 font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug text-[var(--cs-caption)] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] underline-offset-2 hover:underline focus-visible:underline focus-visible:outline-none sm:text-[0.85rem]"
        >
          <MapPin
            className="mt-px size-[1.05em] shrink-0 text-[var(--cs-ice)]"
            strokeWidth={2.25}
            aria-hidden
          />
          {venue.address}
        </a>
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:gap-3">
          <BookNightButton className="shrink-0" />
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={`tel:${venue.phone}`}
              className={`${actionClass} ${iconBtnClass}`}
              aria-label={`Call ${venue.phoneLabel}`}
            >
              <Phone className="size-8 shrink-0 text-[#34C759] sm:size-[1.05em]" strokeWidth={2.25} aria-hidden />
              <span className="sr-only sm:not-sr-only">Call</span>
            </a>
            <a
              href={venue.telegram}
              target="_blank"
              rel="noreferrer"
              className={`${actionClass} ${iconBtnClass}`}
              aria-label="Telegram"
            >
              <TelegramIcon className="size-8 shrink-0 sm:size-[1.1em]" />
              <span className="sr-only sm:not-sr-only">Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
