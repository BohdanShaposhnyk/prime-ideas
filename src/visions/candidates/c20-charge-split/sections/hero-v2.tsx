import { useEffect, useRef, useState, type CSSProperties } from 'react'
import MaskedHeading from '@/shared/bits/MaskedHeading'
import MoltenMetal from '@/shared/bits/MoltenMetal'
import SpecularButton from '@/shared/bits/SpecularButton'
import SplitText from '@/shared/bits/SplitText'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import nightReel from '@/assets/c20/night-reel.mp4'
import primeLogo from '../assets/01_prime-logo.png'
import { BOOKING_URL } from '../booking'
import { isCoarsePointer } from '../coarse'
import { ctaClass, displayLeading, displayTracking, kickerClass, specularInk, supportClass } from '../palette'

const FADE_S = 0.85
const REVEAL_S = 1.1
const DIVE_S = 1.6
const DIVE_SCALE = 22
const CRISP_S = 1.5
const BLUR_PX = 5.5

/** Molten beat — after PRIME settles, before the dive. */
const MOLTEN_IN_S = 0.75
const MOLTEN_HOLD_S = 2
const MOLTEN_OUT_S = 0.5
const MOLTEN_MOUNT_AT = REVEAL_S
const DIVE_AT = MOLTEN_MOUNT_AT + MOLTEN_IN_S + MOLTEN_HOLD_S

/** Colder violet — blue-shifted from the screen caption’s warmer lilac. */
const MOLTEN_VIOLET = {
  color1: '#0E1228',
  color2: '#8E7CFF',
  color3: '#D5E0FF',
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
  const moltenRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()
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
      if (!moltenLive) return
      const el = moltenRef.current
      if (!el) return
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: MOLTEN_IN_S, ease: 'power2.out' },
      )
      return () => {
        gsap.killTweensOf(el)
      }
    },
    { dependencies: [moltenLive] },
  )

  useGSAP(
    () => {
      if (reduced || !fontReady) return
      const root = rootRef.current
      const brand = brandRef.current
      if (!root || !brand) return

      let cancelled = false
      let releaseTimer = 0
      let moltenMountTimer = 0
      let settleTween: gsap.core.Tween | null = null
      let fadeTween: gsap.core.Tween | null = null
      let moltenOutTween: gsap.core.Tween | null = null

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

      const fadeMoltenOut = () => {
        const el = moltenRef.current
        if (!el) {
          if (!cancelled) setMoltenLive(false)
          return
        }
        moltenOutTween = gsap.to(el, {
          autoAlpha: 0,
          duration: MOLTEN_OUT_S,
          ease: 'power2.in',
          onComplete: () => {
            moltenOutTween = null
            if (!cancelled) setMoltenLive(false)
          },
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

        // PRIME settled → mount molten (WebGL starts here, not on first paint).
        moltenMountTimer = window.setTimeout(() => {
          if (!cancelled) setMoltenLive(true)
        }, MOLTEN_MOUNT_AT * 1000)

        const { x: cx, y: cy } = diveCenter(targets[0])
        gsap.killTweensOf(targets)
        gsap.set(targets, { clearProps: 'transform' })

        const proxy = { s: 1 }
        gsap.to(proxy, {
          s: DIVE_SCALE,
          duration: DIVE_S,
          delay: DIVE_AT,
          ease: 'power3.in',
          onStart: () => {
            if (!cancelled) fadeMoltenOut()
          },
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
        }, (DIVE_AT + DIVE_S) * 1000)
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
        window.clearTimeout(moltenMountTimer)
        fadeTween?.kill()
        moltenOutTween?.kill()
        settleTween?.kill()
        video?.removeEventListener('loadeddata', kick)
        setMoltenLive(false)
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
      className="cs-scene relative isolate overflow-hidden bg-[var(--cs-pitch)]"
      style={{ '--cs-hero-blur': `${BLUR_PX}px` } as CSSProperties}
    >
      <style>{HERO_CSS}</style>
      {moltenLive ? (
        <div
          ref={moltenRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0"
        >
          <MoltenMetal
            color1={MOLTEN_VIOLET.color1}
            color2={MOLTEN_VIOLET.color2}
            color3={MOLTEN_VIOLET.color3}
            colorMode="ember"
            speed={MOLTEN_VIOLET.speed}
            scale={3.4}
            detail={2}
            glow={1.45}
            coreSize={0.12}
            swirl={0.85}
            brightness={1.15}
            opacity={1}
            mouseInteraction={false}
            grain
            grainIntensity={0.04}
            renderScale={0.5}
            maxDpr={1.25}
            targetFps={30}
          />
        </div>
      ) : null}
      <div ref={brandRef} className="relative z-[1] h-full invisible opacity-0">
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
            tracking={displayTracking}
            lineHeight={displayLeading}
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
      <HeroMark visible={copyReady} />
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
      className="cs-scene relative overflow-hidden bg-[var(--cs-pitch)]"
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
      <HeroMark visible />
      <HeroCopy />
    </section>
  )
}

/** Wordmark bounds inside the 1290×790 black plate. */
const MARK = { x: 229, y: 268, w: 832, h: 192 } as const

/**
 * Crop to the wordmark and lift the black plate so the letters sit on the video.
 */
function HeroMark({ visible }: { visible: boolean }) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = MARK.w
      canvas.height = MARK.h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, MARK.x, MARK.y, MARK.w, MARK.h, 0, 0, MARK.w, MARK.h)
      const frame = ctx.getImageData(0, 0, MARK.w, MARK.h)
      const px = frame.data
      const cut = 18
      for (let i = 0; i < px.length; i += 4) {
        const max = Math.max(px[i] ?? 0, px[i + 1] ?? 0, px[i + 2] ?? 0)
        px[i + 3] = max <= cut ? 0 : Math.min(255, Math.round(((max - cut) * 255) / (255 - cut)))
      }
      ctx.putImageData(frame, 0, 0)
      setSrc(canvas.toDataURL('image/png'))
    }
    img.src = primeLogo
    return () => {
      cancelled = true
    }
  }, [])

  if (!src || !visible) return null

  return (
    <img
      src={src}
      alt="Prime"
      className="pointer-events-none absolute top-4 left-4 z-30 h-5 w-auto sm:top-5 sm:left-6 sm:h-6"
    />
  )
}

