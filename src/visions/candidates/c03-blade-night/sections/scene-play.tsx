import type { CSSProperties } from 'react'

/**
 * Play — arena cool screen wedge; denser teal pulse behind the cut.
 */
export default function ScenePlay() {
  return (
    <section
      id="play"
      aria-labelledby="scene-play-title"
      data-scene="play"
      data-scroll="cut"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.93_0.02_200)]"
      style={
        {
          '--bn-ink': 'oklch(0.1 0.02 220)',
          '--bn-teal': 'oklch(0.52 0.09 195)',
          '--bn-cyan': 'oklch(0.68 0.08 205)',
          '--bn-deep': 'oklch(0.16 0.03 230)',
          '--bn-amber': 'oklch(0.72 0.14 70)',
          '--bn-chalk': 'oklch(0.94 0.01 95)',
          clipPath: 'polygon(0 0, 100% 14%, 100% 100%, 0 100%)',
          zIndex: 3,
        } as CSSProperties
      }
    >
      {/* swap: arena screen plane */}
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
              radial-gradient(50% 45% at 74% 36%, color-mix(in oklch, var(--bn-teal) 52%, transparent) 0%, transparent 58%),
              radial-gradient(35% 30% at 22% 62%, color-mix(in oklch, var(--bn-cyan) 22%, transparent) 0%, transparent 52%),
              linear-gradient(155deg, var(--bn-ink) 0%, var(--bn-deep) 50%, oklch(0.11 0.02 210) 100%)
            `,
          }}
        />
        <div
          data-plane="scan"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0 3px,
                color-mix(in oklch, var(--bn-cyan) 14%, transparent) 3px 4px
              )
            `,
            maskImage:
              'radial-gradient(50% 45% at 74% 36%, black 0%, transparent 72%)',
          }}
        />
        <div
          data-plane="screen"
          className="absolute right-[6%] top-[20%] h-[32%] w-[42%] opacity-65"
          style={{
            background: `
              radial-gradient(ellipse at center, color-mix(in oklch, var(--bn-cyan) 42%, transparent) 0%, transparent 70%)
            `,
            filter: 'blur(14px)',
          }}
        />
        <div
          data-seam="edge"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(
                8deg,
                transparent 0%,
                transparent 11%,
                color-mix(in oklch, var(--bn-amber) 55%, var(--bn-cyan)) 12.2%,
                transparent 14%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-5 pb-14 pt-20 sm:px-8 sm:pb-20 lg:px-12">
        <p className="mb-3 font-[Manrope,sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_oklch,var(--bn-cyan)_65%,white)] uppercase">
          02 · Play
        </p>
        <h2
          id="scene-play-title"
          className="max-w-lg font-['Archivo_Black',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] tracking-[-0.03em] leading-[0.9] text-[color-mix(in_oklch,var(--bn-chalk)_88%,var(--bn-cyan))]"
        >
          Arena cut
        </h2>
        <p className="mt-4 max-w-sm font-[Manrope,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--bn-chalk)_52%,var(--bn-teal))] sm:text-base">
          Screen-lit play floor — cooler pulse through the seam.
        </p>
      </div>
    </section>
  )
}
