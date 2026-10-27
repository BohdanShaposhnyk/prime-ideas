import { useEffect, type RefObject } from 'react'
import { clamp01 } from '@/site/lib/math'

/** Past this, the scene is far enough that its copy should ignore the pointer. */
export const PARALLAX_AWAY = 0.84

/** Front-loaded so the zoom and the type lift read while the scene is still on screen. */
export function frontLoad(raw: number) {
  return 1 - (1 - raw) ** 1.55
}

/** One rAF per scroll or resize on the snap port. Returns nothing when the port is missing. */
export function bindPortScrub(root: HTMLElement, apply: () => void) {
  const port = root.closest<HTMLElement>('[data-cs-scroll]')
  if (!port) return

  let raf = 0
  const frame = () => {
    raf = 0
    apply()
  }
  const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(frame)
  }

  frame()
  port.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  return () => {
    cancelAnimationFrame(raf)
    port.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  }
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
    if (!root) return

    const apply = () => {
      const port = root.closest<HTMLElement>('[data-cs-scroll]')
      if (!port) return
      const portTop = port.getBoundingClientRect().top
      const top = root.getBoundingClientRect().top - portTop
      const travel = root.offsetHeight || 1
      const enter = frontLoad(clamp01(top / travel))
      const leave = frontLoad(clamp01(-top / travel))
      root.style.setProperty('--cs-in', enter.toFixed(4))
      root.style.setProperty('--cs-out', leave.toFixed(4))
      if (enter > PARALLAX_AWAY || leave > PARALLAX_AWAY) root.dataset.csAway = '1'
      else delete root.dataset.csAway
    }

    const unbind = bindPortScrub(root, apply)
    return () => {
      unbind?.()
      root.style.removeProperty('--cs-in')
      root.style.removeProperty('--cs-out')
      delete root.dataset.csAway
    }
  }, [enabled, rootRef])
}
