import {
  FlickerFlash,
  Grain,
  SlamWord,
  TicketEdge,
  TornSticker,
  VisualPlane,
} from '../parts'

export default function FlyerHeat() {
  return (
    <section
      data-flyer="heat"
      data-scroll="flyer"
      data-snap
      className="relative isolate min-h-dvh overflow-hidden bg-[var(--hi-magenta)] text-[var(--hi-pitch)]"
    >
      {/* swap: hookah / bar flyer */}
      <VisualPlane variant="heat" invert />
      <Grain />
      <FlickerFlash />
      <TornSticker label="Smoke + bar" className="top-8 left-6" />
      <SlamWord word="HEAT" fill="var(--hi-paper)" />
      <p
        data-copy="line"
        className="absolute bottom-28 right-4 z-30 max-w-[14ch] text-right font-[family-name:var(--hi-body)] text-[0.8rem] tracking-[0.12em] text-[var(--hi-yellow)] uppercase sm:right-6"
      >
        Bass in the coals.
      </p>
      <TicketEdge index="08 / Heat" line="Hookah · Bar" />
    </section>
  )
}
