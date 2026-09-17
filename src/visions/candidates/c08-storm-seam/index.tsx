import '@fontsource/unbounded/400.css'
import '@fontsource/unbounded/500.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'

import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import Lodge from './sections/scene-lodge'
import Bar from './sections/scene-bar'
import SeamStage from './sections/seam-stage'
import DualStage from './sections/scene-dual-stage'
import Gaming from './sections/scene-gaming'
import Spiral from './sections/scene-spiral'
import Floor from './sections/scene-floor'

/**
 * Storm Seam — one spiral only (under curtains). After curtains, hold then floor.
 */
export default function StormSeamPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#070B18] text-[#F5F5F5]"
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      <Link
        to="/lab"
        className="fixed top-8 right-5 z-50 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.16em] text-[color-mix(in_srgb,#C9D6FF_50%,transparent)] uppercase underline-offset-4 hover:text-[#C9D6FF] hover:underline focus-visible:text-[#C9D6FF] focus-visible:underline focus-visible:outline-none sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="storm-runway" className="relative h-[620vh]">
        <div
          data-scroll="pin"
          className="sticky top-0 z-[2] h-dvh overflow-hidden bg-[#050505]"
        >
          <div
            data-spiral="under"
            className="absolute inset-0 z-[1] opacity-0"
          >
            <Spiral />
          </div>

          <SeamStage
            leftBlocks={[<Lodge key="lodge" />, <Bar key="bar" />]}
            rightBlocks={[<DualStage key="stage" />, <Gaming key="gaming" />]}
          />

          <div data-layer="hero" className="absolute inset-0 z-[3]">
            <Hero />
          </div>
        </div>
      </div>

      <div data-scroll="floor-track" className="relative h-[180vh]">
        <div
          data-scroll="floor-pin"
          className="sticky top-0 flex h-dvh overflow-hidden bg-[#050505]"
        >
          <div data-floor="rail" className="flex h-full will-change-transform">
            <div aria-hidden className="h-full w-[40vw] shrink-0 bg-[#050505]" />
            <Floor />
            <div aria-hidden className="h-full w-[25vw] shrink-0 bg-[#1A1816]" />
          </div>
        </div>
      </div>
    </main>
  )
}
