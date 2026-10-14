import EchoText from '@/site/bits/EchoText'
import { palette } from '../../lib/palette'
import { GOLD_TINT, WORD_CLASS } from './config'
import { useLockupPlay } from './use-lockup'

type LockupProps = {
  play: boolean
  delay: number
  coarse: boolean
  reduced: boolean
}

export function Lockup({ play, delay, coarse, reduced }: LockupProps) {
  const { rootRef, showPrime } = useLockupPlay(play, delay, coarse, reduced)

  return (
    <div
      ref={rootRef}
      className="@container relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--cs-pitch)] px-[8%] text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 58%, color-mix(in srgb, var(--cs-gold) 16%, #000) 0%, #000000 72%)',
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
                  color={palette.gold}
                  tint={GOLD_TINT}
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
                    textShadow: `0 0 36px color-mix(in srgb, ${palette.gold} 60%, transparent)`,
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
