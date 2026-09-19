import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function PlanePlay() {
  return (
    <RakeStage beat="play" labelledBy="pb-play-title">
      <RakeField beat="play" />
      <CopyFrame>
        <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pb-play)_80%,transparent)] uppercase">
          Cool fill
        </p>
        <div>
          <DisplayLine id="pb-play-title" text="Play" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[16ch] font-[family-name:var(--pb-display)] text-[clamp(1.45rem,4.6vw,2.6rem)] leading-[1.1] text-[var(--pb-ivory)] italic"
          >
            The arena leans into shadow.
          </p>
          <p
            data-type="support"
            className="mt-3 font-[family-name:var(--pb-body)] text-[0.7rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pb-play)_75%,transparent)] uppercase"
          >
            Steel on the unlit side.
          </p>
        </div>
      </CopyFrame>
    </RakeStage>
  )
}
