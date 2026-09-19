import { OffsetSplit } from './offset-split'

export default function StripScreen() {
  return (
    <OffsetSplit
      beat="screen"
      lockup="FILM"
      lockupId="lo-screen-brand"
      lockupClassName="absolute top-[38%] left-[12vw] max-w-[92vw] overflow-hidden font-[family-name:var(--lo-display)] text-[clamp(5.4rem,22vw,18rem)] leading-[0.78] font-extrabold tracking-[-0.07em] uppercase sm:left-[10vw]"
      cut="letterbox"
      bright="paper"
      belt="PRIVATE SCREENING · REEL · DARK · THE CITY STAYS OUTSIDE"
      dimCopy={
        <>
          <p className="absolute top-8 left-5 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--lo-type)_70%,transparent)] uppercase sm:left-8 lg:left-12">
            Private screen
          </p>
          <p
            data-type="phrase"
            className="absolute bottom-10 left-5 max-w-[18ch] font-[family-name:var(--lo-body)] text-[clamp(1rem,2.6vw,1.35rem)] leading-snug text-[var(--lo-type)] sm:left-8 lg:left-12"
          >
            A private screen. The city stays outside.
          </p>
        </>
      }
      brightCopy={
        <>
          <p className="absolute top-[49%] right-5 font-[family-name:var(--lo-mono)] text-[0.62rem] tracking-[0.22em] uppercase sm:right-8">
            05
          </p>
          <p
            data-type="decrypt"
            className="absolute top-[58%] right-5 font-[family-name:var(--lo-display)] text-[clamp(1.35rem,3.6vw,2.4rem)] leading-none font-extrabold tracking-[-0.04em] uppercase sm:right-8"
          >
            Cinema
          </p>
        </>
      }
    />
  )
}