function HeroCopy() {
  const copyRef = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  useGSAP(
    () => {
      const root = copyRef.current
      if (!root || reduced) return
      const extras = root.querySelectorAll<HTMLElement>('[data-hero-extra]')
      if (!extras.length) return
      gsap.fromTo(
        extras,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.18,
          stagger: 0.14,
          ease: 'power3.out',
        },
      )
    },
    { scope: copyRef, dependencies: [reduced] },
  )

  const quiet = reduced ? '' : 'opacity-0'

  return (
    <div
      ref={copyRef}
      className="pointer-events-none absolute top-[72%] left-1/2 z-20 flex w-[min(92vw,40rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4 text-center"
    >
      <p
        data-hero-extra=""
        className={`mb-3 sm:mb-4 ${kickerClass} ${quiet}`}
      >
        Official NAVI partner
      </p>
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
        className="font-[family-name:var(--cs-display)] text-[clamp(2.4rem,9vw,5.4rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase [&_.split-word:last-child]:!text-[var(--cs-gold)]"
      />
      <p
        data-hero-extra=""
        className={`mt-3 max-w-[24rem] sm:mt-4 ${supportClass} ${quiet}`}
      >
        One night. Five ways to make it yours.
      </p>
      <div
        data-hero-extra=""
        className={`pointer-events-auto mt-6 sm:mt-8 ${quiet}`}
      >
        <SpecularButton
          size="md"
          radius={999}
          tint="#ffffff"
          tintOpacity={0.06}
          blur={10}
          {...specularInk}
          intensity={1.15}
          autoAnimate={!isCoarsePointer()}
          className={ctaClass}
          onClick={() => {
            window.open(BOOKING_URL, '_blank', 'noopener,noreferrer')
          }}
        >
          Book a night
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
