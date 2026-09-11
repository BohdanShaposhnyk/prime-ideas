import type { CSSProperties } from 'react'

/**
 * Hush — lounge ember; seam softens; close CTA.
 */
export default function SceneHush() {
  return (
    <section
      id="hush"
      aria-labelledby="scene-hush-title"
      data-scene="hush"
      data-scroll="cut"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.94_0.01_80)]"
      style={
        {
          '--bn-ink': 'oklch(0.1 0.015 45)',
          '--bn-ember': 'oklch(0.45 0.08 45)',
          '--bn-glow': 'oklch(0.58 0.1 50)',
          '--bn-deep': 'oklch(0.16 0.02 40)',
          '--bn-amber': 'oklch(0.72 0.14 70)',
          '--bn-chalk': 'oklch(0.94 0.01 95)',
          clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 0 100%)',
          zIndex: 5,
        } as CSSProperties
      }
    >
      {/* swap: lounge ember plane */}
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
              radial-gradient(50% 45% at 40% 58%, color-mix(in oklch, var(--bn-ember) 50%, transparent) 0%, transparent 58%),
              radial-gradient(40% 35% at 78% 30%, color-mix(in oklch, var(--bn-glow) 22%, transparent) 0%, transparent 55%),
              linear-gradient(160deg, var(--bn-deep) 0%, var(--bn-ink) 55%, oklch(0.08 0.015 35) 100%)
            `,
          }}
        />
        {/* Soft hookah / ember pools */}
        <div
          data-plane="ember"
          className="absolute bottom-[18%] left-[20%] h-[28%] w-[45%] opacity-75"
          style={{
            background: `
              radial-gradient(ellipse at center, color-mix(in oklch, var(--bn-glow) 40%, transparent) 0%, transparent 70%)
            `,
            filter: 'blur(18px)',
          }}
        />
        <div
          data-seam="edge"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background: `
              linear-gradient(
                6deg,
                transparent 0%,
                transparent 8%,
                color-mix(in oklch, var(--bn-amber) 40%, var(--bn-glow)) 9%,
                transparent 11.5%
              )
            `,
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.24] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '145px 145px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 pb-12 pt-16 sm:px-8 sm:pb-16 lg:px-12">
        <p className="font-[Manrope,sans-serif] text-[0.65rem] tracking-[0.22em] text-[color-mix(in_oklch,var(--bn-glow)_65%,white)] uppercase">
          04 · Hush
        </p>

        <div className="flex max-w-lg flex-col items-start gap-6">
          <h2
            id="scene-hush-title"
            className="font-['Archivo_Black',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] tracking-[-0.03em] leading-[0.9] text-[color-mix(in_oklch,var(--bn-chalk)_90%,var(--bn-glow))]"
          >
            Stay in
          </h2>
          <p className="max-w-sm font-[Manrope,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--bn-chalk)_55%,var(--bn-ember))] sm:text-base">
            Ember lounge hush — the cut softens; the night holds.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--bn-amber)] px-4 font-[Manrope,sans-serif] text-sm font-medium text-[var(--bn-ink)] transition-opacity hover:opacity-90"
            >
              @prime_warsaw
            </a>
            <a
              href="#heat"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_oklch,var(--bn-chalk)_22%,transparent)] bg-[color-mix(in_oklch,var(--bn-ink)_35%,transparent)] px-4 font-[Manrope,sans-serif] text-sm font-medium text-[color-mix(in_oklch,var(--bn-chalk)_85%,var(--bn-glow))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,var(--bn-chalk)_40%,transparent)]"
            >
              Recut the night
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
