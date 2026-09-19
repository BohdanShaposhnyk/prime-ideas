import { GlassField } from './glass-field'
import { DiscoverLine } from './type-discover'

export default function PlateScreen() {
  return (
    <section
      aria-labelledby="cf-screen-title"
      data-scene="screen"
      data-plate="screen"
      data-beat="screen"
      className="relative flex min-h-[150vh] items-center justify-center px-5 py-16 sm:px-8"
    >
      <GlassField plate="screen" />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center text-center sm:max-w-xl">
        <p className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--cf-gold)_65%,transparent)] uppercase">
          Plate 03 · Cinema
        </p>
        <DiscoverLine
          as="h2"
          id="cf-screen-title"
          text="Frame"
          className="mt-4 font-[family-name:var(--cf-display)] text-[clamp(4.4rem,16vw,10rem)] leading-[0.78] text-[var(--cf-bone)] italic"
        />
        <DiscoverLine
          as="p"
          text="The gate holds the dark."
          className="mt-4 max-w-[20ch] font-[family-name:var(--cf-body)] text-[0.8rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--cf-bone)_68%,transparent)] uppercase"
        />
      </div>
    </section>
  )
}
