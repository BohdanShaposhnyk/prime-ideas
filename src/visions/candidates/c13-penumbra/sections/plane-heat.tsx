import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function PlaneHeat() {
  return (
    <RakeStage beat="heat" labelledBy="pb-heat-title">
      <RakeField beat="heat" />
      <CopyFrame>
        <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pb-heat)_85%,transparent)] uppercase">
          Warm mass
        </p>
        <div>
          <DisplayLine id="pb-heat-title" text="Heat" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[16ch] font-[family-name:var(--pb-display)] text-[clamp(1.45rem,4.6vw,2.6rem)] leading-[1.1] text-[var(--pb-ivory)] italic"
          >
            Kitchen holds the tungsten.
          </p>
          <p
            data-type="support"
            className="mt-3 font-[family-name:var(--pb-body)] text-[0.7rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pb-amber)_70%,transparent)] uppercase"
          >
            Bar at the edge of the rake.
          </p>
        </div>
      </CopyFrame>
    </RakeStage>
  )
}
