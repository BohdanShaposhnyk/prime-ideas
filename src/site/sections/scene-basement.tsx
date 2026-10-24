import { useEffect, useRef, useState, type CSSProperties } from 'react'
import FoldText from '@/site/bits/FoldText'
import ParticleText from '@/site/bits/ParticleText'
import { BookNightButton } from '../components/book-night'
import { InstagramIcon, TelegramIcon, TikTokIcon } from '../components/icons'
import { useGoldShine } from '../hooks/gold-shine'
import { usePrefersReducedMotion } from '../hooks/media'
import { useWordmark, wordmarkAspect } from '../hooks/wordmark'
import { FOOTER_LINKS } from '../lib/nav'
import { lockupClass, palette } from '../lib/palette'
import { COMPANY_NAME, COMPANY_NIP, INSTAGRAMS, TIKTOK } from '../lib/seo'
import { VENUES } from '../lib/venues'
import space from '../assets/stars/space.webp'
import { stayFold, stayWord, useBasementIntro } from './basement-intro'

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
  const el = document.getElementById(id)
  if (!port || !el) return
  const top = el.getBoundingClientRect().top - port.getBoundingClientRect().top + port.scrollTop
  port.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

const lockupSize = 'clamp(4rem, 9vw, 5.4rem)'

/** Word slot. The canvas is larger than this and centered on it. */
const primeSlot = { width: '2.28em', height: '1.15em', fontSize: lockupSize }

/** Drops the gathered word onto STAY's line. The field stays centered on the slot. */
const primeDrop = '0.05em'

function fieldMask(edge: number) {
  const solid = 100 - edge
  return [
    `linear-gradient(to right, transparent 0%, #000 ${edge}%, #000 ${solid}%, transparent 100%)`,
    `linear-gradient(to bottom, transparent 0%, #000 ${edge + 2}%, #000 ${solid - 2}%, transparent 100%)`,
  ].join(', ')
}

function primeFieldStyle(desktop: boolean): CSSProperties {
  const mask = fieldMask(desktop ? 14 : 22)
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: desktop ? 'min(84vw, 22em)' : '6.4em',
    height: desktop ? 'min(68vh, 16em)' : '5em',
    minHeight: 0,
    fontSize: lockupSize,
    transform: `translate(-50%, calc(-50% + ${primeDrop}))`,
    touchAction: 'pan-y',
    maskImage: mask,
    WebkitMaskImage: mask,
    maskComposite: 'intersect',
    WebkitMaskComposite: 'source-in',
  }
}

function useDesktopCloud() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const apply = () => setDesktop(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  return desktop
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

/**
 * Closing viewport — dimmed star field, centered lockup, contact band.
 * Enter timeline: veil fades, STAY unfolds, then PRIME assembles. PRIME unmounts on leave.
 * The booking CTA keeps its resting slot and fades in only after STAY has landed.
 * Franchise is a full-width gold band at the top of the contact row.
 * The band is only as tall as its contents, so the sky keeps the rest.
 * Logo and nav sit on the left. Contacts sit on the right:
 * Each city name sits on a rule above its venues. Opera is the Wrocław venue.
 * Socials span the column: Instagram and TikTok sit on one rule, accounts under each logo.
 * The veil fades out inside the sky so the band stays clear while STAY arrives.
 */
export default function SceneBasement() {
  const sectionRef = useRef<HTMLElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const { stayOn, primeOn, ctaOn } = useBasementIntro(sectionRef, veilRef)
  const desktop = useDesktopCloud()
  const reduced = usePrefersReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="cs-basement"
      aria-labelledby="cs-basement-title"
      data-scene="basement"
      className="cs-scene relative isolate flex flex-col overflow-hidden bg-black text-[var(--cs-ice)]"
    >
      <img
        src={space}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <div
          ref={veilRef}
          data-entry-veil=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[85%]"
          style={{
            background:
              'linear-gradient(to bottom, #000 0%, #000 22%, rgba(0,0,0,0.82) 48%, rgba(0,0,0,0.35) 72%, transparent 100%)',
          }}
        />

        <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-5 px-5 sm:gap-6">
        <h2
          id="cs-basement-title"
          className={`flex items-center justify-center gap-[0.12em] text-center ${lockupClass}`}
          style={{ minHeight: primeSlot.height }}
        >
          {stayOn ? (
            <>
              <FoldText
                text={stayWord}
                splitBy="char"
                hinge="top"
                trigger="mount"
                duration={stayFold.duration}
                stagger={stayFold.stagger}
                fontSize={lockupSize}
                fontWeight={400}
                color={palette.ice}
                className="font-[family-name:var(--cs-display)] uppercase"
                style={{
                  letterSpacing: 'var(--cs-track-display)',
                  lineHeight: 'var(--cs-lead-display)',
                }}
              />
              <span className="relative shrink-0" style={primeSlot}>
                {primeOn ? (
                  <ParticleText
                    text="PRIME"
                    color={palette.gold}
                    highlightColor="#F6E7A8"
                    particleSize={1.7}
                    density={3}
                    scatter={desktop ? 360 : 96}
                    gatherDuration={1080}
                    stagger={0}
                    pointerRepel={22}
                    repelRadius={desktop ? 140 : 100}
                    idleDrift={0.22}
                    glow
                    trigger="mount"
                    fontSize={lockupSize}
                    fontWeight={400}
                    fontFamily='"Bebas Neue", sans-serif'
                    className="cs-prime-field"
                    style={primeFieldStyle(desktop)}
                  />
                ) : (
                  <span className="sr-only">Prime</span>
                )}
              </span>
            </>
          ) : (
            <span className="sr-only">Stay Prime</span>
          )}
        </h2>
        <div
          className={`relative z-20 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            ctaOn ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
          inert={!ctaOn}
        >
          <BookNightButton />
        </div>
        </div>

      </div>

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
    </section>
  )
}
