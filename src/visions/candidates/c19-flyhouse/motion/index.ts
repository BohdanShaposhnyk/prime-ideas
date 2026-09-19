import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

/**
 * Flyhouse motion — fly-in from the grid, fly-out on the next cue, surtitle recast.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const runway = root.querySelector<HTMLElement>('[data-scroll="fly-runway"]')
      const flies = root.querySelector<HTMLElement>('[data-scroll="flies"]')
      const valance = root.querySelector<HTMLElement>('[data-plane="valance"]')
      const surtitle = root.querySelector<HTMLElement>('[data-surtitle]')
      const cueRail = root.querySelector<HTMLElement>('[data-cue="rail"]')
      const hero = root.querySelector<HTMLElement>('[data-drop="hero"]')
      const drops = gsap.utils.toArray<HTMLElement>(
        '[data-scroll="flies"] [data-scroll="drop"]',
        root,
      )

      if (!runway || !flies || drops.length === 0) return

      const lines = [
        hero?.dataset.surtitleLine ?? 'The house is open.',
        ...drops.map((d) => d.dataset.surtitleLine ?? ''),
      ]

      const metrics = { parkY: 0, battenH: 0 }

      const measure = () => {
        metrics.battenH = drops[0]?.getBoundingClientRect().height || 72
        metrics.parkY = valance?.getBoundingClientRect().height ?? 0
      }

      gsap.set(flies, { top: 0, bottom: 0, height: '100%' })

      const park = (el: HTMLElement, index: number) => {
        gsap.killTweensOf(el)
        gsap.set(el, {
          position: 'absolute',
          left: 0,
          width: '100%',
          top: metrics.parkY + index * metrics.battenH,
          height: metrics.battenH,
          y: 0,
          yPercent: 0,
          zIndex: 2,
          overflow: 'hidden',
        })
      }

      const flyIn = (el: HTMLElement) => {
        gsap.killTweensOf(el)
        gsap.set(el, {
          position: 'absolute',
          left: 0,
          width: '100%',
          top: 0,
          height: '100%',
          overflow: 'hidden',
          zIndex: 20,
          yPercent: -92,
          y: 0,
        })
        gsap.to(el, {
          yPercent: 0,
          duration: 0.88,
          ease: 'power3.out',
          overwrite: true,
        })
        gsap.to(el, {
          y: 14,
          duration: 0.16,
          delay: 0.84,
          yoyo: true,
          repeat: 1,
          ease: 'power1.out',
        })
      }

      const flyOut = (el: HTMLElement, index: number) => {
        gsap.killTweensOf(el)
        gsap.to(el, {
          yPercent: -92,
          duration: 0.62,
          ease: 'power2.in',
          overwrite: true,
          onComplete: () => park(el, index),
        })
      }

      const recast = (beat: number) => {
        const line = lines[beat] ?? ''
        if (cueRail) {
          cueRail.textContent = `Pinrail · ${String(beat).padStart(2, '0')}`
        }
        if (!surtitle) return
        gsap.killTweensOf(surtitle)
        gsap.to(surtitle, {
          opacity: 0,
          y: -8,
          duration: 0.14,
          ease: 'power1.in',
          onComplete: () => {
            surtitle.textContent = line
            gsap.fromTo(
              surtitle,
              { y: 10, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' },
            )
          },
        })
      }

      measure()
      drops.forEach((drop, i) => park(drop, i))

      const beats = drops.length + 1
      let active = 0

      const goTo = (next: number) => {
        if (next === active) return

        drops.forEach((drop, i) => {
          const beat = i + 1
          if (beat === next) flyIn(drop)
          else if (beat === active) flyOut(drop, i)
          else park(drop, i)
        })

        recast(next)
        active = next
      }

      ScrollTrigger.create({
        trigger: runway,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: (value) => {
            const steps = beats - 1
            return Math.round(value * steps) / steps
          },
          duration: { min: 0.18, max: 0.4 },
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const next = Math.round(self.progress * (beats - 1))
          goTo(next)
        },
      })

      const onRefresh = () => {
        measure()
        drops.forEach((drop, i) => {
          if (i + 1 !== active) park(drop, i)
        })
      }
      ScrollTrigger.addEventListener('refresh', onRefresh)

      return () => {
        ScrollTrigger.removeEventListener('refresh', onRefresh)
      }
    },
    { scope, dependencies: [] },
  )
}
