import type { CSSProperties } from 'react'

/**
 * Kitchen — diagonal split; caption sticky on the cool pane.
 */
export default function SceneKitchen() {
  return (
    <section
      id="kitchen"
      aria-labelledby="scene-kitchen-title"
      data-scene="kitchen"
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
          '--ld-copper': '#A86B45',
          zIndex: 3,
        } as CSSProperties
      }
    >
      {/* Media half — warm kitchen */}
      <div
        data-placeholder="visual"
        data-pane="media"
        className="absolute inset-0"
        aria-hidden
        style={{
          clipPath: 'polygon(0 0, 100% 0, 58% 100%, 0 100%)',
        }}
      >
        <div
          data-plane="field"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 45% at 35% 40%, color-mix(in srgb, var(--ld-copper) 50%, transparent) 0%, transparent 60%),
              radial-gradient(40% 35% at 18% 75%, color-mix(in srgb, var(--ld-lamp) 30%, transparent) 0%, transparent 55%),
              linear-gradient(155deg, #3A2A22 0%, var(--ld-oak) 45%, #1E1A16 100%)
            `,
          }}
        />
        <div
          data-plane="pass"
          className="absolute left-[8%] top-[42%] h-[14%] w-[45%] opacity-65"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent,
                color-mix(in srgb, var(--ld-lamp) 55%, white) 45%,
                transparent
              )
            `,
            filter: 'blur(10px)',
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

      {/* Cool caption pane */}
      <div
        data-pane="caption"
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 58% 100%, 72% 0)',
          background: `
            linear-gradient(
              210deg,
              color-mix(in srgb, var(--ld-sky) 35%, #1C2228) 0%,
              #1A1E22 55%,
              var(--ld-sill) 100%
            )
          `,
        }}
      />

      {/* Seam */}
      <div
        data-seam="diagonal"
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              108deg,
              transparent 0%,
              transparent 61.5%,
              color-mix(in srgb, var(--ld-linen) 55%, transparent) 62.2%,
              color-mix(in srgb, var(--ld-lamp) 35%, transparent) 63%,
              transparent 64.5%
            )
          `,
        }}
      />

      <div className="relative z-10 flex h-full w-full">
        <div className="flex w-[55%] flex-col justify-end px-5 pb-14 sm:px-8 lg:px-12">
          <p className="mb-2 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ld-lamp)_70%,white)] uppercase">
            01 · Kitchen
          </p>
        </div>
        <div className="flex w-[45%] flex-col justify-center px-5 sm:px-8 lg:pr-12">
          <h2
            id="scene-kitchen-title"
            data-type="migrate"
            data-caption="sticky"
            className="sticky top-[30vh] max-w-[10rem] font-['Cormorant_Garamond',serif] text-[clamp(2.5rem,9vw,4.25rem)] font-medium tracking-[-0.03em] leading-[0.9] text-[color-mix(in_srgb,var(--ld-linen)_90%,var(--ld-sky))] sm:max-w-[14rem]"
          >
            Plate the night.
          </h2>
          <p className="mt-4 max-w-[12rem] font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ld-linen)_50%,var(--ld-sky))]">
            Warm pass light against cool glass.
          </p>
        </div>
      </div>
    </section>
  )
}
