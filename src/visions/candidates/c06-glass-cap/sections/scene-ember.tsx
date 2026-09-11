import type { CSSProperties } from 'react'

const tokens = {
  '--gc-mist': '#E8EEF2',
  '--gc-slate': '#1B2A33',
  '--gc-aqua': '#7EB8C9',
  '--gc-clear': '#F7F4EF',
  '--gc-brass': '#C9A87C',
  '--gc-ember': '#D4784A',
  '--gc-ink': '#0F171C',
  '--gc-smoke': '#6B7A72',
} as CSSProperties

/**
 * Ember — hookah hush as the cap clears.
 */
export default function SceneEmber() {
  return (
    <section
      id="ember"
      aria-labelledby="scene-ember-title"
      data-scene="ember"
      data-scroll="bloom"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[var(--gc-clear)]"
      style={{ ...tokens, zIndex: 5 }}
    >
      {/* swap: ember hush plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="under-cap"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(60% 45% at 42% 58%, color-mix(in srgb, var(--gc-ember) 28%, transparent) 0%, transparent 58%),
              radial-gradient(50% 40% at 68% 42%, color-mix(in srgb, var(--gc-smoke) 32%, transparent) 0%, transparent 55%),
              radial-gradient(35% 30% at 30% 30%, color-mix(in srgb, var(--gc-aqua) 12%, transparent) 0%, transparent 50%),
              linear-gradient(180deg, #1E2420 0%, #141A18 50%, var(--gc-ink) 100%)
            `,
          }}
        />
        <div
          data-plane="veil"
          className="absolute inset-x-[12%] top-[40%] h-[35%] opacity-55"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                color-mix(in srgb, var(--gc-smoke) 35%, transparent) 25%,
                color-mix(in srgb, var(--gc-mist) 18%, transparent) 50%,
                color-mix(in srgb, var(--gc-brass) 22%, transparent) 75%,
                transparent 100%
              )
            `,
            filter: 'blur(32px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.28] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end px-5 pb-16 pt-[min(30vh,11rem)] text-center sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 font-['Figtree',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--gc-smoke)_70%,var(--gc-brass))] uppercase">
          04 · Ember
        </p>
        <h2
          id="scene-ember-title"
          className="max-w-lg font-['Unbounded',sans-serif] text-[clamp(2.25rem,9vw,4rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[color-mix(in_srgb,var(--gc-clear)_90%,var(--gc-brass))]"
        >
          Cap clears
        </h2>
        <p className="mt-4 max-w-sm font-['Figtree',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--gc-mist)_55%,var(--gc-smoke))] sm:text-base">
          Soft coals. The night is open.
        </p>
      </div>
    </section>
  )
}
