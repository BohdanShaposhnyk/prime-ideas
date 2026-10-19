import { useEffect, useRef, useState } from 'react'
import { intersectsSnapPort, observeSnapPort, snapScrollRoot } from '@/site/hooks/snap-in-view'
import InfiniteSpiral from '@/site/bits/InfiniteSpiral'
import barContrast from '../assets/bar/bar-contrast.webp'
import carsimTilted from '../assets/gaming/carsim-tilted.webp'
import hookahPurple from '../assets/hookah/hookah-purple.webp'
import guestRoom from '../assets/showcase/guest-room-3-ls.webp'
import loungeHall from '../assets/showcase/lounge-2.webp'
import mic from '../assets/showcase/mic.webp'
import rigs from '../assets/showcase/rigs.webp'
import { BookNightButton } from '../components/book-night'
import { FilmGrain } from '../components/grain'
import { clamp } from '../lib/math'
import { prefersReducedMotion } from '../lib/motion'
import { lockupClass, lockupToSupportClass, supportClass } from '../lib/palette'
import { showcaseMinHeight } from './showcase-span'

const HOLD_W = 1
const ROLL_W = 1.85
/** Share of each card step that rests before the roll. */
const STEP_HOLD = HOLD_W / (HOLD_W + ROLL_W)

const CARDS = [
  {
    id: 'play',
    word: 'PLAY ZONE',
    line: 'PC rooms for one, two, four, or five.',
    alt: 'Play zone',
    src: rigs,
  },
  {
    id: 'sim',
    word: 'SIM RACING',
    line: 'Motorsport simulators.',
    alt: 'Sim racing',
    src: carsimTilted,
  },
  {
    id: 'bar',
    word: 'BAR',
    line: 'A restaurant kitchen and bar.',
    alt: 'Bar',
    src: barContrast,
  },
  {
    id: 'karaoke',
    word: 'KARAOKE',
    line: 'A room for your group to sing.',
    alt: 'Karaoke',
    src: mic,
  },
  {
    id: 'room',
    word: 'PRIVATE ROOM',
    line: 'A private cinema for your group.',
    alt: 'Private room',
    src: guestRoom,
  },
  {
    id: 'hall',
    word: 'CINEMA HALL',
    line: 'The large hall. PlayStation 5 in every cinema and lounge.',
    alt: 'Cinema hall',
    src: loungeHall,
  },
  {
    id: 'hookah',
    word: 'HOOKAH',
    line: 'Its own lounge, clear of the other rooms.',
    alt: 'Hookah',
    src: hookahPurple,
  },
] as const

const SHOWCASE_MIN_HEIGHT = showcaseMinHeight(CARDS.length)

const SPIRAL_ITEMS = CARDS.map(({ id, src, alt, word }) => ({
  id,
  src,
  alt,
  label: word,
}))

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
      const progress = prefersReducedMotion() ? Math.round(motion.progress) : motion.progress
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
      const progress = prefersReducedMotion() ? Math.round(motion.progress) : motion.progress
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
      id="cs-nav-photos"
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
          Play zone. Sim racing. Bar. Karaoke. Private room. Cinema hall. Hookah.
        </h2>
        <div className="pointer-events-none absolute bottom-[max(2.5rem,env(safe-area-inset-bottom))] left-[5%] z-30 w-[min(20rem,86vw)] sm:bottom-[12%] sm:left-[6%] sm:w-[min(88vw,36rem)]">
          <div aria-live="polite">
            <p
              data-copy="caption"
              className={`${lockupClass} [text-shadow:0_2px_22px_rgba(0,0,0,0.45)]`}
            >
              {card.word}
            </p>
            <p
              data-copy="support"
              className={`${lockupToSupportClass} [text-shadow:0_1px_12px_rgba(0,0,0,0.55)] ${supportClass}`}
            >
              {card.line}
            </p>
          </div>
          <div className="pointer-events-auto mt-4 sm:mt-5">
            <BookNightButton />
          </div>
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
            finite
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
