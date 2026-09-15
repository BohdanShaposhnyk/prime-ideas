import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

type ClipPair = {
  mediaFrom: string
  mediaTo: string
  captionFrom: string
  captionTo: string
  captionX?: number
  captionY?: number
}

/** Resting section clips = Layout grammar; GSAP shears closed → settled. */
const DIAGONAL_CLIPS: Record<string, ClipPair> = {
  kitchen: {
    mediaFrom: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    mediaTo: 'polygon(0 0, 100% 0, 58% 100%, 0 100%)',
    captionFrom: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
    captionTo: 'polygon(100% 0, 100% 100%, 58% 100%, 72% 0)',
    captionX: 48,
  },
  arena: {
    mediaFrom: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    mediaTo: 'polygon(42% 0, 100% 0, 100% 100%, 28% 100%)',
    captionFrom: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    captionTo: 'polygon(0 0, 42% 0, 28% 100%, 0 100%)',
    captionX: -56,
  },
  stage: {
    mediaFrom: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    mediaTo: 'polygon(0 0, 100% 0, 100% 72%, 0 100%)',
    captionFrom: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
    captionTo: 'polygon(0 100%, 100% 72%, 100% 100%)',
    captionY: 64,
  },
  ember: {
    mediaFrom: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    mediaTo: 'polygon(0 22%, 100% 38%, 100% 100%, 0 100%)',
    captionFrom: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    captionTo: 'polygon(0 0, 100% 0, 100% 38%, 0 22%)',
    captionY: -40,
  },
}

/**
 * Lodge Depth motion — one camera zoom-out on a single room plane; copy swaps.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      // 1 — Single continuous zoom (window crop → full room); texts only crossfade
      const zoomStage = root.querySelector<HTMLElement>('[data-scroll="z-zoom"]')
      const zoomTarget = zoomStage?.querySelector<HTMLElement>(
        '[data-plane="zoom-target"]',
      )
      const heroCopy = zoomStage?.querySelector<HTMLElement>('[data-copy="hero"]')
      const interiorCopy = zoomStage?.querySelector<HTMLElement>(
        '[data-copy="interior"]',
      )

      if (zoomStage && zoomTarget) {
        gsap.set(zoomTarget, {
          transformOrigin: '64% 33%',
          scale: 2.55,
          force3D: true,
        })
        if (interiorCopy) gsap.set(interiorCopy, { autoAlpha: 0 })
        if (heroCopy) gsap.set(heroCopy, { autoAlpha: 1 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: zoomStage,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })

        tl.fromTo(
          zoomTarget,
          { scale: 2.55 },
          { scale: 1, ease: 'none', duration: 1, immediateRender: false },
          0,
        )

        if (heroCopy) {
          tl.to(
            heroCopy,
            { autoAlpha: 0, ease: 'none', duration: 0.22 },
            0.42,
          )
        }
        if (interiorCopy) {
          tl.to(
            interiorCopy,
            { autoAlpha: 1, ease: 'none', duration: 0.24 },
            0.58,
          )
        }
      }

      // 2 — Diagonal clip-path shifts + caption seam-migration
      const splits = root.querySelectorAll<HTMLElement>(
        '[data-scroll="diagonal-split"]',
      )
      splits.forEach((section) => {
        const scene = section.getAttribute('data-scene')
        if (!scene) return
        const clips = DIAGONAL_CLIPS[scene]
        if (!clips) return

        const media = section.querySelector<HTMLElement>('[data-pane="media"]')
        const captionPane = section.querySelector<HTMLElement>(
          '[data-pane="caption"], [data-pane="caption-residual"]',
        )
        const migrate = section.querySelector<HTMLElement>('[data-type="migrate"]')

        const splitTrigger = {
          trigger: section,
          start: 'top 75%',
          end: 'top 20%',
          scrub: true,
        } as const

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: clips.mediaFrom },
            {
              clipPath: clips.mediaTo,
              ease: 'none',
              scrollTrigger: { ...splitTrigger },
            },
          )
        }
        if (captionPane) {
          gsap.fromTo(
            captionPane,
            { clipPath: clips.captionFrom },
            {
              clipPath: clips.captionTo,
              ease: 'none',
              scrollTrigger: { ...splitTrigger },
            },
          )
        }
        if (migrate && (clips.captionX || clips.captionY)) {
          gsap.fromTo(
            migrate,
            {
              x: clips.captionX ?? 0,
              y: clips.captionY ?? 0,
            },
            {
              x: 0,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'top 15%',
                scrub: true,
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
