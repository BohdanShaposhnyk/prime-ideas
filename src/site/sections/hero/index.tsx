import { useRef, type CSSProperties } from 'react'
import { ActivationSwitcher } from '@/site/activation'
import MaskedHeading from '@/site/bits/MaskedHeading'
import { displayLeading, displayTracking } from '../../lib/palette'
import { HeroCopy } from './copy'
import { HeroGalaxy } from './galaxy'
import { BLUR_PX, REVEAL_S, useHeroIntro } from './intro'
import { heroFocusStyle, heroReel } from './media'
import { HeroMolten } from './molten'
import { ReducedHeroVideo } from './reduced'
import { useHeroScrollOut } from './scroll-out'
import { VIGNETTE_BG, VIGNETTE_FROM, vignetteVars } from './vignette'

const introFields = { molten: HeroMolten, galaxy: HeroGalaxy }
const HeroField = introFields.molten
// const HeroField = introFields.galaxy

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
      id="cs-nav-hero"
      data-scroll="split-hold"
      data-scene="hero"
      data-hero-blur=""
      className="cs-scene cs-hero-track relative bg-[var(--cs-pitch)]"
      style={{ '--cs-hero-blur': `${BLUR_PX}px`, ...heroFocusStyle() } as CSSProperties}
    >
      <link rel="preload" as="image" href={heroReel.poster} fetchPriority="high" />
      <div data-hero-frame="" className="cs-hero-frame relative isolate bg-[var(--cs-pitch)]">
        {moltenLive ? (
          <div
            ref={moltenRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-0"
          >
            <HeroField />
          </div>
        ) : null}
        <div ref={brandRef} className="cs-hero-plane relative z-[1] h-full invisible opacity-0">
          {fontReady ? (
            <MaskedHeading
              id="cs-hero-v2-brand"
              text="PRIME"
              tag="h1"
              mediaType="video"
              src={heroReel.src}
              poster={heroReel.poster}
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
        {copyReady ? <HeroCopy /> : null}
        <ActivationSwitcher />
      </div>
    </section>
  )
}
