import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

/**
 * Glass Cap motion — frost lifts, rooms bloom under the seal, rim refracts.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const stage = root.querySelector<HTMLElement>('[data-scroll="cap-lift"]')
      const frost = root.querySelector<HTMLElement>('[data-plane="frost"]')
      const rim = root.querySelector<HTMLElement>('[data-plane="rim"]')
      const refraction = root.querySelector<HTMLElement>(
        '[data-plane="refraction"]',
      )

      // 1 — Cap Y-translate + frost opacity dissolve (primary lift)
      if (stage && (frost || rim)) {
        const lift = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })

        if (frost) {
          gsap.set(frost, { transformOrigin: '50% 0%', force3D: true })
          lift.fromTo(
            frost,
            { yPercent: 0, opacity: 1 },
            {
              yPercent: -120,
              opacity: 0,
              ease: 'none',
              duration: 1,
              immediateRender: false,
            },
            0,
          )
        }

        if (rim) {
          lift.fromTo(
            rim,
            { y: 0, opacity: 0.7 },
            {
              y: -48,
              opacity: 0,
              ease: 'none',
              duration: 1,
              immediateRender: false,
            },
            0,
          )
        }
      }

      // 2 — Under-cap scale bloom per room
      const rooms = root.querySelectorAll<HTMLElement>('[data-scroll="bloom"]')
      rooms.forEach((section) => {
        const underCap = section.querySelector<HTMLElement>(
          '[data-plane="under-cap"]',
        )
        if (!underCap) return

        gsap.set(underCap, { transformOrigin: '50% 58%', force3D: true })
        gsap.fromTo(
          underCap,
          { scale: 1.1 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 25%',
              scrub: true,
            },
          },
        )
      })

      // 3 — Refraction shimmer along the glass rim
      if (stage && refraction) {
        gsap.set(refraction, { force3D: true })
        gsap.fromTo(
          refraction,
          { xPercent: -55, opacity: 0.18 },
          {
            xPercent: 55,
            opacity: 0.55,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      }

      ScrollTrigger.refresh()
    },
    { scope, dependencies: [] },
  )
}
