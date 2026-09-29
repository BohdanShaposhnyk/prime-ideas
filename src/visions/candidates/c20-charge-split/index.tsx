import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import './charge-split.css'

import { useEffect, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import HeroV2 from './sections/hero'
import SceneOverview from './sections/scene-overview'
import SceneExperienceV2 from './sections/scene-experience-v2'
import SceneScreen from './sections/scene-screen'
import SceneShowcase, { SHOWCASE_MIN_HEIGHT } from './sections/scene-showcase'
import SceneLocations from './sections/scene-locations'
import SceneApp from './sections/scene-app'
import SceneFranchiseV2 from './sections/scene-franchise-v2'
import SceneBasement from './sections/scene-basement'
import LazyScene from './lazy-scene'
import { usePrefersReducedMotion } from './media'
import { cssTokens } from './palette'

const scenes: { key: string; minHeight?: string; node: ReactNode }[] = [
  { key: 'experience', node: <SceneExperienceV2 /> },
  { key: 'showcase', minHeight: SHOWCASE_MIN_HEIGHT, node: <SceneShowcase /> },
  { key: 'screen', node: <SceneScreen /> },
  { key: 'locations', node: <SceneLocations /> },
  { key: 'app', node: <SceneApp /> },
  { key: 'franchise', node: <SceneFranchiseV2 /> },
  { key: 'basement', node: <SceneBasement /> },
]

/**
 * Document scrollport snap for this candidate only.
 * Tall scenes (overview / showcase) keep align-start so the UA can free-scroll
 * inside oversized snap areas; 1vh scenes use scroll-snap-stop: always.
 * Coarse / iOS: snap off — WebKit undershoots 100dvh scenes by the URL-bar delta.
 */
function useDocumentSnap() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const root = document.documentElement
    root.classList.add('cs-snap')
    return () => {
      root.classList.remove('cs-snap')
    }
  }, [reduced])
}

/**
 * Charge Split — 50/50 charge cell, book lockup, overview carousel, experience split, screen masonry, showcase spiral.
 * Split-hold pin / pane recut live later in motion/.
 */
export default function ChargeSplitPage() {
  useDocumentSnap()

  return (
    <main
      className="bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
      style={{
        ...cssTokens,
        fontFamily: 'var(--cs-body)',
      }}
    >
      {/* Standalone build (`--mode c20`) has no router, so the hub link must not render. */}
      {import.meta.env.MODE !== 'c20' && (
        <Link
          to="/lab"
          className="fixed top-4 right-4 z-50 font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[var(--cs-track-micro)] text-[color-mix(in_srgb,var(--cs-ice)_70%,transparent)] uppercase underline-offset-4 hover:text-[var(--cs-ice)] hover:underline focus-visible:text-[var(--cs-ice)] focus-visible:underline focus-visible:outline-none sm:right-6"
        >
          Hub
        </Link>
      )}
      <HeroV2 />
      <SceneOverview />
      {scenes.map((scene) => (
        <LazyScene key={scene.key} minHeight={scene.minHeight}>
          {scene.node}
        </LazyScene>
      ))}
    </main>
  )
}
