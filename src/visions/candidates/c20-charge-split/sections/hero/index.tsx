import { useRef, type CSSProperties } from 'react'
import MaskedHeading from '@/shared/bits/MaskedHeading'
import MoltenMetal from '@/shared/bits/MoltenMetal'
import nightReel from '@/assets/c20/night-reel.mp4'
import { displayLeading, displayTracking } from '../../lib/palette'
import { HeroCopy } from './copy'
import { BLUR_PX, MOLTEN_VIOLET, REVEAL_S, useHeroIntro } from './intro'
import { HeroMark } from './mark'
import { ReducedHeroVideo } from './reduced'
import { useHeroScrollOut } from './scroll-out'
import { VIGNETTE_BG, VIGNETTE_FROM, vignetteVars } from './vignette'

export default function HeroV2() {
  const rootRef = useRef<HTMLElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)
  const moltenRef = useRef<HTMLDivElement>(null)
  const { reduced, fontReady, copyReady, moltenLive } = useHeroIntro({
    rootRef,
    brandRef,
    vignetteRef,
    moltenRef,
  })
  useHeroScrollOut(rootRef, !reduced)

  if (reduced) {
    return <ReducedHeroVideo />
  }

  return (
    <section
      ref={rootRef}
      aria-labelledby="cs-hero-v2-brand"
      data-scroll="split-hold"
      data-scene="hero"
      data-hero-blur=""
      className="cs-scene cs-hero-track relative bg-[var(--cs-pitch)]"
      style={{ '--cs-hero-blur': `${BLUR_PX}px` } as CSSProperties}
    >
      <div data-hero-frame="" className="cs-hero-frame relative isolate bg-[var(--cs-pitch)]">
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
        <div ref={brandRef} className="cs-hero-plane relative z-[1] h-full invisible opacity-0">
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
        <div aria-hidden className="cs-hero-veil pointer-events-none absolute inset-0 z-[15] bg-black" />
        <HeroMark visible={copyReady} />
        {copyReady ? <HeroCopy /> : null}
      </div>
    </section>
  )
}
