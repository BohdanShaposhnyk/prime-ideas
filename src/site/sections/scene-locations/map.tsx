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
}: {
  center: [number, number]
  revealed: boolean
  width: number
}) {
  return (
    <div
      className={`relative h-full [&>div:first-child]:!block [&>div:first-child]:!h-full [&>div:first-child]:!w-full [&>div:first-child]:!bg-[var(--cs-void)] ${revealed ? '' : 'invisible'}`}
      style={{ width }}
    >
      <Map
        center={center}
        defaultZoom={MAP_ZOOM}
        animate={false}
        provider={osmTiles}
        mouseEvents
        touchEvents
        twoFingerDrag
        twoFingerDragWarning=""
        attribution={false}
      >
        <Marker anchor={center} color={palette.blue} width={30} />
      </Map>
      <p className="pointer-events-none absolute right-1.5 bottom-1 z-10 rounded-sm bg-white/85 px-1 py-0.5 font-[family-name:var(--cs-body)] text-[0.6rem] leading-none text-black/70">
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
