import { ExifLine, VisualPlane } from '../parts'

export default function Hero() {
  return (
    <section
      data-crop="hero"
      data-scroll="frame"
      className="relative isolate h-dvh w-screen shrink-0 overflow-hidden bg-[var(--nc-void)] text-[var(--nc-paper)]"
    >
      <VisualPlane variant="hero" />

      <h1
        data-copy="headline"
        className="absolute top-[16%] left-5 z-30 max-w-[9ch] font-[family-name:var(--nc-display)] text-[clamp(2.8rem,12vw,7.5rem)] leading-[0.8] font-extrabold tracking-[-0.07em] text-[var(--nc-paper)] uppercase sm:left-8"
      >
        Crop the night.
      </h1>

      <p
        data-copy="phrase"
        className="absolute bottom-36 left-5 z-30 max-w-[16ch] font-[family-name:var(--nc-display)] text-[clamp(1.05rem,3vw,1.65rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--nc-magenta)] sm:left-8"
      >
        Stay in the finder.
      </p>

      <a
        data-copy="cta"
        href="https://www.instagram.com/prime_warsaw/"
        className="absolute right-5 bottom-36 z-30 font-[family-name:var(--nc-body)] text-[0.68rem] tracking-[0.22em] text-[var(--nc-paper)] uppercase underline decoration-[var(--nc-lime)] underline-offset-4 hover:text-[var(--nc-lime)] sm:right-8"
      >
        Lock the crop
      </a>

      <ExifLine>ISO 1600 · 1/40 · f/1.4 · STREET</ExifLine>
    </section>
  )
}
