import {
  FlickerFlash,
  Grain,
  SlamWord,
  TicketEdge,
  TornSticker,
  VisualPlane,
} from '../parts'

export default function FlyerScreen() {
  return (
    <section
      data-flyer="screen"
      data-scroll="flyer"
      data-snap
      className="relative isolate min-h-dvh overflow-hidden bg-[var(--hi-yellow)] text-[var(--hi-pitch)]"
    >
      {/* swap: cinema flyer */}
      <VisualPlane variant="screen" invert />
      <Grain />
      <FlickerFlash />
      <TornSticker label="Two halls" className="right-4 bottom-36 sm:right-8" />
      <SlamWord word="REEL" fill="var(--hi-pitch)" />
      <p
        data-copy="line"
        className="absolute top-[58%] left-4 z-30 max-w-[12ch] font-[family-name:var(--hi-body)] text-[0.8rem] tracking-[0.12em] uppercase sm:left-6"
      >
        Hard cut. No trailers for the night.
      </p>
      <TicketEdge index="10 / Screen" line="Cinema · Prime" />
    </section>
  )
}
