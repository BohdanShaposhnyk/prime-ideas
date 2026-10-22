import { useCallback, useEffect, useState, type RefObject } from 'react'
import { heroIntroReel, heroLoopReel, type HeroReel } from './media'

/**
 * Night plays once. cs6 is fetched only after that reel is actually playing,
 * then it takes the same element and loops.
 */
export function useHeroSequence(rootRef: RefObject<HTMLElement | null>, videoReady: boolean) {
  const [reel, setReel] = useState<HeroReel>(heroIntroReel)
  const loop = reel.id === heroLoopReel.id

  useEffect(() => {
    if (!videoReady) return
    const video = rootRef.current?.querySelector('video')
    if (!video) return

    let preload: HTMLVideoElement | null = null
    const arm = () => {
      if (preload) return
      // A link preload is ignored for video in Chrome. A live element actually buffers,
      // and it stays outside the hero so the intro still finds the night reel.
      preload = document.createElement('video')
      preload.muted = true
      preload.playsInline = true
      preload.preload = 'auto'
      preload.setAttribute('aria-hidden', 'true')
      preload.tabIndex = -1
      preload.style.cssText = 'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none'
      preload.src = heroLoopReel.src
      document.body.append(preload)
      preload.load()
    }

    video.addEventListener('playing', arm, { once: true })
    if (!video.paused) arm()

    return () => {
      video.removeEventListener('playing', arm)
      if (!preload) return
      preload.pause()
      preload.removeAttribute('src')
      preload.load()
      preload.remove()
    }
  }, [rootRef, videoReady])

  const onEnded = useCallback(() => {
    setReel((current) => (current.id === heroLoopReel.id ? current : heroLoopReel))
  }, [])

  return { reel, loop, onEnded }
}
