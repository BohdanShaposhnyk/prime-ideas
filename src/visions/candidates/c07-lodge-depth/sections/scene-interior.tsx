import type { CSSProperties } from 'react'

/**
 * Interior — full lodge room after the z-zoom retreat.
 * Caption begins migrating toward the next diagonal seam.
 */
export default function SceneInterior() {
  return (
    <section
      id="interior"
      aria-labelledby="scene-interior-title"
      data-scene="interior"
      data-scroll="pin"
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
          zIndex: 2,
        } as CSSProperties
      }
    >
      {/* swap: full interior lodge plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          data-plane="room"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(60% 50% at 72% 28%, color-mix(in srgb, var(--ld-sky) 18%, transparent) 0%, transparent 55%),
              radial-gradient(50% 45% at 22% 70%, color-mix(in srgb, var(--ld-lamp) 32%, transparent) 0%, transparent 60%),
              radial-gradient(40% 40% at 85% 78%, color-mix(in srgb, var(--ld-moss) 45%, transparent) 0%, transparent 58%),
              linear-gradient(145deg, #3E342C 0%, var(--ld-oak) 32%, #2C332C 62%, var(--ld-sill) 100%)
            `,
          }}
        />
        {/* Stone wall band */}
        <div
          data-plane="stone"
          className="absolute inset-y-[8%] left-0 w-[38%] opacity-80"
          style={{
            background: `
              linear-gradient(
                95deg,
                color-mix(in srgb, var(--ld-stone) 55%, #2A2824) 0%,
                color-mix(in srgb, var(--ld-stone) 35%, transparent) 70%,
                transparent 100%
              ),
              repeating-linear-gradient(
                0deg,
                transparent 0 28px,
                color-mix(in srgb, black 12%, transparent) 28px 29px
              )
            `,
          }}
        />
        {/* Greenery cluster */}
        <div
          data-plane="greenery"
          className="absolute right-[6%] top-[18%] h-[45%] w-[32%]"
          style={{
            background: `
              radial-gradient(ellipse 50% 40% at 55% 40%, color-mix(in srgb, var(--ld-moss) 70%, transparent), transparent 70%),
              radial-gradient(ellipse 35% 30% at 30% 60%, color-mix(in srgb, #4F7358 50%, transparent), transparent 68%),
              radial-gradient(ellipse 40% 35% at 70% 70%, color-mix(in srgb, var(--ld-moss) 40%, transparent), transparent 65%)
            `,
          }}
        />
        {/* Window still visible, smaller in full room */}
        <div
          data-plane="window-far"
          className="absolute right-[18%] top-[12%] h-[42%] w-[36%] opacity-90"
          style={{
            background: `
              linear-gradient(165deg, #7A8794 0%, var(--ld-sky) 40%, #4A515A 100%)
            `,
            boxShadow:
              'inset 0 0 0 1px color-mix(in srgb, white 14%, transparent), 0 0 40px color-mix(in srgb, var(--ld-sill) 40%, transparent)',
          }}
        />
        <div
          data-plane="wood-floor"
          className="absolute inset-x-0 bottom-0 h-[36%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in srgb, var(--ld-oak) 70%, black) 0%,
                color-mix(in srgb, var(--ld-oak) 40%, transparent) 55%,
                transparent 100%
              ),
              repeating-linear-gradient(
                90deg,
                transparent 0 18px,
                color-mix(in srgb, black 10%, transparent) 18px 19px
              )
            `,
          }}
        />
        <div
          data-plane="lamp-pool"
          className="absolute bottom-[18%] left-[20%] h-[35%] w-[45%] opacity-75"
          style={{
            background: `
              radial-gradient(
                ellipse 50% 40% at 45% 55%,
                color-mix(in srgb, var(--ld-lamp) 40%, transparent) 0%,
                transparent 70%
              )
            `,
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.2] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-14 pt-20 sm:px-8 sm:pb-20 lg:px-12">
        <p
          data-type="migrate"
          className="mb-3 max-w-[14rem] font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ld-lamp)_70%,white)] uppercase"
        >
          Fully inside
        </p>
        <h2
          id="scene-interior-title"
          className="max-w-xl font-['Cormorant_Garamond',serif] text-[clamp(2.75rem,11vw,5rem)] font-medium tracking-[-0.03em] leading-[0.9] text-[color-mix(in_srgb,var(--ld-linen)_92%,var(--ld-lamp))]"
        >
          Stone, wood, green.
        </h2>
        <p className="mt-4 max-w-sm font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ld-linen)_55%,var(--ld-stone))] sm:text-base">
          The street stays outside the glass — the night opens in here.
        </p>
      </div>
    </section>
  )
}
