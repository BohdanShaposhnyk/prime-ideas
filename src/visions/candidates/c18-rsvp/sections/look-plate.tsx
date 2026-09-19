import { LOOKS, type Look } from './looks'

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`

const IG = 'https://www.instagram.com/prime_warsaw/'

type LookPlateProps = {
  look: Look
  headingId: string
  /** Hero uses h1; rooms use h2. */
  as?: 'h1' | 'h2'
}

export default function LookPlate({ look, headingId, as: Tag = 'h2' }: LookPlateProps) {
  const light = look.tone === 'light'

  return (
    <section
      aria-labelledby={headingId}
      data-stage={look.id}
      data-tone={look.tone}
      className="relative h-[180vh]"
    >
      <article
        data-plate
        data-look={look.id}
        className="sticky top-0 flex h-dvh flex-col overflow-hidden"
        style={{
          color: look.ink,
          background: look.field,
          zIndex: LOOKS.findIndex((item) => item.id === look.id) + 1,
        }}
      >
        <div
          data-placeholder="visual"
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div data-silk className="absolute inset-0" style={{ background: look.wash }} />
          <div
            className="absolute inset-0 opacity-[0.07] mix-blend-multiply"
            style={{
              backgroundImage: grain,
              backgroundSize: '180px 180px',
            }}
          />
          <div
            data-sheen
            className="absolute inset-0 opacity-70"
            style={{
              background: light
                ? `linear-gradient(118deg, transparent 36%, color-mix(in srgb, #FFF7EE 38%, transparent) 48%, transparent 60%)`
                : `linear-gradient(118deg, transparent 36%, color-mix(in srgb, ${look.ink} 10%, transparent) 48%, transparent 60%)`,
            }}
          />
        </div>

        <div
          data-copy
          className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12"
        >
          <header
            data-lip-band
            className="flex h-[var(--rs-lip)] shrink-0 items-center justify-between gap-4 border-b"
            style={{ borderColor: `color-mix(in srgb, ${look.chrome} 70%, transparent)` }}
          >
            <p
              data-type="meta"
              className="font-[family-name:var(--rs-body)] text-[0.62rem] tracking-[0.32em] uppercase"
              style={{ color: look.mute }}
            >
              {look.kicker}
            </p>
            <p
              data-type="meta"
              className="font-[family-name:var(--rs-body)] text-[0.62rem] tracking-[0.28em] uppercase"
              style={{ color: look.mute }}
            >
              {look.index} · {look.word}
            </p>
          </header>

          <div className="mt-auto grid min-h-0 flex-1 grid-cols-1 items-end gap-8 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(11rem,18vw)] lg:items-end lg:gap-12">
            <div className="min-w-0">
              <Tag
                id={headingId}
                data-lockup
                className="max-w-full font-[family-name:var(--rs-display)] text-[clamp(4.8rem,26vw,14rem)] leading-[0.8] tracking-[-0.04em]"
              >
                {look.word}
              </Tag>
              <p
                data-italic
                className="mt-1 font-[family-name:var(--rs-display)] text-[clamp(1.4rem,4.2vw,2.4rem)] leading-none italic"
                style={{ color: look.accent }}
              >
                {look.italic}
              </p>
            </div>

            <aside
              data-rail
              className="flex max-w-[16rem] flex-col gap-4 pb-1 lg:max-w-none lg:justify-self-end"
            >
              <p
                data-caption
                className="font-[family-name:var(--rs-display)] text-[1.15rem] leading-snug sm:text-[1.3rem]"
              >
                {look.caption}
              </p>
              <p
                className="max-w-[28ch] font-[family-name:var(--rs-body)] text-[0.78rem] leading-relaxed tracking-[0.02em]"
                style={{ color: look.mute }}
              >
                {look.rail}
              </p>
              <a
                data-cta
                href={IG}
                className="mt-1 w-fit border-b pb-0.5 font-[family-name:var(--rs-body)] text-[0.68rem] tracking-[0.22em] uppercase hover:opacity-70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current"
                style={{
                  color: look.ink,
                  borderColor: `color-mix(in srgb, ${look.ink} 35%, transparent)`,
                }}
              >
                {look.cta}
              </a>
            </aside>
          </div>
        </div>
      </article>
    </section>
  )
}
