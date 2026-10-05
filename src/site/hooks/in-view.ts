import { useEffect, useRef, useState, type RefObject } from 'react'
import { observeSnapPort } from './snap-in-view'

/**
 * Track whether a node sits inside the snap port.
 * `once` latches true and disconnects. Otherwise the flag follows the observer.
 */
export function useInView<T extends Element>(
  options: { once?: boolean; threshold?: number; rootMargin?: string } = {},
): readonly [RefObject<T | null>, boolean] {
  const { once = false, threshold = 0, rootMargin } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let stop = () => {}
    stop = observeSnapPort(
      el,
      (hit) => {
        if (!hit) {
          if (!once) setInView(false)
          return
        }
        setInView(true)
        if (once) stop()
      },
      { threshold, rootMargin },
    )
    return () => stop()
  }, [once, threshold, rootMargin])

  return [ref, inView]
}
