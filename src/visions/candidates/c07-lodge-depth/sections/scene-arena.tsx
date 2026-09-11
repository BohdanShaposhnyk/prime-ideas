import type { CSSProperties } from 'react'

/**
 * Arena — reverse diagonal; caption migrates across the seam.
 */
export default function SceneArena() {
  return (
    <section
      id="arena"
      aria-labelledby="scene-arena-title"
      data-scene="arena"
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
          '--ld-screen': '#3D6B5C',
          zIndex: 4,
        } as CSSProperties
      }
    >
      {/* Cool caption pane — left this time */}
      <div
        data-pane="caption"
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0 0, 42% 0, 28% 100%, 0 100%)',
          background: `
            linear-gradient(
              150deg,
              #1A2220 0%,
              color-mix(in srgb, var(--ld-moss) 25%, #121816) 50%,
              var(--ld-sill) 100%
            )
          `,
        }}
      />

      {/* Media half — arena glow */}
      <div
        data-placeholder="visual"
        data-pane="media"
        className="absolute inset-0"
        aria-hidden
        style={{
          clipPath: 'polygon(42% 0, 100% 0, 100% 100%, 28% 100%)',
        }}
      >
        <div
          data-plane="field"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(45% 40% at 65% 45%, color-mix(in srgb, var(--ld-screen) 55%, transparent) 0%, transparent 60%),
              radial-gradient(35% 30% at 80% 70%, color-mix(in srgb, var(--ld-lamp) 22%, transparent) 0%, transparent 55%),
              linear-gradient(160deg, #1A2422 0%, #243830 40%, #121816 100%)
            `,
          }}
        />
        {/* Monitor bloom */}
        <div
          data-plane="screens"
          className="absolute right-[12%] top-[28%] h-[38%] w-[48%] opacity-70"
          style={{
            background: `
              linear-gradient(
                115deg,
                transparent 0%,
                color-mix(in srgb, var(--ld-screen) 40%, transparent) 30%,
                color-mix(in srgb, #5FA88A 35%, transparent) 55%,
                transparent 85%
              )
            `,
            filter: 'blur(12px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.22] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '140px 140px',
          }}
        />
      </div>

      <div
        data-seam="diagonal"
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              72deg,
              transparent 0%,
              transparent 33%,
              color-mix(in srgb, var(--ld-linen) 50%, transparent) 34%,
              color-mix(in srgb, var(--ld-screen) 40%, transparent) 35%,
              transparent 37%
            )
          `,
        }}
      />

      <div className="relative z-10 flex h-full w-full">
        <div className="flex w-[38%] flex-col justify-center px-5 sm:px-8 lg:pl-12">
          <p className="mb-2 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ld-screen)_70%,white)] uppercase">
            02 · Arena
          </p>
          <h2
            id="scene-arena-title"
            data-type="migrate"
            data-caption="shift"
            className="max-w-[9rem] translate-x-0 font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,9vw,4.25rem)] font-medium tracking-[-0.03em] leading-[0.9] text-[color-mix(in_srgb,var(--ld-linen)_90%,var(--ld-moss))] sm:max-w-[12rem] sm:translate-x-[10%]"
          >
            Play deep.
          </h2>
          <p className="mt-4 max-w-[11rem] font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ld-linen)_48%,var(--ld-moss))]">
            Caption crosses the cut into the screens.
          </p>
        </div>
        <div className="w-[62%]" aria-hidden />
      </div>
    </section>
  )
}
