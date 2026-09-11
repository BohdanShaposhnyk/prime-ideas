import type { CSSProperties } from 'react'

const tokens = {
  '--gc-mist': '#E8EEF2',
  '--gc-slate': '#1B2A33',
  '--gc-aqua': '#7EB8C9',
  '--gc-clear': '#F7F4EF',
  '--gc-brass': '#C9A87C',
  '--gc-ember': '#D4784A',
  '--gc-ink': '#0F171C',
} as CSSProperties

/**
 * Hero — frost seal opens on the brand.
 * Cap lift / bloom wired later in motion/.
 */
export default function Hero() {
  return (
    <section
      id="glass-hero"
      data-hero="glass-cap"
      data-scene="hero"
      data-scroll="bloom"
      data-panel="0"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[var(--gc-clear)]"
      style={{ ...tokens, zIndex: 1 }}
    >
      {/* swap: hero glass plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="under-cap"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(65% 50% at 50% 62%, color-mix(in srgb, var(--gc-brass) 32%, transparent) 0%, transparent 58%),
              radial-gradient(45% 40% at 72% 78%, color-mix(in srgb, var(--gc-ember) 22%, transparent) 0%, transparent 55%),
              radial-gradient(40% 35% at 22% 70%, color-mix(in srgb, var(--gc-aqua) 18%, transparent) 0%, transparent 50%),
              linear-gradient(180deg, #243540 0%, var(--gc-slate) 42%, var(--gc-ink) 100%)
            `,
          }}
        />
        <div
          data-plane="bloom"
          className="absolute inset-x-[8%] bottom-[18%] h-[42%] rounded-[50%] opacity-60"
          style={{
            background: `
              radial-gradient(
                ellipse at center,
                color-mix(in srgb, var(--gc-brass) 40%, transparent) 0%,
                color-mix(in srgb, var(--gc-aqua) 12%, transparent) 45%,
                transparent 70%
              )
            `,
            filter: 'blur(28px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.28] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      {/* Clear band under frost — brand as masthead seal */}
      <div className="relative z-10 flex h-full w-full flex-col items-center px-5 pt-[min(32vh,12rem)] pb-12 sm:px-8 sm:pb-16 lg:px-12">
        <div className="mt-auto flex w-full max-w-xl flex-col items-center text-center">
          <h1
            data-hero="brand"
            className="font-['Unbounded',sans-serif] text-[clamp(3.5rem,16vw,7.5rem)] leading-none font-medium tracking-[-0.04em] text-[var(--gc-clear)]"
          >
            PRIME
          </h1>
          <p
            data-hero="headline"
            className="mt-5 font-['Unbounded',sans-serif] text-[clamp(1.25rem,3.8vw,1.85rem)] leading-tight font-medium tracking-[-0.02em] text-[color-mix(in_srgb,var(--gc-mist)_88%,var(--gc-aqua))]"
          >
            Lift the glass.
          </p>
          <p
            data-hero="support"
            className="mt-3 max-w-[16rem] font-['Figtree',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--gc-mist)_62%,var(--gc-brass))]"
          >
            Prime Warsaw.
          </p>
          <div data-hero="cta" className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#kitchen"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--gc-brass)] px-4 font-['Figtree',sans-serif] text-sm font-medium text-[var(--gc-ink)] transition-opacity hover:opacity-90"
            >
              Open the night
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--gc-mist)_28%,transparent)] bg-[color-mix(in_srgb,var(--gc-ink)_35%,transparent)] px-4 font-['Figtree',sans-serif] text-sm font-medium text-[color-mix(in_srgb,var(--gc-mist)_90%,var(--gc-aqua))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--gc-mist)_45%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
