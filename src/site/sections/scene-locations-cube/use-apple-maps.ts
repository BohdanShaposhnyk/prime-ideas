import { useSyncExternalStore } from 'react'

function appleMapsDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua)) return true
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true
  return /Macintosh|Mac OS X/.test(ua)
}

function subscribeAppleMaps() {
  return () => {}
}

/** Apple devices get Apple Maps. Everything else gets a keyless Google embed. */
export function useAppleMaps() {
  return useSyncExternalStore(subscribeAppleMaps, appleMapsDevice, () => false)
}
