import type { CSSProperties } from 'react'

export const lockupSize = 'clamp(4rem, 9vw, 5.4rem)'

/** Word slot. The canvas is larger than this and centered on it. */
export const primeSlot = { width: '2.28em', height: '1.15em', fontSize: lockupSize }

/** Drops the gathered word onto STAY's line. The field stays centered on the slot. */
const primeDrop = '0.05em'

function fieldMask(edge: number) {
  const solid = 100 - edge
  return [
    `linear-gradient(to right, transparent 0%, #000 ${edge}%, #000 ${solid}%, transparent 100%)`,
    `linear-gradient(to bottom, transparent 0%, #000 ${edge + 2}%, #000 ${solid - 2}%, transparent 100%)`,
  ].join(', ')
}

function fieldStyle(width: string, height: string, edge: number): CSSProperties {
  const mask = fieldMask(edge)
  return {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width,
    height,
    minHeight: 0,
    fontSize: lockupSize,
    transform: `translate(-50%, calc(-50% + ${primeDrop}))`,
    touchAction: 'pan-y',
    maskImage: mask,
    WebkitMaskImage: mask,
    maskComposite: 'intersect',
    WebkitMaskComposite: 'source-in',
  }
}

/** Particle field. Desktop is the wide cloud. Phone is the tight one. */
export const FIELD = {
  desktop: fieldStyle('min(84vw, 22em)', 'min(68vh, 16em)', 14),
  phone: fieldStyle('6.4em', '5em', 22),
} as const
