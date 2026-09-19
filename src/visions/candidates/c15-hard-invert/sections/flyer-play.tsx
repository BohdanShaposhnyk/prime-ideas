import {
  FlickerFlash,
  Grain,
  SlamWord,
  TicketEdge,
  TornSticker,
  VisualPlane,
} from '../parts'

export default function FlyerPlay() {
  return (
    <section
      data-flyer="play"
      data-scroll="flyer"
      data-snap
      data-invert="full"
      className="relative isolate min-h-dvh overflow-hidden bg-[var(--hi-pitch)] text-[var(--hi-paper)] invert contrast-125"
    >
      {/* swap: arena flyer */}
      <VisualPlane variant="play" />
      <Grain />
      <FlickerFlash />
      <TornSticker label="Cyber arena" className="top-6 right-5 sm:right-8" />
      <SlamWord word="PLAY" fill="var(--hi-yellow)" />
      <p
        data-copy="line"
        className="absolute bottom-28 left-4 z-30 max-w-[14ch] font-[family-name:var(--hi-body)] text-[0.8rem] tracking-[0.12em] text-[var(--hi-paper)] uppercase sm:left-6"
      >
        Forty PCs. No polite hours.
      </p>
      <TicketEdge index="07 / Play" line="Prime Warsaw · Gaming" />
    </section>
  )
}
