import { useEffect, useRef, useState, type RefObject } from 'react'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { usePrefersReducedMotion } from '../../hooks/media'
import { violet } from '../../lib/palette'
import { applyVignette, VIGNETTE_FROM, VIGNETTE_TO, type Vignette } from './vignette'

export const REVEAL_S = 1.1
export const BLUR_PX = 5.5

const FADE_S = 0.85
const DIVE_S = 1.6
const DIVE_SCALE = 22
const CRISP_S = 1.5

/** Molten beat — after PRIME settles, before the dive. */
const MOLTEN_IN_S = 0.75
const MOLTEN_HOLD_S = 2
const MOLTEN_OUT_S = 0.5

/** Scroll during the dive adds time instead of moving the page.
 * After the dive, wait out the gesture so snap cannot fling to the next scene. */
const BOOST_QUIET_MS = 280
const BOOST_FAILSAFE_MS = 12_000
/** About one deliberate flick of this many pixels finishes the time still left. */
const BOOST_PX = 320
/** A single wheel spike cannot skip the dive in one frame. */
const BOOST_MAX_STEP_S = 0.35
const BOOST_MIN_PX = 4

/** Colder violet — blue-shifted from the screen caption’s warmer lilac. */
export const MOLTEN_VIOLET = {
  color1: violet.void,
  color2: violet.accent,
  color3: violet.glint,
  speed: 0.42,
} as const

