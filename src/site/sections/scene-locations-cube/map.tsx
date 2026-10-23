import { useLayoutEffect, useRef } from 'react'
import type { Venue } from '../../lib/venues'

function mapEmbedSrc(venue: Venue, apple: boolean) {
  if (apple) return venue.appleMaps
  const query = `${venue.lat},${venue.lng}`
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=en&output=embed`
}

/**
 * All three embeds stay in this layer for the life of the scene.
 * Moving an iframe to a new parent makes the browser load it again, so a turn
 * only changes opacity. They sit over the front well, outside the rotating
 * face, because an iframe paints flat through a CSS 3D transform.
 * Pointers pass through so a swipe still turns the cube.
 */
export function VenueMapPark({
  venues,
  apple,
  slots,
  index,
  settled,
}: {
  venues: Venue[]
  apple: boolean
  slots: (HTMLDivElement | null)[]
  index: number
  settled: boolean
}) {
  const frames = useRef<(HTMLDivElement | null)[]>([])

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
        frame.style.opacity = visible ? '1' : '0'
        if (visible) frame.removeAttribute('aria-hidden')
        else frame.setAttribute('aria-hidden', 'true')
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
        src={mapEmbedSrc(venue, apple)}
        className="pointer-events-none h-full w-full border-0"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  ))
}
