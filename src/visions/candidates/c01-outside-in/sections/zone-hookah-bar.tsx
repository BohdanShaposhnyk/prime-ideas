import type { CSSProperties } from 'react'

/**
 * Hookah | bar — deepest warm/comfy interior; soft close CTA.
 * Placeholder visual only; no Bits / GSAP here.
 */
export default function ZoneHookahBar() {
  return (
    <section
      aria-labelledby="zone-hookah-bar-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.94_0.02_75)]"
      style={
        {
          '--oi-wood': 'oklch(0.3 0.06 50)',
          '--oi-velvet': 'oklch(0.18 0.05 25)',
          '--oi-amber': 'oklch(0.72 0.13 70)',
          '--oi-ember': 'oklch(0.55 0.14 45)',
          '--oi-charcoal': 'oklch(0.1 0.015 40)',
        } as CSSProperties
      }
    >
      {/* swap: hookah / bar interior plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(70% 55% at 30% 70%, color-mix(in oklch, var(--oi-amber) 40%, transparent) 0%, transparent 55%),
              radial-gradient(50% 45% at 75% 40%, color-mix(in oklch, var(--oi-ember) 30%, transparent) 0%, transparent 50%),
              linear-gradient(155deg, var(--oi-charcoal) 0%, var(--oi-velvet) 45%, var(--oi-wood) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-45 mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                112deg,
                transparent 0 2px,
                color-mix(in oklch, var(--oi-wood) 35%, transparent) 2px 3px
              )
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 45% 30% at 35% 75%, color-mix(in oklch, var(--oi-amber) 25%, transparent), transparent 70%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end gap-8 px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <div>
          <h2
            id="zone-hookah-bar-title"
            className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_90%,var(--oi-amber))]"
          >
            Hookah · bar
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,white_60%,var(--oi-amber))] sm:text-base">
            Deepest warm interior — soft close, stay a while.
          </p>
        </div>

        <a
          href="https://www.instagram.com/prime_warsaw/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[color-mix(in_oklch,var(--oi-amber)_35%,transparent)] bg-[color-mix(in_oklch,var(--oi-charcoal)_50%,transparent)] px-4 text-sm font-medium text-[color-mix(in_oklch,white_88%,var(--oi-amber))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,var(--oi-amber)_55%,transparent)]"
        >
          Find us @prime_warsaw
        </a>
      </div>
    </section>
  )
}
