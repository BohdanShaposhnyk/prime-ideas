import { useEffect, useState, type RefObject } from 'react'
import { gsap, useGSAP } from '@/site/lib/gsap'
import { usePrefersReducedMotion } from '../../../hooks/media'
import { BLUR_PX, VIDEO_KICK_MS } from './config'
import { afterPaint } from './dive'
import { waitForDisplayFont } from './font'
import { startHeroIntro } from './timeline'

export function useHeroIntro({
  rootRef,
  brandRef,
  vignetteRef,
  moltenRef,
}: {
  rootRef: RefObject<HTMLElement | null>
  brandRef: RefObject<HTMLDivElement | null>
  vignetteRef: RefObject<HTMLDivElement | null>
  moltenRef: RefObject<HTMLDivElement | null>
}) {
  const reduced = usePrefersReducedMotion()
  /** Don't mount MaskedHeading until display font is live — avoids glyph teleport. */
  const [fontReady, setFontReady] = useState(reduced)
  const [copyReady, setCopyReady] = useState(reduced)
  /** Mount as soon as the intro is armed so the shader compiles while the word is hidden. */
  const [moltenLive, setMoltenLive] = useState(false)

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    void waitForDisplayFont().then(() => {
      if (!cancelled) setFontReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [reduced])

  useGSAP(
    () => {
      if (reduced || !fontReady) return
      const root = rootRef.current
      const brand = brandRef.current
      if (!root || !brand) return

      let cancelled = false
      const video = root.querySelector('video')
      root.style.setProperty('--cs-hero-blur', `${BLUR_PX}px`)
      // Stay invisible through MaskedHeading's first measure/sync frames.
      gsap.set(brand, { autoAlpha: 0 })

      // In the tree before the clock, still at molten 0, so the first fade frame is already drawn.
      setMoltenLive(true)

      let kicked = false
      let videoWait = 0
      const kick = () => {
        if (cancelled || kicked) return
        kicked = true
        window.clearTimeout(videoWait)
        afterPaint(() => {
          if (cancelled) return
          startHeroIntro({
            root,
            brand,
            vignetteRef,
            moltenRef,
            cancelled: () => cancelled,
            onMoltenDone: () => setMoltenLive(false),
            onSettled: () => setCopyReady(true),
          })
        })
      }

      if (video && video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        video.addEventListener('loadeddata', kick, { once: true })
        video.addEventListener('error', kick, { once: true })
        videoWait = window.setTimeout(kick, VIDEO_KICK_MS)
        video.play()?.catch(() => {})
      } else {
        kick()
      }

      return () => {
        cancelled = true
        window.clearTimeout(videoWait)
        video?.removeEventListener('loadeddata', kick)
        video?.removeEventListener('error', kick)
        setMoltenLive(false)
      }
    },
    { scope: rootRef, dependencies: [reduced, fontReady] },
  )

  return { reduced, fontReady, copyReady, moltenLive }
}
