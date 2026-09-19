import type { RefObject } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

const SHARD_ORIGIN: Record<string, string> = {
  vertical: '88% 50%',
  horizontal: '50% 88%',
  stagger: '82% 36%',
  diagonal: '92% 62%',
  letterbox: '50% 60%',
  heal: '96% 50%',
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function decryptEl(el: HTMLElement) {
  const original = (el.dataset.original ?? el.textContent ?? '').trim()
  el.dataset.original = original
  const proxy = { t: 0 }

  return gsap.fromTo(
    proxy,
    { t: 0 },
    {
      t: 1,
      duration: 0.95,
      ease: 'none',
      onUpdate: () => {
        if (proxy.t > 0.74) {
          el.textContent = original
          return
        }
        el.textContent = Array.from(original)
          .map((ch, i) => {
            if (ch === ' ' || i / Math.max(original.length, 1) < proxy.t * 1.25) {
              return ch
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? ch
          })
          .join('')
      },
      onComplete: () => {
        el.textContent = original
      },
    },
  )
}

/**
 * Live Offset motion — dim holds, bright shard zooms, belts run the seam,
 * type reconstitutes across the cut.
 */
export function useCandidateMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const root = scope.current
      if (!root) return

      const marqueeTweens: gsap.core.Tween[] = []

      root.querySelectorAll<HTMLElement>('[data-belt-track]').forEach((track) => {
        const vertical =
          getComputedStyle(track).writingMode.startsWith('vertical')
        const tween = gsap.to(track, {
          xPercent: vertical ? 0 : -50,
          yPercent: vertical ? -50 : 0,
          duration: vertical ? 26 : 22,
          ease: 'none',
          repeat: -1,
          force3D: true,
        })
        marqueeTweens.push(tween)
      })

      ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            0.45,
            3.4,
            1 + Math.abs(self.getVelocity()) / 2200,
          )
          marqueeTweens.forEach((tween) => tween.timeScale(boost))
        },
      })

      root.querySelectorAll<HTMLElement>('[data-split-beat]').forEach((section) => {
        const stage = section.querySelector<HTMLElement>('[data-split="stage"]')
        const cut = stage?.dataset.cut ?? 'vertical'
        const origin = SHARD_ORIGIN[cut] ?? '80% 50%'

        const shards = section.querySelectorAll<HTMLElement>('[data-zoom="shard"]')
        const fields = section.querySelectorAll<HTMLElement>('[data-zoom="field"]')

        shards.forEach((shard) => {
          gsap.set(shard, { transformOrigin: origin, force3D: true })
          gsap.fromTo(
            shard,
            { scale: 1 },
            {
              scale: 1.22,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.65,
              },
            },
          )
        })

        fields.forEach((field) => {
          gsap.set(field, { transformOrigin: '20% 80%', force3D: true })
          gsap.fromTo(
            field,
            { scale: 1, yPercent: 0 },
            {
              scale: 1.05,
              yPercent: -5,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.9,
              },
            },
          )
        })

        const lockups = section.querySelectorAll<HTMLElement>(
          '[data-type="split-chars"]',
        )
        const decrypts = section.querySelectorAll<HTMLElement>(
          '[data-type="decrypt"]',
        )
        const phrases = section.querySelectorAll<HTMLElement>(
          '[data-type="phrase"]',
        )

        const tl = gsap.timeline({
          defaults: { ease: 'power4.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            once: true,
          },
        })

        lockups.forEach((lockup) => {
          const chars = lockup.querySelectorAll<HTMLElement>('[data-char]')
          const mid = (chars.length - 1) / 2
          chars.forEach((ch, i) => {
            const dir = i <= mid ? -1 : 1
            gsap.set(ch, {
              x: dir * 56,
              yPercent: 78,
              opacity: 0,
              force3D: true,
            })
          })
          tl.to(
            chars,
            {
              x: 0,
              yPercent: 0,
              opacity: 1,
              duration: 0.88,
              stagger: { each: 0.045, from: 'center' },
            },
            0,
          )
        })

        if (phrases.length) {
          tl.fromTo(
            phrases,
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' },
            0.28,
          )
        }

        decrypts.forEach((el, i) => {
          tl.call(() => {
            decryptEl(el)
          }, [], 0.22 + i * 0.08)
        })
      })

      ScrollTrigger.refresh()
    },
    { scope, dependencies: [] },
  )
}
