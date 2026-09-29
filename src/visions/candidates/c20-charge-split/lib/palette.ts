import type { CSSProperties } from 'react'

/** Hex for canvas/WebGL props. CSS tokens below mirror these. */
export const palette = {
  ice: '#F4F7FF',
  caption: '#A9BBE0',
  pitch: '#000000',
  gold: '#CFB53B',
  goldInk: '#3a3420',
  blue: '#0A2478',
  navy: '#071A52',
  void: '#0C0E14',
  well: '#161A24',
} as const

/** Shared violet / ice pair — hero molten beat and experience slats. */
export const violet = {
  void: '#0E1228',
  accent: '#8E7CFF',
  glint: '#D5E0FF',
} as const

/** Mirrors `--cs-track-display` (unit is em) and `--cs-lead-display`. */
export const displayTracking = 0.02
export const displayLeading = 0.82

export const cssTokens = {
  '--cs-pitch': palette.pitch,
  '--cs-blue': palette.blue,
  '--cs-navy': palette.navy,
  '--cs-ice': palette.ice,
  '--cs-caption': palette.caption,
  '--cs-gold': palette.gold,
  '--cs-gold-ink': palette.goldInk,
  '--cs-void': palette.void,
  '--cs-well': palette.well,
  '--cs-display': '"Bebas Neue", sans-serif',
  '--cs-body': '"Barlow", sans-serif',
  '--cs-track-display': `${displayTracking}em`,
  '--cs-track-micro': '0.24em',
  '--cs-lead-display': String(displayLeading),
  '--cs-text-kicker': '0.68rem',
  '--cs-text-support': 'clamp(1rem, 2.2vw, 1.15rem)',
  '--cs-text-cta': '0.75rem',
  '--cs-radius-media': '14px',
  '--cs-radius-panel': '1.35rem',
} as CSSProperties

export const specularInk = {
  textColor: palette.ice,
  lineColor: palette.gold,
  baseColor: palette.goldInk,
} as const

export const kickerClass =
  'font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] tracking-[0.14em] text-[var(--cs-caption)] uppercase sm:tracking-[var(--cs-track-micro)]'

/** Scene lockup. Phone floor is 2.35rem; from ~960px the 9vw term hits the 5.4rem desktop ceiling. */
export const lockupClass =
  'font-[family-name:var(--cs-display)] text-[clamp(2.35rem,9vw,5.4rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase'

export const supportClass =
  'font-[family-name:var(--cs-body)] text-[length:var(--cs-text-support)] font-medium leading-snug text-[var(--cs-caption)]'

export const ctaClass =
  'font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-medium tracking-[var(--cs-track-micro)] uppercase'
