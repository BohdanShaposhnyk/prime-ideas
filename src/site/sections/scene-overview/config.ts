import crowdLounge from '../../assets/event-cs6/crowd-lounge.webp'
import carsim from '../../assets/showcase/carsim.webp'
import entrance from '../../assets/showcase/entrance.webp'
import gamers from '../../assets/showcase/gamers-3.webp'
import hallRooms from '../../assets/showcase/hall-rooms.webp'

const LINE = ['SHOW UP', 'LINK UP', 'GAME ON', 'HANG OUT', 'LOSE TRACK', 'STAY LATE'] as const

export const HOLD_MS = 2000
export const TENSION_HANDOFF_MS = 200
export const SNAP_MS = 580
export const BG_FADE_MS = 820
export const OFFSETS = [-2, -1, 0, 1, 2] as const
export const ROLL_EASE = `linear(
  0,
  0.018 14%,
  0.07 22%,
  0.28 32%,
  0.55 44%,
  0.82 56%,
  0.94 70%,
  0.98 84%,
  0.995 93%,
  1
)`

export const CARDS = [
  { id: 'carsim', image: carsim },
  { id: 'entrance', image: entrance },
  { id: 'hall-rooms', image: hallRooms },
  { id: 'crowd', image: crowdLounge },
  { id: 'gamers', image: gamers },
]

export const TYPE_LOOP = Array.from({ length: 4 }, () => LINE).flat()
export const CARD_COUNT = CARDS.length
