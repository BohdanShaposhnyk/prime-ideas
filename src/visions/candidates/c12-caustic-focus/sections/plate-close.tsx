import { GlassField } from './glass-field'
import { DiscoverLine } from './type-discover'

export default function PlateClose() {
  return (
    <section
      aria-labelledby="cf-close-title"
      data-scene="close"
      data-plate="close"
      data-beat="close"
      className="relative flex min-h-[140vh] items-center justify-center px-5 py-16 sm:px-8"
    >
      <GlassField plate="close" />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center text-center sm:max-w-xl">
        <p className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--cf-gold)_70%,transparent)] uppercase">
          Plate 05 · Linger
        </p>
        <DiscoverLine
          as="h2"
          id="cf-close-title"
          text="Rest"
          className="mt-4 font-[family-name:var(--cf-display)] text-[clamp(4.8rem,18vw,11rem)] leading-[0.78] text-[var(--cf-bone)] italic"
        />
        <DiscoverLine
          as="p"
          text="Smoke holds the iris."
          className="mt-4 max-w-[18ch] font-[family-name:var(--cf-body)] text-[0.8rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--cf-bone)_70%,transparent)] uppercase"
        />
        <a
          data-copy="cta"
          href="https://www.instagram.com/prime_warsaw/"
          className="mt-10 inline-flex border border-[color-mix(in_srgb,var(--cf-amber)_40%,transparent)] px-5 py-2.5 font-[family-name:var(--cf-body)] text-[0.68rem] tracking-[0.22em] text-[var(--cf-amber)] uppercase transition-colors hover:border-[var(--cf-bone)] hover:text-[var(--cf-bone)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--cf-amber)]"
        >
          Hold a night
        </a>
      </div>
    </section>
  )
}
