import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import SceneArena from './sections/scene-arena'
import SceneEmber from './sections/scene-ember'
import SceneInterior from './sections/scene-interior'
import SceneKitchen from './sections/scene-kitchen'
import SceneStage from './sections/scene-stage'

/**
 * Lodge Depth — inert pin stage + diagonal stack; zoom / shear live in motion/.
 */
export default function LodgeDepthPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#1A1814] text-[#E8E2D6]"
      style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
    >
      <Link
        to="/lab"
        className="fixed top-8 right-5 z-50 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.16em] text-[color-mix(in_srgb,#E8E2D6_55%,transparent)] uppercase underline-offset-4 hover:text-[#E8E2D6] hover:underline focus-visible:text-[#E8E2D6] focus-visible:underline focus-visible:outline-none sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      {/* Inert z-zoom runway — GSAP owns scale + copy crossfade */}
      <div
        data-scroll="z-zoom"
        className="relative h-[360vh]"
        style={
          {
            '--ld-sill': '#1A1814',
          } as CSSProperties
        }
      >
        <div
          data-scroll="pin"
          className="sticky top-0 z-[2] h-dvh overflow-hidden"
        >
          <Hero />
          <SceneInterior />
        </div>
      </div>

      <div data-scroll="diagonal-stack" className="relative">
        <SceneKitchen />
        <SceneArena />
        <SceneStage />
        <SceneEmber />
        <div aria-hidden className="h-[45vh] bg-[#1A1814]" />
      </div>
    </main>
  )
}
