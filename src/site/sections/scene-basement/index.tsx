import { useRef } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../../hooks/media'
import space from '../../assets/stars/space.webp'
import { BasementContacts } from './contacts'
import { BasementLockup } from './lockup'
import { useBasementIntro } from './use-intro'

/**
 * Closing viewport — dimmed star field, centered lockup, contact band.
 * Enter timeline: veil fades, then STAY and PRIME mount together. PRIME unmounts on leave.
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
  const desktop = useMediaQuery('(min-width: 1024px)')
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
        <BasementLockup stayOn={stayOn} primeOn={primeOn} ctaOn={ctaOn} desktop={desktop} />
      </div>
      <BasementContacts reduced={reduced} />
    </section>
  )
}
