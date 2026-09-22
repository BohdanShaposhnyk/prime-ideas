import { useEffect, useRef, useState, type CSSProperties } from 'react'
import MaskedHeading from '@/shared/bits/MaskedHeading'
import SpecularButton from '@/shared/bits/SpecularButton'
import SplitText from '@/shared/bits/SplitText'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import nightReel from '@/assets/8128213-hd_1920_1080_25fps.mp4'
import { BOOKING_URL } from '../booking'

const FADE_S = 0.85
const REVEAL_S = 1.1
const HOLD_S = 0.8
const DIVE_S = 1.6
const DIVE_SCALE = 22
const CRISP_S = 1.5
const BLUR_PX = 5.5

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

type Vignette = { edge: number; band: number; edgeB: number; bandB: number }

/** Perimeter open, nothing tinted — the frame before the fade drifts in. */
const VIGNETTE_FROM: Vignette = { edge: 0, band: 0, edgeB: 0, bandB: 0 }

/** Settled frame — sides/top hold; bottom runs 1.5× deeper and denser. */
const VIGNETTE_TO: Vignette = { edge: 0.97, band: 46, edgeB: 1, bandB: 69 }

const vignetteVars = (v: Vignette): CSSProperties =>
  ({
    '--v-edge': String(v.edge),
    '--v-band': `${v.band}%`,
    '--v-edge-b': String(v.edgeB),
    '--v-band-b': `${v.bandB}%`,
  }) as CSSProperties

const applyVignette = (el: HTMLElement, v: Vignette) => {
  el.style.setProperty('--v-edge', String(v.edge))
  el.style.setProperty('--v-band', `${v.band}%`)
  el.style.setProperty('--v-edge-b', String(v.edgeB))
  el.style.setProperty('--v-band-b', `${v.bandB}%`)
}

/**
 * Front-loaded ramp: most of the black lands in the outer third, then the tail
 * runs long and thin so a wide band never tints the middle of the frame.
 */
const sideFade = (to: string, reach: string, edgeVar = 'var(--v-edge)') =>
  [
    `linear-gradient(to ${to}`,
    `rgb(0 0 0 / ${edgeVar}) 0%`,
    `rgb(0 0 0 / calc(${edgeVar} * 0.8)) calc(${reach} * 0.22)`,
    `rgb(0 0 0 / calc(${edgeVar} * 0.35)) calc(${reach} * 0.55)`,
    `rgb(0 0 0 / calc(${edgeVar} * 0.1)) calc(${reach} * 0.78)`,
    `transparent ${reach})`,
  ].join(', ')

/** Heavier bottom ramp — black holds longer before easing out. */
const bottomFade = (reach: string) =>
  [
    'linear-gradient(to top',
    'rgb(0 0 0 / var(--v-edge-b)) 0%',
    `rgb(0 0 0 / calc(var(--v-edge-b) * 0.92)) calc(${reach} * 0.28)`,
    `rgb(0 0 0 / calc(var(--v-edge-b) * 0.55)) calc(${reach} * 0.58)`,
    `rgb(0 0 0 / calc(var(--v-edge-b) * 0.22)) calc(${reach} * 0.84)`,
    `transparent ${reach})`,
  ].join(', ')

/** Four straight fades frame the video; where they meet, the corners round themselves off. */
const VIGNETTE_BG = [
  sideFade('right', 'min(var(--v-band), var(--v-cap-x))'),
  sideFade('left', 'min(var(--v-band), var(--v-cap-x))'),
  sideFade('bottom', 'min(var(--v-band), var(--v-cap-y))'),
  bottomFade('min(var(--v-band-b), var(--v-cap-b))'),
].join(', ')

/** A portrait frame is narrow, so the desktop reach would swallow the subject. */
const HERO_CSS = `
  [data-hero-vignette] {
    --v-cap-x: 100%;
    --v-cap-y: 100%;
    --v-cap-b: 100%;
  }
  [data-hero-blur] [data-mh-media] { filter: blur(var(--cs-hero-blur)) !important; }
  @media (max-width: 640px) {
    [data-hero-vignette] {
      --v-cap-x: 96px;
      --v-cap-y: 210px;
      --v-cap-b: 315px;
    }
  }
`

