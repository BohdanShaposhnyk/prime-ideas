import type { CSSProperties } from 'react'

/**
 * Heat — kitchen / bar copper wedge shearing in on a diagonal cut.
 */
export default function SceneHeat() {
  return (
    <section
      id="heat"
      aria-labelledby="scene-heat-title"
      data-scene="heat"
      data-scroll="cut"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.94_0.01_95)]"
      style={
        {
          '--bn-ink': 'oklch(0.12 0.015 40)',
          '--bn-copper': 'oklch(0.58 0.13 50)',
          '--bn-ember': 'oklch(0.65 0.12 45)',
          '--bn-deep': 'oklch(0.2 0.03 45)',
          '--bn-chalk': 'oklch(0.94 0.01 95)',
          '--bn-amber': 'oklch(0.72 0.14 70)',
          clipPath: 'polygon(0 16%, 100% 0, 100% 100%, 0 100%)',
          zIndex: 2,
        } as CSSProperties
      }
    >
      {/* swap: heat kitchen plane */}
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
              radial-gradient(55% 50% at 62% 42%, color-mix(in oklch, var(--bn-copper) 55%, transparent) 0%, transparent 60%),
              radial-gradient(40% 35% at 18% 72%, color-mix(in oklch, var(--bn-ember) 28%, transparent) 0%, transparent 55%),
              linear-gradient(165deg, var(--bn-deep) 0%, var(--bn-ink) 55%, oklch(0.1 0.02 35) 100%)
            `,
          }}
        />
        {/* Plate / pass highlight */}
        <div
          data-plane="pass"
          className="absolute left-[12%] top-[38%] h-[18%] w-[55%] opacity-70 sm:left-[18%] sm:w-[42%]"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                color-mix(in oklch, var(--bn-ember) 45%, transparent) 35%,
                color-mix(in oklch, var(--bn-copper) 55%, white) 52%,
                transparent 100%
              )
            `,
            filter: 'blur(8px)',
          }}
        />
        <div
          data-seam="edge"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(
                172deg,
                color-mix(in oklch, var(--bn-amber) 70%, white) 0%,
                color-mix(in oklch, var(--bn-amber) 25%, transparent) 1.2%,
                transparent 3%
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
        <p className="mb-3 font-[Manrope,sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_oklch,var(--bn-ember)_70%,white)] uppercase">
          01 · Heat
        </p>
        <h2
          id="scene-heat-title"
          className="max-w-lg font-['Archivo_Black',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] tracking-[-0.03em] leading-[0.9] text-[color-mix(in_oklch,var(--bn-chalk)_90%,var(--bn-copper))]"
        >
          Kitchen cut
        </h2>
        <p className="mt-4 max-w-sm font-[Manrope,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--bn-chalk)_55%,var(--bn-copper))] sm:text-base">
          Copper heat and plated light — the night starts warm.
        </p>
      </div>
    </section>
  )
}
