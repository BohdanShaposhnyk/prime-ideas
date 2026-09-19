import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import LookEmber from './sections/look-ember'
import LookFloor from './sections/look-floor'
import LookPlay from './sections/look-play'
import LookScreen from './sections/look-screen'
import LookTable from './sections/look-table'
import LookVoice from './sections/look-voice'

const tokens = {
  '--rs-champagne': '#F3E6D4',
  '--rs-ivory': '#FFF7EE',
  '--rs-paper': '#E4D5C0',
  '--rs-ink': '#16120F',
  '--rs-chrome': '#C4B8A8',
  '--rs-ember': '#C45A28',
  '--rs-display': '"Instrument Serif", serif',
  '--rs-body': '"Outfit", sans-serif',
  '--rs-lip': '2.75rem',
} as CSSProperties

/**
 * RSVP — invitation stack of night cards.
 * Lip compress / plate rise / lockup settle live in motion/.
 */
export default function RsvpPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      data-scroll="rsvp-stack"
      className="relative overflow-x-clip bg-[var(--rs-champagne)] text-[var(--rs-ink)]"
      style={{
        ...tokens,
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed right-4 bottom-4 z-50 bg-[color-mix(in_srgb,var(--rs-champagne)_90%,transparent)] px-2 py-1 font-[family-name:var(--rs-body)] text-[0.62rem] tracking-[0.22em] text-[var(--rs-ink)] uppercase underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none sm:right-6 sm:bottom-6"
      >
        Hub
      </Link>

      <div data-scroll="stack-runway" className="relative">
        <Hero />
        <LookFloor />
        <LookPlay />
        <LookScreen />
        <LookVoice />
        <LookEmber />
        <LookTable />
      </div>
    </main>
  )
}
