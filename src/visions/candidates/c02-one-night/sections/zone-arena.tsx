import type { CSSProperties } from 'react'

/**
 * Arena — teal screen-lit play floor; denser, cooler pulse.
 */
export default function ZoneArena() {
  return (
    <section
      aria-labelledby="zone-arena-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.93_0.02_200)]"
      style={
        {
          '--on-ink': 'oklch(0.09 0.015 220)',
          '--on-teal': 'oklch(0.55 0.1 195)',
          '--on-cyan': 'oklch(0.7 0.09 205)',
          '--on-deep': 'oklch(0.16 0.03 230)',
          '--on-scan': 'oklch(0.62 0.08 185)',
        } as CSSProperties
      }
    >
      {/* swap: arena screen plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(55% 45% at 72% 38%, color-mix(in oklch, var(--on-teal) 50%, transparent) 0%, transparent 58%),
              radial-gradient(40% 35% at 18% 58%, color-mix(in oklch, var(--on-cyan) 22%, transparent) 0%, transparent 52%),
              linear-gradient(160deg, var(--on-ink) 0%, var(--on-deep) 48%, oklch(0.11 0.02 210) 100%)
            `,
          }}
        />
        {/* Screen scanlines */}
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0 3px,
                color-mix(in oklch, var(--on-scan) 16%, transparent) 3px 4px
              )
            `,
            maskImage:
              'radial-gradient(55% 45% at 72% 38%, black 0%, transparent 72%)',
          }}
        />
        {/* Secondary screen glow cluster */}
        <div
          className="absolute right-[8%] top-[22%] h-[28%] w-[38%] opacity-60"
          style={{
            background: `
              radial-gradient(ellipse at center, color-mix(in oklch, var(--on-cyan) 40%, transparent) 0%, transparent 70%)
            `,
            filter: 'blur(12px)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[30%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--on-teal) 15%, transparent) 0%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 text-[0.65rem] tracking-[0.2em] text-[color-mix(in_oklch,var(--on-cyan)_65%,white)] uppercase">
          02 · Play
        </p>
        <h2
          id="zone-arena-title"
          className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_88%,var(--on-cyan))]"
        >
          Arena
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,white_52%,var(--on-teal))] sm:text-base">
          Teal screen-lit play — denser, cooler pulse.
        </p>
      </div>
    </section>
  )
}
