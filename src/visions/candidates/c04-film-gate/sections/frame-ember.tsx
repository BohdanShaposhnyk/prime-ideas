import type { CSSProperties } from 'react'

/**
 * Ember — lounge hush / late linger inside the final gate.
 */
export default function FrameEmber() {
  return (
    <section
      id="ember"
      aria-labelledby="frame-ember-title"
      data-scene="ember"
      data-scroll="gate"
      data-frame="4"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.93_0.01_95)]"
      style={
        {
          '--fg-ink': 'oklch(0.1 0.02 45)',
          '--fg-ember': 'oklch(0.28 0.04 50)',
          '--fg-warm': 'oklch(0.62 0.1 55)',
          '--fg-glow': 'oklch(0.72 0.11 60)',
          '--fg-chalk': 'oklch(0.93 0.01 95)',
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
              radial-gradient(55% 45% at 40% 60%, color-mix(in oklch, var(--fg-warm) 38%, transparent) 0%, transparent 58%),
              radial-gradient(40% 35% at 75% 30%, color-mix(in oklch, var(--fg-glow) 18%, transparent) 0%, transparent 55%),
              linear-gradient(160deg, var(--fg-ember) 0%, var(--fg-ink) 55%, oklch(0.07 0.015 40) 100%)
            `,
          }}
        />
        {/* Soft smoke / hookah drift */}
        <div
          data-plane="drift"
          className="absolute inset-x-[15%] top-[20%] h-[45%] opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 60% 40% at 30% 50%, color-mix(in oklch, var(--fg-chalk) 12%, transparent) 0%, transparent 70%),
              radial-gradient(ellipse 50% 35% at 70% 40%, color-mix(in oklch, var(--fg-warm) 15%, transparent) 0%, transparent 65%)
            `,
            filter: 'blur(24px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.26] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div
        data-gate="bar"
        className="absolute inset-x-0 top-0 z-20 flex h-[clamp(3.25rem,10vw,4.5rem)] items-end border-b border-[color-mix(in_oklch,var(--fg-warm)_28%,transparent)] bg-[color-mix(in_oklch,var(--fg-ink)_82%,transparent)] px-[clamp(2.75rem,8vw,4.5rem)] pb-2"
      >
        <p className="font-['Teko',sans-serif] text-sm tracking-[0.28em] text-[color-mix(in_oklch,var(--fg-warm)_85%,var(--fg-chalk))] uppercase">
          Frame 04 — Ember
        </p>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(2.75rem,8vw,4.5rem)] pb-12 pt-24 sm:pb-16">
        <h2
          id="frame-ember-title"
          className="font-['Teko',sans-serif] text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.9] tracking-[0.02em] text-[var(--fg-chalk)] uppercase"
        >
          Stay late.
        </h2>
        <p className="mt-3 max-w-xs font-[Karla,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--fg-chalk)_68%,var(--fg-warm))]">
          Hookah hush. Bar glow. The reel slows to linger.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="https://www.instagram.com/prime_warsaw/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--fg-warm)] px-4 font-[Karla,sans-serif] text-sm font-medium text-[var(--fg-ink)] transition-opacity hover:opacity-90"
          >
            Find us
          </a>
        </div>
      </div>
    </section>
  )
}
