import hookahStill from '../assets/event-cs6/crowd-hookah-2.webp'
import gamersStill from '../assets/event-cs6/gamers.webp'
import facesStill from '../assets/showcase/faces.webp'
import micStill from '../assets/showcase/mic.webp'
import outsideStill from '../assets/showcase/outside-dude.webp'
import rigsStill from '../assets/showcase/rigs.webp'
import screenStill from '../assets/showcase/screen-cs-2.webp'

export const GAP = 8
export const MASONRY_DURATION = 0.78
export const MASONRY_STAGGER = 0.1

const COMPACT_MAX = 640
/** Start caption this many seconds before the last masonry tile settles. */
const CAPTION_LEAD = 0.38
/** Portrait phone plate on compact; 16:9 PC screen from sm up. */
const LOCKUP_ASPECT_COMPACT = 9 / 16
const LOCKUP_ASPECT_DESKTOP = 16 / 9
const COL_FR_COMPACT = [1.06, 1.28, 1]
const COL_FR_DESKTOP = [1, 1.22, 1]

type Tile = { id: string; fr: number; col: 0 | 1 | 2 }

/** Desktop 2 / 2+lockup / 3 — portrait stills. Right cells crop landscape. */
const TILES_DESKTOP: Tile[] = [
  { id: 'rigs', fr: 0.62, col: 0 },
  { id: 'screen', fr: 0.38, col: 0 },
  { id: 'faces', fr: 0.38, col: 1 },
  { id: 'lockup', fr: 0, col: 1 },
  { id: 'hookah', fr: 0.62, col: 1 },
  { id: 'gamers', fr: 1, col: 2 },
  { id: 'mic', fr: 1, col: 2 },
  { id: 'outside', fr: 1, col: 2 },
]

/** Mobile 2 / 2+lockup / 3 — same stills, portrait lockup and right cells. */
const TILES_COMPACT: Tile[] = [
  { id: 'rigs', fr: 0.55, col: 0 },
  { id: 'screen', fr: 0.45, col: 0 },
  { id: 'faces', fr: 0.44, col: 1 },
  { id: 'lockup', fr: 0, col: 1 },
  { id: 'hookah', fr: 0.56, col: 1 },
  { id: 'gamers', fr: 1, col: 2 },
  { id: 'mic', fr: 1, col: 2 },
  { id: 'outside', fr: 1, col: 2 },
]

const STILLS: Record<string, { src: string; objectPosition?: string }> = {
  rigs: { src: rigsStill },
  screen: { src: screenStill, objectPosition: 'center 32%' },
  faces: { src: facesStill },
  hookah: { src: hookahStill, objectPosition: 'center 36%' },
  gamers: { src: gamersStill },
  mic: { src: micStill },
  outside: { src: outsideStill },
}

export type ScreenTile = {
  id: string
  column: 0 | 1 | 2
  height: number
  img?: string
  objectPosition?: string
  isLockup: boolean
}

export type ScreenLayout = {
  colFracs: number[]
  captionDelay: number
  tiles: ScreenTile[]
}

function splitHeights(parts: number[], total: number) {
  const sum = parts.reduce((acc, value) => acc + value, 0) || 1
  const heights = parts.map(value => Math.round((value / sum) * total))
  const drift = total - heights.reduce((acc, value) => acc + value, 0)
  heights[heights.length - 1] += drift
  return heights
}

function tileHeights(
  tiles: Tile[],
  stageH: number,
  lockupH: number,
): Map<string, number> {
  const byCol: Tile[][] = [[], [], []]
  for (const tile of tiles) byCol[tile.col].push(tile)

  const result = new Map<string, number>()
  for (const col of byCol) {
    if (col.length === 0) continue
    const available = Math.max(stageH - GAP * (col.length - 1), 1)
    const lockupAt = col.findIndex(tile => tile.id === 'lockup')
    if (lockupAt === -1) {
      const heights = splitHeights(
        col.map(tile => tile.fr),
        available,
      )
      col.forEach((tile, i) => result.set(tile.id, heights[i]))
      continue
    }
    const others = col.filter(tile => tile.id !== 'lockup')
    const leftover = Math.max(available - lockupH, 1)
    const heights = splitHeights(
      others.map(tile => tile.fr),
      leftover,
    )
    others.forEach((tile, i) => result.set(tile.id, heights[i]))
    result.set('lockup', lockupH)
  }
  return result
}

export function screenLayout(stage: { w: number; h: number }): ScreenLayout | null {
  if (stage.w <= 0 || stage.h <= 0) return null
  const compact = stage.w < COMPACT_MAX
  const tiles = compact ? TILES_COMPACT : TILES_DESKTOP
  const colFracs = compact ? COL_FR_COMPACT : COL_FR_DESKTOP
  const lockupAspect = compact ? LOCKUP_ASPECT_COMPACT : LOCKUP_ASPECT_DESKTOP
  const captionDelay = Math.max(
    (tiles.length - 1) * MASONRY_STAGGER + MASONRY_DURATION - CAPTION_LEAD,
    0.45,
  )
  const usable = stage.w - GAP * 2
  const frSum = colFracs.reduce((acc, value) => acc + value, 0)
  const lockupW = (usable * colFracs[1]) / frSum
  const midCount = tiles.filter(tile => tile.col === 1).length
  const maxLockup = Math.max(stage.h - GAP * (midCount - 1) - 72 * (midCount - 1), 48)
  const lockupH = Math.min(Math.round(lockupW / lockupAspect), maxLockup)
  const heights = tileHeights(tiles, stage.h, lockupH)
  return {
    colFracs,
    captionDelay,
    tiles: tiles.map(tile => {
      const still = tile.id === 'lockup' ? undefined : STILLS[tile.id]
      return {
        id: tile.id,
        column: tile.col,
        height: heights.get(tile.id) ?? 1,
        img: still?.src,
        objectPosition: still?.objectPosition,
        isLockup: tile.id === 'lockup',
      }
    }),
  }
}
