import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import {
  SEAM_FROM_VERTICAL_DEG,
  lineOffsetFromCenter,
  mapDualReveal,
  polyToClipPath,
  railBlockLayout,
  seamDir,
  seamPolygons,
} from './seam-geometry'

/**
 * Storm Seam motion — single pin continuum:
 * 1) Hero → lodge
 * 2) Seam rolls onto lodge (lodge|stage split)
 * 3) Dual rails hold → snap → hold: lodge→bar (BL), stage→gaming (TR)
 * 4) Curtains fly apart along seam → spiral behind
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const runway = root.querySelector<HTMLElement>('[data-scroll="storm-runway"]')
      const seamStage = root.querySelector<HTMLElement>('[data-scroll="seam-stage"]')
      const heroLayer = root.querySelector<HTMLElement>('[data-layer="hero"]')
      const seamLine = root.querySelector<HTMLElement>('[data-seam="line"]')
      const spiralUnder = root.querySelector<HTMLElement>('[data-spiral="under"]')

      const starsFar = heroLayer?.querySelector<HTMLElement>('[data-plane="stars-far"]')
      const starsNear = heroLayer?.querySelector<HTMLElement>('[data-plane="stars-near"]')
      const lightning = heroLayer?.querySelector<HTMLElement>('[data-plane="lightning"]')
      const haze = heroLayer?.querySelector<HTMLElement>('[data-plane="haze"]')
      const heroBrand = heroLayer?.querySelector<HTMLElement>('[data-type="brand"]')
      const heroHeadline = heroLayer?.querySelector<HTMLElement>('[data-type="headline"]')
      const heroSupport = heroLayer?.querySelector<HTMLElement>('[data-type="support"]')

      const lodge = root.querySelector<HTMLElement>('[data-scene="lodge"]')
      const lodgeTitle = lodge?.querySelector<HTMLElement>('[data-type="headline"]')
      const lodgeSupport = lodge?.querySelector<HTMLElement>('[data-type="support"]')
      const lodgeTiny = lodge?.querySelector<HTMLElement>('[data-type="tiny"]')

      let cleanupSeam: (() => void) | undefined

      if (runway && seamStage) {
        const applySeam = (open: number, reveal: number, fly: number, lineAlpha: number) => {
          const W = seamStage.clientWidth
          const H = seamStage.clientHeight
          if (W < 8 || H < 8) return

          const p = Math.min(1, Math.max(0, open))
          const { a, b } = seamPolygons(W, H, p, SEAM_FROM_VERTICAL_DEG)
          const offset = lineOffsetFromCenter(W, H, p, SEAM_FROM_VERTICAL_DEG)
          const d = seamDir(SEAM_FROM_VERTICAL_DEG)
          const { blockW, blockH, step } = railBlockLayout(W, H, SEAM_FROM_VERTICAL_DEG)

          seamStage.style.setProperty('--chain-dx', `${d.x * step}px`)
          seamStage.style.setProperty('--chain-dy', `${d.y * step}px`)
          seamStage.style.setProperty('--block-w', `${blockW}px`)
          seamStage.style.setProperty('--block-h', `${blockH}px`)

          seamStage.style.setProperty('--seam-clip-a', polyToClipPath(a))
          seamStage.style.setProperty('--seam-clip-b', polyToClipPath(b))
          seamStage.style.setProperty('--seam-tx', `${offset.x}px`)
          seamStage.style.setProperty('--seam-ty', `${offset.y}px`)

          const r = Math.min(1, Math.max(0, reveal))
          const f = Math.min(1, Math.max(0, fly))
          const travel = step * r + Math.hypot(W, H) * 1.45 * f

          seamStage.style.setProperty('--rail-a-x', `${-d.x * travel}px`)
          seamStage.style.setProperty('--rail-a-y', `${-d.y * travel}px`)
          seamStage.style.setProperty('--rail-b-x', `${d.x * travel}px`)
          seamStage.style.setProperty('--rail-b-y', `${d.y * travel}px`)

          if (seamLine) {
            gsap.set(seamLine, { autoAlpha: lineAlpha })
          }
        }

        // 0.00–0.15  hero → lodge
        // 0.15–0.34  hold full lodge
        // 0.34–0.46  seam rolls onto lodge
        // 0.46–0.78  dual: hold A → transit → hold B
        // 0.78–0.92  curtains fly apart → spiral fades in
        // 0.92–1.00  hold on spiral
        const mapProgress = (t: number) => {
          if (t < 0.15) {
            return {
              open: 0,
              reveal: 0,
              fly: 0,
              lineAlpha: Math.max(0, (t - 0.09) / 0.06),
            }
          }
          if (t < 0.34) {
            return {
              open: 0,
              reveal: 0,
              fly: 0,
              lineAlpha: Math.min(1, Math.max(0, (t - 0.28) / 0.06)),
            }
          }
          if (t < 0.46) {
            return {
              open: (t - 0.34) / 0.12,
              reveal: 0,
              fly: 0,
              lineAlpha: 1,
            }
          }
          if (t < 0.78) {
            return {
              open: 1,
              reveal: mapDualReveal((t - 0.46) / 0.32),
              fly: 0,
              lineAlpha: 1,
            }
          }
          if (t < 0.92) {
            const fly = (t - 0.78) / 0.14
            return {
              open: 1,
              reveal: 1,
              fly,
              lineAlpha: Math.max(0, 1 - fly * 1.25),
            }
          }
          return {
            open: 1,
            reveal: 1,
            fly: 1,
            lineAlpha: 0,
          }
        }

        applySeam(0, 0, 0, 0)

        if (heroLayer) {
          // Must use distance along the pin (`+=% of pin length`), not
          // `N% bottom` — on a tall runway that puts end before start and
          // freezes the hero over the entire seam sequence.
          const handoff = gsap.timeline({
            scrollTrigger: {
              trigger: runway,
              start: 'top top',
              end: () =>
                `+=${Math.max(1, (runway.offsetHeight - window.innerHeight) * 0.15)}`,
              scrub: 0.65,
              invalidateOnRefresh: true,
            },
          })

          if (starsFar) {
            handoff.fromTo(
              starsFar,
              { yPercent: 0, scale: 1 },
              { yPercent: -8, scale: 1.05, ease: 'none', duration: 1 },
              0,
            )
          }
          if (starsNear) {
            handoff.fromTo(
              starsNear,
              { yPercent: 0, scale: 1 },
              { yPercent: -18, scale: 1.12, ease: 'none', duration: 1 },
              0,
            )
          }
          if (lightning) {
            handoff.fromTo(
              lightning,
              { yPercent: 0, xPercent: 0 },
              { yPercent: -14, xPercent: 5, ease: 'none', duration: 1 },
              0,
            )
          }
          if (haze) {
            handoff.fromTo(
              haze,
              { yPercent: 0 },
              { yPercent: -22, ease: 'none', duration: 1 },
              0,
            )
          }
          if (heroBrand) {
            handoff.fromTo(
              heroBrand,
              { yPercent: 0, xPercent: 0, opacity: 1 },
              { yPercent: -28, xPercent: -5, opacity: 0, ease: 'none', duration: 0.7 },
              0.1,
            )
          }
          if (heroHeadline) {
            handoff.fromTo(
              heroHeadline,
              { y: 0, opacity: 1 },
              { y: 56, opacity: 0, ease: 'none', duration: 0.6 },
              0.15,
            )
          }
          if (heroSupport) {
            handoff.fromTo(
              heroSupport,
              { opacity: 1 },
              { opacity: 0, ease: 'none', duration: 0.45 },
              0.18,
            )
          }
          handoff.fromTo(
            heroLayer,
            { autoAlpha: 1, scale: 1, filter: 'blur(0px)' },
            {
              autoAlpha: 0,
              scale: 1.06,
              filter: 'blur(5px)',
              ease: 'none',
              duration: 0.75,
            },
            0.25,
          )
          if (lodgeTiny) {
            handoff.fromTo(
              lodgeTiny,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, ease: 'none', duration: 0.35 },
              0.55,
            )
          }
          if (lodgeTitle) {
            handoff.fromTo(
              lodgeTitle,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: 'none', duration: 0.4 },
              0.6,
            )
          }
          if (lodgeSupport) {
            handoff.fromTo(
              lodgeSupport,
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, ease: 'none', duration: 0.35 },
              0.7,
            )
          }
        }

        if (spiralUnder) {
          gsap.set(spiralUnder, { autoAlpha: 0, visibility: 'hidden' })
        }

        const onSeamUpdate = (t: number) => {
          const { open, reveal, fly, lineAlpha } = mapProgress(t)
          applySeam(open, reveal, fly, lineAlpha)
          if (spiralUnder) {
            const shown = Math.min(1, Math.max(0, fly))
            gsap.set(spiralUnder, {
              autoAlpha: shown,
              visibility: shown > 0.02 ? 'visible' : 'hidden',
            })
          }
        }

        ScrollTrigger.create({
          id: 'ss-storm',
          trigger: runway,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => onSeamUpdate(self.progress),
        })

        const onRefresh = () => {
          const st = ScrollTrigger.getById('ss-storm')
          onSeamUpdate(st?.progress ?? 0)
        }

        ScrollTrigger.addEventListener('refresh', onRefresh)
        window.addEventListener('resize', onRefresh)

        cleanupSeam = () => {
          ScrollTrigger.removeEventListener('refresh', onRefresh)
          window.removeEventListener('resize', onRefresh)
          ScrollTrigger.getById('ss-storm')?.kill()
        }
      }

      const spiralTitle = spiralUnder?.querySelector<HTMLElement>(
        '[data-type="headline"]',
      )
      const spiralTiny = spiralUnder?.querySelector<HTMLElement>('[data-type="tiny"]')

      if (runway && spiralTitle) {
        gsap.fromTo(
          spiralTitle,
          { y: 72, opacity: 0, rotate: -2.5 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: runway,
              start: '78% top',
              end: '92% top',
              scrub: true,
            },
          },
        )
      }
      if (runway && spiralTiny) {
        gsap.fromTo(
          spiralTiny,
          { x: 48, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: runway,
              start: '80% top',
              end: '91% top',
              scrub: true,
            },
          },
        )
      }

      const floorTrack = root.querySelector<HTMLElement>('[data-scroll="floor-track"]')
      const floorRail = root.querySelector<HTMLElement>('[data-floor="rail"]')
      const floorTitle = floorRail?.querySelector<HTMLElement>('[data-type="headline"]')
      const floorSupport = floorRail?.querySelector<HTMLElement>('[data-type="support"]')

      if (floorTrack && floorRail) {
        const shift = () => {
          const maxShift = Math.max(0, floorRail.scrollWidth - window.innerWidth)
          return -maxShift
        }

        gsap.fromTo(
          floorRail,
          { x: 0 },
          {
            x: shift,
            ease: 'none',
            scrollTrigger: {
              trigger: floorTrack,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.4,
              invalidateOnRefresh: true,
            },
          },
        )

        if (floorTitle) {
          gsap.fromTo(
            floorTitle,
            { x: 96, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: floorTrack,
                start: 'top 35%',
                end: 'top top',
                scrub: true,
              },
            },
          )
        }
        if (floorSupport) {
          gsap.fromTo(
            floorSupport,
            { x: 56, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: floorTrack,
                start: 'top 25%',
                end: 'top -5%',
                scrub: true,
              },
            },
          )
        }
      }

      ScrollTrigger.refresh()

      return () => {
        cleanupSeam?.()
      }
    },
    { scope, dependencies: [] },
  )
}
