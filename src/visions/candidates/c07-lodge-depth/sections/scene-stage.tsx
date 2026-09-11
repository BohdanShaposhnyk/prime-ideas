import type { CSSProperties } from 'react'

/**
 * Stage — diagonal shear; caption shifts with the cut.
 */
export default function SceneStage() {
  return (
    <section
      id="stage"
      aria-labelledby="scene-stage-title"
      data-scene="stage"
      data-scroll="diagonal-split"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[var(--ld-linen)]"
      style={
        {
          '--ld-stone': '#8A8578',
          '--ld-oak': '#6B4A32',
          '--ld-moss': '#3D5C45',
          '--ld-sky': '#9AA8B5',
          '--ld-lamp': '#C4A574',
          '--ld-sill': '#1A1814',
          '--ld-linen': '#E8E2D6',
          '--ld-rose': '#8B5A5A',
          zIndex: 5,
        } as CSSProperties
      }
    >
      <div
        data-placeholder="visual"
        data-pane="media"
        className="absolute inset-0"
        aria-hidden
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 72%, 0 100%)',
        }}
      >
        <div
          data-plane="field"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(55% 40% at 50% 35%, color-mix(in srgb, var(--ld-rose) 40%, transparent) 0%, transparent 58%),
              radial-gradient(40% 35% at 70% 60%, color-mix(in srgb, var(--ld-lamp) 25%, transparent) 0%, transparent 55%),
              linear-gradient(170deg, #2A1E22 0%, #3A2828 40%, var(--ld-sill) 100%)
            `,
          }}
        />
        {/* Spotlight cone */}
        <div
          data-plane="spot"
          className="absolute left-1/2 top-[8%] h-[55%] w-[55%] -translate-x-1/2 opacity-60"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--ld-linen) 28%, transparent) 0%,
                color-mix(in srgb, var(--ld-lamp) 18%, transparent) 45%,
                transparent 100%
              )
            `,
            clipPath: 'polygon(35% 0, 65% 0, 100% 100%, 0 100%)',
            filter: 'blur(8px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.2] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '140px 140px',
          }}
        />
      </div>

      {/* Caption slab under the shear */}
      <div
        data-pane="caption"
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0 100%, 100% 72%, 100% 100%)',
          background: `
            linear-gradient(
              15deg,
              color-mix(in srgb, var(--ld-sky) 20%, #161A1E) 0%,
              var(--ld-sill) 100%
            )
          `,
        }}
      />

      <div
        data-seam="diagonal"
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              164deg,
              transparent 0%,
              transparent 68%,
              color-mix(in srgb, var(--ld-linen) 45%, transparent) 69%,
              color-mix(in srgb, var(--ld-rose) 30%, transparent) 70.5%,
              transparent 73%
            )
          `,
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-12 sm:px-8 lg:px-12">
        <div>
          <p className="mb-2 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ld-rose)_65%,white)] uppercase">
            03 · Stage
          </p>
          <p className="max-w-xs font-['IBM_Plex_Sans',sans-serif] text-sm text-[color-mix(in_srgb,var(--ld-linen)_55%,var(--ld-rose))]">
            Mic heat under lodge timber.
          </p>
        </div>
        <h2
          id="scene-stage-title"
          data-type="migrate"
          data-caption="shift"
          className="ml-auto max-w-[16rem] translate-y-0 text-right font-['Cormorant_Garamond',serif] text-[clamp(2.75rem,10vw,4.5rem)] font-medium tracking-[-0.03em] leading-[0.9] text-[color-mix(in_srgb,var(--ld-linen)_92%,var(--ld-sky))] sm:max-w-[20rem] sm:translate-y-[-8%]"
        >
          Sing the cut.
        </h2>
      </div>
    </section>
  )
}
