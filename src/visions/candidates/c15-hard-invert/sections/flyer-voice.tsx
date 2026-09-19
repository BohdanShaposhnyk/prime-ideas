import {
  FlickerFlash,
  Grain,
  SlamWord,
  TicketEdge,
  TornSticker,
  VisualPlane,
} from '../parts'

export default function FlyerVoice() {
  return (
    <section
      data-flyer="voice"
      data-scroll="flyer"
      data-snap
      data-invert="full"
      className="relative isolate min-h-dvh overflow-hidden bg-[var(--hi-cyan)] text-[var(--hi-pitch)] invert contrast-125"
    >
      {/* swap: karaoke flyer */}
      <VisualPlane variant="voice" />
      <Grain />
      <FlickerFlash />
      <TornSticker label="Private mic" className="top-5 left-1/2 -translate-x-1/2" />
      <SlamWord word="MIC" fill="var(--hi-paper)" />
      <p
        data-copy="line"
        className="absolute bottom-28 left-4 z-30 max-w-[16ch] font-[family-name:var(--hi-body)] text-[0.8rem] tracking-[0.12em] uppercase sm:left-6"
      >
        Rooms with no audience but you.
      </p>
      <TicketEdge index="09 / Voice" line="Karaoke lockout" />
    </section>
  )
}
