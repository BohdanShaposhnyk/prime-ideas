import { useEffect, useState } from 'react'
import primeLogo from '../assets/01_prime-logo.png'

/** Wordmark bounds inside the 1290×790 black plate. */
const MARK = { x: 229, y: 268, w: 832, h: 192 } as const
const CUT = 18

export const wordmarkAspect = `${MARK.w} / ${MARK.h}`

/** Crop to the wordmark and punch the black plate so letters sit on whatever is behind. */
export function useWordmark(): string | null {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      const canvas = document.createElement('canvas')
      canvas.width = MARK.w
      canvas.height = MARK.h
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return
      ctx.drawImage(img, MARK.x, MARK.y, MARK.w, MARK.h, 0, 0, MARK.w, MARK.h)
      const frame = ctx.getImageData(0, 0, MARK.w, MARK.h)
      const px = frame.data
      for (let i = 0; i < px.length; i += 4) {
        const max = Math.max(px[i] ?? 0, px[i + 1] ?? 0, px[i + 2] ?? 0)
        px[i + 3] = max <= CUT ? 0 : Math.min(255, Math.round(((max - CUT) * 255) / (255 - CUT)))
      }
      ctx.putImageData(frame, 0, 0)
      setSrc(canvas.toDataURL('image/png'))
    }
    img.src = primeLogo
    return () => {
      cancelled = true
    }
  }, [])

  return src
}
