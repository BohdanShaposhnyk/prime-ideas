import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function PlaneDark() {
  return (
    <RakeStage beat="dark" labelledBy="pb-dark-title">
      <RakeField beat="dark" />
      <CopyFrame>
        <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pb-ivory)_45%,transparent)] uppercase">
          Shard
        </p>
        <div>
          <DisplayLine id="pb-dark-title" text="Dark" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[14ch] font-[family-name:var(--pb-display)] text-[clamp(1.45rem,4.6vw,2.6rem)] leading-[1.1] text-[var(--pb-ivory)] italic"
          >
            A single plane.
          </p>
          <p
            data-type="support"
            className="mt-3 font-[family-name:var(--pb-body)] text-[0.7rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pb-ivory)_50%,transparent)] uppercase"
          >
            Hold the crush.
          </p>
        </div>
      </CopyFrame>
    </RakeStage>
  )
}
