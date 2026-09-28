/** Hex for canvas/WebGL props. CSS tokens in index.tsx mirror these. */
export const palette = {
  ice: '#F4F7FF',
  caption: '#A9BBE0',
  pitch: '#000000',
  gold: '#CFB53B',
  goldInk: '#3a3420',
} as const

/** Mirrors `--cs-track-display` (unit is em) and `--cs-lead-display`. */
export const displayTracking = 0.02
export const displayLeading = 0.82

export const specularInk = {
  textColor: palette.ice,
  lineColor: palette.gold,
  baseColor: palette.goldInk,
} as const

export const kickerClass =
  'font-[family-name:var(--cs-body)] text-[length:var(--cs-text-kicker)] tracking-[var(--cs-track-micro)] text-[var(--cs-caption)] uppercase'

export const supportClass =
  'font-[family-name:var(--cs-body)] text-[length:var(--cs-text-support)] font-medium leading-snug text-[var(--cs-caption)]'

export const ctaClass =
  'font-[family-name:var(--cs-body)] text-[length:var(--cs-text-cta)] font-medium tracking-[var(--cs-track-micro)] uppercase'
