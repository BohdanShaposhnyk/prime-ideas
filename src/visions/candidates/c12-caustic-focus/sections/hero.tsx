import { GlassField } from './glass-field'
import { DiscoverLine } from './type-discover'

/**
 * Hero — type as the subject on the glass, centered on the optical axis.
 * Focal rack / glyph discovery live in motion/.
 */
export default function Hero() {
  return (
    <section
      aria-labelledby="cf-hero-brand"
      data-scene="hero"
      data-plate="hero"
      data-beat="hero"
      className="relative flex min-h-dvh items-center justify-center px-5 py-16 sm:px-8"
    >
      <GlassField plate="hero" />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center text-center sm:max-w-xl">
        <h1
          id="cf-hero-brand"
          data-copy="brand"
          className="font-[family-name:var(--cf-body)] text-[0.62rem] tracking-[0.38em] text-[color-mix(in_srgb,var(--cf-cyan)_75%,transparent)] uppercase"
        >
          Prime
        </h1>
        <DiscoverLine
          as="p"
          text="Rack the night."
          className="mt-6 font-[family-name:var(--cf-display)] text-[clamp(3.2rem,12vw,7.5rem)] leading-[0.88] text-[var(--cf-bone)] italic"
        />
        <DiscoverLine
          as="p"
          text="Prime in focus."
          className="mt-5 font-[family-name:var(--cf-body)] text-[0.78rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--cf-amber)_80%,transparent)] uppercase"
        />
        <a
          data-copy="cta"
          href="https://www.instagram.com/prime_warsaw/"
          className="mt-10 inline-flex border border-[color-mix(in_srgb,var(--cf-cyan)_40%,transparent)] px-5 py-2.5 font-[family-name:var(--cf-body)] text-[0.68rem] tracking-[0.22em] text-[var(--cf-bone)] uppercase transition-colors hover:border-[var(--cf-amber)] hover:text-[var(--cf-amber)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cf-cyan)]"
        >
          Open the iris
        </a>
      </div>
    </section>
  )
}
