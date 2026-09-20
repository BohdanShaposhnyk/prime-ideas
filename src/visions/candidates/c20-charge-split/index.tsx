import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'

import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import Hero from './sections/hero'
import SceneBook from './sections/scene-book'
import ScenePlay from './sections/scene-play'
import SceneScreen from './sections/scene-screen'
import SceneShowcase from './sections/scene-showcase'

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
} as CSSProperties

/**
 * Charge Split — 50/50 charge cell, book lockup, play carousel, screen masonry, showcase spiral.
 * Split-hold pin / pane recut live later in motion/.
 */
export default function ChargeSplitPage() {
  return (
    <main
      className="bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
      style={{
        ...tokens,
        fontFamily: '"Barlow", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--cs-ice)_70%,transparent)] uppercase underline-offset-4 hover:text-[var(--cs-ice)] hover:underline focus-visible:text-[var(--cs-ice)] focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>
      <Hero />
      <SceneBook />
      <ScenePlay />
      <SceneScreen />
      <SceneShowcase />
    </main>
  )
}
