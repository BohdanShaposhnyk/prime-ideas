import '@fontsource/archivo-black'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'

import { Link } from '@tanstack/react-router'
import Hero from './sections/hero'
import SceneHeat from './sections/scene-heat'
import SceneHush from './sections/scene-hush'
import ScenePlay from './sections/scene-play'
import SceneStage from './sections/scene-stage'

/**
 * Blade Night — diagonal-cut sticky stack.
 * Each scene pins and shears in on a clip-path edge (GSAP wipe later).
 */
export default function BladeNightPage() {
  return (
    <main
      className="relative bg-[oklch(0.1_0.01_260)] text-[oklch(0.94_0.01_95)]"
      style={{ fontFamily: 'Manrope, sans-serif' }}
    >
      <Link
        to="/"
        className="fixed top-8 right-5 z-50 text-[0.65rem] tracking-[0.16em] text-[color-mix(in_oklch,white_55%,transparent)] uppercase underline-offset-4 hover:text-white hover:underline sm:right-8 lg:right-12"
      >
        Hub
      </Link>

      <div data-scroll="diagonal-cut" className="relative">
        <Hero />
        <SceneHeat />
        <ScenePlay />
        <SceneStage />
        <SceneHush />
        {/* Trailing scroll room so the final sticky hush can release */}
        <div aria-hidden className="h-[40vh] bg-[oklch(0.08_0.01_40)]" />
      </div>
    </main>
  )
}
