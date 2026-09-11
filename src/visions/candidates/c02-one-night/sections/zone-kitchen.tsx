import type { CSSProperties } from 'react'

/**
 * Kitchen — copper heat and plated light; the night starts warm.
 */
export default function ZoneKitchen() {
  return (
    <section
      id="kitchen"
      aria-labelledby="zone-kitchen-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.95_0.02_75)]"
      style={
        {
          '--on-ink': 'oklch(0.11 0.015 40)',
          '--on-copper': 'oklch(0.55 0.12 55)',
          '--on-plate': 'oklch(0.72 0.08 70)',
          '--on-wood': 'oklch(0.28 0.05 50)',
          '--on-ember': 'oklch(0.48 0.11 45)',
        } as CSSProperties
      }
    >
      {/* swap: kitchen heat plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(70% 55% at 30% 65%, color-mix(in oklch, var(--on-copper) 45%, transparent) 0%, transparent 58%),
              radial-gradient(50% 40% at 78% 30%, color-mix(in oklch, var(--on-plate) 28%, transparent) 0%, transparent 50%),
              linear-gradient(165deg, var(--on-ink) 0%, var(--on-wood) 52%, oklch(0.16 0.03 45) 100%)
            `,
          }}
        />
        {/* Plated light streaks */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                118deg,
                transparent 0 18px,
                color-mix(in oklch, var(--on-plate) 14%, transparent) 18px 19px
              )
            `,
            maskImage:
              'radial-gradient(60% 50% at 35% 60%, black 0%, transparent 75%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--on-ember) 35%, transparent) 0%,
                transparent 100%
              )
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 text-[0.65rem] tracking-[0.2em] text-[color-mix(in_oklch,var(--on-plate)_70%,white)] uppercase">
          01 · Eat
        </p>
        <h2
          id="zone-kitchen-title"
          className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_92%,var(--on-copper))]"
        >
          Kitchen
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,white_58%,var(--on-plate))] sm:text-base">
          Copper heat and plated light — the night starts warm.
        </p>
      </div>
    </section>
  )
}
