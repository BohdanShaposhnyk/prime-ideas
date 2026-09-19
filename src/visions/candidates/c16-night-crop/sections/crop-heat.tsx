import { CropHeadline, ExifLine, VisualPlane } from '../parts'

export default function CropHeat() {
  return (
    <section
      data-crop="heat"
      data-scroll="frame"
      className="relative isolate h-dvh w-screen shrink-0 overflow-hidden bg-[var(--nc-void)] text-[var(--nc-paper)]"
    >
      <VisualPlane variant="heat" />
      <CropHeadline>Heat in the glass.</CropHeadline>
      <p
        data-copy="phrase"
        className="absolute bottom-36 left-5 z-30 max-w-[18ch] font-[family-name:var(--nc-display)] text-[clamp(1rem,3vw,1.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--nc-tungsten)] sm:left-8"
      >
        Bar and kitchen, still smoking.
      </p>
      <ExifLine>ISO 800 · 1/60 · f/1.8 · TUNGSTEN</ExifLine>
    </section>
  )
}
