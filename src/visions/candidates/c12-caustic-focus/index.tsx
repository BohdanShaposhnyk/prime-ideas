import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/outfit/400.css'
import '@fontsource/outfit/500.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import LensAxis from './sections/lens-axis'
import PlateClose from './sections/plate-close'
import PlateHeat from './sections/plate-heat'
import PlatePlay from './sections/plate-play'
import PlateScreen from './sections/plate-screen'
import PlateVoice from './sections/plate-voice'

const tokens = {
  '--cf-void': '#08070C',
  '--cf-plum': '#1A1228',
  '--cf-amber': '#E8C9A0',
  '--cf-heat': '#C45C2C',
  '--cf-cyan': '#7EC8C4',
  '--cf-gold': '#F0D4A8',
  '--cf-bone': '#F7F1E8',
  '--cf-display': '"Instrument Serif", serif',
  '--cf-body': '"Outfit", sans-serif',
} as CSSProperties

/**
 * Caustic Focus — fixed optical axis over stacked glass plates.
 * Focal rack / type discovery / caustic drift live in motion/.
 */
export default function CausticFocusPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative overflow-x-hidden bg-[#08070C] text-[#F7F1E8]"
      style={{
        ...tokens,
        fontFamily: '"Outfit", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-5 z-50 font-['Outfit',sans-serif] text-[0.65rem] tracking-[0.2em] text-[color-mix(in_srgb,#7EC8C4_65%,transparent)] uppercase underline-offset-4 hover:text-[#F7F1E8] hover:underline focus-visible:text-[#F7F1E8] focus-visible:underline focus-visible:outline-none sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="rack-runway" className="relative">
        <LensAxis />
        <div className="relative z-[1]">
          <Hero />
          <PlateHeat />
          <PlatePlay />
          <PlateScreen />
          <PlateVoice />
          <PlateClose />
        </div>
      </div>
    </main>
  )
}
