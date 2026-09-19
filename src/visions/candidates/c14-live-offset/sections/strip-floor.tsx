import { OffsetSplit } from './offset-split'

export default function StripFloor() {
  return (
    <OffsetSplit
      beat="floor"
      lockup="STAY"
      lockupId="lo-floor-brand"
      cut="heal"
      bright="lime"
      belt="LAST CALL · SIDE FLOOR · LINGER · THE BAR DOES NOT CLOSE"
      beltB="PRIME WARSAW · STAY THE NIGHT · DIM HOLDS · BRIGHT ARRIVES"
      dimCopy={
        <>
          <p className="absolute top-8 left-5 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--lo-type)_70%,transparent)] uppercase sm:left-8 lg:left-12">
            Bar / close
          </p>
          <p
            data-type="phrase"
            className="absolute top-[58%] left-5 max-w-[16ch] font-[family-name:var(--lo-body)] text-[clamp(1rem,2.6vw,1.35rem)] leading-snug text-[var(--lo-type)] sm:left-8 lg:left-12"
          >
            The cut closes. The bar does not.
          </p>
          <a
            data-copy="cta"
            href="https://www.instagram.com/prime_warsaw/"
            className="absolute bottom-10 left-5 font-[family-name:var(--lo-body)] text-[0.68rem] tracking-[0.22em] text-[var(--lo-type)] uppercase underline decoration-[color-mix(in_srgb,var(--lo-lime)_55%,transparent)] underline-offset-4 hover:text-[var(--lo-lime)] sm:left-8 lg:left-12"
          >
            Stay the night
          </a>
        </>
      }
      brightCopy={
        <p
          data-type="decrypt"
          className="absolute top-1/2 right-2 -translate-y-1/2 font-[family-name:var(--lo-display)] text-[clamp(1.05rem,2.4vw,1.6rem)] leading-none font-extrabold tracking-[0.18em] uppercase [writing-mode:vertical-rl]"
        >
          Bar
        </p>
      }
    />
  )
}
