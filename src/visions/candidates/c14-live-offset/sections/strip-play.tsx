import { OffsetSplit } from './offset-split'

export default function StripPlay() {
  return (
    <OffsetSplit
      beat="play"
      lockup="PLAY"
      lockupId="lo-play-brand"
      cut="stagger"
      bright="lime"
      belt="QUEUE · HEADSHOT · PING · DUO · FIVE-STACK · NO CASUAL LOBBY"
      dimCopy={
        <>
          <p className="absolute top-8 left-5 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--lo-type)_70%,transparent)] uppercase sm:left-8 lg:left-12">
            Cyber arena
          </p>
          <p
            data-type="phrase"
            className="absolute top-[62%] left-5 max-w-[16ch] font-[family-name:var(--lo-body)] text-[clamp(1rem,2.6vw,1.35rem)] leading-snug text-[var(--lo-type)] sm:left-8 lg:left-12"
          >
            Forty-plus PCs. No casual lobby.
          </p>
        </>
      }
      brightCopy={
        <>
          <p className="absolute top-20 right-5 font-[family-name:var(--lo-mono)] text-[0.62rem] tracking-[0.22em] uppercase sm:right-8">
            03
          </p>
          <p
            data-type="decrypt"
            className="absolute right-5 bottom-10 font-[family-name:var(--lo-display)] text-[clamp(1.35rem,3.6vw,2.4rem)] leading-none font-extrabold tracking-[-0.04em] uppercase sm:right-8"
          >
            Arena
          </p>
        </>
      }
    />
  )
}
