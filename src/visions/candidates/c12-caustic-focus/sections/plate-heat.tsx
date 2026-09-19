import { GlassField } from './glass-field'
import { DiscoverLine } from './type-discover'

export default function PlateHeat() {
  return (
    <section
      aria-labelledby="cf-heat-title"
      data-scene="heat"
      data-plate="heat"
      data-beat="heat"
      className="relative flex min-h-[150vh] items-center justify-center px-5 py-16 sm:px-8"
    >
      <GlassField plate="heat" />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center text-center sm:max-w-xl">
        <p className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--cf-heat)_80%,transparent)] uppercase">
          Plate 01 · Kitchen
        </p>
        <DiscoverLine
          as="h2"
          id="cf-heat-title"
          text="Heat"
          className="mt-4 font-[family-name:var(--cf-display)] text-[clamp(4.8rem,18vw,11rem)] leading-[0.78] text-[var(--cf-amber)] italic"
        />
        <DiscoverLine
          as="p"
          text="Tungsten crawls the pane."
          className="mt-4 max-w-[18ch] font-[family-name:var(--cf-body)] text-[0.8rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--cf-bone)_72%,transparent)] uppercase"
        />
      </div>
    </section>
  )
}
