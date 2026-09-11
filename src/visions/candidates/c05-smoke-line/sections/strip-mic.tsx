import type { CSSProperties } from 'react'

/** Mic — voice and stage drift under the line. */
export default function StripMic() {
  return (
    <section
      id="mic"
      data-scene="mic"
      data-scroll="panel"
      data-panel="3"
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
      {/* swap: mic stage plane */}
      <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
        <div
          data-plane="stage"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 42% at 50% 78%, color-mix(in srgb, var(--sl-amber) 42%, transparent) 0%, transparent 55%),
              radial-gradient(35% 30% at 62% 48%, color-mix(in srgb, var(--sl-gold) 26%, transparent) 0%, transparent 50%),
              linear-gradient(175deg, #2A1C18 0%, var(--sl-espresso) 50%, #120E0C 100%)
            `,
          }}
        />
        <div
          data-plane="spot"
          className="absolute top-[20%] left-1/2 h-[55%] w-[36%] -translate-x-1/2 opacity-45"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in srgb, var(--sl-parchment) 22%, transparent) 0%,
                color-mix(in srgb, var(--sl-gold) 14%, transparent) 45%,
                transparent 100%
              )
            `,
            filter: 'blur(28px)',
            clipPath: 'polygon(38% 0%, 62% 0%, 92% 100%, 8% 100%)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.3] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div className="relative z-10 flex h-[42%] w-full items-end px-6 pb-3 sm:px-10 lg:px-14">
        <p className="font-['IBM_Plex_Sans',sans-serif] text-[0.65rem] tracking-[0.24em] text-[color-mix(in_srgb,var(--sl-gold)_70%,var(--sl-parchment))] uppercase">
          Under the line
        </p>
      </div>

      <div className="relative z-10 mt-auto flex h-[58%] w-full flex-col justify-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-14">
        <h2 className="font-['Space_Grotesk',sans-serif] text-[clamp(2.25rem,8vw,4rem)] leading-[0.95] font-bold tracking-[-0.03em]">
          Mic
        </h2>
        <p className="mt-3 max-w-xs font-['IBM_Plex_Sans',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--sl-parchment)_72%,var(--sl-sage))]">
          Voice and stage drift under the line.
        </p>
      </div>
    </section>
  )
}
