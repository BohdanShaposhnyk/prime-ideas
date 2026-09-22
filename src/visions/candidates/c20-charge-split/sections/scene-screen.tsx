import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import EchoText from '@/shared/bits/EchoText'
import Masonry from '@/shared/bits/Masonry'
import { gsap } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'
import barPartyHor from '../assets/bar/bar-party-hor.webp'
import gamerGirlHor from '../assets/gaming/gamer-girl-hor.webp'
import gamerGirlLightHor from '../assets/gaming/gamer-girl-light-hor.webp'
import keyboardHor from '../assets/gaming/keyboard-hor.webp'
import singerHor from '../assets/karaoke/singer-hor.webp'

const GAP = 8
const VIOLET = '#B794F6'
const COMPACT_MAX = 640
const MASONRY_DURATION = 0.78
const MASONRY_STAGGER = 0.1
/** Start caption this many seconds before the last masonry tile settles. */
const CAPTION_LEAD = 0.38
const WORD_STAGGER = 0.15
const WORD_DURATION = 0.48
const PRIME_LAG = 0.22
/** Portrait phone plate on compact; 16:9 PC screen from sm up. */
const LOCKUP_ASPECT_COMPACT = 9 / 16
const LOCKUP_ASPECT_DESKTOP = 16 / 9
const COL_FR_COMPACT = [1.06, 1.28, 1]
const COL_FR_DESKTOP = [1, 1.22, 1]

type Tile = { id: string; fr: number; col: 0 | 1 | 2 }

/** Desktop 2 / 3 / 2 — five landscape stills around the lockup. */
const TILES_DESKTOP: Tile[] = [
  { id: 'gate', fr: 0.62, col: 0 },
  { id: 'pit', fr: 0.38, col: 0 },
  { id: 'rake', fr: 0.38, col: 1 },
  { id: 'lockup', fr: 0, col: 1 },
  { id: 'marquee', fr: 0.62, col: 1 },
  { id: 'aisle', fr: 1, col: 2 },
]

/** Mobile 2 / 3 / 1 — same stills, portrait lockup. */
const TILES_COMPACT: Tile[] = [
  { id: 'gate', fr: 0.55, col: 0 },
  { id: 'pit', fr: 0.45, col: 0 },
  { id: 'rake', fr: 0.44, col: 1 },
  { id: 'lockup', fr: 0, col: 1 },
  { id: 'marquee', fr: 0.56, col: 1 },
  { id: 'aisle', fr: 1, col: 2 },
]

const WORD_CLASS =
  'inline-block opacity-0 will-change-[opacity,filter] font-[family-name:var(--cs-body)] text-[clamp(0.92rem,13cqw,1.25rem)] font-medium tracking-[0.08em] text-[var(--cs-ice)] sm:text-[clamp(0.58rem,6.4cqw,1.25rem)]'

