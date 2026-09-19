import { CropHeadline, ExifLine, VisualPlane } from '../parts'

export default function CropClose() {
  return (
    <section
      data-crop="close"
      data-scroll="frame"
      className="relative isolate h-dvh w-screen shrink-0 overflow-hidden bg-[var(--nc-void)] text-[var(--nc-paper)]"
    >
      <VisualPlane variant="close" />
      <CropHeadline>Finder closes.</CropHeadline>
      <p
        data-copy="phrase"
        className="absolute bottom-36 left-5 z-30 max-w-[16ch] font-[family-name:var(--nc-display)] text-[clamp(1rem,3vw,1.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--nc-tungsten)] sm:left-8"
      >
        Lodge hush. Ember holds.
      </p>
      <a
        data-copy="cta"
        href="https://www.instagram.com/prime_warsaw/"
        className="absolute right-5 bottom-36 z-30 font-[family-name:var(--nc-body)] text-[0.68rem] tracking-[0.22em] text-[var(--nc-paper)] uppercase underline decoration-[var(--nc-tungsten)] underline-offset-4 hover:text-[var(--nc-tungsten)] sm:right-8"
      >
        Keep the night
      </a>
      <ExifLine>ISO 200 · 1/15 · f/1.2 · LODGE</ExifLine>
    </section>
  )
}
