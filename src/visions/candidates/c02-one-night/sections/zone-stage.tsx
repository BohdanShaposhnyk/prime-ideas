import type { CSSProperties } from 'react'

/**
 * Stage — karaoke / cinema bloom; soft rose-gold spotlight.
 */
export default function ZoneStage() {
  return (
    <section
      aria-labelledby="zone-stage-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.95_0.02_50)]"
      style={
        {
          '--on-ink': 'oklch(0.1 0.015 30)',
          '--on-rose': 'oklch(0.65 0.08 40)',
          '--on-gold': 'oklch(0.72 0.09 70)',
          '--on-velvet': 'oklch(0.18 0.04 25)',
          '--on-spot': 'oklch(0.78 0.06 55)',
        } as CSSProperties
      }
    >
      {/* swap: stage spotlight plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(45% 55% at 50% 18%, color-mix(in oklch, var(--on-spot) 55%, transparent) 0%, transparent 55%),
              radial-gradient(60% 45% at 50% 70%, color-mix(in oklch, var(--on-rose) 32%, transparent) 0%, transparent 60%),
              linear-gradient(180deg, oklch(0.14 0.02 35) 0%, var(--on-velvet) 45%, var(--on-ink) 100%)
            `,
          }}
        />
        {/* Spotlight cone */}
        <div
          className="absolute left-1/2 top-0 h-[70%] w-[70%] -translate-x-1/2 opacity-70"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in oklch, var(--on-gold) 35%, transparent) 0%,
                color-mix(in oklch, var(--on-rose) 18%, transparent) 45%,
                transparent 100%
              )
            `,
            clipPath: 'polygon(38% 0%, 62% 0%, 92% 100%, 8% 100%)',
          }}
        />
        {/* Soft floor wash */}
        <div
          className="absolute inset-x-0 bottom-0 h-[28%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--on-rose) 28%, transparent) 0%,
                transparent 100%
              )
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.2] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 text-[0.65rem] tracking-[0.2em] text-[color-mix(in_oklch,var(--on-gold)_70%,white)] uppercase">
          03 · Sing
        </p>
        <h2
          id="zone-stage-title"
          className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_90%,var(--on-rose))]"
        >
          Stage
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,white_55%,var(--on-gold))] sm:text-base">
          Karaoke and cinema bloom — soft rose-gold spotlight.
        </p>
      </div>
    </section>
  )
}
