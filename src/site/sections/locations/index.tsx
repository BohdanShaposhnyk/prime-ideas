import { useMemo, useState } from 'react'
import Carousel from '@/site/bits/Carousel'
import RubberSegment from '@/site/bits/RubberSegment'
import { useTranslation } from '../../copy'
import { palette } from '../../lib/palette'
import { LocationFrame } from './card'
import { CITIES, LOCATIONS } from './config'
import { VenueMapPark } from './map'

function VenueTabLabel({ name }: { name: string }) {
  return (
    <span className="inline-flex min-w-0 items-center justify-center gap-1">
      <svg viewBox="0 0 32 42" className="h-[17px] w-[13px] shrink-0" aria-hidden>
        <path
          fill="#E53935"
          d="M16 1.4c-7.4 0-13.2 5.6-13.2 12.6 0 9.4 13.2 26.6 13.2 26.6S29.2 23.4 29.2 14C29.2 7 23.4 1.4 16 1.4z"
        />
        <circle cx="16" cy="13.8" r="5.6" fill="#fff" />
      </svg>
      <span className="truncate">{name}</span>
    </span>
  )
}

const segmentInset = 3

function CityLabels({ activeCity }: { activeCity: string }) {
  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${LOCATIONS.length}, minmax(0, 1fr))`,
        paddingInline: segmentInset,
      }}
    >
      {CITIES.map((group) => (
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

export default function Locations() {
  const { t } = useTranslation()
  const [index, setIndex] = useState(0)
  const [settled, setSettled] = useState(true)
  const [slots, setSlots] = useState<(HTMLDivElement | null)[]>(() => LOCATIONS.map(() => null))

  const setSlot = useMemo(
    () =>
      LOCATIONS.map((_, slot) => (node: HTMLDivElement | null) => {
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
      aria-label={t('locations.label')}
      data-scene="locations"
      className="cs-scene relative overflow-clip bg-[var(--cs-pitch)]"
    >
      <LocationFrame
          venues={LOCATIONS.map((item) => item.venue)}
          index={index}
          picker={
            <div className="flex w-full shrink-0 flex-col gap-2 font-[family-name:var(--cs-body)]">
              <CityLabels activeCity={LOCATIONS[index]?.city ?? ''} />
              <RubberSegment
                className="w-full"
                aria-label={t('locations.label')}
                items={LOCATIONS.map((item) => ({ value: item.id, label: <VenueTabLabel name={item.label} /> }))}
                value={LOCATIONS[index]?.id}
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
              aria-label={t('locations.maps')}
              index={index}
              onChange={setIndex}
              onSettledChange={setSettled}
              radius={14}
              shade={0}
              draggable={false}
              items={LOCATIONS.map((item, itemIndex) => ({
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
              venues={LOCATIONS.map((item) => item.venue)}
              slots={slots}
              index={index}
              settled={settled}
            />
          }
        />
    </section>
  )
}
