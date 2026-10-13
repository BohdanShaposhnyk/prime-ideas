import type { CSSProperties } from 'react'
import cs6Poster from '@/site/assets/cs6-reel-poster.webp'
import cs6Reel from '@/site/assets/cs6-reel.mp4'
import nightPoster from '@/site/assets/night-reel-poster.webp'
import nightReel from '@/site/assets/night-reel.mp4'

export type HeroReelId = 'night' | 'cs6'

type HeroReel = {
  id: HeroReelId
  src: string
  poster: string
  /** object-position while the viewport is landscape. */
  focus: string
  /** object-position while the viewport is portrait. */
  focusPortrait: string
}

/**
 * Hero loops. Encodes live in `scripts/compress-assets.mjs` (`pnpm assets`).
 * Change `ACTIVE` to swap the reel, its LCP poster, and how it is framed.
 */
const REELS = {
  night: {
    id: 'night',
    src: nightReel,
    poster: nightPoster,
    focus: 'center',
    focusPortrait: '75% 50%',
  },
  cs6: {
    id: 'cs6',
    src: cs6Reel,
    poster: cs6Poster,
    focus: 'center 32%',
    focusPortrait: 'center',
  },
} as const satisfies Record<HeroReelId, HeroReel>

const ACTIVE: HeroReelId = 'cs6'

export const heroReel: HeroReel = REELS[ACTIVE]

export function heroFocusStyle(): CSSProperties {
  return {
    '--hero-focus': heroReel.focus,
    '--hero-focus-portrait': heroReel.focusPortrait,
  } as CSSProperties
}
