import { CropHeadline, ExifLine, VisualPlane } from '../parts'

export default function CropScreen() {
  return (
    <section
      data-crop="screen"
      data-scroll="frame"
      className="relative isolate h-dvh w-screen shrink-0 overflow-hidden bg-[var(--nc-void)] text-[var(--nc-paper)]"
    >
      <VisualPlane variant="screen" />
      <CropHeadline>The frame is the film.</CropHeadline>
      <p
        data-copy="phrase"
        className="absolute bottom-36 left-5 z-30 max-w-[18ch] font-[family-name:var(--nc-display)] text-[clamp(1rem,3vw,1.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--nc-chrome)] sm:left-8"
      >
        Cinema, no letterbox left.
      </p>
      <ExifLine>ISO 400 · 1/48 · f/2.8 · GATE</ExifLine>
    </section>
  )
}
