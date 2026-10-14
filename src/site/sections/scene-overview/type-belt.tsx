import { lockupClass } from '../../lib/palette'
import { TYPE_LOOP } from './config'
import type { Cycle } from './use-cycle'
import { useTypeBelt } from './use-type-belt'

/** Runs across the whole stage, unclipped — the front card punches a hole so the line reads behind it. */
export function TypeBelt({ cycle }: { cycle: Cycle }) {
  const { phase, ready } = cycle
  const moving = phase !== 'rest'
  const beltRef = useTypeBelt(moving, ready)

  return (
    <div
      ref={beltRef}
      className="cs-overview-type-wrap pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden"
      aria-hidden
    >
      <div className={`cs-overview-type flex w-max items-center sm:text-[clamp(2.6rem,8vw,6.1rem)] ${lockupClass}`}>
        {[...TYPE_LOOP, ...TYPE_LOOP].map((phrase, i) => (
          <span key={i} className="flex shrink-0 items-center">
            {phrase}
            <span className="mx-[0.55em] inline-block text-[0.28em] leading-none">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
