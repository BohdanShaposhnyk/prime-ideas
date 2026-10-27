import barContrast from '../../assets/bar/bar-contrast.webp'
import carsimTilted from '../../assets/gaming/carsim-tilted.webp'
import hookahPurple from '../../assets/hookah/hookah-purple.webp'
import prices from '../../assets/prices.webp'
import gameRoom from '../../assets/showcase/gameroom-dim.webp'
import guestRoom from '../../assets/showcase/guest-room-3-ls.webp'
import loungeHall from '../../assets/showcase/lounge-2.webp'
import mic from '../../assets/showcase/mic.webp'
import { orderedIds, t, type Catalog } from '../../copy/translate'
import { zonesMinHeight } from './span'

type ZoneId = keyof Catalog['zones']['cards']

/**
 * Zones. The main list of services, one card per stop:
 * play zone, sim racing, bar, karaoke, private room, cinema hall, hookah, PC prices.
 */

export const HOLD_W = 1
export const ROLL_W = 1.85
/** Share of each card step that rests before the roll. */
export const STEP_HOLD = HOLD_W / (HOLD_W + ROLL_W)

const art = {
  play: gameRoom,
  sim: carsimTilted,
  bar: barContrast,
  karaoke: mic,
  room: guestRoom,
  hall: loungeHall,
  hookah: hookahPurple,
  prices,
} as const satisfies Record<ZoneId, string>

export const CARDS = orderedIds(t('zones.order'), Object.keys(art) as ZoneId[], 'Zones').map((id) => ({
  id,
  word: t(`zones.cards.${id}.word`),
  line: t(`zones.cards.${id}.line`),
  alt: t(`zones.cards.${id}.alt`),
  src: art[id],
}))

export const ZONES_MIN_HEIGHT = zonesMinHeight(CARDS.length)

export const SPIRAL_ITEMS = CARDS.map(({ id, src, alt, word }) => ({
  id,
  src,
  alt,
  label: word,
}))

export const SPIRAL = {
  radius: 420,
  cardWidth: 220,
  cardHeight: 310,
  verticalSpacing: 168,
  perspective: 1280,
  cardsPerTurn: 4,
  centerScale: 1.42,
  edgeFade: 0.34,
  edgeBlur: 0,
  cardRadius: 14,
  cardTilt: 4,
} as const
