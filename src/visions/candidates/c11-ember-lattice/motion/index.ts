import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

/**
 * Ember Lattice motion — pulse-rings expand, shaders retune, rails lock.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const runway = root.querySelector<HTMLElement>('[data-scroll="pulse-runway"]')
      if (!runway) return

      const silk = root.querySelector<HTMLElement>('[data-plane="silk"]')
      const ripple = root.querySelector<HTMLElement>('[data-plane="ripple"]')
      const plasma = root.querySelector<HTMLElement>('[data-plane="plasma"]')
      const rays = root.querySelector<HTMLElement>('[data-plane="rays"]')
      const ember = root.querySelector<HTMLElement>('[data-plane="ember"]')
      const rings = root.querySelectorAll<HTMLElement>('[data-ring]')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
        },
      })

      rings.forEach((ring, i) => {
        gsap.set(ring, { transformOrigin: '50% 50%', force3D: true })
        tl.fromTo(
          ring,
          { scale: 0.72 + i * 0.04, opacity: 0.35 },
          {
            scale: 1.55 + i * 0.18,
            opacity: 0.95,
            ease: 'none',
            duration: 1,
            immediateRender: false,
          },
          0,
        )
      })

      if (silk) {
        tl.fromTo(
          silk,
          { opacity: 0.85 },
          { opacity: 1, ease: 'none', duration: 1, immediateRender: false },
          0,
        )
      }

      if (ripple) {
        tl.fromTo(
          ripple,
          { opacity: 1 },
          {
            opacity: 0.42,
            ease: 'none',
            duration: 0.22,
            immediateRender: false,
          },
          0.12,
        ).to(
          ripple,
          { opacity: 0.28, ease: 'none', duration: 0.18 },
          0.34,
        ).to(
          ripple,
          { opacity: 0.7, ease: 'none', duration: 0.18 },
          0.52,
        ).to(
          ripple,
          { opacity: 0.9, ease: 'none', duration: 0.16 },
          0.7,
        ).to(
          ripple,
          { opacity: 0.55, ease: 'none', duration: 0.14 },
          0.86,
        )
      }

      if (plasma) {
        gsap.set(plasma, { transformOrigin: '70% 55%', force3D: true })
        tl.fromTo(
          plasma,
          { scale: 1, opacity: 0.7 },
          {
            scale: 2.35,
            opacity: 1,
            ease: 'none',
            duration: 0.2,
            immediateRender: false,
          },
          0.14,
        ).to(
          plasma,
          { scale: 1.05, opacity: 0.28, ease: 'none', duration: 0.14 },
          0.32,
        ).to(
          plasma,
          { scale: 0.92, opacity: 0.18, ease: 'none', duration: 0.54 },
          0.46,
        )
      }

      if (rays) {
        gsap.set(rays, { transformOrigin: '80% 10%', force3D: true })
        tl.fromTo(
          rays,
          { scale: 1, opacity: 0.55 },
          {
            scale: 1.2,
            opacity: 0.4,
            ease: 'none',
            duration: 0.2,
            immediateRender: false,
          },
          0,
        ).to(
          rays,
          { scale: 2.6, opacity: 1, ease: 'none', duration: 0.2 },
          0.32,
        ).to(
          rays,
          { scale: 1.35, opacity: 0.45, ease: 'none', duration: 0.18 },
          0.54,
        ).to(
          rays,
          { scale: 1.1, opacity: 0.3, ease: 'none', duration: 0.28 },
          0.72,
        )
      }

      if (ember) {
        tl.fromTo(
          ember,
          { opacity: 0.18 },
          {
            opacity: 0.22,
            ease: 'none',
            duration: 0.34,
            immediateRender: false,
          },
          0,
        ).to(
          ember,
          { opacity: 0.95, ease: 'none', duration: 0.16 },
          0.5,
        ).to(
          ember,
          { opacity: 0.28, ease: 'none', duration: 0.2 },
          0.7,
        )
      }

      const rails = root.querySelectorAll<HTMLElement>('[data-rail="lock"]')
      rails.forEach((rail) => {
        const block = rail.querySelector('div')
        if (!block) return
        gsap.fromTo(
          block,
          { x: 36, opacity: 0.55 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: rail,
              start: 'top 82%',
              end: 'top 38%',
              scrub: 0.45,
            },
          },
        )
      })
    },
    { scope, dependencies: [] },
  )
}
