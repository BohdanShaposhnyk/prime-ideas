import type { CSSProperties } from 'react'

export type Vignette = { edge: number; band: number; edgeB: number; bandB: number }

/** Perimeter open, nothing tinted — the frame before the fade drifts in. */
export const VIGNETTE_FROM: Vignette = { edge: 0, band: 0, edgeB: 0, bandB: 0 }

/** Settled frame — sides/top hold; bottom runs 1.5× deeper and denser. */
export const VIGNETTE_TO: Vignette = { edge: 0.97, band: 46, edgeB: 1, bandB: 69 }

export const vignetteVars = (v: Vignette): CSSProperties =>
  ({
    '--v-edge': String(v.edge),
    '--v-band': `${v.band}%`,
    '--v-edge-b': String(v.edgeB),
    '--v-band-b': `${v.bandB}%`,
  }) as CSSProperties

export const applyVignette = (el: HTMLElement, v: Vignette) => {
  el.style.setProperty('--v-edge', String(v.edge))
  el.style.setProperty('--v-band', `${v.band}%`)
  el.style.setProperty('--v-edge-b', String(v.edgeB))
  el.style.setProperty('--v-band-b', `${v.bandB}%`)
}

/**
 * Front-loaded ramp: most of the black lands in the outer third, then the tail
 * runs long and thin so a wide band never tints the middle of the frame.
 */
const sideFade = (to: string, reach: string, edgeVar = 'var(--v-edge)') =>
  [
    `linear-gradient(to ${to}`,
    `rgb(0 0 0 / ${edgeVar}) 0%`,
    `rgb(0 0 0 / calc(${edgeVar} * 0.8)) calc(${reach} * 0.22)`,
    `rgb(0 0 0 / calc(${edgeVar} * 0.35)) calc(${reach} * 0.55)`,
    `rgb(0 0 0 / calc(${edgeVar} * 0.1)) calc(${reach} * 0.78)`,
    `transparent ${reach})`,
  ].join(', ')

/** Heavier bottom ramp — black holds longer before easing out. */
const bottomFade = (reach: string) =>
  [
    'linear-gradient(to top',
    'rgb(0 0 0 / var(--v-edge-b)) 0%',
    `rgb(0 0 0 / calc(var(--v-edge-b) * 0.92)) calc(${reach} * 0.28)`,
    `rgb(0 0 0 / calc(var(--v-edge-b) * 0.55)) calc(${reach} * 0.58)`,
    `rgb(0 0 0 / calc(var(--v-edge-b) * 0.22)) calc(${reach} * 0.84)`,
    `transparent ${reach})`,
  ].join(', ')

/** Four straight fades frame the video; where they meet, the corners round themselves off. */
export const VIGNETTE_BG = [
  sideFade('right', 'min(var(--v-band), var(--v-cap-x))'),
  sideFade('left', 'min(var(--v-band), var(--v-cap-x))'),
  sideFade('bottom', 'min(var(--v-band), var(--v-cap-y))'),
  bottomFade('min(var(--v-band-b), var(--v-cap-b))'),
].join(', ')
