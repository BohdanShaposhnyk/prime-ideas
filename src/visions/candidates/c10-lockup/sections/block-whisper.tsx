import { SplitChars } from './type-split'

/**
 * Whisper — thin horizontal blade; italic serif, almost empty.
 */
export default function BlockWhisper() {
  return (
    <section
      aria-labelledby="lk-whisper-title"
      data-lockup="whisper"
      data-spine-id="02"
      className="relative h-[190vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 flex min-h-dvh items-center overflow-hidden px-3 py-4 sm:px-5"
      >
        <article
          data-block
          data-latch="right"
          className="relative ml-auto w-[min(100%,42rem)] overflow-hidden sm:w-[min(86%,48rem)]"
          style={{ minHeight: 'min(38dvh, 17.5rem)' }}
        >
          <div
            data-placeholder="visual"
            className="absolute inset-0"
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, color-mix(in srgb, var(--lk-plate) 8%, var(--lk-stock)) 0%, var(--lk-stock) 40%, #F4EFE4 100%)
                `,
              }}
            />
            <div className="absolute inset-y-5 left-0 w-[3px] bg-[var(--lk-plate)]" />
            <div className="absolute top-1/2 right-6 left-8 h-px -translate-y-1/2 bg-[color-mix(in_srgb,var(--lk-plate)_55%,transparent)]" />
          </div>

          <div className="relative z-10 flex min-h-[min(38dvh,17.5rem)] flex-col justify-between px-7 py-6 sm:px-10">
            <p
              data-type="meta"
              className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] text-[var(--lk-plate)] uppercase"
            >
              02 / WHISPER
            </p>
            <SplitChars
              as="h2"
              id="lk-whisper-title"
              text="a picture, then dark"
              kind="slide-chars"
              className="max-w-[18ch] overflow-hidden font-[family-name:var(--lk-serif)] text-[clamp(1.55rem,4.4vw,2.85rem)] leading-[1.15] text-[var(--lk-ink)] italic"
            />
            <p
              data-type="track-wide"
              className="font-[family-name:var(--lk-condensed)] text-[0.85rem] tracking-[0.22em] text-[color-mix(in_srgb,var(--lk-ink)_50%,transparent)] uppercase"
            >
              hush · gate
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
