import { useEffect, useState, type RefObject } from 'react'
import { gsap, useGSAP } from '@/site/lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/media'
import { violet } from '../../lib/palette'
import { applyVignette, VIGNETTE_FROM, VIGNETTE_TO, type Vignette } from './vignette'

/** Glyph rise. Molten starts when this ends. */
export const REVEAL_S = 0.7
export const BLUR_PX = 5.5

const FADE_S = 0.55
const DIVE_S = 0.9
const DIVE_SCALE = 22
const CRISP_S = 0.7

/** Molten beat — after PRIME settles, before the dive. */
const MOLTEN_IN_S = 0.45
const MOLTEN_HOLD_S = 0.6
const MOLTEN_OUT_S = 0.35

/** Colder violet — blue-shifted from the screen caption’s warmer lilac. */
export const MOLTEN_VIOLET = {
  color1: violet.void,
  color2: violet.accent,
  color3: violet.glint,
  speed: 0.42,
} as const

/** MaskedHeading measures SVG glyphs from DOM boxes — wrong until Bebas is live. */
async function waitForDisplayFont() {
  if (typeof document === 'undefined' || !document.fonts) return
  try {
    await document.fonts.load('400 120px "Bebas Neue"')
    await document.fonts.ready
  } catch {
    /* proceed with whatever is available */
  }
}

function afterPaint(cb: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb)
  })
}

/** Everything the intro tweens that is not a CSS prop on a real node. */
type Look = Vignette & { molten: number; scale: number; blur: number }

/** Scale origin for the dive — center of the I in PRIME, not the whole word. */
function diveCenter(glyph: SVGTextElement): { x: number; y: number } {
  try {
    const i = (glyph.textContent ?? '').indexOf('I')
    if (i >= 0) {
      const box = glyph.getExtentOfChar(i)
      if (box.width || box.height) {
        return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
      }
    }
    const box = glyph.getBBox()
    if (box.width && box.height) {
      return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
    }
  } catch {
    /* fall through */
  }
  const svg = glyph.ownerSVGElement
  return { x: (svg?.clientWidth ?? 0) / 2, y: (svg?.clientHeight ?? 0) / 2 }
}

export function useHeroIntro({
  rootRef,
  brandRef,
  vignetteRef,
  moltenRef,
}: {
  rootRef: RefObject<HTMLElement | null>
  brandRef: RefObject<HTMLDivElement | null>
  vignetteRef: RefObject<HTMLDivElement | null>
  moltenRef: RefObject<HTMLDivElement | null>
}) {
  const reduced = usePrefersReducedMotion()
  /** Don't mount MaskedHeading until display font is live — avoids glyph teleport. */
  const [fontReady, setFontReady] = useState(reduced)
  const [copyReady, setCopyReady] = useState(reduced)
  /** Mount MoltenMetal only for the mid-hold beat — not during initial load. */
  const [moltenLive, setMoltenLive] = useState(false)

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    void waitForDisplayFont().then(() => {
      if (!cancelled) setFontReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [reduced])

  useGSAP(
    () => {
      if (reduced || !fontReady) return
      const root = rootRef.current
      const brand = brandRef.current
      if (!root || !brand) return

      let cancelled = false
      let targets: SVGTextElement[] = []

      const video = root.querySelector('video')
      root.style.setProperty('--cs-hero-blur', `${BLUR_PX}px`)
      // Stay invisible through MaskedHeading's first measure/sync frames.
      gsap.set(brand, { autoAlpha: 0 })

      const look: Look = { molten: 0, scale: 1, blur: BLUR_PX, ...VIGNETTE_FROM }

      const paint = (tl: gsap.core.Timeline, glyphs: SVGTextElement[], origin: { x: number; y: number }) => {
        root.style.setProperty('--cs-hero-blur', `${look.blur}px`)
        const vig = vignetteRef.current
        if (vig) applyVignette(vig, look)

        // MaskedHeading owns glyph y until the dive. Writing the attribute earlier cancels the rise.
        if (tl.time() >= tl.labels.dive) {
          const t = `translate(${origin.x} ${origin.y}) scale(${look.scale}) translate(${-origin.x} ${-origin.y})`
          for (const node of glyphs) node.setAttribute('transform', t)
        }

        const moltenEl = moltenRef.current
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

      const start = () => {
        if (cancelled) return
        targets = gsap.utils.toArray<SVGTextElement>(
          root.querySelectorAll('[data-mh-glyphs] text'),
        )
        if (!targets.length) {
          afterPaint(start)
          return
        }

        // One more paint so sync() has written final glyph boxes, then the intro clock starts.
        afterPaint(() => {
          if (cancelled) return
          const origin = diveCenter(targets[0])
          const tl = gsap.timeline({ onUpdate: () => paint(tl, targets, origin) })

          tl.addLabel('fade', 0)
          tl.to(brand, { autoAlpha: 1, duration: FADE_S, ease: 'power2.out' }, 'fade')

          tl.addLabel('molten', REVEAL_S)
          tl.to(
            look,
            {
              molten: 1,
              duration: MOLTEN_IN_S,
              ease: 'power2.out',
              onStart: () => {
                if (cancelled) return
                if (tl.time() >= tl.labels.dive + MOLTEN_OUT_S) return
                setMoltenLive(true)
              },
            },
            'molten',
          )

          // Hold is the gap after molten-in.
          tl.addLabel('dive', `+=${MOLTEN_HOLD_S}`)
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
                if (!cancelled) setMoltenLive(false)
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
                const vig = vignetteRef.current
                if (vig) applyVignette(vig, VIGNETTE_TO)
                if (!cancelled) setCopyReady(true)
              },
            },
            'release',
          )
        })
      }

      let kicked = false
      let videoWait = 0
      const kick = () => {
        if (cancelled || kicked) return
        kicked = true
        window.clearTimeout(videoWait)
        afterPaint(start)
      }

      if (video && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.addEventListener('loadeddata', kick, { once: true })
        video.addEventListener('error', kick, { once: true })
        /* Chrome Android often never fires loadeddata while preload is still
           metadata and the reel is racing the stills. Don't wait on that frame. */
        videoWait = window.setTimeout(kick, 480)
        video.play()?.catch(() => {})
      } else {
        kick()
      }

      return () => {
        cancelled = true
        window.clearTimeout(videoWait)
        video?.removeEventListener('loadeddata', kick)
        video?.removeEventListener('error', kick)
        setMoltenLive(false)
      }
    },
    { scope: rootRef, dependencies: [reduced, fontReady] },
  )

  return { reduced, fontReady, copyReady, moltenLive }
}