function wheelPixels(event: WheelEvent): number {
  if (event.deltaMode === 1) return event.deltaY * 16
  if (event.deltaMode === 2) return event.deltaY * window.innerHeight
  return event.deltaY
}

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
  /** Intro playhead. Scroll boost seeks forward, clamped to `labels.release`. */
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

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
      let diveDone = false
      let opening = false
      let armed = false
      let pinning = false
      let lastInput = 0
      let quietTimer = 0
      let armTimer = 0
      let failsafe = 0
      let touchY = 0
      let riseSettled = false
      let targets: SVGTextElement[] = []

      const port = root.closest<HTMLElement>('[data-cs-scroll]')
      const lockEl = port ?? document.documentElement
      const scrollTarget: EventTarget = port ?? window

      const scrollPos = () => (port ? port.scrollTop : window.scrollY)

      const scrollToTop = () => {
        if (port) port.scrollTo(0, 0)
        else window.scrollTo(0, 0)
      }

      const detach = () => {
        window.clearTimeout(quietTimer)
        window.clearTimeout(armTimer)
        window.clearTimeout(failsafe)
        scrollTarget.removeEventListener('scroll', onScrollPin)
        window.removeEventListener('wheel', onWheel, { capture: true })
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        lockEl.classList.remove('cs-hero-lock')
        lockEl.classList.remove('cs-snap-pause')
      }

      const scheduleArm = () => {
        window.clearTimeout(armTimer)
        armTimer = window.setTimeout(arm, BOOST_QUIET_MS)
      }

      /** Snap comes back only after the page has sat still at the hero. */
      const arm = () => {
        if (armed || cancelled) return
        if (scrollPos() !== 0) {
          scrollToTop()
          scheduleArm()
          return
        }
        if (lockEl.classList.contains('cs-hero-lock') || lockEl.classList.contains('cs-snap-pause')) {
          lockEl.classList.remove('cs-hero-lock')
          lockEl.classList.remove('cs-snap-pause')
          scheduleArm()
          return
        }
        armed = true
        detach()
      }

      const beginUnlock = () => {
        if (armed || cancelled || !diveDone) return
        opening = true
        scrollToTop()
        lockEl.classList.remove('cs-hero-lock')
        lockEl.classList.add('cs-snap-pause')
        scheduleArm()
      }

      const onScrollPin = () => {
        if (armed || pinning || scrollPos() === 0) return
        pinning = true
        scrollToTop()
        pinning = false
        if (opening) scheduleArm()
      }

      const noteInput = () => {
        lastInput = performance.now()
        if (!diveDone) return
        opening = false
        lockEl.classList.add('cs-hero-lock')
        lockEl.classList.remove('cs-snap-pause')
        window.clearTimeout(armTimer)
        window.clearTimeout(quietTimer)
        quietTimer = window.setTimeout(beginUnlock, BOOST_QUIET_MS)
      }

      const onDiveDone = () => {
        if (diveDone || cancelled) return
        diveDone = true
        const idle = lastInput === 0 ? Number.POSITIVE_INFINITY : performance.now() - lastInput
        if (idle >= BOOST_QUIET_MS) beginUnlock()
        else {
          window.clearTimeout(quietTimer)
          quietTimer = window.setTimeout(beginUnlock, BOOST_QUIET_MS)
        }
      }

      const settleRise = () => {
        if (riseSettled || !targets.length) return
        riseSettled = true
        gsap.killTweensOf(targets)
        gsap.set(targets, { y: 0 })
      }

      const boost = (pixels: number) => {
        const tl = timelineRef.current
        if (!tl || typeof tl.labels.release !== 'number') return
        const releaseAt = tl.labels.release
        if (tl.time() >= releaseAt) return
        settleRise()
        const remaining = releaseAt - tl.time()
        const seconds = Math.min(BOOST_MAX_STEP_S, remaining * (pixels / BOOST_PX))
        if (seconds <= 0) return
        tl.time(Math.min(releaseAt, tl.time() + seconds))
      }

      const onWheel = (event: WheelEvent) => {
        if (armed || event.ctrlKey || event.metaKey) return
        event.preventDefault()
        const pixels = wheelPixels(event)
        noteInput()
        if (!diveDone && pixels > BOOST_MIN_PX) boost(pixels)
      }

      const onTouchStart = (event: TouchEvent) => {
        touchY = event.touches[0]?.clientY ?? touchY
      }

      const onTouchMove = (event: TouchEvent) => {
        if (armed) return
        const y = event.touches[0]?.clientY
        if (y == null) return
        const dy = touchY - y
        touchY = y
        event.preventDefault()
        if (dy !== 0) noteInput()
        if (!diveDone && dy > BOOST_MIN_PX) boost(dy)
      }

      lockEl.classList.add('cs-hero-lock')
      if (scrollPos() !== 0) scrollToTop()
      scrollTarget.addEventListener('scroll', onScrollPin, { passive: true })
      window.addEventListener('wheel', onWheel, { passive: false, capture: true })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      failsafe = window.setTimeout(() => {
        onDiveDone()
        beginUnlock()
      }, BOOST_FAILSAFE_MS)

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
          timelineRef.current = tl

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
                // A seek that has already left the molten window must not boot WebGL.
                if (tl.time() >= tl.labels.dive + MOLTEN_OUT_S) return
                setMoltenLive(true)
              },
            },
            'molten',
          )

          // Hold is the gap after molten-in. Dive lines up with the old DIVE_AT.
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

          // End of the dive. Scroll boost clamps here; the page stays on the hero.
          tl.addLabel('release', `dive+=${DIVE_S}`)
          tl.call(() => {
            releaseClip()
            onDiveDone()
          }, undefined, 'release')
          tl.to(
            look,
            {
              blur: 0,
              ...VIGNETTE_TO,
              duration: CRISP_S,
              ease: 'power2.out',
              onComplete: () => {
                root.style.setProperty('--cs-hero-blur', '0px')
                const vig = vignetteRef.current
                if (vig) applyVignette(vig, VIGNETTE_TO)
                if (!cancelled) setCopyReady(true)
              },
            },
            'release',
          )
        })
      }

      const kick = () => {
        if (cancelled) return
        afterPaint(start)
      }

      if (video && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.addEventListener('loadeddata', kick, { once: true })
      } else {
        kick()
      }

      return () => {
        cancelled = true
        armed = true
        detach()
        timelineRef.current = null
        video?.removeEventListener('loadeddata', kick)
        setMoltenLive(false)
      }
    },
    { scope: rootRef, dependencies: [reduced, fontReady] },
  )

  return { reduced, fontReady, copyReady, moltenLive }
}
