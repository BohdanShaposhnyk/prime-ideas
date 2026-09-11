import type { CSSProperties } from 'react'

/**
 * Stage — karaoke / cinema bloom wedge; soft rose-mist spotlight.
 */
export default function SceneStage() {
  return (
    <section
      id="stage"
      aria-labelledby="scene-stage-title"
      data-scene="stage"
      data-scroll="cut"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.95_0.01_40)]"
      style={
        {
          '--bn-ink': 'oklch(0.11 0.015 20)',
          '--bn-rose': 'oklch(0.62 0.07 25)',
          '--bn-bloom': 'oklch(0.72 0.06 35)',
          '--bn-deep': 'oklch(0.18 0.025 15)',
          '--bn-amber': 'oklch(0.72 0.14 70)',
          '--bn-chalk': 'oklch(0.94 0.01 95)',
          clipPath: 'polygon(0 12%, 100% 0, 100% 100%, 0 100%)',
          zIndex: 4,
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
          data-plane="field"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(45% 55% at 48% 28%, color-mix(in oklch, var(--bn-bloom) 48%, transparent) 0%, transparent 58%),
              radial-gradient(50% 40% at 70% 70%, color-mix(in oklch, var(--bn-rose) 30%, transparent) 0%, transparent 55%),
              linear-gradient(170deg, var(--bn-deep) 0%, var(--bn-ink) 52%, oklch(0.09 0.02 10) 100%)
            `,
          }}
        />
        {/* Cone spotlight */}
        <div
          data-plane="cone"
          className="absolute left-1/2 top-0 h-[70%] w-[70%] -translate-x-1/2 opacity-80"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in oklch, var(--bn-bloom) 35%, transparent) 0%,
                color-mix(in oklch, var(--bn-rose) 12%, transparent) 45%,
                transparent 100%
              )
            `,
            clipPath: 'polygon(32% 0, 68% 0, 92% 100%, 8% 100%)',
            filter: 'blur(2px)',
          }}
        />
        <div
          data-seam="edge"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(
                172deg,
                color-mix(in oklch, var(--bn-amber) 55%, var(--bn-bloom)) 0%,
                transparent 2.5%
              )
            `,
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-14 pt-20 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 font-[Manrope,sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_oklch,var(--bn-bloom)_70%,white)] uppercase">
          03 · Stage
        </p>
        <h2
          id="scene-stage-title"
          className="max-w-lg font-['Archivo_Black',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] tracking-[-0.03em] leading-[0.9] text-[color-mix(in_oklch,var(--bn-chalk)_90%,var(--bn-rose))]"
        >
          Stage cut
        </h2>
        <p className="mt-4 max-w-sm font-[Manrope,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--bn-chalk)_55%,var(--bn-rose))] sm:text-base">
          Karaoke and cinema bloom — soft light through the blade.
        </p>
      </div>
    </section>
  )
}
