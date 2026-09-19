import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

const READOUT: Record<string, string> = {
  hero: 'Focus · Open',
  heat: 'Focus · Heat',
  play: 'Focus · Play',
  screen: 'Focus · Frame',
  voice: 'Focus · Voice',
  close: 'Focus · Rest',
}

/**
 * Caustic Focus motion — rack plates through the optical axis,
 * discover type as each plate hits focus, drift liquid caustics.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const plates = root.querySelectorAll<HTMLElement>('[data-plate]')
      const readout = root.querySelector<HTMLElement>('[data-axis="readout"]')
      const specular = root.querySelector<HTMLElement>('[data-plane="specular"]')
      const rim = root.querySelector<HTMLElement>('[data-plane="glass-rim"]')
      const runway = root.querySelector<HTMLElement>('[data-scroll="rack-runway"]')

      if (specular && runway) {
        gsap.set(specular, { force3D: true })
        gsap.fromTo(
          specular,
          { xPercent: -18, yPercent: 0, opacity: 0.28 },
          {
            xPercent: 22,
            yPercent: 36,
            opacity: 0.55,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: runway,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.7,
            },
          },
        )
      }

      if (rim && runway) {
        gsap.set(rim, { transformOrigin: '50% 50%', force3D: true })
        gsap.fromTo(
          rim,
          { scale: 1 },
          {
            scale: 1.04,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: runway,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.8,
            },
          },
        )
      }

      plates.forEach((plate) => {
        const id = plate.dataset.plate ?? ''
        const visual = plate.querySelector<HTMLElement>('[data-placeholder="visual"]')
        const caustic = plate.querySelector<HTMLElement>('[data-plane="caustic"]')
        const bokeh = plate.querySelector<HTMLElement>('[data-plane="bokeh"]')
        const words = plate.querySelectorAll<HTMLElement>('[data-type="word"]')

        if (visual) {
          gsap.set(visual, { transformOrigin: '50% 50%', force3D: true })

          const rack = gsap.timeline({
            scrollTrigger: {
              trigger: plate,
              start: id === 'hero' ? 'center center' : 'top 78%',
              end: id === 'close' ? 'center center' : 'bottom 22%',
              scrub: 0.55,
            },
          })

          if (id === 'hero') {
            rack.fromTo(
              visual,
              { filter: 'blur(0px)', scale: 1 },
              { filter: 'blur(9px)', scale: 1.04, ease: 'none', duration: 1 },
            )
          } else if (id === 'close') {
            rack.fromTo(
              visual,
              { filter: 'blur(10px)', scale: 1.05 },
              { filter: 'blur(0px)', scale: 1, ease: 'none', duration: 1 },
            )
          } else {
            rack
              .fromTo(
                visual,
                { filter: 'blur(10px)', scale: 1.05 },
                { filter: 'blur(0px)', scale: 1, ease: 'none', duration: 0.32 },
              )
              .to(visual, {
                filter: 'blur(0px)',
                scale: 1,
                ease: 'none',
                duration: 0.36,
              })
              .to(visual, {
                filter: 'blur(9px)',
                scale: 1.04,
                ease: 'none',
                duration: 0.32,
              })
          }
        }

        if (words.length > 0) {
          gsap.set(words, { willChange: 'filter, transform, opacity' })

          const discover = gsap.timeline({
            scrollTrigger: {
              trigger: plate,
              start: id === 'hero' ? 'center 48%' : 'top 62%',
              end: id === 'close' ? 'center 44%' : 'bottom 20%',
              scrub: 0.4,
            },
          })

          if (id === 'hero') {
            discover.fromTo(
              words,
              { filter: 'blur(0px)', autoAlpha: 1, y: 0 },
              {
                filter: 'blur(7px)',
                autoAlpha: 0.45,
                y: -10,
                stagger: { each: 0.04, from: 'end' },
                ease: 'none',
                duration: 1,
              },
            )
          } else if (id === 'close') {
            discover.fromTo(
              words,
                { filter: 'blur(8px)', autoAlpha: 0.45, y: 14 },
              {
                filter: 'blur(0px)',
                autoAlpha: 1,
                y: 0,
                stagger: 0.07,
                ease: 'none',
                duration: 1,
              },
            )
          } else {
            discover
              .fromTo(
                words,
                { filter: 'blur(8px)', autoAlpha: 0.45, y: 14 },
                {
                  filter: 'blur(0px)',
                  autoAlpha: 1,
                  y: 0,
                  stagger: 0.06,
                  ease: 'none',
                  duration: 0.34,
                },
              )
              .to(words, {
                filter: 'blur(0px)',
                autoAlpha: 1,
                y: 0,
                ease: 'none',
                duration: 0.32,
              })
              .to(words, {
                filter: 'blur(7px)',
                autoAlpha: 0.45,
                y: -12,
                stagger: { each: 0.04, from: 'end' },
                ease: 'none',
                duration: 0.34,
              })
          }
        }

        if (caustic) {
          gsap.set(caustic, { force3D: true })
          gsap.fromTo(
            caustic,
            { yPercent: -10, xPercent: 6 },
            {
              yPercent: 14,
              xPercent: -8,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: plate,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.65,
              },
            },
          )
        }

        if (bokeh) {
          gsap.set(bokeh, { force3D: true })
          gsap.fromTo(
            bokeh,
            { yPercent: 8, scale: 1.04 },
            {
              yPercent: -12,
              scale: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: plate,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.7,
              },
            },
          )
        }

        if (readout) {
          ScrollTrigger.create({
            trigger: plate,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) {
                readout.textContent = READOUT[id] ?? 'Focus'
              }
            },
          })
        }
      })
    },
    { scope, dependencies: [] },
  )
}
