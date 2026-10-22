import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import './styles/charge-split.css'

import { lazy, Suspense, useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'
import HeroV2 from './sections/hero'
import SceneShowcase from './sections/scene-showcase'
import LazyScene from './components/lazy-scene'
import { SiteHeader } from './components/site-header'
import { usePrefersReducedMotion } from './hooks/media'
import { cssTokens } from './lib/palette'
import { bindTouchSnap } from './lib/touch-snap'

const SceneExperienceV2 = lazy(() => import('./sections/scene-experience-v2'))
// Parked. The night carousel stays in scene-overview until it comes back.
// const SceneOverview = lazy(() => import('./sections/scene-overview'))
const SceneScreen = lazy(() => import('./sections/scene-screen'))
const SceneEvents = lazy(() => import('./sections/scene-events'))
const SceneLocations = lazy(() => import('./sections/scene-locations'))
const SceneApp = lazy(() => import('./sections/scene-app'))
// Parked. Franchise is a mailto in the basement until this scene comes back.
// const SceneFranchiseV2 = lazy(() => import('./sections/scene-franchise-v2'))
const SceneBasement = lazy(() => import('./sections/scene-basement'))

const scenes: { key: string; id?: string; minHeight?: string; node: ReactNode }[] = [
  { key: 'experience', id: 'cs-nav-experience', node: <SceneExperienceV2 /> },
  // { key: 'overview', id: 'cs-nav-night', node: <SceneOverview /> },
  { key: 'screen', node: <SceneScreen /> },
  { key: 'events', node: <SceneEvents /> },
  { key: 'locations', id: 'cs-nav-addresses', node: <SceneLocations /> },
  { key: 'app', id: 'cs-nav-app', node: <SceneApp /> },
  // { key: 'franchise', id: 'cs-nav-franchise', node: <SceneFranchiseV2 /> },
  { key: 'basement', id: 'cs-nav-contact', node: <SceneBasement /> },
]

/**
 * Snap lives on a viewport-sized port, not the document.
 * Scene height is the port's clientHeight, so iOS cannot undershoot by the URL bar.
 * One-screen scenes use scroll-snap-stop: always. Showcase cards are shorter stops.
 * Touch eases to one stop in either direction. Mouse and trackpad stay on CSS snap.
 * Showcase follows the hero and stays mounted, so its card stops exist before the
 * first flick. The night carousel is parked, so experience snaps straight to screen.
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
 * Charge Split — 50/50 charge cell, book lockup, zones list, experience split, screen masonry.
 * Zones is the services list in scene-showcase: play zone through hookah.
 * The night carousel and the franchise scene stay commented out above.
 * Franchise is a mailto in the basement.
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
      <SiteHeader portRef={portRef} />
      <div ref={portRef} data-cs-scroll="" className="cs-snap-port">
        <HeroV2 />
        <SceneShowcase />
        {scenes.map((scene) => (
          <LazyScene key={scene.key} id={scene.id} minHeight={scene.minHeight}>
            <Suspense fallback={null}>{scene.node}</Suspense>
          </LazyScene>
        ))}
      </div>
    </main>
  )
}
