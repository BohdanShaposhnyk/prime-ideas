import '@fontsource/bricolage-grotesque/800.css'
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/500.css'
import '@fontsource/ibm-plex-mono/400.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import StripFloor from './sections/strip-floor'
import StripHeat from './sections/strip-heat'
import StripPlay from './sections/strip-play'
import StripScreen from './sections/strip-screen'
import StripVoice from './sections/strip-voice'

const tokens = {
  '--lo-void': '#0C0C0E',
  '--lo-dim': '#16161A',
  '--lo-lime': '#D6FF3A',
  '--lo-coral': '#FF4D2E',
  '--lo-paper': '#F4F0E6',
  '--lo-type': '#E8E6E1',
  '--lo-ink': '#0C0C0E',
  '--lo-display': '"Bricolage Grotesque", sans-serif',
  '--lo-body': '"Figtree", sans-serif',
  '--lo-mono': '"IBM Plex Mono", monospace',
} as CSSProperties

/**
 * Live Offset — sticky split-pin stack.
 * Zoom-parallax / seam belts / type reconstitution live in motion/.
 */
export default function LiveOffsetPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#0C0C0E] text-[#E8E6E1]"
      style={{
        ...tokens,
        fontFamily: '"Figtree", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 border border-[color-mix(in_srgb,var(--lo-lime)_40%,transparent)] bg-[var(--lo-void)] px-2.5 py-1 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.22em] text-[var(--lo-type)] uppercase underline-offset-4 hover:text-[var(--lo-lime)] hover:underline focus-visible:text-[var(--lo-lime)] focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>

      <div data-scroll="split-runway" className="relative">
        <Hero />
        <StripHeat />
        <StripPlay />
        <StripVoice />
        <StripScreen />
        <StripFloor />
        <div aria-hidden className="h-[30vh] bg-[var(--lo-void)]" />
      </div>
    </main>
  )
}
