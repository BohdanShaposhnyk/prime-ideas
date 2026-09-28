import { useSyncExternalStore } from 'react'

const QUERY = '(pointer: coarse)'

/** True on phones / touch-primary devices (SSR-safe). */
export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia(QUERY).matches
}

export function useCoarsePointer(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {}
      }
      const mq = window.matchMedia(QUERY)
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    isCoarsePointer,
    () => false,
  )
}
