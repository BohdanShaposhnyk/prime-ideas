import { violet } from '../../../lib/palette'

/** Glyph rise for MaskedHeading. */
export const REVEAL_S = 0.7
export const BLUR_PX = 5.5

export const FADE_S = 0.55
export const DIVE_S = 0.9
export const DIVE_SCALE = 22
export const CRISP_S = 0.7

/** Molten beat — in with the word, a short hold, then the dive. */
export const MOLTEN_IN_S = 0.45
export const MOLTEN_HOLD_S = 0.2
export const MOLTEN_OUT_S = 0.35

/**
 * Chrome Android often never fires loadeddata while preload is still
 * metadata and the reel is racing the stills. Don't wait on that frame.
 */
export const VIDEO_KICK_MS = 480

/** Colder violet — blue-shifted from the screen caption’s warmer lilac. */
export const MOLTEN_VIOLET = {
  color1: violet.void,
  color2: violet.accent,
  color3: violet.glint,
  speed: 0.42,
} as const
