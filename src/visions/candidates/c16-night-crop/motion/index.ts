import type { RefObject } from 'react'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function padShot(index: number, total: number) {
  return `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
}

function scrambleExif(el: HTMLElement) {
  const original = el.dataset.exifSrc ?? el.textContent ?? ''
  const proxy = { t: 0 }
  gsap.to(proxy, {
    t: 1,
    duration: 0.42,
    ease: 'none',
    overwrite: true,
    onUpdate: () => {
      if (proxy.t < 0.72) {
        el.textContent = original
          .split('')
          .map((char) => {
            if (char === ' ' || char === '·') return char
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
        return
      }
      el.textContent = original
    },
    onComplete: () => {
      el.textContent = original
    },
  })
}

/**
 * Night Crop motion — whip-pan strip, crop-mark tick + flash, EXIF scramble.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root) return

      const runway = root.querySelector<HTMLElement>('[data-scroll="runway"]')
      const finder = root.querySelector<HTMLElement>('[data-scroll="finder"]')
      const strip = root.querySelector<HTMLElement>('[data-scroll="strip"]')
      const flash = root.querySelector<HTMLElement>('[data-flash]')
      const shot = root.querySelector<HTMLElement>('[data-shot]')
      const marks = root.querySelectorAll<HTMLElement>('[data-mark]')
      const frames = root.querySelectorAll<HTMLElement>('[data-scroll="frame"]')
      if (!runway || !finder || !strip || frames.length === 0) return

      const total = frames.length

      if (prefersReducedMotion()) {
        gsap.set(runway, { height: 'auto' })
        gsap.set(finder, { position: 'relative', height: 'auto', overflow: 'visible' })
        gsap.set(strip, { display: 'block', width: '100%', x: 0 })
        gsap.set(frames, { width: '100%', height: '100dvh' })
        if (shot) shot.textContent = padShot(0, total)
        return
      }

      const snapPoints = total > 1 ? 1 / (total - 1) : 1
      let locked = 0
      let primed = false

      const lockCrop = (index: number, withFx: boolean) => {
        locked = index
        if (shot) shot.textContent = padShot(index, total)

        if (!withFx) return

        if (flash) {
          gsap.fromTo(
            flash,
            { opacity: 0.72 },
            { opacity: 0, duration: 0.14, ease: 'power2.out', overwrite: true },
          )
        }

        if (marks.length) {
          gsap.fromTo(
            marks,
            {
              x: (i) => (i === 0 || i === 2 ? -10 : 10),
              y: (i) => (i === 0 || i === 1 ? -10 : 10),
            },
            { x: 0, y: 0, duration: 0.2, ease: 'power3.out', overwrite: true },
          )
        }

        const exif = frames[index]?.querySelector<HTMLElement>('[data-exif]')
        if (exif) scrambleExif(exif)
      }

      gsap.to(strip, {
        x: () => -(strip.scrollWidth - finder.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: runway,
          pin: finder,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.18,
          invalidateOnRefresh: true,
          snap: {
            snapTo: snapPoints,
            duration: { min: 0.14, max: 0.28 },
            ease: 'power4.inOut',
            delay: 0.04,
          },
          onUpdate: (self) => {
            const index = Math.round(self.progress * (total - 1))
            if (!primed) {
              primed = true
              lockCrop(index, false)
              return
            }
            if (index !== locked) lockCrop(index, true)
          },
        },
      })
    },
    { scope, dependencies: [] },
  )
}
