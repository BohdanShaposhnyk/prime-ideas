import { useRef, type CSSProperties } from 'react'
import MaskedHeading from '@/shared/bits/MaskedHeading'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import nightReel from '@/assets/8128213-hd_1920_1080_25fps.mp4'

const REVEAL_S = 1.1
const HOLD_S = 0.8
const DIVE_S = 1.6
const DIVE_SCALE = 22
const CRISP_S = 1.5
const BLUR_PX = 10

type Vignette = { edge: number; band: number }

/** Perimeter open, nothing tinted — the frame before the fade drifts in. */
const VIGNETTE_FROM: Vignette = { edge: 0, band: 0 }

/** Settled frame — every edge sits near black, center stays clear. */
const VIGNETTE_TO: Vignette = { edge: 0.97, band: 46 }

const vignetteVars = (v: Vignette): CSSProperties =>
  ({
    '--v-edge': String(v.edge),
    '--v-band': `${v.band}%`,
  }) as CSSProperties

const applyVignette = (el: HTMLElement, v: Vignette) => {
  el.style.setProperty('--v-edge', String(v.edge))
  el.style.setProperty('--v-band', `${v.band}%`)
}

/**
 * Front-loaded ramp: most of the black lands in the outer third, then the tail
 * runs long and thin so a wide band never tints the middle of the frame.
 */
const sideFade = (to: string, reach: string) =>
  [
    `linear-gradient(to ${to}`,
    'rgb(0 0 0 / var(--v-edge)) 0%',
    `rgb(0 0 0 / calc(var(--v-edge) * 0.8)) calc(${reach} * 0.22)`,
    `rgb(0 0 0 / calc(var(--v-edge) * 0.35)) calc(${reach} * 0.55)`,
    `rgb(0 0 0 / calc(var(--v-edge) * 0.1)) calc(${reach} * 0.78)`,
    `transparent ${reach})`,
  ].join(', ')

/** Four straight fades frame the video; where they meet, the corners round themselves off. */
const VIGNETTE_BG = [
  sideFade('right', 'min(var(--v-band), var(--v-cap-x))'),
  sideFade('left', 'min(var(--v-band), var(--v-cap-x))'),
  sideFade('bottom', 'min(var(--v-band), var(--v-cap-y))'),
  sideFade('top', 'min(var(--v-band), var(--v-cap-y))'),
].join(', ')

/** A portrait frame is narrow, so the desktop reach would swallow the subject. */
const HERO_CSS = `
  [data-hero-vignette] { --v-cap-x: 100%; --v-cap-y: 100%; }
  [data-hero-blur] [data-mh-media] { filter: blur(var(--cs-hero-blur)) !important; }
  @media (max-width: 640px) {
    [data-hero-vignette] { --v-cap-x: 96px; --v-cap-y: 210px; }
  }
`

export default function HeroV2() {
  const rootRef = useRef<HTMLElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const root = rootRef.current
      if (!root) return

      let cancelled = false
      let releaseTimer = 0
      let settleTween: gsap.core.Tween | null = null

      const video = root.querySelector('video')
      root.style.setProperty('--cs-hero-blur', `${BLUR_PX}px`)

      const start = () => {
        if (cancelled) return
        const targets = gsap.utils.toArray<SVGTextElement>(
          root.querySelectorAll('[data-mh-glyphs] text'),
        )
        if (!targets.length) return

        const { x: cx, y: cy } = diveCenter(targets[0])
        gsap.killTweensOf(targets)
        gsap.set(targets, { clearProps: 'transform' })

        const proxy = { s: 1 }
        gsap.to(proxy, {
          s: DIVE_SCALE,
          duration: DIVE_S,
          delay: REVEAL_S + HOLD_S,
          ease: 'power3.in',
          onUpdate: () => {
            const t = `translate(${cx} ${cy}) scale(${proxy.s}) translate(${-cx} ${-cy})`
            for (const node of targets) node.setAttribute('transform', t)
          },
        })

        releaseTimer = window.setTimeout(() => {
          if (cancelled) return
          const mediaClip = root.querySelector<HTMLElement>('[data-mh-clip]')
          const media = root.querySelector<HTMLElement>('[data-mh-media]')
          if (mediaClip) mediaClip.style.clipPath = 'none'
          if (media) {
            media.style.transform = 'none'
            media.style.filter = 'none'
          }

          const vig = vignetteRef.current
          const state = { blur: BLUR_PX, ...VIGNETTE_FROM }

          settleTween = gsap.to(state, {
            blur: 0,
            ...VIGNETTE_TO,
            duration: CRISP_S,
            ease: 'power2.out',
            onUpdate: () => {
              root.style.setProperty('--cs-hero-blur', `${state.blur}px`)
              if (vig) applyVignette(vig, state)
            },
            onComplete: () => {
              root.style.setProperty('--cs-hero-blur', '0px')
              if (vig) applyVignette(vig, VIGNETTE_TO)
              settleTween = null
            },
          })
        }, (REVEAL_S + HOLD_S + DIVE_S) * 1000)
      }

      const kick = () => {
        if (cancelled) return
        void document.fonts?.ready.then(() => {
          if (!cancelled) requestAnimationFrame(start)
        })
      }

      if (video && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.addEventListener('loadeddata', kick, { once: true })
      } else {
        kick()
      }

      return () => {
        cancelled = true
        window.clearTimeout(releaseTimer)
        settleTween?.kill()
        video?.removeEventListener('loadeddata', kick)
      }
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  if (reduced) {
    return (
      <section
        aria-label="PRIME"
        data-scroll="split-hold"
        data-scene="hero"
        className="relative h-dvh overflow-hidden bg-black"
      >
        <video
          className="absolute inset-0 size-full object-cover"
          src={nightReel}
          autoPlay
          muted
          loop
          playsInline
        />
        <style>{HERO_CSS}</style>
        <div
          data-hero-vignette=""
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ ...vignetteVars(VIGNETTE_TO), background: VIGNETTE_BG }}
        />
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      aria-labelledby="cs-hero-v2-brand"
      data-scroll="split-hold"
      data-scene="hero"
      data-hero-blur=""
      className="relative isolate h-dvh overflow-hidden bg-black"
      style={{ '--cs-hero-blur': `${BLUR_PX}px` } as CSSProperties}
    >
      <style>{HERO_CSS}</style>
      <MaskedHeading
        id="cs-hero-v2-brand"
        text="PRIME"
        tag="h1"
        mediaType="video"
        src={nightReel}
        trigger="mount"
        reveal="rise"
        duration={REVEAL_S}
        fillScale={1.25}
        parallax={26}
        drift={18}
        textScale={0.26}
        align="center"
        weight={400}
        tracking={0.02}
        lineHeight={0.8}
        className="flex h-full items-center justify-center font-[family-name:var(--cs-display)] uppercase"
      />
      <div
        ref={vignetteRef}
        data-hero-vignette=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ ...vignetteVars(VIGNETTE_FROM), background: VIGNETTE_BG }}
      />
    </section>
  )
}

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
