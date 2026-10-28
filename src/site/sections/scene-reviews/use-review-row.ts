import { useEffect, useRef, useState } from 'react'
import { AXIS_BIAS, AXIS_LOCK_MS, EDGE_SLOP, LINE_PX, SNAP_RESTORE_MS, WHEEL_DEAD } from './config'

/** Same distance as the page touch snap. A shorter move is a tap. */
const TOUCH_SLOP = 16

/**
 * Horizontal review row. Tracks which end is in view, and sends a vertical
 * wheel to the snap port. The row never receives that wheel, so without this
 * the page would stay put. Snap stays off for the gesture, and travel stops
 * at the neighboring scene.
 * A sideways finger moves the cards. An upright finger stays with the page.
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

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let pointerId = -1
    let startX = 0
    let startY = 0
    let originLeft = 0
    let axis: '' | 'x' | 'y' = ''
    let dragged = false

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch' || !event.isPrimary) return
      pointerId = event.pointerId
      startX = event.clientX
      startY = event.clientY
      originLeft = el.scrollLeft
      axis = ''
      dragged = false
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      const dx = event.clientX - startX
      const dy = event.clientY - startY
      if (!axis) {
        if (Math.abs(dx) < TOUCH_SLOP && Math.abs(dy) < TOUCH_SLOP) return
        axis = Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y'
        if (axis !== 'x') return
        el.style.scrollSnapType = 'none'
      }
      if (axis !== 'x') return
      dragged = true
      const max = Math.max(0, el.scrollWidth - el.clientWidth)
      el.scrollLeft = Math.min(max, Math.max(0, originLeft - dx))
    }

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return
      pointerId = -1
      if (axis !== 'x') {
        axis = ''
        return
      }
      axis = ''
      el.style.scrollSnapType = ''
      const step = cardDistance(el)
      const max = Math.max(0, el.scrollWidth - el.clientWidth)
      const left = step > 0 ? Math.round(el.scrollLeft / step) * step : 0
      el.scrollTo({ left: Math.min(max, Math.max(0, left)), behavior: reduced ? 'auto' : 'smooth' })
    }

    const onTouchMove = (event: TouchEvent) => {
      if (axis !== 'x' || !event.cancelable) return
      event.preventDefault()
    }

    const onClick = (event: MouseEvent) => {
      if (!dragged) return
      dragged = false
      event.preventDefault()
      event.stopPropagation()
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('touchmove', onTouchMove, { passive: false })
    el.addEventListener('click', onClick, true)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    return () => {
      el.style.scrollSnapType = ''
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('click', onClick, true)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [reduced])

  const move = (dir: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const distance = cardDistance(el)
    if (distance <= 0) return
    el.scrollBy({ left: dir * distance, behavior: reduced ? 'auto' : 'smooth' })
  }

  return { scrollerRef, edges, move }
}

function cardDistance(el: HTMLElement) {
  const card = el.querySelector('li')
  if (!card) return 0
  const gap = Number.parseFloat(getComputedStyle(el).columnGap)
  return card.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0)
}
