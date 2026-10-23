import type { ReactNode } from 'react'
import { MapPin, Phone } from 'lucide-react'
import { BookNightButton } from '../../components/book-night'
import { TelegramIcon } from '../../components/icons'
import { FilmGrain } from '../../components/grain'
import { ctaClass, palette } from '../../lib/palette'
import type { Venue } from '../../lib/venues'

const actionClass =
  `${ctaClass} inline-flex items-center justify-center gap-2 text-[var(--cs-ice)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--cs-ice)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:underline-offset-4 sm:hover:underline sm:focus-visible:underline`

const iconBtnClass = 'shrink-0 p-1 sm:px-1 sm:py-0'

export function LocationFrame({
  venues,
  index,
  picker,
  map,
  overlay,
}: {
  venues: Venue[]
  index: number
  picker: ReactNode
  map: ReactNode
  overlay: ReactNode
}) {
  const venue = venues[index]
  if (!venue) return null

  return (
    <div className="relative h-full min-h-0">
      <div className="pointer-events-none absolute inset-0">
        {venues.map((item, itemIndex) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
            draggable={false}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out select-none motion-reduce:transition-none ${itemIndex === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{ background: `color-mix(in srgb, ${palette.pitch} 84%, transparent)` }}
        />
        <FilmGrain className="absolute inset-0 mix-blend-soft-light opacity-[0.14]" />
      </div>
      <div className="relative z-10 flex h-full min-h-0 flex-col px-3 pt-[var(--cs-header-h)] pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-10 sm:pb-[max(calc(var(--cs-h,100svh)*0.12),env(safe-area-inset-bottom))] lg:px-20">
        <div className="mx-auto flex min-h-0 w-full max-w-[42rem] flex-1 flex-col sm:max-w-[min(42rem,68vw)]">
          {picker}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 pt-3 sm:gap-4 sm:pt-4 lg:gap-5 lg:pt-6">
            <div className="min-h-0 min-w-0 flex-1">{map}</div>
            {overlay}
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
      </div>
    </div>
  )
}
