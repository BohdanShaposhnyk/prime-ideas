import { useEffect, useRef, useState } from 'react'
import { AXIS_BIAS, AXIS_LOCK_MS, EDGE_SLOP, LINE_PX, SNAP_RESTORE_MS, WHEEL_DEAD } from './config'

/**
 * Horizontal review row. Tracks which end is in view, and sends a vertical
 * wheel to the snap port. The row never receives that wheel, so without this
 * the page would stay put. Snap stays off for the gesture, and travel stops
 * at the neighboring scene.
 */
export function useReviewRow(reduced: boolean) {
  const scrollerRef = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: true })

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const read = () => {
      const max = el.scrollWidth - el.clientWidth
      setEdges({
        start: el.scrollLeft <= EDGE_SLOP,
        end: max <= EDGE_SLOP || el.scrollLeft >= max - EDGE_SLOP,
      })
    }
    read()
    el.addEventListener('scroll', read, { passive: true })
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', read)
      ro.disconnect()
    }
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let axis: 'x' | 'y' | '' = ''
    let axisAt = 0
    let origin = -1
    let restore = 0
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      let dx = event.deltaX
      let dy = event.deltaY
      if (event.shiftKey && Math.abs(dx) < Math.abs(dy)) {
        dx = dy
        dy = 0
      }
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)
      if (absX < WHEEL_DEAD && absY < WHEEL_DEAD) return
      const now = performance.now()
      if (!axis || now - axisAt > AXIS_LOCK_MS) axis = absX > absY * AXIS_BIAS ? 'x' : 'y'
      axisAt = now
      if (axis === 'x') return
      const port = el.closest('[data-cs-scroll]')
      if (!(port instanceof HTMLElement)) return
      event.preventDefault()
      const unit = event.deltaMode === 1 ? LINE_PX : event.deltaMode === 2 ? port.clientHeight : 1
      if (origin < 0) origin = port.scrollTop
      port.style.scrollSnapType = 'none'
      const next = port.scrollTop + dy * unit
      const limit = port.clientHeight
      port.scrollTop = Math.min(origin + limit, Math.max(origin - limit, next))
      window.clearTimeout(restore)
      restore = window.setTimeout(() => {
        origin = -1
        axis = ''
        port.style.scrollSnapType = ''
      }, SNAP_RESTORE_MS)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.clearTimeout(restore)
      el.removeEventListener('wheel', onWheel)
      const port = el.closest('[data-cs-scroll]')
      if (port instanceof HTMLElement) port.style.scrollSnapType = ''
    }
  }, [])

  const move = (dir: -1 | 1) => {
    const el = scrollerRef.current
    const card = el?.querySelector('li')
    if (!el || !card) return
    const gap = Number.parseFloat(getComputedStyle(el).columnGap)
    const distance = card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0)
    el.scrollBy({ left: dir * distance, behavior: reduced ? 'auto' : 'smooth' })
  }

  return { scrollerRef, edges, move }
}
