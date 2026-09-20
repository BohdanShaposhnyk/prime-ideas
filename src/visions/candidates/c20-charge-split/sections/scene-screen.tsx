import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import EchoText from '@/shared/bits/EchoText'
import Masonry from '@/shared/bits/Masonry'
import { gsap } from '@/shared/lib/gsap'
import { prefersReducedMotion } from '@/shared/lib/motion'

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

/** Desktop 2 / 3 / 2; lockup height is aspect-driven, other mid fracs share leftover. */
const TILES_DESKTOP: Tile[] = [
  { id: 'gate', fr: 0.62, col: 0 },
  { id: 'pit', fr: 0.38, col: 0 },
  { id: 'rake', fr: 0.38, col: 1 },
  { id: 'lockup', fr: 0, col: 1 },
  { id: 'marquee', fr: 0.62, col: 1 },
  { id: 'glow', fr: 0.44, col: 2 },
  { id: 'aisle', fr: 0.56, col: 2 },
]

/** Mobile 3 / 3 / 3 — side stacks stay asymmetric so the wall doesn't mirror. */
const TILES_COMPACT: Tile[] = [
  { id: 'gate', fr: 0.4, col: 0 },
  { id: 'pit', fr: 0.22, col: 0 },
  { id: 'credits', fr: 0.38, col: 0 },
  { id: 'rake', fr: 0.44, col: 1 },
  { id: 'lockup', fr: 0, col: 1 },
  { id: 'marquee', fr: 0.56, col: 1 },
  { id: 'glow', fr: 0.28, col: 2 },
  { id: 'aisle', fr: 0.4, col: 2 },
  { id: 'leak', fr: 0.32, col: 2 },
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
      setShowPrime(false)
      gsap.killTweensOf(words)
      gsap.set(words, { opacity: 0, filter: 'blur(10px)' })
      return
    }

    if (reduced) {
      gsap.set(words, { opacity: 1, filter: 'blur(0px)' })
      setShowPrime(true)
      return
    }

    gsap.set(words, { opacity: 0, filter: 'blur(10px)' })
    setShowPrime(false)

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
          <span className="relative mt-[0.08em] inline-flex items-center justify-center font-[family-name:var(--cs-display)] text-[clamp(2.6rem,52cqw,5.4rem)] leading-[0.78] uppercase sm:mt-0 sm:items-baseline sm:text-[clamp(1.05rem,20cqw,5.4rem)] sm:leading-[0.8]">
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
                  className="leading-[0.78] tracking-normal sm:leading-[0.8]"
                  style={{
                    lineHeight: 0.78,
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

function still(id: string, body: string) {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <defs>
        <filter id="${id}-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch"/>
        </filter>
      </defs>
      ${body}
      <rect width="900" height="1200" filter="url(#${id}-grain)" opacity="0.18"/>
    </svg>`,
  )}`
}

const STILLS: Record<string, string> = {
  gate: still(
    'gate',
    `<rect width="900" height="1200" fill="#05060a"/>
    <rect x="0" y="0" width="900" height="90" fill="#000"/>
    <rect x="0" y="1110" width="900" height="90" fill="#000"/>
    <radialGradient id="g-gate" cx="50%" cy="42%" r="48%">
      <stop offset="0%" stop-color="#F4F7FF"/>
      <stop offset="22%" stop-color="#A9BBE0"/>
      <stop offset="58%" stop-color="#0A2478"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <rect x="110" y="160" width="680" height="400" fill="url(#g-gate)"/>
    <rect x="110" y="160" width="680" height="18" fill="#161A24"/>
    <rect x="110" y="542" width="680" height="18" fill="#161A24"/>
    <ellipse cx="450" cy="820" rx="320" ry="46" fill="#0C0E14" opacity="0.9"/>
    <rect x="80" y="860" width="740" height="14" fill="#071A52" opacity="0.7"/>
    <rect x="120" y="900" width="660" height="10" fill="#071A52" opacity="0.45"/>
    <rect x="170" y="936" width="560" height="8" fill="#071A52" opacity="0.28"/>`,
  ),
  rake: still(
    'rake',
    `<rect width="900" height="1200" fill="#000"/>
    <linearGradient id="g-rake" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#071A52"/>
      <stop offset="40%" stop-color="#000"/>
      <stop offset="100%" stop-color="#05060a"/>
    </linearGradient>
    <rect width="900" height="1200" fill="url(#g-rake)"/>
    <rect x="160" y="70" width="580" height="8" fill="#F4F7FF" opacity="0.35"/>
    <path d="M40 280 Q450 200 860 280 L860 340 Q450 250 40 340Z" fill="#0C0E14"/>
    <path d="M20 430 Q450 330 880 430 L880 500 Q450 390 20 500Z" fill="#161A24"/>
    <path d="M0 590 Q450 470 900 590 L900 680 Q450 550 0 680Z" fill="#0C0E14"/>
    <path d="M0 780 Q450 640 900 780 L900 900 Q450 750 0 900Z" fill="#071A52" opacity="0.85"/>
    <path d="M0 980 Q450 860 900 980 L900 1200 H0Z" fill="#000"/>`,
  ),
  aisle: still(
    'aisle',
    `<rect width="900" height="1200" fill="#05060c"/>
    <linearGradient id="g-aisle" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#0A2478" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <rect x="380" y="0" width="140" height="1200" fill="url(#g-aisle)"/>
    <rect x="430" y="0" width="40" height="1200" fill="#F4F7FF" opacity="0.18"/>
    <rect x="40" y="160" width="300" height="70" rx="8" fill="#0C0E14"/>
    <rect x="560" y="220" width="300" height="70" rx="8" fill="#0C0E14"/>
    <rect x="50" y="360" width="290" height="70" rx="8" fill="#161A24"/>
    <rect x="570" y="430" width="280" height="70" rx="8" fill="#161A24"/>
    <rect x="70" y="580" width="270" height="70" rx="8" fill="#071A52"/>
    <rect x="580" y="670" width="250" height="70" rx="8" fill="#071A52"/>
    <rect x="90" y="820" width="250" height="70" rx="8" fill="#0C0E14"/>
    <rect x="590" y="900" width="230" height="70" rx="8" fill="#0C0E14"/>
    <circle cx="450" cy="180" r="9" fill="#F4F7FF" opacity="0.8"/>
    <circle cx="450" cy="480" r="9" fill="#F4F7FF" opacity="0.55"/>
    <circle cx="450" cy="800" r="9" fill="#F4F7FF" opacity="0.35"/>`,
  ),
  glow: still(
    'glow',
    `<rect width="900" height="1200" fill="#02030a"/>
    <radialGradient id="g-glow" cx="62%" cy="38%" r="58%">
      <stop offset="0%" stop-color="#F4F7FF" stop-opacity="0.85"/>
      <stop offset="18%" stop-color="#B794F6"/>
      <stop offset="48%" stop-color="#0A2478"/>
      <stop offset="100%" stop-color="#000"/>
    </radialGradient>
    <rect width="900" height="1200" fill="url(#g-glow)"/>
    <rect x="0" y="0" width="900" height="70" fill="#000"/>
    <rect x="0" y="1130" width="900" height="70" fill="#000"/>
    <rect x="90" y="140" width="720" height="8" fill="#A9BBE0" opacity="0.25"/>
    <rect x="90" y="1048" width="720" height="8" fill="#A9BBE0" opacity="0.2"/>`,
  ),
  credits: still(
    'credits',
    `<rect width="900" height="1200" fill="#07080f"/>
    <radialGradient id="g-credits-glow" cx="50%" cy="30%" r="55%">
      <stop offset="0%" stop-color="#0A2478" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <rect width="900" height="1200" fill="url(#g-credits-glow)"/>
    <rect x="180" y="160" width="540" height="16" fill="#F4F7FF" opacity="0.7"/>
    <rect x="230" y="230" width="440" height="10" fill="#A9BBE0" opacity="0.5"/>
    <rect x="200" y="300" width="500" height="10" fill="#A9BBE0" opacity="0.38"/>
    <rect x="260" y="380" width="380" height="10" fill="#B794F6" opacity="0.7"/>
    <rect x="220" y="470" width="460" height="8" fill="#A9BBE0" opacity="0.32"/>
    <rect x="280" y="540" width="340" height="8" fill="#A9BBE0" opacity="0.24"/>
    <rect x="210" y="640" width="480" height="8" fill="#A9BBE0" opacity="0.18"/>
    <rect x="250" y="740" width="400" height="8" fill="#A9BBE0" opacity="0.12"/>
    <linearGradient id="g-credits" x1="0" y1="0.45" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <rect width="900" height="1200" fill="url(#g-credits)"/>`,
  ),
  leak: still(
    'leak',
    `<rect width="900" height="1200" fill="#000"/>
    <radialGradient id="g-leak" cx="88%" cy="12%" r="55%">
      <stop offset="0%" stop-color="#F4F7FF"/>
      <stop offset="24%" stop-color="#B794F6"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <rect width="900" height="1200" fill="url(#g-leak)"/>
    <rect x="0" y="540" width="900" height="2" fill="#A9BBE0" opacity="0.3"/>
    <rect x="620" y="720" width="14" height="220" fill="#F4F7FF" opacity="0.45"/>
    <rect x="600" y="940" width="54" height="10" fill="#F4F7FF" opacity="0.35"/>
    <rect x="40" y="80" width="8" height="1040" fill="#0A2478" opacity="0.4"/>`,
  ),
  pit: still(
    'pit',
    `<rect width="900" height="1200" fill="#05060a"/>
    <linearGradient id="g-pit" x1="0" y1="0.2" x2="1" y2="0.9">
      <stop offset="0%" stop-color="#0A2478"/>
      <stop offset="55%" stop-color="#071A52"/>
      <stop offset="100%" stop-color="#000"/>
    </linearGradient>
    <rect width="900" height="640" fill="url(#g-pit)"/>
    <ellipse cx="180" cy="780" rx="90" ry="160" fill="#000"/>
    <ellipse cx="340" cy="810" rx="80" ry="150" fill="#000"/>
    <ellipse cx="500" cy="790" rx="95" ry="170" fill="#000"/>
    <ellipse cx="670" cy="820" rx="88" ry="155" fill="#000"/>
    <ellipse cx="820" cy="800" rx="70" ry="140" fill="#000"/>
    <rect x="0" y="930" width="900" height="270" fill="#000"/>
    <rect x="0" y="930" width="900" height="18" fill="#161A24"/>`,
  ),
  marquee: still(
    'marquee',
    `<rect width="900" height="1200" fill="#000"/>
    <rect x="80" y="140" width="740" height="920" rx="18" fill="#0C0E14"/>
    <rect x="110" y="180" width="680" height="840" fill="#071A52"/>
    <radialGradient id="g-marquee" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0A2478"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.2"/>
    </radialGradient>
    <rect x="110" y="180" width="680" height="840" fill="url(#g-marquee)"/>
    <rect x="200" y="360" width="500" height="28" fill="#F4F7FF" opacity="0.7"/>
    <rect x="260" y="430" width="380" height="14" fill="#B794F6" opacity="0.8"/>
    <rect x="230" y="490" width="440" height="10" fill="#A9BBE0" opacity="0.35"/>
    <circle cx="180" cy="220" r="10" fill="#F4F7FF" opacity="0.55"/>
    <circle cx="720" cy="220" r="10" fill="#F4F7FF" opacity="0.55"/>
    <circle cx="180" cy="980" r="10" fill="#F4F7FF" opacity="0.35"/>
    <circle cx="720" cy="980" r="10" fill="#F4F7FF" opacity="0.35"/>`,
  ),
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
      {/* swap: cinema masonry stills */}
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
