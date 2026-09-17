import type { CSSProperties } from 'react'

/**
 * Floor — lateral side-floor finale after the spiral cards.
 */
export default function Floor() {
  return (
    <section
      aria-labelledby="ss-floor-title"
      data-scene="floor"
      className="relative flex h-dvh w-[min(100vw,1400px)] shrink-0 snap-start overflow-hidden text-[#E8E2D6]"
      style={
        {
          '--ss-walnut': '#3A2A1C',
          '--ss-stone': '#2C2A28',
          '--ss-moss': '#2F3D2E',
          '--ss-amber': '#C48A3A',
          '--ss-cream': '#E8E2D6',
          '--ss-black': '#050505',
          '--ss-acid': '#B8FF3C',
        } as CSSProperties
      }
    >
      {/* swap: side floor / lounge */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(50% 60% at 20% 50%, color-mix(in srgb, var(--ss-amber) 22%, transparent), transparent 55%),
              radial-gradient(40% 50% at 75% 60%, color-mix(in srgb, var(--ss-moss) 30%, transparent), transparent 58%),
              linear-gradient(105deg, var(--ss-black) 0%, #12100E 35%, var(--ss-walnut) 70%, var(--ss-stone) 100%)
            `,
          }}
        />
        <div
          data-plane="planks"
          className="absolute inset-x-0 bottom-0 h-[48%]"
          style={{
            background: `
              linear-gradient(0deg, color-mix(in srgb, var(--ss-walnut) 90%, black), transparent),
              repeating-linear-gradient(90deg, transparent 0 32px, color-mix(in srgb, black 16%, transparent) 32px 33px)
            `,
          }}
        />
        <div
          data-plane="neon-edge"
          className="absolute top-0 bottom-0 left-0 w-[3px] bg-[var(--ss-acid)]"
          style={{
            boxShadow: '0 0 30px color-mix(in srgb, var(--ss-acid) 50%, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-10 sm:px-10 lg:px-16">
        <p
          data-type="tiny"
          className="font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.28em] text-[var(--ss-acid)] uppercase"
        >
          Side floor
        </p>
        <div className="max-w-xl">
          <h2
            id="ss-floor-title"
            data-type="headline"
            className="font-['Unbounded',sans-serif] text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.88] font-medium tracking-[-0.05em] text-[var(--ss-cream)]"
          >
            Stay on the floor.
          </h2>
          <p
            data-type="support"
            className="mt-5 max-w-md font-['Space_Grotesk',sans-serif] text-sm leading-relaxed text-[color-mix(in_srgb,var(--ss-cream)_70%,transparent)] sm:text-base"
          >
            After the spiral — low light, long wood, the night still open.
          </p>
          <a
            href="https://www.instagram.com/prime_warsaw/"
            target="_blank"
            rel="noreferrer"
            data-cta="ig"
            className="mt-8 inline-block border border-[color-mix(in_srgb,var(--ss-cream)_30%,transparent)] px-5 py-2.5 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.2em] text-[var(--ss-cream)] uppercase hover:border-[var(--ss-acid)] hover:text-[var(--ss-acid)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[var(--ss-acid)]"
          >
            @prime_warsaw
          </a>
        </div>
      </div>
    </section>
  )
}
