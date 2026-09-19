import { CropHeadline, ExifLine, VisualPlane } from '../parts'

export default function CropVoice() {
  return (
    <section
      data-crop="voice"
      data-scroll="frame"
      className="relative isolate h-dvh w-screen shrink-0 overflow-hidden bg-[var(--nc-void)] text-[var(--nc-paper)]"
    >
      <VisualPlane variant="voice" />
      <CropHeadline>Hold the mic.</CropHeadline>
      <p
        data-copy="phrase"
        className="absolute bottom-36 left-5 z-30 max-w-[16ch] font-[family-name:var(--nc-display)] text-[clamp(1rem,3vw,1.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-[var(--nc-lime)] sm:left-8"
      >
        Karaoke, tight crop.
      </p>
      <ExifLine>ISO 1600 · 1/80 · f/1.4 · VOICE</ExifLine>
    </section>
  )
}
