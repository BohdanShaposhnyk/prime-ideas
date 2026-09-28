import { useEffect, useRef, useState } from 'react'
import InfiniteSpiral from '@/shared/bits/InfiniteSpiral'
import bottles from '../assets/bar/bottles.webp'
import seats from '../assets/cinema/seats.webp'
import controllerDark from '../assets/gaming/controller-dark-purple.webp'
import hookahCoal from '../assets/hookah/hookah-coal.webp'
import micGold from '../assets/karaoke/mic-gold.webp'
import { supportClass } from '../palette'

const HOLD_W = 1
const ROLL_W = 1.85
const CARDS = [
  {
    id: 'bar',
    word: 'BAR',
    line: 'Eat well. Drink better.',
    alt: 'Bar',
    src: bottles,
  },
  {
    id: 'play',
    word: 'PLAY ZONE',
    line: 'Built for serious play.',
    alt: 'Play zone',
    src: controllerDark,
  },
  {
    id: 'hookah',
    word: 'HOOKAH',
    line: 'Your late-night ritual.',
    alt: 'Hookah',
    src: hookahCoal,
  },
  {
    id: 'karaoke',
    word: 'KARAOKE',
    line: 'No stage fright allowed.',
    alt: 'Karaoke',
    src: micGold,
  },
  {
    id: 'cinema',
    word: 'CINEMA',
    line: 'Your private screen time.',
    alt: 'Cinema',
    src: seats,
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

function easeRoll(u: number) {
  const x = clamp(u, 0, 1)
  return x * x * (3 - 2 * x)
}

function motionAt(t: number) {
  const last = CARDS.length - 1
  const total = CARDS.length * HOLD_W + last * ROLL_W
  let x = clamp(t, 0, 1) * total

  for (let i = 0; i < CARDS.length; i++) {
    if (i === last || x <= HOLD_W) {
      return { progress: i, word: i }
    }
    x -= HOLD_W
    if (x <= ROLL_W) {
      const u = x / ROLL_W
      return {
        progress: i + easeRoll(u),
        word: u < 0.5 ? i : i + 1,
      }
    }
    x -= ROLL_W
  }

  return { progress: last, word: last }
}

export default function SceneShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const drivenProgressRef = useRef(0)
  const [wordIndex, setWordIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const sticky = stickyRef.current
    if (!section || !sticky) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastIndex = -1
    let visible = false

    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = sticky.clientHeight || window.innerHeight
      const total = Math.max(section.offsetHeight - vh, 1)
      const t = clamp(-rect.top / total, 0, 1)
      const motion = motionAt(t)
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
    io.observe(sticky)

    return () => {
      visible = false
      io.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const card = CARDS[wordIndex]

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cs-showcase-title"
      data-scene="showcase"
      data-scroll="showcase-spiral"
      className="relative h-[645vh] bg-[var(--cs-pitch)]"
    >
      <div ref={stickyRef} className="cs-scene sticky top-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              className="absolute inset-0 opacity-0 transition-opacity duration-[820ms] ease-linear motion-reduce:transition-none data-[active]:opacity-100"
              data-active={i === wordIndex ? '' : undefined}
            >
              <img
                src={card.src}
                alt=""
                decoding="async"
                className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none scale-[1.12] object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--cs-pitch)_84%,transparent)]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-[0.14]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
          aria-hidden
        />

        <h2 id="cs-showcase-title" className="sr-only">
          Bar. Play zone. Hookah. Karaoke. Cinema.
        </h2>
        <div
          aria-live="polite"
          className="pointer-events-none absolute bottom-[5%] left-[5%] z-30 max-w-[min(88vw,36rem)] sm:bottom-[6%] sm:left-[6%]"
        >
          <p
            data-copy="caption"
            className="font-[family-name:var(--cs-display)] text-[clamp(3.55rem,13.5vw,8.6rem)] leading-[var(--cs-lead-display)] tracking-[var(--cs-track-display)] text-[var(--cs-ice)] uppercase [text-shadow:0_2px_22px_rgba(0,0,0,0.45)]"
          >
            {card.word}
          </p>
          <p
            data-copy="support"
            className={`-mt-0.5 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] ${supportClass}`}
          >
            {card.line}
          </p>
        </div>

        <div className="absolute inset-0 z-20">
          <InfiniteSpiral
            items={SPIRAL_ITEMS}
            drivenProgressRef={drivenProgressRef}
            animationMode="scroll"
            speed={0}
            direction="up"
            radius={420}
            cardWidth={220}
            cardHeight={310}
            verticalSpacing={168}
            perspective={1280}
            cardsPerTurn={4}
            centerScale={1.42}
            edgeFade={0.34}
            edgeBlur={0}
            cardRadius={14}
            cardTilt={4}
            pauseOnHover={false}
            imageFit="cover"
            className="h-full min-h-0"
          />
        </div>
      </div>
    </section>
  )
}
