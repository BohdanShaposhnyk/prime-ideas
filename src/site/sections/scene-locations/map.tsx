import { Map, Marker } from 'pigeon-maps'
import { palette } from '../../lib/palette'

const MAP_ZOOM = 15

/** Keyless OSM raster. CARTO's dark CDN now watermarks tiles without an API key. */
function osmTiles(x: number, y: number, z: number) {
  const host = 'abc'[Math.abs(x + y) % 3]
  return `https://${host}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

export function VenueMap({
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
