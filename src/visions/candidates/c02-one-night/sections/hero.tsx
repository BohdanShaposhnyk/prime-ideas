import type { CSSProperties } from 'react'

/**
 * Hero — dusk horizon band; brand in the glow.
 * Semantic hooks (`data-plane`, `data-hero`) reserved for later GSAP.
 */
export default function Hero() {
  return (
    <section
      data-hero="one-night"
      className="relative isolate min-h-dvh overflow-hidden text-[oklch(0.96_0.01_80)]"
      style={
        {
          '--on-ink': 'oklch(0.1 0.01 260)',
          '--on-dusk': 'oklch(0.45 0.03 250)',
          '--on-steel': 'oklch(0.58 0.025 240)',
          '--on-mist': 'oklch(0.78 0.02 230)',
          '--on-copper': 'oklch(0.55 0.12 55)',
          '--on-ember': 'oklch(0.62 0.14 55)',
        } as CSSProperties
      }
    >
      {/* Dominant visual — swap: dusk horizon plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        {/* Ink field */}
        <div
          data-plane="ink"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(90% 60% at 50% 100%, color-mix(in oklch, var(--on-copper) 18%, transparent) 0%, transparent 55%),
              linear-gradient(180deg, oklch(0.14 0.015 255) 0%, var(--on-ink) 55%, oklch(0.08 0.01 40) 100%)
            `,
          }}
        />
        {/* Luminous horizontal night-band */}
        <div
          data-plane="horizon"
          className="absolute inset-x-0 top-[38%] h-[28%] sm:top-[36%] sm:h-[26%]"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                color-mix(in oklch, var(--on-dusk) 55%, transparent) 18%,
                color-mix(in oklch, var(--on-steel) 70%, var(--on-mist)) 48%,
                color-mix(in oklch, var(--on-copper) 45%, var(--on-steel)) 72%,
                transparent 100%
              )
            `,
            filter: 'blur(0.5px)',
            maskImage:
              'linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(180deg, transparent 0%, black 35%, black 65%, transparent 100%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
          }}
        />
        {/* Soft bloom above the band */}
        <div
          data-plane="bloom"
          className="absolute inset-x-[8%] top-[28%] h-[22%] opacity-70"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 50% 100%, color-mix(in oklch, var(--on-mist) 35%, transparent) 0%, transparent 70%)
            `,
          }}
        />
        {/* Fine grain on the band */}
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.28] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
            maskImage:
              'linear-gradient(180deg, transparent 30%, black 42%, black 62%, transparent 74%)',
          }}
        />
        {/* Warm ground wash — night starts toward kitchen */}
        <div
          data-plane="ground"
          className="absolute inset-x-0 bottom-0 h-[35%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--on-ember) 22%, transparent) 0%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-dvh flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <p
          data-hero="caption"
          className="max-w-[14rem] text-[0.65rem] leading-relaxed tracking-[0.2em] text-[color-mix(in_oklch,var(--on-mist)_80%,white)] uppercase sm:text-xs"
        >
          One night. Four rooms.
        </p>

        <div className="flex max-w-3xl flex-col items-start gap-8 sm:gap-10">
          <h1
            data-hero="brand"
            className="font-medium tracking-[-0.06em] text-[clamp(4.5rem,22vw,11rem)] leading-[0.82] text-[color-mix(in_oklch,white_94%,var(--on-copper))]"
          >
            PRIME.
          </h1>

          <div data-hero="cta" className="flex flex-wrap items-center gap-3">
            <a
              href="#kitchen"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[var(--on-copper)] px-4 text-sm font-medium text-[var(--on-ink)] transition-opacity hover:opacity-90"
            >
              Start the night
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-lg border border-[color-mix(in_oklch,white_22%,transparent)] bg-[color-mix(in_oklch,var(--on-ink)_45%,transparent)] px-4 text-sm font-medium text-[color-mix(in_oklch,white_88%,var(--on-mist))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,white_35%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
