import '@fontsource/unbounded/400.css'
import '@fontsource/unbounded/500.css'
import '@fontsource/figtree/400.css'
import '@fontsource/figtree/500.css'
import '@fontsource/figtree/600.css'

import { useRef, type CSSProperties } from 'react'
import { Link } from '@tanstack/react-router'
import { useCandidateMotion } from './motion'
import Hero from './sections/hero'
import SceneArena from './sections/scene-arena'
import SceneEmber from './sections/scene-ember'
import SceneKitchen from './sections/scene-kitchen'
import SceneStage from './sections/scene-stage'

/**
 * Glass Cap — sticky frost canopy over blooming rooms.
 * Cap lift / bloom / rim shimmer via motion/.
 */
export default function GlassCapPage() {
  const rootRef = useRef<HTMLElement>(null)
  useCandidateMotion(rootRef)

  return (
    <main
      ref={rootRef}
      className="relative bg-[#0F171C] text-[#F7F4EF]"
      style={{ fontFamily: '"Figtree", sans-serif' }}
    >
      <Link
        to="/lab"
        className="fixed top-3 right-5 z-[60] font-['Figtree',sans-serif] text-[0.65rem] tracking-[0.16em] text-[color-mix(in_srgb,#E8EEF2_55%,transparent)] uppercase underline-offset-4 hover:text-[#E8EEF2] hover:underline sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="cap-lift" className="relative">
        {/* Sticky frost canopy — planes lift + dissolve via motion/ */}
        <div
          data-cap="glass"
          aria-hidden
          className="pointer-events-none sticky top-0 z-50 h-[min(28vh,11rem)] w-full overflow-hidden"
          style={
            {
              '--gc-mist': '#E8EEF2',
              '--gc-aqua': '#7EB8C9',
              '--gc-brass': '#C9A87C',
            } as CSSProperties
          }
        >
          <div
            data-plane="frost"
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  180deg,
                  color-mix(in srgb, #E8EEF2 55%, transparent) 0%,
                  color-mix(in srgb, #7EB8C9 22%, transparent) 42%,
                  color-mix(in srgb, #E8EEF2 8%, transparent) 72%,
                  transparent 100%
                )
              `,
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />
          <div
            data-plane="rim"
            className="absolute inset-x-[10%] bottom-0 h-px opacity-70"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  transparent 0%,
                  color-mix(in srgb, #7EB8C9 60%, transparent) 22%,
                  color-mix(in srgb, #E8EEF2 70%, transparent) 50%,
                  color-mix(in srgb, #C9A87C 45%, transparent) 78%,
                  transparent 100%
                )
              `,
            }}
          />
          <div
            data-plane="refraction"
            className="absolute inset-x-[18%] bottom-0 h-6 -translate-y-1/2 opacity-40"
            style={{
              background: `
                linear-gradient(
                  90deg,
                  transparent 0%,
                  color-mix(in srgb, #7EB8C9 35%, transparent) 40%,
                  color-mix(in srgb, #E8EEF2 25%, transparent) 55%,
                  transparent 100%
                )
              `,
              filter: 'blur(8px)',
            }}
          />
        </div>

        {/* Rooms bloom under the seal (overlap the sticky cap height) */}
        <div data-stack="bloom" className="-mt-[min(28vh,11rem)]">
          <Hero />
          <SceneKitchen />
          <SceneArena />
          <SceneStage />
          <SceneEmber />
          {/* Trailing scroll so final sticky can release */}
          <div aria-hidden className="h-[45vh] bg-[#0F171C]" />
        </div>
      </div>
    </main>
  )
}
