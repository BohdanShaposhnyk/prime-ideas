import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function PlaneClose() {
  return (
    <RakeStage beat="close" labelledBy="pb-close-title">
      <RakeField beat="close" />
      <CopyFrame>
        <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.32em] text-[color-mix(in_srgb,var(--pb-ivory)_70%,transparent)] uppercase">
          Afterglow
        </p>
        <div>
          <DisplayLine id="pb-close-title" text="Stay" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[16ch] font-[family-name:var(--pb-display)] text-[clamp(1.45rem,4.6vw,2.6rem)] leading-[1.1] text-[var(--pb-ivory)] italic"
          >
            Linger in the wash.
          </p>
          <p
            data-type="support"
            className="mt-3 font-[family-name:var(--pb-body)] text-[0.7rem] tracking-[0.2em] text-[color-mix(in_srgb,var(--pb-amber)_75%,transparent)] uppercase"
          >
            Warsaw, still lit.
          </p>
          <a
            data-copy="cta"
            href="https://www.instagram.com/prime_warsaw/"
            className="mt-8 inline-flex border-b border-[color-mix(in_srgb,var(--pb-ivory)_45%,transparent)] pb-1 font-[family-name:var(--pb-body)] text-[0.68rem] tracking-[0.22em] text-[var(--pb-ivory)] uppercase transition-colors hover:border-[var(--pb-amber)] hover:text-[var(--pb-amber)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--pb-amber)]"
          >
            Reserve the night
          </a>
        </div>
      </CopyFrame>
    </RakeStage>
  )
}
