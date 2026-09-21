import { useEffect, useRef, useState } from 'react'
import InfiniteSpiral from '@/shared/bits/InfiniteSpiral'
import bottles from '../assets/bar/bottles.jpg'
import controllerDark from '../assets/gaming/controller-dark-purple.jpg'
import hookahCoal from '../assets/hookah/hookah-coal.jpg'
import micGold from '../assets/karaoke/mic-gold.jpg'

const LAND_SCALE = 1 / 0.75
const REVEAL_SCALE = 1
const HOLD_W = 1
const ROLL_W = 1.85
const ZOOM_OUT_END = 0.34
const ZOOM_IN_START = 0.6
const INTRO_U0 = (ZOOM_OUT_END + ZOOM_IN_START) / 2
const CARDS = [
  {
    id: 'ice',
    word: 'ICE',
    alt: 'Bar still',
    src: bottles,
  },
  {
    id: 'charge',
    word: 'CHARGE',
    alt: 'Play still',
    src: controllerDark,
  },
  {
    id: 'voltage',
    word: 'VOLTAGE',
    alt: 'Heat still',
    src: hookahCoal,
  },
  {
    id: 'night',
    word: 'NIGHT',
    alt: 'Stage still',
    src: micGold,
  },
] as const

const SPIRAL_ITEMS = CARDS.map(({ id, src, alt, word }) => ({
  id,
  src,
  alt,
  label: word,
}))

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0 || 1), 0, 1)
  return x * x * (3 - 2 * x)
}

function easeRoll(u: number) {
  const x = clamp(u, 0, 1)
  if (x < ZOOM_IN_START) {
    const local = x / ZOOM_IN_START
    return 0.7 * local * local * (3 - 2 * local)
  }
  const local = (x - ZOOM_IN_START) / (1 - ZOOM_IN_START)
  const tail = 1 - (1 - local) * (1 - local)
  return 0.7 + 0.3 * tail
}

function zoomAmount(u: number) {
  const out = smoothstep(0, ZOOM_OUT_END, u)
  const back = smoothstep(ZOOM_IN_START, 1, u)
  return out * (1 - back)
}

function motionAt(t: number) {
  const last = CARDS.length - 1
  const introW = ROLL_W * (1 - INTRO_U0)
  const total = introW + CARDS.length * HOLD_W + last * ROLL_W
  let x = clamp(t, 0, 1) * total

  if (x <= introW) {
    const u = INTRO_U0 + (x / introW) * (1 - INTRO_U0)
    return rollState(-1, u, 0)
  }
  x -= introW

  for (let i = 0; i < CARDS.length; i++) {
    if (i === last || x <= HOLD_W) {
      return { progress: i, scale: LAND_SCALE, word: i }
    }
    x -= HOLD_W
    if (x <= ROLL_W) {
      return rollState(i, x / ROLL_W, i + 1)
    }
    x -= ROLL_W
  }

  return { progress: last, scale: LAND_SCALE, word: last }
}

function rollState(from: number, u: number, landWord: number) {
  const revealed = zoomAmount(u)
  return {
    progress: from + easeRoll(u),
    scale: LAND_SCALE - (LAND_SCALE - REVEAL_SCALE) * revealed,
    word: u < ZOOM_IN_START ? Math.max(from, 0) : landWord,
  }
}

export default function SceneShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const cameraRef = useRef<HTMLDivElement>(null)
  const drivenProgressRef = useRef(-1 + easeRoll(INTRO_U0))
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const camera = cameraRef.current
    if (!section || !camera) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastIndex = -1
    let visible = true

    const update = () => {
      const rect = section.getBoundingClientRect()
      const total = Math.max(section.offsetHeight - window.innerHeight, 1)
      const t = clamp(-rect.top / total, 0, 1)
      const motion = motionAt(t)
      const scale = reduced.matches ? LAND_SCALE : motion.scale
      camera.style.transform = `scale(${scale})`
      drivenProgressRef.current = reduced.matches
        ? Math.round(motion.progress)
        : motion.progress
      if (motion.word !== lastIndex) {
        lastIndex = motion.word
        setWordIndex(motion.word)
      }
    }

    const loop = () => {
      update()
      frame = visible ? requestAnimationFrame(loop) : 0
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) loop()
    })
    io.observe(section)
    loop()

    return () => {
      visible = false
      io.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const word = CARDS[wordIndex].word

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cs-showcase-title"
      data-scene="showcase"
      data-scroll="showcase-spiral"
      className="relative h-[520vh] bg-[var(--cs-pitch)]"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 58% at 50% 42%, #071A52 0%, #05060c 48%, #000000 78%)',
          }}
          aria-hidden
        />

        <h2 id="cs-showcase-title" className="sr-only">
          Showcase
        </h2>
        <p
          aria-live="polite"
          data-copy="caption"
          className="pointer-events-none absolute bottom-[5%] left-[5%] z-10 font-[family-name:var(--cs-display)] text-[clamp(4.2rem,16vw,10.5rem)] leading-[0.78] uppercase sm:bottom-[6%] sm:left-[6%]"
          style={{
            color: 'transparent',
            WebkitTextStroke: '0.026em color-mix(in srgb, var(--cs-ice) 36%, transparent)',
          }}
        >
          {word}
        </p>

        <div className="absolute inset-[2.5%] z-20 sm:inset-[3.5%]">
          <div
            ref={cameraRef}
            className="h-full w-full origin-center will-change-transform [transform:scale(1)]"
          >
            <InfiniteSpiral
              items={SPIRAL_ITEMS}
              drivenProgressRef={drivenProgressRef}
              animationMode="scroll"
              speed={0}
              direction="up"
              radius={210}
              cardWidth={220}
              cardHeight={310}
              verticalSpacing={82}
              perspective={1280}
              cardsPerTurn={4}
              centerScale={1.42}
              edgeFade={0.34}
              edgeBlur={8}
              cardRadius={14}
              cardTilt={4}
              pauseOnHover={false}
              imageFit="cover"
              className="h-full min-h-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
