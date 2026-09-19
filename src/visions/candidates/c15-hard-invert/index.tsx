import '@fontsource/bungee/400.css'
import '@fontsource/ibm-plex-mono/400.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import FlyerFloor from './sections/flyer-floor'
import FlyerHeat from './sections/flyer-heat'
import FlyerPlay from './sections/flyer-play'
import FlyerScreen from './sections/flyer-screen'
import FlyerStrobe from './sections/flyer-strobe'
import FlyerVoice from './sections/flyer-voice'

const tokens = {
  '--hi-yellow': '#F4FF3A',
  '--hi-magenta': '#FF2EC8',
  '--hi-cyan': '#1CFFF0',
  '--hi-purple': '#6A12FF',
  '--hi-green': '#00F55A',
  '--hi-paper': '#F7F2EA',
  '--hi-pitch': '#090909',
  '--hi-display': '"Bungee", sans-serif',
  '--hi-body': '"IBM Plex Mono", monospace',
} as CSSProperties

/**
 * Hard Invert — snap-strobe flyer paging.
 * Invert flicker + six-frame strobe pin live in motion/.
 */
export default function HardInvertPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      data-scroll="snap-stage"
      className="bg-[var(--hi-pitch)] text-[var(--hi-paper)]"
      style={{
        ...tokens,
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 border border-[var(--hi-pitch)] bg-[var(--hi-yellow)] px-2.5 py-1 font-[family-name:var(--hi-body)] text-[0.62rem] tracking-[0.22em] text-[var(--hi-pitch)] uppercase underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>

      <Hero />
      <FlyerStrobe />
      <FlyerPlay />
      <FlyerHeat />
      <FlyerVoice />
      <FlyerScreen />
      <FlyerFloor />
    </main>
  )
}
