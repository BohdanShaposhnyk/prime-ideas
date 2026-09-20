import Lightning from '@/shared/bits/Lightning'

export default function Hero() {
  return (
    <section
      aria-labelledby="cs-hero-brand"
      data-scroll="split-hold"
      data-scene="hero"
      className="flex h-dvh flex-col overflow-hidden md:flex-row"
    >
      <div
        data-pane="charge"
        className="relative min-h-0 flex-1 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 78% 72% at 50% 48%, #0A2478 0%, #071A52 42%, #000000 78%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          aria-hidden
        >
          <Lightning
            hue={220}
            speed={1.05}
            intensity={1.4}
            size={1.2}
            xOffset={0}
          />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <h1
            id="cs-hero-brand"
            data-copy="brand"
            className="font-[family-name:var(--cs-display)] text-[clamp(5rem,28vw,9.5rem)] leading-[0.8] text-[var(--cs-ice)] uppercase md:text-[clamp(6.5rem,18vw,16rem)]"
            style={{ textShadow: '0 0 48px color-mix(in srgb, #0A2478 55%, transparent)' }}
          >
            PRIME
          </h1>
          <p
            data-copy="support"
            className="mt-3 font-[family-name:var(--cs-body)] text-[clamp(0.85rem,2.4vw,1.05rem)] tracking-[0.28em] text-[var(--cs-caption)]"
          >
            own the night.
          </p>
          <a
            data-copy="cta"
            href="https://www.instagram.com/prime_warsaw/"
            className="mt-8 inline-flex border border-[color-mix(in_srgb,var(--cs-caption)_45%,transparent)] px-5 py-2.5 font-[family-name:var(--cs-body)] text-[0.68rem] tracking-[0.24em] text-[var(--cs-ice)] uppercase hover:border-[var(--cs-ice)] hover:text-[var(--cs-ice)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cs-ice)]"
          >
            Book the night
          </a>
        </div>
      </div>

      <div
        data-pane="video"
        className="relative min-h-0 flex-1 overflow-hidden bg-[var(--cs-void)]"
      >
        {/* swap: hero video */}
        <div data-placeholder="visual" className="absolute inset-0" aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 64% 52% at 50% 50%, #161A24 0%, #0C0E14 72%)',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-[9%] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[9%] bg-black" />
          <div
            className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
        </div>
      </div>
    </section>
  )
}
