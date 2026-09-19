import { SplitWords } from './type-split'

/**
 * Heat — wide warm slab; mixed-scale lockup, not a room.
 */
export default function BlockHeat() {
  return (
    <section
      aria-labelledby="lk-heat-title"
      data-lockup="heat"
      data-spine-id="03"
      className="relative h-[180vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 flex min-h-dvh items-stretch overflow-hidden px-3 py-4 sm:px-5 sm:py-6"
      >
        <article
          data-block
          data-latch="left"
          className="relative flex min-h-[calc(100dvh-2rem)] w-[100%] flex-col overflow-hidden sm:min-h-[calc(100dvh-3rem)] sm:w-[94%]"
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
                  radial-gradient(ellipse 55% 70% at 0% 100%, color-mix(in srgb, var(--lk-proof) 55%, transparent) 0%, transparent 58%),
                  linear-gradient(118deg, #F7C45A 0%, var(--lk-heat) 42%, #E89A2E 78%, #D45A22 100%)
                `,
              }}
            />
            <div
              className="absolute -top-16 -right-10 size-56 rotate-12 border border-[color-mix(in_srgb,var(--lk-ink)_18%,transparent)]"
              style={{
                background:
                  'linear-gradient(180deg, color-mix(in srgb, var(--lk-stock) 22%, transparent), transparent)',
              }}
            />
          </div>

          <div className="relative z-10 flex h-full min-h-[calc(100dvh-2rem)] flex-col justify-between px-5 py-6 sm:min-h-[calc(100dvh-3rem)] sm:px-10 sm:py-9">
            <div className="flex items-start justify-between gap-4">
              <p
                data-type="meta"
                className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] text-[var(--lk-ink)] uppercase"
              >
                03 / HEAT
              </p>
              <p
                data-type="track-wide"
                className="max-w-[10rem] text-right font-[family-name:var(--lk-condensed)] text-[0.85rem] leading-tight tracking-[0.16em] text-[var(--lk-ink)] uppercase"
              >
                Hookah · Bar · Kitchen
              </p>
            </div>

            <div>
              <h2
                id="lk-heat-title"
                data-type="track-lock"
                className="overflow-hidden font-[family-name:var(--lk-display)] text-[clamp(4.2rem,15vw,9.5rem)] leading-[0.8] font-extrabold tracking-[-0.055em] text-[var(--lk-ink)] uppercase"
              >
                HEAT
              </h2>
              <SplitWords
                as="p"
                text="still plating"
                kind="slide-words"
                className="mt-4 font-[family-name:var(--lk-serif)] text-[clamp(1.35rem,3vw,2.1rem)] text-[var(--lk-ink)] italic"
              />
            </div>

            <p
              data-type="meta"
              className="font-[family-name:var(--lk-body)] text-[0.85rem] tracking-[0.04em] text-[color-mix(in_srgb,var(--lk-ink)_75%,transparent)]"
            >
              Ember on the slab.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
