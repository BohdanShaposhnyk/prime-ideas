import { useMemo, useState } from 'react'
import Carousel from '@/site/bits/Carousel'
import RubberSegment from '@/site/bits/RubberSegment'
import { palette } from '../../lib/palette'
import { LocationFrame } from './card'
import { CUBE_CITIES, CUBE_LOCATIONS } from './config'
import { VenueMapPark } from './map'

const segmentInset = 3

function CityLabels({ activeCity }: { activeCity: string }) {
  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${CUBE_LOCATIONS.length}, minmax(0, 1fr))`,
        paddingInline: segmentInset,
      }}
    >
      {CUBE_CITIES.map((group) => (
        <div
          key={group.city}
          className={`flex min-w-0 flex-col items-center gap-1 px-2 ${group.city === activeCity ? 'text-[var(--cs-gold)]' : 'text-white'}`}
          style={{ gridColumn: `span ${group.span}` }}
        >
          <span className="font-[family-name:var(--cs-body)] text-[0.58rem] leading-none font-medium tracking-[0.16em] uppercase sm:text-[0.62rem]">
            {group.city}
          </span>
          <span aria-hidden className="h-px w-full bg-current" />
        </div>
      ))}
    </div>
  )
}

export default function SceneLocationsCube() {
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
            <div className="flex w-full shrink-0 flex-col gap-2 font-[family-name:var(--cs-body)]">
              <CityLabels activeCity={CUBE_LOCATIONS[index]?.city ?? ''} />
              <RubberSegment
                className="w-full"
                aria-label="Locations"
                items={CUBE_LOCATIONS.map((item) => ({ value: item.id, label: item.label }))}
                value={CUBE_LOCATIONS[index]?.id}
                onChange={(_, next) => choose(next)}
                equalSlots
                size="sm"
                radius={12}
                inset={segmentInset}
                trackColor="rgba(0, 0, 0, 0.72)"
                thumbColor={palette.gold}
                textColor="#ffffff"
                activeTextColor={palette.pitch}
              />
            </div>
          }
          map={
            <Carousel
              aria-label="Location maps"
              index={index}
              onChange={setIndex}
              onSettledChange={setSettled}
              radius={14}
              shade={0}
              draggable={false}
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
              slots={slots}
              index={index}
              settled={settled}
            />
          }
        />
    </section>
  )
}
