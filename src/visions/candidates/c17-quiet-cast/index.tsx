import '@fontsource-variable/fraunces/full.css'
import '@fontsource/plus-jakarta-sans/400.css'
import '@fontsource/plus-jakarta-sans/500.css'
import '@fontsource/plus-jakarta-sans/600.css'

import { useCallback, useRef, useState, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import { CAST_PLATES, type CastPlate } from './sections/cast'
import Hero from './sections/hero'
import PlateClose from './sections/plate-close'
import PlateHeat from './sections/plate-heat'
import PlatePlay from './sections/plate-play'
import PlateScreen from './sections/plate-screen'
import PlateVoice from './sections/plate-voice'

const tokens = {
  '--qc-field': '#141210',
  '--qc-well': '#0C0B0A',
  '--qc-hair': '#2A2622',
  '--qc-bone': '#F0E8DC',
  '--qc-mute': '#8A8278',
  '--qc-ember': '#D45A28',
  '--qc-display': '"Fraunces Variable", serif',
  '--qc-body': '"Plus Jakarta Sans", sans-serif',
} as CSSProperties

/**
 * Quiet Cast — sticky typesetting vessel.
 * Shuffle recast / tracking breath / VariableProximity live in motion/.
 */
export default function QuietCastPage() {
  const rootRef = useRef<HTMLElement>(null)
  const [plate, setPlate] = useState<CastPlate>(CAST_PLATES[0])
  const onPlate = useCallback((next: CastPlate) => setPlate(next), [])
  useCandidateMotion(rootRef, onPlate)

  return (
    <main
      ref={rootRef}
      data-scroll="quiet-cast"
      className="relative bg-[var(--qc-field)] text-[var(--qc-bone)]"
      style={{
        ...tokens,
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 font-[family-name:var(--qc-body)] text-[0.62rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--qc-mute)_90%,transparent)] uppercase underline-offset-4 hover:text-[var(--qc-bone)] hover:underline focus-visible:text-[var(--qc-bone)] focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>

      <div data-scroll="cast-runway" className="relative">
        <div data-scroll="cast-pin" className="sticky top-0 z-10 h-dvh overflow-hidden">
          <Hero plate={plate} />
        </div>
        <PlatePlay />
        <PlateScreen />
        <PlateVoice />
        <PlateHeat />
        <PlateClose />
      </div>
    </main>
  )
}
