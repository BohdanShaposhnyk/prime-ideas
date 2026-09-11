import type { CSSProperties } from 'react'

/**
 * Game room — darker, denser, screen-lit comfort.
 * Placeholder visual only; no Bits / GSAP here.
 */
export default function ZoneGameRoom() {
  return (
    <section
      aria-labelledby="zone-game-room-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.92_0.01_80)]"
      style={
        {
          '--oi-screen': 'oklch(0.55 0.14 250)',
          '--oi-glow': 'oklch(0.62 0.1 200)',
          '--oi-velvet': 'oklch(0.2 0.04 30)',
          '--oi-charcoal': 'oklch(0.12 0.012 50)',
          '--oi-amber': 'oklch(0.68 0.1 70)',
        } as CSSProperties
      }
    >
      {/* swap: game floor plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(55% 45% at 78% 35%, color-mix(in oklch, var(--oi-screen) 45%, transparent) 0%, transparent 60%),
              radial-gradient(40% 35% at 22% 55%, color-mix(in oklch, var(--oi-glow) 28%, transparent) 0%, transparent 55%),
              linear-gradient(165deg, var(--oi-charcoal) 0%, var(--oi-velvet) 55%, oklch(0.1 0.01 40) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0 3px,
                color-mix(in oklch, var(--oi-screen) 12%, transparent) 3px 4px
              )
            `,
            maskImage:
              'radial-gradient(50% 40% at 78% 35%, black 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--oi-amber) 12%, transparent) 0%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <h2
          id="zone-game-room-title"
          className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_88%,var(--oi-glow))]"
        >
          Game room
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,white_55%,var(--oi-glow))] sm:text-base">
          Darker, denser, screen-lit comfort.
        </p>
      </div>
    </section>
  )
}
