import '@fontsource/bodoni-moda/400.css'
import '@fontsource/bodoni-moda/400-italic.css'
import '@fontsource/bodoni-moda/500.css'
import '@fontsource/bodoni-moda/700.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Proscenium from './proscenium'
import Hero from './sections/hero'
import DropHeat from './sections/drop-heat'
import DropPlay from './sections/drop-play'
import DropScreen from './sections/drop-screen'
import DropVoice from './sections/drop-voice'
import DropCurtain from './sections/drop-curtain'

const tokens = {
  '--fh-void': '#070506',
  '--fh-velvet': '#4a1218',
  '--fh-gold': '#c4a35a',
  '--fh-amber': '#e8b86d',
  '--fh-wing': '#1a1214',
  '--fh-paper': '#f3e6d0',
  '--fh-ember': '#8b3a22',
  '--fh-display': '"Bodoni Moda", serif',
  '--fh-body': '"IBM Plex Mono", monospace',
} as CSSProperties

/**
 * Flyhouse — sticky proscenium; scenery parked in the flies.
 * Fly-in / fly-out / surtitle recast live in motion/.
 */
export default function FlyhousePage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#070506] text-[#f3e6d0]"
      style={{
        ...tokens,
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      <Link
        to="/lab"
        className="fixed bottom-4 left-4 z-50 font-['IBM_Plex_Mono',monospace] text-[0.62rem] tracking-[0.22em] text-[color-mix(in_srgb,#c4a35a_75%,transparent)] uppercase underline-offset-4 hover:text-[#f3e6d0] hover:underline focus-visible:text-[#f3e6d0] focus-visible:underline focus-visible:outline-none sm:left-7"
      >
        Hub
      </Link>

      <div data-scroll="fly-runway" className="relative h-[720vh]">
        <div
          data-scroll="pin"
          className="sticky top-0 h-dvh overflow-hidden bg-[#070506]"
        >
          <div data-scroll="aperture" className="absolute inset-0">
            <Hero />
            <div
              data-scroll="flies"
              className="absolute inset-x-0 top-[min(16vh,6.5rem)] z-10"
            >
              <DropHeat />
              <DropPlay />
              <DropScreen />
              <DropVoice />
              <DropCurtain />
            </div>
          </div>
          <Proscenium />
        </div>
      </div>
    </main>
  )
}
