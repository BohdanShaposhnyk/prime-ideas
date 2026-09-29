import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import EchoText from '@/shared/bits/EchoText'
import Masonry from '@/shared/bits/Masonry'
import { gsap } from '@/shared/lib/gsap'
import { useCoarsePointer, usePrefersReducedMotion } from '../hooks/media'
import { palette } from '../lib/palette'
import { GAP, MASONRY_DURATION, MASONRY_STAGGER, screenLayout } from './screen-layout'

const GOLD_TINT = '#F4E8B0'
const WORD_STAGGER = 0.15
const WORD_DURATION = 0.48
const PRIME_LAG = 0.22

const WORD_CLASS =
  'inline-block opacity-0 will-change-[opacity] font-[family-name:var(--cs-body)] text-[clamp(0.92rem,13cqw,1.25rem)] font-medium tracking-[0.08em] text-[var(--cs-ice)] sm:text-[clamp(0.58rem,6.4cqw,1.25rem)]'

function Lockup({
  play,
  delay,
  coarse,
  reduced,
}: {
  play: boolean
  delay: number
  coarse: boolean
  reduced: boolean
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [showPrime, setShowPrime] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const words = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-cs-word]'))
    if (words.length === 0) return

    const useBlur = !reduced && !coarse

    if (!play) {
      queueMicrotask(() => setShowPrime(false))
      gsap.killTweensOf(words)
      gsap.set(words, { opacity: 0, filter: 'none' })
      return
    }

    if (reduced || coarse) {
      gsap.set(words, { opacity: 1, filter: 'none' })
      queueMicrotask(() => setShowPrime(true))
      return
    }

    gsap.set(words, { opacity: 0, filter: useBlur ? 'blur(10px)' : 'none' })
    queueMicrotask(() => setShowPrime(false))

    const tween = gsap.to(words, {
      opacity: 1,
      ...(useBlur ? { filter: 'blur(0px)' } : {}),
      duration: WORD_DURATION,
      stagger: WORD_STAGGER,
      ease: 'power2.out',
      delay,
      overwrite: true,
    })
    const primeAt = (delay + WORD_STAGGER * (words.length - 1) + PRIME_LAG) * 1000
    const timer = window.setTimeout(() => setShowPrime(true), primeAt)

    return () => {
      tween.kill()
      window.clearTimeout(timer)
    }
  }, [play, delay, coarse, reduced])

  return (
    <div
      ref={rootRef}
      className="@container relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--cs-pitch)] px-[8%] text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 58%, color-mix(in srgb, var(--cs-gold) 16%, #000) 0%, #000000 72%)',
        }}
        aria-hidden
      />
      <h2
        id="cs-screen-title"
        data-copy="caption"
        aria-label="Your night. Your PRIME"
        className="relative z-10 flex max-w-[92%] flex-col items-center"
      >
        <span className="block">
          <span data-cs-word className={WORD_CLASS}>
            Your
          </span>{' '}
          <span data-cs-word className={WORD_CLASS}>
            night.
          </span>
        </span>
        <span className="mt-[0.22em] flex flex-col items-center sm:mt-[0.12em] sm:flex-row sm:items-baseline sm:justify-center sm:gap-x-[0.28em]">
          <span data-cs-word className={WORD_CLASS}>
            Your
          </span>
          <span className="relative mt-[0.08em] inline-flex items-center justify-center font-[family-name:var(--cs-display)] text-[clamp(2.6rem,52cqw,5.4rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] uppercase sm:mt-0 sm:items-baseline sm:text-[clamp(1.05rem,20cqw,5.4rem)] sm:leading-[var(--cs-lead-display)]">
            <span className="invisible" aria-hidden>
              PRIME
            </span>
            {showPrime ? (
              <span
                className="absolute inset-0 flex items-center justify-center overflow-visible sm:items-baseline sm:justify-start"
                aria-hidden
              >
                <EchoText
                  text="PRIME"
                  fontSize="1em"
                  fontWeight={400}
                  color={palette.gold}
                  tint={GOLD_TINT}
                  echoes={7}
                  offset={20}
                  lag={0.2}
                  fade={0.68}
                  blur={3.2}
                  direction="right"
                  mode="entrance"
                  duration={780}
                  ease="snappy"
                  className="leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)]"
                  style={{
                    lineHeight: 0.82,
                    textShadow: `0 0 36px color-mix(in srgb, ${palette.gold} 60%, transparent)`,
                  }}
                />
              </span>
            ) : null}
          </span>
        </span>
      </h2>
    </div>
  )
}

export default function SceneScreen() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState(false)
  const coarse = useCoarsePointer()
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const port = el.closest<HTMLElement>('[data-cs-scroll]')
    const scroller: EventTarget = port ?? window

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = port?.clientHeight || window.innerHeight || 1
      const t = rect.top / vh
      setActive(t > -0.06 && t < 0.38)
    }
    const bump = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    scroller.addEventListener('scroll', bump, { passive: true })
    window.addEventListener('resize', bump)
    return () => {
      scroller.removeEventListener('scroll', bump)
      window.removeEventListener('resize', bump)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const layout = useMemo(() => screenLayout(stage), [stage])
  const items = useMemo(() => {
    if (!layout) return []
    return layout.tiles.map(tile => ({
      id: tile.id,
      column: tile.column,
      height: tile.height,
      img: tile.img,
      content: tile.isLockup ? (
        <Lockup play={active} delay={layout.captionDelay} coarse={coarse} reduced={reduced} />
      ) : undefined,
    }))
  }, [active, coarse, layout, reduced])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cs-screen-title"
      data-scene="screen"
      data-scroll="screen-masonry"
      data-masonry-active={active ? '1' : '0'}
      className="cs-scene relative overflow-hidden bg-[var(--cs-pitch)]"
    >
      <div ref={stageRef} className="absolute inset-1.5 sm:inset-2.5">
        {layout && items.length > 0 ? (
          <Masonry
            items={items}
            columnCount={3}
            columnFractions={layout.colFracs}
            gap={GAP}
            exactHeight
            active={active}
            animateFrom="bottom"
            travelRatio={0.62}
            blurToFocus={!coarse}
            scaleOnHover
            hoverScale={0.98}
            duration={MASONRY_DURATION}
            stagger={MASONRY_STAGGER}
            ease="power4.out"
          />
        ) : null}
      </div>
    </section>
  )
}
