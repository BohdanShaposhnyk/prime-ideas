import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'
import './styles/charge-split.css'

import { useLayoutEffect, useRef, type ReactNode, type RefObject } from 'react'
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
import LazyScene from './components/lazy-scene'
import { usePrefersReducedMotion } from './hooks/media'
import { cssTokens } from './lib/palette'

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
 * Tall scenes (overview / showcase) keep align-start so the UA can free-scroll
 * inside oversized snap areas; 1-screen scenes use scroll-snap-stop: always.
 * Scene height is the port's clientHeight, so iOS cannot undershoot by the URL bar.
 * iOS WebKit shortens flicks under mandatory snap. While a tall scene covers the
 * port, snap is lifted so the flick can travel. A downward overshoot stops on the
 * last frame; upward scroll is left alone so the previous scene stays reachable.
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

    const unbindCoast = port && !reduced && isIosWebKit() ? bindIosTallCoast(port) : null

    return () => {
      unbindCoast?.()
      html.classList.remove('cs-snap-root')
      port?.classList.remove('cs-snap')
      port?.classList.remove('cs-snap-coast')
      ro.disconnect()
      window.removeEventListener('orientationchange', measure)
    }
  }, [reduced, portRef])
}

/** iPhone, iPod, iPad, and iPadOS desktop UA. Android / desktop stay on mandatory snap. */
function isIosWebKit() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPad|iPhone|iPod/.test(ua)) return true
  return navigator.maxTouchPoints > 1 && /Macintosh/.test(ua) && /AppleWebKit/.test(ua) && !/Chrome|CriOS|FxiOS/.test(ua)
}

const TALL_SCENE = '[data-scene="overview"], [data-scene="showcase"]'

type TallBand = { el: HTMLElement; top: number; end: number }

function tallBands(port: HTMLElement): TallBand[] {
  const height = port.clientHeight
  if (height <= 0) return []
  const portTop = port.getBoundingClientRect().top
  const scrollTop = port.scrollTop
  return [...port.querySelectorAll<HTMLElement>(TALL_SCENE)].flatMap((el) => {
    const top = el.getBoundingClientRect().top - portTop + scrollTop
    const end = top + el.offsetHeight - height
    if (end <= top + 1) return []
    return [{ el, top, end }]
  })
}

function bandCovering(bands: TallBand[], scrollTop: number) {
  return bands.find((band) => scrollTop >= band.top - 1 && scrollTop < band.end - 1) ?? null
}

/**
 * Drops mandatory snap only while overview / showcase still fill the port.
 * Downward momentum that would leave is stopped on the last frame so the next
 * gesture snaps one screen. Upward scroll is never rewritten.
 */
function bindIosTallCoast(port: HTMLElement) {
  let origin: HTMLElement | null = null
  let latched: HTMLElement | null = null
  let coastLatch = false
  let lastY = port.scrollTop
  let touching = false
  let quiet = 0

  const remember = (scrollTop: number) => {
    const covering = bandCovering(tallBands(port), scrollTop)
    if (covering) latched = covering.el
    return covering
  }

  const syncCoast = () => {
    const covering = remember(port.scrollTop) !== null
    port.classList.toggle('cs-snap-coast', covering)
    if (!covering) latched = null
  }

  const releaseCoast = () => {
    origin = null
    latched = null
    coastLatch = false
    port.classList.remove('cs-snap-coast')
  }

  const releaseOrigin = () => {
    if (touching) return
    origin = null
    coastLatch = false
    syncCoast()
  }

  const scheduleRelease = () => {
    window.clearTimeout(quiet)
    quiet = window.setTimeout(releaseOrigin, 400)
  }

  const onPointerDown = () => {
    touching = true
    window.clearTimeout(quiet)
    const band = bandCovering(tallBands(port), port.scrollTop)
    if (!band) {
      releaseCoast()
      return
    }
    port.classList.add('cs-snap-coast')
    latched = band.el
    coastLatch = true
    origin = band.el
  }

  const onPointerUp = () => {
    touching = false
    scheduleRelease()
  }

  const onScrollEnd = () => {
    if (touching) return
    window.clearTimeout(quiet)
    releaseOrigin()
  }

  const onScroll = () => {
    const startY = lastY
    if (origin || port.classList.contains('cs-snap-coast')) coastLatch = true
    if (!coastLatch) {
      lastY = port.scrollTop
      scheduleRelease()
      return
    }
    const bandEl = origin ?? latched
    if (bandEl) {
      const band = tallBands(port).find((item) => item.el === bandEl)
      const y = port.scrollTop
      if (!band) {
        releaseCoast()
      } else if (y < band.top - 1) {
        releaseCoast()
      } else if (y > band.end + 1 && y > startY) {
        port.scrollTop = band.end
      }
    }
    const covering = coastLatch ? bandCovering(tallBands(port), port.scrollTop) : null
    if (covering && coastLatch) {
      latched = covering.el
      port.classList.add('cs-snap-coast')
    } else if (!covering) {
      port.classList.remove('cs-snap-coast')
    }
    lastY = port.scrollTop
    scheduleRelease()
  }

  syncCoast()
  port.addEventListener('pointerdown', onPointerDown, { passive: true })
  port.addEventListener('scroll', onScroll, { passive: true })
  port.addEventListener('scrollend', onScrollEnd)
  window.addEventListener('pointerup', onPointerUp, { passive: true })
  window.addEventListener('pointercancel', onPointerUp, { passive: true })

  return () => {
    window.clearTimeout(quiet)
    port.classList.remove('cs-snap-coast')
    port.removeEventListener('pointerdown', onPointerDown)
    port.removeEventListener('scroll', onScroll)
    port.removeEventListener('scrollend', onScrollEnd)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }
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
      {/* Standalone build (`--mode c20`) has no router, so the hub link must not render. */}
      {import.meta.env.MODE !== 'c20' && (
        <Link
          to="/lab"
          className="fixed top-4 right-4 z-50 font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[var(--cs-track-micro)] text-[color-mix(in_srgb,var(--cs-ice)_70%,transparent)] uppercase underline-offset-4 hover:text-[var(--cs-ice)] hover:underline focus-visible:text-[var(--cs-ice)] focus-visible:underline focus-visible:outline-none sm:right-6"
        >
          Hub
        </Link>
      )}
    </main>
  )
}
