import { useRef } from 'react'
import { CAST_PLATES, type CastPlate } from './cast'
import { LiveLockup } from './live-lockup'

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`

export default function Hero({ plate = CAST_PLATES[0] }: { plate?: CastPlate }) {
  const vesselRef = useRef<HTMLElement>(null)

  return (
    <section
      aria-labelledby="qc-lockup"
      data-cast="hero"
      className="relative flex h-dvh items-center justify-center px-5 py-8 sm:px-8"
    >
      <div
        data-placeholder="visual"
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 55% at 50% 46%, #1C1916 0%, #141210 58%, #0C0B0A 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
          style={{
            backgroundImage: grain,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <article
        ref={vesselRef}
        data-vessel
        className="relative z-10 flex h-[min(78dvh,38rem)] w-full max-w-[22.5rem] flex-col border border-[var(--qc-hair)] bg-[var(--qc-well)] sm:max-w-[24rem]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: 'inset 0 1px 0 color-mix(in srgb, var(--qc-bone) 9%, transparent)',
          }}
        />
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-0 w-[3px] bg-[var(--qc-ember)]"
        />

        <header className="relative flex items-baseline justify-between px-5 pt-4 pl-6 sm:px-6 sm:pt-5 sm:pl-7">
          <p className="font-[family-name:var(--qc-body)] text-[0.62rem] tracking-[0.32em] text-[var(--qc-mute)] uppercase">
            Warsaw
          </p>
          <p
            data-cast-index
            className="font-[family-name:var(--qc-body)] text-[0.58rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--qc-mute)_80%,transparent)] uppercase"
          >
            Cast {plate.index}
          </p>
        </header>

        <div className="relative flex min-h-0 flex-1 flex-col px-5 pt-5 pl-6 sm:px-6 sm:pl-7">
          <ol
            data-galley
            className="flex shrink-0 flex-wrap gap-x-3 gap-y-1"
          >
            {CAST_PLATES.map((line) => {
              const active = line.id === plate.id
              return (
                <li
                  key={line.id}
                  data-galley-line={line.id}
                  data-active={active ? 'true' : undefined}
                  className="flex items-center gap-2"
                >
                  <span
                    aria-hidden
                    data-ember
                    data-on={active ? 'true' : undefined}
                    className="size-1 shrink-0 rounded-full bg-[var(--qc-ember)] opacity-0 data-[on]:opacity-100"
                  />
                  <span className="font-[family-name:var(--qc-body)] text-[0.58rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--qc-mute)_70%,transparent)] uppercase">
                    {line.index}
                  </span>
                  <span
                    data-galley-word
                    className={`font-[family-name:var(--qc-body)] text-[0.62rem] tracking-[0.18em] uppercase ${
                      active
                        ? 'text-[var(--qc-bone)]'
                        : 'text-[color-mix(in_srgb,var(--qc-mute)_85%,transparent)]'
                    }`}
                  >
                    {line.word}
                  </span>
                </li>
              )
            })}
          </ol>

          <div
            data-lockup-wrap
            className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden"
          >
            <h1
              id="qc-lockup"
              data-lockup
              className="max-w-full text-center font-[family-name:var(--qc-display)] text-[clamp(3.4rem,18vw,6.4rem)] leading-[0.86] font-medium text-[var(--qc-bone)]"
            >
              <LiveLockup
                key={plate.word}
                word={plate.word}
                containerRef={vesselRef}
              />
            </h1>
            <div
              aria-hidden
              data-stick
              className="mt-5 h-px w-[min(12rem,70%)] bg-[color-mix(in_srgb,var(--qc-bone)_28%,transparent)]"
            />
            <p
              data-cast-caption
              className="mt-5 max-w-[16ch] text-center font-[family-name:var(--qc-display)] text-[1.05rem] leading-snug text-[var(--qc-bone)]"
              style={{
                fontVariationSettings: `'SOFT' 50, 'WONK' 0.4, 'opsz' 36`,
              }}
            >
              {plate.caption}
            </p>
          </div>
        </div>

        <footer
          data-colophon
          className="relative mt-auto flex items-end justify-between gap-4 px-5 pt-3 pb-4 pl-6 sm:px-6 sm:pb-5 sm:pl-7"
        >
          <div>
            <p className="font-[family-name:var(--qc-body)] text-[0.62rem] tracking-[0.18em] text-[var(--qc-mute)] uppercase">
              Prime Warsaw
            </p>
            <p className="mt-1 font-[family-name:var(--qc-body)] text-[0.58rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--qc-mute)_75%,transparent)] uppercase">
              Gaming · Cinema · Voice · Heat
            </p>
          </div>
          <a
            data-copy="cta"
            href="https://www.instagram.com/prime_warsaw/"
            className="shrink-0 border-b border-[color-mix(in_srgb,var(--qc-bone)_35%,transparent)] pb-0.5 font-[family-name:var(--qc-body)] text-[0.62rem] tracking-[0.2em] text-[var(--qc-bone)] uppercase hover:border-[var(--qc-ember)] hover:text-[var(--qc-ember)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--qc-ember)]"
          >
            Reserve
          </a>
        </footer>
      </article>
    </section>
  )
}
