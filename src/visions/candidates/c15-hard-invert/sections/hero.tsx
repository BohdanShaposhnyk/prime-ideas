import {
  FlickerFlash,
  Grain,
  SlamWord,
  TicketEdge,
  TornSticker,
  VisualPlane,
} from '../parts'

export default function Hero() {
  return (
    <section
      data-flyer="hero"
      data-scroll="flyer"
      data-snap
      className="relative isolate min-h-dvh overflow-hidden bg-[var(--hi-pitch)] text-[var(--hi-paper)]"
    >
      {/* swap: inverted rave poster wash */}
      <VisualPlane variant="hero" invert />
      <Grain />
      <FlickerFlash />

      <TornSticker label="Prime Warsaw" className="top-5 left-4 sm:top-7 sm:left-6" />

      <SlamWord word="PRIME" />

      <p
        data-copy="phrase"
        className="absolute bottom-24 left-4 z-30 max-w-[10ch] font-[family-name:var(--hi-display)] text-[clamp(1.8rem,7vw,4.2rem)] leading-[0.9] text-[var(--hi-yellow)] uppercase sm:left-6"
      >
        Own the night.
      </p>

      <a
        data-copy="cta"
        href="https://www.instagram.com/prime_warsaw/"
        className="absolute right-4 bottom-24 z-30 font-[family-name:var(--hi-body)] text-[0.68rem] tracking-[0.2em] text-[var(--hi-paper)] uppercase underline decoration-[var(--hi-cyan)] underline-offset-4 hover:text-[var(--hi-cyan)] sm:right-6"
      >
        Book the floor
      </a>

      <TicketEdge index="00 / Hero" line="No soft hours." />
    </section>
  )
}
