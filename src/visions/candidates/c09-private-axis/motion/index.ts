import { useEffect, useRef, type RefObject } from 'react'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

type MotionOptions = {
  onLodgeVeil?: (active: boolean) => void
}

function armDecrypt(el: Element | null, armed: WeakSet<Element>) {
  if (!el || armed.has(el)) return
  armed.add(el)
  el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
}

/**
 * Private Axis motion — Z-plunge pin, non-vertical docks, async type.
 */
export function useCandidateMotion(
  scope: RefObject<HTMLElement | null>,
  options?: MotionOptions,
) {
  const onLodgeVeilRef = useRef(options?.onLodgeVeil)

  useEffect(() => {
    onLodgeVeilRef.current = options?.onLodgeVeil
  })

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        onLodgeVeilRef.current?.(true)
        return () => onLodgeVeilRef.current?.(false)
      }

      const root = scope.current
      if (!root) return

      const runway = root.querySelector<HTMLElement>('[data-scroll="axis-runway"]')
      const stage = root.querySelector<HTMLElement>('[data-scroll="depth"]')
      const grid = root.querySelector<HTMLElement>('[data-corridor="grid"]')
      const hero = root.querySelector<HTMLElement>('[data-scene="hero"]')
      if (!runway || !stage) return

      const gaming = root.querySelector<HTMLElement>('[data-slab="gaming"]')
      const cinema = root.querySelector<HTMLElement>('[data-slab="cinema"]')
      const karaoke = root.querySelector<HTMLElement>('[data-slab="karaoke"]')
      const lodge = root.querySelector<HTMLElement>('[data-slab="lodge"]')
      const bar = root.querySelector<HTMLElement>('[data-slab="bar"]')
      const kitchen = root.querySelector<HTMLElement>('[data-slab="kitchen"]')
      const stamp = root.querySelector<HTMLElement>('[data-slab="stamp"]')

      const gamingType = gaming?.querySelector('[data-type="discover"]')
      const cinemaType = cinema?.querySelector('[data-type="discover"]')
      const karaokeType = karaoke?.querySelector('[data-type="discover"]')
      const lodgeType = lodge?.querySelector('[data-type="discover"]')
      const barType = bar?.querySelector('[data-type="discover"]')
      const kitchenType = kitchen?.querySelector('[data-type="discover"]')
      const stampType = stamp?.querySelector('[data-type="discover"]')

      gsap.set(stage, { transformPerspective: 1400, transformStyle: 'preserve-3d' })

      if (gaming) {
        gsap.set(gaming, { xPercent: 78, z: -820, rotateY: -38, autoAlpha: 0 })
      }
      if (cinema) {
        gsap.set(cinema, { z: -1100, scale: 0.52, autoAlpha: 0 })
      }
      if (karaoke) {
        gsap.set(karaoke, { xPercent: -86, rotateY: 72, z: -640, autoAlpha: 0 })
      }
      if (lodge) {
        gsap.set(lodge, { z: -980, yPercent: 18, autoAlpha: 0 })
      }
      if (bar) {
        gsap.set(bar, { xPercent: -92, rotateY: 26, z: -700, autoAlpha: 0 })
      }
      if (kitchen) {
        gsap.set(kitchen, { xPercent: 92, rotateY: -26, z: -700, autoAlpha: 0 })
      }
      if (stamp) {
        gsap.set(stamp, { z: -880, scale: 0.28, autoAlpha: 0 })
      }

      const types = [
        gamingType,
        cinemaType,
        karaokeType,
        lodgeType,
        barType,
        kitchenType,
        stampType,
      ].filter(Boolean)
      if (types.length) gsap.set(types, { autoAlpha: 0 })

      let veilOn = false
      const applyVeil = (on: boolean) => {
        if (on === veilOn) return
        veilOn = on
        onLodgeVeilRef.current?.(on)
      }

      const decryptArmed = new WeakSet<Element>()

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: runway,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          onUpdate: (self) => {
            applyVeil(self.progress >= 0.52 && self.progress <= 0.84)
          },
          onRefresh: (self) => {
            applyVeil(self.progress >= 0.52 && self.progress <= 0.84)
          },
        },
      })

      tl.fromTo(stage, { z: 0 }, { z: 520, duration: 1 }, 0)

      if (grid) {
        tl.to(grid, { scale: 1.18, opacity: 0.35, duration: 0.22 }, 0.02)
      }

      if (hero) {
        tl.to(hero, { autoAlpha: 0, z: 140, duration: 0.16 }, 0.08)
      }

      if (gaming) {
        tl.to(
          gaming,
          { xPercent: 8, z: -220, rotateY: -16, autoAlpha: 1, duration: 0.16 },
          0.12,
        )
        tl.to(gaming, { z: 180, autoAlpha: 0, duration: 0.12 }, 0.36)
      }
      if (gamingType) {
        tl.to(gamingType, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.22)
        tl.call(() => armDecrypt(gamingType, decryptArmed), undefined, 0.24)
      }

      if (cinema) {
        tl.to(
          cinema,
          { z: -420, scale: 0.86, autoAlpha: 1, duration: 0.16 },
          0.28,
        )
        tl.to(cinema, { z: 220, autoAlpha: 0, duration: 0.12 }, 0.5)
      }
      if (cinemaType) {
        tl.to(cinemaType, { autoAlpha: 1, duration: 0.08 }, 0.4)
        tl.call(() => armDecrypt(cinemaType, decryptArmed), undefined, 0.42)
      }

      if (karaoke) {
        tl.to(
          karaoke,
          { xPercent: -6, rotateY: 22, z: -300, autoAlpha: 1, duration: 0.16 },
          0.42,
        )
        tl.to(karaoke, { rotateY: -28, z: 160, autoAlpha: 0, duration: 0.12 }, 0.64)
      }
      if (karaokeType) {
        tl.to(karaokeType, { autoAlpha: 1, duration: 0.08 }, 0.54)
        tl.call(() => armDecrypt(karaokeType, decryptArmed), undefined, 0.56)
      }

      if (lodge) {
        tl.to(
          lodge,
          { z: -520, yPercent: 8, rotateY: -8, autoAlpha: 1, duration: 0.16 },
          0.56,
        )
        tl.to(lodge, { z: 200, autoAlpha: 0, duration: 0.12 }, 0.78)
      }
      if (lodgeType) {
        tl.to(lodgeType, { autoAlpha: 1, filter: 'blur(0px)', duration: 0.1 }, 0.7)
      }

      if (bar) {
        tl.to(
          bar,
          { xPercent: -4, rotateY: 12, z: -360, autoAlpha: 1, duration: 0.16 },
          0.7,
        )
      }
      if (kitchen) {
        tl.to(
          kitchen,
          { xPercent: 4, rotateY: -12, z: -360, autoAlpha: 1, duration: 0.16 },
          0.72,
        )
      }
      if (barType) {
        tl.to(barType, { autoAlpha: 1, duration: 0.08 }, 0.82)
        tl.call(() => armDecrypt(barType, decryptArmed), undefined, 0.84)
      }
      if (kitchenType) {
        tl.to(kitchenType, { autoAlpha: 1, duration: 0.08 }, 0.86)
        tl.call(() => armDecrypt(kitchenType, decryptArmed), undefined, 0.88)
      }
      if (bar && kitchen) {
        tl.to(bar, { xPercent: -8, z: -40, autoAlpha: 0.35, duration: 0.1 }, 0.9)
        tl.to(kitchen, { xPercent: 8, z: -40, autoAlpha: 0.35, duration: 0.1 }, 0.9)
      }

      if (stamp) {
        tl.to(stamp, { z: -160, scale: 0.92, autoAlpha: 1, duration: 0.14 }, 0.86)
        tl.to(stamp, { z: 40, scale: 1.08, duration: 0.1 }, 0.96)
      }
      if (stampType) {
        tl.to(stampType, { autoAlpha: 1, duration: 0.08 }, 0.94)
      }

      return () => applyVeil(false)
    },
    { scope, dependencies: [] },
  )
}
