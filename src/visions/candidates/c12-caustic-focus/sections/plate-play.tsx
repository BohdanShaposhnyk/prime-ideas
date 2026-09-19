import { GlassField } from './glass-field'
import { DiscoverLine } from './type-discover'

export default function PlatePlay() {
  return (
    <section
      aria-labelledby="cf-play-title"
      data-scene="play"
      data-plate="play"
      data-beat="play"
      className="relative flex min-h-[150vh] items-center justify-center px-5 py-16 sm:px-8"
    >
      <GlassField plate="play" />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center text-center sm:max-w-xl">
        <p className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--cf-cyan)_80%,transparent)] uppercase">
          Plate 02 · Arena
        </p>
        <DiscoverLine
          as="h2"
          id="cf-play-title"
          text="Play"
          className="mt-4 font-[family-name:var(--cf-display)] text-[clamp(4.8rem,18vw,11rem)] leading-[0.78] text-[var(--cf-bone)] italic"
        />
        <DiscoverLine
          as="p"
          text="Neon collapses to sharp."
          className="mt-4 max-w-[20ch] font-[family-name:var(--cf-body)] text-[0.8rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--cf-cyan)_75%,transparent)] uppercase"
        />
      </div>
    </section>
  )
}
