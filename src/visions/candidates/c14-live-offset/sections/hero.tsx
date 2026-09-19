import { OffsetSplit } from './offset-split'

export default function Hero() {
  return (
    <OffsetSplit
      beat="hero"
      lockup="PRIME"
      lockupId="lo-hero-brand"
      cut="vertical"
      bright="lime"
      belt="PRIME WARSAW · GAMING · CINEMA · KARAOKE · HOOKAH · BAR · KITCHEN"
      dimCopy={
        <>
          <p className="absolute top-8 left-5 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--lo-type)_70%,transparent)] uppercase sm:left-8 lg:left-12">
            Prime Warsaw
          </p>
          <p
            data-type="phrase"
            className="absolute top-[58%] left-5 max-w-[14ch] font-[family-name:var(--lo-body)] text-[clamp(1.05rem,2.8vw,1.45rem)] leading-snug text-[var(--lo-type)] sm:left-8 lg:left-12"
          >
            Dim holds. Bright arrives.
          </p>
          <a
            data-copy="cta"
            href="https://www.instagram.com/prime_warsaw/"
            className="absolute bottom-10 left-5 font-[family-name:var(--lo-body)] text-[0.68rem] tracking-[0.22em] text-[var(--lo-type)] uppercase underline decoration-[color-mix(in_srgb,var(--lo-lime)_55%,transparent)] underline-offset-4 hover:text-[var(--lo-lime)] sm:left-8 lg:left-12"
          >
            Reserve the night
          </a>
        </>
      }
      brightCopy={
        <>
          <p className="absolute top-20 right-5 font-[family-name:var(--lo-mono)] text-[0.62rem] tracking-[0.22em] uppercase sm:right-8">
            01
          </p>
          <p
            data-type="decrypt"
            className="absolute right-5 bottom-10 font-[family-name:var(--lo-display)] text-[clamp(1.35rem,3.6vw,2.4rem)] leading-none font-extrabold tracking-[-0.04em] uppercase sm:right-8"
          >
            Offset
          </p>
        </>
      }
    />
  )
}
