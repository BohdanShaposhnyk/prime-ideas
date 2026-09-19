import '@fontsource/syne/800.css'
import '@fontsource/ibm-plex-mono/400.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import { FinderChrome } from './parts'
import Hero from './sections/hero'
import CropHeat from './sections/crop-heat'
import CropPlay from './sections/crop-play'
import CropVoice from './sections/crop-voice'
import CropScreen from './sections/crop-screen'
import CropClose from './sections/crop-close'

const tokens = {
  '--nc-void': '#08080C',
  '--nc-paper': '#F3EFE6',
  '--nc-lime': '#C8F542',
  '--nc-magenta': '#FF3D8A',
  '--nc-chrome': '#B8BEC8',
  '--nc-tungsten': '#E8A86A',
  '--nc-display': '"Syne", sans-serif',
  '--nc-body': '"IBM Plex Mono", monospace',
} as CSSProperties

/**
 * Night Crop — sticky finder + wide night strip.
 * Whip-pan / crop-mark tick / EXIF scramble live in motion/.
 */
export default function NightCropPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      data-scroll="night-crop"
      className="relative bg-[var(--nc-void)] text-[var(--nc-paper)]"
      style={{
        ...tokens,
        fontFamily: '"IBM Plex Mono", monospace',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 border border-[color-mix(in_srgb,var(--nc-lime)_40%,transparent)] bg-[var(--nc-void)] px-2.5 py-1 font-[family-name:var(--nc-body)] text-[0.62rem] tracking-[0.22em] text-[var(--nc-paper)] uppercase underline-offset-4 hover:text-[var(--nc-lime)] hover:underline focus-visible:text-[var(--nc-lime)] focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>

      <div data-scroll="runway" className="relative h-[600vh]">
        <div
          data-scroll="finder"
          className="sticky top-0 h-dvh overflow-hidden"
        >
          <FinderChrome />
          <div
            data-flash
            aria-hidden
            className="pointer-events-none absolute inset-0 z-50 bg-[var(--nc-paper)] opacity-0"
          />
          <div data-scroll="strip" className="flex h-full w-max">
            <Hero />
            <CropHeat />
            <CropPlay />
            <CropVoice />
            <CropScreen />
            <CropClose />
          </div>
        </div>
      </div>
    </main>
  )
}
