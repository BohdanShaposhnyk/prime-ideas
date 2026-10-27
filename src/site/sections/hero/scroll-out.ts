import { useEffect, type RefObject } from 'react'
import { bindPortScrub, frontLoad, PARALLAX_AWAY } from '@/site/hooks/scene-parallax'
import { clamp01 } from '@/site/lib/math'

/**
 * Scroll-out parallax. Leaving the hero scrubs `--cs-out` from 0 to 1
 * across the one screen of travel, front-loaded so the zoom reads on the way out.
 */
export function useHeroScrollOut(rootRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    if (!root) return

    const apply = () => {
      const port = root.closest<HTMLElement>('[data-cs-scroll]')
      if (!port) return
      const frame = root.querySelector<HTMLElement>('[data-hero-frame]')
      const portTop = port.getBoundingClientRect().top
      const top = root.getBoundingClientRect().top - portTop
      const travel = root.offsetHeight || 1
      const p = frontLoad(clamp01(-top / travel))
      const host = frame ?? root
      host.style.setProperty('--cs-out', p.toFixed(4))
      if (p > PARALLAX_AWAY) host.dataset.heroOut = '1'
      else delete host.dataset.heroOut
    }

    const unbind = bindPortScrub(root, apply)
    return () => {
      unbind?.()
      const frame = root.querySelector<HTMLElement>('[data-hero-frame]')
      const host = frame ?? root
      host.style.removeProperty('--cs-out')
      delete host.dataset.heroOut
    }
  }, [enabled, rootRef])
}
