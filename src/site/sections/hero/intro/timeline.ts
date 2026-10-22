import type { RefObject } from 'react'
import { gsap } from '@/site/lib/gsap'
import { applyVignette, VIGNETTE_FROM, VIGNETTE_TO, type Vignette } from '../vignette'
import { BLUR_PX, CRISP_S, DIVE_S, DIVE_SCALE, FADE_S, MOLTEN_HOLD_S, MOLTEN_IN_S, MOLTEN_OUT_S } from './config'
import { afterPaint, diveCenter } from './dive'

/** Everything the intro tweens that is not a CSS prop on a real node. */
type Look = Vignette & { molten: number; scale: number; blur: number }

type IntroClock = {
  root: HTMLElement
  brand: HTMLDivElement
  vignetteRef: RefObject<HTMLDivElement | null>
  moltenRef: RefObject<HTMLDivElement | null>
  cancelled: () => boolean
  onMoltenDone: () => void
  onSettled: () => void
}

export function startHeroIntro(clock: IntroClock) {
  if (clock.cancelled()) return
  const { root, brand } = clock
  const targets = gsap.utils.toArray<SVGTextElement>(root.querySelectorAll('[data-mh-glyphs] text'))
  if (!targets.length) {
    afterPaint(() => startHeroIntro(clock))
    return
  }

  // One more paint so sync() has written final glyph boxes, then the intro clock starts.
  afterPaint(() => {
    if (clock.cancelled()) return
    const origin = diveCenter(targets[0])
    const look: Look = { molten: 0, scale: 1, blur: BLUR_PX, ...VIGNETTE_FROM }

    const paint = (tl: gsap.core.Timeline) => {
      root.style.setProperty('--cs-hero-blur', `${look.blur}px`)
      const vig = clock.vignetteRef.current
      if (vig) applyVignette(vig, look)

      // MaskedHeading owns glyph y until the dive. Writing the attribute earlier cancels the rise.
      if (tl.time() >= tl.labels.dive) {
        const t = `translate(${origin.x} ${origin.y}) scale(${look.scale}) translate(${-origin.x} ${-origin.y})`
        for (const node of targets) node.setAttribute('transform', t)
      }

      const moltenEl = clock.moltenRef.current
      if (moltenEl) {
        moltenEl.style.opacity = String(look.molten)
        moltenEl.style.visibility = look.molten > 0 ? 'visible' : 'hidden'
      }
    }

    const releaseClip = () => {
      const mediaClip = root.querySelector<HTMLElement>('[data-mh-clip]')
      const media = root.querySelector<HTMLElement>('[data-mh-media]')
      if (mediaClip) mediaClip.style.clipPath = 'none'
      if (media) {
        media.style.transform = 'none'
        media.style.filter = 'none'
        media.style.willChange = 'auto'
        media.dataset.mhSettled = '1'
      }
    }

    const tl = gsap.timeline({ onUpdate: () => paint(tl) })

    tl.addLabel('fade', 0)
    tl.to(brand, { autoAlpha: 1, duration: FADE_S, ease: 'power2.out' }, 'fade')

    tl.addLabel('molten', 0)
    tl.to(look, { molten: 1, duration: MOLTEN_IN_S, ease: 'power2.out' }, 'molten')

    // Gap after molten is fully in, measured from the molten label.
    tl.addLabel('dive', `molten+=${MOLTEN_IN_S + MOLTEN_HOLD_S}`)
    tl.call(() => {
      gsap.killTweensOf(targets)
      gsap.set(targets, { clearProps: 'transform' })
    }, undefined, 'dive')
    tl.to(
      look,
      {
        molten: 0,
        duration: MOLTEN_OUT_S,
        ease: 'power2.in',
        onComplete: () => {
          if (!clock.cancelled()) clock.onMoltenDone()
        },
      },
      'dive',
    )
    tl.to(look, { scale: DIVE_SCALE, duration: DIVE_S, ease: 'power3.in' }, 'dive')

    tl.addLabel('release', `dive+=${DIVE_S}`)
    tl.call(releaseClip, undefined, 'release')
    tl.to(
      look,
      {
        blur: 0,
        ...VIGNETTE_TO,
        duration: CRISP_S,
        ease: 'power2.out',
        onComplete: () => {
          root.style.setProperty('--cs-hero-blur', '0px')
          root.removeAttribute('data-hero-blur')
          const vig = clock.vignetteRef.current
          if (vig) applyVignette(vig, VIGNETTE_TO)
          if (!clock.cancelled()) clock.onSettled()
        },
      },
      'release',
    )
  })
}
