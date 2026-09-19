import { SplitChars, SplitWords } from './type-split'

function RegistrationMark({ className }: { className: string }) {
  return (
    <div aria-hidden className={`absolute size-3 text-[var(--lk-ink)] ${className}`}>
      <span className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-current" />
      <span className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-current" />
    </div>
  )
}

/**
 * Hero — empty chase; first lockup already sitting on stock.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="lk-hero-brand"
      data-lockup="hero"
      data-spine-id="00"
      className="relative h-[200vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 flex min-h-dvh items-stretch overflow-hidden px-3 py-4 sm:px-6 sm:py-7"
      >
        <article
          data-block
          data-latch="rest"
          className="relative flex min-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden sm:min-h-[calc(100dvh-3.5rem)]"
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
                  radial-gradient(ellipse 80% 70% at 18% 12%, color-mix(in srgb, #ffffff 35%, transparent) 0%, transparent 55%),
                  radial-gradient(ellipse 50% 40% at 92% 88%, color-mix(in srgb, var(--lk-plate) 10%, transparent) 0%, transparent 60%),
                  linear-gradient(180deg, var(--lk-stock) 0%, #E0D8C6 100%)
                `,
              }}
            />
            <div className="absolute inset-3 border border-[var(--lk-rule)] sm:inset-5" />
            <div className="absolute inset-3 border-[var(--lk-ink)] sm:inset-5">
              <RegistrationMark className="-top-1.5 -left-1.5" />
              <RegistrationMark className="-top-1.5 -right-1.5" />
              <RegistrationMark className="-bottom-1.5 -left-1.5" />
              <RegistrationMark className="-right-1.5 -bottom-1.5" />
            </div>
            <div
              className="absolute top-[12%] right-[8%] size-16 rounded-full border border-[color-mix(in_srgb,var(--lk-plate)_35%,transparent)] sm:size-24"
              style={{
                background:
                  'radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--lk-plate) 18%, transparent), transparent 70%)',
              }}
            />
          </div>

          <div className="relative z-10 flex h-full min-h-[calc(100dvh-2rem)] flex-col justify-between px-5 py-6 sm:min-h-[calc(100dvh-3.5rem)] sm:px-10 sm:py-9">
            <div className="flex items-start justify-between gap-4">
              <p
                data-type="meta"
                className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--lk-ink)_55%,transparent)] uppercase"
              >
                Prime Warsaw
              </p>
              <p
                data-type="meta"
                className="font-[family-name:var(--lk-condensed)] text-[0.8rem] tracking-[0.2em] text-[var(--lk-proof)] uppercase"
              >
                00 / OPEN
              </p>
            </div>

            <div className="max-w-full">
              <p
                data-type="meta"
                className="mb-3 font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.18em] text-[color-mix(in_srgb,var(--lk-ink)_40%,transparent)] uppercase"
              >
                Sort 00
              </p>
              <div className="relative overflow-hidden">
                <SplitChars
                  text="PRIME"
                  kind="ghost-chars"
                  decorative
                  className="absolute top-0 left-[0.06em] -z-10 flex font-[family-name:var(--lk-display)] text-[clamp(3.75rem,16vw,11rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-[var(--lk-plate)] uppercase opacity-40 select-none"
                />
                <SplitChars
                  as="h1"
                  id="lk-hero-brand"
                  text="PRIME"
                  kind="rise-chars"
                  className="relative flex overflow-hidden font-[family-name:var(--lk-display)] text-[clamp(3.75rem,16vw,11rem)] leading-[0.8] font-extrabold tracking-[-0.06em] text-[var(--lk-ink)] uppercase"
                />
              </div>
              <SplitWords
                as="p"
                text="The night, locked."
                kind="slide-words"
                className="mt-5 max-w-xl font-[family-name:var(--lk-serif)] text-[clamp(1.35rem,3.4vw,2.15rem)] leading-snug text-[var(--lk-ink)] italic"
              />
            </div>

            <div className="flex items-end justify-between gap-4">
              <p
                data-type="track-in"
                className="font-[family-name:var(--lk-body)] text-[0.8rem] tracking-[0.04em] text-[color-mix(in_srgb,var(--lk-ink)_70%,transparent)] sm:text-[0.9rem]"
              >
                Prime, in sorts.
              </p>
              <p
                data-type="meta"
                className="font-[family-name:var(--lk-condensed)] text-[1.05rem] tracking-[0.18em] text-[var(--lk-ink)] uppercase"
              >
                Set →
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
