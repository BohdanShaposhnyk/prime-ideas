import { SplitChars, SplitWords } from './type-split'

const LINES = ['SING', 'IT', 'BACK'] as const

/**
 * Echo — tall narrow reversed slab; stacked condensed lines.
 */
export default function BlockEcho() {
  return (
    <section
      aria-labelledby="lk-echo-title"
      data-lockup="echo"
      data-spine-id="05"
      className="relative h-[180vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 flex min-h-dvh items-stretch overflow-hidden px-3 py-4 sm:px-5 sm:py-6"
      >
        <article
          data-block
          data-latch="left"
          className="relative flex min-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden sm:min-h-[calc(100dvh-3rem)] sm:w-[min(100%,28rem)]"
        >
          <div
            data-placeholder="visual"
            className="absolute inset-0"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(180deg, #1C1B18 0%, var(--lk-ink) 40%, #090908 100%)
                `,
              }}
            />
            <div className="absolute top-[18%] right-6 left-6 h-px bg-[var(--lk-proof)]" />
            <div className="absolute right-6 bottom-[16%] left-6 h-px bg-[var(--lk-proof)]" />
          </div>

          <div className="relative z-10 flex h-full min-h-[calc(100dvh-2rem)] flex-col justify-between px-6 py-7 text-[var(--lk-stock)] sm:min-h-[calc(100dvh-3rem)] sm:px-8">
            <p
              data-type="meta"
              className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] text-[var(--lk-proof)] uppercase"
            >
              05 / ECHO
            </p>

            <h2
              id="lk-echo-title"
              className="flex flex-col font-[family-name:var(--lk-condensed)] leading-[0.78] font-extrabold tracking-[-0.03em] uppercase"
              aria-label="SING IT BACK"
            >
              <span className="overflow-hidden">
                <SplitChars
                  text={LINES[0]}
                  kind="echo-line"
                  decorative
                  className="flex text-[clamp(3.8rem,14vw,7.5rem)]"
                />
              </span>
              <span className="overflow-hidden text-[color-mix(in_srgb,var(--lk-stock)_70%,transparent)]">
                <SplitChars
                  text={LINES[1]}
                  kind="echo-line"
                  decorative
                  className="flex text-[clamp(2.6rem,10vw,5.2rem)]"
                />
              </span>
              <span className="overflow-hidden">
                <SplitChars
                  text={LINES[2]}
                  kind="echo-line"
                  decorative
                  className="flex text-[clamp(4.2rem,16vw,8.5rem)]"
                />
              </span>
            </h2>

            <SplitWords
              as="p"
              text="the night answers"
              kind="slide-words"
              className="font-[family-name:var(--lk-serif)] text-[1.15rem] italic"
            />
          </div>
        </article>
      </div>
    </section>
  )
}
