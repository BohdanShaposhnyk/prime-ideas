import barContrast from '../../assets/bar/bar-contrast.webp'
import carsimTilted from '../../assets/gaming/carsim-tilted.webp'
import hookahPurple from '../../assets/hookah/hookah-purple.webp'
import prices from '../../assets/prices.webp'
import gameRoom from '../../assets/showcase/gameroom-dim.webp'
import guestRoom from '../../assets/showcase/guest-room-3-ls.webp'
import loungeHall from '../../assets/showcase/lounge-2.webp'
import mic from '../../assets/showcase/mic.webp'
import { showcaseMinHeight } from './span'

/**
 * Zones. The main list of services, one card per stop:
 * play zone, sim racing, bar, karaoke, private room, cinema hall, hookah, PC prices.
 */

export const HOLD_W = 1
export const ROLL_W = 1.85
/** Share of each card step that rests before the roll. */
export const STEP_HOLD = HOLD_W / (HOLD_W + ROLL_W)

export const CARDS = [
  {
    id: 'play',
    word: 'PLAY ZONE',
    line: 'PC rooms for one, two, four, or five.',
    alt: 'Play zone',
    src: gameRoom,
  },
  {
    id: 'sim',
    word: 'SIM RACING',
    line: 'Motorsport simulators.',
    alt: 'Sim racing',
    src: carsimTilted,
  },
  {
    id: 'bar',
    word: 'BAR',
    line: 'A restaurant kitchen and bar.',
    alt: 'Bar',
    src: barContrast,
  },
  {
    id: 'karaoke',
    word: 'KARAOKE',
    line: 'A room for your group to sing.',
    alt: 'Karaoke',
    src: mic,
  },
  {
    id: 'room',
    word: 'PRIVATE ROOM',
    line: 'A private cinema for your group.',
    alt: 'Private room',
    src: guestRoom,
  },
  {
    id: 'hall',
    word: 'CINEMA HALL',
    line: 'The large hall. PlayStation 5 in every cinema and lounge.',
    alt: 'Cinema hall',
    src: loungeHall,
  },
  {
    id: 'hookah',
    word: 'HOOKAH',
    line: 'Its own lounge, clear of the other rooms.',
    alt: 'Hookah',
    src: hookahPurple,
  },
  {
    id: 'prices',
    word: 'PRICES',
    line: 'From 19 zł an hour. 10 zł an hour in a package.',
    alt: 'PC prices, 19 zł an hour or 10 zł in a package',
    src: prices,
  },
] as const

export const SHOWCASE_MIN_HEIGHT = showcaseMinHeight(CARDS.length)

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
