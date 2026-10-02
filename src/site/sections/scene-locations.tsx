import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { MapPin, Phone } from 'lucide-react'
import { Map, Marker } from 'pigeon-maps'
import AccordionGallery from '@/site/bits/AccordionGallery'
import { BookNightButton } from '../components/book-night'
import { TelegramIcon } from '../components/icons'
import { useCoarsePointer, usePrefersReducedMotion } from '../hooks/media'
import { cardTitleClass, ctaClass, palette } from '../lib/palette'
import { VENUES, type Venue } from '../lib/venues'

const DEFAULT_INDEX = 1
const MAP_ZOOM = 15
/** Matches AccordionGallery's default width tween. */
const CARD_OPEN_S = 0.6
const BASE_EXPAND = 0.7
/** Active card share of the row. Above this, inactive cards take the leftover. */
const CONTENT_CAP_PX = 56 * 16
const GALLERY_ITEMS = VENUES.map((venue) => ({
  id: venue.id,
  image: venue.image,
  label: venue.title,
  alt: `${venue.title}, ${venue.address}`,
}))

/** Keyless OSM raster. CARTO's dark CDN now watermarks tiles without an API key. */
function osmTiles(x: number, y: number, z: number) {
  const host = 'abc'[Math.abs(x + y) % 3]
  return `https://${host}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

function expandRatioFor(galleryWidth: number) {
  if (galleryWidth <= 0 || galleryWidth * BASE_EXPAND <= CONTENT_CAP_PX) return BASE_EXPAND
  return Math.min(0.9, Math.max(0.2, CONTENT_CAP_PX / galleryWidth))
}

function galleryWidthOf(section: HTMLElement) {
  const inset = window.matchMedia('(min-width: 640px)').matches ? 12 : 8
  return section.clientWidth - inset * 2
}

const actionClass =
  `${ctaClass} inline-flex items-center justify-center gap-2 text-[var(--cs-ice)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--cs-ice)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:underline-offset-4 sm:hover:underline sm:focus-visible:underline`

const iconBtnClass =
  'h-[calc(20px+var(--cs-text-cta))] w-[calc(20px+var(--cs-text-cta))] shrink-0 rounded-full bg-[color-mix(in_srgb,var(--cs-void)_55%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_18%,transparent)] backdrop-blur-[2px] sm:h-auto sm:w-auto sm:rounded-none sm:bg-transparent sm:ring-0 sm:backdrop-blur-none'

function VenueMap({
  center,
  revealed,
  width,
  interactive,
}: {
  center: [number, number]
  revealed: boolean
  width: number
  interactive: boolean
}) {
  return (
    <div
      className={`relative h-full [&>div:first-child]:!block [&>div:first-child]:!h-full [&>div:first-child]:!w-full [&>div:first-child]:!bg-[var(--cs-void)] [&_.pigeon-tiles-box]:[filter:invert(1)_hue-rotate(180deg)_brightness(0.78)_contrast(1.05)_saturate(0.35)] ${revealed ? '' : 'invisible'}`}
      style={{ width }}
    >
      <Map
        center={center}
        zoom={MAP_ZOOM}
        minZoom={MAP_ZOOM}
        maxZoom={MAP_ZOOM}
        animate={false}
        provider={osmTiles}
        mouseEvents={interactive}
        touchEvents={interactive}
        metaWheelZoom
        metaWheelZoomWarning=""
        attribution={false}
      >
        <Marker anchor={center} color={palette.ice} width={30} />
      </Map>
      <div
        className="pointer-events-none absolute inset-0 bg-[var(--cs-navy)]/35 mix-blend-multiply"
        aria-hidden
      />
      <p className="pointer-events-none absolute right-1.5 bottom-1 z-10 font-[family-name:var(--cs-body)] text-[0.6rem] leading-none text-[color-mix(in_srgb,var(--cs-caption)_82%,transparent)]">
        <a
          className="pointer-events-auto underline-offset-2 hover:underline"
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
        >
          © OpenStreetMap
        </a>
      </p>
    </div>
  )
}

function VenuePanel({
  venue,
  slotRef,
}: {
  venue: Venue
  slotRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-col justify-center gap-3 sm:gap-4">
      <div className="order-1 flex shrink-0 items-center gap-3">
        <span
          className="h-6 w-[3px] flex-none rounded-[3px] bg-[var(--cs-ice)]"
          style={{
            boxShadow: `0 0 12px color-mix(in srgb, ${palette.ice} 55%, transparent)`,
          }}
          aria-hidden
        />
        <h3 className={`min-w-0 [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] ${cardTitleClass}`}>
          {venue.title}
        </h3>
      </div>

      <div
        ref={slotRef}
        data-venue={venue.id}
        aria-label={`Map — ${venue.address}`}
        className="relative order-3 h-[clamp(10rem,46vh,32rem)] w-full min-w-0 shrink-0 overflow-hidden rounded-[var(--cs-radius-media)] bg-[var(--cs-void)] ring-1 ring-[color-mix(in_srgb,var(--cs-ice)_14%,transparent)] sm:order-2"
      />

      <div className="order-2 flex shrink-0 flex-col gap-3 sm:order-3">
        <p className="font-[family-name:var(--cs-body)] text-[0.78rem] leading-snug text-[var(--cs-caption)] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-[0.85rem]">
          {venue.address}
        </p>
        <div className="flex flex-nowrap items-center gap-2.5 sm:gap-4">
          <BookNightButton
            size="sm"
            className={`shrink-0 ${ctaClass} !backdrop-filter-none !bg-[color-mix(in_srgb,var(--cs-void)_72%,transparent)]`}
          />
          <a
            href={`tel:${venue.phone}`}
            className={`${actionClass} ${iconBtnClass}`}
            aria-label={`Call ${venue.phoneLabel}`}
          >
            <Phone className="size-[1.05em] shrink-0 text-[#34C759]" strokeWidth={2.25} aria-hidden />
            <span className="sr-only sm:not-sr-only">Call</span>
          </a>
          <a
            href={venue.telegram}
            target="_blank"
            rel="noreferrer"
            className={`${actionClass} ${iconBtnClass}`}
            aria-label="Telegram"
          >
            <TelegramIcon className="size-[1.1em] shrink-0 text-[#2AABEE]" />
            <span className="sr-only sm:not-sr-only">Telegram</span>
          </a>
          <a
            href={venue.appleMaps}
            target="_blank"
            rel="noreferrer"
            className={`${actionClass} ${iconBtnClass}`}
            aria-label="Maps"
          >
            <MapPin className="size-[1.05em] shrink-0 text-[var(--cs-ice)]" strokeWidth={2.25} aria-hidden />
            <span className="sr-only sm:not-sr-only">Maps</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SceneLocations() {
  const reduced = usePrefersReducedMotion()
  const openMs = reduced ? 0 : CARD_OPEN_S * 1000

  const sectionRef = useRef<HTMLElement>(null)
  const slotNodeRef = useRef<HTMLDivElement | null>(null)
  const opening = useRef(false)

  const initial = VENUES[DEFAULT_INDEX]
  const [center, setCenter] = useState<[number, number]>([initial.lat, initial.lng])
  const [expandRatio, setExpandRatio] = useState(BASE_EXPAND)
  const [slotNode, setSlotNode] = useState<HTMLDivElement | null>(null)
  const [parkNode, setParkNode] = useState<HTMLDivElement | null>(null)
  const [lockedWidth, setLockedWidth] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [generation, setGeneration] = useState(0)
  const coarse = useCoarsePointer()

  const setPark = useCallback((node: HTMLDivElement | null) => {
    setParkNode(node)
  }, [])

  const setSlot = useCallback((node: HTMLDivElement | null) => {
    if (!node) {
      setSlotNode(null)
      return
    }
    const prev = slotNodeRef.current
    slotNodeRef.current = node
    setSlotNode(node)
    if (!prev || prev.dataset.venue === node.dataset.venue) return

    const venue = VENUES.find((item) => item.id === node.dataset.venue)
    if (venue) setCenter([venue.lat, venue.lng])
    if (openMs > 0) {
      opening.current = true
      setRevealed(false)
    }
    setGeneration((n) => n + 1)
  }, [openMs])

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
  }, [])

  useEffect(() => {
    const node = slotNode
    if (!node) return
    const publish = () => {
      if (opening.current) return
      const w = Math.round(node.clientWidth)
      if (w <= 0) return
      setLockedWidth((prev) => (prev === w ? prev : w))
      setRevealed(true)
    }
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(node)
    return () => ro.disconnect()
  }, [slotNode])

  useEffect(() => {
    if (generation === 0) return
    const id = window.setTimeout(() => {
      opening.current = false
      const w = Math.round(slotNodeRef.current?.clientWidth ?? 0)
      if (w > 0) setLockedWidth((prev) => (prev === w ? prev : w))
      setRevealed(true)
    }, openMs)
    return () => window.clearTimeout(id)
  }, [generation, openMs])

  const target = slotNode ?? parkNode
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
