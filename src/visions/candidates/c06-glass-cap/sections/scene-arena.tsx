import type { CSSProperties } from 'react'

const tokens = {
  '--gc-mist': '#E8EEF2',
  '--gc-slate': '#1B2A33',
  '--gc-aqua': '#7EB8C9',
  '--gc-clear': '#F7F4EF',
  '--gc-brass': '#C9A87C',
  '--gc-ember': '#D4784A',
  '--gc-ink': '#0F171C',
  '--gc-signal': '#3D8B7A',
} as CSSProperties

/**
 * Arena — play flares beneath the clear.
 */
export default function SceneArena() {
  return (
    <section
      id="arena"
      aria-labelledby="scene-arena-title"
      data-scene="arena"
      data-scroll="bloom"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[var(--gc-clear)]"
      style={{ ...tokens, zIndex: 3 }}
    >
      {/* swap: arena play plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="under-cap"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 45% at 50% 48%, color-mix(in srgb, var(--gc-signal) 38%, transparent) 0%, transparent 58%),
              radial-gradient(35% 30% at 18% 72%, color-mix(in srgb, var(--gc-aqua) 30%, transparent) 0%, transparent 50%),
              radial-gradient(30% 28% at 82% 68%, color-mix(in srgb, var(--gc-brass) 22%, transparent) 0%, transparent 48%),
              linear-gradient(180deg, #15282E 0%, var(--gc-slate) 50%, var(--gc-ink) 100%)
            `,
          }}
        />
        {/* Screen glow strip */}
        <div
          data-plane="screen"
          className="absolute left-1/2 top-[36%] h-[22%] w-[72%] max-w-2xl -translate-x-1/2 opacity-80"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--gc-aqua) 45%, transparent) 0%,
                color-mix(in srgb, var(--gc-signal) 35%, transparent) 40%,
                transparent 100%
              )
            `,
            filter: 'blur(16px)',
            clipPath: 'polygon(8% 0, 92% 0, 100% 100%, 0 100%)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.26] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end px-5 pb-16 pt-[min(30vh,11rem)] text-center sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 font-['Figtree',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--gc-aqua)_75%,var(--gc-mist))] uppercase">
          02 · Arena
        </p>
        <h2
          id="scene-arena-title"
          className="max-w-lg font-['Unbounded',sans-serif] text-[clamp(2.25rem,9vw,4rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[color-mix(in_srgb,var(--gc-clear)_92%,var(--gc-aqua))]"
        >
          Play under clear
        </h2>
        <p className="mt-4 max-w-sm font-['Figtree',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--gc-mist)_58%,var(--gc-aqua))] sm:text-base">
          Screens flare. The canopy goes transparent.
        </p>
      </div>
    </section>
  )
}
