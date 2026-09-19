import { OffsetSplit } from './offset-split'

export default function StripVoice() {
  return (
    <OffsetSplit
      beat="voice"
      lockup="SING"
      lockupId="lo-voice-brand"
      cut="diagonal"
      bright="lime"
      belt="TAKE THE MIC · ONE MORE CHORUS · PRIVATE ROOM · KARAOKE"
      dimCopy={
        <>
          <p className="absolute top-8 left-5 font-[family-name:var(--lo-body)] text-[0.62rem] tracking-[0.28em] text-[color-mix(in_srgb,var(--lo-type)_70%,transparent)] uppercase sm:left-8 lg:left-12">
            Private rooms
          </p>
          <p
            data-type="phrase"
            className="absolute top-[62%] left-5 max-w-[16ch] font-[family-name:var(--lo-body)] text-[clamp(1rem,2.6vw,1.35rem)] leading-snug text-[var(--lo-type)] sm:left-8 lg:left-12"
          >
            The chorus is the night.
          </p>
        </>
      }
      brightCopy={
        <>
          <p className="absolute top-20 right-5 font-[family-name:var(--lo-mono)] text-[0.62rem] tracking-[0.22em] uppercase sm:right-8">
            04
          </p>
          <p
            data-type="decrypt"
            className="absolute right-5 bottom-10 max-w-[8ch] text-right font-[family-name:var(--lo-display)] text-[clamp(1.2rem,3.2vw,2.1rem)] leading-none font-extrabold tracking-[-0.04em] uppercase sm:right-8"
          >
            Karaoke
          </p>
        </>
      }
    />
  )
}
