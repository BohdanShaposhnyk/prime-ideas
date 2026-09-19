import { CopyFrame, DisplayLine, RakeField, RakeStage } from './rake-field'

export default function Hero() {
  return (
    <RakeStage beat="hero" labelledBy="pb-hero-brand">
      <RakeField beat="hero" />
      <CopyFrame>
        <div className="flex items-start justify-between gap-6">
          <p className="font-[family-name:var(--pb-body)] text-[0.62rem] tracking-[0.34em] text-[color-mix(in_srgb,var(--pb-amber)_80%,transparent)] uppercase">
            Prime Warsaw
          </p>
          <p
            aria-hidden
            className="hidden font-[family-name:var(--pb-body)] text-[0.58rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--pb-ivory)_40%,transparent)] uppercase [writing-mode:vertical-rl] sm:block"
          >
            Key light
          </p>
        </div>

        <div className="max-w-full">
          <DisplayLine as="h1" id="pb-hero-brand" text="Prime" />
          <p
            data-type="phrase"
            className="mt-6 max-w-[14ch] font-[family-name:var(--pb-display)] text-[clamp(1.6rem,5.4vw,3.2rem)] leading-[1.05] text-[var(--pb-ivory)] italic"
          >
            Found by light.
          </p>
          <p
            data-type="support"
            className="mt-4 font-[family-name:var(--pb-body)] text-[0.72rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--pb-amber)_75%,transparent)] uppercase"
          >
            Stay in the band.
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
