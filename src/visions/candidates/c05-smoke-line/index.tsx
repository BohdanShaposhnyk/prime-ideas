import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'

import { Link } from '@tanstack/react-router'
import Hero from './sections/hero'
import StripArena from './sections/strip-arena'
import StripEmber from './sections/strip-ember'
import StripKitchen from './sections/strip-kitchen'
import StripMic from './sections/strip-mic'

/**
 * Smoke Line — sticky horizon seam over a horizontal-drift track.
 * Track x-translate / smoke breath wired later in motion/.
 */
export default function SmokeLinePage() {
  return (
    <main
      className="relative h-dvh overflow-hidden bg-[#1A1410] text-[#F5E6D3]"
      style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
    >
      <Link
        to="/"
        className="fixed top-3 right-5 z-50 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.16em] text-[color-mix(in_srgb,#F5E6D3_55%,transparent)] uppercase underline-offset-4 hover:text-[#F5E6D3] hover:underline sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      {/* Sticky smoke horizon — holds while panels drift */}
      <div
        data-horizon="seam"
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-[42%] z-40 h-px -translate-y-1/2"
      >
        <div
          data-plane="horizon-core"
          className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                color-mix(in srgb, #8B9E8B 55%, transparent) 12%,
                color-mix(in srgb, #D4A574 75%, transparent) 48%,
                color-mix(in srgb, #F5E6D3 45%, transparent) 72%,
                transparent 100%
              )
            `,
          }}
        />
        <div
          data-plane="horizon-veil"
          className="absolute inset-x-[8%] top-1/2 h-8 -translate-y-1/2 opacity-50"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                color-mix(in srgb, #8B9E8B 25%, transparent) 30%,
                color-mix(in srgb, #D4A574 30%, transparent) 55%,
                transparent 100%
              )
            `,
            filter: 'blur(10px)',
          }}
        />
      </div>

      <div
        data-scroll="smoke-line"
        data-track="horizontal-drift"
        className="flex h-dvh snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div
          data-track="rail"
          className="flex h-full w-max"
        >
          <Hero />
          <StripKitchen />
          <StripArena />
          <StripMic />
          <StripEmber />
        </div>
      </div>
    </main>
  )
}
