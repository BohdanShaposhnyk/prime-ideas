import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import { CAST_PLATES, type CastPlate } from '../sections/cast'

function plateBySection(el: HTMLElement): CastPlate {
  const id = el.dataset.plate
  return CAST_PLATES.find((p) => p.id === id) ?? CAST_PLATES[0]
}

/**
 * Quiet Cast motion — sticky vessel recasts the lockup.
 * Shuffle + VariableProximity live on the lockup; this hook drives plate
 * changes and tracking breath.
 */
export function useCandidateMotion(
  scope: RefObject<HTMLElement | null>,
  onPlate?: (plate: CastPlate) => void,
) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const runway = root.querySelector<HTMLElement>('[data-scroll="cast-runway"]')
      const pin = root.querySelector<HTMLElement>('[data-scroll="cast-pin"]')
      const wrap = root.querySelector<HTMLElement>('[data-lockup-wrap]')
      const plates = Array.from(root.querySelectorAll<HTMLElement>('[data-plate]'))
      if (!runway || !pin || plates.length === 0) return

      let current: CastPlate['id'] = CAST_PLATES[0].id
      const recast = (plate: CastPlate) => {
        if (plate.id === current) return
        current = plate.id
        onPlate?.(plate)
      }

      ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        endTrigger: plates[0],
        end: 'top top',
        onEnter: () => recast(CAST_PLATES[0]),
        onEnterBack: () => recast(CAST_PLATES[0]),
      })

      plates.forEach((el, i) => {
        const next = plates[i + 1]
        ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          endTrigger: next ?? runway,
          end: next ? 'top top' : 'bottom bottom',
          onEnter: () => recast(plateBySection(el)),
          onEnterBack: () => recast(plateBySection(el)),
        })
      })

      if (prefersReducedMotion() || !wrap) return

      const beats = CAST_PLATES.length
      ScrollTrigger.create({
        trigger: runway,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.85,
        onUpdate: (self) => {
          const local = (self.progress * beats) % 1
          const inhale = local < 0.5 ? local * 2 : (1 - local) * 2
          gsap.set(wrap, {
            letterSpacing: `${-0.04 + inhale * 0.15}em`,
          })
        },
      })
    },
    { scope, dependencies: [onPlate] },
  )
}
