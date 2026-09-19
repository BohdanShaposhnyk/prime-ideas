import { GlassField } from './glass-field'
import { DiscoverLine } from './type-discover'

export default function PlateVoice() {
  return (
    <section
      aria-labelledby="cf-voice-title"
      data-scene="voice"
      data-plate="voice"
      data-beat="voice"
      className="relative flex min-h-[150vh] items-center justify-center px-5 py-16 sm:px-8"
    >
      <GlassField plate="voice" />

      <div className="relative z-10 flex max-w-[22rem] flex-col items-center text-center sm:max-w-xl">
        <p className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--cf-cyan)_70%,transparent)] uppercase">
          Plate 04 · Karaoke
        </p>
        <div className="relative mt-4">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <DiscoverLine
              text="Voice"
              className="translate-x-[0.08em] translate-y-[0.06em] font-[family-name:var(--cf-display)] text-[clamp(4.8rem,18vw,11rem)] leading-[0.78] text-[color-mix(in_srgb,var(--cf-cyan)_35%,transparent)] italic select-none"
            />
          </div>
          <DiscoverLine
            as="h2"
            id="cf-voice-title"
            text="Voice"
            className="relative font-[family-name:var(--cf-display)] text-[clamp(4.8rem,18vw,11rem)] leading-[0.78] text-[var(--cf-bone)] italic"
          />
        </div>
        <DiscoverLine
          as="p"
          text="Echo in the pane."
          className="mt-4 max-w-[16ch] font-[family-name:var(--cf-body)] text-[0.8rem] tracking-[0.16em] text-[color-mix(in_srgb,var(--cf-amber)_70%,transparent)] uppercase"
        />
      </div>
    </section>
  )
}
