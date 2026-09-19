import { OffsetSplit } from './offset-split'

export default function StripHeat() {
  return (
    <OffsetSplit
      beat="heat"
      lockup="HEAT"
      lockupId="lo-heat-brand"
      cut="horizontal"
      bright="coral"
      belt="PLATE · COAL · STEAM · NIGHT MENU · HOOKAH · KITCHEN · LATE FIRE"
      dimCopy={
        <>
          <p className="absolute top-8 left-5 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--lo-type)_70%,transparent)] uppercase sm:left-8 lg:left-12">
            Kitchen / smoke
          </p>
          <p
            data-type="phrase"
            className="absolute bottom-[36%] left-5 max-w-[18ch] font-[family-name:var(--lo-body)] text-[clamp(1rem,2.6vw,1.35rem)] leading-snug text-[var(--lo-type)] sm:left-8 lg:left-12"
          >
            Kitchen open late. Smoke in the grain.
          </p>
        </>
      }
      brightCopy={
        <>
          <p className="absolute top-[72%] right-5 font-[family-name:var(--lo-mono)] text-[0.62rem] tracking-[0.22em] uppercase sm:right-8">
            02
          </p>
          <p
            data-type="decrypt"
            className="absolute right-5 bottom-8 font-[family-name:var(--lo-display)] text-[clamp(1.35rem,3.6vw,2.4rem)] leading-none font-extrabold tracking-[-0.04em] uppercase sm:right-8"
          >
            Hookah
          </p>
        </>
      }
    />
  )
}
