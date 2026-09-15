import type { CSSProperties } from 'react'

/**
 * Interior — copy only. Same lodge scene as hero; text arrives as the camera settles.
 */
export default function SceneInterior() {
  return (
    <section
      id="interior"
      aria-labelledby="scene-interior-title"
      data-scene="interior"
      data-copy="interior"
      className="pointer-events-none absolute inset-0 z-20 flex h-full w-full flex-col justify-end overflow-hidden px-5 pb-14 pt-20 text-[var(--ld-linen)] opacity-0 sm:px-8 sm:pb-20 lg:px-12"
      style={
        {
          '--ld-stone': '#8A8578',
          '--ld-oak': '#6B4A32',
          '--ld-moss': '#3D5C45',
          '--ld-sky': '#9AA8B5',
          '--ld-lamp': '#C4A574',
          '--ld-sill': '#1A1814',
          '--ld-linen': '#E8E2D6',
        } as CSSProperties
      }
    >
      <p className="mb-3 max-w-[14rem] font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ld-lamp)_70%,white)] uppercase">
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
    </section>
  )
}
