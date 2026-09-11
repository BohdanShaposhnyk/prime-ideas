import type { CSSProperties } from 'react'

/**
 * Hero — first film gate open on PRIME.
 * Hooks (`data-hero`, `data-plane`, `data-gate`) reserved for GSAP.
 */
export default function Hero() {
  return (
    <section
      data-hero="film-gate"
      data-scene="hero"
      data-scroll="gate"
      data-frame="0"
      className="sticky top-0 isolate flex h-dvh w-full overflow-hidden text-[oklch(0.93_0.01_95)]"
      style={
        {
          '--fg-ink': 'oklch(0.09 0.012 45)',
          '--fg-rail': 'oklch(0.48 0.01 90)',
          '--fg-cyan': 'oklch(0.74 0.11 195)',
          '--fg-amber': 'oklch(0.78 0.13 75)',
          '--fg-chalk': 'oklch(0.93 0.01 95)',
          zIndex: 1,
        } as CSSProperties
      }
    >
      {/* Dominant visual — swap: hero aperture plane */}
      <div
        data-placeholder="visual"
        className="absolute inset-0"
        aria-hidden
      >
        <div
          data-plane="aperture"
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(65% 50% at 50% 42%, color-mix(in oklch, var(--fg-cyan) 32%, transparent) 0%, transparent 58%),
              radial-gradient(45% 40% at 72% 68%, color-mix(in oklch, var(--fg-amber) 28%, transparent) 0%, transparent 55%),
              linear-gradient(165deg, oklch(0.14 0.02 50) 0%, var(--fg-ink) 52%, oklch(0.07 0.01 40) 100%)
            `,
          }}
        />
        {/* Soft projection beam */}
        <div
          data-plane="beam"
          className="absolute left-1/2 top-[-8%] h-[70%] w-[48%] -translate-x-1/2 opacity-60"
          style={{
            background: `
              linear-gradient(
                180deg,
                color-mix(in oklch, var(--fg-chalk) 18%, transparent) 0%,
                color-mix(in oklch, var(--fg-cyan) 12%, transparent) 42%,
                transparent 100%
              )
            `,
            filter: 'blur(28px)',
          }}
        />
        <div
          data-plane="grain"
          className="absolute inset-0 opacity-[0.28] mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
            backgroundSize: '140px 140px',
          }}
        />
      </div>

      {/* Gate top bar — brand seam */}
      <div
        data-gate="bar"
        className="absolute inset-x-0 top-0 z-20 flex h-[clamp(4.5rem,14vw,6.5rem)] items-end border-b border-[color-mix(in_oklch,var(--fg-rail)_35%,transparent)] bg-[color-mix(in_oklch,var(--fg-ink)_88%,transparent)] px-[clamp(2.75rem,8vw,4.5rem)] pb-2 backdrop-blur-[2px]"
      >
        <h1
          data-hero="brand"
          className="font-['Teko',sans-serif] text-[clamp(3.5rem,16vw,7.5rem)] leading-[0.8] tracking-[0.04em] text-[var(--fg-chalk)] uppercase"
        >
          PRIME
        </h1>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col justify-end px-[clamp(2.75rem,8vw,4.5rem)] pb-12 pt-[clamp(5.5rem,18vw,8rem)] sm:pb-16">
        <div className="flex max-w-md flex-col gap-6 sm:gap-7">
          <p
            data-hero="headline"
            className="font-['Teko',sans-serif] text-[clamp(1.75rem,6vw,2.75rem)] leading-[1.05] tracking-[0.02em] text-[color-mix(in_oklch,var(--fg-chalk)_92%,var(--fg-cyan))]"
          >
            One night. One reel.
          </p>
          <p
            data-hero="support"
            className="max-w-[16rem] font-[Karla,sans-serif] text-sm leading-relaxed text-[color-mix(in_oklch,var(--fg-chalk)_70%,var(--fg-rail))]"
          >
            Advance the frame.
          </p>
          <div data-hero="cta" className="flex flex-wrap items-center gap-3">
            <a
              href="#arena"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--fg-cyan)] px-4 font-[Karla,sans-serif] text-sm font-medium text-[var(--fg-ink)] transition-opacity hover:opacity-90"
            >
              Roll the night
            </a>
            <a
              href="https://www.instagram.com/prime_warsaw/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center rounded-md border border-[color-mix(in_oklch,var(--fg-chalk)_22%,transparent)] bg-[color-mix(in_oklch,var(--fg-ink)_45%,transparent)] px-4 font-[Karla,sans-serif] text-sm font-medium text-[color-mix(in_oklch,var(--fg-chalk)_88%,var(--fg-cyan))] backdrop-blur-sm transition-colors hover:border-[color-mix(in_oklch,var(--fg-chalk)_40%,transparent)]"
            >
              @prime_warsaw
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
