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
import SceneFranchise from './sections/scene-franchise'

const tokens = {
  '--cs-pitch': '#000000',
  '--cs-blue': '#0A2478',
  '--cs-navy': '#071A52',
  '--cs-ice': '#F4F7FF',
  '--cs-caption': '#A9BBE0',
  '--cs-void': '#0C0E14',
  '--cs-well': '#161A24',
  '--cs-display': '"Bebas Neue", sans-serif',
  '--cs-body': '"Barlow", sans-serif',
  '--cs-track-display': '0.02em',
  '--cs-track-micro': '0.24em',
  '--cs-lead-display': '0.82',
  '--cs-text-cta': '0.72rem',
  '--cs-radius-media': '14px',
  '--cs-radius-panel': '1.35rem',
} as CSSProperties

/**
 * Document scrollport snap for this candidate only.
 * Tall scenes (overview / showcase) keep align-start so the UA can free-scroll
 * inside oversized snap areas; 1vh scenes use scroll-snap-stop: always.
 */
const SNAP_CSS = `
html.cs-snap {
  scroll-snap-type: y mandatory;
}
html.cs-snap [data-scene] {
  scroll-snap-align: start;
}
html.cs-snap [data-scene]:not([data-scene="overview"]):not([data-scene="showcase"]) {
  scroll-snap-stop: always;
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
      <style>{SNAP_CSS}</style>
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[var(--cs-track-micro)] text-[color-mix(in_srgb,var(--cs-ice)_70%,transparent)] uppercase underline-offset-4 hover:text-[var(--cs-ice)] hover:underline focus-visible:text-[var(--cs-ice)] focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>
      {/* <Hero /> */}
      <HeroV2 />
      <SceneOverview />
      <SceneBook />
      <SceneScreen />
      <SceneShowcase />
      <SceneLocations />
      <SceneApp />
      <SceneFranchise />
    </main>
  )
}
