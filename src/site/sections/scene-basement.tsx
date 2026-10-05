import { useEffect, useRef, useState, type CSSProperties } from 'react'
import FoldText from '@/site/bits/FoldText'
import ParticleText from '@/site/bits/ParticleText'
import { InstagramIcon, TelegramIcon } from '../components/icons'
import { useWordmark, wordmarkAspect } from '../hooks/wordmark'
import { lockupClass, palette } from '../lib/palette'
import { INSTAGRAMS } from '../lib/seo'
import { VENUES } from '../lib/venues'
import space from '../assets/stars/space.webp'
import { stayFold, useBasementIntro } from './basement-intro'

const linkClass =
  'text-[var(--cs-ice)] transition-colors hover:text-[var(--cs-gold)] focus-visible:text-[var(--cs-gold)] focus-visible:outline-none'

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
      className="h-[clamp(1.55rem,4.6vh,2.7rem)] w-auto shrink-0"
      style={{ aspectRatio: wordmarkAspect, visibility: src ? 'visible' : 'hidden' }}
    />
  )
}

/**
 * Closing viewport — dimmed star field, centered lockup, translucent contact band.
 * Enter timeline: veil fades, STAY unfolds, then PRIME assembles. PRIME unmounts on leave.
 */
export default function SceneBasement() {
  const sectionRef = useRef<HTMLElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const { stayOn, primeOn } = useBasementIntro(sectionRef, veilRef)
  const desktop = useDesktopCloud()

  return (
    <section
      ref={sectionRef}
      id="cs-basement"
      aria-labelledby="cs-basement-title"
      data-scene="basement"
      className="cs-scene relative isolate overflow-hidden bg-black text-[var(--cs-ice)]"
    >
      <img
        src={space}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/45" aria-hidden />
      <div
        ref={veilRef}
        data-entry-veil=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[62%]"
        style={{
          background:
            'linear-gradient(to bottom, #000 0%, #000 22%, rgba(0,0,0,0.82) 48%, rgba(0,0,0,0.35) 72%, transparent 100%)',
        }}
      />

      <div className="absolute inset-x-0 top-0 z-[1] flex h-3/4 items-center justify-center px-5">
        <h2
          id="cs-basement-title"
          className={`flex items-center justify-center gap-[0.12em] text-center ${lockupClass}`}
        >
          {stayOn ? (
            <>
              <FoldText
                text="Stay"
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
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 flex h-1/4 items-center border-t border-[color-mix(in_srgb,var(--cs-ice)_16%,transparent)] backdrop-blur-md"
        style={{ background: 'rgba(0, 0, 0, 0.55)' }}
      >
        <div className="mx-auto grid h-full w-full max-w-[88rem] grid-cols-[auto_1fr] content-center items-center gap-x-4 gap-y-2.5 px-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-8 sm:px-8 lg:px-12">
          <Logo />

          <nav
            aria-label="Social"
            className="flex items-center justify-end gap-4 sm:justify-center sm:gap-6"
          >
            {INSTAGRAMS.map((profile) => (
              <a
                key={profile.id}
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                aria-label={profile.handle}
                className={`inline-flex items-center gap-2 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] tracking-[0.14em] uppercase sm:tracking-[var(--cs-track-micro)] ${linkClass}`}
              >
                <InstagramIcon className="size-[1.25em] shrink-0" />
                <span className="md:hidden">{profile.city}</span>
                <span className="hidden md:inline">{profile.handle}</span>
              </a>
            ))}
          </nav>

          <ul className="col-span-2 flex flex-col gap-0.5 sm:col-span-1 sm:gap-1">
            {VENUES.map((venue) => (
              <li
                key={venue.id}
                className="flex items-center justify-between gap-3 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] sm:justify-end sm:gap-4"
              >
                <span className="tracking-[0.14em] text-[var(--cs-caption)] uppercase sm:tracking-[var(--cs-track-micro)]">
                  {venue.shortName}
                </span>
                <span className="inline-flex items-center gap-2">
                  <a href={`tel:${venue.phone}`} className={`tabular-nums tracking-[0.04em] ${linkClass}`}>
                    {venue.phoneLabel}
                  </a>
                  <a
                    href={venue.telegram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${venue.shortName} on Telegram`}
                    className={`inline-flex ${linkClass}`}
                  >
                    <TelegramIcon className="size-[1.15em] shrink-0" />
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
