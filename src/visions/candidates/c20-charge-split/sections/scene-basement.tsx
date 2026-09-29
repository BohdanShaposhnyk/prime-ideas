import { useRef } from 'react'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { InstagramIcon, TelegramIcon } from '../components/icons'
import { usePrefersReducedMotion } from '../hooks/media'
import { useWordmark, wordmarkAspect } from '../hooks/wordmark'
import { lockupClass } from '../lib/palette'
import { VENUES } from '../lib/venues'
import space from '../assets/stars/space.jpg'

const SOCIALS = [
  {
    id: 'instagram',
    label: '@prime_warsaw',
    href: 'https://www.instagram.com/prime_warsaw/',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/primewarsaw',
  },
] as const

const linkClass =
  'text-[var(--cs-ice)] transition-colors hover:text-[var(--cs-gold)] focus-visible:text-[var(--cs-gold)] focus-visible:outline-none'

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
 * A black top veil matches the section above, then fades as this floor locks in.
 */
export default function SceneBasement() {
  const sectionRef = useRef<HTMLElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const veil = veilRef.current
      const section = sectionRef.current
      if (!veil || !section) return
      if (reduced) {
        gsap.set(veil, { opacity: 0 })
        return
      }
      gsap.fromTo(
        veil,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        },
      )
    },
    { dependencies: [reduced] },
  )

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
          className={`text-center ${lockupClass}`}
        >
          Stay <span className="text-[var(--cs-gold)]">Prime</span>
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
            {SOCIALS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className={`inline-flex items-center gap-2 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] tracking-[0.14em] uppercase sm:tracking-[var(--cs-track-micro)] ${linkClass}`}
              >
                {social.id === 'instagram' ? (
                  <InstagramIcon className="size-[1.25em] shrink-0" />
                ) : (
                  <TelegramIcon className="size-[1.15em] shrink-0" />
                )}
                <span className="hidden md:inline">{social.label}</span>
              </a>
            ))}
          </nav>

          <ul className="col-span-2 flex flex-col gap-0.5 sm:col-span-1 sm:gap-1">
            {VENUES.map((venue) => (
              <li
                key={venue.id}
                className="flex items-baseline justify-between gap-4 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] sm:justify-end"
              >
                <span className="tracking-[0.14em] text-[var(--cs-caption)] uppercase sm:tracking-[var(--cs-track-micro)]">
                  {venue.shortName}
                </span>
                <a href={`tel:${venue.phone}`} className={`tabular-nums tracking-[0.04em] ${linkClass}`}>
                  {venue.phoneLabel}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
