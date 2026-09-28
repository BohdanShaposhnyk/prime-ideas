import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'

import { useEffect, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { prefersReducedMotion } from '@/shared/lib/motion'
// import Hero from './sections/hero'
import HeroV2 from './sections/hero-v2'
import SceneBook from './sections/scene-book'
import SceneOverview from './sections/scene-overview'
import SceneScreen from './sections/scene-screen'
import SceneShowcase from './sections/scene-showcase'
import SceneLocations from './sections/scene-locations'
import SceneApp from './sections/scene-app'
// import SceneFranchise from './sections/scene-franchise'
import SceneFranchiseV2 from './sections/scene-franchise-v2'
import LazyScene from './lazy-scene'
import { displayLeading, displayTracking, palette } from './palette'

const tokens = {
  '--cs-pitch': palette.pitch,
  '--cs-blue': '#0A2478',
  '--cs-navy': '#071A52',
  '--cs-ice': palette.ice,
  '--cs-caption': palette.caption,
  '--cs-gold': palette.gold,
  '--cs-gold-ink': palette.goldInk,
  '--cs-void': '#0C0E14',
  '--cs-well': '#161A24',
  '--cs-display': '"Bebas Neue", sans-serif',
  '--cs-body': '"Barlow", sans-serif',
  '--cs-track-display': `${displayTracking}em`,
  '--cs-track-micro': '0.24em',
  '--cs-lead-display': String(displayLeading),
  '--cs-text-kicker': '0.68rem',
  '--cs-text-support': 'clamp(1rem, 2.2vw, 1.15rem)',
  '--cs-text-cta': '0.75rem',
  '--cs-radius-media': '14px',
  '--cs-radius-panel': '1.35rem',
} as CSSProperties

/**
 * Document scrollport snap for this candidate only.
 * Tall scenes (overview / showcase) keep align-start so the UA can free-scroll
 * inside oversized snap areas; 1vh scenes use scroll-snap-stop: always.
 * Coarse / iOS: snap off — WebKit undershoots 100dvh scenes by the URL-bar delta.
 */
const PAGE_CSS = `
.cs-scene {
  height: 100vh;
  min-height: 100svh;
  height: 100lvh;
}
html.cs-snap {
  scroll-snap-type: y mandatory;
  overscroll-behavior-y: none;
}
html.cs-snap [data-scene] {
  scroll-snap-align: start;
}
html.cs-snap [data-scene]:not([data-scene="overview"]):not([data-scene="showcase"]) {
  scroll-snap-stop: always;
}
@media (hover: none) and (pointer: coarse) {
  html.cs-snap {
    scroll-snap-type: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  html.cs-snap {
    scroll-snap-type: none;
  }
}
`

function useDocumentSnap() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const root = document.documentElement
    root.classList.add('cs-snap')
    return () => {
      root.classList.remove('cs-snap')
    }
  }, [])
}

/**
 * Charge Split — 50/50 charge cell, book lockup, overview carousel, screen masonry, showcase spiral.
 * Split-hold pin / pane recut live later in motion/.
 */
export default function ChargeSplitPage() {
  useDocumentSnap()

  return (
    <main
      className="bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
      style={{
        ...tokens,
        fontFamily: 'var(--cs-body)',
      }}
    >
      <style>{PAGE_CSS}</style>
      {/* Standalone build (`--mode c20`) has no router, so the hub link must not render. */}
      {import.meta.env.MODE !== 'c20' && (
        <Link
          to="/lab"
          className="fixed top-4 right-4 z-50 font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[var(--cs-track-micro)] text-[color-mix(in_srgb,var(--cs-ice)_70%,transparent)] uppercase underline-offset-4 hover:text-[var(--cs-ice)] hover:underline focus-visible:text-[var(--cs-ice)] focus-visible:underline focus-visible:outline-none sm:right-6"
        >
          Hub
        </Link>
      )}
      {/* <Hero /> */}
      <HeroV2 />
      <SceneOverview />
      <LazyScene>
        <SceneBook />
      </LazyScene>
      <LazyScene>
        <SceneScreen />
      </LazyScene>
      <LazyScene minHeight="645vh">
        <SceneShowcase />
      </LazyScene>
      <LazyScene>
        <SceneLocations />
      </LazyScene>
      <LazyScene>
        <SceneApp />
      </LazyScene>
      <LazyScene>
        <SceneFranchiseV2 />
      </LazyScene>
      {/* <LazyScene>
        <SceneFranchise />
      </LazyScene> */}
    </main>
  )
}
