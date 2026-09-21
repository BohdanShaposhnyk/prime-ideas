import { useEffect, useRef, useState } from 'react'
import barPartyGirl from '../assets/bar/bar-party-girl.jpg'
import pcParty from '../assets/gaming/pc-party.jpg'
import smoking from '../assets/hookah/smoking.jpg'
import micRay from '../assets/karaoke/mic-ray.jpg'

const LINE = 'NO QUEUE. JUST PLAY.'
const HOLD_MS = 2000
const TENSION_MS = 280
const TENSION_HANDOFF_MS = 200
const SNAP_MS = 580
const OFFSETS = [-2, -1, 0, 1] as const
const ROLL_EASE = `linear(
  0,
  0.018 14%,
  0.07 22%,
  0.28 32%,
  0.55 44%,
  0.82 56%,
  0.94 70%,
  0.98 84%,
  0.995 93%,
  1
)`

const CARDS = [
  { id: 'floor', image: pcParty },
  { id: 'voice', image: micRay },
  { id: 'bar', image: barPartyGirl },
  { id: 'ember', image: smoking },
]

const TYPE_LOOP = Array.from({ length: 8 }, () => LINE)
const CARD_COUNT = CARDS.length

function slotOf(cardIndex: number, current: number) {
  let delta = ((cardIndex - current) % CARD_COUNT + CARD_COUNT) % CARD_COUNT
  if (delta > CARD_COUNT / 2) delta -= CARD_COUNT
  return delta
}

