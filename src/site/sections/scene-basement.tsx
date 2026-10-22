import { useEffect, useRef, useState, type CSSProperties } from 'react'
import FoldText from '@/site/bits/FoldText'
import ParticleText from '@/site/bits/ParticleText'
import { BookNightButton } from '../components/book-night'
import { InstagramIcon, TelegramIcon } from '../components/icons'
import { usePrefersReducedMotion } from '../hooks/media'
import { useWordmark, wordmarkAspect } from '../hooks/wordmark'
import { FOOTER_LINKS } from '../lib/nav'
import { lockupClass, palette } from '../lib/palette'
import { COMPANY_NAME, COMPANY_NIP, INSTAGRAMS } from '../lib/seo'
import { VENUES } from '../lib/venues'
import space from '../assets/stars/space.webp'
import { stayFold, stayWord, useBasementIntro } from './basement-intro'

const FRANCHISE_MAIL = 'mailto:franchise@premiumlounge.club'

const linkClass =
  'text-[var(--cs-ice)] transition-colors hover:text-[var(--cs-gold)] focus-visible:text-[var(--cs-gold)] focus-visible:outline-none'

/** Same treatment as the events gallery link. */
const textLinkClass = `inline-flex items-center font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-medium tracking-[0.14em] sm:tracking-[var(--cs-track-micro)] ${linkClass}`

const columnLinkClass = `font-[family-name:var(--cs-body)] text-[0.8rem] font-medium tracking-[0.12em] uppercase sm:text-[0.95rem] sm:tracking-[var(--cs-track-micro)] ${linkClass}`

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
 * Franchise is a mailto at the bottom of the sky.
 * The band is only as tall as its contents, so the sky keeps the rest.
 * Phone: logo and nav on the left, phones then Instagram on the right.
 * Desktop: logo on its own row, then nav, Instagram, and phones.
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

        <a href={FRANCHISE_MAIL} className={`relative z-20 mb-[0.85rem] self-center ${textLinkClass}`}>
          Open a franchise &gt;
        </a>
      </div>

      <div
        className="relative z-10 shrink-0 border-t border-[color-mix(in_srgb,var(--cs-ice)_16%,transparent)] backdrop-blur-md"
        style={{ background: 'rgba(0, 0, 0, 0.55)' }}
      >
        <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-4 px-4 pt-[clamp(0.85rem,2.2vh,1.5rem)] pb-[max(0.85rem,env(safe-area-inset-bottom))] sm:px-8 lg:gap-6 lg:px-12">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-3 lg:grid-cols-[auto_1fr_auto] lg:gap-x-16 lg:gap-y-5">
            <div className="flex min-w-0 flex-col items-start gap-3 sm:gap-4 lg:contents">
              <Logo />
              <nav
                aria-label="Page"
                className="flex flex-col items-start gap-2 sm:gap-2.5 lg:col-start-1 lg:row-start-2"
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

            <div className="flex flex-col items-start gap-3 justify-self-end sm:gap-4 lg:contents">
              <ul className="grid grid-cols-[max-content_max-content_max-content] items-center gap-x-2 gap-y-2.5 font-[family-name:var(--cs-body)] text-[0.8rem] sm:gap-x-3 sm:gap-y-3.5 sm:text-[0.95rem] lg:col-start-3 lg:row-start-2 lg:justify-self-end lg:text-[1.05rem]">
                {VENUES.map((venue) => (
                  <li key={venue.id} className="col-span-3 grid grid-cols-subgrid items-center">
                    <span className="whitespace-nowrap tracking-[0.12em] text-[var(--cs-caption)] uppercase sm:tracking-[var(--cs-track-micro)]">
                      {venue.shortName}
                    </span>
                    <a
                      href={venue.telegram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${venue.shortName} on Telegram`}
                      className={`inline-flex shrink-0 ${linkClass}`}
                    >
                      <TelegramIcon className="size-4 shrink-0 sm:size-5" />
                    </a>
                    <a
                      href={`tel:${venue.phone}`}
                      className={`whitespace-nowrap tabular-nums tracking-[0.02em] ${linkClass}`}
                    >
                      {venue.phoneLabel}
                    </a>
                  </li>
                ))}
              </ul>

              <nav
                aria-label="Social"
                className="flex flex-col items-start gap-2 sm:gap-2.5 lg:col-start-2 lg:row-start-2 lg:justify-self-center"
              >
                {INSTAGRAMS.map((profile) => (
                  <a
                    key={profile.id}
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${profile.city} on Instagram`}
                    className={`inline-flex items-center gap-2 ${columnLinkClass}`}
                  >
                    <InstagramIcon className="size-4 shrink-0 sm:size-5" />
                    <span className="lg:hidden">{profile.city}</span>
                    <span className="hidden lg:inline">{profile.handle}</span>
                  </a>
                ))}
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
