import type { CSSProperties } from 'react'

const tokens = {
  '--gc-mist': '#E8EEF2',
  '--gc-slate': '#1B2A33',
  '--gc-aqua': '#7EB8C9',
  '--gc-clear': '#F7F4EF',
  '--gc-brass': '#C9A87C',
  '--gc-ember': '#D4784A',
  '--gc-ink': '#0F171C',
  '--gc-magenta': '#A85A7A',
} as CSSProperties

/**
 * Stage — mic light hits the glass from below.
 */
export default function SceneStage() {
  return (
    <section
      id="stage"
      aria-labelledby="scene-stage-title"
      data-scene="stage"
      data-scroll="bloom"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[var(--gc-clear)]"
      style={{ ...tokens, zIndex: 4 }}
    >
      {/* swap: stage mic plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="under-cap"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(40% 55% at 50% 100%, color-mix(in srgb, var(--gc-magenta) 42%, transparent) 0%, transparent 55%),
              radial-gradient(55% 40% at 50% 55%, color-mix(in srgb, var(--gc-brass) 28%, transparent) 0%, transparent 60%),
              linear-gradient(180deg, #241C28 0%, #1A1520 48%, var(--gc-ink) 100%)
            `,
          }}
        />
        {/* Spot from below hitting glass */}
        <div
          data-plane="spot"
          className="absolute left-1/2 bottom-0 h-[70%] w-[48%] max-w-md -translate-x-1/2 opacity-70"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in srgb, var(--gc-brass) 55%, transparent) 0%,
                color-mix(in srgb, var(--gc-magenta) 25%, transparent) 35%,
                transparent 75%
              )
            `,
            filter: 'blur(22px)',
            clipPath: 'polygon(35% 100%, 65% 100%, 100% 0, 0 0)',
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
        <p className="mb-3 font-['Figtree',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--gc-brass)_75%,var(--gc-magenta))] uppercase">
          03 · Stage
        </p>
        <h2
          id="scene-stage-title"
          className="max-w-lg font-['Unbounded',sans-serif] text-[clamp(2.25rem,9vw,4rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[color-mix(in_srgb,var(--gc-clear)_92%,var(--gc-brass))]"
        >
          Light on the seal
        </h2>
        <p className="mt-4 max-w-sm font-['Figtree',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--gc-mist)_58%,var(--gc-brass))] sm:text-base">
          One mic. Refraction from below.
        </p>
      </div>
    </section>
  )
}
