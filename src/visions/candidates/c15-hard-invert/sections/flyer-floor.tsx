import {
  FlickerFlash,
  Grain,
  SlamWord,
  TicketEdge,
  TornSticker,
  VisualPlane,
} from '../parts'

export default function FlyerFloor() {
  return (
    <section
      data-flyer="floor"
      data-scroll="flyer"
      data-snap
      data-invert="full"
      className="relative isolate min-h-dvh overflow-hidden bg-[var(--hi-pitch)] text-[var(--hi-paper)] invert contrast-125"
    >
      {/* swap: kitchen / close flyer */}
      <VisualPlane variant="floor" />
      <Grain />
      <FlickerFlash />
      <TornSticker label="Kitchen still open" className="top-6 left-4" />
      <SlamWord word="LATE" fill="var(--hi-yellow)" />
      <p
        data-copy="line"
        className="absolute bottom-32 left-4 z-30 max-w-[16ch] font-[family-name:var(--hi-display)] text-[clamp(1.4rem,5vw,2.6rem)] leading-[0.9] uppercase sm:left-6"
      >
        Last invert. Still open.
      </p>
      <a
        data-copy="cta"
        href="https://www.instagram.com/prime_warsaw/"
        className="absolute right-4 bottom-32 z-30 font-[family-name:var(--hi-body)] text-[0.68rem] tracking-[0.2em] uppercase underline decoration-[var(--hi-magenta)] underline-offset-4 sm:right-6"
      >
        @prime_warsaw
      </a>
      <TicketEdge index="11 / Floor" line="Eat. Linger. Repeat." />
    </section>
  )
}
