const STATIONS = Array.from({ length: 24 }, (_, i) =>
  String(i + 1).padStart(2, '0'),
)

/**
 * Count — square mono block; numbers as the graphic.
 */
export default function BlockCount() {
  return (
    <section
      aria-labelledby="lk-count-title"
      data-lockup="count"
      data-spine-id="04"
      className="relative h-[190vh]"
    >
      <div
        data-scroll="pin"
        className="sticky top-0 flex min-h-dvh items-center justify-end overflow-hidden px-3 py-4 sm:px-6"
      >
        <article
          data-block
          data-latch="right"
          className="relative aspect-square w-[min(100%,34rem,72dvh)] overflow-hidden"
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
                  radial-gradient(circle at 78% 18%, color-mix(in srgb, #ffffff 18%, transparent) 0%, transparent 42%),
                  linear-gradient(160deg, #3A5CFF 0%, var(--lk-plate) 55%, #1633C9 100%)
                `,
              }}
            />
            <div className="absolute inset-0 grid grid-cols-6 gap-px p-4 opacity-[0.18]">
              {STATIONS.map((n) => (
                <span
                  key={n}
                  className="font-[family-name:var(--lk-mono)] text-[0.55rem] tabular-nums text-[var(--lk-stock)]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between p-6 text-[var(--lk-stock)] sm:p-8">
            <p
              data-type="meta"
              className="font-[family-name:var(--lk-mono)] text-[0.58rem] tracking-[0.2em] uppercase"
            >
              04 / COUNT
            </p>
            <div>
              <h2
                id="lk-count-title"
                data-type="count"
                data-count-to="24"
                className="font-[family-name:var(--lk-mono)] text-[clamp(5.5rem,22vw,12rem)] leading-none font-medium tracking-[-0.08em] tabular-nums"
              >
                24
              </h2>
              <p
                data-type="clip-up"
                className="mt-1 overflow-hidden font-[family-name:var(--lk-display)] text-[clamp(1.1rem,3vw,1.6rem)] font-bold tracking-[-0.03em] uppercase"
              >
                Stations
              </p>
            </div>
            <p
              data-type="track-wide"
              className="font-[family-name:var(--lk-condensed)] text-[0.9rem] tracking-[0.2em] uppercase"
            >
              LAN · live
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