function Lockup({ play, delay }: { play: boolean; delay: number }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [showPrime, setShowPrime] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const words = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-cs-word]'))
    if (words.length === 0) return

    const reduced = prefersReducedMotion()

    if (!play) {
      queueMicrotask(() => setShowPrime(false))
      gsap.killTweensOf(words)
      gsap.set(words, { opacity: 0, filter: 'blur(10px)' })
      return
    }

    if (reduced) {
      gsap.set(words, { opacity: 1, filter: 'blur(0px)' })
      queueMicrotask(() => setShowPrime(true))
      return
    }

    gsap.set(words, { opacity: 0, filter: 'blur(10px)' })
    queueMicrotask(() => setShowPrime(false))

    const tween = gsap.to(words, {
      opacity: 1,
      filter: 'blur(0px)',
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
  }, [play, delay])

  return (
    <div
      ref={rootRef}
      className="@container relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black px-[8%] text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 58%, #160c24 0%, #000000 72%)',
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
                  color={VIOLET}
                  tint="#E9D5FF"
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
                    textShadow: `0 0 36px color-mix(in srgb, ${VIOLET} 60%, transparent)`,
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

function splitHeights(parts: number[], total: number) {
  const sum = parts.reduce((acc, value) => acc + value, 0) || 1
  const heights = parts.map(value => Math.round((value / sum) * total))
  const drift = total - heights.reduce((acc, value) => acc + value, 0)
  heights[heights.length - 1] += drift
  return heights
}

function tileHeights(
  tiles: Tile[],
  stageH: number,
  lockupH: number,
): Map<string, number> {
  const byCol: Tile[][] = [[], [], []]
  for (const tile of tiles) byCol[tile.col].push(tile)

  const result = new Map<string, number>()
  for (const col of byCol) {
    if (col.length === 0) continue
    const available = Math.max(stageH - GAP * (col.length - 1), 1)
    const lockupAt = col.findIndex(tile => tile.id === 'lockup')
    if (lockupAt === -1) {
      const heights = splitHeights(
        col.map(tile => tile.fr),
        available,
      )
      col.forEach((tile, i) => result.set(tile.id, heights[i]))
      continue
    }
    const others = col.filter(tile => tile.id !== 'lockup')
    const leftover = Math.max(available - lockupH, 1)
    const heights = splitHeights(
      others.map(tile => tile.fr),
      leftover,
    )
    others.forEach((tile, i) => result.set(tile.id, heights[i]))
    result.set('lockup', lockupH)
  }
  return result
}

const STILLS: Record<string, string> = {
  gate: singerHor,
  pit: keyboardHor,
  rake: gamerGirlLightHor,
  marquee: barPartyHor,
  aisle: gamerGirlHor,
}

export default function SceneScreen() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState({ w: 0, h: 0 })
  const [active, setActive] = useState(false)

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

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const t = rect.top / vh
      setActive(t > -0.06 && t < 0.38)
    }
    const bump = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', bump, { passive: true })
    window.addEventListener('resize', bump)
    return () => {
      window.removeEventListener('scroll', bump)
      window.removeEventListener('resize', bump)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const compact = stage.w > 0 && stage.w < COMPACT_MAX
  const tiles = compact ? TILES_COMPACT : TILES_DESKTOP
  const colFracs = compact ? COL_FR_COMPACT : COL_FR_DESKTOP
  const lockupAspect = compact ? LOCKUP_ASPECT_COMPACT : LOCKUP_ASPECT_DESKTOP
  const captionDelay = Math.max(
    (tiles.length - 1) * MASONRY_STAGGER + MASONRY_DURATION - CAPTION_LEAD,
    0.45,
  )

  const items = useMemo(() => {
    if (stage.w <= 0 || stage.h <= 0) return []
    const usable = stage.w - GAP * 2
    const frSum = colFracs.reduce((acc, value) => acc + value, 0)
    const lockupW = (usable * colFracs[1]) / frSum
    const midCount = tiles.filter(tile => tile.col === 1).length
    const maxLockup = Math.max(stage.h - GAP * (midCount - 1) - 72 * (midCount - 1), 48)
    const lockupH = Math.min(Math.round(lockupW / lockupAspect), maxLockup)
    const heights = tileHeights(tiles, stage.h, lockupH)
    return tiles.map(tile => ({
      id: tile.id,
      column: tile.col,
      height: heights.get(tile.id) ?? 1,
      img: tile.id === 'lockup' ? undefined : STILLS[tile.id],
      content: tile.id === 'lockup' ? <Lockup play={active} delay={captionDelay} /> : undefined,
    }))
  }, [active, captionDelay, colFracs, lockupAspect, stage.h, stage.w, tiles])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cs-screen-title"
      data-scene="screen"
      data-scroll="screen-masonry"
      data-masonry-active={active ? '1' : '0'}
      className="relative h-dvh overflow-hidden bg-[var(--cs-pitch)]"
    >
      <div ref={stageRef} className="absolute inset-1.5 sm:inset-2.5">
        {items.length > 0 ? (
          <Masonry
            items={items}
            columnCount={3}
            columnFractions={colFracs}
            gap={GAP}
            exactHeight
            active={active}
            animateFrom="bottom"
            travelRatio={0.62}
            blurToFocus
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
