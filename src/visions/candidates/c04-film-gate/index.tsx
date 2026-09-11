import '@fontsource/teko/500.css'
import '@fontsource/teko/600.css'
import '@fontsource/teko/700.css'
import '@fontsource/karla/400.css'
import '@fontsource/karla/500.css'
import '@fontsource/karla/600.css'

import { Link } from '@tanstack/react-router'
import FrameArena from './sections/frame-arena'
import FrameEmber from './sections/frame-ember'
import FrameMic from './sections/frame-mic'
import FrameScreen from './sections/frame-screen'
import Hero from './sections/hero'

const SPROCKETS = Array.from({ length: 14 }, (_, i) => i)

/**
 * Film Gate — sticky aperture stack with fixed sprocket rails.
 * Frames pin and replace inside the gate (GSAP advance later).
 */
export default function FilmGatePage() {
  return (
    <main
      className="relative bg-[oklch(0.09_0.012_45)] text-[oklch(0.93_0.01_95)]"
      style={{ fontFamily: 'Karla, sans-serif' }}
    >
      <Link
        to="/"
        className="fixed top-3 right-5 z-50 font-[Karla,sans-serif] text-[0.65rem] tracking-[0.16em] text-[color-mix(in_oklch,white_55%,transparent)] uppercase underline-offset-4 hover:text-white hover:underline sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      {/* Fixed sprocket rails — gate chrome */}
      <div
        data-gate="rail"
        data-gate-side="left"
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-40 flex w-[clamp(1.75rem,5vw,2.75rem)] flex-col items-center justify-between border-r border-[color-mix(in_oklch,oklch(0.48_0.01_90)_40%,transparent)] bg-[oklch(0.07_0.01_45)] py-6"
      >
        {SPROCKETS.map((i) => (
          <span
            key={`L${i}`}
            data-sprocket
            className="block size-[clamp(0.55rem,1.6vw,0.75rem)] rounded-[2px] bg-[oklch(0.14_0.01_45)] shadow-[inset_0_0_0_1px_color-mix(in_oklch,oklch(0.48_0.01_90)_55%,transparent)]"
          />
        ))}
      </div>
      <div
        data-gate="rail"
        data-gate-side="right"
        aria-hidden
        className="pointer-events-none fixed inset-y-0 right-0 z-40 flex w-[clamp(1.75rem,5vw,2.75rem)] flex-col items-center justify-between border-l border-[color-mix(in_oklch,oklch(0.48_0.01_90)_40%,transparent)] bg-[oklch(0.07_0.01_45)] py-6"
      >
        {SPROCKETS.map((i) => (
          <span
            key={`R${i}`}
            data-sprocket
            className="block size-[clamp(0.55rem,1.6vw,0.75rem)] rounded-[2px] bg-[oklch(0.14_0.01_45)] shadow-[inset_0_0_0_1px_color-mix(in_oklch,oklch(0.48_0.01_90)_55%,transparent)]"
          />
        ))}
      </div>

      <div data-scroll="film-gate" className="relative">
        <Hero />
        <FrameArena />
        <FrameScreen />
        <FrameMic />
        <FrameEmber />
        {/* Trailing scroll room so the final sticky frame can release */}
        <div aria-hidden className="h-[40vh] bg-[oklch(0.07_0.01_40)]" />
      </div>
    </main>
  )
}
