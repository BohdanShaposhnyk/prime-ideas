import type { CSSProperties } from 'react'
import { FilmGrain } from '../../components/grain'
import { BG_FADE_MS, CARD_COUNT, CARDS, OFFSETS, ROLL_EASE, SNAP_MS } from './config'
import type { Cycle } from './use-cycle'

function slotOf(cardIndex: number, current: number) {
  const wrapped = ((cardIndex - current) % CARD_COUNT + CARD_COUNT) % CARD_COUNT
  return wrapped > CARD_COUNT / 2 ? wrapped - CARD_COUNT : wrapped
}

/** Old photo under the new one. The next photo is mounted during the wind-up so it can fade in. */
function washIndexes(cycle: Cycle) {
  const { phase, index, fromIndex, linger } = cycle
  const next = (index + 1) % CARD_COUNT
  const ids =
    phase === 'tension'
      ? [index, next]
      : phase === 'snap'
        ? [fromIndex, index]
        : linger != null && linger !== index
          ? [linger, index]
          : [index]
  return ids.filter((value, i, list) => list.indexOf(value) === i)
}

export function OverviewDeck({ cycle }: { cycle: Cycle }) {
  const { index, fromIndex, front, phase, ready } = cycle

  const items = OFFSETS.map((offset) => {
    const cardIndex = (index + offset + CARD_COUNT * 4) % CARD_COUNT
    return {
      card: CARDS[cardIndex],
      cardIndex,
      slot: slotOf(cardIndex, index),
    }
  })

  return (
    <div className="absolute inset-0 isolate overflow-hidden bg-[var(--cs-pitch)] [--cs-overview-center-w:10.75rem] [--cs-overview-side-w:6.9rem] [--cs-overview-gap:1.15rem] sm:[--cs-overview-center-w:16.25rem] sm:[--cs-overview-side-w:10.5rem] sm:[--cs-overview-gap:2.35rem] lg:[--cs-overview-center-w:18.75rem] lg:[--cs-overview-side-w:12rem] lg:[--cs-overview-gap:3.1rem]">
      <div
        className="cs-overview-wash pointer-events-none absolute inset-0 overflow-hidden"
        data-ready={ready ? 'true' : 'false'}
        aria-hidden
        style={{ '--cs-bg-fade': `${BG_FADE_MS}ms` } as CSSProperties}
      >
        {washIndexes(cycle).map((i) => (
          <div
            key={CARDS[i].id}
            className="cs-overview-bg absolute inset-0"
            data-active={i === index ? '' : undefined}
          >
            <img
              src={CARDS[i].image}
              alt=""
              decoding="async"
              className="absolute inset-[-8%] h-[116%] w-[116%] max-w-none object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--cs-pitch)_76%,transparent)]" />
      </div>
      <FilmGrain className="cs-overview-grain pointer-events-none absolute inset-0 z-[1] mix-blend-soft-light" />

      <h2 id="cs-overview-title" className="sr-only">
        Show up. Link up. Game on. Hang out. Lose track. Stay late.
      </h2>

      <div
        className="cs-overview-stage absolute inset-0 z-[2] overflow-hidden"
        data-phase={phase}
        data-ready={ready ? 'true' : 'false'}
        aria-hidden
        style={{
          '--cs-snap': `${SNAP_MS}ms`,
          '--cs-roll-ease': ROLL_EASE,
        } as CSSProperties}
      >
        {items.map(({ card, cardIndex, slot }) => {
          const skip = Math.abs(slot - slotOf(cardIndex, fromIndex)) > 1
          return (
            <figure
              key={card.id}
              data-overview-card
              data-slot={slot}
              data-front={card.id === CARDS[front].id ? '' : undefined}
              data-skip={skip ? '' : undefined}
              className="cs-overview-card absolute"
            >
              <div className="cs-overview-plate overflow-hidden rounded-[var(--cs-radius-media)] bg-[var(--cs-void)]">
                <img
                  src={card.image}
                  alt=""
                  decoding="async"
                  fetchPriority={cardIndex === 0 ? 'high' : 'low'}
                  className="block aspect-[3/4] w-full object-cover"
                />
              </div>
            </figure>
          )
        })}
      </div>
    </div>
  )
}
