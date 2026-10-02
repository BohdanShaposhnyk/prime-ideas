import { useEffect, useState, type RefObject } from 'react'
import { gsap, useGSAP } from '@/site/lib/gsap'
import { usePrefersReducedMotion } from '../hooks/media'

/** Veil fade on enter. STAY waits 0.75s, then PRIME waits out the fold. */
const VEIL_S = 0.85
const STAY_AT = 0.75
const FOLD_S = 0.7
const FOLD_STAGGER = 0.06
const STAY_CHARS = 4
const PRIME_AT = STAY_AT + FOLD_S + FOLD_STAGGER * (STAY_CHARS - 1)

/** How much of the floor must be in the snap port before the intro plays. */
const ENTER_AT = 0.45

export const stayFold = {
  duration: FOLD_S,
  stagger: FOLD_STAGGER,
} as const

/**
 * Basement intro.
 * `veil` — entry veil fades out.
 * `stay` — one second after enter, FoldText mounts and unfolds.
 * `prime` — ParticleText mounts only after STAY has finished, and unmounts on leave.
 */
export function useBasementIntro(
  sectionRef: RefObject<HTMLElement | null>,
  veilRef: RefObject<HTMLDivElement | null>,
) {
  const reduced = usePrefersReducedMotion()
  const [present, setPresent] = useState(false)
  const [stayOn, setStayOn] = useState(false)
  const [primeOn, setPrimeOn] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const root = section.closest<Element>('[data-cs-scroll]')
    const io = new IntersectionObserver(
      ([entry]) => {
        const hit = Boolean(entry?.isIntersecting)
        if (!hit) {
          setPresent(false)
          setStayOn(false)
          setPrimeOn(false)
          return
        }
        setPresent(true)
      },
      { root, threshold: ENTER_AT },
    )
    io.observe(section)
    return () => io.disconnect()
  }, [sectionRef])

  useGSAP(
    () => {
      const veil = veilRef.current
      if (!veil) return

      if (!present) {
        gsap.set(veil, { opacity: reduced ? 0 : 1 })
        return
      }

      if (reduced) {
        gsap.set(veil, { opacity: 0 })
        setStayOn(true)
        setPrimeOn(true)
        return () => {
          setStayOn(false)
          setPrimeOn(false)
        }
      }

      let cancelled = false
      const tl = gsap.timeline()

      tl.addLabel('veil', 0)
      tl.to(veil, { opacity: 0, duration: VEIL_S, ease: 'power2.out' }, 'veil')

      tl.addLabel('stay', STAY_AT)
      tl.call(() => {
        if (!cancelled) setStayOn(true)
      }, undefined, 'stay')

      tl.addLabel('prime', PRIME_AT)
      tl.call(() => {
        if (!cancelled) setPrimeOn(true)
      }, undefined, 'prime')

      return () => {
        cancelled = true
        tl.kill()
      }
    },
    { dependencies: [present, reduced] },
  )

  return { stayOn: present && stayOn, primeOn: present && primeOn }
}
