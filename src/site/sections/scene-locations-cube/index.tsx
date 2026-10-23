import { useMemo, useState } from 'react'
import Carousel from '@/site/bits/Carousel'
import RubberSegment from '@/site/bits/RubberSegment'
import { palette } from '../../lib/palette'
import { LocationFrame } from './card'
import { CUBE_LOCATIONS } from './config'
import { useAppleMaps } from './use-apple-maps'
import { VenueMapPark } from './map'

export default function SceneLocationsCube() {
  const apple = useAppleMaps()
  const [index, setIndex] = useState(0)
  const [settled, setSettled] = useState(true)
  const [slots, setSlots] = useState<(HTMLDivElement | null)[]>(() => CUBE_LOCATIONS.map(() => null))

  const setSlot = useMemo(
    () =>
      CUBE_LOCATIONS.map((_, slot) => (node: HTMLDivElement | null) => {
        setSlots((prev) => {
          if (prev[slot] === node) return prev
          const next = prev.slice()
          next[slot] = node
          return next
        })
      }),
    [],
  )

  const choose = (next: number) => {
    if (next === index) return
    setSettled(false)
    setIndex(next)
  }

  return (
    <section
      aria-label="Locations"
      data-scene="locations-cube"
      className="cs-scene relative overflow-clip bg-[var(--cs-pitch)]"
    >
      <LocationFrame
          venues={CUBE_LOCATIONS.map((item) => item.venue)}
          index={index}
          picker={
            <RubberSegment
              className="w-full shrink-0 font-[family-name:var(--cs-body)]"
              aria-label="Locations"
              items={CUBE_LOCATIONS.map((item) => ({ value: item.id, label: item.label }))}
              value={CUBE_LOCATIONS[index]?.id}
              onChange={(_, next) => choose(next)}
              wrap
              equalSlots
              size="sm"
              radius={12}
              trackColor="rgba(0, 0, 0, 0.72)"
              thumbColor={palette.gold}
              textColor="#ffffff"
              activeTextColor={palette.pitch}
            />
          }
          map={
            <Carousel
              aria-label="Location maps"
              index={index}
              onChange={setIndex}
              onSettledChange={setSettled}
              radius={14}
              shade={0}
              items={CUBE_LOCATIONS.map((item, itemIndex) => ({
                id: item.id,
                node: (
                  <div
                    ref={setSlot[itemIndex]}
                    data-venue={item.id}
                    className="h-full w-full bg-[#d8e0e7] ring-1 ring-black/10 ring-inset"
                  />
                ),
              }))}
            />
          }
          overlay={
            <VenueMapPark
              venues={CUBE_LOCATIONS.map((item) => item.venue)}
              apple={apple}
              slots={slots}
              index={index}
              settled={settled}
            />
          }
        />
    </section>
  )
}
