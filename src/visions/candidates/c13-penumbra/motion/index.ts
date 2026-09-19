import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

function restAngle(el: HTMLElement, fallback: number) {
  const raw = el.dataset.rakeAngle ?? ''
  const n = Number.parseFloat(raw)
  return Number.isFinite(n) ? n : fallback
}

/**
 * Penumbra motion — rake the key-light band through depth planes,
 * catch type in the lit face, keep near orbs over-blurred.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const beats = root.querySelectorAll<HTMLElement>('[data-beat]')

      beats.forEach((beat) => {
        const rake = beat.querySelector<HTMLElement>('[data-rake]')
        const band = beat.querySelector<HTMLElement>('[data-plane="band"]')
        const far = beat.querySelectorAll<HTMLElement>('[data-plane="far"]')
        const mid = beat.querySelectorAll<HTMLElement>('[data-plane="mid"]')
        const near = beat.querySelector<HTMLElement>('[data-plane="near"]')
        const orbs = beat.querySelectorAll<HTMLElement>('[data-orb]')
        const glyphs = beat.querySelectorAll<HTMLElement>('[data-type="glyph"]')
        const phrase = beat.querySelector<HTMLElement>('[data-type="phrase"]')
        const typeFar = beat.querySelector<HTMLElement>('[data-plane="type-far"]')
        const rim = beat.querySelector<HTMLElement>('[data-plane="rim"]')

        const angle = rake ? restAngle(rake, -18) : -18

        if (rake) {
          gsap.set(rake, { transformOrigin: '12% 50%', force3D: true })
          gsap.fromTo(
            rake,
            { rotate: angle - 9, yPercent: -8 },
            {
              rotate: angle + 10,
              yPercent: 14,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.75,
              },
            },
          )
        }

        if (band) {
          gsap.set(band, { transformOrigin: '12% 50%', force3D: true })
          gsap.fromTo(
            band,
            { rotate: angle - 9, yPercent: -10, opacity: 0.35 },
            {
              rotate: angle + 10,
              yPercent: 16,
              opacity: 0.8,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.75,
              },
            },
          )
        }

        far.forEach((plane) => {
          gsap.set(plane, { force3D: true })
          gsap.fromTo(
            plane,
            { filter: 'blur(42px) brightness(0.55)', opacity: 0.72 },
            {
              filter: 'blur(22px) brightness(0.9)',
              opacity: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top 80%',
                end: 'center center',
                scrub: 0.9,
              },
            },
          )
        })

        mid.forEach((plane) => {
          gsap.set(plane, { force3D: true })
          gsap.fromTo(
            plane,
            { filter: 'blur(48px) brightness(0.45)', opacity: 0.55 },
            {
              filter: 'blur(10px) brightness(1.18)',
              opacity: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top 70%',
                end: 'center 40%',
                scrub: 0.8,
              },
            },
          )
        })

        if (near) {
          gsap.set(near, { force3D: true })
          gsap.fromTo(
            near,
            { yPercent: 8, filter: 'blur(8px)' },
            {
              yPercent: -12,
              filter: 'blur(4px)',
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1,
              },
            },
          )
        }

        orbs.forEach((orb, i) => {
          const dir = i % 2 === 0 ? 1 : -1
          gsap.set(orb, { force3D: true })
          gsap.fromTo(
            orb,
            {
              xPercent: -10 * dir,
              yPercent: 16,
              filter: 'blur(10px)',
              scale: 0.86,
            },
            {
              xPercent: 12 * dir,
              yPercent: -22,
              filter: 'blur(22px)',
              scale: 1.12,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            },
          )
        })

        if (glyphs.length) {
          gsap.set(glyphs, { force3D: true })
          gsap.fromTo(
            glyphs,
            {
              letterSpacing: '0.06em',
              textShadow: '0 0 0 transparent',
              opacity: 0.55,
              filter: 'blur(7px)',
            },
            {
              letterSpacing: '-0.045em',
              textShadow:
                '0 0 28px color-mix(in srgb, #FFF8EE 55%, transparent), 0 18px 48px color-mix(in srgb, #D4A574 40%, transparent)',
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'none',
              immediateRender: false,
              stagger: 0.03,
              scrollTrigger: {
                trigger: beat,
                start: 'top 82%',
                end: 'top 12%',
                scrub: 0.65,
              },
            },
          )
        }

        if (phrase) {
          gsap.fromTo(
            phrase,
            { opacity: 0.28, filter: 'blur(8px)', y: 16 },
            {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top 78%',
                end: 'top 18%',
                scrub: 0.7,
              },
            },
          )
        }

        if (typeFar) {
          gsap.fromTo(
            typeFar,
            { opacity: 0.5, x: -8, filter: 'blur(22px)' },
            {
              opacity: 0.22,
              x: 18,
              filter: 'blur(28px)',
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        }

        if (rim) {
          gsap.fromTo(
            rim,
            { opacity: 0.25, scaleY: 0.72 },
            {
              opacity: 1,
              scaleY: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: beat,
                start: 'top 80%',
                end: 'center center',
                scrub: 0.9,
              },
            },
          )
        }
      })

      ScrollTrigger.refresh()
    },
    { scope, dependencies: [] },
  )
}
