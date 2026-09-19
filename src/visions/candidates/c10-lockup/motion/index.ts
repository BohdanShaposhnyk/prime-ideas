import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

const STACK_COLOR: Record<string, string> = {
  hero: '#12110E',
  mass: '#12110E',
  whisper: '#2546F5',
  heat: '#F5B942',
  count: '#2546F5',
  echo: '#12110E',
}

function charsOf(el: Element) {
  return el.querySelectorAll<HTMLElement>('[data-char]')
}

function wordsOf(el: Element) {
  return el.querySelectorAll<HTMLElement>('[data-word]')
}

function setTypeFrom(section: HTMLElement) {
  section.querySelectorAll<HTMLElement>('[data-type="rise-chars"]').forEach((el) => {
    gsap.set(charsOf(el), { yPercent: 118, rotate: 7 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="ghost-chars"]').forEach((el) => {
    gsap.set(charsOf(el), { yPercent: 118, x: 10 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="drop-chars"]').forEach((el) => {
    gsap.set(charsOf(el), { yPercent: -90, scaleY: 1.35, transformOrigin: '50% 100%' })
  })
  section.querySelectorAll<HTMLElement>('[data-type="slide-chars"]').forEach((el) => {
    gsap.set(charsOf(el), { x: 28, opacity: 0 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="lock-chars"]').forEach((el) => {
    gsap.set(charsOf(el), { yPercent: 110, rotateX: 55, transformOrigin: '50% 100%' })
  })
  section.querySelectorAll<HTMLElement>('[data-type="echo-line"]').forEach((el) => {
    gsap.set(charsOf(el), { yPercent: 120 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="slide-words"]').forEach((el) => {
    gsap.set(wordsOf(el), { yPercent: 115 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="meta"]').forEach((el) => {
    gsap.set(el, { y: 12, opacity: 0 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="track-in"]').forEach((el) => {
    gsap.set(el, { letterSpacing: '0.38em', opacity: 0.15 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="track-wide"]').forEach((el) => {
    gsap.set(el, { letterSpacing: '0.62em', opacity: 0 })
  })
  section.querySelectorAll<HTMLElement>('[data-type="track-lock"]').forEach((el) => {
    gsap.set(el, {
      letterSpacing: '0.32em',
      clipPath: 'inset(0 100% 0 0)',
    })
  })
  section.querySelectorAll<HTMLElement>('[data-type="clip-up"]').forEach((el) => {
    gsap.set(el, { clipPath: 'inset(100% 0 0 0)' })
  })
  section.querySelectorAll<HTMLElement>('[data-type="count"]').forEach((el) => {
    el.textContent = '00'
  })
}

function playType(section: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  const meta = section.querySelectorAll<HTMLElement>('[data-type="meta"]')
  if (meta.length) {
    tl.to(meta, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06 }, 0)
  }

  section.querySelectorAll<HTMLElement>('[data-type="rise-chars"]').forEach((el) => {
    tl.to(
      charsOf(el),
      { yPercent: 0, rotate: 0, duration: 0.72, stagger: 0.05, ease: 'power4.out' },
      0.08,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="ghost-chars"]').forEach((el) => {
    tl.to(
      charsOf(el),
      { yPercent: 0, x: 0, duration: 0.72, stagger: 0.05, ease: 'power4.out' },
      0.16,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="drop-chars"]').forEach((el) => {
    tl.to(
      charsOf(el),
      {
        yPercent: 0,
        scaleY: 1,
        duration: 0.7,
        stagger: 0.07,
        ease: 'power3.out',
      },
      0.12,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="slide-chars"]').forEach((el) => {
    tl.to(
      charsOf(el),
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.024, ease: 'power2.out' },
      0.1,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="lock-chars"]').forEach((el) => {
    tl.to(
      charsOf(el),
      {
        yPercent: 0,
        rotateX: 0,
        duration: 0.62,
        stagger: 0.055,
        ease: 'power4.out',
      },
      0.08,
    )
  })

  const echoLines = section.querySelectorAll<HTMLElement>('[data-type="echo-line"]')
  echoLines.forEach((line, i) => {
    tl.to(
      charsOf(line),
      { yPercent: 0, duration: 0.58, stagger: 0.04, ease: 'power4.out' },
      0.1 + i * 0.14,
    )
  })

  section.querySelectorAll<HTMLElement>('[data-type="slide-words"]').forEach((el, i) => {
    tl.to(
      wordsOf(el),
      { yPercent: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out' },
      0.28 + i * 0.08,
    )
  })

  section.querySelectorAll<HTMLElement>('[data-type="track-in"]').forEach((el) => {
    tl.to(
      el,
      { letterSpacing: '0.04em', opacity: 1, duration: 0.8, ease: 'power2.inOut' },
      0.35,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="track-wide"]').forEach((el) => {
    tl.to(
      el,
      { letterSpacing: '0.2em', opacity: 1, duration: 0.75, ease: 'power2.out' },
      0.22,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="track-lock"]').forEach((el) => {
    tl.to(
      el,
      {
        letterSpacing: '-0.055em',
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.95,
        ease: 'power3.inOut',
      },
      0.1,
    )
  })
  section.querySelectorAll<HTMLElement>('[data-type="clip-up"]').forEach((el) => {
    tl.to(
      el,
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'power3.out' },
      0.45,
    )
  })

  section.querySelectorAll<HTMLElement>('[data-type="count"]').forEach((el) => {
    const target = Number(el.getAttribute('data-count-to') ?? '24')
    const proxy = { n: 0 }
    tl.to(
      proxy,
      {
        n: target,
        duration: 1.1,
        ease: 'power2.out',
        snap: { n: 1 },
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.n)).padStart(2, '0')
        },
      },
      0.12,
    )
  })

  return tl
}

/**
 * Lockup motion — offset-latch, stack compress, per-slab type lockups.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const ticks = root.querySelectorAll<HTMLElement>('[data-spine-tick]')
      ticks.forEach((tick) => {
        gsap.set(tick, { opacity: 0.36 })
      })

      const stackItems = root.querySelectorAll<HTMLElement>('[data-stack-item]')
      stackItems.forEach((item) => {
        const id = item.getAttribute('data-stack-item') ?? ''
        gsap.set(item, {
          height: 0,
          backgroundColor: STACK_COLOR[id] ?? '#12110E',
          force3D: true,
        })
      })

      const lockups = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll('[data-lockup]'),
      )

      lockups.forEach((section) => {
        const block = section.querySelector<HTMLElement>('[data-block]')
        const latch = block?.getAttribute('data-latch') ?? 'left'
        const lockupId = section.getAttribute('data-lockup') ?? ''
        const spineId = section.getAttribute('data-spine-id')
        const tick = spineId
          ? root.querySelector<HTMLElement>(`[data-spine-tick="${spineId}"]`)
          : null
        const num = tick?.querySelector<HTMLElement>('[data-spine-num]')
        const stackItem = root.querySelector<HTMLElement>(
          `[data-stack-item="${lockupId}"]`,
        )
        const isColophon = lockupId === 'colophon'
        const isRest = latch === 'rest'

        setTypeFrom(section)

        ScrollTrigger.create({
          trigger: section,
          start: lockupId === 'hero' ? 'top 85%' : 'top 62%',
          once: true,
          onEnter: () => {
            playType(section)
          },
        })

        if (block) {
          const origin = latch === 'right' ? '88% 70%' : '12% 70%'
          gsap.set(block, { force3D: true, transformOrigin: origin })

          const fromX = latch === 'right' ? 110 : latch === 'left' ? -110 : 0
          const fromRot = latch === 'right' ? 1.8 : latch === 'left' ? -1.8 : 0

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 88%',
              end: 'bottom top',
              scrub: 0.45,
            },
          })

          if (!isRest) {
            tl.fromTo(
              block,
              { xPercent: fromX, rotate: fromRot },
              {
                xPercent: 0,
                rotate: 0,
                ease: 'back.out(1.25)',
                duration: 0.32,
                immediateRender: false,
              },
              0,
            )
          }

          if (!isColophon) {
            tl.to(
              block,
              {
                yPercent: -8,
                ease: 'none',
                duration: 0.18,
              },
              0.8,
            )
            if (stackItem) {
              tl.to(
                stackItem,
                {
                  height: 7,
                  ease: 'none',
                  duration: 0.18,
                },
                0.8,
              )
            }
          }
        }

        if (tick) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 55%',
            end: 'bottom 40%',
            onToggle: (self) => {
              gsap.to(tick, {
                opacity: self.isActive ? 1 : 0.36,
                duration: 0.16,
                overwrite: 'auto',
              })
              if (!num) return
              if (self.isActive) {
                gsap.fromTo(
                  num,
                  { clipPath: 'inset(100% 0 0 0)' },
                  {
                    clipPath: 'inset(0% 0 0 0)',
                    duration: 0.28,
                    ease: 'power2.out',
                    overwrite: 'auto',
                  },
                )
              }
            },
          })
        }
      })
    },
    { scope, dependencies: [] },
  )
}
