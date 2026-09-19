import { CropHeadline, ExifLine, VisualPlane } from '../parts'

export default function CropPlay() {
  return (
    <section
      data-crop="play"
      data-scroll="frame"
      className="relative isolate h-dvh w-screen shrink-0 overflow-hidden bg-[var(--nc-void)] text-[var(--nc-paper)]"
    >
      <VisualPlane variant="play" />
      <CropHeadline accent>Screens smear.</CropHeadline>
      <p
        data-copy="phrase"
        className="absolute bottom-36 left-5 z-30 max-w-[16ch] font-[family-name:var(--nc-display)] text-[clamp(1rem,3vw,1.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--nc-magenta)] sm:left-8"
      >
        Then the arena locks.
      </p>
      <ExifLine>ISO 3200 · 1/125 · f/2.0 · ARENA</ExifLine>
    </section>
  )
}
