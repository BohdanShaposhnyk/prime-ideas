import type { CSSProperties } from 'react'

/**
 * Hero — first amber blade cut into graphite; PRIME seam-locked.
 * Hooks (`data-hero`, `data-plane`, `data-seam`) reserved for GSAP.
 */
export default function Hero() {
  return (
    <section
      data-hero="blade-night"
      data-scene="hero"
      data-scroll="pin"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.94_0.01_95)]"
      style={
        {
          '--bn-ink': 'oklch(0.13 0.01 260)',
          '--bn-graphite': 'oklch(0.18 0.012 255)',
          '--bn-amber': 'oklch(0.72 0.14 70)',
          '--bn-amber-deep': 'oklch(0.55 0.12 60)',
          '--bn-chalk': 'oklch(0.94 0.01 95)',
          zIndex: 1,
        } as CSSProperties
      }
    >
      {/* Dominant visual — swap: hero blade plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          data-plane="ink"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(70% 55% at 78% 18%, color-mix(in oklch, var(--bn-amber) 28%, transparent) 0%, transparent 55%),
              linear-gradient(155deg, var(--bn-graphite) 0%, var(--bn-ink) 48%, oklch(0.1 0.01 40) 100%)
            `,
          }}
        />
        {/* Opening wedge — first cut */}
        <div
          data-plane="wedge"
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(38% 0, 100% 0, 100% 100%, 12% 100%)',
            background: `
              linear-gradient(
                125deg,
                color-mix(in oklch, var(--bn-amber) 35%, transparent) 0%,
                color-mix(in oklch, var(--bn-amber-deep) 18%, transparent) 42%,
                transparent 72%
              ),
              radial-gradient(50% 60% at 70% 40%, color-mix(in oklch, var(--bn-amber) 40%, transparent) 0%, transparent 65%)
            `,
          }}
        />
        {/* Seam edge glow */}
        <div
          data-seam="edge"
          className="absolute inset-0 opacity-90"
          style={{
            background: `
              linear-gradient(
                115deg,
                transparent 0%,
                transparent 36.5%,
                color-mix(in oklch, var(--bn-amber) 85%, white) 37.4%,
                color-mix(in oklch, var(--bn-amber) 40%, transparent) 38.2%,
                transparent 40%
              )
            `,
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '140px 140px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-14 sm:pt-10 lg:px-12">
        <p
          data-hero="caption"
          className="max-w-[12rem] font-[Manrope,sans-serif] text-[0.65rem] leading-relaxed tracking-[0.22em] text-[color-mix(in_oklch,var(--bn-chalk)_70%,var(--bn-amber))] uppercase"
        >
          Cut into the night.
        </p>

        <div className="flex max-w-xl flex-col items-start gap-7 sm:gap-9">
          <h1
            data-hero="brand"
            className="font-['Archivo_Black',sans-serif] tracking-[-0.04em] text-[clamp(4.25rem,20vw,10rem)] leading-[0.85] text-[color-mix(in_oklch,var(--bn-chalk)_92%,var(--bn-amber))]"
          >
            PRIME.
          </h1>

          <div data-hero="cta" className="flex flex-wrap items-center gap-3">
            <a
              href="#heat"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--bn-amber)] px-4 font-[Manrope,sans-serif] text-sm font-medium text-[var(--bn-ink)] transition-opacity hover:opacity-90"
            >
              Open the cut
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_oklch,var(--bn-chalk)_22%,transparent)] bg-[color-mix(in_oklch,var(--bn-ink)_40%,transparent)] px-4 font-[Manrope,sans-serif] text-sm font-medium text-[color-mix(in_oklch,var(--bn-chalk)_88%,var(--bn-amber))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,var(--bn-chalk)_40%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
