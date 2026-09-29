import { useCallback, useSyncExternalStore } from 'react'
import { prefersReducedMotion, subscribeReducedMotion } from '@/shared/lib/motion'

const COARSE_QUERY = '(pointer: coarse)'

function matchQuery(query: string): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia(query).matches
}

function getServerSnapshot() {
  return false
}

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return () => {}
    }
    const mq = window.matchMedia(query)
    mq.addEventListener('change', onStoreChange)
    return () => mq.removeEventListener('change', onStoreChange)
  }, [query])

  const getSnapshot = useCallback(() => matchQuery(query), [query])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** True on phones / touch-primary devices (SSR-safe). */
export function isCoarsePointer(): boolean {
  return matchQuery(COARSE_QUERY)
}

export function useCoarsePointer(): boolean {
  return useMediaQuery(COARSE_QUERY)
}

function subscribeReduced(onStoreChange: () => void) {
  return subscribeReducedMotion(() => onStoreChange())
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduced, prefersReducedMotion, getServerSnapshot)
}
