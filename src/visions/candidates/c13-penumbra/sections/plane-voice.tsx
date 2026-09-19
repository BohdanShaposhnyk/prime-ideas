import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function PlaneVoice() {
  return (
    <RakeStage beat="voice" labelledBy="pb-voice-title">
      <RakeField beat="voice" />
      <CopyFrame>
        <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pb-voice)_80%,transparent)] uppercase">
          Highlight
        </p>
        <div>
          <DisplayLine id="pb-voice-title" text="Voice" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[14ch] font-[family-name:var(--pb-display)] text-[clamp(1.45rem,4.6vw,2.6rem)] leading-[1.1] text-[var(--pb-ivory)] italic"
          >
            One note, held.
          </p>
          <p
            data-type="support"
            className="mt-3 font-[family-name:var(--pb-body)] text-[0.7rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pb-voice)_70%,transparent)] uppercase"
          >
            A rose cone of light.
          </p>
        </div>
      </CopyFrame>
    </RakeStage>
  )
}
