import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

function flicker(scopeEl: HTMLElement | null) {
  const flash = scopeEl?.querySelector<HTMLElement>('[data-flicker]')
  if (!flash) return
  gsap.killTweensOf(flash)
  gsap.set(flash, { opacity: 0 })
  gsap.fromTo(
    flash,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.05,
      yoyo: true,
      repeat: 1,
      ease: 'none',
      overwrite: true,
      onComplete: () => {
        gsap.set(flash, { opacity: 0 })
      },
    },
  )
}

/**
 * Hard Invert motion — snap-strobe paging, invert flicker, six-frame pin.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const viewport = root.querySelector<HTMLElement>('[data-strobe="viewport"]')
      const stage = root.querySelector<HTMLElement>('[data-strobe="stage"]')
      const frames = gsap.utils.toArray<HTMLElement>(
        '[data-strobe-frame]',
        viewport ?? root,
      )

      if (viewport && frames.length) {
        gsap.set(viewport, {
          height: '100dvh',
          overflow: 'hidden',
        })
        gsap.set(frames, {
          position: 'absolute',
          inset: 0,
          autoAlpha: 0,
        })
        gsap.set(frames[0], { autoAlpha: 1 })

        let current = 0
        const show = (index: number) => {
          if (index === current) return
          const prevFlash = frames[current].querySelector<HTMLElement>(
            '[data-flicker]',
          )
          if (prevFlash) {
            gsap.killTweensOf(prevFlash)
            gsap.set(prevFlash, { opacity: 0 })
          }
          gsap.set(frames[current], { autoAlpha: 0 })
          gsap.set(frames[index], { autoAlpha: 1 })
          flicker(frames[index])
          current = index
        }

        ScrollTrigger.create({
          trigger: viewport,
          start: 'top top',
          end: () => `+=${Math.round(window.innerHeight * 2.8)}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const next = Math.min(
              frames.length - 1,
              Math.floor(self.progress * frames.length),
            )
            show(next)
          },
        })
      }

      root.querySelectorAll<HTMLElement>('[data-scroll="flyer"]').forEach((flyer) => {
        ScrollTrigger.create({
          trigger: flyer,
          start: 'top 55%',
          onEnter: () => flicker(flyer),
          onEnterBack: () => flicker(flyer),
        })
      })

      const snaps = gsap.utils.toArray<HTMLElement>('[data-snap]', root)

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        snap: {
          snapTo: (progress) => {
            const max = ScrollTrigger.maxScroll(window)
            if (!max) return progress
            if (stage) {
              const start = stage.offsetTop / max
              const end =
                (stage.offsetTop + stage.offsetHeight - window.innerHeight) / max
              if (progress > start + 0.012 && progress < end - 0.012) {
                return progress
              }
            }
            const pts = snaps.map((el) => el.offsetTop / max)
            return gsap.utils.snap(pts, progress)
          },
          duration: 0.06,
          delay: 0,
          ease: 'none',
        },
      })

      ScrollTrigger.refresh()
    },
    { scope, dependencies: [] },
  )
}
