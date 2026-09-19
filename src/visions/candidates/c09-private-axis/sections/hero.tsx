import DepthText from '@/shared/bits/DepthText'

/**
 * Hero — corridor mouth. Z-plunge and type discovery stay inert for motion/.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="pa-hero-brand"
      data-scene="hero"
      data-plane="hero"
      data-dock="near"
      className="pointer-events-none absolute inset-0 isolate overflow-hidden"
    >
      {/* swap: hero corridor mouth — left ledger veil; rooms read through the right */}
      <div
        data-placeholder="visual"
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div
          data-plane="ledger-veil"
          className="absolute inset-y-0 left-0 w-[58%] sm:w-[42%]"
          style={{
            background:
              'linear-gradient(90deg, color-mix(in srgb, var(--pa-void) 92%, transparent) 0%, color-mix(in srgb, var(--pa-void) 70%, transparent) 55%, transparent 100%)',
          }}
        />
        <div
          data-plane="axis-line"
          className="absolute top-[8%] bottom-[8%] left-[62%] w-px -translate-x-1/2"
          style={{
            background:
              'linear-gradient(180deg, transparent, var(--pa-bone) 18%, color-mix(in srgb, var(--pa-oxblood) 70%, var(--pa-bone)) 50%, var(--pa-bone) 82%, transparent)',
            opacity: 0.55,
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.14] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      <div
        data-ledger="rail"
        className="relative z-10 flex h-full w-full flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-12"
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p
              data-stamp="steel"
              className="font-[family-name:var(--pa-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pa-metal)_80%,var(--pa-bone))] uppercase"
            >
              Prime Warsaw
            </p>
            <p className="mt-2 font-[family-name:var(--pa-body)] text-[0.62rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pa-steel)_90%,var(--pa-bone))] uppercase">
              Private floor
              <span className="ml-2 text-[color-mix(in_srgb,var(--pa-oxblood)_70%,var(--pa-metal))]">
                21:00 — late
              </span>
            </p>
          </div>
        </div>

        <div className="flex max-w-xl flex-col items-start gap-7 sm:gap-9">
          <div>
            <h1
              id="pa-hero-brand"
              data-hero="brand"
              data-type="discover"
              className="font-[family-name:var(--pa-display)] text-[var(--pa-bone)] uppercase"
            >
              <span className="sr-only">PRIME</span>
              <DepthText
                text="PRIME"
                layers={22}
                depth={1.8}
                faceColor="#E4DFD4"
                depthColor="#6B1F22"
                tilt={5.5}
                autoOrbit={false}
                pointerTracking
                shadow={false}
                fontSize="clamp(5.5rem, 28vw, 12rem)"
                fontWeight={800}
                className="font-[family-name:var(--pa-display)]"
              />
            </h1>
            <p
              data-hero="headline"
              className="mt-5 max-w-[16rem] font-[family-name:var(--pa-display)] text-[clamp(1.35rem,4.2vw,2.1rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-[color-mix(in_srgb,var(--pa-bone)_88%,var(--pa-metal))] uppercase"
            >
              Private after the door.
            </p>
            <p
              data-hero="support"
              className="mt-3 max-w-xs font-[family-name:var(--pa-body)] text-sm tracking-[0.04em] text-[color-mix(in_srgb,var(--pa-steel)_70%,var(--pa-bone))] sm:text-[0.95rem]"
            >
              The night has an axis.
            </p>
          </div>

          <div
            data-hero="cta"
            className="pointer-events-auto flex flex-wrap items-center gap-3"
          >
            <a
              href="#pa-close"
              className="inline-flex h-11 items-center justify-center border border-[color-mix(in_srgb,var(--pa-bone)_28%,transparent)] bg-[var(--pa-bone)] px-5 font-[family-name:var(--pa-body)] text-[0.7rem] font-medium tracking-[0.18em] text-[var(--pa-void)] uppercase hover:bg-[var(--pa-metal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa-bone)]"
            >
              Request table
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center border border-[color-mix(in_srgb,var(--pa-steel)_45%,transparent)] px-5 font-[family-name:var(--pa-body)] text-[0.7rem] font-medium tracking-[0.18em] text-[color-mix(in_srgb,var(--pa-bone)_80%,var(--pa-steel))] uppercase hover:border-[var(--pa-metal)] hover:text-[var(--pa-bone)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pa-bone)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
