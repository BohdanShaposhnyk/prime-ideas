import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import './styles/charge-split.css'

import { lazy, Suspense, useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'
import HeroV2 from './sections/hero'
import Zones from './sections/zones'
import LazyScene from './components/lazy-scene'
import { SiteHeader } from './components/site-header'
import { usePrefersReducedMotion } from './hooks/media'
import { cssTokens } from './lib/palette'
import { bindTouchSnap } from './lib/touch-snap'

const Offers = lazy(() => import('./sections/offers'))
const Atmosphere = lazy(() => import('./sections/atmosphere'))
const SceneEvents = lazy(() => import('./sections/scene-events'))
const Locations = lazy(() => import('./sections/locations'))
const SceneReviews = lazy(() => import('./sections/scene-reviews'))
const SceneQuestions = lazy(() => import('./sections/scene-questions'))
const SceneApp = lazy(() => import('./sections/scene-app'))
const SceneBasement = lazy(() => import('./sections/scene-basement'))

const scenes: { key: string; id?: string; minHeight?: string; node: ReactNode }[] = [
  { key: 'offers', id: 'cs-nav-offers', node: <Offers /> },
  { key: 'events', node: <SceneEvents /> },
  { key: 'locations', id: 'cs-nav-addresses', node: <Locations /> },
  { key: 'reviews', id: 'cs-nav-reviews', node: <SceneReviews /> },
  { key: 'questions', id: 'cs-nav-questions', node: <SceneQuestions /> },
  { key: 'atmosphere', node: <Atmosphere /> },
  { key: 'app', id: 'cs-nav-app', node: <SceneApp /> },
  { key: 'basement', id: 'cs-nav-contact', node: <SceneBasement /> },
]

/**
 * Snap lives on a viewport-sized port, not the document.
 * Scene height is the port's clientHeight, so iOS cannot undershoot by the URL bar.
 * One-screen scenes use scroll-snap-stop: always. Zone cards are shorter stops.
 * Touch eases to one stop in either direction. Mouse and trackpad stay on CSS snap.
 * Zones follows the hero and stays mounted, so its card stops exist before the
 * first flick. Offers snaps straight to events.
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
 * Charge Split — 50/50 charge cell, book lockup, zones list, offers split, atmosphere masonry.
 * Zones is the services list: play zone through hookah.
 * Addresses in the nav opens locations. Reviews in the nav opens the strip that follows it.
 * Questions in the nav opens the list after reviews.
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
        <Zones />
        {scenes.map((scene) => (
          <LazyScene key={scene.key} id={scene.id} minHeight={scene.minHeight}>
            <Suspense fallback={null}>{scene.node}</Suspense>
          </LazyScene>
        ))}
      </div>
    </main>
  )
}
