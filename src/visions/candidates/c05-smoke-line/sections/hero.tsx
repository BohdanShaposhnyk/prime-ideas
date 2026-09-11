import type { CSSProperties } from 'react'

/**
 * Hero — horizon opens; brand on the smoke seam.
 * Hooks (`data-hero`, `data-plane`, `data-horizon`) reserved for GSAP.
 */
export default function Hero() {
  return (
    <section
      id="smoke-hero"
      data-hero="smoke-line"
      data-scene="hero"
      data-scroll="panel"
      data-panel="0"
      className="relative isolate flex h-dvh w-screen shrink-0 snap-start snap-always overflow-hidden text-[var(--sl-parchment)]"
      style={
        {
          '--sl-espresso': '#2C1810',
          '--sl-gold': '#D4A574',
          '--sl-sage': '#8B9E8B',
          '--sl-parchment': '#F5E6D3',
          '--sl-amber': '#C17B4A',
          '--sl-veil': '#1A1410',
        } as CSSProperties
      }
    >
      {/* swap: hero smoke plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="ash"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(70% 55% at 55% 38%, color-mix(in srgb, var(--sl-gold) 28%, transparent) 0%, transparent 62%),
              radial-gradient(50% 45% at 18% 72%, color-mix(in srgb, var(--sl-amber) 35%, transparent) 0%, transparent 58%),
              linear-gradient(180deg, #3A261C 0%, var(--sl-espresso) 46%, var(--sl-veil) 100%)
            `,
          }}
        />
        <div
          data-plane="smoke-veil"
          className="absolute inset-x-0 top-[38%] h-[28%] -translate-y-1/2 opacity-70"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                color-mix(in srgb, var(--sl-sage) 22%, transparent) 22%,
                color-mix(in srgb, var(--sl-parchment) 14%, transparent) 50%,
                color-mix(in srgb, var(--sl-gold) 18%, transparent) 78%,
                transparent 100%
              )
            `,
            filter: 'blur(36px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.32] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      {/* Brand rides the seam */}
      <div
        data-horizon="brand-slot"
        className="absolute top-[42%] z-20 flex w-full -translate-y-1/2 items-center px-6 sm:px-10 lg:px-14"
      >
        <h1
          data-hero="brand"
          className="font-['Space_Grotesk',sans-serif] text-[clamp(3.25rem,14vw,7rem)] leading-none font-bold tracking-[-0.04em] text-[var(--sl-parchment)]"
        >
          PRIME
        </h1>
      </div>

      {/* Under-horizon copy + CTA */}
      <div className="relative z-10 mt-auto flex h-[58%] w-full flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-14">
        <div className="flex max-w-lg flex-col gap-5 sm:gap-6">
          <p
            data-hero="headline"
            className="font-['Space_Grotesk',sans-serif] text-[clamp(1.5rem,4.5vw,2.35rem)] leading-[1.1] font-bold tracking-[-0.02em] text-[color-mix(in_srgb,var(--sl-parchment)_92%,var(--sl-gold))]"
          >
            Follow the smoke.
          </p>
          <p
            data-hero="support"
            className="max-w-[18rem] font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--sl-parchment)_68%,var(--sl-sage))]"
          >
            Prime Warsaw.
          </p>
          <div data-hero="cta" className="flex flex-wrap items-center gap-3">
            <a
              href="#kitchen"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--sl-amber)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[var(--sl-veil)] transition-opacity hover:opacity-90"
            >
              Drift the night
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--sl-parchment)_22%,transparent)] bg-[color-mix(in_srgb,var(--sl-veil)_40%,transparent)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[color-mix(in_srgb,var(--sl-parchment)_88%,var(--sl-gold))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_srgb,var(--sl-parchment)_40%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
