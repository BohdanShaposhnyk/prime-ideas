import '@fontsource/bebas-neue/400.css'
import '@fontsource/barlow/400.css'
import '@fontsource/barlow/500.css'
import '@fontsource/barlow/600.css'

import { useEffect, useRef, type CSSProperties, type RefObject } from 'react'
import { Link } from '@tanstack/react-router'
import { gsap } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import Hero from './sections/hero'
import SceneBook from './sections/scene-book'
import ScenePlay from './sections/scene-play'
import SceneScreen from './sections/scene-screen'
import SceneShowcase from './sections/scene-showcase'

const tokens = {
  '--cs-pitch': '#000000',
  '--cs-blue': '#0A2478',
  '--cs-navy': '#071A52',
  '--cs-ice': '#F4F7FF',
  '--cs-caption': '#A9BBE0',
  '--cs-void': '#0C0E14',
  '--cs-well': '#161A24',
  '--cs-display': '"Bebas Neue", sans-serif',
  '--cs-body': '"Barlow", sans-serif',
} as CSSProperties

const SETTLE_IDLE_MS = 110
const SPIRAL_FREE_PAD = 0.16

/** Settle to the nearest full section after a pause — skip inside the spiral. */
function useSectionSnap(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const proxy = { y: 0 }
    let idle = 0
    let tween: gsap.core.Tween | null = null

    const stopTween = () => {
      if (!tween) return
      tween.kill()
      tween = null
    }

    const targets = () =>
      [...root.querySelectorAll<HTMLElement>('[data-scene]')].map((el) => ({
        name: el.dataset.scene ?? '',
        top: Math.round(el.getBoundingClientRect().top + window.scrollY),
        height: el.offsetHeight,
      }))

    const settle = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      const scenes = targets()
      const showcase = scenes.find((scene) => scene.name === 'showcase')
      if (showcase) {
        const freeFrom = showcase.top + vh * SPIRAL_FREE_PAD
        const freeTo = showcase.top + showcase.height - vh * SPIRAL_FREE_PAD
        if (y > freeFrom && y < freeTo) return
      }

      let nearest = scenes[0]?.top ?? 0
      let dist = Math.abs(y - nearest)
      for (const scene of scenes) {
        const d = Math.abs(y - scene.top)
        if (d < dist) {
          dist = d
          nearest = scene.top
        }
      }

      const maxY = Math.max(document.documentElement.scrollHeight - vh, 0)
      nearest = Math.round(Math.min(Math.max(nearest, 0), maxY))
      if (dist < 8) return

      stopTween()
      proxy.y = y
      tween = gsap.to(proxy, {
        y: nearest,
        duration: gsap.utils.clamp(0.16, 0.3, (dist / vh) * 0.42),
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => {
          window.scrollTo(0, proxy.y)
        },
        onComplete: () => {
          tween = null
        },
      })
    }

    const bump = () => {
      if (tween) return
      window.clearTimeout(idle)
      idle = window.setTimeout(settle, SETTLE_IDLE_MS)
    }

    const interrupt = () => {
      stopTween()
      window.clearTimeout(idle)
      idle = window.setTimeout(settle, SETTLE_IDLE_MS)
    }

    window.addEventListener('scroll', bump, { passive: true })
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchstart', interrupt, { passive: true })
    window.addEventListener('keydown', interrupt)

    return () => {
      window.clearTimeout(idle)
      stopTween()
      window.removeEventListener('scroll', bump)
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchstart', interrupt)
      window.removeEventListener('keydown', interrupt)
    }
  }, [rootRef])
}

/**
 * Charge Split — 50/50 charge cell, book lockup, play carousel, screen masonry, showcase spiral.
 * Split-hold pin / pane recut live later in motion/.
 */
export default function ChargeSplitPage() {
  const rootRef = useRef<HTMLElement>(null)
  useSectionSnap(rootRef)

  return (
    <main
      ref={rootRef}
      className="bg-[var(--cs-pitch)] text-[var(--cs-ice)]"
      style={{
        ...tokens,
        fontFamily: '"Barlow", sans-serif',
      }}
    >
      <Link
        to="/lab"
        className="fixed top-4 right-4 z-50 font-[family-name:var(--cs-body)] text-[0.62rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--cs-ice)_70%,transparent)] uppercase underline-offset-4 hover:text-[var(--cs-ice)] hover:underline focus-visible:text-[var(--cs-ice)] focus-visible:underline focus-visible:outline-none sm:right-6"
      >
        Hub
      </Link>
      <Hero />
      <SceneBook />
      <ScenePlay />
      <SceneScreen />
      <SceneShowcase />
    </main>
  )
}
