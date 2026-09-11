import type { CSSProperties } from 'react'

/** Ember — line softens; linger CTA fills both sides. */
export default function StripEmber() {
  return (
    <section
      id="ember"
      data-scene="ember"
      data-scroll="panel"
      data-panel="4"
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
      {/* swap: ember dissolve plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="ember"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(80% 60% at 50% 45%, color-mix(in srgb, var(--sl-gold) 34%, transparent) 0%, transparent 65%),
              radial-gradient(55% 50% at 50% 70%, color-mix(in srgb, var(--sl-amber) 40%, transparent) 0%, transparent 60%),
              linear-gradient(160deg, #4A2E1C 0%, var(--sl-espresso) 42%, var(--sl-veil) 100%)
            `,
          }}
        />
        <div
          data-plane="dissolve"
          className="absolute inset-x-0 top-[36%] h-[22%] opacity-60"
          style={{
            background: `
              linear-gradient(
                180deg,
                transparent 0%,
                color-mix(in srgb, var(--sl-parchment) 12%, transparent) 40%,
                color-mix(in srgb, var(--sl-gold) 20%, transparent) 55%,
                transparent 100%
              )
            `,
            filter: 'blur(18px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.26] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-center px-6 sm:px-10 lg:px-14">
        <p
          data-horizon="soft"
          className="mb-4 font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--sl-gold)_75%,var(--sl-parchment))] uppercase"
        >
          Both sides of the line
        </p>
        <h2 className="max-w-xl font-['Space_Grotesk',sans-serif] text-[clamp(2.5rem,9vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.03em]">
          Linger here.
        </h2>
        <p className="mt-4 max-w-sm font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--sl-parchment)_74%,var(--sl-sage))]">
          The smoke softens. The night stays.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://www.instagram.com/prime_warsaw/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--sl-gold)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[var(--sl-veil)] transition-opacity hover:opacity-90"
          >
            @prime_warsaw
          </a>
          <a
            href="#smoke-hero"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_srgb,var(--sl-parchment)_22%,transparent)] px-4 font-['IBM_Plex_Sans',sans-serif] text-sm font-medium text-[color-mix(in_srgb,var(--sl-parchment)_88%,var(--sl-gold))] transition-colors hover:border-[color-mix(in_srgb,var(--sl-parchment)_40%,transparent)]"
          >
            Back to the seam
          </a>
        </div>
      </div>
    </section>
  )
}
