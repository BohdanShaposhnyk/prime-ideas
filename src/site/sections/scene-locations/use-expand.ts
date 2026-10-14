import { useLayoutEffect, useState, type RefObject } from 'react'
import { BASE_EXPAND, expandRatioFor, galleryWidthOf } from './layout'

export function useExpandRatio(sectionRef: RefObject<HTMLElement | null>) {
  const [expandRatio, setExpandRatio] = useState(BASE_EXPAND)

  useLayoutEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const apply = () => {
      const next = expandRatioFor(galleryWidthOf(el))
      setExpandRatio((prev) => (Math.abs(prev - next) < 0.005 ? prev : next))
    }
    apply()
    const ro = new ResizeObserver(apply)
    ro.observe(el)
    return () => ro.disconnect()
  }, [sectionRef])

  return expandRatio
}
