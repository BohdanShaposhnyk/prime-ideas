import { SplitChars, SplitWords } from './type-split'

/**
 * Mass — full-bleed ink slab; condensed ultra type as weight.
 */
export default function BlockMass() {
  return (
    <section
      aria-labelledby="lk-mass-title"
      data-lockup="mass"
      data-spine-id="01"
      className="relative h-[180vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 flex min-h-dvh items-stretch overflow-hidden px-3 py-4 sm:px-5 sm:py-6"
      >
        <article
          data-block
          data-latch="left"
          className="relative flex min-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden sm:min-h-[calc(100dvh-3rem)]"
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
                  radial-gradient(ellipse 70% 50% at 80% 20%, color-mix(in srgb, var(--lk-proof) 28%, transparent) 0%, transparent 55%),
                  linear-gradient(165deg, #1A1916 0%, var(--lk-ink) 48%, #0A0A09 100%)
                `,
              }}
            />
            <div className="absolute top-7 right-7 size-14 rounded-full border border-[var(--lk-proof)] sm:top-10 sm:right-10 sm:size-20" />
            <div className="absolute right-[18%] bottom-[22%] left-[8%] h-px bg-[color-mix(in_srgb,#E8E2D4_12%,transparent)]" />
          </div>

          <div className="relative z-10 flex h-full min-h-[calc(100dvh-2rem)] flex-col justify-between px-5 py-6 text-[var(--lk-stock)] sm:min-h-[calc(100dvh-3rem)] sm:px-10 sm:py-9">
            <div className="flex items-start justify-between">
              <p
                data-type="meta"
                className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--lk-stock)_55%,transparent)] uppercase"
              >
                01 / MASS
              </p>
              <p
                data-type="meta"
                className="font-[family-name:var(--lk-condensed)] text-[0.8rem] tracking-[0.18em] text-[var(--lk-proof)] uppercase"
              >
                Heavy sort
              </p>
            </div>

            <div className="overflow-hidden">
              <SplitChars
                as="h2"
                id="lk-mass-title"
                text="MASS"
                kind="drop-chars"
                className="-ml-[0.06em] flex font-[family-name:var(--lk-condensed)] text-[clamp(6.5rem,28vw,20rem)] leading-[0.72] font-extrabold tracking-[-0.04em] uppercase"
              />
              <SplitWords
                as="p"
                text="the floor holds"
                kind="slide-words"
                className="mt-2 font-[family-name:var(--lk-display)] text-[clamp(1rem,2.4vw,1.5rem)] font-bold tracking-[-0.03em] text-[var(--lk-stock)]"
              />
            </div>

            <SplitWords
              as="p"
              text="Packed. No empty type."
              kind="slide-words"
              className="max-w-[16rem] font-[family-name:var(--lk-serif)] text-[1.05rem] text-[color-mix(in_srgb,var(--lk-stock)_80%,transparent)] italic"
            />
          </div>
        </article>
      </div>
    </section>
  )
}
