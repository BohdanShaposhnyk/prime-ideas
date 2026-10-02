import { useEffect, type RefObject } from 'react'

function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n
}

/** Front-loaded so the zoom and type lift read while the hero is still on screen. */
function shape(raw: number) {
  return 1 - (1 - raw) ** 1.55
}

/**
 * Scroll-out parallax. Leaving the hero scrubs `--cs-out` from 0 to 1
 * across the one screen of travel, front-loaded so the zoom reads on the way out.
 */
export function useHeroScrollOut(rootRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    const port = root?.closest<HTMLElement>('[data-cs-scroll]')
    if (!root || !port) return

    let raf = 0
    const apply = () => {
      raf = 0
      const frame = root.querySelector<HTMLElement>('[data-hero-frame]')
      const portTop = port.getBoundingClientRect().top
      const top = root.getBoundingClientRect().top - portTop
      const travel = root.offsetHeight || 1
      const p = shape(clamp01(-top / travel))
      const host = frame ?? root
      host.style.setProperty('--cs-out', p.toFixed(4))
      if (p > 0.84) host.dataset.heroOut = '1'
      else delete host.dataset.heroOut
    }

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(apply)
    }

    apply()
    port.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      port.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      const frame = root.querySelector<HTMLElement>('[data-hero-frame]')
      const host = frame ?? root
      host.style.removeProperty('--cs-out')
      delete host.dataset.heroOut
    }
  }, [enabled, rootRef])
}
