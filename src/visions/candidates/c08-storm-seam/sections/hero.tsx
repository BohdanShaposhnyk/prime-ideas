import type { CSSProperties } from 'react'

/**
 * Hero — abstract storm sky. Parallax planes are inert hooks for motion/.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="ss-hero-brand"
      data-scene="hero"
      data-hero="storm-seam"
      className="absolute inset-0 isolate overflow-hidden text-[#C9D6FF]"
      style={
        {
          '--ss-night': '#070B18',
          '--ss-ice': '#8EB8FF',
          '--ss-vein': '#C9D6FF',
          '--ss-volt': '#6B4CFF',
          '--ss-white': '#F5F5F5',
          fontFamily: '"Unbounded", sans-serif',
        } as CSSProperties
      }
    >
      {/* swap: hero storm sky */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          data-plane="sky"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 55% at 50% 110%, color-mix(in srgb, var(--ss-volt) 28%, transparent), transparent 55%),
              radial-gradient(ellipse 45% 40% at 18% 22%, color-mix(in srgb, var(--ss-ice) 18%, transparent), transparent 60%),
              radial-gradient(ellipse 50% 45% at 88% 30%, color-mix(in srgb, var(--ss-volt) 22%, transparent), transparent 58%),
              linear-gradient(165deg, #04060F 0%, var(--ss-night) 42%, #0C1228 100%)
            `,
          }}
        />

        {/* Far star field */}
        <div
          data-plane="stars-far"
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 12% 18%, var(--ss-white), transparent),
              radial-gradient(1px 1px at 28% 42%, var(--ss-ice), transparent),
              radial-gradient(1.5px 1.5px at 44% 12%, var(--ss-white), transparent),
              radial-gradient(1px 1px at 61% 36%, var(--ss-vein), transparent),
              radial-gradient(1.5px 1.5px at 78% 22%, var(--ss-white), transparent),
              radial-gradient(1px 1px at 91% 48%, var(--ss-ice), transparent),
              radial-gradient(1px 1px at 8% 68%, var(--ss-white), transparent),
              radial-gradient(1.5px 1.5px at 33% 78%, var(--ss-vein), transparent),
              radial-gradient(1px 1px at 55% 62%, var(--ss-white), transparent),
              radial-gradient(1px 1px at 72% 84%, var(--ss-ice), transparent),
              radial-gradient(1.5px 1.5px at 86% 70%, var(--ss-white), transparent)
            `,
          }}
        />

        {/* Near stars — parallax hook */}
        <div
          data-plane="stars-near"
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(2px 2px at 20% 30%, var(--ss-white), transparent),
              radial-gradient(2.5px 2.5px at 68% 18%, var(--ss-vein), transparent),
              radial-gradient(2px 2px at 48% 55%, var(--ss-white), transparent),
              radial-gradient(2px 2px at 82% 62%, var(--ss-ice), transparent),
              radial-gradient(3px 3px at 14% 82%, var(--ss-white), transparent)
            `,
          }}
        />

        {/* Lightning veins */}
        <div
          data-plane="lightning"
          className="absolute inset-0 mix-blend-screen opacity-80"
          style={{
            background: `
              linear-gradient(118deg, transparent 42%, color-mix(in srgb, var(--ss-vein) 55%, transparent) 46%, transparent 48%),
              linear-gradient(98deg, transparent 58%, color-mix(in srgb, var(--ss-ice) 40%, transparent) 61%, transparent 64%),
              linear-gradient(140deg, transparent 28%, color-mix(in srgb, var(--ss-volt) 50%, transparent) 31%, transparent 34%)
            `,
          }}
        />

        {/* Mid haze depth */}
        <div
          data-plane="haze"
          className="absolute inset-x-0 bottom-0 h-[45%]"
          style={{
            background: `
              linear-gradient(0deg, color-mix(in srgb, var(--ss-night) 90%, black) 0%, transparent 100%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-5 py-10 sm:px-8 lg:px-12">
        <p
          id="ss-hero-brand"
          data-type="brand"
          className="max-w-[110%] translate-x-[-0.06em] overflow-hidden text-[clamp(4.5rem,22vw,11rem)] leading-[0.78] font-medium tracking-[-0.06em] text-[var(--ss-white)] uppercase"
        >
          Prime
        </p>

        <div className="flex max-w-md flex-col gap-4 self-end text-right sm:max-w-lg">
          <h1
            data-type="headline"
            className="font-['Unbounded',sans-serif] text-[clamp(1.6rem,5vw,3.25rem)] leading-[0.95] font-medium tracking-[-0.03em] text-[var(--ss-vein)]"
          >
            The sky cracks first.
          </h1>
          <p
            data-type="support"
            className="font-['Space_Grotesk',sans-serif] text-[0.8rem] leading-relaxed tracking-[0.04em] text-[color-mix(in_srgb,var(--ss-ice)_70%,transparent)] sm:text-sm"
          >
            Then the lodge holds.
          </p>
          <a
            href="#ss-lodge"
            data-cta="enter"
            className="mt-2 self-end border border-[color-mix(in_srgb,var(--ss-vein)_35%,transparent)] px-5 py-2.5 font-['Space_Grotesk',sans-serif] text-[0.65rem] tracking-[0.2em] text-[var(--ss-white)] uppercase transition-colors hover:border-[var(--ss-ice)] hover:bg-[color-mix(in_srgb,var(--ss-volt)_25%,transparent)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[var(--ss-ice)]"
          >
            Enter the seam
          </a>
        </div>
      </div>
    </section>
  )
}
