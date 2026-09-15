const QUERY = '(prefers-reduced-motion: reduce)'

/** True when the user prefers reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia(QUERY).matches
}

/** Subscribe to prefers-reduced-motion changes. Returns an unsubscribe. */
export function subscribeReducedMotion(
  listener: (reduced: boolean) => void,
): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {}
  }
  const mql = window.matchMedia(QUERY)
  const handler = () => {
    listener(mql.matches)
  }
  mql.addEventListener('change', handler)
  return () => {
    mql.removeEventListener('change', handler)
  }
}
