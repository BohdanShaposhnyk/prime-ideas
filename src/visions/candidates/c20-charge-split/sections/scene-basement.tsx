import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import primeLogo from '../assets/01_prime-logo.png'
import space from '../assets/stars/space.jpg'

/** Wordmark bounds inside the 1290×790 black plate. */
const MARK = { x: 229, y: 268, w: 832, h: 192 } as const

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

const CONTACTS = [
  { name: 'Mennica', phone: '+48530811888', label: '+48 530 811 888' },
  { name: 'Mokotów', phone: '+48530822888', label: '+48 530 822 888' },
  { name: 'Wrocław', phone: '+48530881888', label: '+48 530 818 888' },
] as const

const linkClass =
  'text-[var(--cs-ice)] transition-colors hover:text-[var(--cs-gold)] focus-visible:text-[var(--cs-gold)] focus-visible:outline-none'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

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

function Logo() {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = MARK.w
      canvas.height = MARK.h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, MARK.x, MARK.y, MARK.w, MARK.h, 0, 0, MARK.w, MARK.h)
      const frame = ctx.getImageData(0, 0, MARK.w, MARK.h)
      const px = frame.data
      const cut = 18
      for (let i = 0; i < px.length; i += 4) {
        const max = Math.max(px[i] ?? 0, px[i + 1] ?? 0, px[i + 2] ?? 0)
        px[i + 3] = max <= cut ? 0 : Math.min(255, Math.round(((max - cut) * 255) / (255 - cut)))
      }
      ctx.putImageData(frame, 0, 0)
      setSrc(canvas.toDataURL('image/png'))
    }
    img.src = primeLogo
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <img
      src={src ?? undefined}
      alt="Prime"
      draggable={false}
      className="h-[clamp(1.55rem,4.6vh,2.7rem)] w-auto shrink-0"
      style={{ aspectRatio: `${MARK.w} / ${MARK.h}`, visibility: src ? 'visible' : 'hidden' }}
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

  useGSAP(
    () => {
      const veil = veilRef.current
      const section = sectionRef.current
      if (!veil || !section) return
      if (prefersReducedMotion()) {
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
    { dependencies: [] },
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
          className="text-center font-[family-name:var(--cs-display)] text-[clamp(3.2rem,13vw,8.5rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase"
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
            {CONTACTS.map((venue) => (
              <li
                key={venue.name}
                className="flex items-baseline justify-between gap-4 font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] sm:justify-end"
              >
                <span className="tracking-[0.14em] text-[var(--cs-caption)] uppercase sm:tracking-[var(--cs-track-micro)]">
                  {venue.name}
                </span>
                <a href={`tel:${venue.phone}`} className={`tabular-nums tracking-[0.04em] ${linkClass}`}>
                  {venue.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
