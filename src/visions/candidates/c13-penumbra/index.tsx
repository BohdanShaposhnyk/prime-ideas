import '@fontsource/bodoni-moda/400.css'
import '@fontsource/bodoni-moda/400-italic.css'
import '@fontsource/bodoni-moda/500.css'
import '@fontsource/bodoni-moda/700.css'
import '@fontsource/sora/400.css'
import '@fontsource/sora/500.css'
import '@fontsource/sora/600.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import PlaneClose from './sections/plane-close'
import PlaneDark from './sections/plane-dark'
import PlaneHaze from './sections/plane-haze'
import PlaneHeat from './sections/plane-heat'
import PlanePlay from './sections/plane-play'
import PlaneVoice from './sections/plane-voice'

const tokens = {
  '--pb-void': '#09080C',
  '--pb-umber': '#16110F',
  '--pb-ivory': '#F3E6D0',
  '--pb-amber': '#D4A574',
  '--pb-spec': '#FFF8EE',
  '--pb-steel': '#4A5560',
  '--pb-wine': '#2C1418',
  '--pb-heat': '#C45A32',
  '--pb-play': '#5B6E9A',
  '--pb-voice': '#E8B4C0',
  '--pb-display': '"Bodoni Moda", serif',
  '--pb-body': '"Sora", sans-serif',
} as CSSProperties

/**
 * Penumbra — sticky light-rake through stacked depth planes.
 * Focal rake / type catch / bokeh drift live in motion/.
 */
export default function PenumbraPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#09080C] text-[#F3E6D0]"
      style={{
        ...tokens,
        fontFamily: '"Sora", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-5 z-50 font-['Sora',sans-serif] text-[0.62rem] tracking-[0.22em] text-[color-mix(in_srgb,#F3E6D0_45%,transparent)] uppercase underline-offset-4 hover:text-[#F3E6D0] hover:underline focus-visible:text-[#F3E6D0] focus-visible:underline focus-visible:outline-none sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="rake-runway" className="relative">
        <Hero />
        <PlaneHeat />
        <PlanePlay />
        <PlaneVoice />
        <PlaneHaze />
        <PlaneDark />
        <PlaneClose />
      </div>
    </main>
  )
}
