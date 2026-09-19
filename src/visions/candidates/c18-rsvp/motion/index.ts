import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

function lipSize(root: HTMLElement) {
  const band = root.querySelector<HTMLElement>('[data-lip-band]')
  const h = band?.getBoundingClientRect().height ?? 0
  return h > 0 ? h : 44
}

/**
 * RSVP motion — compress each invitation into a top lip,
 * rise the next card with silk lag, settle the lockup tracking.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const stages = Array.from(root.querySelectorAll<HTMLElement>('[data-stage]'))
      if (!stages.length) return

      const lip = lipSize(root)

      stages.forEach((stage, i) => {
        const plate = stage.querySelector<HTMLElement>('[data-plate]')
        if (!plate) return

        const silk = plate.querySelector<HTMLElement>('[data-silk]')
        const copy = plate.querySelector<HTMLElement>('[data-copy]')
        const lockup = plate.querySelector<HTMLElement>('[data-lockup]')
        const italic = plate.querySelector<HTMLElement>('[data-italic]')
        const rail = plate.querySelector<HTMLElement>('[data-rail]')
        const next = stages[i + 1]
        const nextPlate = next?.querySelector<HTMLElement>('[data-plate]')

        gsap.set(plate, { clipPath: 'inset(0px 0px 0px 0px)', force3D: true })
        if (silk) gsap.set(silk, { yPercent: 18 })
        if (copy) gsap.set(copy, { yPercent: 8 })
        if (lockup) gsap.set(lockup, { letterSpacing: '0.16em' })
        if (italic) gsap.set(italic, { opacity: 0.15, y: 12 })
        if (rail) gsap.set(rail, { opacity: 0.2, y: 18 })

        ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: 'max',
          pin: plate,
          pinSpacing: false,
          anticipatePin: 1,
        })

        if (silk) {
          gsap.fromTo(
            silk,
            { yPercent: 18 },
            {
              yPercent: 0,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: 'top 90%',
                end: 'top 18%',
                scrub: 0.85,
              },
            },
          )
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { yPercent: 8 },
            {
              yPercent: 0,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: 'top 85%',
                end: 'top 22%',
                scrub: 0.55,
              },
            },
          )
        }

        if (lockup) {
          gsap.fromTo(
            lockup,
            { letterSpacing: '0.16em' },
            {
              letterSpacing: '-0.04em',
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: 'top 75%',
                end: 'top 20%',
                scrub: 0.7,
              },
            },
          )
        }

        if (italic) {
          gsap.fromTo(
            italic,
            { opacity: 0.15, y: 12 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: 'top 70%',
                end: 'top 28%',
                scrub: 0.5,
              },
            },
          )
        }

        if (rail) {
          gsap.fromTo(
            rail,
            { opacity: 0.2, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: stage,
                start: 'top 68%',
                end: 'top 24%',
                scrub: 0.6,
              },
            },
          )
        }

        if (!next || !nextPlate) return

        const stacked = (i + 1) * lip

        const plateH = Math.max(plate.offsetHeight, window.innerHeight)
        gsap.fromTo(
          plate,
          { clipPath: 'inset(0px 0px 0px 0px)' },
          {
            clipPath: `inset(0px 0px ${Math.max(plateH - lip, 0)}px 0px)`,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: next,
              start: 'top 55%',
              end: 'top top',
              scrub: 0.35,
            },
          },
        )

        gsap.fromTo(
          nextPlate,
          { top: 0 },
          {
            top: stacked,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: next,
              start: 'top 55%',
              end: 'top top',
              scrub: 0.35,
            },
          },
        )
      })

      const onResize = () => ScrollTrigger.refresh()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    },
    { scope, dependencies: [] },
  )
}
