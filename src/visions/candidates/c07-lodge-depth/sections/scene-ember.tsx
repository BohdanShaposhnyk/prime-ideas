import type { CSSProperties } from 'react'

/**
 * Ember — closing diagonal; caption settles inside the warm half.
 */
export default function SceneEmber() {
  return (
    <section
      id="ember"
      aria-labelledby="scene-ember-title"
      data-scene="ember"
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
          '--ld-ember': '#B86A3A',
          zIndex: 6,
        } as CSSProperties
      }
    >
      {/* Cool outer residual */}
      <div
        data-pane="caption-residual"
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 38%, 0 22%)',
          background: `
            linear-gradient(
              180deg,
              color-mix(in srgb, var(--ld-sky) 25%, #1A1E22) 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        data-placeholder="visual"
        data-pane="media"
        className="absolute inset-0"
        aria-hidden
        style={{
          clipPath: 'polygon(0 22%, 100% 38%, 100% 100%, 0 100%)',
        }}
      >
        <div
          data-plane="field"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 45% at 40% 55%, color-mix(in srgb, var(--ld-ember) 45%, transparent) 0%, transparent 58%),
              radial-gradient(40% 35% at 70% 70%, color-mix(in srgb, var(--ld-lamp) 35%, transparent) 0%, transparent 55%),
              linear-gradient(155deg, #2A1C16 0%, var(--ld-oak) 40%, #1A1210 100%)
            `,
          }}
        />
        {/* Hookah / ember glow */}
        <div
          data-plane="ember-glow"
          className="absolute bottom-[22%] left-[28%] h-[40%] w-[40%] opacity-75"
          style={{
            background: `
              radial-gradient(
                ellipse 45% 40% at 50% 60%,
                color-mix(in srgb, var(--ld-ember) 55%, transparent) 0%,
                color-mix(in srgb, var(--ld-lamp) 25%, transparent) 45%,
                transparent 70%
              )
            `,
          }}
        />
        <div
          data-plane="smoke"
          className="absolute bottom-[35%] left-[35%] h-[30%] w-[30%] opacity-35"
          style={{
            background: `
              radial-gradient(
                ellipse 50% 60% at 50% 80%,
                color-mix(in srgb, var(--ld-linen) 25%, transparent),
                transparent 70%
              )
            `,
            filter: 'blur(16px)',
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
              172deg,
              transparent 0%,
              transparent 24%,
              color-mix(in srgb, var(--ld-linen) 40%, transparent) 26%,
              color-mix(in srgb, var(--ld-ember) 35%, transparent) 28%,
              transparent 32%
            )
          `,
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-2 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--ld-ember)_70%,white)] uppercase">
          04 · Ember
        </p>
        <h2
          id="scene-ember-title"
          data-type="migrate"
          data-caption="settle"
          className="max-w-lg font-['Cormorant_Garamond',serif] text-[clamp(2.75rem,11vw,5rem)] font-medium tracking-[-0.03em] leading-[0.9] text-[color-mix(in_srgb,var(--ld-linen)_92%,var(--ld-lamp))]"
        >
          Stay in the warm half.
        </h2>
        <p className="mt-4 max-w-sm font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ld-linen)_55%,var(--ld-ember))] sm:text-base">
          Caption settles where the night softens — bar, hookah, hush.
        </p>
        <a
          href="https://www.instagram.com/prime_warsaw/"
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex h-10 w-fit items-center justify-center rounded-md bg-[var(--ld-lamp)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[var(--ld-sill)] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ld-linen)]"
        >
          @prime_warsaw
        </a>
      </div>
    </section>
  )
}
