import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import './styles/charge-split.css'

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'
import HeroV2 from './sections/hero'
import SceneOverview from './sections/scene-overview'
import SceneExperienceV2 from './sections/scene-experience-v2'
import SceneScreen from './sections/scene-screen'
import SceneShowcase, { SHOWCASE_MIN_HEIGHT } from './sections/scene-showcase'
import SceneLocations from './sections/scene-locations'
import SceneApp from './sections/scene-app'
import SceneFranchiseV2 from './sections/scene-franchise-v2'
import SceneBasement from './sections/scene-basement'
import LazyScene from './components/lazy-scene'
import { usePrefersReducedMotion } from './hooks/media'
import { cssTokens } from './lib/palette'
import { bindTouchSnap } from './lib/touch-snap'

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
 * Snap lives on a viewport-sized port, not the document.
 * Scene height is the port's clientHeight, so iOS cannot undershoot by the URL bar.
 * One-screen scenes use scroll-snap-stop: always. Showcase cards are shorter stops.
 * Touch eases to one stop in either direction. Mouse and trackpad stay on CSS snap.
 * Overview is one screen. Its expand plays after the flick settles, so the hero
 * exit parallax is not sharing frames with the clip.
 */
function useSnapPort(portRef: RefObject<HTMLDivElement | null>) {
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const html = document.documentElement
    const port = portRef.current
    html.classList.add('cs-snap-root')
    if (port && !reduced) port.classList.add('cs-snap')
    else port?.classList.remove('cs-snap')

    const measure = () => {
      const el = portRef.current
      if (!el) return
      const h = el.clientHeight
      if (h > 0) el.style.setProperty('--cs-h', `${Math.round(h)}px`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (port) ro.observe(port)
    window.addEventListener('orientationchange', measure)

    const unbindTouch = port && !reduced ? bindTouchSnap(port) : null

    return () => {
      unbindTouch?.()
      html.classList.remove('cs-snap-root')
      port?.classList.remove('cs-snap')
      port?.classList.remove('cs-snap-coast')
      ro.disconnect()
      window.removeEventListener('orientationchange', measure)
    }
  }, [reduced, portRef])
}

/**
 * Charge Split — 50/50 charge cell, book lockup, overview carousel, experience split, screen masonry, showcase spiral.
 * Split-hold pin / pane recut live later in motion/.
 */
export default function ChargeSplitPage() {
  const portRef = useRef<HTMLDivElement>(null)
  useSnapPort(portRef)

  return (
    <main
      className="bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
      style={{
        ...cssTokens,
        fontFamily: 'var(--cs-body)',
      }}
    >
      <div ref={portRef} data-cs-scroll="" className="cs-snap-port">
        <HeroV2 />
        <SceneOverview />
        {scenes.map((scene) => (
          <LazyScene key={scene.key} minHeight={scene.minHeight}>
            {scene.node}
          </LazyScene>
        ))}
      </div>
    </main>
  )
}
