import { useEffect, useState, type RefObject } from 'react'
import { ACTIVE_TOP_MAX, ACTIVE_TOP_MIN } from './config'

export function useScreenActive(sectionRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const port = el.closest<HTMLElement>('[data-cs-scroll]')
    const scroller: EventTarget = port ?? window

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = port?.clientHeight || window.innerHeight || 1
      const t = rect.top / vh
      setActive(t > ACTIVE_TOP_MIN && t < ACTIVE_TOP_MAX)
    }
    const bump = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    scroller.addEventListener('scroll', bump, { passive: true })
    window.addEventListener('resize', bump)
    return () => {
      scroller.removeEventListener('scroll', bump)
      window.removeEventListener('resize', bump)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sectionRef])

  return active
}
