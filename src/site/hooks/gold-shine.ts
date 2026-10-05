import { useEffect, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from './media'
import { observeSnapPort } from './snap-in-view'

/**
 * Gold sheen is a CSS background sweep. It is attached only while the node
 * sits inside the snap port, so off-screen headings do not paint every frame.
 */
export function useGoldShine(ref: RefObject<Element | null>) {
  const reduced = usePrefersReducedMotion()
  const [live, setLive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    return observeSnapPort(el, setLive)
  }, [reduced, ref])

  return !reduced && live
}
