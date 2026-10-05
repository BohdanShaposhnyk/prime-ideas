import { useEffect, useRef, useState } from 'react'
import { intersectsSnapPort, observeSnapPort, snapScrollRoot } from '@/site/hooks/snap-in-view'
import InfiniteSpiral from '@/site/bits/InfiniteSpiral'
import bottles from '../assets/bar/bottles.webp'
import seats from '../assets/cinema/seats.webp'
import controllerDark from '../assets/gaming/controller-dark-purple.webp'
import hookahCoal from '../assets/hookah/hookah-coal.webp'
import micGold from '../assets/karaoke/mic-gold.webp'
import { FilmGrain } from '../components/grain'
import { lockupClass, supportClass } from '../lib/palette'
import { SHOWCASE_MIN_HEIGHT } from './showcase-span'

export { SHOWCASE_MIN_HEIGHT }

const HOLD_W = 1
const ROLL_W = 1.85
/** Share of each card step that rests before the roll. */
const STEP_HOLD = HOLD_W / (HOLD_W + ROLL_W)

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
  if (last <= 0) return { progress: 0, word: 0 }
  const x = clamp(t, 0, 1) * last
  const i = Math.min(Math.floor(x), last - 1)
  const u = x - i
  if (u <= STEP_HOLD) return { progress: i, word: i }
  const roll = (u - STEP_HOLD) / (1 - STEP_HOLD)
  return {
    progress: i + easeRoll(roll),
    word: roll < 0.5 ? i : i + 1,
  }
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
    const port = snapScrollRoot(section)
    let frame = 0
    let lastIndex = -1
    let lastProgress = Number.NaN
    let visible = false

    const read = () => {
      const rect = section.getBoundingClientRect()
      const portTop = port?.getBoundingClientRect().top ?? 0
      const vh = sticky.clientHeight || port?.clientHeight || window.innerHeight
      const total = Math.max(section.offsetHeight - vh, 1)
      const t = clamp(-(rect.top - portTop) / total, 0, 1)
      return motionAt(t)
    }

    const publish = () => {
      const motion = read()
      const progress = reduced.matches ? Math.round(motion.progress) : motion.progress
      if (progress === lastProgress && motion.word === lastIndex) return
      lastProgress = progress
      drivenProgressRef.current = progress
      if (motion.word !== lastIndex) {
        lastIndex = motion.word
        setWordIndex(motion.word)
      }
    }

    const onScroll = () => {
      if (!visible) return
      const motion = read()
      const progress = reduced.matches ? Math.round(motion.progress) : motion.progress
      if (progress !== lastProgress) {
        lastProgress = progress
        drivenProgressRef.current = progress
      }
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!visible) return
        const next = read()
        if (next.word !== lastIndex) {
          lastIndex = next.word
          setWordIndex(next.word)
        }
      })
    }

    const stopWatch = observeSnapPort(sticky, (hit) => {
      visible = hit
      if (hit) publish()
    })
    if (intersectsSnapPort(sticky)) {
      visible = true
      publish()
    }

    const scroller: EventTarget = port ?? window
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      visible = false
      stopWatch()
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
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
      className="relative bg-[var(--cs-pitch)]"
      style={{ height: SHOWCASE_MIN_HEIGHT }}
    >
      {CARDS.map((item, i) => (
        <div
          key={item.id}
          data-showcase-stop=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-px"
          style={{ top: `calc(${i} * var(--cs-card-pitch, calc(var(--cs-h, 100svh) * 0.8)))` }}
        />
      ))}
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
        <FilmGrain className="pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light opacity-[0.14]" />

        <h2 id="cs-showcase-title" className="sr-only">
          Bar. Play zone. Hookah. Karaoke. Cinema.
        </h2>
        <div
          aria-live="polite"
          className="pointer-events-none absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] left-[5%] z-30 w-[min(20rem,86vw)] sm:bottom-[12%] sm:left-[6%] sm:w-[min(88vw,36rem)]"
        >
          <p
            data-copy="caption"
            className={`${lockupClass} [text-shadow:0_2px_22px_rgba(0,0,0,0.45)]`}
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
