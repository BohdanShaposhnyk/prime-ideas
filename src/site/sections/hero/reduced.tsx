import { useEffect, useRef } from 'react'
import { VIGNETTE_BG, VIGNETTE_TO, vignetteVars } from './vignette'
import { HeroCopy } from './copy'
import { HeroMark } from './mark'
import { heroFocusStyle, heroReel } from './media'

export function ReducedHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let inView = true
    let tabVisible = document.visibilityState !== 'hidden'

    const sync = () => {
      if (inView && tabVisible) void video.play().catch(() => {})
      else video.pause()
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting)
        sync()
      },
      { threshold: 0 },
    )
    io.observe(section)

    const onVisibility = () => {
      tabVisible = document.visibilityState !== 'hidden'
      sync()
    }
    document.addEventListener('visibilitychange', onVisibility)
    sync()

    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="PRIME"
      data-scroll="split-hold"
      data-scene="hero"
      className="cs-scene relative overflow-hidden bg-[var(--cs-pitch)]"
      style={heroFocusStyle()}
    >
      <link rel="preload" as="image" href={heroReel.poster} fetchPriority="high" />
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src={heroReel.src}
        poster={heroReel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div
        data-hero-vignette=""
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ ...vignetteVars(VIGNETTE_TO), background: VIGNETTE_BG }}
      />
      <HeroMark visible />
      <HeroCopy />
    </section>
  )
}
