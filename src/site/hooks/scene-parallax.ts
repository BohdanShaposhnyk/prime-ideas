import { useEffect, type RefObject } from 'react'
import { clamp01 } from '@/site/lib/math'

/** Front-loaded so the zoom and the type lift read while the scene is still on screen. */
function shape(raw: number) {
  return 1 - (1 - raw) ** 1.55
}

/**
 * Enter and leave parallax. One screen of travel scrubs `--cs-in` while the
 * scene rises into the port, and `--cs-out` while it leaves. Same curve as
 * the hero scroll-out.
 */
export function useSceneParallax<T extends HTMLElement>(rootRef: RefObject<T | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    const port = root?.closest<HTMLElement>('[data-cs-scroll]')
    if (!root || !port) return

    let raf = 0
    const apply = () => {
      raf = 0
      const portTop = port.getBoundingClientRect().top
      const top = root.getBoundingClientRect().top - portTop
      const travel = root.offsetHeight || 1
      const enter = shape(clamp01(top / travel))
      const leave = shape(clamp01(-top / travel))
      root.style.setProperty('--cs-in', enter.toFixed(4))
      root.style.setProperty('--cs-out', leave.toFixed(4))
      if (enter > 0.84 || leave > 0.84) root.dataset.csAway = '1'
      else delete root.dataset.csAway
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
      root.style.removeProperty('--cs-in')
      root.style.removeProperty('--cs-out')
      delete root.dataset.csAway
    }
  }, [enabled, rootRef])
}
