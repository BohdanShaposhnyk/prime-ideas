import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Masonry from '@/shared/bits/Masonry'

const GAP = 8
const VIOLET = '#B794F6'

/** Column 0 is two stills of unequal height; lockup sits in the middle stack. */
const TILES = [
  { id: 'gate', fr: 0.68, col: 0 },
  { id: 'pit', fr: 0.32, col: 0 },
  { id: 'rake', fr: 0.2, col: 1 },
  { id: 'lockup', fr: 0.52, col: 1 },
  { id: 'marquee', fr: 0.28, col: 1 },
  { id: 'glow', fr: 0.41, col: 2 },
  { id: 'aisle', fr: 0.59, col: 2 },
] as const

const LOCKUP = (
  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black px-3 text-center sm:px-5">
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
      className="relative z-10 max-w-[16rem] sm:max-w-[22rem]"
    >
      <span className="block font-[family-name:var(--cs-body)] text-[clamp(0.72rem,1.7vw,1.25rem)] font-medium tracking-[0.08em] text-[var(--cs-ice)]">
        Your night.
      </span>
      <span className="mt-1.5 flex flex-wrap items-baseline justify-center gap-x-[0.28em]">
        <span className="font-[family-name:var(--cs-body)] text-[clamp(0.72rem,1.7vw,1.25rem)] font-medium tracking-[0.08em] text-[var(--cs-ice)]">
          Your
        </span>
        <span
          className="font-[family-name:var(--cs-display)] text-[clamp(1.7rem,5.2vw,5.4rem)] leading-[0.8] uppercase"
          style={{
            color: VIOLET,
            textShadow: `0 0 36px color-mix(in srgb, ${VIOLET} 60%, transparent)`,
          }}
        >
          PRIME
        </span>
      </span>
    </h2>
  </div>
)

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
  const [stageH, setStageH] = useState(0)
  const [active, setActive] = useState(false)

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el) return
    const update = () => setStageH(el.clientHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.22, rootMargin: '-6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const items = useMemo(() => {
    const counts = [0, 0, 0]
    for (const tile of TILES) counts[tile.col] += 1
    return TILES.map(tile => {
      const available = Math.max(stageH - GAP * (counts[tile.col] - 1), 1)
      return {
        id: tile.id,
        column: tile.col,
        height: Math.round(tile.fr * available),
        img: tile.id === 'lockup' ? undefined : STILLS[tile.id],
        content: tile.id === 'lockup' ? LOCKUP : undefined,
      }
    })
  }, [stageH])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cs-screen-title"
      data-scene="screen"
      data-scroll="screen-masonry"
      className="relative h-dvh overflow-hidden bg-[var(--cs-pitch)]"
    >
      {/* swap: cinema masonry stills */}
      <div ref={stageRef} className="absolute inset-1.5 sm:inset-2.5">
        {stageH > 0 ? (
          <Masonry
            items={items}
            columnCount={3}
            gap={GAP}
            exactHeight
            active={active}
            animateFrom="bottom"
            blurToFocus
            scaleOnHover
            hoverScale={0.98}
            duration={0.85}
            stagger={0.08}
            ease="power3.out"
          />
        ) : null}
      </div>
    </section>
  )
}
