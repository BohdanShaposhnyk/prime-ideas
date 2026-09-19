import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function PlaneHaze() {
  return (
    <RakeStage beat="haze" labelledBy="pb-haze-title">
      <RakeField beat="haze" />
      <CopyFrame>
        <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pb-amber)_75%,transparent)] uppercase">
          Bloom
        </p>
        <div>
          <DisplayLine id="pb-haze-title" text="Haze" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[16ch] font-[family-name:var(--pb-display)] text-[clamp(1.45rem,4.6vw,2.6rem)] leading-[1.1] text-[var(--pb-ivory)] italic"
          >
            Breath in the dark.
          </p>
          <p
            data-type="support"
            className="mt-3 font-[family-name:var(--pb-body)] text-[0.7rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pb-amber)_70%,transparent)] uppercase"
          >
            Volume without a source.
          </p>
        </div>
      </CopyFrame>
    </RakeStage>
  )
}
