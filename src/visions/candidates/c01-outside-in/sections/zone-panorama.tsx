import type { CSSProperties } from 'react'

/**
 * Panorama — open restaurant; sky still present, space opens.
 * Placeholder visual only; no Bits / GSAP here.
 */
export default function ZonePanorama() {
  return (
    <section
      id="enter"
      aria-labelledby="zone-panorama-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.94_0.01_80)]"
      style={
        {
          '--oi-mist': 'oklch(0.72 0.02 240)',
          '--oi-slate': 'oklch(0.42 0.03 250)',
          '--oi-sky': 'oklch(0.55 0.04 230)',
          '--oi-wood': 'oklch(0.38 0.055 55)',
          '--oi-amber': 'oklch(0.72 0.12 70)',
          '--oi-charcoal': 'oklch(0.16 0.015 50)',
        } as CSSProperties
      }
    >
      {/* swap: panorama window plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(100% 70% at 70% 12%, color-mix(in oklch, var(--oi-mist) 55%, white) 0%, transparent 52%),
              radial-gradient(80% 55% at 55% 0%, var(--oi-sky) 0%, transparent 48%),
              linear-gradient(180deg, var(--oi-slate) 0%, var(--oi-charcoal) 58%, var(--oi-wood) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[42%] opacity-70"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--oi-wood) 90%, black) 0%,
                color-mix(in oklch, var(--oi-wood) 40%, transparent) 70%,
                transparent 100%
              )
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-25 mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
            maskImage: 'linear-gradient(180deg, black 0%, black 40%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <h2
          id="zone-panorama-title"
          className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_92%,var(--oi-mist))]"
        >
          Panorama
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,var(--oi-mist)_75%,white)] sm:text-base">
          Open restaurant with panoramic windows — sky still present, space opens.
        </p>
      </div>
    </section>
  )
}