export default function ScenePlay() {
  const [index, setIndex] = useState(0)
  const [fromIndex, setFromIndex] = useState(0)
  const [front, setFront] = useState(0)
  const [phase, setPhase] = useState<'rest' | 'tension' | 'snap'>('rest')
  const [ready, setReady] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let cancelled = false
    let timer = 0
    let frontTimer = 0

    const hold = () => {
      if (cancelled) return
      const current = indexRef.current
      setPhase('rest')
      setFront(current)
      setFromIndex(current)
      timer = window.setTimeout(wind, HOLD_MS)
    }
    const wind = () => {
      if (cancelled) return
      setPhase('tension')
      timer = window.setTimeout(snap, TENSION_HANDOFF_MS)
    }
    const snap = () => {
      if (cancelled) return
      const current = indexRef.current
      const next = (current + 1) % CARD_COUNT
      setPhase('snap')
      setFromIndex(current)
      setIndex(next)
      indexRef.current = next
      frontTimer = window.setTimeout(() => {
        if (!cancelled) setFront(next)
      }, Math.round(SNAP_MS * 0.42))
      timer = window.setTimeout(hold, SNAP_MS)
    }

    timer = window.setTimeout(wind, HOLD_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.clearTimeout(frontTimer)
    }
  }, [])

  const items = OFFSETS.map((offset) => {
    const cardIndex = (index + offset + CARD_COUNT * 4) % CARD_COUNT
    return {
      card: CARDS[cardIndex],
      cardIndex,
      slot: slotOf(cardIndex, index),
    }
  })

  return (
    <section
      aria-labelledby="cs-play-title"
      data-scene="play"
      data-scroll="play-recut"
      className="relative isolate h-dvh overflow-hidden bg-[var(--cs-pitch)] [--cs-play-center-w:10.75rem] [--cs-play-side-w:6.9rem] [--cs-play-gap:1.15rem] sm:[--cs-play-center-w:16.25rem] sm:[--cs-play-side-w:10.5rem] sm:[--cs-play-gap:2.35rem] lg:[--cs-play-center-w:18.75rem] lg:[--cs-play-side-w:12rem] lg:[--cs-play-gap:3.1rem]"
    >
      <style>{`
        .cs-play-stage {
          --cs-play-nudge: 0px;
        }
        .cs-play-stage[data-phase="tension"] {
          --cs-play-nudge: -1.45rem;
        }
        .cs-play-card {
          left: 50%;
          top: 50%;
          width: var(--cs-play-side-w);
          z-index: 10;
          opacity: 0;
          transform: translate3d(
            calc(-50% + var(--cs-play-nudge) + var(--cs-play-x)),
            -50%,
            0
          );
          will-change: transform, width, opacity;
        }
        .cs-play-stage[data-ready="true"] .cs-play-card:not([data-skip]) {
          transition:
            transform ${SNAP_MS}ms ${ROLL_EASE},
            width ${SNAP_MS}ms ${ROLL_EASE},
            opacity 180ms linear;
        }
        .cs-play-stage[data-ready="true"] .cs-play-card[data-slot="-1"]:not([data-skip]),
        .cs-play-stage[data-ready="true"] .cs-play-card[data-slot="0"]:not([data-skip]),
        .cs-play-stage[data-ready="true"] .cs-play-card[data-slot="1"]:not([data-skip]) {
          transition:
            transform ${SNAP_MS}ms ${ROLL_EASE},
            width ${SNAP_MS}ms ${ROLL_EASE},
            opacity 180ms linear 220ms;
        }
        .cs-play-stage[data-ready="true"][data-phase="tension"] .cs-play-card:not([data-skip]) {
          transition: transform ${TENSION_MS}ms cubic-bezier(0.62, 0, 0.78, 0.22);
        }
        .cs-play-card[data-front] {
          z-index: 30;
        }
        .cs-play-card[data-slot="0"] {
          width: var(--cs-play-center-w);
          opacity: 1;
          --cs-play-x: 0px;
        }
        .cs-play-card[data-slot="-1"] {
          opacity: 1;
          --cs-play-x: calc(-0.5 * var(--cs-play-center-w) - var(--cs-play-gap) - 0.5 * var(--cs-play-side-w));
        }
        .cs-play-card[data-slot="1"] {
          opacity: 1;
          --cs-play-x: calc(0.5 * var(--cs-play-center-w) + var(--cs-play-gap) + 0.5 * var(--cs-play-side-w));
        }
        .cs-play-card[data-slot="-2"] {
          --cs-play-x: calc(-0.5 * var(--cs-play-center-w) - 2 * var(--cs-play-gap) - 1.5 * var(--cs-play-side-w));
        }
        .cs-play-card[data-slot="2"] {
          --cs-play-x: calc(0.5 * var(--cs-play-center-w) + 2 * var(--cs-play-gap) + 1.5 * var(--cs-play-side-w));
        }
        .cs-play-card img {
          filter: blur(10px);
        }
        .cs-play-stage[data-ready="true"] .cs-play-card:not([data-skip]) img {
          transition: filter ${SNAP_MS}ms ${ROLL_EASE};
        }
        .cs-play-card[data-front] img {
          filter: none;
        }
        .cs-play-card[data-front] .cs-play-plate {
          box-shadow: 0 28px 70px rgba(0, 0, 0, 0.62);
        }
        .cs-play-type {
          animation: cs-play-type 16s linear infinite;
          will-change: transform;
        }
        @keyframes cs-play-type {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-play-stage[data-ready="true"] .cs-play-card,
          .cs-play-stage[data-ready="true"] .cs-play-card img {
            transition: none;
          }
          .cs-play-type { animation: none; }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 40% at 50% 18%, #071A52 0%, transparent 70%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
        aria-hidden
      />

      <h2 id="cs-play-title" className="sr-only">
        No queue. Just play.
      </h2>

      <div
        className="cs-play-stage absolute inset-0 overflow-hidden"
        data-phase={phase}
        data-ready={ready ? 'true' : 'false'}
        aria-hidden
      >
        {items.map(({ card, cardIndex, slot }) => {
          const skip = Math.abs(slot - slotOf(cardIndex, fromIndex)) > 1
          return (
            <figure
              key={card.id}
              data-play-card
              data-slot={slot}
              data-front={card.id === CARDS[front].id ? '' : undefined}
              data-skip={skip ? '' : undefined}
              className="cs-play-card absolute"
            >
              <div className="cs-play-plate overflow-hidden rounded-[0.7rem] bg-[var(--cs-void)]">
                <img
                  src={card.image}
                  alt=""
                  className="block aspect-[3/4] w-full object-cover"
                />
              </div>
            </figure>
          )
        })}

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 overflow-hidden">
          <div className="cs-play-type flex w-max items-center font-[family-name:var(--cs-display)] text-[clamp(2.6rem,8vw,6.1rem)] leading-none tracking-[0.02em] text-[var(--cs-ice)] uppercase">
            {[...TYPE_LOOP, ...TYPE_LOOP].map((phrase, i) => (
              <span key={i} className="flex shrink-0 items-center">
                {phrase}
                <span className="mx-[0.55em] inline-block text-[0.28em] leading-none">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
