import { useEffect, useRef, useState, type RefObject } from 'react'

/**
 * Track whether a node intersects the viewport.
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
    const io = new IntersectionObserver(
      ([entry]) => {
        const hit = Boolean(entry?.isIntersecting)
        if (!hit) {
          if (!once) setInView(false)
          return
        }
        setInView(true)
        if (once) io.disconnect()
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, threshold, rootMargin])

  return [ref, inView]
}
