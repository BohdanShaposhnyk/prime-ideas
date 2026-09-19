import { SplitChars, SplitWords } from './type-split'

/**
 * Colophon — stack settles; spine ticks to END.
 */
export default function BlockColophon() {
  return (
    <section
      aria-labelledby="lk-colophon-title"
      data-lockup="colophon"
      data-spine-id="END"
      className="relative min-h-dvh"
    >
      <div
        data-scroll="pin"
        className="flex min-h-dvh items-stretch overflow-hidden px-3 py-4 sm:px-6 sm:py-8"
      >
        <article
          data-block
          data-latch="rest"
          className="relative flex min-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden sm:min-h-[calc(100dvh-4rem)]"
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
                  linear-gradient(180deg, #E4DDCD 0%, var(--lk-stock) 45%, #DCD4C4 100%)
                `,
              }}
            />
            <div className="absolute inset-4 border border-[var(--lk-rule)] sm:inset-6" />
            <div className="absolute top-10 right-10 font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--lk-ink)_30%,transparent)] uppercase">
              Forme · locked
            </div>
          </div>

          <div className="relative z-10 flex h-full min-h-[calc(100dvh-2rem)] flex-col justify-between px-6 py-8 sm:min-h-[calc(100dvh-4rem)] sm:px-12 sm:py-12">
            <p
              data-type="meta"
              className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--lk-ink)_50%,transparent)] uppercase"
            >
              END / COLOPHON
            </p>

            <div>
              <SplitChars
                as="h2"
                id="lk-colophon-title"
                text="LOCKED."
                kind="lock-chars"
                className="flex overflow-hidden [perspective:640px] font-[family-name:var(--lk-display)] text-[clamp(2.8rem,9vw,5.75rem)] leading-[0.85] font-extrabold tracking-[-0.05em] text-[var(--lk-ink)] uppercase"
              />
              <SplitWords
                as="p"
                text="Tonight is set."
                kind="slide-words"
                className="mt-5 max-w-sm font-[family-name:var(--lk-serif)] text-[1.35rem] text-[var(--lk-ink)] italic"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p className="font-[family-name:var(--lk-body)] text-[0.85rem] tracking-[0.03em] text-[color-mix(in_srgb,var(--lk-ink)_70%,transparent)]">
                Prime Warsaw · gaming · cinema · karaoke · bar
              </p>
              <a
                href="https://www.instagram.com/prime_warsaw/"
                className="font-[family-name:var(--lk-condensed)] text-[1.05rem] tracking-[0.16em] text-[var(--lk-ink)] uppercase underline-offset-4 hover:underline"
              >
                @prime_warsaw
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
