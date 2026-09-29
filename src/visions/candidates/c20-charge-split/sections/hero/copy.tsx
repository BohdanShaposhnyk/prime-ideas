import { useRef } from 'react'
import SplitText from '@/shared/bits/SplitText'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { BookNightButton } from '../../components/book-night'
import { usePrefersReducedMotion } from '../../hooks/media'
import { kickerClass, lockupClass, supportClass } from '../../lib/palette'

export function HeroCopy() {
  const copyRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useGSAP(
    () => {
      const root = copyRef.current
      if (!root || reduced) return
      const extras = root.querySelectorAll<HTMLElement>('[data-hero-extra]')
      if (!extras.length) return
      gsap.fromTo(
        extras,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.18,
          stagger: 0.14,
          ease: 'power3.out',
        },
      )
    },
    { scope: copyRef, dependencies: [reduced] },
  )

  const quiet = reduced ? '' : 'opacity-0'

  return (
    <div
      ref={copyRef}
      className="pointer-events-none absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex w-[min(92vw,40rem)] -translate-x-1/2 flex-col items-center px-4 text-center"
    >
      <p
        data-hero-extra=""
        className={`mb-3 sm:mb-4 ${kickerClass} ${quiet}`}
      >
        Official NAVI partner
      </p>
      <SplitText
        text="enter your prime"
        splitType="words"
        tag="p"
        textAlign="center"
        delay={90}
        duration={0.85}
        ease="power3.out"
        from={{ opacity: 0, y: 36 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0}
        rootMargin="0px"
        className={`${lockupClass} [&_.split-word:last-child]:!text-[var(--cs-gold)]`}
      />
      <p
        data-hero-extra=""
        className={`mt-3 max-w-[24rem] sm:mt-4 ${supportClass} ${quiet}`}
      >
        One night. Five ways to make it yours.
      </p>
      <div
        data-hero-extra=""
        className={`pointer-events-auto mt-6 sm:mt-8 ${quiet}`}
      >
        <BookNightButton />
      </div>
    </div>
  )
}
