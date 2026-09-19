/**
 * Sticky optical axis — cinema iris, glass rim, focal tick.
 * Rack / blur live in motion/.
 */
export default function LensAxis() {
  return (
    <div
      data-scroll="optical-axis"
      data-axis="optical"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      <div
        data-plane="vignette"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 50% 50%,
              transparent 28%,
              color-mix(in srgb, #08070C 42%, transparent) 52%,
              color-mix(in srgb, #08070C 88%, transparent) 74%,
              #08070C 92%
            )
          `,
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          data-plane="glass-rim"
          className="relative h-[min(92vw,88dvh)] w-[min(92vw,88dvh)] max-w-[52rem] rounded-full"
          style={{
            boxShadow: `
              inset 0 0 48px color-mix(in srgb, #E8C9A0 18%, transparent),
              inset 0 0 2px color-mix(in srgb, #F7F1E8 35%, transparent),
              0 0 80px color-mix(in srgb, #7EC8C4 12%, transparent)
            `,
            border: '1px solid color-mix(in srgb, #7EC8C4 38%, transparent)',
          }}
        >
          <div
            className="absolute inset-[7%] rounded-full"
            style={{
              border: '1px solid color-mix(in srgb, #E8C9A0 22%, transparent)',
            }}
          />
          <span
            data-axis="tick"
            className="absolute top-[6%] left-1/2 h-4 w-px -translate-x-1/2 bg-[color-mix(in_srgb,#F7F1E8_45%,transparent)]"
          />
          <span
            data-axis="tick"
            className="absolute bottom-[6%] left-1/2 h-4 w-px -translate-x-1/2 bg-[color-mix(in_srgb,#F7F1E8_45%,transparent)]"
          />
          <span
            data-axis="tick"
            className="absolute top-1/2 left-[6%] h-px w-4 -translate-y-1/2 bg-[color-mix(in_srgb,#F7F1E8_45%,transparent)]"
          />
          <span
            data-axis="tick"
            className="absolute top-1/2 right-[6%] h-px w-4 -translate-y-1/2 bg-[color-mix(in_srgb,#F7F1E8_45%,transparent)]"
          />
        </div>
      </div>

      <div
        data-axis="focal"
        className="absolute top-1/2 right-[8%] left-[8%] h-px -translate-y-1/2 sm:right-[14%] sm:left-[14%]"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              color-mix(in srgb, #7EC8C4 0%, transparent) 12%,
              color-mix(in srgb, #E8C9A0 55%, transparent) 50%,
              color-mix(in srgb, #7EC8C4 0%, transparent) 88%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        data-plane="specular"
        className="absolute top-[18%] left-[22%] h-[18vmin] w-[32vmin] rounded-[100%] opacity-40 mix-blend-screen"
        style={{
          background:
            'radial-gradient(ellipse at 40% 40%, color-mix(in srgb, #F7F1E8 28%, transparent), transparent 68%)',
        }}
      />

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
        <p
          data-axis="readout"
          className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.32em] text-[color-mix(in_srgb,#E8C9A0_80%,transparent)] uppercase"
        >
          Focus · Open
        </p>
        <p
          data-axis="meta"
          className="font-[family-name:var(--cf-body)] text-[0.58rem] tracking-[0.28em] text-[color-mix(in_srgb,#7EC8C4_70%,transparent)] uppercase"
        >
          f/1.4 · 50mm · Warsaw
        </p>
      </div>
    </div>
  )
}
