import { useRef } from 'react'
import { InstagramIcon, TelegramIcon, TikTokIcon } from '../../components/icons'
import { useGoldShine } from '../../hooks/gold-shine'
import { useWordmark, wordmarkAspect } from '../../hooks/wordmark'
import { FOOTER_LINKS, scrollSnapPortTo } from '../../lib/nav'
import { COMPANY_NAME, COMPANY_NIP, INSTAGRAMS, TIKTOK } from '../../lib/seo'
import { VENUES } from '../../lib/venues'

const FRANCHISE_MAIL = 'mailto:franchise@premiumlounge.club'

const linkClass =
  'text-[var(--cs-ice)] transition-colors hover:text-[var(--cs-gold)] focus-visible:text-[var(--cs-gold)] focus-visible:outline-none'

const columnLinkClass = `font-[family-name:var(--cs-body)] text-[0.62rem] font-medium tracking-[0.12em] lowercase sm:text-[0.68rem] ${linkClass}`

const placeClass =
  'whitespace-nowrap font-[family-name:var(--cs-body)] text-[0.62rem] font-medium tracking-[0.14em] text-[var(--cs-caption)] uppercase sm:text-[0.68rem]'

const socialLinkClass = `whitespace-nowrap font-[family-name:var(--cs-body)] text-[0.62rem] font-medium tracking-[0.14em] uppercase sm:text-[0.68rem] ${linkClass}`

const phoneClass = `whitespace-nowrap font-[family-name:var(--cs-body)] text-[0.75rem] font-medium tabular-nums tracking-[0.02em] sm:text-[0.82rem] ${linkClass}`

const ruleClass = 'bg-[color-mix(in_srgb,var(--cs-ice)_22%,transparent)]'

const warsawVenues = VENUES.filter((venue) => venue.id !== 'wroclaw')
const wroclawVenue = VENUES.find((venue) => venue.id === 'wroclaw')
const [warsawInstagram, wroclawInstagram] = INSTAGRAMS

const COPYRIGHT_YEAR = new Date().getFullYear()

function scrollToSection(id: string, reduced: boolean) {
  const port = document.querySelector<HTMLElement>('[data-cs-scroll]')
  if (!port) return
  scrollSnapPortTo(port, id, reduced)
}

function CityRule({ city, className = '' }: { city: string; className?: string }) {
  return (
    <p className={`col-span-3 flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className={`h-px flex-1 ${ruleClass}`} />
      <span className={placeClass}>{city}</span>
      <span aria-hidden className={`h-px flex-1 ${ruleClass}`} />
    </p>
  )
}

function VenueRow({ venue }: { venue: (typeof VENUES)[number] }) {
  return (
    <li className="col-span-3 grid grid-cols-subgrid items-center">
      <span className={placeClass}>{venue.shortName}</span>
      <a
        href={venue.telegram}
        target="_blank"
        rel="noreferrer"
        aria-label={`${venue.shortName} on Telegram`}
        className={`inline-flex shrink-0 ${linkClass}`}
      >
        <TelegramIcon className="size-3.5 shrink-0 sm:size-4" />
      </a>
      <a href={`tel:${venue.phone}`} className={phoneClass}>
        {venue.phoneLabel}
      </a>
    </li>
  )
}

/** Booking pill is 0.875rem padding plus a 0.75rem line. */
const franchiseBandClass =
  'cs-gold-band relative z-20 flex h-[2.5rem] w-full shrink-0 items-center justify-center font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-medium tracking-[0.14em] text-black no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-black sm:tracking-[var(--cs-track-micro)]'

function FranchiseBand() {
  const ref = useRef<HTMLAnchorElement>(null)
  const live = useGoldShine(ref)

  return (
    <a
      ref={ref}
      href={FRANCHISE_MAIL}
      className={`${franchiseBandClass}${live ? ' cs-gold-live' : ''}`}
    >
      Open a franchise &gt;
    </a>
  )
}

function Logo() {
  const src = useWordmark()

  return (
    <img
      src={src ?? undefined}
      alt="Prime"
      draggable={false}
      className="block h-[clamp(1.55rem,3.8vh,2.7rem)] w-auto max-w-none shrink-0 self-start object-contain lg:col-start-1 lg:row-start-1"
      style={{ aspectRatio: wordmarkAspect, visibility: src ? 'visible' : 'hidden' }}
    />
  )
}

export function BasementContacts({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative z-10 shrink-0 backdrop-blur-md"
      style={{ background: 'rgba(0, 0, 0, 0.55)' }}
    >
      <FranchiseBand />
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-4 px-4 pt-[clamp(0.85rem,2.2vh,1.5rem)] pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:px-8 lg:gap-6 lg:px-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-3 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-5">
          <div className="flex min-w-0 flex-col items-start gap-3 sm:gap-4 lg:contents">
            <Logo />
            <nav
              aria-label="Page"
              className="flex flex-col items-start gap-1.5 sm:gap-2 lg:col-start-1 lg:row-start-2"
            >
              {FOOTER_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className={`cursor-pointer text-left whitespace-nowrap ${columnLinkClass}`}
                  onClick={() => scrollToSection(link.id, reduced)}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="grid w-max grid-cols-[max-content_max-content_max-content] items-center justify-self-end gap-x-2 sm:gap-x-2.5 lg:col-start-2 lg:row-start-2 lg:justify-self-end">
            <CityRule city="Warsaw" />
            <ul className="col-span-3 mt-1.5 grid grid-cols-subgrid gap-y-1.5 sm:gap-y-2">
              {warsawVenues.map((venue) => (
                <VenueRow key={venue.id} venue={venue} />
              ))}
            </ul>
            {wroclawVenue ? (
              <>
                <CityRule city="Wrocław" className="mt-2 sm:mt-2.5" />
                <ul className="col-span-3 mt-1.5 grid grid-cols-subgrid">
                  <VenueRow venue={wroclawVenue} />
                </ul>
              </>
            ) : null}
            <nav
              aria-label="Social"
              className="col-span-3 mt-2.5 flex w-full flex-col gap-1.5 sm:mt-3"
            >
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="size-4 shrink-0" />
                <span aria-hidden className={`h-px min-w-4 flex-1 ${ruleClass}`} />
                <TikTokIcon className="size-4 shrink-0" />
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-start gap-1.5">
                  <a
                    href={warsawInstagram.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${warsawInstagram.city} on Instagram`}
                    className={socialLinkClass}
                  >
                    {warsawInstagram.city}
                  </a>
                  <a
                    href={wroclawInstagram.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${wroclawInstagram.city} on Instagram`}
                    className={socialLinkClass}
                  >
                    {wroclawInstagram.city}
                  </a>
                </div>
                <a
                  href={TIKTOK.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Prime on TikTok"
                  className={socialLinkClass}
                >
                  {TIKTOK.label}
                </a>
              </div>
            </nav>
          </div>
        </div>

        <p className="text-center font-[family-name:var(--cs-body)] text-[0.68rem] leading-snug text-balance text-[var(--cs-caption)] sm:text-[0.75rem]">
          © {COPYRIGHT_YEAR} {COMPANY_NAME} · NIP {COMPANY_NIP} · All rights reserved.
        </p>
      </div>
    </div>
  )
}
