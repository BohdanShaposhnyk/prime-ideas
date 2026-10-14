import { useRef } from 'react'
import { createPortal } from 'react-dom'
import AccordionGallery from '@/site/bits/AccordionGallery'
import { useCoarsePointer, usePrefersReducedMotion } from '../../hooks/media'
import { palette } from '../../lib/palette'
import { VENUES } from '../../lib/venues'
import { CARD_OPEN_S, DEFAULT_INDEX, GALLERY_ITEMS } from './config'
import { VenueMap } from './map'
import { VenuePanel } from './panel'
import { useExpandRatio } from './use-expand'
import { useVenueMap } from './use-map'

export default function SceneLocations() {
  const reduced = usePrefersReducedMotion()
  const openMs = reduced ? 0 : CARD_OPEN_S * 1000
  const sectionRef = useRef<HTMLElement>(null)
  const coarse = useCoarsePointer()
  const expandRatio = useExpandRatio(sectionRef)
  const { center, lockedWidth, revealed, setPark, setSlot, target } = useVenueMap(openMs)
  const interactive = !coarse

  return (
    <section
      ref={sectionRef}
      aria-label="Locations"
      data-scene="locations"
      className="cs-scene relative isolate overflow-hidden bg-[var(--cs-pitch)]"
    >
      <div
        ref={setPark}
        aria-hidden
        className="pointer-events-none fixed top-0 h-[clamp(10rem,46vh,32rem)] overflow-hidden"
        style={{ left: -10000, width: lockedWidth || 320 }}
      />
      {target && lockedWidth > 0
        ? createPortal(
            <VenueMap
              center={center}
              revealed={revealed}
              width={lockedWidth}
              interactive={interactive}
            />,
            target,
          )
        : null}
      <div className="absolute inset-2 sm:inset-3">
        <AccordionGallery
          items={GALLERY_ITEMS}
          defaultIndex={DEFAULT_INDEX}
          trigger="click"
          orientation="horizontal"
          fillParent
          expandRatio={expandRatio}
          duration={CARD_OPEN_S}
          gap={8}
          radius={14}
          accentColor={palette.ice}
          overlayColor={palette.pitch}
          textColor={palette.ice}
          grayscale
          showLabels={false}
          activeDim={0.28}
          inactiveDim={0.62}
          tilt={5}
          className="h-full"
          renderPanelContent={(index) => {
            const venue = VENUES[index]
            if (!venue) return null
            return <VenuePanel venue={venue} slotRef={setSlot} />
          }}
        />
      </div>
    </section>
  )
}
