import type { CSSProperties } from 'react'

/**
 * Hero — two-plane terrace window.
 * Semantic hooks (`data-plane`, `data-hero`) reserved for later GSAP; no timelines here.
 */
export default function Hero() {
  return (
    <section
      data-hero="outside-in"
      className="relative isolate min-h-dvh overflow-hidden text-[oklch(0.96_0.01_80)]"
      style={
        {
          '--oi-mist': 'oklch(0.72 0.02 240)',
          '--oi-slate': 'oklch(0.42 0.03 250)',
          '--oi-sky': 'oklch(0.55 0.04 230)',
          '--oi-wood': 'oklch(0.32 0.06 55)',
          '--oi-velvet': 'oklch(0.22 0.05 25)',
          '--oi-amber': 'oklch(0.72 0.12 70)',
          '--oi-charcoal': 'oklch(0.14 0.01 50)',
        } as CSSProperties
      }
    >
      {/* Dominant visual — swap planes independently later */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        {/* Far plane: moody sky / weather (top-right) */}
        <div
          data-plane="weather"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(120% 80% at 88% 8%, var(--oi-mist) 0%, transparent 55%),
              radial-gradient(90% 70% at 70% 30%, var(--oi-sky) 0%, transparent 50%),
              linear-gradient(155deg, var(--oi-slate) 0%, oklch(0.28 0.02 250) 42%, var(--oi-charcoal) 100%)
            `,
          }}
        />
        {/* Soft weather grain */}
        <div
          data-plane="weather-grain"
          className="absolute inset-0 opacity-[0.35] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
            maskImage:
              'linear-gradient(145deg, transparent 28%, black 58%, black 100%)',
          }}
        />
        {/* Near plane: warm interior / velvet (bottom-left) */}
        <div
          data-plane="interior"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(70% 55% at 12% 88%, color-mix(in oklch, var(--oi-amber) 35%, transparent) 0%, transparent 55%),
              radial-gradient(85% 70% at 8% 100%, var(--oi-velvet) 0%, transparent 58%),
              linear-gradient(35deg, var(--oi-wood) 0%, color-mix(in oklch, var(--oi-velvet) 80%, black) 38%, transparent 68%)
            `,
          }}
        />
        {/* Interior texture wash */}
        <div
          data-plane="interior-texture"
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                105deg,
                transparent 0 2px,
                color-mix(in oklch, var(--oi-wood) 40%, transparent) 2px 3px
              ),
              radial-gradient(ellipse 60% 40% at 20% 75%, color-mix(in oklch, var(--oi-amber) 18%, transparent), transparent 70%)
            `,
            maskImage:
              'linear-gradient(35deg, black 0%, black 42%, transparent 72%)',
          }}
        />
        {/* Glass threshold line — look-out-from-terrace depth cue */}
        <div
          data-plane="glass"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(
                128deg,
                transparent 46%,
                color-mix(in oklch, white 14%, transparent) 49.5%,
                color-mix(in oklch, white 6%, transparent) 50.5%,
                transparent 54%
              )
            `,
          }}
        />
      </div>

      {/* Copy — outside swap target; tiny/far vs huge/near */}
      <div className="relative z-10 flex min-h-dvh flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <p
          data-hero="caption"
          className="ml-auto max-w-[12rem] text-right text-[0.65rem] leading-relaxed tracking-[0.18em] text-[color-mix(in_oklch,var(--oi-mist)_85%,white)] uppercase sm:max-w-[15rem] sm:text-xs"
        >
          Come in from the weather.
        </p>

        <div className="flex max-w-3xl flex-col items-start gap-8 sm:gap-10">
          <h1
            data-hero="brand"
            className="font-medium tracking-[-0.06em] text-[clamp(4.5rem,22vw,11rem)] leading-[0.82] text-[color-mix(in_oklch,white_92%,var(--oi-amber))]"
          >
            PRIME.
          </h1>

          <div data-hero="cta" className="flex flex-wrap items-center gap-3">
            <a
              href="#enter"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--oi-amber)] px-4 text-sm font-medium text-[var(--oi-charcoal)] transition-opacity hover:opacity-90"
            >
              Step inside
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[color-mix(in_oklch,white_22%,transparent)] bg-[color-mix(in_oklch,var(--oi-charcoal)_40%,transparent)] px-4 text-sm font-medium text-[color-mix(in_oklch,white_88%,var(--oi-mist))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,white_35%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
