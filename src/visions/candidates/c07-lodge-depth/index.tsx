import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'

import type { CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import Hero from './sections/hero'
import SceneArena from './sections/scene-arena'
import SceneEmber from './sections/scene-ember'
import SceneInterior from './sections/scene-interior'
import SceneKitchen from './sections/scene-kitchen'
import SceneStage from './sections/scene-stage'

/**
 * Lodge Depth — z-axis zoom-out (window → full interior), then diagonal splits.
 * Fine GSAP timelines deferred to motion/; CSS scroll-driven zoom is the skeleton.
 */
export default function LodgeDepthPage() {
  return (
    <main
      className="relative bg-[#1A1814] text-[#E8E2D6]"
      style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
    >
      <style>{`
        @supports (animation-timeline: scroll()) {
          [data-scroll='z-zoom'] [data-plane='zoom-target'] {
            transform-origin: 62% 28%;
            animation: ld-zoom-out linear both;
            animation-timeline: scroll(nearest block);
            animation-range: 0% 85%;
          }
          [data-scroll='z-zoom'] [data-hero='caption'],
          [data-scroll='z-zoom'] [data-hero='brand'],
          [data-scroll='z-zoom'] [data-hero='support'],
          [data-scroll='z-zoom'] [data-hero='cta'] {
            animation: ld-hero-fade linear both;
            animation-timeline: scroll(nearest block);
            animation-range: 55% 90%;
          }
        }
        @keyframes ld-zoom-out {
          from { transform: scale(2.35); }
          to { transform: scale(1); }
        }
        @keyframes ld-hero-fade {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        /* Fallback when scroll-driven animations unavailable */
        @supports not (animation-timeline: scroll()) {
          [data-scroll='z-zoom'] [data-plane='zoom-target'] {
            transform: scale(1.85);
            transform-origin: 62% 28%;
          }
        }
      `}</style>

      <Link
        to="/"
        className="fixed top-8 right-5 z-50 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.16em] text-[color-mix(in_srgb,#E8E2D6_55%,transparent)] uppercase underline-offset-4 hover:text-[#E8E2D6] hover:underline sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      {/* Stage 1 — sticky z-zoom retreat from window crop into the lodge */}
      <div
        data-scroll="z-zoom"
        className="relative h-[280vh]"
        style={
          {
            '--ld-sill': '#1A1814',
          } as CSSProperties
        }
      >
        <div
          data-scroll="pin"
          className="sticky top-0 h-dvh overflow-hidden"
        >
          <Hero />
        </div>
      </div>

      {/* Stage 2 — full interior confirm, then diagonal split-screen rooms */}
      <div data-scroll="diagonal-stack" className="relative">
        <SceneInterior />
        <SceneKitchen />
        <SceneArena />
        <SceneStage />
        <SceneEmber />
        <div aria-hidden className="h-[45vh] bg-[#1A1814]" />
      </div>
    </main>
  )
}
