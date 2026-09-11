import type { CSSProperties } from 'react'

/**
 * Lounge — ember hookah hush; soft close CTA.
 */
export default function ZoneLounge() {
  return (
    <section
      aria-labelledby="zone-lounge-title"
      className="relative isolate min-h-[85dvh] overflow-hidden text-[oklch(0.94_0.02_70)]"
      style={
        {
          '--on-ink': 'oklch(0.09 0.015 40)',
          '--on-ember': 'oklch(0.62 0.14 55)',
          '--on-amber': 'oklch(0.7 0.12 70)',
          '--on-velvet': 'oklch(0.17 0.045 25)',
          '--on-wood': 'oklch(0.26 0.05 50)',
          '--on-smoke': 'oklch(0.5 0.02 60)',
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
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(65% 50% at 32% 72%, color-mix(in oklch, var(--on-ember) 48%, transparent) 0%, transparent 55%),
              radial-gradient(45% 40% at 78% 45%, color-mix(in oklch, var(--on-amber) 22%, transparent) 0%, transparent 50%),
              linear-gradient(155deg, var(--on-ink) 0%, var(--on-velvet) 48%, var(--on-wood) 100%)
            `,
          }}
        />
        {/* Soft smoke wash */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(ellipse 55% 35% at 40% 55%, color-mix(in oklch, var(--on-smoke) 35%, transparent), transparent 70%),
              radial-gradient(ellipse 40% 30% at 60% 40%, color-mix(in oklch, white 8%, transparent), transparent 65%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                108deg,
                transparent 0 2px,
                color-mix(in oklch, var(--on-wood) 30%, transparent) 2px 3px
              )
            `,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[35%]"
          style={{
            background: `
              linear-gradient(
                0deg,
                color-mix(in oklch, var(--on-ember) 30%, transparent) 0%,
                transparent 100%
              )
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[85dvh] flex-col justify-end gap-8 px-5 pb-14 pt-16 sm:px-8 sm:pb-20 lg:px-12">
        <div>
          <p className="mb-3 text-[0.65rem] tracking-[0.2em] text-[color-mix(in_oklch,var(--on-amber)_70%,white)] uppercase">
            04 · Linger
          </p>
          <h2
            id="zone-lounge-title"
            className="max-w-xl text-[clamp(2rem,8vw,3.75rem)] font-medium tracking-[-0.04em] leading-[0.95] text-[color-mix(in_oklch,white_90%,var(--on-ember))]"
          >
            Lounge
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklch,white_55%,var(--on-amber))] sm:text-base">
            Ember hookah hush — stay for the last hour.
          </p>
        </div>

        <a
          href="https://www.instagram.com/prime_warsaw/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[color-mix(in_oklch,var(--on-ember)_40%,transparent)] bg-[color-mix(in_oklch,var(--on-ink)_55%,transparent)] px-4 text-sm font-medium text-[color-mix(in_oklch,white_88%,var(--on-amber))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,var(--on-ember)_60%,transparent)]"
        >
          Find us @prime_warsaw
        </a>
      </div>
    </section>
  )
}