export default function HeroV2() {
  const rootRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
  /** Don't mount MaskedHeading until display font is live — avoids glyph teleport. */
  const [fontReady, setFontReady] = useState(reduced)
  const [copyReady, setCopyReady] = useState(reduced)

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
      let releaseTimer = 0
      let settleTween: gsap.core.Tween | null = null
      let fadeTween: gsap.core.Tween | null = null

      const video = root.querySelector('video')
      root.style.setProperty('--cs-hero-blur', `${BLUR_PX}px`)
      // Stay invisible through MaskedHeading's first measure/sync frames.
      gsap.set(brand, { autoAlpha: 0 })

      const revealBrand = () => {
        if (cancelled) return
        fadeTween = gsap.to(brand, {
          autoAlpha: 1,
          duration: FADE_S,
          ease: 'power2.out',
        })
      }

      const start = () => {
        if (cancelled) return
        const targets = gsap.utils.toArray<SVGTextElement>(
          root.querySelectorAll('[data-mh-glyphs] text'),
        )
        if (!targets.length) {
          afterPaint(start)
          return
        }

        // One more paint so sync() has written final glyph boxes, then fade.
        afterPaint(() => {
          if (cancelled) return
          revealBrand()
        })

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
              if (!cancelled) setCopyReady(true)
            },
          })
        }, (REVEAL_S + HOLD_S + DIVE_S) * 1000)
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
        window.clearTimeout(releaseTimer)
        fadeTween?.kill()
        settleTween?.kill()
        video?.removeEventListener('loadeddata', kick)
      }
    },
    { scope: rootRef, dependencies: [reduced, fontReady] },
  )

  if (reduced) {
    return (
      <ReducedHeroVideo />
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
      <div ref={brandRef} className="h-full invisible opacity-0">
        {fontReady ? (
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
            lineHeight={0.82}
            className="flex h-full items-center justify-center font-[family-name:var(--cs-display)] uppercase"
          />
        ) : null}
      </div>
      <div
        ref={vignetteRef}
        data-hero-vignette=""
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ ...vignetteVars(VIGNETTE_FROM), background: VIGNETTE_BG }}
      />
      {copyReady ? <HeroCopy /> : null}
    </section>
  )
}

function ReducedHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let inView = true
    let tabVisible = document.visibilityState !== 'hidden'

    const sync = () => {
      if (inView && tabVisible) void video.play().catch(() => {})
      else video.pause()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting)
        sync()
      },
      { threshold: 0 },
    )
    io.observe(section)

    const onVisibility = () => {
      tabVisible = document.visibilityState !== 'hidden'
      sync()
    }
    document.addEventListener('visibilitychange', onVisibility)
    sync()

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="PRIME"
      data-scroll="split-hold"
      data-scene="hero"
      className="relative h-dvh overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={nightReel}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <style>{HERO_CSS}</style>
      <div
        data-hero-vignette=""
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ ...vignetteVars(VIGNETTE_TO), background: VIGNETTE_BG }}
      />
      <HeroCopy />
    </section>
  )
}

function HeroCopy() {
  const ctaRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useGSAP(
    () => {
      const cta = ctaRef.current
      if (!cta || reduced) return
      gsap.fromTo(
        cta,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.35, ease: 'power3.out' },
      )
    },
    { scope: ctaRef, dependencies: [reduced] },
  )

  return (
    <div className="pointer-events-none absolute top-3/4 left-1/2 z-20 flex w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4 text-center">
      <SplitText
        text="enter your prime"
        splitType="words"
        tag="p"
        textAlign="center"
        delay={90}
        duration={0.85}
        ease="power3.out"
        from={{ opacity: 0, y: 36 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0}
        rootMargin="0px"
        className="font-[family-name:var(--cs-display)] text-[clamp(2.4rem,9vw,5.4rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-white uppercase [&_.split-word:last-child]:!text-[#CFB53B]"
      />
      <div
        ref={ctaRef}
        className={`pointer-events-auto mt-6 sm:mt-8 ${reduced ? '' : 'opacity-0'}`}
      >
        <SpecularButton
          size="md"
          radius={999}
          tint="#ffffff"
          tintOpacity={0.06}
          blur={10}
          textColor="#F4F7FF"
          lineColor="#CFB53B"
          baseColor="#3a3420"
          intensity={1.15}
          autoAnimate
          className="font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-medium tracking-[var(--cs-track-micro)] uppercase sm:text-[0.78rem]"
          onClick={() => {
            window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
          }}
        >
          book a night
        </SpecularButton>
      </div>
    </div>
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
