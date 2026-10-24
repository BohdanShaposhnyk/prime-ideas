import { useLayoutEffect, useRef } from 'react'
import { mapsHref } from '../../lib/seo'
import { prefersReducedMotion } from '../../lib/motion'
import type { Venue } from '../../lib/venues'

const FADE = 'opacity 450ms ease-out'

function mapEmbedSrc(venue: Venue) {
  return mapsHref(venue.mapsCid, true)
}

/**
 * All three embeds stay in this layer for the life of the scene.
 * Moving an iframe to a new parent makes the browser load it again, so a turn
 * only changes opacity. The next map fades in after the turn lands.
 * They sit over the front well, outside the rotating face, because an iframe
 * paints flat through a CSS 3D transform.
 * The settled map takes pointers so it can pan and zoom. The others stay
 * inert, or a hidden frame would cover the one in front.
 */
export function VenueMapPark({
  venues,
  slots,
  index,
  settled,
}: {
  venues: Venue[]
  slots: (HTMLDivElement | null)[]
  index: number
  settled: boolean
}) {
  const frames = useRef<(HTMLDivElement | null)[]>([])
  const shown = useRef<boolean[]>([])
  const fades = useRef<number[]>([])

  useLayoutEffect(() => {
    const slot = slots[index] ?? null

    const paint = (show: boolean) => {
      const rect = slot?.getBoundingClientRect()
      const usable = !!rect && rect.width >= 2 && rect.height >= 2
      frames.current.forEach((frame, frameIndex) => {
        if (!frame) return
        const sized = frame.dataset.ready === 'true'
        if (usable && rect && (show || !sized)) {
          frame.style.top = `${rect.top}px`
          frame.style.left = `${rect.left}px`
          frame.style.width = `${rect.width}px`
          frame.style.height = `${rect.height}px`
          frame.dataset.ready = 'true'
        }
        const visible = show && usable && frameIndex === index
        frame.style.pointerEvents = visible ? 'auto' : 'none'
        if (frame.firstElementChild instanceof HTMLElement) {
          frame.firstElementChild.style.pointerEvents = visible ? 'auto' : 'none'
        }
        if (visible) {
          frame.removeAttribute('aria-hidden')
          if (shown.current[frameIndex]) return
          shown.current[frameIndex] = true
          if (prefersReducedMotion()) {
            frame.style.transition = 'none'
            frame.style.opacity = '1'
            return
          }
          frame.style.transition = 'none'
          frame.style.opacity = '0'
          const id = requestAnimationFrame(() => {
            if (!shown.current[frameIndex]) return
            frame.style.transition = FADE
            frame.style.opacity = '1'
          })
          fades.current.push(id)
          return
        }
        if (!shown.current[frameIndex] && frame.style.opacity === '0') {
          frame.setAttribute('aria-hidden', 'true')
          return
        }
        shown.current[frameIndex] = false
        frame.style.transition = 'none'
        frame.style.opacity = '0'
        frame.setAttribute('aria-hidden', 'true')
      })
    }

    paint(settled && !!slot)
    if (!settled || !slot) return

    const place = () => paint(true)
    const observer = new ResizeObserver(place)
    observer.observe(slot)
    const scroller = slot.closest('[data-cs-scroll]')
    scroller?.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)

    return () => {
      fades.current.forEach((id) => cancelAnimationFrame(id))
      fades.current = []
      frames.current.forEach((frame, frameIndex) => {
        if (frame && frame.style.opacity !== '1') shown.current[frameIndex] = false
      })
      observer.disconnect()
      scroller?.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [slots, index, settled])

  return venues.map((venue, frameIndex) => (
    <div
      key={venue.id}
      ref={(node) => {
        frames.current[frameIndex] = node
      }}
      aria-hidden
      className="pointer-events-none fixed z-[3] overflow-hidden rounded-[var(--cs-radius-media)] opacity-0"
    >
      <iframe
        title={`Map — ${venue.address}`}
        src={mapEmbedSrc(venue)}
        className="h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  ))
}
